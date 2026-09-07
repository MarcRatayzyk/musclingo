import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { MOTIVATION_OPTIONS } from "../content";
import { MascotAskHeader } from "../components/MascotAskHeader";
import { OnboardingPrimaryButton } from "../components/OnboardingPrimaryButton";
import type { MotivationId } from "../types";

type Props = {
  selected: MotivationId[];
  onToggle: (id: MotivationId) => void;
  onContinue: () => void;
};

export function MotivationStep({ selected, onToggle, onContinue }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <MascotAskHeader
        pose="doubt"
        text="Qu’est-ce que tu veux améliorer ?"
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          {MOTIVATION_OPTIONS.map((option) => (
            <OptionTile
              key={option.id}
              emoji={option.emoji}
              label={option.label}
              accent={option.accent}
              selected={selected.includes(option.id)}
              onPress={() => onToggle(option.id)}
            />
          ))}
        </View>
        <View style={{ height: 12 }} />
      </ScrollView>

      <OnboardingPrimaryButton
        label="Continuer"
        disabled={selected.length === 0}
        onPress={onContinue}
      />
    </View>
  );
}

function OptionTile({
  emoji,
  label,
  accent,
  selected,
  onPress,
}: {
  emoji: string;
  label: string;
  accent: string;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 16, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 260 });
      }}
      onPress={onPress}
      style={{ width: "48%" }}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            minHeight: 112,
            borderRadius: 22,
            borderWidth: 2,
            borderColor: selected ? accent : "#2A3344",
            backgroundColor: selected ? accent + "1F" : "#141820",
            paddingHorizontal: 14,
            paddingVertical: 16,
            justifyContent: "space-between",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: selected ? accent + "33" : "#1C2230",
            }}
          >
            <Text style={{ fontSize: 22 }}>{emoji}</Text>
          </View>
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              borderWidth: 2,
              borderColor: selected ? accent : "#2A3344",
              backgroundColor: selected ? accent : "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selected ? (
              <Text
                style={{ color: "#0B0D10", fontSize: 11, fontWeight: "800" }}
              >
                ✓
              </Text>
            ) : null}
          </View>
        </View>
        <Text
          style={{
            marginTop: 12,
            color: "#FFFFFF",
            fontSize: 15,
            lineHeight: 20,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
