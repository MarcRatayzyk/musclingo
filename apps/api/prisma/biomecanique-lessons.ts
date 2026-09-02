export type { BiomecaniqueSeedLesson } from "./biomecanique/types";
export { CP } from "./biomecanique/checkpoints";

import { THEME_0_LESSONS } from "./biomecanique/theme-0-bases-corps";
import { THEME_1_LESSONS } from "./biomecanique/theme-1-mouvements";
import { THEME_2_LESSONS } from "./biomecanique/theme-2-muscles";
import { THEME_3_LESSONS } from "./biomecanique/theme-3-forces";
import { THEME_4_LESSONS } from "./biomecanique/theme-4-resistance";
import { THEME_5_LESSONS } from "./biomecanique/theme-5-position";
import { THEME_6_LESSONS } from "./biomecanique/theme-6-exercices";
import { THEME_7_LESSONS } from "./biomecanique/theme-7-entrainement";
import { THEME_8_LESSONS } from "./biomecanique/theme-8-analyse";

export const BIOMECANIQUE_LESSONS = [
  ...THEME_0_LESSONS,
  ...THEME_1_LESSONS,
  ...THEME_2_LESSONS,
  ...THEME_3_LESSONS,
  ...THEME_4_LESSONS,
  ...THEME_5_LESSONS,
  ...THEME_6_LESSONS,
  ...THEME_7_LESSONS,
  ...THEME_8_LESSONS,
].map((lesson, order) => ({ ...lesson, order }));
