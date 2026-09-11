import { useEffect, useMemo, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { onboardingColors } from "@/features/onboarding/theme";

const PALETTE = [
  onboardingColors.pulse,
  onboardingColors.copper,
  onboardingColors.chalk,
  "#5B8CFF",
] as const;

type Piece = {
  id: number;
  x: number;
  startY: number;
  drift: number;
  color: string;
  w: number;
  h: number;
  rotate: number;
  delay: number;
  duration: number;
};

function ConfettiPiece({
  piece,
  fallDistance,
  reduceMotion,
}: {
  piece: Piece;
  fallDistance: number;
  reduceMotion: boolean;
}) {
  const progress = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      progress.value = 1;
      return;
    }
    progress.value = 0;
    progress.value = withDelay(
      piece.delay,
      withTiming(1, {
        duration: piece.duration,
        easing: Easing.out(Easing.quad),
      }),
    );
  }, [piece.delay, piece.duration, progress, reduceMotion]);

  const style = useAnimatedStyle(() => {
    const t = progress.value;
    return {
      position: "absolute" as const,
      left: piece.x,
      top: piece.startY + fallDistance * t,
      width: piece.w,
      height: piece.h,
      borderRadius: 2,
      backgroundColor: piece.color,
      opacity: reduceMotion
        ? 0.55
        : t < 0.12
          ? t / 0.12
          : t > 0.75
            ? (1 - t) / 0.25
            : 0.9,
      transform: [
        { rotate: `${piece.rotate + t * 120}deg` },
        { translateX: piece.drift * t },
      ],
    };
  });

  return <Animated.View pointerEvents="none" style={style} />;
}

/** Burst léger — palette salle (pulse / cuivre / craie), chute courte. */
export function ConfettiBurst({ active }: { active: boolean }) {
  const { width, height } = useWindowDimensions();
  const reduceMotion = useReducedMotion() ?? false;
  const [seed] = useState(() => Math.floor(Math.random() * 1000));

  const pieces = useMemo<Piece[]>(() => {
    if (!active) return [];
    return Array.from({ length: 16 }, (_, i) => {
      const n = seed + i * 17;
      return {
        id: i,
        x: ((n * 37) % Math.max(width - 16, 1)),
        startY: -20 - (n % 5) * 12,
        drift: ((n % 11) - 5) * 10,
        color: PALETTE[i % PALETTE.length]!,
        w: 6 + (n % 4),
        h: 11 + (n % 5),
        rotate: (n * 29) % 360,
        delay: (i % 6) * 40,
        duration: 1400 + (n % 7) * 120,
      };
    });
  }, [active, seed, width]);

  if (!active) return null;

  const fallDistance = Math.min(height * 0.42, 320);

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      {pieces.map((p) => (
        <ConfettiPiece
          key={p.id}
          piece={p}
          fallDistance={fallDistance}
          reduceMotion={reduceMotion}
        />
      ))}
    </View>
  );
}

export function useFlash(ms = 1200) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on) return;
    const t = setTimeout(() => setOn(false), ms);
    return () => clearTimeout(t);
  }, [on, ms]);
  return { on, trigger: () => setOn(true) };
}
