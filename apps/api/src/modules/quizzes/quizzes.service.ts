import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  EXTRA_QUIZ_TIME_SEC,
  LESSON_QUIZ_QUESTION_COUNT,
  LESSON_QUIZ_WRONG_PENALTY_SEC,
  SubmitQuizInput,
  UpsertQuizInput,
  UseQuizHintInput,
  WATER_BOTTLE_QUIZ_RETRY_COST,
  computeLessonQuizStars,
  getLessonQuizTiming,
  getLessonQuizXpMultiplier,
  getNeuroCoinsForStarsGained,
  isLessonQuizPassed,
} from "@muscle-mind/types";
import { Prisma, ProgressStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { PathService } from "../categories/path.service";
import { GamificationService } from "../gamification/gamification.service";
import { isPoolAnswerCorrect } from "../questions/pool-score";
import { QuestionPoolService } from "../questions/question-pool.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class QuizzesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamification: GamificationService,
    private readonly path: PathService,
    private readonly questionPool: QuestionPoolService,
    private readonly users: UsersService,
  ) {}

  async getByLessonId(
    lessonId: string,
    userId: string,
    useExtraTime = false,
  ) {
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
            category: { select: { slug: true } },
          },
        },
      },
    });

    if (!quiz || quiz.lesson.status !== "PUBLISHED") {
      throw new NotFoundException("Quiz not found");
    }

    const priorAttempts = await this.prisma.quizResult.count({
      where: { userId, quizId: quiz.id },
    });
    const isRetry = priorAttempts > 0;
    let waterBottles: number | undefined;
    if (isRetry) {
      const water = await this.users.consumeWaterBottles(
        userId,
        WATER_BOTTLE_QUIZ_RETRY_COST,
      );
      waterBottles = water.waterBottles;
    } else {
      const water = await this.users.ensureWaterBottlesFresh(userId);
      waterBottles = water.waterBottles;
    }

    const inv = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        extraTimeCharges: true,
        quizHints: true,
      },
    });
    let extraTimeUsed = false;
    let extraTimeChargesLeft = inv.extraTimeCharges;

    if (useExtraTime) {
      if (inv.extraTimeCharges <= 0) {
        throw new ForbiddenException("Aucune charge +10 s disponible");
      }
      await this.prisma.user.update({
        where: { id: userId },
        data: { extraTimeCharges: { decrement: 1 } },
      });
      extraTimeUsed = true;
      extraTimeChargesLeft = inv.extraTimeCharges - 1;
    }

    const draw = await this.questionPool.drawForQuiz(
      quiz.id,
      quiz.lesson.categoryId,
      userId,
      {
        checkpointKey: quiz.lesson.checkpointKey,
        themeTags: quiz.lesson.tags,
      },
      LESSON_QUIZ_QUESTION_COUNT,
      extraTimeUsed,
    );

    const timing = getLessonQuizTiming(extraTimeUsed);

    return {
      id: quiz.id,
      lessonId: quiz.lessonId,
      lessonTitle: quiz.lesson.title,
      categorySlug: quiz.lesson.category.slug,
      sessionId: draw.sessionId,
      xpReward: quiz.xpReward,
      perfectBonusXp: quiz.perfectBonusXp,
      questionCount: LESSON_QUIZ_QUESTION_COUNT,
      quizTimeSec: timing.totalSec,
      starThresholds: timing.starThresholds,
      wrongPenaltySec: LESSON_QUIZ_WRONG_PENALTY_SEC,
      extraTimeUsed,
      extraTimeCharges: extraTimeChargesLeft,
      quizHints: inv.quizHints,
      questions: draw.questions,
      answerKeys: draw.answerKeys,
      isRetry,
      waterBottleRetryCost: isRetry ? WATER_BOTTLE_QUIZ_RETRY_COST : 0,
      waterBottles,
    };
  }

  async useHint(quizId: string, userId: string, input: UseQuizHintInput) {
    const session = await this.prisma.quizSession.findFirst({
      where: { id: input.sessionId, userId, quizId },
    });
    if (!session || session.expiresAt < new Date()) {
      throw new BadRequestException("Invalid or expired quiz session");
    }

    const hinted = Array.isArray(session.hintedQuestionIds)
      ? (session.hintedQuestionIds as string[])
      : [];
    if (hinted.includes(input.questionId)) {
      throw new BadRequestException("Indice déjà utilisé sur cette question");
    }

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { quizHints: true },
    });
    if (user.quizHints <= 0) {
      throw new ForbiddenException("Aucun indice disponible");
    }

    const questions = await this.questionPool.resolveSessionQuestions(
      input.sessionId,
      userId,
      quizId,
    );
    const question = questions.find((q) => q.id === input.questionId);
    if (!question) {
      throw new BadRequestException("Question introuvable dans la session");
    }

    const hint = this.buildHint(question);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { quizHints: { decrement: 1 } },
      }),
      this.prisma.quizSession.update({
        where: { id: session.id },
        data: { hintedQuestionIds: [...hinted, input.questionId] },
      }),
    ]);

    return {
      ...hint,
      quizHints: user.quizHints - 1,
    };
  }

  private buildHint(question: {
    type: string;
    choices: Array<{ id: string; label: string; matchKey?: string | null }>;
    correctChoiceId: string;
  }) {
    const correctIds = question.correctChoiceId.split("|").filter(Boolean);

    if (question.type === "ORDER") {
      const firstCorrect = correctIds[0];
      if (!firstCorrect) {
        throw new BadRequestException("Indice indisponible pour cette question");
      }
      return {
        kind: "orderReveal" as const,
        revealedAnswerId: firstCorrect,
        revealedOrderIndex: 0,
        eliminatedChoiceIds: [] as string[],
      };
    }

    if (question.type === "MATCH") {
      const firstRight = correctIds[0];
      if (!firstRight) {
        throw new BadRequestException("Indice indisponible pour cette question");
      }
      return {
        kind: "matchReveal" as const,
        revealedRightId: firstRight,
        revealedOrderIndex: 0,
        eliminatedChoiceIds: [] as string[],
      };
    }

    const wrong = question.choices
      .map((c) => c.id)
      .filter((id) => !correctIds.includes(id));
    if (wrong.length === 0) {
      throw new BadRequestException("Indice indisponible pour cette question");
    }
    const eliminatedChoiceId = wrong[Math.floor(Math.random() * wrong.length)]!;
    return {
      kind: "eliminate" as const,
      eliminatedChoiceIds: [eliminatedChoiceId],
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
    const isCorrect = isPoolAnswerCorrect(
      question.type,
      input.selectedAnswerIds,
      question.correctChoiceId,
    );
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

    const session = await this.prisma.quizSession.findFirst({
      where: { id: input.sessionId, userId, quizId },
    });
    if (!session || session.expiresAt < new Date()) {
      throw new BadRequestException("Invalid or expired quiz session");
    }
    const extraTimeUsed = session.extraTimeUsed;
    const timing = getLessonQuizTiming(extraTimeUsed);

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
    if (input.totalTimeSpentSec > timing.totalSec) {
      throw new BadRequestException("Quiz time exceeded limit");
    }

    let correctCount = 0;
    const feedback = sessionQuestions.map((question) => {
      const submission = answerMap.get(question.id);
      if (!submission) {
        throw new BadRequestException(`Missing answer for ${question.id}`);
      }
      if (submission.timeSpentSec > timing.totalSec) {
        throw new BadRequestException("Question time exceeded limit");
      }

      const isCorrect = isPoolAnswerCorrect(
        question.type,
        submission.selectedAnswerIds,
        question.correctChoiceId,
      );

      if (isCorrect) correctCount += 1;

      return {
        questionId: question.id,
        isCorrect,
        explanation: question.explanation,
        correctAnswerIds: question.correctChoiceId.split("|"),
        timeSpentSec: submission.timeSpentSec,
      };
    });

    const allCorrect = correctCount === sessionQuestions.length;
    const stars = allCorrect
      ? computeLessonQuizStars(input.totalTimeSpentSec, extraTimeUsed)
      : 0;
    const passed = allCorrect && isLessonQuizPassed(stars);
    const score = correctCount / sessionQuestions.length;
    const perfect = stars === 3;

    const xpMultiplier = getLessonQuizXpMultiplier(stars);
    const baseXp = Math.round(quiz.xpReward * xpMultiplier);
    const bonus = perfect ? quiz.perfectBonusXp : 0;
    const xpEarned = passed ? baseXp + bonus : 0;

    const previousBest = await this.prisma.quizResult.findFirst({
      where: { userId, quizId },
      orderBy: { stars: "desc" },
      select: { stars: true },
    });
    const prevStars = previousBest?.stars ?? 0;
    const starsGained = passed ? Math.max(0, stars - prevStars) : 0;
    const neuroCoinsEarned = passed
      ? getNeuroCoinsForStarsGained(stars, prevStars)
      : 0;

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

    if (neuroCoinsEarned > 0) {
      await this.users.creditNeuroCoins(userId, neuroCoinsEarned);
    }
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
      starsGained,
      neuroCoinsEarned,
      timeSpentSec: input.totalTimeSpentSec,
      extraTimeUsed,
      extraTimeBonusSec: extraTimeUsed ? EXTRA_QUIZ_TIME_SEC : 0,
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
