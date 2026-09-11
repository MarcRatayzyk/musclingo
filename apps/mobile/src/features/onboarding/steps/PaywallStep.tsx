import { ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { CONVERSION_COPY, getInsight } from "../content";
import { CheckIcon } from "../components/OnboardingIcons";
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
  loading?: boolean;
  onSubscribe: () => void;
  onContinueFree: () => void;
};

export function PaywallStep({
  blocker,
  loading,
  onSubscribe,
  onContinueFree,
}: Props) {
  const reduced = useReducedMotion();
  const copy = CONVERSION_COPY.paywall;
  const insight = getInsight(blocker);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Animated.View entering={reduced ? undefined : FadeIn.duration(320)}>
          <Text style={{ ...onboardingType.hero, maxWidth: 340 }}>
            {copy.headline}
          </Text>
          <Text
            style={{
              ...onboardingType.bodyMuted,
              marginTop: space.md,
              maxWidth: 340,
            }}
          >
            {copy.sub}
          </Text>
        </Animated.View>

        <Animated.View
          entering={
            reduced ? undefined : FadeInDown.delay(80).duration(motion.enter)
          }
          style={{
            marginTop: space.xl,
            borderRadius: radius.panel,
            borderWidth: 1.5,
            borderColor: onboardingColors.pulse + "44",
            backgroundColor: onboardingColors.rubber,
            padding: space.xl,
            gap: space.lg,
          }}
        >
          {copy.benefits.map((line) => (
            <View
              key={line}
              style={{ flexDirection: "row", gap: space.md, alignItems: "flex-start" }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: onboardingColors.pulseWash,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
                accessibilityElementsHidden
                importantForAccessibility="no"
              >
                <CheckIcon size={12} color={onboardingColors.pulse} />
              </View>
              <Text style={{ ...onboardingType.label, flex: 1 }}>{line}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View
          entering={
            reduced ? undefined : FadeInDown.delay(140).duration(motion.enter)
          }
          style={{
            marginTop: space.md,
            borderRadius: radius.tile,
            backgroundColor: onboardingColors.pulseWash,
            padding: space.lg,
          }}
        >
          <Text style={onboardingType.meta}>{insight.premiumHook}</Text>
        </Animated.View>

        <View style={{ marginTop: space.xl, alignItems: "center" }}>
          <Text style={{ ...onboardingType.title }}>{copy.price}</Text>
          <Text
            style={{
              ...onboardingType.meta,
              marginTop: space.sm,
              textAlign: "center",
              maxWidth: 300,
            }}
          >
            {copy.billing}
          </Text>
        </View>
        <View style={{ height: space.md }} />
      </ScrollView>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton
          label={loading ? "Activation…" : copy.cta}
          loading={loading}
          disabled={loading}
          onPress={onSubscribe}
        />
        <OnboardingPrimaryButton
          label={copy.skip}
          variant="ghost"
          disabled={loading}
          onPress={onContinueFree}
        />
      </OnboardingButtonStack>
    </View>
  );
}
