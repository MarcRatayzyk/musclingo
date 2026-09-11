import i18n from "@/i18n";
import type {
  MotivationId,
  PathChapterPreview,
  PathSlug,
  StreakGoalDays,
} from "./types";

/** Accent colors only — labels come from i18n. */
export const BLOCKER_OPTIONS: Array<{
  id: MotivationId;
  accent: string;
}> = [
  { id: "understand_training", accent: "#7CFFB2" },
  { id: "progress", accent: "#D4894A" },
  { id: "anatomy", accent: "#8BB4FF" },
  { id: "build_workouts", accent: "#D4894A" },
  { id: "autonomy", accent: "#7CFFB2" },
];

/** @deprecated Prefer BLOCKER_OPTIONS — kept for recommendPath weights. */
export const MOTIVATION_OPTIONS = BLOCKER_OPTIONS;

export function getBlockerLabel(id: MotivationId): string {
  return i18n.t(`onboarding:blockers.${id}`);
}

export const AVAILABLE_PATH_SLUGS: PathSlug[] = ["anatomie", "nutrition"];

export const PATH_OPTIONS: Array<{
  slug: PathSlug;
  accent: string;
  comingSoon?: boolean;
}> = [
  { slug: "anatomie", accent: "#8BB4FF" },
  { slug: "nutrition", accent: "#7CFFB2" },
  { slug: "biomecanique", accent: "#D4894A", comingSoon: true },
  { slug: "recuperation", accent: "#8BB4FF", comingSoon: true },
  { slug: "programmation", accent: "#D4894A", comingSoon: true },
];

export function getPathLabel(slug: PathSlug): string {
  return i18n.t(`onboarding:paths.${slug}.label`);
}

export function getPathHint(slug: PathSlug): string | undefined {
  const key = `onboarding:paths.${slug}.hint`;
  const value = i18n.t(key, { defaultValue: "" });
  return value || undefined;
}

export const STREAK_GOAL_OPTIONS: Array<{
  days: StreakGoalDays;
  label: string;
  tagline: string;
  neuroCoins: number;
  waterBottles: number;
  accent: string;
}> = [
  {
    days: 7,
    label: "7 jours",
    tagline: "Pose les bases — idéal pour démarrer",
    neuroCoins: 100,
    waterBottles: 0,
    accent: "#7CFFB2",
  },
  {
    days: 20,
    label: "20 jours",
    tagline: "L’habitude s’installe — le plus choisi",
    neuroCoins: 350,
    waterBottles: 0,
    accent: "#8BB4FF",
  },
  {
    days: 50,
    label: "50 jours",
    tagline: "Le niveau expert — max de récompenses",
    neuroCoins: 1000,
    waterBottles: 10,
    accent: "#D4894A",
  },
];

export function getStreakGoalReward(days: StreakGoalDays) {
  return STREAK_GOAL_OPTIONS.find((o) => o.days === days)!;
}

export const PATH_CHAPTERS: Record<PathSlug, PathChapterPreview[]> = {
  anatomie: [
    { id: "a1", title: "Bases du corps", unlocked: true },
    { id: "a2", title: "Les muscles", unlocked: false },
    { id: "a3", title: "Les mouvements", unlocked: false },
    { id: "a4", title: "Les articulations", unlocked: false },
    { id: "a5", title: "Comprendre un exercice", unlocked: false },
  ],
  nutrition: [
    { id: "n1", title: "Énergie et besoins", unlocked: true },
    { id: "n2", title: "Protéines & muscles", unlocked: false },
    { id: "n3", title: "Timing des repas", unlocked: false },
    { id: "n4", title: "Hydratation", unlocked: false },
    { id: "n5", title: "Construire ton assiette", unlocked: false },
  ],
  programmation: [
    { id: "p1", title: "Structure d’une séance", unlocked: true },
    { id: "p2", title: "Volume et intensité", unlocked: false },
    { id: "p3", title: "Progression", unlocked: false },
    { id: "p4", title: "Choix des exercices", unlocked: false },
    { id: "p5", title: "Construire un programme", unlocked: false },
  ],
  biomecanique: [
    { id: "b1", title: "Adaptation musculaire", unlocked: true },
    { id: "b2", title: "Force et hypertrophie", unlocked: false },
    { id: "b3", title: "Système nerveux", unlocked: false },
    { id: "b4", title: "Fatigue", unlocked: false },
    { id: "b5", title: "Surcompensation", unlocked: false },
  ],
  recuperation: [
    { id: "r1", title: "Sommeil et performance", unlocked: true },
    { id: "r2", title: "Stress et récupération", unlocked: false },
    { id: "r3", title: "Gestion de la fatigue", unlocked: false },
    { id: "r4", title: "Mobilité légère", unlocked: false },
    { id: "r5", title: "Écouter son corps", unlocked: false },
  ],
};

