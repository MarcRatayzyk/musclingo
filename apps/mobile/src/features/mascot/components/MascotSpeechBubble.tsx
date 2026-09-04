import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { GorillaAvatar } from "./GorillaAvatar";
import { MASCOT_NAME, type MascotPose } from "../types";

const BUBBLE_STROKE = "#FFFFFF";
const BUBBLE_FILL = "#151A22";

type MascotSpeechBubbleProps = {
  pose?: MascotPose;
  children?: React.ReactNode;
  text?: string;
  compact?: boolean;
  accentColor?: string;
  /** Past interventions stay readable but quieter. */
  dimmed?: boolean;
  showAvatar?: boolean;
};

/** Queue de bulle (bas-gauche), style icône outline. */
function BubbleTail({ dimmed }: { dimmed?: boolean }) {
  const stroke = dimmed ? "rgba(255,255,255,0.45)" : BUBBLE_STROKE;
  return (
    <View style={{ marginLeft: 28, marginTop: -2, zIndex: 1 }}>
      <Svg width={24} height={16} viewBox="0 0 24 16">
        <Path
          d="M3 0 H21 L9 14 Z"
          fill={BUBBLE_FILL}
          stroke={stroke}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {/* Masque le trait supérieur pour coller au corps de la bulle */}
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
}: MascotSpeechBubbleProps) {
  const avatarSize = compact ? "sm" : "md";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10,
        opacity: dimmed ? 0.55 : 1,
      }}
    >
      {showAvatar ? <GorillaAvatar pose={pose} size={avatarSize} /> : null}
      <View style={{ flex: 1, minWidth: 0 }}>
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
        <View
          style={{
            backgroundColor: BUBBLE_FILL,
            borderColor: BUBBLE_STROKE,
            borderWidth: 2,
            borderRadius: 28,
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}
        >
          {children ?? (
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                lineHeight: 26,
              }}
            >
              {text}
            </Text>
          )}
        </View>
        <BubbleTail dimmed={dimmed} />
      </View>
    </View>
  );
}
