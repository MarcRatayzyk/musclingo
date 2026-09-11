import { ScrollView, Text, View } from "react-native";
import { MASCOT_COPY, STREAK_GOAL_OPTIONS } from "../content";
import { MascotAskHeader } from "../components/MascotAskHeader";
import {
  OnboardingButtonStack,
  OnboardingPrimaryButton,
} from "../components/OnboardingPrimaryButton";
import { SelectableCard } from "../components/SelectableCard";
import { NeuroCoinIcon } from "@/shared/ui/NeuroCoin";
import { StreakFireIcon } from "@/shared/ui/StreakFire";
import { WaterBottleIcon } from "@/shared/ui/WaterBottle";
import { onboardingColors, onboardingFonts, onboardingType, radius, space } from "../theme";
import type { StreakGoalDays } from "../types";

type Props = {
  selected: StreakGoalDays | null;
  onSelect: (days: StreakGoalDays) => void;
  onContinue: () => void;
};

export function GoalStep({ selected, onSelect, onContinue }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <MascotAskHeader
        pose="present"
        text={MASCOT_COPY.goalAsk}
        accentColor={onboardingColors.copper}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {STREAK_GOAL_OPTIONS.map((option) => {
          const isSelected = selected === option.days;
          return (
            <SelectableCard
              key={option.days}
              layout="row"
              label={option.label}
              hint={option.tagline}
              selected={isSelected}
              accentColor={option.accent}
              onPress={() => onSelect(option.days)}
              icon={<StreakFireIcon size={26} />}
              endContent={
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <RewardChip
                    icon={<NeuroCoinIcon size={18} />}
                    amount={option.neuroCoins}
                    color="#E8B84A"
                    wash="rgba(232, 184, 74, 0.2)"
                  />
                  {option.waterBottles > 0 ? (
                    <RewardChip
                      icon={<WaterBottleIcon size={18} />}
                      amount={option.waterBottles}
                      color="#5BCfff"
                      wash="rgba(91, 207, 255, 0.2)"
                    />
                  ) : null}
                </View>
              }
            />
          );
        })}

        <Text
          style={{
            ...onboardingType.meta,
            marginTop: space.xs,
            marginBottom: space.sm,
            textAlign: "center",
          }}
        >
          {MASCOT_COPY.goalHint}
        </Text>
      </ScrollView>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton
          label="Valider mon objectif"
          disabled={!selected}
          onPress={onContinue}
        />
      </OnboardingButtonStack>
    </View>
  );
}

function RewardChip({
  icon,
  amount,
  color,
  wash,
}: {
  icon: React.ReactNode;
  amount: number;
  color: string;
  wash: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderRadius: radius.control,
        backgroundColor: wash,
        borderWidth: 1,
        borderColor: color + "66",
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      {icon}
      <Text
        style={{
          color,
          fontSize: 14,
          fontFamily: onboardingFonts.bodyBold,
        }}
      >
        +{amount}
      </Text>
    </View>
  );
}
