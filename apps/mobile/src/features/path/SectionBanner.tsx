import { Pressable, Text, View } from "react-native";

function bannerInk(hex: string) {
  const c = hex.replace("#", "");
  if (c.length < 6) return "#0B0F14";
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luma > 0.65 ? "#0B0F14" : "#FFFFFF";
}

export function SectionBanner({
  color,
  sectionIndex,
  title,
  onPress,
}: {
  color: string;
  sectionIndex: number;
  title: string;
  onPress: () => void;
}) {
  const ink = bannerInk(color);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Section ${sectionIndex}, ${title}. Voir le détail du thème.`}
      className="mb-3 flex-row items-center rounded-[22px] px-4 py-3.5"
      style={{ backgroundColor: color }}
    >
      <View className="flex-1 pr-3">
        <Text
          className="text-[11px] font-semibold uppercase tracking-[2px]"
          style={{ color: ink, opacity: 0.72 }}
        >
          Section {sectionIndex}
        </Text>
        <Text
          className="mt-1 text-lg font-semibold"
          style={{ color: ink }}
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
      <View
        className="h-11 w-11 items-center justify-center rounded-2xl"
        style={{ backgroundColor: ink + "18" }}
      >
        <Text style={{ color: ink, fontSize: 20, fontWeight: "700" }}>☰</Text>
      </View>
    </Pressable>
  );
}
