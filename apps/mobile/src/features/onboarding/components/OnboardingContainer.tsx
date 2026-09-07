import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Screen } from "@/shared/ui/primitives";
import { OnboardingProgress } from "./OnboardingProgress";

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
  return (
    <Screen className="pt-12">
      <View style={{ flex: 1, paddingBottom: 24 }}>
        {showProgress ? (
          <View className="mb-4 flex-row items-center justify-between">
            {onBack && stepIndex > 0 ? (
              <Pressable
                onPress={onBack}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Retour"
                className="rounded-xl px-2 py-1"
              >
                <Text className="text-base text-muted">← Retour</Text>
              </Pressable>
            ) : (
              <View className="w-16" />
            )}
            <View className="flex-1 px-4">
              <OnboardingProgress
                stepIndex={stepIndex}
                totalSteps={totalSteps}
              />
            </View>
            <View className="w-16" />
          </View>
        ) : null}

        <View style={{ flex: 1 }} key={stepIndex}>
          <Animated.View entering={FadeIn.duration(220)} style={{ flex: 1 }}>
            {children}
          </Animated.View>
        </View>

        {footer ? <View style={{ paddingTop: 12 }}>{footer}</View> : null}
      </View>
    </Screen>
  );
}
