import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { LinearAtmosphere } from "./LinearAtmosphere";
import { BackChevronIcon } from "./OnboardingIcons";
import { OnboardingProgress } from "./OnboardingProgress";
import {
  motion,
  onboardingColors,
  onboardingType,
  space,
} from "../theme";
import { useReducedMotion } from "../useReducedMotion";

type Props = {
  children: React.ReactNode;
  stepIndex: number;
  totalSteps: number;
  onBack?: () => void;
  showProgress?: boolean;
  footer?: React.ReactNode;
};

export function OnboardingContainer({
  children,
  stepIndex,
  totalSteps,
  onBack,
  showProgress = true,
  footer,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: onboardingColors.ink,
        paddingHorizontal: space.lg + 4,
        paddingTop: 48,
      }}
    >
      <LinearAtmosphere />
      <View style={{ flex: 1, paddingBottom: space.xl, zIndex: 1 }}>
        {showProgress ? (
          <View
            style={{
              marginBottom: space.lg,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {onBack && stepIndex > 0 ? (
              <Pressable
                onPress={onBack}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Retour"
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  minWidth: 64,
                  paddingVertical: space.xs,
                }}
              >
                <BackChevronIcon />
                <Text style={{ ...onboardingType.meta, color: onboardingColors.mist }}>
                  Retour
                </Text>
              </Pressable>
            ) : (
              <View style={{ width: 64 }} />
            )}
            <View style={{ flex: 1, paddingHorizontal: space.md }}>
              <OnboardingProgress
                stepIndex={stepIndex}
                totalSteps={totalSteps}
              />
            </View>
            <View style={{ width: 64 }} />
          </View>
        ) : null}

        <View style={{ flex: 1 }} key={stepIndex}>
          <Animated.View
            entering={
              reduced ? undefined : FadeIn.duration(motion.enter)
            }
            style={{ flex: 1 }}
          >
            {children}
          </Animated.View>
        </View>

        {footer ? (
          <View style={{ paddingTop: space.md }}>{footer}</View>
        ) : null}
      </View>
    </View>
  );
}
