import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { ConfettiBurst, useFlash } from "@/features/gamification/confetti";
import { CONVERSION_COPY, getInsight } from "../content";
import {
  OnboardingButtonStack,
  OnboardingPrimaryButton,
} from "../components/OnboardingPrimaryButton";
import {
  motion,
  onboardingColors,
  onboardingType,
  radius,
  space,
} from "../theme";
import { useReducedMotion } from "../useReducedMotion";
import type { MotivationId } from "../types";

type Props = {
  blocker: MotivationId | undefined;
  onContinue: () => void;
};

export function ValueStep({ blocker, onContinue }: Props) {
  const [ready, setReady] = useState(false);
  const pulse = useSharedValue(0.35);
  const confetti = useFlash(1200);
  const { trigger } = confetti;
  const reduced = useReducedMotion();
  const insight = getInsight(blocker);
  const copy = CONVERSION_COPY.value;

  useEffect(() => {
    if (reduced) {
      pulse.value = 0.85;
    } else {
      pulse.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
    }
    const delay = reduced ? 180 : 1300;
    const t = setTimeout(() => {
      setReady(true);
      if (!reduced) trigger();
    }, delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [{ scale: 0.9 + pulse.value * 0.1 }],
  }));

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: space.lg,
        }}
      >
        <Animated.View
          style={[
            pulseStyle,
            {
              marginBottom: space.xl,
              width: 68,
              height: 68,
              borderRadius: 34,
              borderWidth: 3,
              borderColor: onboardingColors.pulse,
              borderTopColor: "transparent",
            },
          ]}
          accessibilityLabel={copy.loading}
        />
        <Text style={{ ...onboardingType.title, textAlign: "center" }}>
          {copy.loading}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!reduced ? <ConfettiBurst active={confetti.on} /> : null}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Animated.View entering={reduced ? undefined : FadeIn.duration(320)}>
          <Text
            style={{
              ...onboardingType.meta,
              color: onboardingColors.pulse,
              fontFamily: onboardingType.label.fontFamily,
              marginBottom: space.sm,
            }}
          >
            Ton diagnostic
          </Text>
          <Text style={{ ...onboardingType.hero, maxWidth: 340 }}>
            {insight.echo}
          </Text>
        </Animated.View>

        <Animated.View
          entering={
            reduced ? undefined : FadeInDown.delay(100).duration(motion.enter)
          }
          style={{
            marginTop: space.xl,
            borderRadius: radius.panel,
            borderWidth: 1,
            borderColor: onboardingColors.seam,
            backgroundColor: onboardingColors.rubber,
            padding: space.xl,
          }}
        >
          <Text
            style={{
              ...onboardingType.meta,
              marginBottom: space.sm,
              color: onboardingColors.copper,
              fontFamily: onboardingType.label.fontFamily,
            }}
          >
            Ce qui te bloque
          </Text>
          <Text style={onboardingType.body}>{insight.diagnosis}</Text>
        </Animated.View>

        <Animated.View
          entering={
            reduced ? undefined : FadeInDown.delay(180).duration(motion.enter)
          }
          style={{
            marginTop: space.md,
            borderRadius: radius.panel,
            borderWidth: 1.5,
            borderColor: onboardingColors.pulse + "44",
            backgroundColor: onboardingColors.pulseWash,
            padding: space.xl,
          }}
        >
          <Text
            style={{
              ...onboardingType.meta,
              marginBottom: space.sm,
              color: onboardingColors.pulse,
              fontFamily: onboardingType.label.fontFamily,
            }}
          >
            Première étape
          </Text>
          <Text style={onboardingType.label}>{insight.firstStep}</Text>
        </Animated.View>
      </View>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton label={copy.cta} onPress={onContinue} />
      </OnboardingButtonStack>
    </View>
  );
}
