import type { ImageSourcePropType } from "react-native";
import type { MascotPose } from "./types";

export const MASCOT_IMAGES: Record<MascotPose, ImageSourcePropType> = {
  present: require("../../../assets/G_Present.png"),
  doubt: require("../../../assets/G_doute.png"),
  default: require("../../../assets/G_croise.png"),
};

export const MASCOT_SIZES = {
  sm: 72,
  md: 112,
  /** Leçon : un cran sous l’ancien lg pour laisser place à la bulle. */
  lesson: 148,
  lg: 220,
} as const;

export const MASCOT_POSE_CYCLE: MascotPose[] = ["present", "doubt", "default"];

export function nextMascotPose(current: MascotPose): MascotPose {
  const index = MASCOT_POSE_CYCLE.indexOf(current);
  return MASCOT_POSE_CYCLE[(index + 1) % MASCOT_POSE_CYCLE.length];
}
