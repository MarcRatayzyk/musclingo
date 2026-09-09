import { Image, Text, View, type TextStyle } from "react-native";
import type { LevelRewardKind } from "@muscle-mind/types";
import { NeuroCoinIcon } from "./NeuroCoin";
import { WaterBottleIcon } from "./WaterBottle";

const HINT_SOURCE = require("../../../assets/quiz-hint.png");
const EXTRA_TIME_SOURCE = require("../../../assets/extra-time.png");
const FREEZE_SOURCE = require("../../../assets/streak-freeze.png");

export function QuizHintIcon({ size = 18 }: { size?: number }) {
  return (
    <Image
      source={HINT_SOURCE}
      accessibilityLabel="Indice"
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export function ExtraTimeIcon({ size = 18 }: { size?: number }) {
  return (
    <Image
      source={EXTRA_TIME_SOURCE}
      accessibilityLabel="Bonus temps"
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export function StreakFreezeIcon({ size = 18 }: { size?: number }) {
  return (
    <Image
      source={FREEZE_SOURCE}
      accessibilityLabel="Gel de série"
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export function BoostIcon({
  kind,
  size = 18,
}: {
  kind: LevelRewardKind;
  size?: number;
}) {
  switch (kind) {
    case "quizHint":
      return <QuizHintIcon size={size} />;
    case "extraTime":
      return <ExtraTimeIcon size={size} />;
    case "streakFreeze":
      return <StreakFreezeIcon size={size} />;
    case "neuroCoins":
      return <NeuroCoinIcon size={size} />;
    case "waterBottles":
      return <WaterBottleIcon size={size} />;
    default:
      return null;
  }
}

export function BoostAmount({
  kind,
  amount,
  size = "sm",
  color = "#FFFFFF",
  label,
}: {
  kind: LevelRewardKind;
  amount: number;
  size?: "sm" | "md";
  color?: string;
  label?: string;
}) {
  const config = size === "md" ? { icon: 22, value: 14, gap: 6 } : { icon: 16, value: 12, gap: 5 };
  const valueStyle: TextStyle = {
    color,
    fontSize: config.value,
    fontWeight: "700",
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: config.gap,
      }}
    >
      <BoostIcon kind={kind} size={config.icon} />
      <Text style={valueStyle}>
        {amount}
        {label ? ` ${label}` : ""}
      </Text>
    </View>
  );
}
