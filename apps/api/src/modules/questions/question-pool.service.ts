import { Injectable, NotFoundException } from "@nestjs/common";
import {
  LESSON_QUIZ_QUESTION_COUNT,
  LESSON_QUIZ_SESSION_TTL_MIN,
} from "@muscle-mind/types";
import { Prisma, QuestionType } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { matchRightIdsInLeftOrder, withPairedMatchKeys } from "./match-score";
import type { PoolAnswerType } from "./pool-score";

export type PoolChoice = {
  id: string;
  label: string;
  matchKey?: string | null;
  order?: number;
};

export type PoolQuestion = {
  id: string;
  type: PoolAnswerType;
  prompt: string;
  imageUrl: string | null;
  choices: PoolChoice[];
};

export type PoolQuestionInternal = PoolQuestion & {
  explanation: string;
  correctChoiceId: string;
};

export type DrawSessionResult = {
  sessionId: string;
  questions: PoolQuestion[];
  answerKeys: Record<string, string>;
};

export type LessonQuizTheme = {
  checkpointKey: string;
  themeTags: string[];
};

const RECENT_ATTEMPTS = 5;
const ALLOWED_TYPES: QuestionType[] = [
  QuestionType.SINGLE,
  QuestionType.TRUE_FALSE,
];

const LESSON_BANK_TYPES: QuestionType[] = [
  QuestionType.SINGLE,
  QuestionType.TRUE_FALSE,
  QuestionType.MULTI,
  QuestionType.ORDER,
  QuestionType.MATCH,
];

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

function poolQuestionId(miniGameQuestionId: string) {
  return `mini:${miniGameQuestionId}`;
}

function lessonPoolQuestionId(questionId: string) {
  return `lesson:${questionId}`;
}

function parsePoolQuestionId(id: string): string | null {
  if (!id.startsWith("mini:")) return null;
  return id.slice(5);
}

function parseLessonPoolQuestionId(id: string): string | null {
  if (!id.startsWith("lesson:")) return null;
  return id.slice(7);
}

type AnswerRow = {
  id: string;
  label: string;
  isCorrect: boolean;
  matchKey?: string | null;
  order?: number;
};

function isValidSingleOrTf(answers: AnswerRow[]) {
  return (
    answers.length >= 2 && answers.filter((a) => a.isCorrect).length === 1
  );
}

function isValidMulti(answers: AnswerRow[]) {
  const correct = answers.filter((a) => a.isCorrect).length;
  const wrong = answers.length - correct;
  return correct >= 2 && wrong >= 1;
}

function isValidOrder(answers: AnswerRow[]) {
  if (answers.length < 2) return false;
  const orders = answers.map((a) => a.order ?? -1);
  const unique = new Set(orders);
  return unique.size === answers.length && orders.every((o) => o >= 0);
}

function readImageUrl(payload: Prisma.JsonValue | null): string | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }
  const imageUrl = (payload as { imageUrl?: unknown }).imageUrl;
  return typeof imageUrl === "string" && imageUrl.length > 0
    ? imageUrl
    : null;
}

function readThemeTags(payload: Prisma.JsonValue | null): string[] {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return [];
  }
  const tags = (payload as { themeTags?: unknown }).themeTags;
  if (!Array.isArray(tags)) return [];
  return tags.filter((t): t is string => typeof t === "string");
}

function tagsOverlap(lessonTags: string[], questionTags: string[]): boolean {
  if (lessonTags.length === 0 || questionTags.length === 0) return false;
  const normalized = new Set(lessonTags.map((t) => t.toLowerCase()));
  return questionTags.some((t) => normalized.has(t.toLowerCase()));
}

function pickFromPool(
  themed: PoolQuestionInternal[],
  unit: PoolQuestionInternal[],
  excludeIds: Set<string>,
  count: number,
): PoolQuestionInternal[] {
  const themedFresh = shuffle(themed.filter((q) => !excludeIds.has(q.id)));
  const themedUsed = shuffle(themed.filter((q) => excludeIds.has(q.id)));
  const unitFresh = shuffle(
    unit.filter((q) => !excludeIds.has(q.id) && !themed.some((t) => t.id === q.id)),
  );
  const unitUsed = shuffle(
    unit.filter((q) => excludeIds.has(q.id) && !themed.some((t) => t.id === q.id)),
  );

  const ordered = [
    ...themedFresh,
    ...themedUsed,
    ...unitFresh,
    ...unitUsed,
  ];
  return ordered.slice(0, count);
}

function pickShuffled(
  pool: PoolQuestionInternal[],
  take: number,
  excludeIds: Set<string>,
): PoolQuestionInternal[] {
  const fresh = shuffle(pool.filter((q) => !excludeIds.has(q.id)));
  const used = shuffle(pool.filter((q) => excludeIds.has(q.id)));
  return [...fresh, ...used].slice(0, take);
}

