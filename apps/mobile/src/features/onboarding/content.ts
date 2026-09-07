import type {
  MotivationId,
  PathChapterPreview,
  PathSlug,
  StreakGoalDays,
} from "./types";

export const MOTIVATION_OPTIONS: Array<{
  id: MotivationId;
  label: string;
  emoji: string;
  accent: string;
}> = [
  {
    id: "understand_training",
    label: "Comprendre la musculation",
    emoji: "💡",
    accent: "#7CFFB2",
  },
  {
    id: "build_workouts",
    label: "Meilleurs entraînements",
    emoji: "🏋️",
    accent: "#FF8C5B",
  },
  {
    id: "nutrition",
    label: "Alimentation",
    emoji: "🥗",
    accent: "#5BE0FF",
  },
  {
    id: "anatomy",
    label: "Anatomie",
    emoji: "🦴",
    accent: "#5B8CFF",
  },
  {
    id: "progress",
    label: "Progresser mieux",
    emoji: "📈",
    accent: "#FFB84D",
  },
  {
    id: "autonomy",
    label: "Devenir autonome",
    emoji: "🧭",
    accent: "#C77DFF",
  },
];

export const AVAILABLE_PATH_SLUGS: PathSlug[] = ["anatomie", "nutrition"];

export const PATH_OPTIONS: Array<{
  slug: PathSlug;
  label: string;
  emoji: string;
  accent: string;
  comingSoon?: boolean;
}> = [
  { slug: "anatomie", label: "Anatomie", emoji: "🦴", accent: "#5B8CFF" },
  { slug: "nutrition", label: "Nutrition", emoji: "🥗", accent: "#7CFFB2" },
  {
    slug: "biomecanique",
    label: "Biomécanique",
    emoji: "🧠",
    accent: "#FF8C5B",
    comingSoon: true,
  },
  {
    slug: "recuperation",
    label: "Récupération",
    emoji: "😴",
    accent: "#5BE0FF",
    comingSoon: true,
  },
  {
    slug: "programmation",
    label: "Entraînement",
    emoji: "🏋️",
    accent: "#C77DFF",
    comingSoon: true,
  },
];

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
    tagline: "Premier élan",
    neuroCoins: 100,
    waterBottles: 0,
    accent: "#7CFFB2",
  },
  {
    days: 20,
    label: "20 jours",
    tagline: "Habitude solide",
    neuroCoins: 350,
    waterBottles: 0,
    accent: "#5B8CFF",
  },
  {
    days: 50,
    label: "50 jours",
    tagline: "Transformation",
    neuroCoins: 1000,
    waterBottles: 10,
    accent: "#FFB84D",
  },
];

export function getStreakGoalReward(days: StreakGoalDays) {
  return STREAK_GOAL_OPTIONS.find((o) => o.days === days)!;
}

export const PATH_CHAPTERS: Record<PathSlug, PathChapterPreview[]> = {
  anatomie: [
    { id: "a1", title: "Bases du corps", unlocked: true },
    { id: "a2", title: "Les muscles", unlocked: true },
    { id: "a3", title: "Les mouvements", unlocked: false },
    { id: "a4", title: "Les articulations", unlocked: false },
    { id: "a5", title: "Comprendre un exercice", unlocked: false },
  ],
  nutrition: [
    { id: "n1", title: "Énergie et besoins", unlocked: true },
    { id: "n2", title: "Protéines & muscles", unlocked: true },
    { id: "n3", title: "Timing des repas", unlocked: false },
    { id: "n4", title: "Hydratation", unlocked: false },
    { id: "n5", title: "Construire ton assiette", unlocked: false },
  ],
  programmation: [
    { id: "p1", title: "Structure d’une séance", unlocked: true },
    { id: "p2", title: "Volume et intensité", unlocked: true },
    { id: "p3", title: "Progression", unlocked: false },
    { id: "p4", title: "Choix des exercices", unlocked: false },
    { id: "p5", title: "Construire un programme", unlocked: false },
  ],
  biomecanique: [
    { id: "b1", title: "Adaptation musculaire", unlocked: true },
    { id: "b2", title: "Force et hypertrophie", unlocked: true },
    { id: "b3", title: "Système nerveux", unlocked: false },
    { id: "b4", title: "Fatigue", unlocked: false },
    { id: "b5", title: "Surcompensation", unlocked: false },
  ],
  recuperation: [
    { id: "r1", title: "Sommeil et performance", unlocked: true },
    { id: "r2", title: "Stress et récupération", unlocked: true },
    { id: "r3", title: "Gestion de la fatigue", unlocked: false },
    { id: "r4", title: "Mobilité légère", unlocked: false },
    { id: "r5", title: "Écouter son corps", unlocked: false },
  ],
};

export const MASCOT_COPY = {
  personalizing: "Je prépare ton parcours…",
  pathReady: "Une leçon est prête pour toi.",
} as const;
