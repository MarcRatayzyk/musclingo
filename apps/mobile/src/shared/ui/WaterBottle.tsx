import { Image, Text, View, type TextStyle } from "react-native";

const SOURCE = require("../../../assets/water-bottle.png");

export const WATER_BOTTLES_MAX = 15;
export const WATER_BOTTLE_COST = 4;

export function WaterBottleIcon({ size = 18 }: { size?: number }) {
  return (
    <Image
      source={SOURCE}
      accessibilityLabel="Bouteille d'eau"
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export function WaterBottleAmount({
  amount,
  max = WATER_BOTTLES_MAX,
  size = "md",
  color = "#5BCfff",
  showMax = false,
}: {
  amount: number;
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  /** Affiche `amount/max` au lieu de `amount` seul. */
  showMax?: boolean;
}) {
  const config = {
    sm: { icon: 18, value: 14, gap: 4 },
    md: { icon: 24, value: 17, gap: 5 },
    lg: { icon: 30, value: 20, gap: 6 },
    xl: { icon: 38, value: 26, gap: 8 },
  }[size];

  const valueStyle: TextStyle = {
    color,
    fontSize: config.value,
    fontWeight: "800",
    lineHeight: config.value + 4,
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: config.gap,
      }}
    >
      <WaterBottleIcon size={config.icon} />
      <Text style={valueStyle}>
        {showMax ? `${amount}/${max}` : amount}
      </Text>
    </View>
  );
}
