import { Text, View } from "react-native";
import { GorillaAvatar } from "./GorillaAvatar";
import { MASCOT_NAME, type MascotPose } from "../types";

type MascotSpeechBubbleProps = {
  pose?: MascotPose;
  children?: React.ReactNode;
  text?: string;
  compact?: boolean;
  accentColor?: string;
};

export function MascotSpeechBubble({
  pose = "present",
  children,
  text,
  compact = false,
  accentColor = "#5B8CFF",
}: MascotSpeechBubbleProps) {
  const avatarSize = compact ? "sm" : "md";
  return (
    <View className="flex-row items-end gap-3">
      <GorillaAvatar pose={pose} size={avatarSize} />
      <View className="min-w-0 flex-1">
        <Text
          className="mb-1 text-xs font-semibold uppercase tracking-wider"
          style={{ color: accentColor }}
        >
          {MASCOT_NAME}
        </Text>
        <View
          className="rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3"
          style={{ borderColor: accentColor + "33" }}
        >
          {children ?? (
            <Text className="text-base leading-7 text-white/90">{text}</Text>
          )}
        </View>
      </View>
    </View>
  );
}
