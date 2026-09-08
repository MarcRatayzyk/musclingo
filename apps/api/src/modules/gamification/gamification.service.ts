import { Injectable } from "@nestjs/common";
import {
  getLevelFromXp,
  getRewardsForLevel,
  type LevelRewardItem,
} from "@muscle-mind/types";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

type Tx = Prisma.TransactionClient;

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

    const leveledUp = updated.level > before.level;
    if (leveledUp || updated.level > 1) {
      await this.ensureLevelRewards(userId);
    }

    return {
      xpTotal: updated.xpTotal,
      level: updated.level,
      amount,
      leveledUp,
    };
  }

  /**
   * Attribue les récompenses manquantes pour chaque niveau ≤ niveau actuel.
   * Idempotent via LevelRewardClaim.
   */
  async ensureLevelRewards(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { level: true },
    });

    const claimed = await this.prisma.levelRewardClaim.findMany({
      where: { userId, level: { lte: user.level } },
      select: { level: true },
    });
    const claimedSet = new Set(claimed.map((c) => c.level));

    const pending: number[] = [];
    for (let level = 2; level <= user.level; level += 1) {
      if (!claimedSet.has(level) && getRewardsForLevel(level).length > 0) {
        pending.push(level);
      }
    }
    if (pending.length === 0) return { grantedLevels: [] as number[] };

    await this.prisma.$transaction(async (tx) => {
      for (const level of pending) {
        await this.grantLevelRewardsTx(tx, userId, level);
      }
    });

    return { grantedLevels: pending };
  }

  private async grantLevelRewardsTx(
    tx: Tx,
    userId: string,
    level: number,
  ) {
    const rewards = getRewardsForLevel(level);
    if (rewards.length === 0) return;

    try {
      await tx.levelRewardClaim.create({
        data: { userId, level },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        return;
      }
      throw err;
    }

    await this.applyRewardItemsTx(tx, userId, rewards);
  }

  private async applyRewardItemsTx(
    tx: Tx,
    userId: string,
    rewards: readonly LevelRewardItem[],
  ) {
    const data: Prisma.UserUpdateInput = {};
    for (const item of rewards) {
      if (item.amount <= 0) continue;
      switch (item.kind) {
        case "neuroCoins":
          data.neuroCoinBalance = { increment: item.amount };
          break;
        case "waterBottles":
          data.waterBottles = { increment: item.amount };
          data.waterBottlesDate = new Date(
            Date.UTC(
              new Date().getUTCFullYear(),
              new Date().getUTCMonth(),
              new Date().getUTCDate(),
            ),
          );
          break;
        case "quizHint":
          data.quizHints = { increment: item.amount };
          break;
        case "extraTime":
          data.extraTimeCharges = { increment: item.amount };
          break;
        case "streakFreeze":
          data.streakFreezes = { increment: item.amount };
          break;
      }
    }
    if (Object.keys(data).length === 0) return;
    await tx.user.update({ where: { id: userId }, data });
  }

  /**
   * Daily streak: activity on a new UTC calendar day increments;
   * missing a day resets current to 1.
   * One streak freeze covers exactly one missed calendar day (diffDays === 2).
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

      if (diffDays === 2) {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: { id: userId },
          select: { streakFreezes: true },
        });
        if (user.streakFreezes > 0) {
          await this.prisma.user.update({
            where: { id: userId },
            data: { streakFreezes: { decrement: 1 } },
          });
          const current = streak.current + 1;
          const longest = Math.max(streak.longest, current);
          return this.prisma.streak.update({
            where: { userId },
            data: { current, longest, lastActivityDate: todayUtc },
          });
        }
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
