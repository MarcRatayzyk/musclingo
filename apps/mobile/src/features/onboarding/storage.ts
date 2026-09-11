import { mmkv } from "@/shared/storage/mmkv";
import { getStreakGoalReward } from "./content";
import {
  INITIAL_ANSWERS,
  type OnboardingAnswers,
  type StreakGoalDays,
} from "./types";

const KEY = "onboarding_profile_v2";
const COMPLETED_KEY = "onboarding_completed_v1";
const STREAK_GOAL_KEY = "streak_goal_challenge_v1";

export type StreakGoalChallenge = {
  days: StreakGoalDays;
  neuroCoins: number;
  waterBottles: number;
  /** Démarre à la fin de l’onboarding. */
  startedAt: string;
  /** true une fois la streak atteinte et la récompense attribuée. */
  claimed: boolean;
};

function asStreakGoal(value: unknown): StreakGoalDays | null {
  if (value === 7 || value === 20 || value === 50) return value;
  return null;
}

export function loadOnboardingAnswers(): OnboardingAnswers {
  const raw = mmkv.getString(KEY);
  if (!raw) return { ...INITIAL_ANSWERS, motivations: [] };
  try {
    const parsed = JSON.parse(raw) as Partial<OnboardingAnswers> & {
      weeklyGoalDays?: number;
    };
    return {
      locale:
        parsed.locale === "en" || parsed.locale === "fr" ? parsed.locale : null,
      motivations: parsed.motivations ?? [],
      level: parsed.level ?? null,
      preferredPath: parsed.preferredPath ?? null,
      streakGoalDays:
        asStreakGoal(parsed.streakGoalDays) ??
        asStreakGoal(parsed.weeklyGoalDays) ??
        null,
    };
  } catch {
    return { ...INITIAL_ANSWERS, motivations: [] };
  }
}

export function saveOnboardingAnswers(answers: OnboardingAnswers): void {
  mmkv.set(KEY, JSON.stringify(answers));
}

export function markOnboardingCompleted(): void {
  mmkv.set(COMPLETED_KEY, "1");
}

export function hasCompletedOnboarding(): boolean {
  return mmkv.getString(COMPLETED_KEY) === "1";
}

/** Efface le progrès local pour rejouer l’onboarding. */
export function clearOnboardingProgress(): void {
  mmkv.delete(KEY);
  mmkv.delete(COMPLETED_KEY);
  mmkv.delete(STREAK_GOAL_KEY);
  mmkv.delete("claim_prompt_dismissed_v1");
}

/** Enregistre le défi streak : récompenses seulement à la réussite. */
export function startStreakGoalChallenge(days: StreakGoalDays): void {
  const reward = getStreakGoalReward(days);
  const challenge: StreakGoalChallenge = {
    days,
    neuroCoins: reward.neuroCoins,
    waterBottles: reward.waterBottles,
    startedAt: new Date().toISOString(),
    claimed: false,
  };
  mmkv.set(STREAK_GOAL_KEY, JSON.stringify(challenge));
}

export function loadStreakGoalChallenge(): StreakGoalChallenge | null {
  const raw = mmkv.getString(STREAK_GOAL_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StreakGoalChallenge;
  } catch {
    return null;
  }
}

export function markStreakGoalClaimed(): void {
  const current = loadStreakGoalChallenge();
  if (!current) return;
  mmkv.set(STREAK_GOAL_KEY, JSON.stringify({ ...current, claimed: true }));
}

/**
 * Si la streak courante atteint l’objectif et que la récompense n’est pas
 * encore claimée, retourne le challenge à récompenser.
 */
export function getClaimableStreakGoal(
  currentStreak: number,
): StreakGoalChallenge | null {
  const challenge = loadStreakGoalChallenge();
  if (!challenge || challenge.claimed) return null;
  if (currentStreak < challenge.days) return null;
  return challenge;
}
