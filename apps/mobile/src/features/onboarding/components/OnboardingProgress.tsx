import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { motion, onboardingColors, radius, space } from "../theme";
import { useReducedMotion } from "../useReducedMotion";

type Props = {
  stepIndex: number;
  totalSteps: number;
};

/** Segments = étapes réelles (séquence), pas des marqueurs décoratifs. */
export function OnboardingProgress({ stepIndex, totalSteps }: Props) {
  const reduced = useReducedMotion();
  const [trackWidth, setTrackWidth] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    const pct = totalSteps <= 1 ? 1 : stepIndex / (totalSteps - 1);
    progress.value = withTiming(Math.max(0.06, pct), {
      duration: reduced ? 0 : motion.progress,
    });
  }, [stepIndex, totalSteps, progress, reduced]);

  const fillStyle = useAnimatedStyle(() => ({
    width: trackWidth * progress.value,
  }));

  return (
    <View
      style={{
        height: 4,
        overflow: "hidden",
        borderRadius: radius.pill,
        backgroundColor: onboardingColors.plate,
      }}
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
        <Animated.View
          style={[
            fillStyle,
            {
              height: "100%",
              borderRadius: radius.pill,
              backgroundColor: onboardingColors.pulse,
            },
          ]}
        />
      ) : null}
      {/* Diviseurs de segments — lisibilité du progrès */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          flexDirection: "row",
        }}
      >
        {Array.from({ length: Math.max(0, totalSteps - 1) }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              borderRightWidth: i < totalSteps - 2 ? 2 : 0,
              borderRightColor: onboardingColors.ink,
            }}
          />
        ))}
      </View>
    </View>
  );
}
