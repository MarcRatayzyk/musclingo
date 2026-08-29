export type { RecuperationSeedLesson } from "./recuperation/types";
export { CP } from "./recuperation/checkpoints";

import { THEME_0_LESSONS } from "./recuperation/theme-0-sommeil";
import { THEME_1_LESSONS } from "./recuperation/theme-1-tissus";
import { THEME_2_LESSONS } from "./recuperation/theme-2-nerveux";
import { THEME_3_LESSONS } from "./recuperation/theme-3-mobilite";
import { THEME_4_LESSONS } from "./recuperation/theme-4-outils";
import { THEME_5_LESSONS } from "./recuperation/theme-5-charge";

export const RECUPERATION_LESSONS = [
  ...THEME_0_LESSONS,
  ...THEME_1_LESSONS,
  ...THEME_2_LESSONS,
  ...THEME_3_LESSONS,
  ...THEME_4_LESSONS,
  ...THEME_5_LESSONS,
].map((lesson, order) => ({ ...lesson, order }));
