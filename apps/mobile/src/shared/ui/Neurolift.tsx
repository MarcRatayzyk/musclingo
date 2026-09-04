import { Image, Text, View, type TextStyle } from "react-native";

const SOURCE = require("../../../assets/neurolift.png");

/** Ratio naturel de l’asset (haltère horizontal). */
const ICON_ASPECT = 186 / 122;

export function NeuroliftIcon({ size = 18 }: { size?: number }) {
  const height = size;
  const width = Math.round(size * ICON_ASPECT);
  return (
    <Image
      source={SOURCE}
      accessibilityLabel="Neurolift"
      style={{ width, height }}
      resizeMode="contain"
    />
  );
}

/** Affiche un montant neurolift avec l’icône à côté (ex. +25 🧠). */
export function NeuroliftAmount({
  amount,
  size = "md",
  signed = false,
  color = "#7CFFB2",
}: {
  amount: number;
  size?: "sm" | "md" | "lg" | "xl";
  /** Préfixe « + » si positif */
  signed?: boolean;
  color?: string;
}) {
  const config = {
    sm: { icon: 20, value: 13, gap: 4 },
    md: { icon: 26, value: 15, gap: 6 },
    lg: { icon: 34, value: 28, gap: 8 },
    xl: { icon: 48, value: 40, gap: 10 },
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
      <Text style={valueStyle}>
        {prefix}
        {amount}
      </Text>
      <NeuroliftIcon size={config.icon} />
    </View>
  );
}
