import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { MascotSpeechBubble } from "@/features/mascot";
import { MOOD_TO_POSE, type MascotMood } from "../types";

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
  accentColor = "#7CFFB2",
  compact = true,
  showAvatar = true,
}: Props) {
  return (
    <Animated.View entering={FadeInDown.duration(280)} className="mb-5">
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
