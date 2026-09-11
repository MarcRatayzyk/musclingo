import { Injectable } from "@nestjs/common";
import { ProgressStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { PathService } from "./path.service";
import {
  AppLocale,
  resolveRequestLocale,
} from "../../common/locale";
import { pickCategoryName } from "../../common/content-l10n";
@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly path: PathService,
  ) {}

  async getPath(categoryId: string, userId: string, localeHeader?: string) {
    const locale = await this.resolveLocale(userId, localeHeader);
    return this.path.getCategoryPath(categoryId, userId, locale);
  }

  async listOngoing(userId: string, localeHeader?: string) {
    const locale = await this.resolveLocale(userId, localeHeader);
    return this.path.listOngoing(userId, locale);
  }

  async listForUser(userId: string, localeHeader?: string) {
    const locale = await this.resolveLocale(userId, localeHeader);
    const categories = await this.prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        lessons: {
          where: { status: "PUBLISHED" },
          select: { id: true, xpReward: true },
        },
      },
    });

    const progress = await this.prisma.lessonProgress.findMany({
      where: {
        userId,
        status: ProgressStatus.COMPLETED,
        lesson: { status: "PUBLISHED" },
      },
      select: { lessonId: true, lesson: { select: { categoryId: true, xpReward: true } } },
    });

    const completedByCategory = new Map<string, { count: number; xp: number }>();
    for (const p of progress) {
      const catId = p.lesson.categoryId;
      const prev = completedByCategory.get(catId) ?? { count: 0, xp: 0 };
      completedByCategory.set(catId, {
        count: prev.count + 1,
        xp: prev.xp + p.lesson.xpReward,
      });
    }

    return categories.map((cat) => {
      const totalLessons = cat.lessons.length;
      const done = completedByCategory.get(cat.id) ?? { count: 0, xp: 0 };
      const progressRatio =
        totalLessons === 0 ? 0 : done.count / totalLessons;
      const level = Math.max(1, Math.floor(done.xp / 150) + 1);

      return {
        id: cat.id,
        slug: cat.slug,
        name: pickCategoryName(cat.name, cat.nameEn, locale, cat.slug),
        color: cat.color,
        icon: cat.icon,
        order: cat.order,
        lessonCount: totalLessons,
        completedCount: done.count,
        xp: done.xp,
        level,
        progress: progressRatio,
      };
    });
  }

  async listAll() {
    return this.prisma.category.findMany({ orderBy: { order: "asc" } });
  }

  private async resolveLocale(
    userId: string,
    localeHeader?: string,
  ): Promise<AppLocale> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { locale: true },
    });
    return resolveRequestLocale({ "x-locale": localeHeader }, user?.locale);
  }
}
