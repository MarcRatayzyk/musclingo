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

export function AmplifyStep({ onContinue }: Props) {
  const reduced = useReducedMotion();
  const copy = CONVERSION_COPY.amplify;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Animated.View entering={reduced ? undefined : FadeIn.duration(360)}>
          <Text style={{ ...onboardingType.hero, maxWidth: 340 }}>
            {copy.headline}
          </Text>
          <Text
            style={{
              ...onboardingType.bodyMuted,
              marginTop: space.lg,
              maxWidth: 320,
            }}
          >
            {copy.body}
          </Text>
        </Animated.View>

        <View style={{ marginTop: space.xxl, gap: space.md }}>
          {copy.bullets.map((line, index) => (
            <Animated.View
              key={line}
              entering={
                reduced
                  ? undefined
                  : FadeInDown.delay(80 + index * 70).duration(motion.enter)
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: space.md,
                borderRadius: radius.tile,
                borderWidth: 1,
                borderColor: onboardingColors.seam,
                backgroundColor: onboardingColors.rubber,
                paddingVertical: space.lg,
                paddingHorizontal: space.lg,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    index === 0
                      ? onboardingColors.copper
                      : index === 1
                        ? onboardingColors.pulse
                        : onboardingColors.strain,
                }}
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
              <Text style={{ ...onboardingType.label, flex: 1 }}>{line}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton label={copy.cta} onPress={onContinue} />
      </OnboardingButtonStack>
    </View>
  );
}
