import type { ReactElement } from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import type { MotivationId, PathSlug } from "../types";

type IconProps = {
  size?: number;
  color?: string;
};

export function CheckIcon({ size = 14, color = "#0A0F14" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12.5L10 17.5L19 7"
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BackChevronIcon({ size = 18, color = "#8A96A6" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 5L8 12L15 19"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({ size = 14, color = "#8A96A6" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M8 11V8a4 4 0 018 0v3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ClockIcon({ size = 16, color = "#8A96A6" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth={2} />
      <Path
        d="M12 8v4.5L15 14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BulbIcon({ size = 22, color = "#7CFFB2" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18h6M10 21h4M8.5 14.5C7 13.2 6 11.5 6 9.5a6 6 0 0112 0c0 2-1 3.7-2.5 5H8.5z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function DumbbellIcon({ size = 22, color = "#D4894A" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function LeafIcon({ size = 22, color = "#7CFFB2" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M9 15c2-2 4.5-4 8-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function BoneIcon({ size = 22, color = "#8BB4FF" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.5 8.5a2.5 2.5 0 11-3.5-3.5 2.5 2.5 0 013.5 3.5zm0 0L16.5 17.5m0 0a2.5 2.5 0 103.5 3.5 2.5 2.5 0 00-3.5-3.5zm0 0a2.5 2.5 0 103.5-3.5 2.5 2.5 0 00-3.5 3.5zM7.5 8.5a2.5 2.5 0 10-3.5 3.5 2.5 2.5 0 003.5-3.5z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ChartIcon({ size = 22, color = "#D4894A" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 19h16M7 16V10M12 16V7M17 16v-5"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function CompassIcon({ size = 22, color = "#7CFFB2" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth={2} />
      <Path
        d="M14.8 9.2l-1.6 4.8-4.8 1.6 1.6-4.8 4.8-1.6z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BrainIcon({ size = 22, color = "#D4894A" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 4a3 3 0 00-3 3v1a3 3 0 00-1 5.8V16a3 3 0 003 3h1M15 4a3 3 0 013 3v1a3 3 0 011 5.8V16a3 3 0 01-3 3h-1M9 8h6M9 12h6M10 19v-3M14 19v-3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function MoonIcon({ size = 22, color = "#8BB4FF" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 14.5A7.5 7.5 0 119.5 5 6 6 0 0019 14.5z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const MOTIVATION_ICONS: Record<
  MotivationId,
  (props: IconProps) => ReactElement
> = {
  understand_training: BulbIcon,
  build_workouts: DumbbellIcon,
  nutrition: LeafIcon,
  anatomy: BoneIcon,
  progress: ChartIcon,
  autonomy: CompassIcon,
};

const PATH_ICONS: Record<PathSlug, (props: IconProps) => ReactElement> = {
  anatomie: BoneIcon,
  nutrition: LeafIcon,
  programmation: DumbbellIcon,
  biomecanique: BrainIcon,
  recuperation: MoonIcon,
};

export function MotivationGlyph({
  id,
  size = 22,
  color,
}: {
  id: MotivationId;
  size?: number;
  color?: string;
}) {
  const Icon = MOTIVATION_ICONS[id];
  return <Icon size={size} color={color} />;
}

export function PathGlyph({
  slug,
  size = 22,
  color,
}: {
  slug: PathSlug;
  size?: number;
  color?: string;
}) {
  const Icon = PATH_ICONS[slug];
  return <Icon size={size} color={color} />;
}
