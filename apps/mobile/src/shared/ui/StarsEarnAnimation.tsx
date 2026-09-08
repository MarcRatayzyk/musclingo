import { useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { NeuroCoinAmount, NeuroCoinIcon } from "./NeuroCoin";

function FlyingCoin({
  index,
  total,
  fromX,
  fromY,
  toX,
  toY,
  onDone,
}: {
  index: number;
  total: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  onDone?: () => void;
}) {
  const progress = useSharedValue(0);
  const spread = (index - (total - 1) / 2) * 28;

  useEffect(() => {
    progress.value = withDelay(
      index * 120,
      withTiming(1, { duration: 700, easing: Easing.inOut(Easing.cubic) }, (finished) => {
        if (finished && onDone && index === total - 1) {
          runOnJS(onDone)();
        }
      }),
    );
  }, [index, onDone, progress, total]);

  const style = useAnimatedStyle(() => {
    const t = progress.value;
    const midY = fromY - 60;
    const x =
      fromX +
      spread * (1 - t) +
      (toX - fromX - spread * (1 - t)) * t;
    const y =
      (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * midY + t * t * toY;
    return {
      position: "absolute" as const,
      left: x,
      top: y,
      opacity: t < 0.08 ? t / 0.08 : t > 0.9 ? (1 - t) / 0.1 : 1,
      transform: [{ scale: 1 - t * 0.35 }],
    };
  });

  return (
    <Animated.View style={style} pointerEvents="none">
      <NeuroCoinIcon size={28} />
    </Animated.View>
  );
}

/**
 * Affiche un compteur de NeuroCoins en haut et anime N pièces
 * depuis le centre vers ce compteur.
 */
export function NeuroCoinsEarnAnimation({
  earned,
  fromTotal,
  toTotal,
  active,
}: {
  earned: number;
  fromTotal: number;
  toTotal: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState(fromTotal);
  const [origin, setOrigin] = useState({ x: 0, y: 180 });
  const [target, setTarget] = useState({ x: 24, y: 12 });
  const [flying, setFlying] = useState(false);
  const count = Math.min(3, Math.max(1, Math.ceil(earned / 15)));

  useEffect(() => {
    if (!active || earned <= 0) return;
    setDisplay(fromTotal);
    setFlying(true);
  }, [active, earned, fromTotal]);

  function onHudLayout(e: LayoutChangeEvent) {
    const { x, y, width, height } = e.nativeEvent.layout;
    setTarget({ x: x + width - 18, y: y + height / 2 - 14 });
  }

  function onOriginLayout(e: LayoutChangeEvent) {
    const { x, y, width, height } = e.nativeEvent.layout;
    setOrigin({ x: x + width / 2 - 14, y: y + height / 2 - 14 });
  }

  function onFlyDone() {
    setFlying(false);
    setDisplay(toTotal);
  }

  useEffect(() => {
    if (!flying) return;
    const step = Math.max(1, Math.ceil((toTotal - fromTotal) / count));
    let current = fromTotal;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          current = Math.min(toTotal, current + step);
          setDisplay(current);
        }, 120 + i * 120 + 500),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [count, flying, fromTotal, toTotal]);

  if (!active || earned <= 0) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
      }}
    >
      <View
        onLayout={onHudLayout}
        style={{
          position: "absolute",
          top: 8,
          right: 16,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.12)",
          backgroundColor: "rgba(18,24,32,0.92)",
        }}
      >
        <NeuroCoinAmount amount={display} size="md" />
      </View>

      <View
        onLayout={onOriginLayout}
        style={{
          position: "absolute",
          top: "42%",
          left: 0,
          right: 0,
          height: 40,
          alignItems: "center",
        }}
      />

      {flying
        ? Array.from({ length: count }, (_, i) => (
            <FlyingCoin
              key={i}
              index={i}
              total={count}
              fromX={origin.x}
              fromY={origin.y}
              toX={target.x}
              toY={target.y}
              onDone={onFlyDone}
            />
          ))
        : null}
    </View>
  );
}

/** @deprecated Alias — préférer NeuroCoinsEarnAnimation. */
export const StarsEarnAnimation = NeuroCoinsEarnAnimation;
