import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, QuestionType } from "@prisma/client";
import {
  ILLUSTRATION_LEGENDS,
  MINI_GAME_LIVES,
  SubmitMiniGameResultInput,
  getMiniGameScore,
} from "@muscle-mind/types";
import { PrismaService } from "../../prisma/prisma.service";
import { GamificationService } from "../gamification/gamification.service";

export type MiniGameChoice = {
  id: string;
  label: string;
  isCorrect: boolean;
};

export type MiniGameQuestionPayload = {
  id: string;
  prompt: string;
  explanation: string;
  imageUrl: string | null;
  color: string | null;
  choices: MiniGameChoice[];
};

/** Taille du pool envoyé au client pour une partie. */
const POOL_SIZE = 80;
/** En dessous de ce seuil, on élargit au-delà des leçons déjà apprises. */
const MIN_LEARNED_POOL = 24;
const CHOICES_PER_QUESTION = 4;

type LegendPayload = { imageUrl?: unknown; color?: unknown };

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

function readLegendPayload(payload: Prisma.JsonValue | null) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }
  const { imageUrl, color } = payload as LegendPayload;
  if (typeof imageUrl !== "string") return null;
  return {
    imageUrl,
    color: typeof color === "string" ? color : null,
  };
}

/** Libellés de toutes les pastilles, pour compléter les distracteurs. */
function allLegendLabels(): string[] {
  return Object.values(ILLUSTRATION_LEGENDS).flatMap((items) =>
    items.map((item) => item.label),
  );
}

