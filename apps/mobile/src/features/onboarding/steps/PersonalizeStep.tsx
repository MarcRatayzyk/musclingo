import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { BLOCKER_OPTIONS, CONVERSION_COPY, getBlockerLabel } from "../content";
import { MotivationGlyph } from "../components/OnboardingIcons";
import {
  OnboardingButtonStack,
  OnboardingPrimaryButton,
} from "../components/OnboardingPrimaryButton";
import { OnboardingEmptyState } from "../components/OnboardingStates";
import { SelectableCard } from "../components/SelectableCard";
import { onboardingType, space } from "../theme";
import type { MotivationId } from "../types";

type Props = {
  selected: MotivationId | null;
  onSelect: (id: MotivationId) => void;
  onContinue: () => void;
};

export function PersonalizeStep({ selected, onSelect, onContinue }: Props) {
  const { t } = useTranslation("onboarding");
  const copy = CONVERSION_COPY.personalize;

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ ...onboardingType.hero, marginBottom: space.sm }}>
        {copy.headline}
      </Text>
      <Text style={{ ...onboardingType.bodyMuted, marginBottom: space.xl }}>
        {copy.hint}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ gap: 0 }}>
          {BLOCKER_OPTIONS.map((option) => (
            <SelectableCard
              key={option.id}
              layout="row"
              label={getBlockerLabel(option.id)}
              accentColor={option.accent}
              selected={selected === option.id}
              onPress={() => onSelect(option.id)}
              icon={
                <MotivationGlyph
                  id={option.id}
                  color={option.accent}
                  size={22}
                />
              }
            />
          ))}
        </View>

        {!selected ? (
          <View style={{ marginTop: space.md }}>
            <OnboardingEmptyState
              title={t("personalize.emptyTitle")}
              hint={t("personalize.emptyHint")}
            />
          </View>
        ) : null}
        <View style={{ height: space.md }} />
      </ScrollView>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton
          label={copy.cta}
          disabled={!selected}
          onPress={onContinue}
        />
      </OnboardingButtonStack>
    </View>
  );
}
