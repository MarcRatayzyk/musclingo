import type { ImageSourcePropType } from "react-native";
import type { MascotPose } from "./types";

export type MascotKind = "gorilla" | "turtle";

export const GORILLA_MASCOT_IMAGES: Record<MascotPose, ImageSourcePropType> = {
  present: require("../../../assets/G_Present.png"),
  doubt: require("../../../assets/G_doute.png"),
  default: require("../../../assets/G_croise.png"),
};

/** Tortue Nutrition : salut / réflexion / attitude. */
export const TURTLE_MASCOT_IMAGES: Record<MascotPose, ImageSourcePropType> = {
  present: require("../../../assets/T_salut.png"),
  doubt: require("../../../assets/T_pense.png"),
  default: require("../../../assets/T_croise.png"),
};

export const TURTLE_QUIZ_IMAGES = {
  pass: require("../../../assets/T_bravo.png"),
  fail: require("../../../assets/T_triste.png"),
} as const;

/** @deprecated alias — préférer getMascotImages */
export const MASCOT_IMAGES = GORILLA_MASCOT_IMAGES;

export function getMascotImages(kind: MascotKind = "gorilla") {
  return kind === "turtle" ? TURTLE_MASCOT_IMAGES : GORILLA_MASCOT_IMAGES;
}

export function mascotKindFromCategorySlug(
  slug: string | undefined | null,
): MascotKind {
  return slug === "nutrition" ? "turtle" : "gorilla";
}

export const MASCOT_SIZES = {
  sm: 72,
  md: 112,
  /** Fallback leçon si pas de `dimension` responsive. */
  lesson: 140,
  lg: 220,
} as const;

export const MASCOT_POSE_CYCLE: MascotPose[] = ["present", "doubt", "default"];

export function nextMascotPose(current: MascotPose): MascotPose {
  const index = MASCOT_POSE_CYCLE.indexOf(current);
  return MASCOT_POSE_CYCLE[(index + 1) % MASCOT_POSE_CYCLE.length];
}
