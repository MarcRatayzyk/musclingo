import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Difficulty, ProgressStatus } from "@prisma/client";
import {
  GATE_PASS_THRESHOLD,
  QUIZ_PASS_THRESHOLD,
  isGateScorePassing,
  isLessonQuizPassed,
} from "@muscle-mind/types";
import { PrismaService } from "../../prisma/prisma.service";

export type PathNodeState = "locked" | "available" | "completed";

export type PathLessonNode = {
  id: string;
  title: string;
  subtitle: string | null;
  durationSec: number;
  xpReward: number;
  order: number;
  difficulty: Difficulty;
  checkpointKey: string;
  checkpointTitle: string;
  checkpointOrder: number;
  state: PathNodeState;
  hasQuiz: boolean;
  bestScore: number | null;
  bestStars: 0 | 1 | 2 | 3 | null;
  passed: boolean;
  readingCompleted: boolean;
};

export type PathGateNode = {
  id: string;
  title: string;
  checkpointKey: string;
  checkpointOrder: number;
  state: PathNodeState;
  passed: boolean;
  timeLimitSec: number;
  passThreshold: number;
  questionCount: number;
  bestScore: number | null;
  xpReward: number;
};

type EvaluatedLesson = Omit<PathLessonNode, "state">;

type GateEval = PathGateNode & { allUnitLessonsPassed: boolean };

@Injectable()
export class PathService {
  constructor(private readonly prisma: PrismaService) {}

  private isUnlockAllLessons(): boolean {
    return process.env.UNLOCK_ALL_LESSONS !== "false";
  }

  async getCategoryPath(categoryId: string, userId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException("Category not found");

    const { nodes, gates } = await this.buildPathForCategory(
      categoryId,
      userId,
    );

    const unitMap = new Map<
      string,
      {
        checkpointKey: string;
        checkpointOrder: number;
        label: string;
        difficulty: Difficulty;
        lessons: PathLessonNode[];
        gate: PathGateNode | null;
      }
    >();

    for (const node of nodes) {
      const key = `${node.checkpointOrder}:${node.checkpointKey}`;
      let unit = unitMap.get(key);
      if (!unit) {
        const gate = gates.find(
          (g) => g.checkpointOrder === node.checkpointOrder,
        );
        unit = {
          checkpointKey: node.checkpointKey,
          checkpointOrder: node.checkpointOrder,
          label: node.checkpointTitle,
          difficulty: node.difficulty,
          lessons: [],
          gate: gate
            ? {
                id: gate.id,
                title: gate.title,
                checkpointKey: gate.checkpointKey,
                checkpointOrder: gate.checkpointOrder,
                state: gate.state,
                passed: gate.passed,
                timeLimitSec: gate.timeLimitSec,
                passThreshold: gate.passThreshold,
                questionCount: gate.questionCount,
                bestScore: gate.bestScore,
                xpReward: gate.xpReward,
              }
            : null,
        };
        unitMap.set(key, unit);
      }
      unit.lessons.push(node);
    }

    const units = [...unitMap.values()].sort(
      (a, b) => a.checkpointOrder - b.checkpointOrder,
    );

    return {
      id: category.id,
      slug: category.slug,
      name: category.name,
      color: category.color,
      icon: category.icon,
      passThreshold: QUIZ_PASS_THRESHOLD,
      gatePassThreshold: GATE_PASS_THRESHOLD,
      units,
    };
  }

