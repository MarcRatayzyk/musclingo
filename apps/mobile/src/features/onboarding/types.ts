import type { MascotPose } from "@/features/mascot";

export type OnboardingStepId =
  | "welcome"
  | "motivation"
  | "priority"
  | "goal"
  | "personalization";

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
  "welcome",
  "motivation",
  "priority",
  "goal",
  "personalization",
];

export const INITIAL_ANSWERS: OnboardingAnswers = {
  motivations: [],
  level: null,
  preferredPath: null,
  streakGoalDays: null,
};
