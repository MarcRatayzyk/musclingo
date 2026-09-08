import { Image, Text, View, type TextStyle } from "react-native";

const SOURCE = require("../../../assets/star.png");

export function StarIcon({
  size = 18,
  tintColor,
}: {
  size?: number;
  tintColor?: string;
}) {
  return (
    <Image
      source={SOURCE}
      accessibilityLabel="Étoile"
      style={{ width: size, height: size, tintColor }}
      resizeMode="contain"
    />
  );
}

export function StarAmount({
  amount,
  size = "md",
  color = "#F5C542",
}: {
  amount: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
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
      <Text style={valueStyle}>{amount}</Text>
      <StarIcon size={config.icon} />
    </View>
  );
}

/** Rangée de 0–3 étoiles (pleines / vides). */
export function StarRow({
  stars,
  size = 28,
}: {
  stars: number;
  size?: number;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
      {[1, 2, 3].map((n) => (
        <View key={n} style={{ opacity: n <= stars ? 1 : 0.28 }}>
          <StarIcon size={size} />
        </View>
      ))}
    </View>
  );
}
