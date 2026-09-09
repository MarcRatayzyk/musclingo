import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  getXpProgress,
  listLevelRewardEntries,
} from "@muscle-mind/types";
import { PrismaService } from "../../prisma/prisma.service";
import { GamificationService } from "../gamification/gamification.service";

export const WATER_BOTTLES_MAX = 15;
export const WATER_BOTTLE_COST = 4;

function utcDay(d = new Date()) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function sameUtcDay(a: Date | null | undefined, b: Date) {
  if (!a) return false;
  const aa = utcDay(a);
  return aa.getTime() === b.getTime();
}

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamification: GamificationService,
  ) {}

  async getStarsTotal(userId: string) {
    const rows = await this.prisma.quizResult.groupBy({
      by: ["quizId"],
      where: { userId },
      _max: { stars: true },
    });
    return rows.reduce((sum, row) => sum + (row._max?.stars ?? 0), 0);
  }

  /** Seed one-shot du solde depuis le total carrière. */
  async ensureStarBalanceSeeded(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { starBalance: true, starBalanceSeeded: true },
    });
    if (!user) throw new NotFoundException("User not found");
    if (user.starBalanceSeeded) {
      return user.starBalance;
    }

    const starsTotal = await this.getStarsTotal(userId);
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        starBalance: starsTotal,
        starBalanceSeeded: true,
      },
      select: { starBalance: true },
    });
    return updated.starBalance;
  }

  async creditStarBalance(userId: string, amount: number) {
    if (amount <= 0) {
      return this.ensureStarBalanceSeeded(userId);
    }
    await this.ensureStarBalanceSeeded(userId);
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { starBalance: { increment: amount } },
      select: { starBalance: true },
    });
    return updated.starBalance;
  }

  async spendStarBalance(userId: string, amount: number) {
    const balance = await this.ensureStarBalanceSeeded(userId);
    if (balance < amount) {
      throw new ForbiddenException(
        `Pas assez d'étoiles (${amount} nécessaires, ${balance} disponibles)`,
      );
    }
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { starBalance: { decrement: amount } },
      select: { starBalance: true },
    });
    return updated.starBalance;
  }

  async getNeuroCoinBalance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { neuroCoinBalance: true },
    });
    if (!user) throw new NotFoundException("User not found");
    return user.neuroCoinBalance;
  }

  async creditNeuroCoins(userId: string, amount: number) {
    if (amount <= 0) {
      return this.getNeuroCoinBalance(userId);
    }
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { neuroCoinBalance: { increment: amount } },
      select: { neuroCoinBalance: true },
    });
    return updated.neuroCoinBalance;
  }

  async spendNeuroCoins(userId: string, amount: number) {
    const balance = await this.getNeuroCoinBalance(userId);
    if (balance < amount) {
      throw new ForbiddenException(
        `Pas assez de NeuroCoins (${amount} nécessaires, ${balance} disponibles)`,
      );
    }
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { neuroCoinBalance: { decrement: amount } },
      select: { neuroCoinBalance: true },
    });
    return updated.neuroCoinBalance;
  }

  /** Ajoute des bouteilles (achats peuvent dépasser le cap journalier). */
  async addWaterBottles(userId: string, amount: number) {
    await this.ensureWaterBottlesFresh(userId);
    const today = utcDay();
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        waterBottles: { increment: amount },
        waterBottlesDate: today,
      },
      select: { waterBottles: true },
    });
    return {
      waterBottles: updated.waterBottles,
      waterBottlesMax: WATER_BOTTLES_MAX,
      waterBottleCost: WATER_BOTTLE_COST,
    };
  }

  /** Reset quotidien UTC → 15 bouteilles. */
  async ensureWaterBottlesFresh(userId: string) {
    const today = utcDay();
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { waterBottles: true, waterBottlesDate: true },
    });
    if (!user) throw new NotFoundException("User not found");

    if (sameUtcDay(user.waterBottlesDate, today)) {
      return {
        waterBottles: user.waterBottles,
        waterBottlesMax: WATER_BOTTLES_MAX,
        waterBottleCost: WATER_BOTTLE_COST,
      };
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        waterBottles: WATER_BOTTLES_MAX,
        waterBottlesDate: today,
      },
      select: { waterBottles: true },
    });

    return {
      waterBottles: updated.waterBottles,
      waterBottlesMax: WATER_BOTTLES_MAX,
      waterBottleCost: WATER_BOTTLE_COST,
    };
  }

  async consumeWaterBottles(userId: string, amount = WATER_BOTTLE_COST) {
    const fresh = await this.ensureWaterBottlesFresh(userId);
    if (fresh.waterBottles < amount) {
      throw new ForbiddenException(
        `Plus assez de bouteilles (${amount} nécessaires, ${fresh.waterBottles} restantes)`,
      );
    }

    const today = utcDay();
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        waterBottles: { decrement: amount },
        waterBottlesDate: today,
      },
      select: { waterBottles: true },
    });

    return {
      waterBottles: updated.waterBottles,
      waterBottlesMax: WATER_BOTTLES_MAX,
      waterBottleCost: WATER_BOTTLE_COST,
      consumed: amount,
    };
  }

  async getMe(userId: string) {
    await this.gamification.ensureLevelRewards(userId);

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
        levelRewardClaims: { select: { level: true } },
      },
    });

    if (!user) throw new NotFoundException("User not found");

    const water = await this.ensureWaterBottlesFresh(userId);
    const starsTotal = await this.getStarsTotal(userId);
    const starBalance = await this.ensureStarBalanceSeeded(userId);
    const xp = getXpProgress(user.xpTotal);
    const claimedLevels = user.levelRewardClaims.map((c) => c.level);
    const claimedSet = new Set(claimedLevels);

    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      role: user.role,
      xpTotal: user.xpTotal,
      level: user.level,
      memoryGameBestScore: user.memoryGameBestScore,
      starsTotal,
      /** @deprecated Conservé pour compat — utiliser neuroCoinBalance. */
      starBalance,
      neuroCoinBalance: user.neuroCoinBalance,
      waterBottles: water.waterBottles,
      waterBottlesMax: water.waterBottlesMax,
      waterBottleCost: water.waterBottleCost,
      quizHints: user.quizHints,
      extraTimeCharges: user.extraTimeCharges,
      streakFreezes: user.streakFreezes,
      claimedLevels,
      levelRoadmap: [
        { level: 1, rewards: [] as const, claimed: user.level >= 1 },
        ...listLevelRewardEntries().map((entry) => ({
          level: entry.level,
          rewards: entry.rewards,
          claimed: claimedSet.has(entry.level),
        })),
      ],
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

  /**
   * Récompense d’objectif streak onboarding.
   * Attribuée uniquement si streak.current >= days et pas déjà claimée.
   */
  async claimStreakGoal(userId: string, days: 7 | 20 | 50) {
    const rewards: Record<7 | 20 | 50, { neuroCoins: number; waterBottles: number }> =
      {
        7: { neuroCoins: 100, waterBottles: 0 },
        20: { neuroCoins: 350, waterBottles: 0 },
        50: { neuroCoins: 1000, waterBottles: 10 },
      };
    const reward = rewards[days];
    const reason = `streak_goal_claim_${days}`;

    const existing = await this.prisma.xpTransaction.findFirst({
      where: { userId, reason },
      select: { id: true },
    });
    if (existing) {
      return { claimed: false, alreadyClaimed: true, ...reward };
    }

    const streak = await this.prisma.streak.findUnique({
      where: { userId },
      select: { current: true },
    });
    if (!streak || streak.current < days) {
      throw new ForbiddenException(
        `Série insuffisante (${streak?.current ?? 0}/${days} jours)`,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.xpTransaction.create({
        data: {
          userId,
          amount: 0,
          reason,
          refType: "streak_goal",
          refId: String(days),
        },
      });
      if (reward.neuroCoins > 0) {
        await tx.user.update({
          where: { id: userId },
          data: { neuroCoinBalance: { increment: reward.neuroCoins } },
        });
      }
      if (reward.waterBottles > 0) {
        const today = utcDay();
        await tx.user.update({
          where: { id: userId },
          data: {
            waterBottles: { increment: reward.waterBottles },
            waterBottlesDate: today,
          },
        });
      }
    });

    return { claimed: true, alreadyClaimed: false, ...reward };
  }
}
