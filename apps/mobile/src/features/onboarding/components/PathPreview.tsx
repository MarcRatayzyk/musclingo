import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import type { PathChapterPreview } from "../types";
import {
  motion,
  onboardingColors,
  onboardingType,
  radius,
  space,
} from "../theme";
import { useReducedMotion } from "../useReducedMotion";
import { LockIcon } from "./OnboardingIcons";

type Props = {
  pathLabel: string;
  chapters: PathChapterPreview[];
  accentColor?: string;
};

export function PathPreview({
  pathLabel,
  chapters,
  accentColor = onboardingColors.pulse,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <Animated.View
      entering={reduced ? undefined : FadeInDown.duration(motion.reveal)}
      style={{
        borderRadius: radius.panel,
        borderWidth: 1,
        borderColor: onboardingColors.seam,
        backgroundColor: onboardingColors.rubber,
        padding: space.xl,
      }}
    >
      <Text
        style={{
          ...onboardingType.meta,
          color: accentColor,
          fontFamily: onboardingType.label.fontFamily,
          marginBottom: space.xs,
        }}
      >
        {pathLabel}
      </Text>
      <Text style={{ ...onboardingType.title, marginBottom: space.lg }}>
        Ton parcours
      </Text>

      {chapters.map((chapter, index) => (
        <Animated.View
          key={chapter.id}
          entering={
            reduced
              ? undefined
              : FadeInRight.delay(60 + index * 55).duration(240)
          }
          style={{
            marginBottom: space.md,
            flexDirection: "row",
            alignItems: "center",
            gap: space.md,
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: chapter.unlocked
                ? accentColor
                : onboardingColors.seam,
              backgroundColor: chapter.unlocked
                ? accentColor + "18"
                : onboardingColors.plate,
            }}
          >
            {chapter.unlocked ? (
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: accentColor,
                }}
              />
            ) : (
              <LockIcon size={13} color={onboardingColors.mist} />
            )}
          </View>
          <Text
            style={{
              flex: 1,
              ...(chapter.unlocked
                ? onboardingType.label
                : onboardingType.meta),
            }}
          >
            {chapter.title}
          </Text>
        </Animated.View>
      ))}
    </Animated.View>
  );
}
