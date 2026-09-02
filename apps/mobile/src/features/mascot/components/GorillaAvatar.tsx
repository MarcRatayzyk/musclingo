import { Image } from "react-native";
import { MASCOT_IMAGES, MASCOT_SIZES } from "../assets";
import type { MascotPose } from "../types";

type Size = keyof typeof MASCOT_SIZES;

export function GorillaAvatar({
  pose = "present",
  size = "md",
}: {
  pose?: MascotPose;
  size?: Size;
}) {
  const dim = MASCOT_SIZES[size];
  return (
    <Image
      source={MASCOT_IMAGES[pose]}
      accessibilityLabel="Gorille, guide anatomie"
      style={{ width: dim, height: dim }}
      resizeMode="contain"
    />
  );
}
