import type { SeedQuestion } from "./anatomie-quiz-helpers";
import { CP } from "./anatomie/checkpoints";
import {
  condenseThemeToGate20,
  condenseThemeToGateN,
} from "./anatomie/gate-helpers";
import { THEME_0_OS_LABELS } from "./anatomie/theme-0-os-labels";
import { THEME_0_QUIZZES } from "./anatomie/theme-0-os-questions";
import { THEME_1_QUIZZES } from "./anatomie/theme-1-muscles-haut-questions";
import { THEME_2_QUIZZES } from "./anatomie/theme-2-muscles-bas-questions";
import { THEME_3_QUIZZES } from "./anatomie/theme-3-articulations-questions";
import { THEME_4_QUIZZES } from "./anatomie/theme-4-muscles-haut-approfondi-questions";
import { THEME_5_QUIZZES } from "./anatomie/theme-5-muscles-bas-approfondi-questions";
import { THEME_6_QUIZZES } from "./anatomie/theme-6-tissus-questions";
import { THEME_7_QUIZZES } from "./anatomie/theme-7-organisation-questions";

export type AnatomieGateSeed = {
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
  timeLimitSec: 120,
  passThreshold: 0.9,
  questionCount: 20,
  xpReward: 50,
} as const;

export const ANATOMIE_GATES: AnatomieGateSeed[] = [
  {
    ...CP.os,
    ...GATE,
    title: "Checkpoint Os",
    questions: [
      ...THEME_0_OS_LABELS,
      ...condenseThemeToGateN(THEME_0_QUIZZES, 16),
    ],
  },
  {
    ...CP.musclesHaut,
    ...GATE,
    title: "Checkpoint Muscles du haut du corps",
    questions: condenseThemeToGate20(THEME_1_QUIZZES),
  },
  {
    ...CP.musclesBas,
    ...GATE,
    title: "Checkpoint Muscles du bas du corps",
    questions: condenseThemeToGate20(THEME_2_QUIZZES),
  },
  {
    ...CP.articulations,
    ...GATE,
    title: "Checkpoint Articulations",
    questions: condenseThemeToGate20(THEME_3_QUIZZES),
  },
  {
    ...CP.musclesHautApprofondi,
    ...GATE,
    title: "Checkpoint Haut du corps en profondeur",
    questions: condenseThemeToGate20(THEME_4_QUIZZES),
  },
  {
    ...CP.musclesBasApprofondi,
    ...GATE,
    title: "Checkpoint Bas du corps en profondeur",
    questions: condenseThemeToGate20(THEME_5_QUIZZES),
  },
  {
    ...CP.tissus,
    ...GATE,
    title: "Checkpoint Tissus et fonctionnement",
    questions: condenseThemeToGate20(THEME_6_QUIZZES),
  },
  {
    ...CP.organisation,
    ...GATE,
    title: "Checkpoint Organisation du mouvement",
    questions: condenseThemeToGate20(THEME_7_QUIZZES),
  },
];
