import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GorillaAvatar } from "@/features/mascot";
import { MascotSpeechBubble } from "@/features/mascot";
import type { MascotPose } from "@/features/mascot";
import { MASCOT_SIZES } from "@/features/mascot/assets";
import { motion, onboardingColors, onboardingType, space } from "../theme";
import { useReducedMotion } from "../useReducedMotion";

type Props = {
  text: string;
  pose?: MascotPose;
  accentColor?: string;
};

const GORILLA_SIZE = MASCOT_SIZES.md;

/** Bulle en haut, Gorille à gauche sous la flèche. */
export function MascotAskHeader({
  text,
  pose = "present",
  accentColor = onboardingColors.pulse,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <Animated.View
      entering={reduced ? undefined : FadeInDown.duration(motion.enter)}
      style={{ marginBottom: space.lg, alignItems: "flex-start", width: "100%" }}
    >
      <View style={{ width: "100%" }}>
        <MascotSpeechBubble
          pose={pose}
          showAvatar={false}
          showName={false}
          tail="bottom"
          tailTipX={GORILLA_SIZE / 2}
          accentColor={accentColor}
          compact
        >
          <Text style={onboardingType.title}>{text}</Text>
        </MascotSpeechBubble>
      </View>
      <View style={{ marginTop: 2 }}>
        <GorillaAvatar pose={pose} size="md" />
      </View>
    </Animated.View>
  );
}
