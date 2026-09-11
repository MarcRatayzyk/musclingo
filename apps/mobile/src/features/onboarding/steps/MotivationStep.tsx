import { ScrollView, Text, View } from "react-native";
import { MASCOT_COPY, MOTIVATION_OPTIONS, getBlockerLabel } from "../content";
import { MascotAskHeader } from "../components/MascotAskHeader";
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
  selected: MotivationId[];
  onToggle: (id: MotivationId) => void;
  onContinue: () => void;
};

export function MotivationStep({ selected, onToggle, onContinue }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <MascotAskHeader pose="doubt" text={MASCOT_COPY.motivationAsk} />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          {MOTIVATION_OPTIONS.map((option) => (
            <SelectableCard
              key={option.id}
              layout="tile"
              label={getBlockerLabel(option.id)}
              accentColor={option.accent}
              selected={selected.includes(option.id)}
              onPress={() => onToggle(option.id)}
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

        {selected.length === 0 ? (
          <View style={{ marginTop: space.lg }}>
            <OnboardingEmptyState
              title="Choisis au moins un objectif"
              hint="On adaptera ton parcours. Tu pourras explorer le reste plus tard."
            />
          </View>
        ) : (
          <Text
            style={{
              ...onboardingType.meta,
              marginTop: space.lg,
              textAlign: "center",
            }}
          >
            {selected.length} sélectionné{selected.length > 1 ? "s" : ""}
          </Text>
        )}
        <View style={{ height: space.md }} />
      </ScrollView>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton
          label="Personnaliser mon parcours"
          disabled={selected.length === 0}
          onPress={onContinue}
        />
      </OnboardingButtonStack>
    </View>
  );
}
