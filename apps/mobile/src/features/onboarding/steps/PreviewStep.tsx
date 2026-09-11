import { ScrollView, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { CONVERSION_COPY, PATH_CHAPTERS, getInsight } from "../content";
import { pathLabel } from "../recommend";
import { LessonPreview } from "../components/LessonPreview";
import {
  OnboardingButtonStack,
  OnboardingPrimaryButton,
} from "../components/OnboardingPrimaryButton";
import { OnboardingErrorState } from "../components/OnboardingStates";
import { PathPreview } from "../components/PathPreview";
import { LockIcon } from "../components/OnboardingIcons";
import {
  motion,
  onboardingColors,
  onboardingType,
  radius,
  space,
} from "../theme";
import { useReducedMotion } from "../useReducedMotion";
import type { MotivationId, PathChapterPreview, PathSlug } from "../types";

type Props = {
  path: PathSlug;
  blocker: MotivationId | undefined;
  chaptersFromApi?: PathChapterPreview[];
  lessonTitle: string;
  xpReward: number;
  accentColor?: string;
  loading?: boolean;
  error?: string | null;
  onContinue: () => void;
  onRetry?: () => void;
};

export function PreviewStep({
  path,
  blocker,
  chaptersFromApi,
  lessonTitle,
  xpReward,
  accentColor,
  loading,
  error,
  onContinue,
  onRetry,
}: Props) {
  const reduced = useReducedMotion();
  const copy = CONVERSION_COPY.preview;
  const insight = getInsight(blocker);
  const chapters =
    chaptersFromApi && chaptersFromApi.length > 0
      ? chaptersFromApi
      : PATH_CHAPTERS[path];
  const label = pathLabel(path);
  const accent = accentColor ?? onboardingColors.pulse;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Animated.View
          entering={reduced ? undefined : FadeIn.duration(motion.enter)}
        >
          <Text style={{ ...onboardingType.hero, marginBottom: space.sm }}>
            {copy.headline}
          </Text>
          <Text
            style={{
              ...onboardingType.bodyMuted,
              marginBottom: space.xl,
              maxWidth: 340,
            }}
          >
            {copy.body}
          </Text>
        </Animated.View>

        <Text
          style={{
            ...onboardingType.meta,
            color: onboardingColors.pulse,
            fontFamily: onboardingType.label.fontFamily,
            marginBottom: space.sm,
          }}
        >
          {copy.freeLabel}
        </Text>
        <LessonPreview
          pathLabel={label}
          title={lessonTitle}
          xpReward={xpReward}
          accentColor={accent}
        />

        <View
          style={{
            marginTop: space.lg,
            marginBottom: space.sm,
            flexDirection: "row",
            alignItems: "center",
            gap: space.sm,
          }}
        >
          <LockIcon size={14} color={onboardingColors.mist} />
          <Text
            style={{
              ...onboardingType.meta,
              color: onboardingColors.mist,
              fontFamily: onboardingType.label.fontFamily,
            }}
          >
            {copy.lockedLabel}
          </Text>
        </View>

        <PathPreview
          pathLabel={label}
          chapters={chapters}
          accentColor={accent}
        />

        <View
          style={{
            marginTop: space.lg,
            borderRadius: radius.tile,
            borderWidth: 1,
            borderColor: onboardingColors.seam,
            backgroundColor: onboardingColors.plate,
            padding: space.lg,
          }}
        >
          <Text style={onboardingType.meta}>{insight.premiumHook}</Text>
        </View>

        {error ? (
          <OnboardingErrorState
            compact
            message={error}
            actionLabel="Réessayer"
            onAction={onRetry}
          />
        ) : null}
        <View style={{ height: space.md }} />
      </ScrollView>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton
          label={loading ? "Préparation…" : copy.cta}
          disabled={loading || !!error}
          loading={loading}
          onPress={onContinue}
        />
      </OnboardingButtonStack>
    </View>
  );
}
