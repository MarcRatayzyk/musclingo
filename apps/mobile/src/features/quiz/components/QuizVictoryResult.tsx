import { useEffect } from "react";
import {
  AccessibilityInfo,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ConfettiBurst } from "@/features/gamification/confetti";
import {
  GorillaAvatar,
  quizResultMascotSource,
} from "@/features/mascot/components/GorillaAvatar";
import type { MascotKind } from "@/features/mascot/assets";
import {
  onboardingColors,
  onboardingFonts,
  radius,
  space,
} from "@/features/onboarding/theme";
import { useOnboardingFonts } from "@/features/onboarding/useOnboardingFonts";
import { NeuroliftAmount } from "@/shared/ui/Neurolift";
import { NeuroCoinAmount } from "@/shared/ui/NeuroCoin";
import { StarIcon } from "@/shared/ui/Star";
import { NeuroCoinsEarnAnimation } from "@/shared/ui/StarsEarnAnimation";
import { WaterBottleIcon } from "@/shared/ui/WaterBottle";
import { WATER_BOTTLE_QUIZ_RETRY_COST } from "@muscle-mind/types";

type QuizVictoryResultProps = {
  passed: boolean;
  stars: 0 | 1 | 2 | 3;
  xpEarned: number;
  coinsEarned: number;
  coinsFromTotal: number;
  coinsToTotal: number;
  mascotKind: MascotKind;
  nextLessonId: string | null;
  onNextLesson: () => void;
  onSeePath: () => void;
  onRetry: () => void;
};

function verdictCopy(passed: boolean, stars: number) {
  if (!passed) {
    return {
      title: "Pas encore",
      hint: "Il faut plus de bonnes réponses pour valider.",
    };
  }
  if (stars >= 3) return { title: "Parfait", hint: null };
  if (stars === 2) return { title: "Solide", hint: null };
  return { title: "Validé", hint: null };
}

function PlateStar({
  index,
  filled,
  size,
  reduceMotion,
}: {
  index: number;
  filled: boolean;
  size: number;
  reduceMotion: boolean;
}) {
  const scale = useSharedValue(reduceMotion ? 1 : 0.35);
  const opacity = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      scale.value = 1;
      opacity.value = 1;
      return;
    }
    const delay = 180 + index * 140;
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 220, easing: Easing.out(Easing.cubic) }),
    );
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 12, stiffness: 220, mass: 0.7 }),
    );
  }, [index, opacity, reduceMotion, scale]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value * (filled ? 1 : 0.22),
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={style}>
      <StarIcon size={size} />
    </Animated.View>
  );
}

