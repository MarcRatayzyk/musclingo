import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  stepIndex: number;
  totalSteps: number;
};

export function OnboardingProgress({ stepIndex, totalSteps }: Props) {
  const [trackWidth, setTrackWidth] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    const pct = totalSteps <= 1 ? 1 : stepIndex / (totalSteps - 1);
    progress.value = withTiming(Math.max(0.08, pct), { duration: 320 });
  }, [stepIndex, totalSteps, progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: trackWidth * progress.value,
  }));

  return (
    <View
      className="h-1.5 overflow-hidden rounded-full bg-elevated"
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: totalSteps,
        now: stepIndex + 1,
      }}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && w !== trackWidth) setTrackWidth(w);
      }}
    >
      {trackWidth > 0 ? (
        <Animated.View className="h-full rounded-full bg-accent" style={fillStyle} />
      ) : null}
    </View>
  );
}
