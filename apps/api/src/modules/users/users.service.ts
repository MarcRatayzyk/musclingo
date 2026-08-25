import { Injectable, NotFoundException } from "@nestjs/common";
import { getXpProgress } from "@muscle-mind/types";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        streak: true,
        badges: {
          include: { badge: true },
          orderBy: { earnedAt: "desc" },
          take: 5,
        },
        preferredCategory: true,
      },
    });

    if (!user) throw new NotFoundException("User not found");

    const xp = getXpProgress(user.xpTotal);

    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      role: user.role,
      xpTotal: user.xpTotal,
      level: user.level,
      memoryGameBestScore: user.memoryGameBestScore,
      xpProgress: xp,
      streak: user.streak
        ? {
            current: user.streak.current,
            longest: user.streak.longest,
            lastActivityDate: user.streak.lastActivityDate,
          }
        : { current: 0, longest: 0, lastActivityDate: null },
      preferredCategory: user.preferredCategory,
      recentBadges: user.badges.map((ub) => ({
        code: ub.badge.code,
        name: ub.badge.name,
        description: ub.badge.description,
        icon: ub.badge.icon,
        earnedAt: ub.earnedAt,
      })),
    };
  }

  async submitMemoryGameScore(userId: string, score: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { memoryGameBestScore: true },
    });

    if (!user) throw new NotFoundException("User not found");

    if (score > user.memoryGameBestScore) {
      const updated = await this.prisma.user.update({
        where: { id: userId },
        data: { memoryGameBestScore: score },
        select: { memoryGameBestScore: true },
      });
      return { bestScore: updated.memoryGameBestScore, isNewRecord: true };
    }

    return { bestScore: user.memoryGameBestScore, isNewRecord: false };
  }

  async updatePreferredCategory(userId: string, preferredCategoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: preferredCategoryId },
      select: { id: true },
    });
    if (!category) throw new NotFoundException("Category not found");

    await this.prisma.user.update({
      where: { id: userId },
      data: { preferredCategoryId },
    });

    return this.getMe(userId);
  }
}
