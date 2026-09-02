import { Text } from "react-native";
import { MascotSpeechBubble } from "./MascotSpeechBubble";
import type { MascotLine } from "../types";

export function MascotAside({
  line,
  accentColor,
}: {
  line: MascotLine;
  accentColor?: string;
}) {
  return (
    <MascotSpeechBubble
      pose={line.pose ?? "doubt"}
      text={line.text}
      compact
      accentColor={accentColor}
    />
  );
}
