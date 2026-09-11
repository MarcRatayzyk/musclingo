import { Pressable, Text, View } from "react-native";
import {
  onboardingColors,
  onboardingType,
  radius,
  space,
} from "../theme";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  loading?: boolean;
};

export function OnboardingPrimaryButton({
  label,
  onPress,
  disabled,
  variant = "primary",
  loading,
}: Props) {
  const isDisabled = disabled || loading;

  if (variant === "ghost") {
    return (
      <Pressable
        disabled={isDisabled}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!isDisabled }}
        style={({ pressed }) => ({
          alignItems: "center",
          paddingVertical: space.md,
          opacity: pressed && !isDisabled ? 0.7 : 1,
        })}
      >
        <Text style={onboardingType.ghost}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled }}
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: isDisabled
          ? onboardingColors.plate
          : onboardingColors.pulse,
        borderRadius: radius.control,
        paddingVertical: 17,
        paddingHorizontal: space.lg,
        opacity: pressed && !isDisabled ? 0.9 : 1,
        transform: [{ scale: pressed && !isDisabled ? 0.985 : 1 }],
        borderWidth: isDisabled ? 1 : 0,
        borderColor: onboardingColors.seam,
      })}
    >
      <Text
        style={{
          ...onboardingType.cta,
          textAlign: "center",
          color: isDisabled ? onboardingColors.mist : onboardingColors.onPulse,
        }}
      >
        {loading ? "…" : label}
      </Text>
    </Pressable>
  );
}

/** Empile CTA principal + actions secondaires. */
export function OnboardingButtonStack({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={{ gap: space.sm, paddingTop: space.sm }}>{children}</View>
  );
}
