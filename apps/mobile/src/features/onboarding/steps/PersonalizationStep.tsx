import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { ConfettiBurst, useFlash } from "@/features/gamification/confetti";
import { PATH_CHAPTERS, MASCOT_COPY } from "../content";
import { pathLabel } from "../recommend";
import { LessonPreview } from "../components/LessonPreview";
import { MascotAskHeader } from "../components/MascotAskHeader";
import {
  OnboardingButtonStack,
  OnboardingPrimaryButton,
} from "../components/OnboardingPrimaryButton";
import { OnboardingErrorState } from "../components/OnboardingStates";
import { PathPreview } from "../components/PathPreview";
import {
  motion,
  onboardingColors,
  onboardingType,
  space,
} from "../theme";
import { useReducedMotion } from "../useReducedMotion";
import type { PathChapterPreview, PathSlug } from "../types";

type Props = {
  path: PathSlug;
  chaptersFromApi?: PathChapterPreview[];
  lessonTitle: string;
  xpReward: number;
  accentColor?: string;
  loading?: boolean;
  error?: string | null;
  onReady: () => void;
  onStartLesson: () => void;
  onGoHome: () => void;
  onRetry?: () => void;
};

export function PersonalizationStep({
  path,
  chaptersFromApi,
  lessonTitle,
  xpReward,
  accentColor,
  loading,
  error,
  onReady,
  onStartLesson,
  onGoHome,
  onRetry,
}: Props) {
  const [ready, setReady] = useState(false);
  const pulse = useSharedValue(0.35);
  const confetti = useFlash(1400);
  const { trigger } = confetti;
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      pulse.value = 0.85;
    } else {
      pulse.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
    }
    const delay = reduced ? 200 : 1400;
    const t = setTimeout(() => {
      setReady(true);
      if (!reduced) trigger();
      onReady();
    }, delay);
    return () => clearTimeout(t);
    // Intentional once-on-mount reveal + finalize onboarding.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [{ scale: 0.9 + pulse.value * 0.1 }],
  }));

  const chapters =
    chaptersFromApi && chaptersFromApi.length > 0
      ? chaptersFromApi
      : PATH_CHAPTERS[path];
  const label = pathLabel(path);
  const accent = accentColor ?? onboardingColors.pulse;

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: space.lg,
        }}
      >
        <Animated.View
          style={[
            pulseStyle,
            {
              marginBottom: space.xl,
              width: 68,
              height: 68,
              borderRadius: 34,
              borderWidth: 3,
              borderColor: onboardingColors.pulse,
              borderTopColor: "transparent",
            },
          ]}
        />
        <Text style={{ ...onboardingType.title, textAlign: "center" }}>
          {MASCOT_COPY.personalizing}
        </Text>
        <Text
          style={{
            ...onboardingType.bodyMuted,
            marginTop: space.sm,
            textAlign: "center",
          }}
        >
          Ta première leçon arrive dans quelques secondes.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!reduced ? <ConfettiBurst active={confetti.on} /> : null}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Animated.View
          entering={reduced ? undefined : FadeIn.duration(motion.enter)}
        >
          <MascotAskHeader
            pose="present"
            text={MASCOT_COPY.pathReady}
            accentColor={accent}
          />
        </Animated.View>

        <LessonPreview
          pathLabel={label}
          title={lessonTitle}
          xpReward={xpReward}
          accentColor={accent}
        />

        <View style={{ height: space.lg }} />
        <PathPreview
          pathLabel={label}
          chapters={chapters}
          accentColor={accent}
        />

        {error ? (
          <OnboardingErrorState
            compact
            message={error}
            actionLabel="Réessayer"
            onAction={onRetry ?? onStartLesson}
          />
        ) : null}
        <View style={{ height: space.md }} />
      </ScrollView>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton
          label={loading ? "Préparation…" : "Lancer ma première leçon"}
          disabled={loading || !!error}
          loading={loading}
          onPress={onStartLesson}
        />
        <OnboardingPrimaryButton
          label="Voir l’accueil d’abord"
          variant="ghost"
          onPress={onGoHome}
        />
      </OnboardingButtonStack>
    </View>
  );
}
