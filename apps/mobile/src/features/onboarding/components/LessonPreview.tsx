import { Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = {
  pathLabel: string;
  levelLabel?: string;
  title: string;
  durationMin: number;
  xpReward: number;
  accentColor?: string;
};

export function LessonPreview({
  pathLabel,
  levelLabel = "Niveau 1",
  title,
  durationMin,
  xpReward,
  accentColor = "#7CFFB2",
}: Props) {
  return (
    <Animated.View
      entering={FadeInUp.duration(320)}
      className="rounded-3xl border-2 bg-surface p-5"
      style={{ borderColor: accentColor + "66" }}
    >
      <Text
        className="text-xs font-semibold uppercase tracking-[3px]"
        style={{ color: accentColor }}
      >
        {pathLabel} — {levelLabel}
      </Text>
      <Text className="mt-3 text-2xl font-semibold leading-8 text-white">
        {title}
      </Text>

      <View className="mt-5 flex-row gap-3">
        <View className="rounded-2xl bg-elevated px-3 py-2">
          <Text className="text-sm text-muted">⏱ {durationMin} min</Text>
        </View>
        <View
          className="rounded-2xl px-3 py-2"
          style={{ backgroundColor: accentColor + "22" }}
        >
          <Text className="text-sm font-semibold" style={{ color: accentColor }}>
            +{xpReward} XP
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
