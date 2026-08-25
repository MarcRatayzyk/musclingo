import { useEffect, useState } from "react";
import { View } from "react-native";

/** Lightweight confetti burst for perfect quiz — no Moti / heavy deps. */
export function ConfettiBurst({ active }: { active: boolean }) {
  const [pieces] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 17) % 100}%`,
      color: ["#7CFFB2", "#5B8CFF", "#FF8C5B", "#C77DFF", "#FFB84D"][i % 5]!,
      top: 40 + (i % 5) * 28,
      rotate: (i * 37) % 360,
    })),
  );

  if (!active) return null;

  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <View
          key={p.id}
          style={{
            position: "absolute",
            left: p.left as `${number}%`,
            top: p.top,
            width: 8,
            height: 14,
            borderRadius: 2,
            backgroundColor: p.color,
            transform: [{ rotate: `${p.rotate}deg` }],
            opacity: 0.85,
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
