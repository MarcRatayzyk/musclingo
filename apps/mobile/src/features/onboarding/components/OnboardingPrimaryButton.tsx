import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
};

export function OnboardingPrimaryButton({
  label,
  onPress,
  disabled,
  variant = "primary",
}: Props) {
  if (variant === "ghost") {
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        accessibilityRole="button"
        style={{ alignItems: "center", paddingVertical: 12 }}
      >
        <Text style={{ fontSize: 14, color: "#8B95A8" }}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: disabled ? "#1C2230" : "#7CFFB2",
        borderRadius: 16,
        paddingVertical: 16,
        opacity: pressed && !disabled ? 0.88 : 1,
        transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
      })}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "700",
          color: disabled ? "#8B95A8" : "#0B0D10",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
