import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { MascotSpeechBubble } from "@/features/mascot";
import { MOOD_TO_POSE, type MascotMood } from "../types";
import { motion, onboardingColors } from "../theme";
import { useReducedMotion } from "../useReducedMotion";

type Props = {
  text: string;
  mood?: MascotMood;
  accentColor?: string;
  compact?: boolean;
  showAvatar?: boolean;
};

export function MascotMessage({
  text,
  mood = "happy",
  accentColor = onboardingColors.pulse,
  compact = true,
  showAvatar = true,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <Animated.View
      entering={reduced ? undefined : FadeInDown.duration(motion.enter)}
      style={{ marginBottom: 20 }}
    >
      <View>
        <MascotSpeechBubble
          pose={MOOD_TO_POSE[mood]}
          text={text}
          accentColor={accentColor}
          compact={compact}
          showAvatar={showAvatar}
        />
      </View>
    </Animated.View>
  );
}
