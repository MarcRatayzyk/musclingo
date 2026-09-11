export * from "./levels";
export * from "./schemas";
export * from "./illustration-legends";
export * from "./hotspot-regions";

export const ANALYTICS_EVENTS = {
  LOGIN: "login",
  SIGNUP: "signup",
  SESSION_START: "session_start",
  SESSION_END: "session_end",
  GUEST_SESSION_STARTED: "guest_session_started",
  CLAIM_PROMPT_SHOWN: "claim_prompt_shown",
  CLAIM_COMPLETED: "claim_completed",
  CLAIM_SKIPPED: "claim_skipped",
  SOFT_PAYWALL_SHOWN: "soft_paywall_shown",
  SOFT_PAYWALL_CTA: "soft_paywall_cta",
  ONBOARDING_STARTED: "onboarding_started",
  ONBOARDING_SCREEN_VIEWED: "onboarding_screen_viewed",
  ONBOARDING_QUESTION_ANSWERED: "onboarding_question_answered",
  ONBOARDING_COMPLETED: "onboarding_completed",
  ONBOARDING_DROPPED: "onboarding_dropped",
  VALUE_MOMENT_REACHED: "value_moment_reached",
  PAYWALL_VIEWED: "paywall_viewed",
  PAYWALL_CTA_CLICKED: "paywall_cta_clicked",
  TRIAL_STARTED: "trial_started",
  SUBSCRIPTION_STARTED: "subscription_started",
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
  SUBSCRIPTION_MANAGE_OPENED: "subscription_manage_opened",
  CANCEL_SURVEY_ANSWERED: "cancel_survey_answered",
  CANCEL_OFFER_SHOWN: "cancel_offer_shown",
  CANCEL_OFFER_ACCEPTED: "cancel_offer_accepted",
  CANCEL_OFFER_DECLINED: "cancel_offer_declined",
  SUBSCRIPTION_CANCELLED: "subscription_cancelled",
  RETENTION_NUDGE_SHOWN: "retention_nudge_shown",
  RETENTION_NUDGE_TAPPED: "retention_nudge_tapped",
  ENGAGEMENT_HEALTH_SCORED: "engagement_health_scored",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
