import type { Me } from "@/features/auth/api";
import {
  isEffectivelyPremium,
  lessonsCompletedInLastDays,
  loadRetentionState,
  setCachedHealthScore,
} from "./storage";
import type { HealthBand, HealthResult, RetentionState } from "./types";

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

function daysSinceIso(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / (24 * 60 * 60 * 1000));
}

function bandFor(score: number): HealthBand {
  if (score >= 80) return "healthy";
  if (score >= 60) return "attention";
  if (score >= 40) return "at_risk";
  return "critical";
}

function labelFor(band: HealthBand): string {
  switch (band) {
    case "healthy":
      return "Sain";
    case "attention":
      return "À surveiller";
    case "at_risk":
      return "À risque";
    case "critical":
      return "Critique";
  }
}

/**
 * Health score 0–100:
 * récence ×0.30 + leçons 7j ×0.25 + streak ×0.20 + bouteilles ×0.10 + premium ×0.15
 */
export function computeHealthScore(
  me: Pick<Me, "streak" | "waterBottles" | "waterBottlesMax"> | null | undefined,
  state: RetentionState = loadRetentionState(),
): HealthResult {
  const lastActivity =
    daysSinceIso(me?.streak.lastActivityDate) ??
    daysSinceIso(state.lastAppOpenAt);
  let recencyScore = 40;
  if (lastActivity === null) recencyScore = 30;
  else if (lastActivity <= 1) recencyScore = 100;
  else if (lastActivity <= 3) recencyScore = 80;
  else if (lastActivity <= 7) recencyScore = 55;
  else if (lastActivity <= 14) recencyScore = 30;
  else recencyScore = 10;

  const lessons7 = lessonsCompletedInLastDays(7, state);
  const lessonScore = clamp((lessons7 / 5) * 100);

  const streak = me?.streak.current ?? 0;
  const streakScore = clamp((streak / 14) * 100);

  const bottles = me?.waterBottles ?? 0;
  const bottlesMax = Math.max(1, me?.waterBottlesMax ?? 10);
  const bottleScore = clamp((bottles / bottlesMax) * 100);

  const premiumScore = isEffectivelyPremium(state) ? 100 : state.isPremiumDemo ? 50 : 20;

  const score = Math.round(
    recencyScore * 0.3 +
      lessonScore * 0.25 +
      streakScore * 0.2 +
      bottleScore * 0.1 +
      premiumScore * 0.15,
  );

  const band = bandFor(score);
  return { score, band, label: labelFor(band) };
}

/** Recalcule au plus 1×/jour ; met en cache MMKV. */
export function refreshHealthScoreIfNeeded(
  me: Pick<Me, "streak" | "waterBottles" | "waterBottlesMax"> | null | undefined,
): HealthResult {
  const state = loadRetentionState();
  const scoredAt = state.lastHealthScoreAt
    ? Date.parse(state.lastHealthScoreAt)
    : NaN;
  const sameDay =
    !Number.isNaN(scoredAt) &&
    new Date(scoredAt).toDateString() === new Date().toDateString();

  if (
    sameDay &&
    typeof state.lastHealthScore === "number" &&
    state.lastHealthScore >= 0
  ) {
    const band = bandFor(state.lastHealthScore);
    return {
      score: state.lastHealthScore,
      band,
      label: labelFor(band),
    };
  }

  const result = computeHealthScore(me, state);
  setCachedHealthScore(result.score);
  return result;
}
