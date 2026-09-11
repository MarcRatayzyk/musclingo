import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  motion,
  onboardingColors,
  onboardingType,
  radius,
  space,
} from "../theme";
import { CheckIcon } from "./OnboardingIcons";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  hint?: string;
  badge?: string;
  accentColor?: string;
  disabled?: boolean;
  /** Tuile grille (motivation / path) vs rangée pleine largeur. */
  layout?: "tile" | "row";
  /** Atténue la tuile (ex. bientôt) sans bloquer le press. */
  dimmed?: boolean;
  /** Contenu à droite du label (ex. récompenses), même ligne. */
  endContent?: React.ReactNode;
  /** Réserve toujours la ligne badge (hauteurs égales en grille). */
  reserveBadge?: boolean;
};

export function SelectableCard({
  label,
  selected,
  onPress,
  icon,
  hint,
  badge,
  accentColor = onboardingColors.pulse,
  disabled,
  layout = "row",
  dimmed,
  endContent,
  reserveBadge,
}: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isTile = layout === "tile";
  const showBadgeSlot = Boolean(badge) || reserveBadge;

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      onPressIn={() => {
        scale.value = withSpring(0.97, motion.press);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, motion.release);
      }}
      onPress={onPress}
      style={
        isTile
          ? { width: "48%", marginBottom: 10 }
          : { marginBottom: space.md }
      }
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            minHeight: isTile ? (hint ? 148 : 132) : undefined,
            height: isTile ? (hint ? 148 : 132) : undefined,
            borderRadius: radius.tile,
            borderWidth: 1.5,
            borderColor: selected ? accentColor : onboardingColors.seam,
            backgroundColor: selected
              ? accentColor + "18"
              : onboardingColors.rubber,
            paddingHorizontal: space.lg,
            paddingVertical: space.lg,
            opacity: disabled || dimmed ? 0.55 : 1,
            overflow: "hidden",
            justifyContent: isTile ? "space-between" : undefined,
          },
        ]}
      >
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            backgroundColor: selected ? accentColor : "transparent",
          }}
        />

        {isTile ? (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconWell selected={selected} accentColor={accentColor}>
                {icon}
              </IconWell>
              <SelectionDot selected={selected} accentColor={accentColor} />
            </View>
            {showBadgeSlot ? (
              <Text
                style={{
                  ...onboardingType.meta,
                  color: badge ? accentColor : "transparent",
                  fontFamily: onboardingType.label.fontFamily,
                  minHeight: 18,
                }}
              >
                {badge ?? " "}
              </Text>
            ) : null}
            <Text style={onboardingType.label} numberOfLines={2}>
              {label}
            </Text>
            {hint ? <Text style={onboardingType.meta}>{hint}</Text> : null}
          </>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: space.md,
            }}
          >
            {icon ? (
              <IconWell selected={selected} accentColor={accentColor}>
                {icon}
              </IconWell>
            ) : null}
            <View style={{ flex: 1, gap: 2, minWidth: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: space.sm,
                  flexWrap: "wrap",
                }}
              >
                <Text style={onboardingType.label}>{label}</Text>
                {endContent}
                {badge ? (
                  <Text
                    style={{
                      ...onboardingType.meta,
                      color: accentColor,
                      fontFamily: onboardingType.label.fontFamily,
                    }}
                  >
                    {badge}
                  </Text>
                ) : null}
              </View>
              {hint ? <Text style={onboardingType.meta}>{hint}</Text> : null}
            </View>
            <SelectionDot selected={selected} accentColor={accentColor} />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

function IconWell({
  children,
  selected,
  accentColor,
}: {
  children?: React.ReactNode;
  selected: boolean;
  accentColor: string;
}) {
  return (
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: selected ? accentColor + "28" : onboardingColors.plate,
      }}
    >
      {children}
    </View>
  );
}

function SelectionDot({
  selected,
  accentColor,
}: {
  selected: boolean;
  accentColor: string;
}) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: selected ? accentColor : onboardingColors.seam,
        backgroundColor: selected ? accentColor : "transparent",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selected ? (
        <CheckIcon size={12} color={onboardingColors.onPulse} />
      ) : null}
    </View>
  );
}