@Injectable()
export class QuestionPoolService {
  constructor(private readonly prisma: PrismaService) {}

  async drawForQuiz(
    quizId: string,
    categoryId: string,
    userId: string,
    theme: LessonQuizTheme,
    count = LESSON_QUIZ_QUESTION_COUNT,
    extraTimeUsed = false,
  ): Promise<DrawSessionResult> {
    const excludeIds = await this.getRecentlyUsedQuestionIds(
      userId,
      categoryId,
    );
    const fromLesson = await this.buildLessonBank(
      quizId,
      excludeIds,
      count,
    );
    const internal =
      fromLesson.length >= count
        ? fromLesson
        : await this.buildPool(categoryId, theme, excludeIds, count);
    if (internal.length < count) {
      throw new NotFoundException(
        `Not enough themed quiz questions (need ${count}, got ${internal.length})`,
      );
    }

    const questionIds = internal.map((q) => q.id);
    const answerKeys = Object.fromEntries(
      internal.map((q) => [q.id, q.correctChoiceId]),
    );
    const expiresAt = new Date(
      Date.now() + LESSON_QUIZ_SESSION_TTL_MIN * 60 * 1000,
    );

    const session = await this.prisma.quizSession.create({
      data: {
        userId,
        quizId,
        questionIds,
        expiresAt,
        extraTimeUsed,
        hintedQuestionIds: [],
      },
    });

    return {
      sessionId: session.id,
      questions: internal.map(({ id, prompt, choices, type, imageUrl }) => ({
        id,
        prompt,
        choices,
        type,
        imageUrl,
      })),
      answerKeys,
    };
  }

  async resolveSessionQuestions(
    sessionId: string,
    userId: string,
    quizId: string,
  ): Promise<PoolQuestionInternal[]> {
    const session = await this.prisma.quizSession.findFirst({
      where: { id: sessionId, userId, quizId },
    });
    if (!session || session.expiresAt < new Date()) {
      return [];
    }

    const ids = session.questionIds as string[];
    const miniIds = ids
      .map(parsePoolQuestionId)
      .filter((id): id is string => !!id);
    const lessonIds = ids
      .map(parseLessonPoolQuestionId)
      .filter((id): id is string => !!id);

    const [miniRows, lessonRows] = await Promise.all([
      miniIds.length
        ? this.prisma.miniGameQuestion.findMany({
            where: { id: { in: miniIds } },
            include: { answers: { orderBy: { order: "asc" } } },
          })
        : Promise.resolve([]),
      lessonIds.length
        ? this.prisma.question.findMany({
            where: { id: { in: lessonIds } },
            include: { answers: { orderBy: { order: "asc" } } },
          })
        : Promise.resolve([]),
    ]);

    const byMiniId = new Map(miniRows.map((r) => [r.id, r]));
    const byLessonId = new Map(lessonRows.map((r) => [r.id, r]));

    return ids
      .map((poolId) => {
        const miniId = parsePoolQuestionId(poolId);
        if (miniId) return this.toInternalQuestion(poolId, byMiniId.get(miniId));
        const lessonId = parseLessonPoolQuestionId(poolId);
        if (lessonId) {
          return this.toInternalQuestion(poolId, byLessonId.get(lessonId));
        }
        return null;
      })
      .filter((q): q is PoolQuestionInternal => q !== null);
  }

  parsePoolQuestionId(id: string) {
    return parsePoolQuestionId(id);
  }

  private toInternalQuestion(
    poolId: string,
    row?: {
      id: string;
      type?: QuestionType;
      prompt: string;
      explanation: string;
      payload?: Prisma.JsonValue | null;
      answers: Array<{
        id: string;
        label: string;
        isCorrect: boolean;
        matchKey?: string | null;
        order: number;
      }>;
    },
  ): PoolQuestionInternal | null {
    if (!row) return null;
    const imageUrl = readImageUrl(row.payload ?? null);
    const type = row.type ?? QuestionType.SINGLE;

    if (type === QuestionType.MATCH) {
      const answers = withPairedMatchKeys(row.answers);
      const rightIds = matchRightIdsInLeftOrder(answers);
      if (rightIds.length < 2) return null;
      return {
        id: poolId,
        type: "MATCH",
        prompt: row.prompt,
        imageUrl,
        explanation: row.explanation,
        correctChoiceId: rightIds.join("|"),
        choices: answers.map((a) => ({
          id: a.id,
          label: a.label,
          matchKey: a.matchKey,
          order: a.order,
        })),
      };
    }

    if (type === QuestionType.MULTI) {
      if (!isValidMulti(row.answers)) return null;
      const correctIds = row.answers
        .filter((a) => a.isCorrect)
        .map((a) => a.id)
        .sort();
      return {
        id: poolId,
        type: "MULTI",
        prompt: row.prompt,
        imageUrl,
        explanation: row.explanation,
        correctChoiceId: correctIds.join("|"),
        choices: shuffle(
          row.answers.map((a) => ({ id: a.id, label: a.label, order: a.order })),
        ),
      };
    }

    if (type === QuestionType.ORDER) {
      if (!isValidOrder(row.answers)) return null;
      const orderedIds = [...row.answers]
        .sort((a, b) => a.order - b.order)
        .map((a) => a.id);
      return {
        id: poolId,
        type: "ORDER",
        prompt: row.prompt,
        imageUrl,
        explanation: row.explanation,
        correctChoiceId: orderedIds.join("|"),
        choices: shuffle(
          row.answers.map((a) => ({ id: a.id, label: a.label, order: a.order })),
        ),
      };
    }

    if (!isValidSingleOrTf(row.answers)) return null;
    const correct = row.answers.find((a) => a.isCorrect);
    if (!correct) return null;
    return {
      id: poolId,
      type: type === QuestionType.TRUE_FALSE ? "TRUE_FALSE" : "SINGLE",
      prompt: row.prompt,
      imageUrl,
      explanation: row.explanation,
      correctChoiceId: correct.id,
      choices: shuffle(
        row.answers.map((a) => ({ id: a.id, label: a.label, order: a.order })),
      ),
    };
  }

