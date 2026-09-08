import { View } from "react-native";

/** Menu hamburger (3 barres). */
export function MenuHamburgerIcon({
  size = 22,
  color = "#FFFFFF",
  thickness = 2.5,
}: {
  size?: number;
  color?: string;
  thickness?: number;
}) {
  const gap = Math.max(3, Math.round(size * 0.18));
  const width = size;
  return (
    <View
      style={{
        width,
        height: thickness * 3 + gap * 2,
        justifyContent: "space-between",
      }}
      accessibilityLabel="Menu"
    >
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={{
            height: thickness,
            width: "100%",
            borderRadius: thickness,
            backgroundColor: color,
          }}
        />
      ))}
    </View>
  );
}
