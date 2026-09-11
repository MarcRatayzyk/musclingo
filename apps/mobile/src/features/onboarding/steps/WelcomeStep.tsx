import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { MASCOT_IMAGES } from "@/features/mascot/assets";
import { MascotSpeechBubble } from "@/features/mascot";
import { MASCOT_COPY } from "../content";
import {
  motion,
  onboardingColors,
  onboardingType,
  radius,
  space,
} from "../theme";
import { useReducedMotion } from "../useReducedMotion";

type Props = {
  onContinue: () => void;
};

const GORILLA_SIZE = 176;

export function WelcomeStep({ onContinue }: Props) {
  const reduced = useReducedMotion();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 4,
          alignItems: "flex-start",
        }}
      >
        <Animated.View
          entering={reduced ? undefined : FadeIn.duration(400)}
          style={{ marginBottom: space.lg }}
        >
          <Text style={onboardingType.brand}>Muscle Mind</Text>
          <Text
            style={{
              ...onboardingType.bodyMuted,
              marginTop: space.sm,
              maxWidth: 300,
            }}
          >
            {MASCOT_COPY.welcomeTagline}
          </Text>
          <Text
            style={{
              ...onboardingType.bodyMuted,
              marginTop: space.sm,
              maxWidth: 320,
              fontSize: 13,
              opacity: 0.85,
            }}
          >
            {MASCOT_COPY.welcomeTrust}
          </Text>
        </Animated.View>

        <Animated.View
          entering={
            reduced ? undefined : FadeInDown.delay(120).duration(motion.enter)
          }
          style={{ width: "100%" }}
        >
          <MascotSpeechBubble
            pose="present"
            showAvatar={false}
            showName={false}
            tail="bottom"
            tailTipX={GORILLA_SIZE / 2}
            accentColor={onboardingColors.pulse}
            compact={false}
          >
            <Text style={onboardingType.hero}>{MASCOT_COPY.welcomeHero}</Text>
            <Text
              style={{
                ...onboardingType.body,
                marginTop: space.md,
              }}
            >
              {MASCOT_COPY.welcomeBody}
            </Text>
          </MascotSpeechBubble>
        </Animated.View>

        <Animated.View
          entering={
            reduced ? undefined : FadeInDown.delay(220).duration(motion.enter)
          }
          style={{ marginTop: 4 }}
        >
          <Image
            source={MASCOT_IMAGES.present}
            accessibilityLabel="Gorille"
            resizeMode="contain"
            style={{ width: GORILLA_SIZE, height: GORILLA_SIZE }}
          />
        </Animated.View>
      </View>

      <Animated.View
        entering={
          reduced ? undefined : FadeInDown.delay(320).duration(motion.enter)
        }
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Créer mon parcours"
          onPress={onContinue}
          style={({ pressed }) => ({
            backgroundColor: onboardingColors.pulse,
            borderRadius: radius.control,
            paddingVertical: 17,
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.985 : 1 }],
          })}
        >
          <Text style={{ ...onboardingType.cta, textAlign: "center" }}>
            Créer mon parcours
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="J’ai déjà un compte"
          onPress={() => router.push("/(auth)/login")}
          style={{ marginTop: space.md, paddingVertical: 8 }}
        >
          <Text
            style={{
              ...onboardingType.bodyMuted,
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            J’ai déjà un compte
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