  private async buildLessonBank(
    quizId: string,
    excludeIds: Set<string>,
    count: number,
  ): Promise<PoolQuestionInternal[]> {
    const rows = await this.prisma.question.findMany({
      where: {
        quizId,
        type: { in: LESSON_BANK_TYPES },
      },
      include: { answers: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });

    const imageMatches: PoolQuestionInternal[] = [];
    const rest: PoolQuestionInternal[] = [];

    for (const row of rows) {
      const built = this.toInternalQuestion(lessonPoolQuestionId(row.id), row);
      if (!built) continue;
      if (built.type === "MATCH" && built.imageUrl) {
        imageMatches.push(built);
      } else if (built.type === "MATCH") {
        // Text-only MATCH: only used if no image MATCH exists
        rest.push(built);
      } else {
        rest.push(built);
      }
    }

    const reserveImageMatch = imageMatches.length > 0 ? 1 : 0;
    const restCount = count - reserveImageMatch;
    if (rest.length < restCount) return [];

    const pickedImageMatch = reserveImageMatch
      ? pickShuffled(imageMatches, 1, excludeIds)
      : [];

    const restPool =
      reserveImageMatch > 0
        ? rest.filter((q) => q.type !== "MATCH")
        : rest;

    if (restPool.length < restCount) return [];

    const pickedRest = pickShuffled(restPool, restCount, excludeIds);
    if (pickedImageMatch.length + pickedRest.length < count) return [];

    return [...pickedImageMatch, ...shuffle(pickedRest)];
  }

  private async getRecentlyUsedQuestionIds(
    userId: string,
    categoryId: string,
  ): Promise<Set<string>> {
    const recent = await this.prisma.quizResult.findMany({
      where: {
        userId,
        quiz: { lesson: { categoryId } },
      },
      orderBy: { createdAt: "desc" },
      take: RECENT_ATTEMPTS,
      select: { questionIds: true },
    });

    const used = new Set<string>();
    for (const row of recent) {
      const ids = row.questionIds as string[];
      if (Array.isArray(ids)) {
        for (const id of ids) used.add(id);
      }
    }
    return used;
  }

  private async buildPool(
    categoryId: string,
    theme: LessonQuizTheme,
    excludeIds: Set<string>,
    count: number,
  ): Promise<PoolQuestionInternal[]> {
    const rows = await this.prisma.miniGameQuestion.findMany({
      where: {
        categoryId,
        checkpointKey: theme.checkpointKey,
        type: { in: ALLOWED_TYPES },
      },
      include: { answers: { orderBy: { order: "asc" } } },
    });

    const themed: PoolQuestionInternal[] = [];
    const unit: PoolQuestionInternal[] = [];

    for (const row of rows) {
      const built = this.toInternalQuestion(poolQuestionId(row.id), row);
      if (!built) continue;
      const questionTags = readThemeTags(row.payload);
      if (tagsOverlap(theme.themeTags, questionTags)) {
        themed.push(built);
      } else {
        unit.push(built);
      }
    }

    const picked = pickFromPool(themed, unit, excludeIds, count);
    if (picked.length >= count) return picked;

    const all = [
      ...themed,
      ...unit.filter((u) => !themed.some((t) => t.id === u.id)),
    ];
    const fresh = shuffle(all.filter((q) => !excludeIds.has(q.id)));
    if (fresh.length >= count) return fresh.slice(0, count);
    return [...fresh, ...shuffle(all.filter((q) => excludeIds.has(q.id)))].slice(
      0,
      count,
    );
  }
}
