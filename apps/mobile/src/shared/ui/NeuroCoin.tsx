import { Image, Text, View, type TextStyle } from "react-native";

const SOURCE = require("../../../assets/neurocoin.png");

export function NeuroCoinIcon({ size = 18 }: { size?: number }) {
  return (
    <Image
      source={SOURCE}
      accessibilityLabel="NeuroCoin"
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

/** Affiche un montant NeuroCoin avec l’icône à côté (ex. +25). */
export function NeuroCoinAmount({
  amount,
  size = "md",
  signed = false,
  color = "#E8B84A",
}: {
  amount: number;
  size?: "sm" | "md" | "lg" | "xl";
  /** Préfixe « + » si positif */
  signed?: boolean;
  color?: string;
}) {
  const config = {
    sm: { icon: 18, value: 14, gap: 4 },
    md: { icon: 24, value: 17, gap: 5 },
    lg: { icon: 30, value: 20, gap: 6 },
    xl: { icon: 40, value: 28, gap: 8 },
  }[size];

  const prefix = signed && amount > 0 ? "+" : "";
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
      <NeuroCoinIcon size={config.icon} />
      <Text style={valueStyle}>
        {prefix}
        {amount}
      </Text>
    </View>
  );
}
