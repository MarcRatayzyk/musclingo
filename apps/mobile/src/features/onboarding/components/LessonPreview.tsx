import { Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import {
  motion,
  onboardingColors,
  onboardingType,
  radius,
  space,
} from "../theme";
import { useReducedMotion } from "../useReducedMotion";

type Props = {
  pathLabel: string;
  levelLabel?: string;
  title: string;
  xpReward: number;
  accentColor?: string;
};

export function LessonPreview({
  pathLabel,
  levelLabel = "Niveau 1",
  title,
  xpReward,
  accentColor = onboardingColors.pulse,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <Animated.View
      entering={reduced ? undefined : FadeInUp.duration(motion.enter)}
      style={{
        borderRadius: radius.panel,
        borderWidth: 1.5,
        borderColor: accentColor + "55",
        backgroundColor: onboardingColors.rubber,
        padding: space.xl,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          backgroundColor: accentColor,
        }}
      />
      <Text
        style={{
          ...onboardingType.meta,
          color: accentColor,
          fontFamily: onboardingType.label.fontFamily,
        }}
      >
        {pathLabel} · {levelLabel}
      </Text>
      <Text
        style={{
          ...onboardingType.hero,
          marginTop: space.md,
        }}
      >
        {title}
      </Text>

      <View
        style={{
          marginTop: space.xl,
          alignSelf: "flex-start",
          borderRadius: radius.control,
          backgroundColor: accentColor + "28",
          borderWidth: 1,
          borderColor: accentColor + "66",
          paddingHorizontal: space.lg,
          paddingVertical: space.sm + 2,
        }}
      >
        <Text
          style={{
            ...onboardingType.label,
            color: accentColor,
            fontSize: 15,
          }}
        >
          +{xpReward} XP
        </Text>
      </View>
    </Animated.View>
  );
}