@Injectable()
export class MiniGamesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamification: GamificationService,
  ) {}

  /** Parcours jouables : ceux qui ont une banque dédiée. */
  async list(userId: string) {
    const grouped = await this.prisma.miniGameQuestion.groupBy({
      by: ["categoryId"],
      _count: { _all: true },
    });
    if (grouped.length === 0) return [];

    const categoryIds = grouped.map((g) => g.categoryId);

    const [categories, bests] = await Promise.all([
      this.prisma.category.findMany({
        where: { id: { in: categoryIds } },
        orderBy: { order: "asc" },
      }),
      this.prisma.miniGameResult.groupBy({
        by: ["categoryId"],
        where: { userId, categoryId: { in: categoryIds } },
        _max: { score: true },
        _count: { _all: true },
      }),
    ]);

    const bestByCategory = new Map(
      bests.map((b) => [b.categoryId, b]),
    );

    return categories.map((category) => {
      const best = bestByCategory.get(category.id);
      return {
        categoryId: category.id,
        slug: category.slug,
        name: category.name,
        color: category.color,
        bestScore: best?._max.score ?? 0,
        gamesPlayed: best?._count._all ?? 0,
      };
    });
  }

  async getQuestions(categoryId: string, userId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, slug: true, name: true, color: true },
    });
    if (!category) throw new NotFoundException("Category not found");

    const completed = await this.prisma.lessonProgress.findMany({
      where: {
        userId,
        status: "COMPLETED",
        lesson: { categoryId },
      },
      select: { lessonId: true, lesson: { select: { checkpointKey: true } } },
    });

    const learnedLessonIds = new Set(completed.map((p) => p.lessonId));
    const learnedKeys = new Set(
      completed.map((p) => p.lesson.checkpointKey),
    );

    const [lessonQuestions, dedicated] = await Promise.all([
      this.prisma.question.findMany({
        where: {
          quiz: { lesson: { categoryId } },
          type: {
            in: [QuestionType.SINGLE, QuestionType.TRUE_FALSE, QuestionType.TEXT],
          },
        },
        include: {
          answers: { orderBy: { order: "asc" } },
          quiz: { select: { lessonId: true } },
        },
      }),
      this.prisma.miniGameQuestion.findMany({
        where: { categoryId },
        include: { answers: { orderBy: { order: "asc" } } },
      }),
    ]);

    const learnedPool: MiniGameQuestionPayload[] = [];
    const restPool: MiniGameQuestionPayload[] = [];

    for (const question of lessonQuestions) {
      const built =
        question.type === QuestionType.TEXT
          ? this.buildImageQuestion(question)
          : this.buildChoiceQuestion(
              `lesson:${question.id}`,
              question.prompt,
              question.explanation,
              question.answers,
            );
      if (!built) continue;
      const target = learnedLessonIds.has(question.quiz.lessonId)
        ? learnedPool
        : restPool;
      target.push(built);
    }

    for (const question of dedicated) {
      const built = this.buildChoiceQuestion(
        `mini:${question.id}`,
        question.prompt,
        question.explanation,
        question.answers,
      );
      if (!built) continue;
      const isLearned =
        !question.checkpointKey || learnedKeys.has(question.checkpointKey);
      const target = isLearned ? learnedPool : restPool;
      target.push(built);
    }

    // Priorité aux thèmes déjà vus, élargi si le pool est trop mince.
    const pool =
      learnedPool.length >= MIN_LEARNED_POOL
        ? shuffle(learnedPool)
        : [...shuffle(learnedPool), ...shuffle(restPool)];

    return {
      categoryId: category.id,
      slug: category.slug,
      name: category.name,
      color: category.color,
      questions: pool.slice(0, POOL_SIZE),
    };
  }

  async submitResult(
    categoryId: string,
    userId: string,
    input: SubmitMiniGameResultInput,
  ) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });
    if (!category) throw new NotFoundException("Category not found");

    const previous = await this.prisma.miniGameResult.aggregate({
      where: { userId, categoryId },
      _max: { score: true },
      _count: { _all: true },
    });
    const previousBest = previous._max.score ?? 0;

    const score = getMiniGameScore(input.correctCount, input.durationSec);

    await this.prisma.miniGameResult.create({
      data: {
        userId,
        categoryId,
        durationSec: input.durationSec,
        correctCount: input.correctCount,
        wrongCount: input.wrongCount,
        bestCombo: input.bestCombo,
        score,
        endedBy: input.endedBy,
      },
    });

    const codes = ["MINIGAME_FIRST"];
    if (input.bestCombo >= 10) codes.push("MINIGAME_COMBO_10");
    if (input.wrongCount === 0 && input.endedBy === "time") {
      codes.push("MINIGAME_FLAWLESS");
    }
    if (score >= 20) codes.push("MINIGAME_SPEED_20");

    const badgesEarned = [];
    for (const code of codes) {
      const badge = await this.gamification.tryAwardBadge(userId, code);
      if (badge) badgesEarned.push(badge);
    }

    return {
      score,
      bestScore: Math.max(previousBest, score),
      isNewRecord: score > previousBest,
      gamesPlayed: previous._count._all + 1,
      correctCount: input.correctCount,
      wrongCount: input.wrongCount,
      bestCombo: input.bestCombo,
      livesLost: input.wrongCount,
      lives: MINI_GAME_LIVES,
      badgesEarned,
    };
  }

  private buildChoiceQuestion(
    id: string,
    prompt: string,
    explanation: string,
    answers: Array<{ id: string; label: string; isCorrect: boolean }>,
  ): MiniGameQuestionPayload | null {
    if (!answers.some((a) => a.isCorrect)) return null;
    if (answers.length < 2) return null;

    return {
      id,
      prompt,
      explanation,
      imageUrl: null,
      color: null,
      choices: shuffle(
        answers.map((a) => ({
          id: a.id,
          label: a.label,
          isCorrect: a.isCorrect,
        })),
      ),
    };
  }

  /**
   * Question TEXT sur illustration : la pastille devient un QCM, les
   * distracteurs viennent des autres pastilles de la même image.
   */
  private buildImageQuestion(question: {
    id: string;
    prompt: string;
    explanation: string;
    payload: Prisma.JsonValue | null;
    answers: Array<{ id: string; label: string; isCorrect: boolean }>;
  }): MiniGameQuestionPayload | null {
    const legend = readLegendPayload(question.payload);
    if (!legend?.color) return null;

    const correct = question.answers.find((a) => a.isCorrect);
    if (!correct) return null;

    const sameImage = (ILLUSTRATION_LEGENDS[legend.imageUrl] ?? [])
      .map((item) => item.label)
      .filter((label) => label !== correct.label);

    const distractors = shuffle([...new Set(sameImage)]).slice(
      0,
      CHOICES_PER_QUESTION - 1,
    );

    if (distractors.length < CHOICES_PER_QUESTION - 1) {
      const fallback = shuffle(
        [...new Set(allLegendLabels())].filter(
          (label) => label !== correct.label && !distractors.includes(label),
        ),
      );
      distractors.push(
        ...fallback.slice(0, CHOICES_PER_QUESTION - 1 - distractors.length),
      );
    }

    if (distractors.length === 0) return null;

    return {
      id: `legend:${question.id}`,
      prompt: "Quelle structure correspond à cette couleur ?",
      explanation: question.explanation,
      imageUrl: legend.imageUrl,
      color: legend.color,
      choices: shuffle([
        { id: correct.id, label: correct.label, isCorrect: true },
        ...distractors.map((label, i) => ({
          id: `${question.id}-d${i}`,
          label,
          isCorrect: false,
        })),
      ]),
    };
  }
}
