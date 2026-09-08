import type { ImageSourcePropType } from "react-native";

export const NUTRITION_PATH_IMAGES = {
  salut: require("../../../assets/T_salut.png"),
  croise: require("../../../assets/T_croise.png"),
  pense: require("../../../assets/T_pense.png"),
  bravo: require("../../../assets/T_bravo.png"),
  triste: require("../../../assets/T_triste.png"),
} as const satisfies Record<string, ImageSourcePropType>;

/**
 * Ancres tortue — réparties sur le parcours Nutrition.
 * ≥ 4 leçons entre chaque quand c’est possible.
 */
const NUTRITION_ILLUSTRATION_BY_TITLE: Array<{
  titles: string[];
  image: keyof typeof NUTRITION_PATH_IMAGES;
}> = [
  { titles: ["calories"], image: "salut" },
  { titles: ["journée équilibrée", "journee equilibree"], image: "croise" },
  {
    titles: ["déficit, maintien, surplus", "deficit, maintien, surplus"],
    image: "pense",
  },
  { titles: ["microbiote"], image: "bravo" },
  { titles: ["marketing alimentaire"], image: "triste" },
];

export function getNutritionPathIllustrationAtLesson(
  _checkpointKey: string,
  _lessonOrder: number,
  lessonTitle?: string,
): ImageSourcePropType | null {
  if (!lessonTitle) return null;
  const t = lessonTitle.trim().toLowerCase();
  const anchor = NUTRITION_ILLUSTRATION_BY_TITLE.find((item) =>
    item.titles.includes(t),
  );
  return anchor ? NUTRITION_PATH_IMAGES[anchor.image] : null;
}
