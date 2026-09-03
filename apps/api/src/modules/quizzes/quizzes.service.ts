import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  LESSON_QUIZ_QUESTION_COUNT,
  LESSON_QUIZ_TOTAL_TIME_SEC,
  LESSON_QUIZ_WRONG_PENALTY_SEC,
  SubmitQuizInput,
  UpsertQuizInput,
  computeLessonQuizStars,
  getLessonQuizXpMultiplier,
  isLessonQuizPassed,
} from "@muscle-mind/types";
import { Prisma, ProgressStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { PathService } from "../categories/path.service";
import { GamificationService } from "../gamification/gamification.service";
import { QuestionPoolService } from "../questions/question-pool.service";

@Injectable()
export class QuizzesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamification: GamificationService,
    private readonly path: PathService,
    private readonly questionPool: QuestionPoolService,
  ) {}

  async getByLessonId(lessonId: string, userId: string) {
    await this.path.assertLessonUnlocked(lessonId, userId);

    const quiz = await this.prisma.quiz.findUnique({
      where: { lessonId },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            status: true,
            categoryId: true,
            checkpointKey: true,
            tags: true,
          },
        },
      },
    });

    if (!quiz || quiz.lesson.status !== "PUBLISHED") {
      throw new NotFoundException("Quiz not found");
    }

    const draw = await this.questionPool.drawForQuiz(
      quiz.id,
      quiz.lesson.categoryId,
      userId,
      {
        checkpointKey: quiz.lesson.checkpointKey,
        themeTags: quiz.lesson.tags,
      },
    );

    return {
      id: quiz.id,
      lessonId: quiz.lessonId,
      lessonTitle: quiz.lesson.title,
      sessionId: draw.sessionId,
      xpReward: quiz.xpReward,
      perfectBonusXp: quiz.perfectBonusXp,
      questionCount: LESSON_QUIZ_QUESTION_COUNT,
      quizTimeSec: LESSON_QUIZ_TOTAL_TIME_SEC,
      wrongPenaltySec: LESSON_QUIZ_WRONG_PENALTY_SEC,
      questions: draw.questions,
      answerKeys: draw.answerKeys,
    };
  }

  async checkAnswer(
    quizId: string,
    userId: string,
    input: {
      sessionId: string;
      questionId: string;
      selectedAnswerIds: string[];
    },
  ) {
    const sessionQuestions = await this.questionPool.resolveSessionQuestions(
      input.sessionId,
      userId,
      quizId,
    );
    const question = sessionQuestions.find((q) => q.id === input.questionId);
    if (!question) {
      throw new BadRequestException("Invalid or expired quiz session");
    }
    const isCorrect =
      question.type === "MATCH"
        ? input.selectedAnswerIds.join("|") === question.correctChoiceId
        : input.selectedAnswerIds.length === 1 &&
          input.selectedAnswerIds[0] === question.correctChoiceId;
    return { correct: isCorrect };
  }

  async submit(quizId: string, userId: string, input: SubmitQuizInput) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { lesson: true },
    });

    if (!quiz || quiz.lesson.status !== "PUBLISHED") {
      throw new NotFoundException("Quiz not found");
    }

    await this.path.assertLessonUnlocked(quiz.lessonId, userId);

    const sessionQuestions = await this.questionPool.resolveSessionQuestions(
      input.sessionId,
      userId,
      quizId,
    );

    if (sessionQuestions.length !== LESSON_QUIZ_QUESTION_COUNT) {
      throw new BadRequestException("Invalid or expired quiz session");
    }

    const expectedIds = sessionQuestions.map((q) => q.id);
    const submittedIds = input.answers.map((a) => a.questionId);
    if (
      submittedIds.length !== expectedIds.length ||
      !expectedIds.every((id, i) => submittedIds[i] === id)
    ) {
      throw new BadRequestException("Answer set does not match session");
    }

    const answerMap = new Map(input.answers.map((a) => [a.questionId, a]));
    const sumTime = input.answers.reduce((s, a) => s + a.timeSpentSec, 0);
    if (Math.abs(sumTime - input.totalTimeSpentSec) > 2) {
      throw new BadRequestException("Inconsistent timing data");
    }

    let correctCount = 0;
    const feedback = sessionQuestions.map((question) => {
      const submission = answerMap.get(question.id);
      if (!submission) {
        throw new BadRequestException(`Missing answer for ${question.id}`);
      }
      if (submission.timeSpentSec > LESSON_QUIZ_TOTAL_TIME_SEC) {
        throw new BadRequestException("Question time exceeded limit");
      }

      const isCorrect =
        question.type === "MATCH"
          ? submission.selectedAnswerIds.join("|") === question.correctChoiceId
          : submission.selectedAnswerIds.length === 1 &&
            submission.selectedAnswerIds[0] === question.correctChoiceId;

      if (isCorrect) correctCount += 1;

      return {
        questionId: question.id,
        isCorrect,
        explanation: question.explanation,
        correctAnswerIds: [question.correctChoiceId],
        timeSpentSec: submission.timeSpentSec,
      };
    });

    const allCorrect = correctCount === sessionQuestions.length;
    const stars = allCorrect
      ? computeLessonQuizStars(input.totalTimeSpentSec)
      : 0;
    const passed = allCorrect && isLessonQuizPassed(stars);
    const score = correctCount / sessionQuestions.length;
    const perfect = stars === 3;

    const xpMultiplier = getLessonQuizXpMultiplier(stars);
    const baseXp = Math.round(quiz.xpReward * xpMultiplier);
    const bonus = perfect ? quiz.perfectBonusXp : 0;
    const xpEarned = passed ? baseXp + bonus : 0;

    await this.prisma.quizResult.create({
      data: {
        userId,
        quizId,
        score,
        perfect,
        xpEarned,
        stars,
        timeSpentSec: input.totalTimeSpentSec,
        passed,
        questionIds: expectedIds,
        answers: input.answers,
      },
    });

    await this.prisma.quizSession.deleteMany({
      where: { id: input.sessionId, userId },
    });

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

    let xpTotal = 0;
    let level = 1;
    if (xpEarned > 0) {
      const xp = await this.gamification.awardXp({
        userId,
        amount: xpEarned,
        reason: perfect ? "quiz_perfect" : "quiz_complete",
        refType: "quiz",
        refId: quizId,
      });
      xpTotal = xp.xpTotal;
      level = xp.level;
    } else {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { xpTotal: true, level: true },
      });
      xpTotal = user?.xpTotal ?? 0;
      level = user?.level ?? 1;
    }

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
      stars,
      timeSpentSec: input.totalTimeSpentSec,
      nextLessonId,
      categoryId: quiz.lesson.categoryId,
      correctCount,
      totalQuestions: sessionQuestions.length,
      xpEarned,
      xpTotal,
      level,
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
