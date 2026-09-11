import { useMemo } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Svg, { Circle, G, Line, Polygon, Text as SvgText } from "react-native-svg";
import { localizeCategoryName } from "@/i18n/categoryNames";
import type { Category } from "./api";

type Props = {
  categories: Category[];
  size?: number;
  radarHint?: string;
};

const GRID_LEVELS = [0.25, 0.5, 0.75, 1] as const;
const ACCENT = "#7CFFB2";
const GRID = "#2A3848";
const LABEL = "#8A96A6";

function polar(cx: number, cy: number, radius: number, angle: number) {
  return {
    x: cx + radius * Math.sin(angle),
    y: cy - radius * Math.cos(angle),
  };
}

function truncateLabel(name: string, max = 14) {
  const trimmed = name.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

export function CategoryRadarChart({
  categories,
  size,
  radarHint,
}: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const chartSize = size ?? Math.min(320, Math.max(260, windowWidth - 48));

  const geometry = useMemo(() => {
    const n = categories.length;
    if (n < 3) return null;

    const cx = chartSize / 2;
    const cy = chartSize / 2;
    const radius = chartSize * 0.32;
    const labelRadius = radius + 28;
    const angles = categories.map((_, i) => (i / n) * Math.PI * 2);

    const rings = GRID_LEVELS.map((level) =>
      angles
        .map((angle) => polar(cx, cy, radius * level, angle))
        .map((p) => `${p.x},${p.y}`)
        .join(" "),
    );

    const axes = angles.map((angle) => ({
      from: { x: cx, y: cy },
      to: polar(cx, cy, radius, angle),
    }));

    const dataPoints = categories.map((cat, i) => {
      const progress = Math.max(0, Math.min(1, cat.progress));
      return polar(cx, cy, radius * progress, angles[i]!);
    });

    const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

    const labels = categories.map((cat, i) => {
      const point = polar(cx, cy, labelRadius, angles[i]!);
      const pct = Math.round(Math.max(0, Math.min(1, cat.progress)) * 100);
      return {
        ...point,
        name: truncateLabel(localizeCategoryName(cat.name, cat.slug)),
        pct,
        color: cat.color,
        anchor:
          Math.abs(point.x - cx) < 8
            ? ("middle" as const)
            : point.x > cx
              ? ("start" as const)
              : ("end" as const),
      };
    });

    return { cx, cy, radius, rings, axes, dataPoints, dataPolygon, labels };
  }, [categories, chartSize]);

  if (categories.length === 0) {
    return null;
  }

  if (!geometry) {
    return (
      <View className="rounded-3xl border border-border bg-surface p-5">
        <View className="gap-3">
          {categories.map((cat) => {
            const pct = Math.round(cat.progress * 100);
            return (
              <View
                key={cat.id}
                className="flex-row items-center justify-between"
              >
                <Text className="flex-1 pr-3 text-base text-white">
                  {localizeCategoryName(cat.name, cat.slug)}
                </Text>
                <Text
                  className="text-base font-semibold tabular-nums"
                  style={{ color: cat.color }}
                >
                  {pct}%
                </Text>
              </View>
            );
          })}
        </View>
        {radarHint ? (
          <Text className="mt-3 text-xs text-muted">{radarHint}</Text>
        ) : null}
      </View>
    );
  }

  const { cx, cy, rings, axes, dataPoints, dataPolygon, labels } = geometry;

  return (
    <View className="items-center rounded-3xl border border-border bg-surface py-4">
      <Svg width={chartSize} height={chartSize}>
        <G>
          {rings.map((points, i) => (
            <Polygon
              key={`ring-${i}`}
              points={points}
              fill="none"
              stroke={GRID}
              strokeWidth={1}
              opacity={0.9}
            />
          ))}

          {axes.map((axis, i) => (
            <Line
              key={`axis-${i}`}
              x1={axis.from.x}
              y1={axis.from.y}
              x2={axis.to.x}
              y2={axis.to.y}
              stroke={GRID}
              strokeWidth={1}
            />
          ))}

          <Circle
            cx={cx}
            cy={cy}
            r={2.5}
            fill={GRID}
          />

          <Polygon
            points={dataPolygon}
            fill={ACCENT}
            fillOpacity={0.18}
            stroke={ACCENT}
            strokeWidth={2}
            strokeLinejoin="round"
          />

          {dataPoints.map((point, i) => (
            <Circle
              key={`dot-${categories[i]!.id}`}
              cx={point.x}
              cy={point.y}
              r={4.5}
              fill={categories[i]!.color}
              stroke="#0A0F14"
              strokeWidth={1.5}
            />
          ))}

          {labels.map((label, i) => (
            <G key={`label-${categories[i]!.id}`}>
              <SvgText
                x={label.x}
                y={label.y - 6}
                fill={LABEL}
                fontSize={11}
                fontWeight="500"
                textAnchor={label.anchor}
              >
                {label.name}
              </SvgText>
              <SvgText
                x={label.x}
                y={label.y + 10}
                fill={label.color}
                fontSize={13}
                fontWeight="700"
                textAnchor={label.anchor}
              >
                {label.pct}%
              </SvgText>
            </G>
          ))}
        </G>
      </Svg>
    </View>
  );
}
