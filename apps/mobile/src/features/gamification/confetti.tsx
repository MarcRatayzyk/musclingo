import { MotiView } from "moti";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

/** Lightweight confetti burst for perfect quiz — no heavy native deps. */
export function ConfettiBurst({ active }: { active: boolean }) {
  const [pieces] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 17) % 100}%`,
      delay: (i % 6) * 40,
      color: ["#7CFFB2", "#5B8CFF", "#FF8C5B", "#C77DFF", "#FFB84D"][i % 5]!,
      rotate: (i * 37) % 360,
    })),
  );

  if (!active) return null;

  return (
    <View
      pointerEvents="none"
      className="absolute inset-0 overflow-hidden"
    >
      {pieces.map((p) => (
        <MotiView
          key={p.id}
          from={{ translateY: -20, opacity: 1, rotate: "0deg" }}
          animate={{ translateY: 420, opacity: 0, rotate: `${p.rotate}deg` }}
          transition={{ type: "timing", duration: 1600, delay: p.delay }}
          style={{
            position: "absolute",
            left: p.left as `${number}%`,
            top: 40,
            width: 8,
            height: 14,
            borderRadius: 2,
            backgroundColor: p.color,
          }}
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
