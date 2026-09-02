import { Fragment, useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import type { CategoryPath, PathGateNode, PathLessonNode } from "./api";
import { getAnatomyPathIllustrationAtLesson } from "../mascot/anatomy-path-images";
import { getPathIcon } from "./icons";

type Props = {
  path: CategoryPath;
  onPressLesson: (lesson: PathLessonNode) => void;
  onPressGate?: (gate: PathGateNode) => void;
  focusLessonId?: string;
  onLessonLayout?: (lessonId: string, y: number, height: number) => void;
  onUnitLayout?: (checkpointKey: string, y: number) => void;
};

type FlatLesson = PathLessonNode & {
  index: number;
  unitLabel: string;
  unitKey: string;
};

type FlatGate = PathGateNode & {
  index: number;
  unitKey: string;
};

type PathRow =
  | { kind: "lesson"; item: FlatLesson }
  | { kind: "gate"; item: FlatGate };

const NODE_SIZE = 72;
const NODE_PAD = 18;
const ANATOMY_ILL_SIZE = 155;

function sideOffsetForIndex(index: number) {
  if (index % 2 === 0) return 0;
  return index % 4 === 1 ? -72 : 72;
}

function PulseWaves({ color, active }: { color: string; active: boolean }) {
  if (!active) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        width: NODE_SIZE,
        height: NODE_SIZE,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          width: NODE_SIZE + 14,
          height: NODE_SIZE + 14,
          borderRadius: (NODE_SIZE + 14) / 2,
          borderWidth: 2,
          borderColor: color,
          opacity: 0.35,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: NODE_SIZE + 10,
          height: NODE_SIZE + 10,
          borderRadius: (NODE_SIZE + 10) / 2,
          backgroundColor: color,
          opacity: 0.12,
        }}
      />
    </View>
  );
}

function AnatomyIllustration({
  source,
}: {
  source: NonNullable<ReturnType<typeof getAnatomyPathIllustrationAtLesson>>;
}) {
  return (
    <Image
      source={source}
      accessibilityLabel="Illustration du parcours anatomie"
      resizeMode="contain"
      style={{ width: ANATOMY_ILL_SIZE, height: ANATOMY_ILL_SIZE }}
    />
  );
}

