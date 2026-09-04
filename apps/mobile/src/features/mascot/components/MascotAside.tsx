import { MascotSpeechBubble } from "./MascotSpeechBubble";
import type { MascotLine } from "../types";

export function MascotAside({
  line,
  accentColor,
  dimmed = false,
  compact = true,
  showAvatar = true,
}: {
  line: MascotLine;
  accentColor?: string;
  dimmed?: boolean;
  compact?: boolean;
  showAvatar?: boolean;
}) {
  return (
    <MascotSpeechBubble
      pose={line.pose ?? "doubt"}
      text={line.text}
      compact={compact}
      accentColor={accentColor}
      dimmed={dimmed}
      showAvatar={showAvatar}
    />
  );
}
