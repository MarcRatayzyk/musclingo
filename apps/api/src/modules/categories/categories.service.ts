import { Injectable } from "@nestjs/common";
import { ProgressStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { PathService } from "./path.service";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly path: PathService,
  ) {}

  getPath(categoryId: string, userId: string) {
    return this.path.getCategoryPath(categoryId, userId);
  }

  listOngoing(userId: string) {
    return this.path.listOngoing(userId);
  }

  async listForUser(userId: string) {
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
        name: cat.name,
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
}
