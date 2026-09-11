import { mmkv } from "@/shared/storage/mmkv";
import {
  INITIAL_RETENTION_STATE,
  type CancelReason,
  type PlanId,
  type RetentionState,
  type SaveOffer,
} from "./types";

const KEY = "retention_state_v1";
const LESSON_RETENTION_DAYS = 30;

function parseState(raw: string | undefined): RetentionState {
  if (!raw) return { ...INITIAL_RETENTION_STATE, nudgeShownAt: {} };
  try {
    const parsed = JSON.parse(raw) as Partial<RetentionState>;
    return {
      ...INITIAL_RETENTION_STATE,
      ...parsed,
      lessonCompletions: Array.isArray(parsed.lessonCompletions)
        ? parsed.lessonCompletions
        : [],
      nudgeShownAt:
        parsed.nudgeShownAt && typeof parsed.nudgeShownAt === "object"
          ? parsed.nudgeShownAt
          : {},
    };
  } catch {
    return { ...INITIAL_RETENTION_STATE, nudgeShownAt: {} };
  }
}

export function loadRetentionState(): RetentionState {
  return parseState(mmkv.getString(KEY));
}

export function saveRetentionState(state: RetentionState): void {
  mmkv.set(KEY, JSON.stringify(state));
}

function update(mutator: (prev: RetentionState) => RetentionState): RetentionState {
  const next = mutator(loadRetentionState());
  saveRetentionState(next);
  return next;
}

export function touchAppOpen(): RetentionState {
  return update((prev) => ({
    ...prev,
    lastAppOpenAt: new Date().toISOString(),
  }));
}

export function recordLessonCompletion(at = new Date()): RetentionState {
  const cutoff = at.getTime() - LESSON_RETENTION_DAYS * 24 * 60 * 60 * 1000;
  return update((prev) => {
    const next = [
      ...prev.lessonCompletions.filter((iso) => {
        const t = Date.parse(iso);
        return !Number.isNaN(t) && t >= cutoff;
      }),
      at.toISOString(),
    ];
    return { ...prev, lessonCompletions: next };
  });
}

export function activateDemoSub(planId: PlanId): RetentionState {
  return update((prev) => ({
    ...prev,
    isPremiumDemo: true,
    planId,
    cancelledAt: null,
    cancelReason: null,
    pausedUntil: null,
  }));
}

export function acceptSaveOffer(
  reason: CancelReason,
  offer: SaveOffer,
): RetentionState {
  return update((prev) => {
    const now = new Date();
    let next: RetentionState = {
      ...prev,
      cancelReason: reason,
    };

    if (offer.kind === "discount" && offer.discountPercent && offer.months) {
      const ends = new Date(now);
      ends.setMonth(ends.getMonth() + offer.months);
      next = {
        ...next,
        isPremiumDemo: true,
        discountPercent: offer.discountPercent,
        discountEndsAt: ends.toISOString(),
        cancelledAt: null,
      };
    } else if (offer.kind === "pause" && offer.months) {
      const until = new Date(now);
      until.setMonth(until.getMonth() + offer.months);
      next = {
        ...next,
        isPremiumDemo: true,
        pausedUntil: until.toISOString(),
        cancelledAt: null,
      };
    } else if (offer.kind === "downgrade" && offer.targetPlanId) {
      next = {
        ...next,
        isPremiumDemo: true,
        planId: offer.targetPlanId,
        cancelledAt: null,
      };
    } else {
      // roadmap / support / value_reminder — keep sub, clear cancel intent
      next = {
        ...next,
        isPremiumDemo: true,
        cancelledAt: null,
      };
    }

    return next;
  });
}

export function confirmCancel(reason: CancelReason): RetentionState {
  return update((prev) => ({
    ...prev,
    isPremiumDemo: false,
    planId: null,
    pausedUntil: null,
    discountEndsAt: null,
    discountPercent: null,
    cancelReason: reason,
    cancelledAt: new Date().toISOString(),
  }));
}

export function reactivateDemoSub(planId: PlanId = "sub-genius"): RetentionState {
  return activateDemoSub(planId);
}

/** Premium actif et non en pause. */
export function isEffectivelyPremium(state = loadRetentionState()): boolean {
  if (!state.isPremiumDemo || !state.planId) return false;
  if (state.pausedUntil) {
    const until = Date.parse(state.pausedUntil);
    if (!Number.isNaN(until) && until > Date.now()) return false;
  }
  return true;
}

export function isPaused(state = loadRetentionState()): boolean {
  if (!state.isPremiumDemo || !state.pausedUntil) return false;
  const until = Date.parse(state.pausedUntil);
  return !Number.isNaN(until) && until > Date.now();
}

export function daysUntilPauseEnds(state = loadRetentionState()): number | null {
  if (!state.pausedUntil) return null;
  const until = Date.parse(state.pausedUntil);
  if (Number.isNaN(until)) return null;
  const ms = until - Date.now();
  if (ms <= 0) return 0;
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
}

export function daysSinceCancel(state = loadRetentionState()): number | null {
  if (!state.cancelledAt) return null;
  const t = Date.parse(state.cancelledAt);
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / (24 * 60 * 60 * 1000));
}

export function lessonsCompletedInLastDays(
  days: number,
  state = loadRetentionState(),
): number {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return state.lessonCompletions.filter((iso) => {
    const t = Date.parse(iso);
    return !Number.isNaN(t) && t >= cutoff;
  }).length;
}

export function markNudgeShown(nudgeId: string): RetentionState {
  return update((prev) => ({
    ...prev,
    nudgeShownAt: {
      ...prev.nudgeShownAt,
      [nudgeId]: new Date().toISOString(),
    },
  }));
}

export function setCachedHealthScore(score: number): RetentionState {
  return update((prev) => ({
    ...prev,
    lastHealthScore: score,
    lastHealthScoreAt: new Date().toISOString(),
  }));
}

export function planDisplayName(planId: PlanId | null): string {
  if (planId === "sub-boost") return "Boost";
  if (planId === "sub-genius") return "Genius";
  return "Aucun";
}
