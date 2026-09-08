import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import type { PathChapterPreview } from "../types";

type Props = {
  pathLabel: string;
  chapters: PathChapterPreview[];
  accentColor?: string;
};

export function PathPreview({
  pathLabel,
  chapters,
  accentColor = "#7CFFB2",
}: Props) {
  return (
    <Animated.View
      entering={FadeInDown.duration(360)}
      className="rounded-3xl border border-border bg-surface p-5"
    >
      <Text
        className="mb-1 text-xs font-semibold uppercase tracking-[3px]"
        style={{ color: accentColor }}
      >
        {pathLabel}
      </Text>
      <Text className="mb-4 text-xl font-semibold text-white">
        Ton parcours personnalisé
      </Text>

      {chapters.map((chapter, index) => (
        <Animated.View
          key={chapter.id}
          entering={FadeInRight.delay(80 + index * 70).duration(280)}
          className="mb-3 flex-row items-center gap-3"
        >
          <View
            className="h-9 w-9 items-center justify-center rounded-full border-2"
            style={{
              borderColor: chapter.unlocked ? accentColor : "#2A3344",
              backgroundColor: chapter.unlocked
                ? accentColor + "22"
                : "#1C2230",
            }}
          >
            <Text
              className="text-sm font-bold"
              style={{ color: chapter.unlocked ? accentColor : "#8B95A8" }}
            >
              {chapter.unlocked ? "○" : "🔒"}
            </Text>
          </View>
          <Text
            className={`flex-1 text-base ${
              chapter.unlocked ? "text-white" : "text-muted"
            }`}
          >
            {chapter.title}
          </Text>
        </Animated.View>
      ))}
    </Animated.View>
  );
}
