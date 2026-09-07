import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AVAILABLE_PATH_SLUGS, PATH_OPTIONS } from "../content";
import { MascotAskHeader } from "../components/MascotAskHeader";
import { OnboardingPrimaryButton } from "../components/OnboardingPrimaryButton";
import type { PathSlug } from "../types";

type Props = {
  selected: PathSlug | null;
  recommended: PathSlug;
  onSelect: (slug: PathSlug) => void;
  onContinue: () => void;
};

export function PriorityStep({
  selected,
  recommended,
  onSelect,
  onContinue,
}: Props) {
  const active = selected ?? recommended;
  const [soonHint, setSoonHint] = useState(false);

  useEffect(() => {
    if (!soonHint) return;
    const t = setTimeout(() => setSoonHint(false), 2600);
    return () => clearTimeout(t);
  }, [soonHint]);

  return (
    <View style={{ flex: 1 }}>
      <MascotAskHeader
        pose="default"
        text={
          soonHint
            ? "Ces parcours seront bientôt disponibles."
            : "Par quoi on commence ?"
        }
        accentColor="#7CFFB2"
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          {PATH_OPTIONS.map((option) => (
            <PathTile
              key={option.slug}
              emoji={option.emoji}
              label={option.label}
              accent={option.accent}
              selected={!option.comingSoon && active === option.slug}
              recommended={
                !option.comingSoon && option.slug === recommended
              }
              comingSoon={!!option.comingSoon}
              onPress={() => {
                if (option.comingSoon) {
                  setSoonHint(true);
                  return;
                }
                setSoonHint(false);
                onSelect(option.slug);
              }}
            />
          ))}
        </View>
        {soonHint ? (
          <Animated.View
            entering={FadeIn.duration(180)}
            exiting={FadeOut.duration(180)}
            style={{
              marginTop: 12,
              borderRadius: 16,
              backgroundColor: "#1C2230",
              borderWidth: 1,
              borderColor: "#2A3344",
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <Text style={{ color: "#8B95A8", fontSize: 14, lineHeight: 20 }}>
              Les parcours seront bientôt disponibles.
            </Text>
          </Animated.View>
        ) : null}
        <View style={{ height: 12 }} />
      </ScrollView>

      <OnboardingPrimaryButton
        label="Continuer"
        onPress={() => {
          const current = selected ?? recommended;
          onSelect(
            AVAILABLE_PATH_SLUGS.includes(current) ? current : recommended,
          );
          onContinue();
        }}
      />
    </View>
  );
}

function PathTile({
  emoji,
  label,
  accent,
  selected,
  recommended,
  comingSoon,
  onPress,
}: {
  emoji: string;
  label: string;
  accent: string;
  selected: boolean;
  recommended: boolean;
  comingSoon: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: false }}
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 16, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 260 });
      }}
      onPress={onPress}
      style={{ width: "48%" }}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            minHeight: 118,
            borderRadius: 22,
            borderWidth: 2,
            borderColor: selected ? accent : "#2A3344",
            backgroundColor: selected
              ? accent + "1F"
              : comingSoon
                ? "#10141C"
                : "#141820",
            paddingHorizontal: 14,
            paddingVertical: 14,
            opacity: comingSoon ? 0.72 : 1,
          },
        ]}
      >
        {recommended ? (
          <Text
            style={{
              alignSelf: "flex-start",
              marginBottom: 8,
              color: accent,
              fontSize: 10,
              fontWeight: "800",
              letterSpacing: 0.6,
              textTransform: "uppercase",
            }}
          >
            Recommandé
          </Text>
        ) : comingSoon ? (
          <Text
            style={{
              alignSelf: "flex-start",
              marginBottom: 8,
              color: "#8B95A8",
              fontSize: 10,
              fontWeight: "800",
              letterSpacing: 0.6,
              textTransform: "uppercase",
            }}
          >
            Bientôt
          </Text>
        ) : (
          <View style={{ height: 18, marginBottom: 8 }} />
        )}
        <Text style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</Text>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
