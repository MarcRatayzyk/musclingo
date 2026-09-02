import { Injectable, NotFoundException } from "@nestjs/common";
import {
  LESSON_QUIZ_QUESTION_COUNT,
  LESSON_QUIZ_SESSION_TTL_MIN,
} from "@muscle-mind/types";
import { Prisma, QuestionType } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

export type PoolChoice = {
  id: string;
  label: string;
};

export type PoolQuestion = {
  id: string;
  prompt: string;
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

function parsePoolQuestionId(id: string): string | null {
  if (!id.startsWith("mini:")) return null;
  return id.slice(5);
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

@Injectable()
export class QuestionPoolService {
  constructor(private readonly prisma: PrismaService) {}

  async drawForQuiz(
    quizId: string,
    categoryId: string,
    userId: string,
    theme: LessonQuizTheme,
    count = LESSON_QUIZ_QUESTION_COUNT,
  ): Promise<DrawSessionResult> {
    const excludeIds = await this.getRecentlyUsedQuestionIds(
      userId,
      categoryId,
    );
    const internal = await this.buildPool(categoryId, theme, excludeIds, count);
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
      },
    });

    return {
      sessionId: session.id,
      questions: internal.map(({ id, prompt, choices }) => ({
        id,
        prompt,
        choices,
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

    const rows = await this.prisma.miniGameQuestion.findMany({
      where: { id: { in: miniIds } },
      include: { answers: { orderBy: { order: "asc" } } },
    });

    const byMiniId = new Map(rows.map((r) => [r.id, r]));

    return ids
      .map((poolId) => this.toInternalQuestion(poolId, byMiniId.get(parsePoolQuestionId(poolId)!)))
      .filter((q): q is PoolQuestionInternal => q !== null);
  }

  parsePoolQuestionId(id: string) {
    return parsePoolQuestionId(id);
  }

  private toInternalQuestion(
    poolId: string,
    row?: {
      id: string;
      prompt: string;
      explanation: string;
      answers: Array<{ id: string; label: string; isCorrect: boolean }>;
    },
  ): PoolQuestionInternal | null {
    if (!row) return null;
    const correct = row.answers.find((a) => a.isCorrect);
    if (!correct || row.answers.length < 2) return null;
    return {
      id: poolId,
      prompt: row.prompt,
      explanation: row.explanation,
      correctChoiceId: correct.id,
      choices: shuffle(
        row.answers.map((a) => ({ id: a.id, label: a.label })),
      ),
    };
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
