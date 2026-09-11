import { Image, Text, View, type TextStyle } from "react-native";

const SOURCE = require("../../../assets/streak-fire.png");

export function StreakFireIcon({ size = 18 }: { size?: number }) {
  return (
    <Image
      source={SOURCE}
      accessibilityLabel="Série"
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export function StreakAmount({
  amount,
  size = "md",
  color = "#FF6B35",
}: {
  amount: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}) {
  const config = {
    sm: { icon: 20, value: 15, gap: 5 },
    md: { icon: 24, value: 17, gap: 6 },
    lg: { icon: 30, value: 20, gap: 7 },
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
      <StreakFireIcon size={config.icon} />
      <Text style={valueStyle}>{amount}</Text>
    </View>
  );
}