export function QuizVictoryResult({
  passed,
  stars,
  xpEarned,
  coinsEarned,
  coinsFromTotal,
  coinsToTotal,
  mascotKind,
  nextLessonId,
  onNextLesson,
  onSeePath,
  onRetry,
}: QuizVictoryResultProps) {
  useOnboardingFonts();
  const reduceMotion = useReducedMotion() ?? false;
  const { width } = useWindowDimensions();
  const showCoinAnim = passed && coinsEarned > 0;
  const perfect = passed && stars >= 3;
  const copy = verdictCopy(passed, stars);
  const mascotPose = passed ? (stars >= 3 ? "present" : "default") : "doubt";
  const mascotOverride = quizResultMascotSource(mascotKind, passed, stars);
  const ctaDelay = reduceMotion ? 0 : showCoinAnim ? 900 : 700;

  useEffect(() => {
    if (!passed) return;
    const message =
      stars >= 3
        ? "Parfait. Trois étoiles."
        : `${stars} étoile${stars > 1 ? "s" : ""}. Quiz validé.`;
    void AccessibilityInfo.announceForAccessibility(message);
  }, [passed, stars]);

  return (
    <View style={{ flex: 1 }}>
      <ConfettiBurst active={perfect} />
      {showCoinAnim ? (
        <NeuroCoinsEarnAnimation
          active
          earned={coinsEarned}
          fromTotal={coinsFromTotal}
          toTotal={coinsToTotal}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingBottom: space.xxl,
        }}
      >
        <View style={{ alignItems: "center", width: "100%" }}>
          <Animated.View
            entering={
              reduceMotion
                ? undefined
                : FadeIn.duration(380).easing(Easing.out(Easing.cubic))
            }
          >
            <GorillaAvatar
              pose={mascotPose}
              size="lg"
              kind={mascotKind}
              sourceOverride={mascotOverride}
            />
          </Animated.View>

          <View
            style={{
              marginTop: space.lg,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {[1, 2, 3].map((n) => (
              <PlateStar
                key={n}
                index={n - 1}
                filled={n <= stars}
                size={44}
                reduceMotion={reduceMotion}
              />
            ))}
          </View>

          <Animated.View
            entering={
              reduceMotion
                ? undefined
                : FadeInDown.delay(520)
                    .duration(360)
                    .easing(Easing.out(Easing.cubic))
            }
            style={{
              marginTop: space.xl,
              alignItems: "center",
              paddingHorizontal: space.lg,
            }}
          >
            <Text
              style={{
                fontFamily: onboardingFonts.bodyBold,
                fontSize: 36,
                lineHeight: 40,
                letterSpacing: -0.4,
                color: passed ? onboardingColors.chalk : onboardingColors.mist,
                textAlign: "center",
              }}
            >
              {copy.title}
            </Text>
            {copy.hint ? (
              <Text
                style={{
                  marginTop: space.sm,
                  fontFamily: onboardingFonts.body,
                  fontSize: 15,
                  lineHeight: 22,
                  color: onboardingColors.mist,
                  textAlign: "center",
                  maxWidth: Math.min(280, width - 64),
                }}
              >
                {copy.hint}
              </Text>
            ) : null}
          </Animated.View>

          {passed ? (
            <Animated.View
              entering={
                reduceMotion
                  ? undefined
                  : FadeInDown.delay(640)
                      .duration(360)
                      .easing(Easing.out(Easing.cubic))
              }
              style={{
                marginTop: space.xxl,
                width: "100%",
                borderRadius: radius.tile,
                backgroundColor: onboardingColors.rubber,
                borderWidth: 1,
                borderColor: onboardingColors.seam,
                flexDirection: "row",
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: space.xl,
                  paddingHorizontal: space.md,
                }}
              >
                <NeuroliftAmount
                  amount={xpEarned}
                  size="lg"
                  signed
                  color={onboardingColors.pulse}
                />
              </View>
              {coinsEarned > 0 ? (
                <>
                  <View
                    style={{
                      width: 1,
                      backgroundColor: onboardingColors.seam,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: space.xl,
                      paddingHorizontal: space.md,
                    }}
                  >
                    <NeuroCoinAmount
                      amount={coinsEarned}
                      size="lg"
                      signed
                      color={onboardingColors.copper}
                    />
                  </View>
                </>
              ) : null}
            </Animated.View>
          ) : null}

          <Animated.View
            entering={
              reduceMotion
                ? undefined
                : FadeInDown.delay(ctaDelay)
                    .duration(360)
                    .easing(Easing.out(Easing.cubic))
            }
            style={{ marginTop: space.xxl, width: "100%", gap: space.md }}
          >
            {!passed ? (
              <Pressable
                onPress={onRetry}
                accessibilityRole="button"
                accessibilityLabel={`Réessayer, coûte ${WATER_BOTTLE_QUIZ_RETRY_COST} bouteilles`}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  borderRadius: radius.control,
                  backgroundColor: onboardingColors.pulse,
                  paddingVertical: 16,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text
                  style={{
                    fontFamily: onboardingFonts.bodyBold,
                    fontSize: 16,
                    lineHeight: 20,
                    color: onboardingColors.onPulse,
                  }}
                >
                  Réessayer −{WATER_BOTTLE_QUIZ_RETRY_COST}
                </Text>
                <WaterBottleIcon size={20} />
              </Pressable>
            ) : (
              <Pressable
                onPress={nextLessonId ? onNextLesson : onSeePath}
                accessibilityRole="button"
                style={({ pressed }) => ({
                  borderRadius: radius.control,
                  backgroundColor: onboardingColors.pulse,
                  paddingVertical: 16,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text
                  style={{
                    fontFamily: onboardingFonts.bodyBold,
                    fontSize: 16,
                    lineHeight: 20,
                    color: onboardingColors.onPulse,
                    textAlign: "center",
                  }}
                >
                  {nextLessonId ? "Leçon suivante" : "Retour au parcours"}
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={onSeePath}
              accessibilityRole="button"
              style={({ pressed }) => ({
                alignItems: "center",
                paddingTop: space.sm,
                paddingBottom: space.xl,
                marginBottom: space.md,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  fontFamily: onboardingFonts.bodySemi,
                  fontSize: 15,
                  lineHeight: 20,
                  color: onboardingColors.mist,
                }}
              >
                Voir le parcours
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
