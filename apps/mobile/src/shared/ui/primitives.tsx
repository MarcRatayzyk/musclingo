import { MotiView } from "moti";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export function XpBar({
  progress,
  color = "#7CFFB2",
}: {
  progress: number;
  color?: string;
}) {
  const pct = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  const [trackWidth, setTrackWidth] = useState(0);
  const fillWidth = trackWidth * pct;

  return (
    <View
      className="h-3 overflow-hidden rounded-full bg-elevated"
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && w !== trackWidth) setTrackWidth(w);
      }}
    >
      {trackWidth > 0 && (
        <MotiView
          from={{ width: 0 }}
          animate={{ width: fillWidth }}
          transition={{ type: "timing", duration: 700 }}
          style={{
            height: "100%",
            borderRadius: 999,
            backgroundColor: color,
          }}
        />
      )}
    </View>
  );
}

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 bg-background px-5 pt-14">{children}</View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`rounded-2xl py-4 ${
        disabled ? "bg-elevated" : "bg-accent"
      }`}
    >
      <Text
        className={`text-center text-base font-semibold ${
          disabled ? "text-muted" : "text-background"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
