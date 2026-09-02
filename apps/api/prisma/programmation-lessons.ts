export type { ProgrammationSeedLesson } from "./programmation/types";
export { CP } from "./programmation/checkpoints";

import { THEME_0_LESSONS } from "./programmation/theme-0-fondamentaux";
import { THEME_1_LESSONS } from "./programmation/theme-1-volume";
import { THEME_2_LESSONS } from "./programmation/theme-2-frequence";
import { THEME_3_LESSONS } from "./programmation/theme-3-intensite";
import { THEME_4_LESSONS } from "./programmation/theme-4-progression";
import { THEME_5_LESSONS } from "./programmation/theme-5-seances";
import { THEME_6_LESSONS } from "./programmation/theme-6-splits";
import { THEME_7_LESSONS } from "./programmation/theme-7-periodisation";
import { THEME_8_LESSONS } from "./programmation/theme-8-individualisation";
import { THEME_9_LESSONS } from "./programmation/theme-9-avance";

export const PROGRAMMATION_LESSONS = [
  ...THEME_0_LESSONS,
  ...THEME_1_LESSONS,
  ...THEME_2_LESSONS,
  ...THEME_3_LESSONS,
  ...THEME_4_LESSONS,
  ...THEME_5_LESSONS,
  ...THEME_6_LESSONS,
  ...THEME_7_LESSONS,
  ...THEME_8_LESSONS,
  ...THEME_9_LESSONS,
].map((lesson, order) => ({ ...lesson, order }));
