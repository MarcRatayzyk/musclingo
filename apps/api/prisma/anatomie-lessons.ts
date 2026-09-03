export type { AnatomieSeedLesson } from "./anatomie/types";
export { CP } from "./anatomie/checkpoints";

import { THEME_0_LESSONS } from "./anatomie/theme-0-os";
import { THEME_1_LESSONS } from "./anatomie/theme-1-muscles-haut";
import { THEME_2_LESSONS } from "./anatomie/theme-2-muscles-bas";
import { THEME_3_LESSONS } from "./anatomie/theme-3-articulations";
import { THEME_4_LESSONS } from "./anatomie/theme-4-muscles-haut-approfondi";
import { THEME_5_LESSONS } from "./anatomie/theme-5-muscles-bas-approfondi";
import { THEME_6_LESSONS } from "./anatomie/theme-6-tissus";
import { THEME_7_LESSONS } from "./anatomie/theme-7-organisation";

export const ANATOMIE_LESSONS = [
  ...THEME_0_LESSONS,
  ...THEME_1_LESSONS,
  ...THEME_2_LESSONS,
  ...THEME_3_LESSONS,
  ...THEME_4_LESSONS,
  ...THEME_5_LESSONS,
  ...THEME_6_LESSONS,
  ...THEME_7_LESSONS,
];
