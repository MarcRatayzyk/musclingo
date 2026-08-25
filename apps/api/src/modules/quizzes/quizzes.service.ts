import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  QUIZ_PASS_THRESHOLD,
  SubmitQuizInput,
  UpsertQuizInput,
  isQuizScorePassing,
  isTextAnswerCorrect,
} from "@muscle-mind/types";
import { Prisma, ProgressStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { PathService } from "../categories/path.service";
import { GamificationService } from "../gamification/gamification.service";

function textPayloadAliases(payload: unknown): string[] {
  if (!payload || typeof payload !== "object") return [];
  const aliases = (payload as { aliases?: unknown }).aliases;
  if (!Array.isArray(aliases)) return [];
  return aliases.filter((a): a is string => typeof a === "string");
}

function clientSafePayload(payload: unknown): unknown {
  if (!payload || typeof payload !== "object") return payload ?? null;
  const { aliases: _aliases, ...rest } = payload as Record<string, unknown>;
  return rest;
}

@Injectable()
export class QuizzesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamification: GamificationService,
    private readonly path: PathService,
  ) {}

  async getByLessonId(lessonId: string, userId: string) {
    await this.path.assertLessonUnlocked(lessonId, userId);

    const quiz = await this.prisma.quiz.findUnique({
      where: { lessonId },
      include: {
        lesson: { select: { id: true, title: true, status: true } },
        questions: {
          orderBy: { order: "asc" },
          include: {
            answers: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                label: true,
                order: true,
                matchKey: true,
              },
            },
          },
        },
      },
    });

    if (!quiz || quiz.lesson.status !== "PUBLISHED") {
      throw new NotFoundException("Quiz not found");
    }

    return {
      id: quiz.id,
      lessonId: quiz.lessonId,
      lessonTitle: quiz.lesson.title,
      xpReward: quiz.xpReward,
      perfectBonusXp: quiz.perfectBonusXp,
      passThreshold: QUIZ_PASS_THRESHOLD,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        order: q.order,
        payload: clientSafePayload(q.payload),
        // TEXT : ne pas exposer les bonnes réponses au client
        answers:
          q.type === "TEXT"
            ? []
            : q.answers.map((a) => ({
                id: a.id,
                label: a.label,
                order: a.order,
                matchKey: a.matchKey,
              })),
      })),
    };
  }

  async submit(quizId: string, userId: string, input: SubmitQuizInput) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        lesson: true,
        questions: { include: { answers: true }, orderBy: { order: "asc" } },
      },
    });

    if (!quiz || quiz.lesson.status !== "PUBLISHED") {
      throw new NotFoundException("Quiz not found");
    }

    await this.path.assertLessonUnlocked(quiz.lessonId, userId);

    if (input.answers.length !== quiz.questions.length) {
      throw new BadRequestException("All questions must be answered");
    }

    const answerMap = new Map(
      input.answers.map((a) => [a.questionId, a]),
    );

    let correctCount = 0;
    const feedback = quiz.questions.map((question) => {
      const submission = answerMap.get(question.id);
      if (!submission) {
        throw new BadRequestException(`Missing answer for ${question.id}`);
      }

      const correctIds = question.answers
        .filter((a) => a.isCorrect)
        .map((a) => a.id)
        .sort();

      let isCorrect = false;

      if (question.type === "SINGLE" || question.type === "TRUE_FALSE") {
        isCorrect =
          submission.selectedAnswerIds.length === 1 &&
          correctIds.length === 1 &&
          submission.selectedAnswerIds[0] === correctIds[0];
      } else if (question.type === "MULTI") {
        const selected = [...submission.selectedAnswerIds].sort();
        isCorrect =
          selected.length === correctIds.length &&
          selected.every((id, i) => id === correctIds[i]);
      } else if (question.type === "ORDER") {
        const ordered = submission.orderedAnswerIds ?? [];
        const expected = [...question.answers]
          .sort((a, b) => a.order - b.order)
          .map((a) => a.id);
        isCorrect =
          ordered.length === expected.length &&
          ordered.every((id, i) => id === expected[i]);
      } else if (question.type === "MATCH") {
        const matches = submission.matches ?? [];
        const expectedPairs = question.answers
          .filter((a) => a.matchKey)
          .map((a) => ({ leftId: a.id, key: a.matchKey! }));
        isCorrect =
          expectedPairs.length > 0 &&
          expectedPairs.every((pair) =>
            matches.some(
              (m) =>
                m.leftId === pair.leftId &&
                question.answers.some(
                  (a) => a.id === m.rightId && a.matchKey === pair.key,
                ),
            ),
          );
      } else if (question.type === "TEXT") {
        const correctLabel =
          question.answers.find((a) => a.isCorrect)?.label ?? "";
        const aliases = textPayloadAliases(question.payload);
        isCorrect = isTextAnswerCorrect(
          submission.textAnswer ?? "",
          correctLabel,
          aliases,
        );
      }

      if (isCorrect) correctCount += 1;

      return {
        questionId: question.id,
        isCorrect,
        explanation: question.explanation,
        correctAnswerIds: correctIds,
      };
    });

    const score = correctCount / quiz.questions.length;
    const perfect = score === 1;
    const passed = isQuizScorePassing(score, quiz.questions.length);
    const baseXp = Math.round(quiz.xpReward * score);
    const bonus = perfect ? quiz.perfectBonusXp : 0;
    const xpEarned = baseXp + bonus;

    await this.prisma.quizResult.create({
      data: {
        userId,
        quizId,
        score,
        perfect,
        xpEarned,
        answers: input.answers,
      },
    });

    // Garantit la cohérence lecture/quiz : un quiz soumis marque la leçon lue.
    const existingProgress = await this.prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId: quiz.lessonId },
      },
    });
    await this.prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId: quiz.lessonId },
      },
      create: {
        userId,
        lessonId: quiz.lessonId,
        status: ProgressStatus.COMPLETED,
        completedAt: new Date(),
      },
      update: {
        status: ProgressStatus.COMPLETED,
        completedAt: existingProgress?.completedAt ?? new Date(),
      },
    });

    const xp = await this.gamification.awardXp({
      userId,
      amount: xpEarned,
      reason: perfect ? "quiz_perfect" : "quiz_complete",
      refType: "quiz",
      refId: quizId,
    });

    const streak = await this.gamification.touchStreak(userId);
    const badges = [];
    const firstQuiz = await this.gamification.tryAwardBadge(
      userId,
      "FIRST_QUIZ",
    );
    if (firstQuiz) badges.push(firstQuiz);

    const nextLessonId = passed
      ? await this.path.getNextLessonId(
          quiz.lesson.categoryId,
          quiz.lessonId,
          userId,
        )
      : null;

    return {
      quizId,
      score,
      perfect,
      passed,
      passThreshold: QUIZ_PASS_THRESHOLD,
      nextLessonId,
      categoryId: quiz.lesson.categoryId,
      correctCount,
      totalQuestions: quiz.questions.length,
      xpEarned,
      xpTotal: xp.xpTotal,
      level: xp.level,
      feedback,
      streak: { current: streak.current, longest: streak.longest },
      badges,
    };
  }

  async adminUpsert(input: UpsertQuizInput) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: input.lessonId },
    });
    if (!lesson) throw new NotFoundException("Lesson not found");

    const existing = await this.prisma.quiz.findUnique({
      where: { lessonId: input.lessonId },
    });

    if (existing) {
      await this.prisma.question.deleteMany({ where: { quizId: existing.id } });
      await this.prisma.quiz.update({
        where: { id: existing.id },
        data: {
          xpReward: input.xpReward,
          perfectBonusXp: input.perfectBonusXp,
        },
      });

      for (const q of input.questions) {
        await this.prisma.question.create({
          data: {
            quizId: existing.id,
            type: q.type,
            prompt: q.prompt,
            explanation: q.explanation,
            order: q.order,
            payload: (q.payload as Prisma.InputJsonValue) ?? undefined,
            answers: {
              create: q.answers.map((a) => ({
                label: a.label,
                isCorrect: a.isCorrect,
                order: a.order,
                matchKey: a.matchKey,
              })),
            },
          },
        });
      }

      return this.prisma.quiz.findUnique({
        where: { id: existing.id },
        include: {
          questions: { include: { answers: true }, orderBy: { order: "asc" } },
        },
      });
    }

    return this.prisma.quiz.create({
      data: {
        lessonId: input.lessonId,
        xpReward: input.xpReward,
        perfectBonusXp: input.perfectBonusXp,
        questions: {
          create: input.questions.map((q) => ({
            type: q.type,
            prompt: q.prompt,
            explanation: q.explanation,
            order: q.order,
            payload: (q.payload as Prisma.InputJsonValue) ?? undefined,
            answers: {
              create: q.answers.map((a) => ({
                label: a.label,
                isCorrect: a.isCorrect,
                order: a.order,
                matchKey: a.matchKey,
              })),
            },
          })),
        },
      },
      include: {
        questions: { include: { answers: true }, orderBy: { order: "asc" } },
      },
    });
  }
}
