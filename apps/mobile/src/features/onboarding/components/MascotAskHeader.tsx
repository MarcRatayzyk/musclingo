import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GorillaAvatar } from "@/features/mascot";
import { MascotSpeechBubble } from "@/features/mascot";
import type { MascotPose } from "@/features/mascot";
import { MASCOT_SIZES } from "@/features/mascot/assets";

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
  accentColor = "#7CFFB2",
}: Props) {
  return (
    <Animated.View
      entering={FadeInDown.duration(280)}
      style={{ marginBottom: 16, alignItems: "flex-start", width: "100%" }}
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
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 20,
              lineHeight: 28,
              fontWeight: "700",
            }}
          >
            {text}
          </Text>
        </MascotSpeechBubble>
      </View>
      <View style={{ marginTop: 2 }}>
        <GorillaAvatar pose={pose} size="md" />
      </View>
    </Animated.View>
  );
}
