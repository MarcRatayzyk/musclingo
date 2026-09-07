import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  emoji?: string;
  hint?: string;
  badge?: string;
  accentColor?: string;
  disabled?: boolean;
};

export function SelectableCard({
  label,
  selected,
  onPress,
  emoji,
  hint,
  badge,
  accentColor = "#7CFFB2",
  disabled,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      onPressIn={() => {
        scale.value = withSpring(0.97, { damping: 18, stiffness: 320 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 260 });
      }}
      onPress={onPress}
      className="mb-3"
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            borderColor: selected ? accentColor : "#2A3344",
            backgroundColor: selected ? accentColor + "18" : "#141820",
          },
        ]}
        className="flex-row items-center gap-3 rounded-3xl border-2 px-4 py-4"
      >
        {emoji ? (
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-elevated">
            <Text className="text-2xl">{emoji}</Text>
          </View>
        ) : null}

        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="flex-1 text-lg font-semibold text-white">
              {label}
            </Text>
            {badge ? (
              <View
                className="rounded-full px-2.5 py-1"
                style={{ backgroundColor: accentColor + "33" }}
              >
                <Text
                  className="text-[10px] font-bold uppercase tracking-wide"
                  style={{ color: accentColor }}
                >
                  {badge}
                </Text>
              </View>
            ) : null}
          </View>
          {hint ? (
            <Text className="mt-1 text-sm leading-5 text-muted">{hint}</Text>
          ) : null}
        </View>

        <View
          className="h-7 w-7 items-center justify-center rounded-full border-2"
          style={{
            borderColor: selected ? accentColor : "#2A3344",
            backgroundColor: selected ? accentColor : "transparent",
          }}
        >
          {selected ? (
            <Text className="text-xs font-bold text-background">✓</Text>
          ) : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}
