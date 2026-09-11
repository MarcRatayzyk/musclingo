import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { ProgressStatus } from "@prisma/client";
import {
  CompleteLessonInput,
  CreateLessonInput,
  UpdateLessonInput,
} from "@muscle-mind/types";
import { PrismaService } from "../../prisma/prisma.service";
import { PathService } from "../categories/path.service";
import { GamificationService } from "../gamification/gamification.service";
import {
  UsersService,
  WATER_BOTTLE_COST,
  WATER_BOTTLES_MAX,
} from "../users/users.service";
import {
  resolveRequestLocale,
  pickLocalized,
  pickLocalizedNullable,
} from "../../common/locale";
import {
  pickCategoryName,
  pickLessonMarkdown,
  pickLessonSubtitle,
  pickLessonTitle,
} from "../../common/content-l10n";

@Injectable()
export class LessonsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamification: GamificationService,
    private readonly path: PathService,
    private readonly users: UsersService,
  ) {}

  async getById(lessonId: string, userId: string, localeHeader?: string) {
    await this.path.assertLessonUnlocked(lessonId, userId);
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { locale: true },
    });
    const locale = resolveRequestLocale(
      { "x-locale": localeHeader },
      user?.locale,
    );

    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        category: true,
        quiz: { select: { id: true } },
        progress: { where: { userId }, take: 1 },
      },
    });

    if (!lesson || lesson.status !== "PUBLISHED") {
      throw new NotFoundException("Lesson not found");
    }

    return {
      id: lesson.id,
      title: pickLessonTitle(lesson.title, lesson.titleEn, locale),
      subtitle: pickLessonSubtitle(
        lesson.subtitle,
        lesson.subtitleEn,
        locale,
      ),
      markdown: pickLessonMarkdown(
        lesson.markdown,
        lesson.markdownEn,
        locale,
        lesson.title,
      ),
      durationSec: lesson.durationSec,
      difficulty: lesson.difficulty,
      illustrationUrl: lesson.illustrationUrl,
      tags: lesson.tags,
      sources: lesson.sources,
      recommendedLevel: lesson.recommendedLevel,
      xpReward: lesson.xpReward,
      order: lesson.order,
      category: {
        id: lesson.category.id,
        name: pickCategoryName(lesson.category.name, lesson.category.nameEn, locale, lesson.category.slug),
        color: lesson.category.color,
        slug: lesson.category.slug,
        icon: lesson.category.icon,
      },
      quizId: lesson.quiz?.id ?? null,
      progress: lesson.progress[0]
        ? {
            status: lesson.progress[0].status,
            completedAt: lesson.progress[0].completedAt,
          }
        : null,
    };
  }

  /**
   * Première lecture : consomme 4 bouteilles.
   * Revoir (déjà COMPLETED) : gratuit.
   */
  async start(lessonId: string, userId: string) {
    await this.path.assertLessonUnlocked(lessonId, userId);

    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, status: true },
    });
    if (!lesson || lesson.status !== "PUBLISHED") {
      throw new NotFoundException("Lesson not found");
    }

    const progress = await this.prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });
    const alreadyRead = progress?.status === ProgressStatus.COMPLETED;

    let waterBottles: number;
    let consumed = 0;

    if (alreadyRead) {
      const water = await this.users.ensureWaterBottlesFresh(userId);
      waterBottles = water.waterBottles;
    } else {
      const water = await this.users.consumeWaterBottles(
        userId,
        WATER_BOTTLE_COST,
      );
      waterBottles = water.waterBottles;
      consumed = water.consumed;
    }

    const starsTotal = await this.users.getStarsTotal(userId);

    return {
      lessonId,
      alreadyRead,
      consumed,
      waterBottles,
      waterBottlesMax: WATER_BOTTLES_MAX,
      waterBottleCost: WATER_BOTTLE_COST,
      starsTotal,
    };
  }

  /**
   * Prefer the first unlocked, incomplete path node (preferred category first).
   */
  async recommend(userId: string, localeHeader?: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");
    const locale = resolveRequestLocale(
      { "x-locale": localeHeader },
      user.locale,
    );

    const lessonId = await this.path.findFirstAvailableLesson(
      userId,
      user.preferredCategoryId,
    );
    if (!lessonId) return null;

    const best = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { category: true },
    });
    if (!best || best.status !== "PUBLISHED") return null;

    return {
      id: best.id,
      title: pickLessonTitle(best.title, best.titleEn, locale),
      subtitle: pickLessonSubtitle(best.subtitle, best.subtitleEn, locale),
      durationSec: best.durationSec,
      difficulty: best.difficulty,
      xpReward: best.xpReward,
      illustrationUrl: best.illustrationUrl,
      category: {
        id: best.category.id,
        name: pickCategoryName(best.category.name, best.category.nameEn, locale, best.category.slug),
        color: best.category.color,
        slug: best.category.slug,
        icon: best.category.icon,
      },
    };
  }

  async complete(
    lessonId: string,
    userId: string,
    input: CompleteLessonInput,
  ) {
    await this.path.assertLessonUnlocked(lessonId, userId);

    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { quiz: { select: { id: true } } },
    });

    if (!lesson || lesson.status !== "PUBLISHED") {
      throw new NotFoundException("Lesson not found");
    }

    const existing = await this.prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });

    const alreadyCompleted = existing?.status === ProgressStatus.COMPLETED;

    await this.prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        status: ProgressStatus.COMPLETED,
        completedAt: new Date(),
        readingTimeSec: input.readingTimeSec,
      },
      update: {
        status: ProgressStatus.COMPLETED,
        completedAt: existing?.completedAt ?? new Date(),
        readingTimeSec: input.readingTimeSec ?? existing?.readingTimeSec,
      },
    });

    let xpAwarded = 0;
    let level = undefined as number | undefined;
    let xpTotal = undefined as number | undefined;
    const badges: Array<{
      code: string;
      name: string;
      description: string;
      icon: string;
      earnedAt: Date;
    }> = [];

    if (!alreadyCompleted) {
      const xp = await this.gamification.awardXp({
        userId,
        amount: lesson.xpReward,
        reason: "lesson_complete",
        refType: "lesson",
        refId: lessonId,
      });
      xpAwarded = xp.amount;
      level = xp.level;
      xpTotal = xp.xpTotal;

      const badge = await this.gamification.tryAwardBadge(
        userId,
        "FIRST_LESSON",
      );
      if (badge) badges.push(badge);
    }

    const streak = await this.gamification.touchStreak(userId);

    // Without a quiz, completing unlocks the next lesson immediately.
    const nextLessonId = !lesson.quiz
      ? await this.path.getNextLessonId(lesson.categoryId, lessonId, userId)
      : null;

    return {
      lessonId,
      alreadyCompleted,
      xpAwarded,
      xpTotal,
      level,
      streak: {
        current: streak.current,
        longest: streak.longest,
      },
      badges,
      quizId: lesson.quiz?.id ?? null,
      nextLessonId,
    };
  }

  async adminList(params: {
    page: number;
    limit: number;
    categoryId?: string;
    status?: string;
  }) {
    const where = {
      ...(params.categoryId ? { categoryId: params.categoryId } : {}),
      ...(params.status
        ? { status: params.status as "DRAFT" | "PUBLISHED" }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.lesson.findMany({
        where,
        include: { category: true, quiz: { select: { id: true } } },
        orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      this.prisma.lesson.count({ where }),
    ]);

    return {
      items,
      total,
      page: params.page,
      limit: params.limit,
      pages: Math.ceil(total / params.limit),
    };
  }

  async adminCreate(input: CreateLessonInput) {
    return this.prisma.lesson.create({ data: input });
  }

  async adminUpdate(id: string, input: UpdateLessonInput) {
    const existing = await this.prisma.lesson.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Lesson not found");
    return this.prisma.lesson.update({ where: { id }, data: input });
  }

  async adminDelete(id: string) {
    const existing = await this.prisma.lesson.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Lesson not found");
    await this.prisma.lesson.delete({ where: { id } });
    return { ok: true };
  }

  async adminGet(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        category: true,
        quiz: {
          include: {
            questions: {
              include: { answers: true },
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
    if (!lesson) throw new NotFoundException("Lesson not found");
    return lesson;
  }

  assertAdmin(_role: string) {
    if (_role !== "ADMIN") throw new ForbiddenException();
  }
}
