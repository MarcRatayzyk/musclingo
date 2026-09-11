import { create } from "zustand";
import { recommendPath } from "./recommend";
import {
  loadOnboardingAnswers,
  markOnboardingCompleted,
  saveOnboardingAnswers,
  startStreakGoalChallenge,
} from "./storage";
import {
  INITIAL_ANSWERS,
  ONBOARDING_STEPS,
  type LevelId,
  type MotivationId,
  type OnboardingAnswers,
  type OnboardingStepId,
  type PathSlug,
  type StreakGoalDays,
} from "./types";
import type { AppLocale } from "@/i18n/localeStorage";

type OnboardingStore = {
  stepIndex: number;
  answers: OnboardingAnswers;
  setStepIndex: (index: number) => void;
  goNext: () => void;
  goBack: () => void;
  setLocale: (locale: AppLocale) => void;
  toggleMotivation: (id: MotivationId) => void;
  setPrimaryBlocker: (id: MotivationId) => void;
  setLevel: (id: LevelId) => void;
  setPreferredPath: (slug: PathSlug) => void;
  setStreakGoalDays: (days: StreakGoalDays) => void;
  applyRecommendation: () => void;
  persist: () => void;
  complete: () => void;
  reset: () => void;
  stepId: () => OnboardingStepId;
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => {
  const loaded = loadOnboardingAnswers();
  return {
    stepIndex: 0,
    answers: loaded,

    setStepIndex: (index) =>
      set({
        stepIndex: Math.max(0, Math.min(index, ONBOARDING_STEPS.length - 1)),
      }),

    goNext: () => {
      const { stepIndex } = get();
      const last = ONBOARDING_STEPS.length - 1;
      if (stepIndex < last) {
        set({ stepIndex: stepIndex + 1 });
      }
    },

    goBack: () => {
      const { stepIndex } = get();
      if (stepIndex > 0) set({ stepIndex: stepIndex - 1 });
    },

    setLocale: (locale) =>
      set({ answers: { ...get().answers, locale } }),

    toggleMotivation: (id) => {
      const current = get().answers.motivations;
      const next = current.includes(id)
        ? current.filter((m) => m !== id)
        : [...current, id];
      set({ answers: { ...get().answers, motivations: next } });
    },

    setPrimaryBlocker: (id) => {
      set({
        answers: {
          ...get().answers,
          motivations: [id],
          preferredPath: null,
        },
      });
    },

    setLevel: (id) => set({ answers: { ...get().answers, level: id } }),

    setPreferredPath: (slug) =>
      set({ answers: { ...get().answers, preferredPath: slug } }),

    setStreakGoalDays: (days) =>
      set({ answers: { ...get().answers, streakGoalDays: days } }),

    applyRecommendation: () => {
      const answers = get().answers;
      set({
        answers: { ...answers, preferredPath: recommendPath(answers) },
      });
    },

    persist: () => {
      saveOnboardingAnswers(get().answers);
    },

    complete: () => {
      const answers = get().answers;
      const withGoal: OnboardingAnswers = {
        ...answers,
        streakGoalDays: answers.streakGoalDays ?? 20,
      };
      saveOnboardingAnswers(withGoal);
      markOnboardingCompleted();
      if (withGoal.streakGoalDays) {
        startStreakGoalChallenge(withGoal.streakGoalDays);
      }
      set({ answers: withGoal });
    },

    reset: () => {
      set({
        stepIndex: 0,
        answers: { ...INITIAL_ANSWERS, motivations: [], locale: null },
      });
    },

    stepId: () => ONBOARDING_STEPS[get().stepIndex] ?? "language",
  };
});