export type InsightPack = {
  echo: string;
  diagnosis: string;
  firstStep: string;
  premiumHook: string;
};

export function getInsight(blocker: MotivationId | undefined): InsightPack {
  const id = blocker ?? "understand_training";
  return {
    echo: i18n.t(`onboarding:insights.${id}.echo`),
    diagnosis: i18n.t(`onboarding:insights.${id}.diagnosis`),
    firstStep: i18n.t(`onboarding:insights.${id}.firstStep`),
    premiumHook: i18n.t(`onboarding:insights.${id}.premiumHook`),
  };
}

/** @deprecated Use i18n `onboarding:*` keys via useTranslation. */
export const CONVERSION_COPY = {
  pain: {
    get headline() {
      return i18n.t("onboarding:pain.headline");
    },
    get body() {
      return i18n.t("onboarding:pain.body");
    },
    get cta() {
      return i18n.t("onboarding:pain.cta");
    },
    get login() {
      return i18n.t("onboarding:pain.login");
    },
  },
  amplify: {
    get headline() {
      return i18n.t("onboarding:amplify.headline");
    },
    get body() {
      return i18n.t("onboarding:amplify.body");
    },
    get bullets() {
      return i18n.t("onboarding:amplify.bullets", {
        returnObjects: true,
      }) as string[];
    },
    get cta() {
      return i18n.t("onboarding:amplify.cta");
    },
  },
  positioning: {
    get headline() {
      return i18n.t("onboarding:positioning.headline");
    },
    get insight() {
      return i18n.t("onboarding:positioning.insight");
    },
    get solution() {
      return i18n.t("onboarding:positioning.solution");
    },
    get cta() {
      return i18n.t("onboarding:positioning.cta");
    },
  },
  personalize: {
    get headline() {
      return i18n.t("onboarding:personalize.headline");
    },
    get hint() {
      return i18n.t("onboarding:personalize.hint");
    },
    get cta() {
      return i18n.t("onboarding:personalize.cta");
    },
  },
  value: {
    get loading() {
      return i18n.t("onboarding:value.loading");
    },
    get cta() {
      return i18n.t("onboarding:value.cta");
    },
  },
  preview: {
    get headline() {
      return i18n.t("onboarding:preview.headline");
    },
    get freeLabel() {
      return i18n.t("onboarding:preview.freeLabel");
    },
    get lockedLabel() {
      return i18n.t("onboarding:preview.lockedLabel");
    },
    get body() {
      return i18n.t("onboarding:preview.body");
    },
    get cta() {
      return i18n.t("onboarding:preview.cta");
    },
  },
  paywall: {
    get headline() {
      return i18n.t("onboarding:paywall.headline");
    },
    get sub() {
      return i18n.t("onboarding:paywall.sub");
    },
    get benefits() {
      return i18n.t("onboarding:paywall.benefits", {
        returnObjects: true,
      }) as string[];
    },
    get price() {
      return i18n.t("onboarding:paywall.price");
    },
    get billing() {
      return i18n.t("onboarding:paywall.billing");
    },
    get cta() {
      return i18n.t("onboarding:paywall.cta");
    },
    get skip() {
      return i18n.t("onboarding:paywall.skip");
    },
  },
} as const;

export const MASCOT_COPY = {
  personalizing: "Je construis ton parcours…",
  pathReady: "Ta première leçon t’attend.",
  welcomeTagline: "La science du corps, entre deux séries.",
  welcomeTrust: "Micro-leçons validées par la science de l’entraînement",
  welcomeHero: "Apprends la muscu pendant tes repos.",
  welcomeBody:
    "Je suis Gorille. Micro-leçons de 2 minutes — anatomie, nutrition, entraînement — à faire entre tes séries.",
  motivationAsk: "Qu’est-ce qui te freine le plus ?",
  priorityAsk: "Par quoi on commence ?",
  prioritySoon: "Ces parcours arrivent bientôt.",
  goalAsk: "Combien de jours d’affilée tu vises ?",
  goalHint: "Tiens la série : tu débloques les récompenses.",
} as const;
