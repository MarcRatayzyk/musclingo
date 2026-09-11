import {
  daysSinceCancel,
  daysUntilPauseEnds,
  isEffectivelyPremium,
  isPaused,
  lessonsCompletedInLastDays,
  loadRetentionState,
} from "./storage";
import { i18n } from "@/i18n";
import type { HealthResult } from "./types";

export type NudgeId =
  | "low_engagement"
  | "premium_idle"
  | "winback"
  | "pause_ending";

export type RetentionNudge = {
  id: NudgeId;
  message: string;
  ctaLabel: string;
  href: string;
};

const COOLDOWN_MS = 72 * 60 * 60 * 1000;

function canShow(
  nudgeId: string,
  state: ReturnType<typeof loadRetentionState>,
): boolean {
  const last = state.nudgeShownAt[nudgeId];
  if (!last) return true;
  const t = Date.parse(last);
  if (Number.isNaN(t)) return true;
  return Date.now() - t >= COOLDOWN_MS;
}

/** Retourne au plus 1 nudge selon la priorité du plan. */
export function pickRetentionNudge(
  health: HealthResult,
  preferredCategoryId: string | null,
): RetentionNudge | null {
  const state = loadRetentionState();

  const pauseDays = daysUntilPauseEnds(state);
  if (
    isPaused(state) &&
    pauseDays !== null &&
    pauseDays <= 3 &&
    canShow("pause_ending", state)
  ) {
    return {
      id: "pause_ending",
      message: i18n.t("retention:nudges.pauseEnding.message"),
      ctaLabel: i18n.t("retention:nudges.pauseEnding.cta"),
      href: "/(app)/manage-subscription",
    };
  }

  const sinceCancel = daysSinceCancel(state);
  if (
    !state.isPremiumDemo &&
    sinceCancel !== null &&
    sinceCancel < 14 &&
    canShow("winback", state)
  ) {
    return {
      id: "winback",
      message: i18n.t("retention:nudges.winback.message"),
      ctaLabel: i18n.t("retention:nudges.winback.cta"),
      href: "/(app)/manage-subscription",
    };
  }

  if (
    isEffectivelyPremium(state) &&
    lessonsCompletedInLastDays(7, state) === 0 &&
    canShow("premium_idle", state)
  ) {
    const plan =
      state.planId === "sub-boost"
        ? "Boost"
        : state.planId === "sub-genius"
          ? "Genius"
          : "abonnement";
    const href = preferredCategoryId
      ? `/(app)/category/${preferredCategoryId}`
      : "/(app)/home";
    return {
      id: "premium_idle",
      message: i18n.t("retention:nudges.premiumIdle.message", { plan }),
      ctaLabel: i18n.t("retention:nudges.premiumIdle.cta"),
      href,
    };
  }

  if (health.score < 60 && canShow("low_engagement", state)) {
    return {
      id: "low_engagement",
      message: i18n.t("retention:nudges.lowEngagement.message"),
      ctaLabel: i18n.t("retention:nudges.lowEngagement.cta"),
      href: "/(app)/home",
    };
  }

  return null;
}