function GateNode({
  gate,
  color,
  sideOffset,
  isCurrent,
  onPress,
}: {
  gate: FlatGate;
  color: string;
  index: number;
  sideOffset: number;
  isCurrent: boolean;
  onPress: () => void;
}) {
  const locked = gate.state === "locked";
  const completed = gate.state === "completed";
  const available = gate.state === "available";
  const [pressed, setPressed] = useState(false);

  const nodeBg = completed ? color : available ? "#1C2230" : "#141820";
  const nodeBorder = locked ? "#2A3344" : color;
  const scale = pressed ? 0.9 : isCurrent ? 1.05 : 1;

  return (
    <View style={{ alignItems: "center", marginBottom: -12 }}>
      <View
        style={{
          alignItems: "center",
          transform: [{ translateX: sideOffset }],
        }}
      >
        <Pressable
          disabled={locked}
          onPress={onPress}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={{ alignItems: "center" }}
        >
          <View
            style={{
              width: NODE_SIZE + NODE_PAD,
              height: NODE_SIZE + NODE_PAD,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PulseWaves color={color} active={isCurrent} />

            <View
              style={{
                width: NODE_SIZE,
                height: NODE_SIZE,
                borderRadius: NODE_SIZE / 2,
                borderWidth: 4,
                backgroundColor: nodeBg,
                borderColor: nodeBorder,
                opacity: locked ? 0.55 : 1,
                alignItems: "center",
                justifyContent: "center",
                transform: [{ scale }],
                shadowColor: isCurrent || completed ? color : "transparent",
                shadowOpacity: isCurrent ? 0.55 : completed ? 0.32 : 0,
                shadowRadius: isCurrent ? 16 : 8,
                shadowOffset: { width: 0, height: 0 },
                elevation: isCurrent ? 10 : 0,
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  color: completed
                    ? "#0B0F14"
                    : available
                      ? "#FFFFFF"
                      : "#7A8499",
                }}
              >
                ⚡
              </Text>
            </View>

            {completed && (
              <View
                style={{
                  position: "absolute",
                  right: 8,
                  bottom: 8,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0B0F14",
                  borderWidth: 2,
                  borderColor: color,
                }}
              >
                <Text style={{ color, fontSize: 11, fontWeight: "700" }}>
                  ✓
                </Text>
              </View>
            )}
          </View>

          <View style={{ alignItems: "center", paddingHorizontal: 8 }}>
            <Text
              className={`max-w-[180px] text-center text-sm font-semibold ${
                locked ? "text-muted" : "text-white"
              }`}
            >
              {gate.title}
            </Text>
            <Text className="mt-0.5 text-center text-[11px] text-muted">
              {locked
                ? "Termine le thème"
                : available
                  ? `${gate.questionCount} Q · ${gate.timeLimitSec}s`
                  : "Validé"}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function LessonNode({
  lesson,
  color,
  icon,
  sideOffset,
  isCurrent,
  onPress,
}: {
  lesson: PathLessonNode;
  color: string;
  icon: ReturnType<typeof getPathIcon>;
  index: number;
  sideOffset: number;
  isCurrent: boolean;
  onPress: () => void;
}) {
  const locked = lesson.state === "locked";
  const completed = lesson.state === "completed";
  const available = lesson.state === "available";
  const [pressed, setPressed] = useState(false);

  const nodeBg = completed ? color : available ? "#1C2230" : "#141820";
  const nodeBorder = locked ? "#2A3344" : color;
  const iconTint = completed ? "#0B0F14" : available ? "#FFFFFF" : "#7A8499";
  const scale = pressed ? 0.9 : isCurrent ? 1.05 : 1;

  return (
    <View style={{ alignItems: "center", marginBottom: -12 }}>
      <View
        style={{
          alignItems: "center",
          transform: [{ translateX: sideOffset }],
        }}
      >
        <Pressable
          disabled={locked}
          onPress={onPress}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={{ alignItems: "center" }}
        >
          <View
            style={{
              width: NODE_SIZE + NODE_PAD,
              height: NODE_SIZE + NODE_PAD,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PulseWaves color={color} active={isCurrent} />

            <View
              style={{
                width: NODE_SIZE,
                height: NODE_SIZE,
                borderRadius: NODE_SIZE / 2,
                borderWidth: 4,
                backgroundColor: nodeBg,
                borderColor: nodeBorder,
                opacity: locked ? 0.55 : 1,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                transform: [{ scale }],
                shadowColor: isCurrent || completed ? color : "transparent",
                shadowOpacity: isCurrent ? 0.55 : completed ? 0.32 : 0,
                shadowRadius: isCurrent ? 16 : 8,
                shadowOffset: { width: 0, height: 0 },
                elevation: isCurrent ? 10 : 0,
              }}
            >
              <Image
                source={icon}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                  tintColor: iconTint,
                }}
              />
            </View>

            {completed && lesson.hasQuiz && lesson.bestStars != null && (
              <View
                style={{
                  position: "absolute",
                  right: 4,
                  bottom: 4,
                  flexDirection: "row",
                  gap: 1,
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 8,
                  backgroundColor: "#0B0F14",
                  borderWidth: 2,
                  borderColor: color,
                }}
              >
                {[1, 2, 3].map((n) => (
                  <Text
                    key={n}
                    style={{
                      color,
                      fontSize: 9,
                      opacity: n <= (lesson.bestStars ?? 0) ? 1 : 0.25,
                    }}
                  >
                    ★
                  </Text>
                ))}
              </View>
            )}
            {completed && (!lesson.hasQuiz || lesson.bestStars == null) && (
              <View
                style={{
                  position: "absolute",
                  right: 8,
                  bottom: 8,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0B0F14",
                  borderWidth: 2,
                  borderColor: color,
                }}
              >
                <Text style={{ color, fontSize: 11, fontWeight: "700" }}>
                  ✓
                </Text>
              </View>
            )}
          </View>

          <View style={{ alignItems: "center", paddingHorizontal: 8 }}>
            <Text
              className={`max-w-[180px] text-center text-sm font-semibold ${
                locked ? "text-muted" : "text-white"
              }`}
            >
              {lesson.title}
            </Text>

            {isCurrent ? (
              <Text
                className="mt-0.5 text-center text-[11px] font-medium"
                style={{ color }}
              >
                À toi de jouer
              </Text>
            ) : (
              <Text className="mt-0.5 text-center text-[11px] text-muted">
                {locked ? "Verrouillé" : available ? "Disponible" : "Apprise"}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export function CategoryPathView({
  path,
  onPressLesson,
  onPressGate,
  focusLessonId,
  onLessonLayout,
  onUnitLayout,
}: Props) {
  const icon = getPathIcon(path.slug);
  const [mountKey, setMountKey] = useState(0);

  const progressSignature = useMemo(
    () =>
      path.units
        .flatMap((u) => [
          ...u.lessons.map((l) => `${l.id}:${l.state}`),
          u.gate ? `gate:${u.gate.id}:${u.gate.state}` : "",
        ])
        .join("|"),
    [path],
  );

  useEffect(() => {
    setMountKey((k) => k + 1);
  }, [progressSignature]);

  const rows: PathRow[] = [];
  let rowIndex = 0;
  let lastUnit: string | null = null;

  for (const unit of path.units) {
    for (const lesson of unit.lessons) {
      const showUnitHeader = unit.checkpointKey !== lastUnit;
      if (showUnitHeader) lastUnit = unit.checkpointKey;
      rows.push({
        kind: "lesson",
        item: {
          ...lesson,
          index: rowIndex,
          unitLabel: unit.label,
          unitKey: unit.checkpointKey,
          showUnitHeader,
        } as FlatLesson & { showUnitHeader: boolean },
      });
      rowIndex += 1;
    }
    if (unit.gate) {
      rows.push({
        kind: "gate",
        item: {
          ...unit.gate,
          index: rowIndex,
          unitKey: unit.checkpointKey,
        },
      });
      rowIndex += 1;
    }
  }

  const currentLessonId =
    path.units.flatMap((u) => u.lessons).find((l) => l.state === "available")
      ?.id ?? null;
  const currentGateId = !currentLessonId
    ? path.units.find((u) => u.gate?.state === "available")?.gate?.id ?? null
    : null;

  return (
    <View key={mountKey} className="pb-12">
      {rows.map((row) => {
        const sideOffset = sideOffsetForIndex(row.item.index);

        if (row.kind === "gate") {
          const gate = row.item;
          return (
            <GateNode
              key={`gate-${gate.id}`}
              gate={gate}
              color={path.color}
              index={gate.index}
              sideOffset={sideOffset}
              isCurrent={gate.id === currentGateId}
              onPress={() => onPressGate?.(gate)}
            />
          );
        }

        const lesson = row.item as FlatLesson & { showUnitHeader?: boolean };
        const anatomyIllustration =
          path.slug === "anatomie"
            ? getAnatomyPathIllustrationAtLesson(lesson.unitKey, lesson.order)
            : null;
        const lessonSideOffset = anatomyIllustration ? 0 : sideOffset;
        const illOnLeft = anatomyIllustration != null && sideOffset > 0;

        return (
          <Fragment key={lesson.id}>
            {lesson.showUnitHeader && (
              <View
                style={{ height: lesson.index === 0 ? 2 : 14 }}
                onLayout={(e) => {
                  onUnitLayout?.(lesson.unitKey, e.nativeEvent.layout.y);
                }}
              />
            )}
            <View
              onLayout={(e) => {
                if (!onLessonLayout) return;
                const { y, height } = e.nativeEvent.layout;
                onLessonLayout(lesson.id, y, height);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {anatomyIllustration && illOnLeft ? (
                  <AnatomyIllustration source={anatomyIllustration} />
                ) : null}
                <LessonNode
                  lesson={lesson}
                  color={path.color}
                  icon={icon}
                  index={lesson.index}
                  sideOffset={lessonSideOffset}
                  isCurrent={lesson.id === currentLessonId}
                  onPress={() => onPressLesson(lesson)}
                />
                {anatomyIllustration && !illOnLeft ? (
                  <AnatomyIllustration source={anatomyIllustration} />
                ) : null}
              </View>
            </View>
          </Fragment>
        );
      })}
    </View>
  );
}
