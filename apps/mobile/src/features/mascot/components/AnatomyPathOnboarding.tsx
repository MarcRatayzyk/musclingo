import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { ONBOARDING_STEPS } from "../anatomie";
import { markAnatomyOnboardingSeen } from "../storage";
import { GorillaAvatar } from "./GorillaAvatar";
import { MASCOT_NAME } from "../types";

type Props = {
  visible: boolean;
  onClose: () => void;
  accentColor?: string;
};

export function AnatomyPathOnboarding({
  visible,
  onClose,
  accentColor = "#5B8CFF",
}: Props) {
  const [step, setStep] = useState(0);
  const total = ONBOARDING_STEPS.length;
  const current = ONBOARDING_STEPS[step];
  const isLast = step >= total - 1;

  function finish() {
    markAnatomyOnboardingSeen();
    setStep(0);
    onClose();
  }

  function next() {
    if (isLast) {
      finish();
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={finish}
    >
      <View className="flex-1 items-center justify-center bg-black/85 px-6">
        <Animated.View
          entering={FadeIn.duration(300)}
          className="w-full max-w-md rounded-3xl border border-border bg-surface p-6"
          style={{ borderColor: accentColor + "44" }}
        >
          <View className="mb-5 items-center">
            <GorillaAvatar pose={current?.pose ?? "default"} size="lg" />
            <Text
              className="mt-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              {MASCOT_NAME}
            </Text>
          </View>

          <Animated.View key={step} entering={FadeInDown.duration(280)}>
            <Text className="text-center text-lg leading-7 text-white">
              {current?.text}
            </Text>
          </Animated.View>

          <View className="mt-6 flex-row justify-center gap-2">
            {ONBOARDING_STEPS.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === step ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    i === step ? accentColor : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </View>

          <Pressable
            onPress={next}
            className="mt-6 items-center rounded-2xl py-4"
            style={{ backgroundColor: accentColor }}
          >
            <Text className="text-base font-semibold text-background">
              {isLast ? "C'est parti !" : "Continuer"}
            </Text>
          </Pressable>

          {!isLast ? (
            <Pressable onPress={finish} className="mt-3 items-center py-2">
              <Text className="text-sm text-muted">Passer l'intro</Text>
            </Pressable>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  );
}
