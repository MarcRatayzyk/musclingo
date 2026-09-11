import { Image, type ImageSourcePropType } from "react-native";
import {
  getMascotImages,
  MASCOT_SIZES,
  TURTLE_QUIZ_IMAGES,
  type MascotKind,
} from "../assets";
import type { MascotPose } from "../types";

type Size = keyof typeof MASCOT_SIZES;

export function GorillaAvatar({
  pose = "present",
  size = "md",
  kind = "gorilla",
  sourceOverride,
  dimension,
}: {
  pose?: MascotPose;
  size?: Size;
  kind?: MascotKind;
  /** Remplace l’image (ex. bravo / triste au résultat de quiz Nutrition). */
  sourceOverride?: ImageSourcePropType;
  /** Taille pixel explicite (responsive leçon). Prioritaire sur `size`. */
  dimension?: number;
}) {
  const dim = dimension ?? MASCOT_SIZES[size];
  const source = sourceOverride ?? getMascotImages(kind)[pose];
  const label =
    kind === "turtle" ? "Tortue, guide nutrition" : "Gorille, guide anatomie";
  return (
    <Image
      source={source}
      accessibilityLabel={label}
      style={{ width: dim, height: dim }}
      resizeMode="contain"
    />
  );
}

export function quizResultMascotSource(
  kind: MascotKind,
  passed: boolean,
  stars: number,
): ImageSourcePropType | undefined {
  if (kind !== "turtle") return undefined;
  if (!passed) return TURTLE_QUIZ_IMAGES.fail;
  if (stars >= 3) return TURTLE_QUIZ_IMAGES.pass;
  return undefined;
}
