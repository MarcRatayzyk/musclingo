import type { SeedQuestion } from "./anatomie-quiz-helpers";
import { CP } from "./nutrition/checkpoints";
import { condenseThemeToGate20 } from "./nutrition/gate-helpers";
import { THEME_0_QUIZZES } from "./nutrition/theme-0-macros-questions";
import { THEME_1_QUIZZES } from "./nutrition/theme-1-micros-questions";
import { THEME_2_QUIZZES } from "./nutrition/theme-2-equilibre-questions";
import { THEME_3_QUIZZES } from "./nutrition/theme-3-energie-questions";
import { THEME_4_QUIZZES } from "./nutrition/theme-4-digestion-questions";
import { THEME_5_QUIZZES } from "./nutrition/theme-5-fibres-questions";
import { THEME_6_QUIZZES } from "./nutrition/theme-6-etiquettes-questions";
import { THEME_7_QUIZZES } from "./nutrition/theme-7-objectifs-questions";

export type NutritionGateSeed = {
  checkpointKey: string;
  checkpointOrder: number;
  title: string;
  timeLimitSec: number;
  passThreshold: number;
  questionCount: number;
  xpReward: number;
  questions: SeedQuestion[];
};

const GATE = {
  timeLimitSec: 60,
  passThreshold: 0.9,
  questionCount: 20,
  xpReward: 50,
} as const;

export const NUTRITION_GATES: NutritionGateSeed[] = [
  {
    ...CP.macros,
    ...GATE,
    title: "Checkpoint Macronutriments",
    questions: condenseThemeToGate20(THEME_0_QUIZZES),
  },
  {
    ...CP.micronutriments,
    ...GATE,
    title: "Checkpoint Micronutriments",
    questions: condenseThemeToGate20(THEME_1_QUIZZES),
  },
  {
    ...CP.equilibre,
    ...GATE,
    title: "Checkpoint Alimentation équilibrée",
    questions: condenseThemeToGate20(THEME_2_QUIZZES),
  },
  {
    ...CP.energie,
    ...GATE,
    title: "Checkpoint Besoins énergétiques",
    questions: condenseThemeToGate20(THEME_3_QUIZZES),
  },
  {
    ...CP.digestion,
    ...GATE,
    title: "Checkpoint Digestion et métabolisme",
    questions: condenseThemeToGate20(THEME_4_QUIZZES),
  },
  {
    ...CP.fibres,
    ...GATE,
    title: "Checkpoint Fibres et microbiote",
    questions: condenseThemeToGate20(THEME_5_QUIZZES),
  },
  {
    ...CP.etiquettes,
    ...GATE,
    title: "Checkpoint Lire les aliments",
    questions: condenseThemeToGate20(THEME_6_QUIZZES),
  },
  {
    ...CP.objectifs,
    ...GATE,
    title: "Checkpoint Objectifs",
    questions: condenseThemeToGate20(THEME_7_QUIZZES),
  },
];
