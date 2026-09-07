import type { ReactNode } from "react";
import { View } from "react-native";
import { useMe } from "@/features/auth/api";
import { NeuroCoinAmount } from "./NeuroCoin";
import { StreakAmount } from "./StreakFire";
import { WaterBottleAmount } from "./WaterBottle";

/** Compteurs série + NeuroCoins + bouteilles (barre haute). */
export function RewardsHud({
  size = "md",
  fullWidth = false,
  trailing,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  /** Répartit les items sur toute la largeur. */
  fullWidth?: boolean;
  trailing?: ReactNode;
}) {
  const { data: me } = useMe();
  const streak = me?.streak?.current ?? 0;
  const coins = me?.neuroCoinBalance ?? 0;
  const bottles = me?.waterBottles ?? 15;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: fullWidth ? "space-between" : "center",
        width: fullWidth ? "100%" : undefined,
        gap: fullWidth ? undefined : 30,
      }}
    >
      <StreakAmount amount={streak} size={size} />
      <NeuroCoinAmount amount={coins} size={size} />
      <WaterBottleAmount amount={bottles} size={size} showMax={false} />
      {trailing}
    </View>
  );
}
