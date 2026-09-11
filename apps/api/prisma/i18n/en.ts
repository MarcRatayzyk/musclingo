/** English overlays for seed + runtime API fallback. */

export const CATEGORY_NAME_EN: Record<string, string> = {
  anatomie: "Anatomy",
  nutrition: "Nutrition",
  biomecanique: "Biomechanics",
  programmation: "Programming",
  recuperation: "Recovery",
};

export const CHECKPOINT_TITLE_EN: Record<string, string> = {
  // Generic
  Bases: "Basics",
  Intermédiaire: "Intermediate",
  Avancé: "Advanced",
  "Bases du corps": "Body basics",
  "Les muscles": "Muscles",
  "Les mouvements": "Movements",
  "Les articulations": "Joints",
  "Comprendre un exercice": "Understanding an exercise",
  "Énergie et besoins": "Energy and needs",
  "Protéines & muscles": "Protein & muscles",
  "Timing des repas": "Meal timing",
  Hydratation: "Hydration",
  "Construire ton assiette": "Build your plate",

  // Anatomie units
  Os: "Bones",
  "Haut du corps niveau 1": "Upper body level 1",
  "Bas du corps niveau 1": "Lower body level 1",
  Articulations: "Joints",
  "Haut du corps niveau 2": "Upper body level 2",
  "Bas du corps niveau 2": "Lower body level 2",
  "Tissus et fonctionnement": "Tissues and function",
  "Organisation du mouvement": "Movement organization",

  // Anatomie gates
  "Checkpoint Os": "Bones Checkpoint",
  "Checkpoint Haut du corps niveau 1": "Upper body level 1 Checkpoint",
  "Checkpoint Bas du corps niveau 1": "Lower body level 1 Checkpoint",
  "Checkpoint Articulations": "Joints Checkpoint",
  "Checkpoint Haut du corps niveau 2": "Upper body level 2 Checkpoint",
  "Checkpoint Bas du corps niveau 2": "Lower body level 2 Checkpoint",
  "Checkpoint Tissus et fonctionnement": "Tissues and function Checkpoint",
  "Checkpoint Organisation du mouvement": "Movement organization Checkpoint",

  // Nutrition
  Macronutriments: "Macronutrients",
  Micronutriments: "Micronutrients",
  "Alimentation équilibrée": "Balanced eating",
  "Besoins énergétiques": "Energy needs",
  "Digestion et métabolisme": "Digestion and metabolism",
  "Fibres et microbiote": "Fiber and microbiome",
  "Lire les aliments": "Reading food labels",
  "Nutrition et objectifs": "Nutrition and goals",
  "Checkpoint Macronutriments": "Macronutrients Checkpoint",
  "Checkpoint Micronutriments": "Micronutrients Checkpoint",
  "Checkpoint Alimentation équilibrée": "Balanced eating Checkpoint",
  "Checkpoint Besoins énergétiques": "Energy needs Checkpoint",
  "Checkpoint Digestion et métabolisme": "Digestion and metabolism Checkpoint",
  "Checkpoint Fibres et microbiote": "Fiber and microbiome Checkpoint",
  "Checkpoint Lire les aliments": "Reading food labels Checkpoint",
  "Checkpoint Nutrition et objectifs": "Nutrition and goals Checkpoint",

  // Biomécanique
  "Les bases du corps humain": "Human body basics",
  "Comprendre les mouvements": "Understanding movements",

  // Récupération
  Sommeil: "Sleep",
  "Douleurs et tissus": "Pain and tissues",
  "Système nerveux et stress": "Nervous system and stress",
  "Mobilité et étirements": "Mobility and stretching",
  "Récupération active et outils": "Active recovery and tools",
  "Charge, fatigue et surentraînement": "Load, fatigue and overtraining",

  // Programmation
  "Fondamentaux de la programmation": "Programming fundamentals",
  "Le volume": "Volume",
  "Fréquence et distribution": "Frequency and distribution",
  "Intensité et effort": "Intensity and effort",
  Progression: "Progression",
  "Organiser les séances": "Organizing sessions",
  "Construire les splits": "Building splits",
  Périodisation: "Periodization",
  Individualisation: "Individualization",
  "Spécialisation et programmation avancée": "Specialization and advanced programming",
};

export const BADGE_EN: Record<string, { name: string; description: string }> = {
  FIRST_LESSON: {
    name: "First lesson",
    description: "You finished your first micro-lesson.",
  },
  FIRST_QUIZ: {
    name: "First quiz",
    description: "You passed your first quiz.",
  },
  MINIGAME_FIRST: {
    name: "First flash quiz",
    description: "You played your first flash quiz round.",
  },
  MINIGAME_COMBO_10: {
    name: "10-hit streak",
    description: "10 correct answers in a row in flash quiz.",
  },
  MINIGAME_FLAWLESS: {
    name: "Flawless",
    description: "A flash quiz round finished without losing a life.",
  },
  MINIGAME_SPEED_20: {
    name: "Lightning",
    description: "A score of 20 or more in flash quiz.",
  },
};

export function translateCheckpointTitle(fr: string): string {
  if (!fr) return fr;
  const exact = CHECKPOINT_TITLE_EN[fr];
  if (exact) return exact;

  if (fr.startsWith("Checkpoint ")) {
    const rest = fr.slice("Checkpoint ".length);
    const restEn = CHECKPOINT_TITLE_EN[rest] ?? rest;
    return `${restEn} Checkpoint`;
  }

  return fr;
}
