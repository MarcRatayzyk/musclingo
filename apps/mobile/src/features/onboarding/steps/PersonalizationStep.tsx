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
import { OnboardingPrimaryButton } from "../components/OnboardingPrimaryButton";
import { PathPreview } from "../components/PathPreview";
import type { PathChapterPreview, PathSlug } from "../types";

type Props = {
  path: PathSlug;
  chaptersFromApi?: PathChapterPreview[];
  lessonTitle: string;
  durationSec: number;
  xpReward: number;
  accentColor?: string;
  loading?: boolean;
  error?: string | null;
  /** Appelé une fois l’écran prêt : finalise l’onboarding sans naviguer. */
  onReady: () => void;
  onStartLesson: () => void;
  onGoHome: () => void;
};

export function PersonalizationStep({
  path,
  chaptersFromApi,
  lessonTitle,
  durationSec,
  xpReward,
  accentColor,
  loading,
  error,
  onReady,
  onStartLesson,
  onGoHome,
}: Props) {
  const [ready, setReady] = useState(false);
  const pulse = useSharedValue(0.35);
  const confetti = useFlash(1400);
  const { trigger } = confetti;

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
    const t = setTimeout(() => {
      setReady(true);
      trigger();
      onReady();
    }, 1400);
    return () => clearTimeout(t);
    // Intentional once-on-mount reveal + finalize onboarding.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  const chapters =
    chaptersFromApi && chaptersFromApi.length > 0
      ? chaptersFromApi
      : PATH_CHAPTERS[path];
  const label = pathLabel(path);
  const durationMin = Math.max(1, Math.round(durationSec / 60));

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <Animated.View
          style={[
            pulseStyle,
            {
              marginBottom: 24,
              width: 64,
              height: 64,
              borderRadius: 32,
              borderWidth: 4,
              borderColor: "#7CFFB2",
            },
          ]}
        />
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {MASCOT_COPY.personalizing}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ConfettiBurst active={confetti.on} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Animated.View entering={FadeIn.duration(280)}>
          <MascotAskHeader
            pose="present"
            text="Une leçon est prête pour toi."
            accentColor={accentColor ?? "#7CFFB2"}
          />
        </Animated.View>

        <LessonPreview
          pathLabel={label}
          title={lessonTitle}
          durationMin={durationMin}
          xpReward={xpReward}
          accentColor={accentColor}
        />

        <View style={{ height: 16 }} />
        <PathPreview pathLabel={label} chapters={chapters} />

        {error ? (
          <Text style={{ marginTop: 12, color: "#FF6B7A", fontSize: 14 }}>
            {error}
          </Text>
        ) : null}
        <View style={{ height: 12 }} />
      </ScrollView>

      <OnboardingPrimaryButton
        label={loading ? "Préparation…" : "Commencer la leçon"}
        disabled={loading || !!error}
        onPress={onStartLesson}
      />
      <OnboardingPrimaryButton
        label="Aller à l’accueil"
        variant="ghost"
        onPress={onGoHome}
      />
    </View>
  );
}
