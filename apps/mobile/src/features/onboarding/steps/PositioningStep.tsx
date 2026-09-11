import { Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { CONVERSION_COPY } from "../content";
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

type Props = { onContinue: () => void };

export function PositioningStep({ onContinue }: Props) {
  const reduced = useReducedMotion();
  const copy = CONVERSION_COPY.positioning;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Animated.View entering={reduced ? undefined : FadeIn.duration(360)}>
          <Text style={{ ...onboardingType.hero, maxWidth: 340 }}>
            {copy.headline}
          </Text>
          <Text
            style={{
              ...onboardingType.body,
              marginTop: space.lg,
              maxWidth: 320,
            }}
          >
            {copy.insight}
          </Text>
        </Animated.View>

        <Animated.View
          entering={
            reduced ? undefined : FadeInDown.delay(140).duration(motion.enter)
          }
          style={{
            marginTop: space.xxl,
            borderRadius: radius.panel,
            borderWidth: 1.5,
            borderColor: onboardingColors.pulse + "55",
            backgroundColor: onboardingColors.pulseWash,
            padding: space.xl,
          }}
        >
          <Text
            style={{
              ...onboardingType.meta,
              color: onboardingColors.pulse,
              fontFamily: onboardingType.label.fontFamily,
              marginBottom: space.sm,
            }}
          >
            Muscle Mind
          </Text>
          <Text style={onboardingType.title}>{copy.solution}</Text>
        </Animated.View>
      </View>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton label={copy.cta} onPress={onContinue} />
      </OnboardingButtonStack>
    </View>
  );
}
