import { Injectable } from "@nestjs/common";
import { getLevelFromXp } from "@muscle-mind/types";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GamificationService {
  constructor(private readonly prisma: PrismaService) {}

  async awardXp(params: {
    userId: string;
    amount: number;
    reason: string;
    refType?: string;
    refId?: string;
  }) {
    const { userId, amount, reason, refType, refId } = params;

    const before = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.xpTransaction.create({
        data: { userId, amount, reason, refType, refId },
      });

      const user = await tx.user.update({
        where: { id: userId },
        data: { xpTotal: { increment: amount } },
      });

      const newLevel = getLevelFromXp(user.xpTotal);
      if (newLevel !== user.level) {
        return tx.user.update({
          where: { id: userId },
          data: { level: newLevel },
        });
      }
      return user;
    });

    return {
      xpTotal: updated.xpTotal,
      level: updated.level,
      amount,
      leveledUp: updated.level > before.level,
    };
  }

  /**
   * Daily streak: activity on a new UTC calendar day increments;
   * missing a day resets current to 1.
   */
  async touchStreak(userId: string) {
    const today = new Date();
    const todayUtc = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
    );

    const streak = await this.prisma.streak.upsert({
      where: { userId },
      create: {
        userId,
        current: 1,
        longest: 1,
        lastActivityDate: todayUtc,
      },
      update: {},
    });

    if (streak.lastActivityDate) {
      const last = new Date(streak.lastActivityDate);
      const lastUtc = new Date(
        Date.UTC(last.getUTCFullYear(), last.getUTCMonth(), last.getUTCDate()),
      );
      const diffDays = Math.floor(
        (todayUtc.getTime() - lastUtc.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 0) {
        return streak;
      }

      const current = diffDays === 1 ? streak.current + 1 : 1;
      const longest = Math.max(streak.longest, current);

      return this.prisma.streak.update({
        where: { userId },
        data: { current, longest, lastActivityDate: todayUtc },
      });
    }

    return this.prisma.streak.update({
      where: { userId },
      data: { current: 1, longest: 1, lastActivityDate: todayUtc },
    });
  }

  async tryAwardBadge(userId: string, code: string) {
    const badge = await this.prisma.badge.findUnique({ where: { code } });
    if (!badge) return null;

    const existing = await this.prisma.userBadge.findUnique({
      where: { userId_badgeId: { userId, badgeId: badge.id } },
    });
    if (existing) return null;

    const awarded = await this.prisma.userBadge.create({
      data: { userId, badgeId: badge.id },
      include: { badge: true },
    });

    return {
      code: awarded.badge.code,
      name: awarded.badge.name,
      description: awarded.badge.description,
      icon: awarded.badge.icon,
      earnedAt: awarded.earnedAt,
    };
  }
}
