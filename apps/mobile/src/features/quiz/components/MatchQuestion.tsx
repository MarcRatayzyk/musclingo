import { useEffect, useMemo, useRef } from "react";
import {
  Image,
  Platform,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { resolveMediaUrl } from "@/shared/api/client";
import type { QuizQuestion, QuizQuestionAnswer } from "../types";

type Props = {
  question: QuizQuestion;
  orderedRightIds: string[];
  onReorder: (ids: string[]) => void;
  wrong?: boolean;
  disabled?: boolean;
  onDraggingChange?: (dragging: boolean) => void;
};

export function splitMatchColumns(answers: QuizQuestionAnswer[]) {
  const groups = new Map<string, QuizQuestionAnswer[]>();
  for (const a of answers) {
    if (!a.matchKey) continue;
    const g = groups.get(a.matchKey) ?? [];
    g.push(a);
    groups.set(a.matchKey, g);
  }

  const lefts: QuizQuestionAnswer[] = [];
  const rights: QuizQuestionAnswer[] = [];
  for (const group of groups.values()) {
    const sorted = [...group].sort((a, b) => a.order - b.order);
    if (sorted[0]) lefts.push(sorted[0]);
    if (sorted[1]) rights.push(sorted[1]);
  }

  lefts.sort((a, b) => a.order - b.order);
  // Ordre volontairement incorrect (alphabétique ≠ ordre des numéros)
  const shuffledRights = [...rights].sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  return { lefts, rights: shuffledRights };
}

export function rightIdsInLeftOrder(
  _lefts: QuizQuestionAnswer[],
  orderedRightIds: string[],
): string[] {
  return orderedRightIds;
}

export function initialOrderedRightIds(answers: QuizQuestionAnswer[]): string[] {
  return splitMatchColumns(answers).rights.map((r) => r.id);
}

type RowBox = {
  index: number;
  y: number;
  height: number;
};

function DraggableReorderChip({
  right,
  index,
  disabled,
  wrong,
  getRowLayouts,
  onMoveToIndex,
  onDraggingChange,
}: {
  right: QuizQuestionAnswer;
  index: number;
  disabled?: boolean;
  wrong?: boolean;
  getRowLayouts: () => RowBox[];
  onMoveToIndex: (from: number, to: number) => void;
  onDraggingChange?: (dragging: boolean) => void;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const z = useSharedValue(1);

  const finishDrag = (absoluteY: number) => {
    const layouts = getRowLayouts();
    if (layouts.length === 0) return;
    let target = index;
    let best = Number.POSITIVE_INFINITY;
    for (const row of layouts) {
      const mid = row.y + row.height / 2;
      const dist = Math.abs(absoluteY - mid);
      if (dist < best) {
        best = dist;
        target = row.index;
      }
    }
    if (target !== index) onMoveToIndex(index, target);
  };

  const setDragging = (value: boolean) => {
    onDraggingChange?.(value);
  };

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .minDistance(4)
    .onBegin(() => {
      z.value = 40;
      scale.value = withSpring(1.04);
      runOnJS(setDragging)(true);
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      runOnJS(finishDrag)(e.absoluteY);
    })
    .onFinalize(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      z.value = 1;
      runOnJS(setDragging)(false);
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    zIndex: z.value,
    elevation: z.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          style,
          {
            minHeight: 48,
            justifyContent: "center",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: wrong ? "#EF4444" : "#2A3344",
            backgroundColor: wrong ? "rgba(239,68,68,0.12)" : "#151A24",
            paddingHorizontal: 12,
            paddingVertical: 12,
          },
          Platform.OS === "web"
            ? ({
                cursor: disabled ? "default" : "grab",
                touchAction: "none",
                userSelect: "none",
              } as never)
            : null,
        ]}
      >
        <Text
          style={{ color: "#FFFFFF", fontSize: 14 }}
          pointerEvents="none"
        >
          {right.label}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}

export function MatchQuestion({
  question,
  orderedRightIds,
  onReorder,
  wrong = false,
  disabled = false,
  onDraggingChange,
}: Props) {
  const { width: screenW } = useWindowDimensions();
  const imageUri = resolveMediaUrl(question.payload?.imageUrl ?? null);
  const imgW = screenW - 48;
  const { lefts, rights } = useMemo(
    () => splitMatchColumns(question.answers),
    [question.answers],
  );
  const rightsById = useMemo(
    () => new Map(rights.map((r) => [r.id, r])),
    [rights],
  );

  const orderedRights = orderedRightIds
    .map((id) => rightsById.get(id))
    .filter((r): r is QuizQuestionAnswer => !!r);

  const rowNodes = useRef<Record<number, View | null>>({});
  const rowLayouts = useRef<RowBox[]>([]);

  const measureRows = () => {
    Object.entries(rowNodes.current).forEach(([indexStr, node]) => {
      const index = Number(indexStr);
      node?.measureInWindow((_x, y, _w, height) => {
        if (height <= 0) return;
        rowLayouts.current = [
          ...rowLayouts.current.filter((r) => r.index !== index),
          { index, y, height },
        ];
      });
    });
  };

  useEffect(() => {
    measureRows();
  }, [orderedRightIds]);

  const moveToIndex = (from: number, to: number) => {
    if (from === to) return;
    const next = [...orderedRightIds];
    const [item] = next.splice(from, 1);
    if (!item) return;
    next.splice(to, 0, item);
    onReorder(next);
  };

  return (
    <View className="mt-2" onLayout={measureRows}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          accessibilityLabel="Illustration numérotée"
          style={{
            width: imgW,
            height: Math.min(imgW * 1.15, 300),
            marginTop: 8,
            alignSelf: "center",
          }}
          resizeMode="contain"
        />
      ) : null}

      <View className="mt-4 gap-2">
        {lefts.map((left, index) => {
          const right = orderedRights[index];
          return (
            <View
              key={left.id}
              collapsable={false}
              className="flex-row items-center gap-3"
              onLayout={measureRows}
            >
              <Text className="w-8 text-center text-xl font-semibold text-white">
                {left.label}
              </Text>
              <View
                className="flex-1"
                ref={(node) => {
                  rowNodes.current[index] = node;
                }}
              >
                {right ? (
                  <DraggableReorderChip
                    right={right}
                    index={index}
                    disabled={disabled}
                    wrong={wrong}
                    getRowLayouts={() => rowLayouts.current}
                    onMoveToIndex={moveToIndex}
                    onDraggingChange={onDraggingChange}
                  />
                ) : (
                  <View className="min-h-[48px] rounded-xl border border-dashed border-border" />
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
