import { Pressable, ScrollView, Text, View } from "react-native";
import { STREAK_GOAL_OPTIONS } from "../content";
import { MascotAskHeader } from "../components/MascotAskHeader";
import { OnboardingPrimaryButton } from "../components/OnboardingPrimaryButton";
import { NeuroCoinIcon } from "@/shared/ui/NeuroCoin";
import { StreakFireIcon } from "@/shared/ui/StreakFire";
import { WaterBottleIcon } from "@/shared/ui/WaterBottle";
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
        text="Quel objectif on vise ?"
        accentColor="#FFB84D"
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {STREAK_GOAL_OPTIONS.map((option) => {
          const isSelected = selected === option.days;
          return (
            <Pressable
              key={option.days}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${option.label}, ${option.neuroCoins} neurocoins${
                option.waterBottles
                  ? `, ${option.waterBottles} bouteilles`
                  : ""
              }`}
              onPress={() => onSelect(option.days)}
              style={{
                marginBottom: 12,
                borderRadius: 24,
                borderWidth: 2,
                borderColor: isSelected ? option.accent : "#2A3344",
                backgroundColor: isSelected
                  ? option.accent + "18"
                  : "#141820",
                padding: 18,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#1C2230",
                    }}
                  >
                    <StreakFireIcon size={26} />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      {option.label}
                    </Text>
                    <Text
                      style={{
                        color: option.accent,
                        fontSize: 13,
                        fontWeight: "600",
                        marginTop: 2,
                      }}
                    >
                      {option.tagline}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderWidth: 2,
                    borderColor: isSelected ? option.accent : "#2A3344",
                    backgroundColor: isSelected ? option.accent : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isSelected ? (
                    <Text
                      style={{
                        color: "#0B0D10",
                        fontSize: 12,
                        fontWeight: "800",
                      }}
                    >
                      ✓
                    </Text>
                  ) : null}
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <RewardIconAmount
                  icon={<NeuroCoinIcon size={20} />}
                  amount={option.neuroCoins}
                  color="#E8B84A"
                />
                {option.waterBottles > 0 ? (
                  <RewardIconAmount
                    icon={<WaterBottleIcon size={20} />}
                    amount={option.waterBottles}
                    color="#5BCfff"
                  />
                ) : null}
              </View>
            </Pressable>
          );
        })}

        <Text
          style={{
            marginTop: 4,
            marginBottom: 8,
            color: "#8B95A8",
            fontSize: 13,
            lineHeight: 18,
            textAlign: "center",
          }}
        >
          Récompenses débloquées uniquement si tu tiens la série annoncée.
        </Text>
      </ScrollView>

      <OnboardingPrimaryButton
        label="Continuer"
        disabled={!selected}
        onPress={onContinue}
      />
    </View>
  );
}

function RewardIconAmount({
  icon,
  amount,
  color,
}: {
  icon: React.ReactNode;
  amount: number;
  color: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        backgroundColor: "#1C2230",
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}
    >
      {icon}
      <Text style={{ color, fontSize: 15, fontWeight: "700" }}>+{amount}</Text>
    </View>
  );
}
