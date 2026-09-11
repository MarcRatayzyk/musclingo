import type { MascotPose } from "@/features/mascot";
import type { AppLocale } from "@/i18n/localeStorage";

export type OnboardingStepId =
  | "language"
  | "pain"
  | "amplify"
  | "positioning"
  | "personalize"
  | "value"
  | "preview"
  | "paywall";

/** Analytics screen ids (stable). */
export const ONBOARDING_SCREEN_IDS: Record<OnboardingStepId, string> = {
  language: "onboarding_language_01",
  pain: "onboarding_pain_01",
  amplify: "onboarding_amplify_01",
  positioning: "onboarding_positioning_01",
  personalize: "onboarding_personalization_01",
  value: "onboarding_value_01",
  preview: "onboarding_preview_01",
  paywall: "paywall_01",
};

export type MotivationId =
  | "understand_training"
  | "build_workouts"
  | "nutrition"
  | "anatomy"
  | "progress"
  | "autonomy";

export type LevelId = "beginner" | "basics" | "regular" | "advanced";

export type PathSlug =
  | "anatomie"
  | "nutrition"
  | "programmation"
  | "biomecanique"
  | "recuperation";

export type StreakGoalDays = 7 | 20 | 50;

export type MascotMood =
  | "happy"
  | "excited"
  | "neutral"
  | "thinking"
  | "encouraging"
  | "celebrating"
  | "explaining";

export type OnboardingAnswers = {
  locale: AppLocale | null;
  motivations: MotivationId[];
  level: LevelId | null;
  preferredPath: PathSlug | null;
  streakGoalDays: StreakGoalDays | null;
};

export type PathChapterPreview = {
  id: string;
  title: string;
  unlocked: boolean;
};

export const MOOD_TO_POSE: Record<MascotMood, MascotPose> = {
  happy: "present",
  excited: "present",
  celebrating: "present",
  thinking: "doubt",
  encouraging: "default",
  explaining: "default",
  neutral: "default",
};

export const ONBOARDING_STEPS: OnboardingStepId[] = [
  "language",
  "pain",
  "amplify",
  "positioning",
  "personalize",
  "value",
  "preview",
  "paywall",
];

export const INITIAL_ANSWERS: OnboardingAnswers = {
  locale: null,
  motivations: [],
  level: null,
  preferredPath: null,
  streakGoalDays: null,
};
