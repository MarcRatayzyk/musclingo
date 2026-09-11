import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AVAILABLE_PATH_SLUGS, MASCOT_COPY, PATH_OPTIONS, getPathHint, getPathLabel } from "../content";
import { MascotAskHeader } from "../components/MascotAskHeader";
import { PathGlyph } from "../components/OnboardingIcons";
import {
  OnboardingButtonStack,
  OnboardingPrimaryButton,
} from "../components/OnboardingPrimaryButton";
import { SelectableCard } from "../components/SelectableCard";
import {
  onboardingColors,
  onboardingType,
  radius,
  space,
} from "../theme";
import { useReducedMotion } from "../useReducedMotion";
import type { PathSlug } from "../types";

type Props = {
  selected: PathSlug | null;
  recommended: PathSlug;
  onSelect: (slug: PathSlug) => void;
  onContinue: () => void;
};

export function PriorityStep({
  selected,
  recommended,
  onSelect,
  onContinue,
}: Props) {
  const active = selected ?? recommended;
  const [soonHint, setSoonHint] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!soonHint) return;
    const t = setTimeout(() => setSoonHint(false), 2600);
    return () => clearTimeout(t);
  }, [soonHint]);

  return (
    <View style={{ flex: 1 }}>
      <MascotAskHeader
        pose="default"
        text={soonHint ? MASCOT_COPY.prioritySoon : MASCOT_COPY.priorityAsk}
        accentColor={onboardingColors.pulse}
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
          {PATH_OPTIONS.map((option) => (
            <SelectableCard
              key={option.slug}
              layout="tile"
              reserveBadge
              label={getPathLabel(option.slug)}
              hint={getPathHint(option.slug)}
              accentColor={option.accent}
              selected={!option.comingSoon && active === option.slug}
              badge={
                !option.comingSoon && option.slug === recommended
                  ? "Pour toi"
                  : option.comingSoon
                    ? "Bientôt"
                    : undefined
              }
              dimmed={!!option.comingSoon}
              onPress={() => {
                if (option.comingSoon) {
                  setSoonHint(true);
                  return;
                }
                setSoonHint(false);
                onSelect(option.slug);
              }}
              icon={
                <PathGlyph
                  slug={option.slug}
                  color={option.comingSoon ? onboardingColors.mist : option.accent}
                  size={22}
                />
              }
            />
          ))}
        </View>

        {soonHint ? (
          <Animated.View
            entering={reduced ? undefined : FadeIn.duration(180)}
            exiting={reduced ? undefined : FadeOut.duration(180)}
            style={{
              marginTop: space.md,
              borderRadius: radius.tile,
              backgroundColor: onboardingColors.plate,
              borderWidth: 1,
              borderColor: onboardingColors.seam,
              paddingHorizontal: space.lg,
              paddingVertical: space.md,
            }}
          >
            <Text style={onboardingType.bodyMuted}>
              Anatomie et nutrition sont dispo maintenant. Les autres suivent.
            </Text>
          </Animated.View>
        ) : null}
        <View style={{ height: space.md }} />
      </ScrollView>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton
          label="Voir ma première leçon"
          onPress={() => {
            const current = selected ?? recommended;
            onSelect(
              AVAILABLE_PATH_SLUGS.includes(current) ? current : recommended,
            );
            onContinue();
          }}
        />
      </OnboardingButtonStack>
    </View>
  );
}
