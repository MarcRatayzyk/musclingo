import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { GorillaAvatar } from "./GorillaAvatar";
import { MASCOT_NAME, type MascotPose } from "../types";

const BUBBLE_STROKE = "#FFFFFF";
const BUBBLE_FILL = "#151A22";
/** Pointe du triangle dans le SVG (viewBox 24). */
const TAIL_TIP_IN_SVG = 9;

type MascotSpeechBubbleProps = {
  pose?: MascotPose;
  children?: React.ReactNode;
  text?: string;
  compact?: boolean;
  accentColor?: string;
  dimmed?: boolean;
  showAvatar?: boolean;
  showName?: boolean;
  tail?: "bottom" | "top";
  /**
   * Position horizontale de la pointe de flèche (depuis la gauche de la bulle).
   * Utile pour pointer le centre du Gorille placé en dessous.
   */
  tailTipX?: number;
  /** Overrides responsives (écran leçon). */
  fontSize?: number;
  lineHeight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
};

function BubbleTail({
  dimmed,
  direction,
  tipX,
}: {
  dimmed?: boolean;
  direction: "bottom" | "top";
  tipX: number;
}) {
  const stroke = dimmed ? "rgba(255,255,255,0.45)" : BUBBLE_STROKE;
  const marginLeft = Math.max(0, tipX - TAIL_TIP_IN_SVG);

  if (direction === "top") {
    return (
      <View style={{ marginLeft, marginBottom: -2, zIndex: 1 }}>
        <Svg width={24} height={16} viewBox="0 0 24 16">
          <Path
            d="M9 2 L21 16 H3 Z"
            fill={BUBBLE_FILL}
            stroke={stroke}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <Path d="M5 16 H19" stroke={BUBBLE_FILL} strokeWidth={4} />
        </Svg>
      </View>
    );
  }

  return (
    <View style={{ marginLeft, marginTop: -2, zIndex: 1 }}>
      <Svg width={24} height={16} viewBox="0 0 24 16">
        <Path
          d="M3 0 H21 L9 14 Z"
          fill={BUBBLE_FILL}
          stroke={stroke}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <Path d="M5 0 H19" stroke={BUBBLE_FILL} strokeWidth={4} />
      </Svg>
    </View>
  );
}

export function MascotSpeechBubble({
  pose = "present",
  children,
  text,
  compact = false,
  accentColor = "#5B8CFF",
  dimmed = false,
  showAvatar = true,
  showName = true,
  tail = "bottom",
  tailTipX = 37,
  fontSize,
  lineHeight,
  paddingHorizontal,
  paddingVertical,
}: MascotSpeechBubbleProps) {
  const avatarSize = compact ? "sm" : "md";
  const resolvedFontSize = fontSize ?? (compact ? 14 : 16);
  const resolvedLineHeight = lineHeight ?? (compact ? 22 : 26);
  const resolvedPadH = paddingHorizontal ?? (compact ? 12 : 16);
  const resolvedPadV = paddingVertical ?? (compact ? 10 : 14);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: tail === "top" ? "flex-start" : "flex-end",
        gap: 10,
        opacity: dimmed ? 0.55 : 1,
      }}
    >
      {showAvatar ? <GorillaAvatar pose={pose} size={avatarSize} /> : null}
      <View style={{ flex: 1, minWidth: 0 }}>
        {showName ? (
          <Text
            style={{
              marginBottom: 6,
              fontSize: 11,
              fontWeight: "700",
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: accentColor,
            }}
          >
            {MASCOT_NAME}
          </Text>
        ) : null}
        {tail === "top" ? (
          <BubbleTail dimmed={dimmed} direction="top" tipX={tailTipX} />
        ) : null}
        <View
          style={{
            backgroundColor: BUBBLE_FILL,
            borderColor: BUBBLE_STROKE,
            borderWidth: 2,
            borderRadius: compact ? 22 : 28,
            paddingHorizontal: resolvedPadH,
            paddingVertical: resolvedPadV,
          }}
        >
          {children ?? (
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: resolvedFontSize,
                lineHeight: resolvedLineHeight,
              }}
            >
              {text}
            </Text>
          )}
        </View>
        {tail === "bottom" ? (
          <BubbleTail dimmed={dimmed} direction="bottom" tipX={tailTipX} />
        ) : null}
      </View>
    </View>
  );
}
