export type { NutritionSeedLesson } from "./nutrition/types";
export { CP } from "./nutrition/checkpoints";

import { THEME_0_LESSONS } from "./nutrition/theme-0-macros";
import { THEME_1_LESSONS } from "./nutrition/theme-1-micros";
import { THEME_2_LESSONS } from "./nutrition/theme-2-equilibre";
import { THEME_3_LESSONS } from "./nutrition/theme-3-energie";
import { THEME_4_LESSONS } from "./nutrition/theme-4-digestion";
import { THEME_5_LESSONS } from "./nutrition/theme-5-fibres";
import { THEME_6_LESSONS } from "./nutrition/theme-6-etiquettes";
import { THEME_7_LESSONS } from "./nutrition/theme-7-objectifs";

export const NUTRITION_LESSONS = [
  ...THEME_0_LESSONS,
  ...THEME_1_LESSONS,
  ...THEME_2_LESSONS,
  ...THEME_3_LESSONS,
  ...THEME_4_LESSONS,
  ...THEME_5_LESSONS,
  ...THEME_6_LESSONS,
  ...THEME_7_LESSONS,
];
