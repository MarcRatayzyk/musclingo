import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { MASCOT_IMAGES } from "@/features/mascot/assets";
import { CONVERSION_COPY } from "../content";
import {
  OnboardingButtonStack,
  OnboardingPrimaryButton,
} from "../components/OnboardingPrimaryButton";
import {
  motion,
  onboardingColors,
  onboardingType,
  space,
} from "../theme";
import { useReducedMotion } from "../useReducedMotion";

type Props = { onContinue: () => void };

export function PainStep({ onContinue }: Props) {
  const reduced = useReducedMotion();
  const copy = CONVERSION_COPY.pain;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Animated.View entering={reduced ? undefined : FadeIn.duration(400)}>
          <Text style={onboardingType.brand}>Muscle Mind</Text>
          <Text
            style={{
              ...onboardingType.hero,
              marginTop: space.xl,
              maxWidth: 340,
            }}
          >
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

        <Animated.View
          entering={
            reduced ? undefined : FadeInDown.delay(160).duration(motion.enter)
          }
          style={{ marginTop: space.xxl }}
        >
          <Image
            source={MASCOT_IMAGES.doubt}
            accessibilityLabel="Gorille pensif"
            resizeMode="contain"
            style={{ width: 140, height: 140 }}
          />
        </Animated.View>
      </View>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton label={copy.cta} onPress={onContinue} />
        <Pressable
          accessibilityRole="link"
          onPress={() => router.push("/(auth)/login")}
          style={{ paddingVertical: space.sm }}
        >
          <Text
            style={{
              ...onboardingType.bodyMuted,
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            {copy.login}
          </Text>
        </Pressable>
      </OnboardingButtonStack>
    </View>
  );
}