  async assertLessonUnlocked(lessonId: string, userId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, categoryId: true, status: true },
    });
    if (!lesson || lesson.status !== "PUBLISHED") {
      throw new NotFoundException("Lesson not found");
    }

    const { nodes } = await this.buildPathForCategory(
      lesson.categoryId,
      userId,
    );
    const node = nodes.find((n) => n.id === lessonId);
    if (!node) throw new NotFoundException("Lesson not found");
    if (node.state === "locked") {
      throw new ForbiddenException(
        "Cette leçon est verrouillée. Complète la leçon ou le checkpoint précédent.",
      );
    }
    return { lesson, node, nodes };
  }

  async assertGateUnlocked(gateId: string, userId: string) {
    const gate = await this.prisma.checkpointGate.findUnique({
      where: { id: gateId },
    });
    if (!gate) throw new NotFoundException("Checkpoint gate not found");

    const { gates } = await this.buildPathForCategory(
      gate.categoryId,
      userId,
    );
    const node = gates.find((g) => g.id === gateId);
    if (!node) throw new NotFoundException("Checkpoint gate not found");
    if (node.state === "locked") {
      throw new ForbiddenException(
        "Ce checkpoint est verrouillé. Termine toutes les leçons du thème.",
      );
    }
    return { gate, node };
  }

  async getNextLessonId(
    categoryId: string,
    currentLessonId: string,
    userId: string,
  ): Promise<string | null> {
    const { nodes } = await this.buildPathForCategory(categoryId, userId);
    const idx = nodes.findIndex((n) => n.id === currentLessonId);
    if (idx < 0) return null;
    const current = nodes[idx];
    if (!current?.passed) return null;
    return nodes[idx + 1]?.id ?? null;
  }

  async getFirstLessonAfterGate(
    categoryId: string,
    gateCheckpointOrder: number,
    userId: string,
  ): Promise<string | null> {
    const { nodes } = await this.buildPathForCategory(categoryId, userId);
    return (
      nodes.find((n) => n.checkpointOrder === gateCheckpointOrder + 1)?.id ??
      null
    );
  }

  async findFirstAvailableLesson(
    userId: string,
    preferredCategoryId?: string | null,
  ) {
    const categories = await this.prisma.category.findMany({
      orderBy: { order: "asc" },
      select: { id: true },
    });

    const ordered =
      preferredCategoryId != null
        ? [
            ...categories.filter((c) => c.id === preferredCategoryId),
            ...categories.filter((c) => c.id !== preferredCategoryId),
          ]
        : categories;

    for (const cat of ordered) {
      const { nodes } = await this.buildPathForCategory(cat.id, userId);
      const available = nodes.find((n) => n.state === "available");
      if (available) return available.id;
    }
    return null;
  }

  async listOngoing(userId: string) {
    const categories = await this.prisma.category.findMany({
      orderBy: { order: "asc" },
    });

    const progress = await this.prisma.lessonProgress.findMany({
      where: {
        userId,
        status: ProgressStatus.COMPLETED,
        lesson: { status: "PUBLISHED" },
      },
      select: {
        completedAt: true,
        updatedAt: true,
        lesson: { select: { categoryId: true } },
      },
      orderBy: [{ completedAt: "desc" }, { updatedAt: "desc" }],
    });

    const lastActivityByCategory = new Map<string, Date>();
    for (const p of progress) {
      const catId = p.lesson.categoryId;
      if (lastActivityByCategory.has(catId)) continue;
      const at = p.completedAt ?? p.updatedAt;
      if (at) lastActivityByCategory.set(catId, at);
    }

    const items = [];
    for (const cat of categories) {
      const { nodes } = await this.buildPathForCategory(cat.id, userId);
      if (!nodes.length) continue;

      const completedCount = nodes.filter((n) => n.state === "completed").length;
      const nextLesson = nodes.find((n) => n.state === "available") ?? null;

      if (completedCount === 0 || !nextLesson) continue;

      items.push({
        category: {
          id: cat.id,
          slug: cat.slug,
          name: cat.name,
          color: cat.color,
          icon: cat.icon,
          order: cat.order,
        },
        lessonCount: nodes.length,
        completedCount,
        progress: completedCount / nodes.length,
        lastActivityAt:
          lastActivityByCategory.get(cat.id)?.toISOString() ?? null,
        nextLesson: {
          id: nextLesson.id,
          title: nextLesson.title,
          subtitle: nextLesson.subtitle,
          durationSec: nextLesson.durationSec,
          xpReward: nextLesson.xpReward,
          difficulty: nextLesson.difficulty,
        },
      });
    }

    items.sort((a, b) => {
      const ta = a.lastActivityAt ? Date.parse(a.lastActivityAt) : 0;
      const tb = b.lastActivityAt ? Date.parse(b.lastActivityAt) : 0;
      if (tb !== ta) return tb - ta;
      return a.category.order - b.category.order;
    });

    return items;
  }

  private async buildPathForCategory(categoryId: string, userId: string) {
    const [lessons, gatesRaw] = await Promise.all([
      this.prisma.lesson.findMany({
        where: { categoryId, status: "PUBLISHED" },
        orderBy: { order: "asc" },
        include: {
          quiz: {
            select: {
              id: true,
              _count: { select: { questions: true } },
              results: {
                where: { userId },
                select: { score: true, stars: true, passed: true },
                orderBy: [{ stars: "desc" }, { score: "desc" }],
                take: 1,
              },
            },
          },
          progress: {
            where: { userId },
            take: 1,
          },
        },
      }),
      this.prisma.checkpointGate.findMany({
        where: { categoryId },
        orderBy: { checkpointOrder: "asc" },
        include: {
          _count: { select: { questions: true } },
          results: {
            where: { userId, passed: true },
            select: { score: true },
            orderBy: { score: "desc" },
            take: 1,
          },
        },
      }),
    ]);

    const evaluated: EvaluatedLesson[] = lessons.map((lesson) => {
      const readingCompleted =
        lesson.progress[0]?.status === ProgressStatus.COMPLETED;
      const hasQuiz = !!lesson.quiz;
      const bestResult = lesson.quiz?.results[0] ?? null;
      const bestScore = bestResult?.score ?? null;
      const bestStars = bestResult
        ? (bestResult.stars as 0 | 1 | 2 | 3)
        : null;
      const passed = hasQuiz
        ? bestResult !== null &&
          (bestResult.passed || isLessonQuizPassed(bestResult.stars))
        : readingCompleted;

      return {
        id: lesson.id,
        title: lesson.title,
        subtitle: lesson.subtitle,
        durationSec: lesson.durationSec,
        xpReward: lesson.xpReward,
        order: lesson.order,
        difficulty: lesson.difficulty,
        checkpointKey: lesson.checkpointKey,
        checkpointTitle: lesson.checkpointTitle,
        checkpointOrder: lesson.checkpointOrder,
        hasQuiz,
        bestScore,
        bestStars,
        passed,
        readingCompleted,
      };
    });

    const gatesPassedByOrder = new Map<number, boolean>();
    for (const g of gatesRaw) {
      const best = g.results[0]?.score ?? null;
      const passed =
        best !== null &&
        isGateScorePassing(best, g._count.questions, g.passThreshold);
      gatesPassedByOrder.set(g.checkpointOrder, passed);
    }

    const nodes: PathLessonNode[] = evaluated.map((lesson, index) => {
      const prev = index > 0 ? evaluated[index - 1] : null;
      const isFirstInUnit =
        !prev || prev.checkpointOrder !== lesson.checkpointOrder;

      let unlocked = this.isUnlockAllLessons();
      if (!unlocked) {
        if (index === 0) {
          unlocked = true;
        } else if (isFirstInUnit) {
          const prevGateOrder = lesson.checkpointOrder - 1;
          if (prevGateOrder >= 0 && gatesRaw.some((g) => g.checkpointOrder === prevGateOrder)) {
            unlocked = gatesPassedByOrder.get(prevGateOrder) === true;
          } else {
            unlocked = prev?.passed ?? false;
          }
        } else {
          unlocked = prev?.passed ?? false;
        }
      }

      let state: PathNodeState;
      if (!unlocked) state = "locked";
      else if (lesson.passed) state = "completed";
      else state = "available";

      return { ...lesson, state };
    });

    const gates: GateEval[] = gatesRaw.map((gate) => {
      const unitLessons = evaluated.filter(
        (l) => l.checkpointOrder === gate.checkpointOrder,
      );
      const allUnitLessonsPassed =
        unitLessons.length > 0 && unitLessons.every((l) => l.passed);
      const bestScore = gate.results[0]?.score ?? null;
      const passed =
        bestScore !== null &&
        isGateScorePassing(
          bestScore,
          gate._count.questions,
          gate.passThreshold,
        );

      let state: PathNodeState;
      if (passed) state = "completed";
      else if (allUnitLessonsPassed) state = "available";
      else state = "locked";

      return {
        id: gate.id,
        title: gate.title,
        checkpointKey: gate.checkpointKey,
        checkpointOrder: gate.checkpointOrder,
        state,
        passed,
        timeLimitSec: gate.timeLimitSec,
        passThreshold: gate.passThreshold,
        questionCount: gate.questionCount,
        bestScore,
        xpReward: gate.xpReward,
        allUnitLessonsPassed,
      };
    });

    return { nodes, gates };
  }
}
