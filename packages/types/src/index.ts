export * from "./levels";
export * from "./schemas";
export * from "./illustration-legends";
export * from "./hotspot-regions";

export const ANALYTICS_EVENTS = {
  LOGIN: "login",
  SIGNUP: "signup",
  SESSION_START: "session_start",
  SESSION_END: "session_end",
  LESSON_OPENED: "lesson_opened",
  LESSON_COMPLETED: "lesson_completed",
  QUIZ_STARTED: "quiz_started",
  QUIZ_COMPLETED: "quiz_completed",
  QUIZ_PASSED: "quiz_passed",
  QUIZ_FAILED: "quiz_failed",
  MINIGAME_STARTED: "minigame_started",
  MINIGAME_COMPLETED: "minigame_completed",
  BADGE_EARNED: "badge_earned",
  XP_EARNED: "xp_earned",
  LEVEL_UP: "level_up",
  SEARCH: "search",
  READING_TIME: "reading_time",
  STREAK_UPDATED: "streak_updated",
  PREMIUM_SUBSCRIBED: "premium_subscribed",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
