import { MascotSpeechBubble } from "./MascotSpeechBubble";
import type { MascotLine } from "../types";

export function MascotAside({
  line,
  accentColor,
  dimmed = false,
  compact = true,
  showAvatar = true,
  showName = true,
  tailTipX,
  fontSize,
  lineHeight,
  paddingHorizontal,
  paddingVertical,
}: {
  line: MascotLine;
  accentColor?: string;
  dimmed?: boolean;
  compact?: boolean;
  showAvatar?: boolean;
  showName?: boolean;
  tailTipX?: number;
  fontSize?: number;
  lineHeight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
}) {
  return (
    <MascotSpeechBubble
      pose={line.pose ?? "doubt"}
      text={line.text}
      compact={compact}
      accentColor={accentColor}
      dimmed={dimmed}
      showAvatar={showAvatar}
      showName={showName}
      tailTipX={tailTipX}
      fontSize={fontSize}
      lineHeight={lineHeight}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
    />
  );
}
