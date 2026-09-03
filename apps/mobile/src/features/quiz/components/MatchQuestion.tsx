import { useMemo, useRef, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
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
  matches: Array<{ leftId: string; rightId: string }>;
  onAssign: (leftId: string, rightId: string) => void;
  onUnassign: (leftId: string) => void;
  wrong?: boolean;
  disabled?: boolean;
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
  const shuffledRights = [...rights].sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  return { lefts, rights: shuffledRights };
}

export function rightIdsInLeftOrder(
  lefts: QuizQuestionAnswer[],
  matches: Array<{ leftId: string; rightId: string }>,
): string[] {
  return lefts
    .map((left) => matches.find((m) => m.leftId === left.id)?.rightId)
    .filter((id): id is string => !!id);
}

export function addBidirectionalMatch(
  matches: Array<{ leftId: string; rightId: string }>,
  leftId: string,
  rightId: string,
): Array<{ leftId: string; rightId: string }> {
  const filtered = matches.filter(
    (m) =>
      m.leftId !== leftId &&
      m.rightId !== rightId &&
      m.leftId !== rightId &&
      m.rightId !== leftId,
  );
  return [
    ...filtered,
    { leftId, rightId },
    { leftId: rightId, rightId: leftId },
  ];
}

export function removeMatchForLeft(
  matches: Array<{ leftId: string; rightId: string }>,
  leftId: string,
): Array<{ leftId: string; rightId: string }> {
  const rightId = matches.find((m) => m.leftId === leftId)?.rightId;
  if (!rightId) return matches;
  return matches.filter(
    (m) =>
      !(
        (m.leftId === leftId && m.rightId === rightId) ||
        (m.leftId === rightId && m.rightId === leftId)
      ),
  );
}

type SlotBox = {
  leftId: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

function DraggableChip({
  right,
  disabled,
  onDropAt,
}: {
  right: QuizQuestionAnswer;
  disabled?: boolean;
  onDropAt: (rightId: string, absoluteX: number, absoluteY: number) => void;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const z = useSharedValue(1);

  const finishDrag = (absoluteX: number, absoluteY: number) => {
    onDropAt(right.id, absoluteX, absoluteY);
  };

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .onBegin(() => {
      z.value = 20;
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      runOnJS(finishDrag)(e.absoluteX, e.absoluteY);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      z.value = 1;
    })
    .onFinalize(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      z.value = 1;
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    zIndex: z.value,
  }));

  if (Platform.OS === "web") {
    const webProps = {
      draggable: !disabled,
      onDragStart: (e: {
        dataTransfer?: { setData: (k: string, v: string) => void };
      }) => {
        e.dataTransfer?.setData("text/plain", right.id);
      },
    };
    return (
      <View
        {...(webProps as object)}
        className="rounded-xl border border-border bg-surface px-3 py-3"
        style={{ cursor: disabled ? "default" : "grab" } as never}
      >
        <Text className="text-sm text-white">{right.label}</Text>
      </View>
    );
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        className="rounded-xl border border-border bg-surface px-3 py-3"
        style={style}
      >
        <Text className="text-sm text-white">{right.label}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export function MatchQuestion({
  question,
  matches,
  onAssign,
  onUnassign,
  wrong = false,
  disabled = false,
}: Props) {
  const { width: screenW } = useWindowDimensions();
  const imageUri = resolveMediaUrl(question.payload?.imageUrl ?? null);
  const imgW = screenW - 48;
  const { lefts, rights } = useMemo(
    () => splitMatchColumns(question.answers),
    [question.answers],
  );
  const [hoverLeftId, setHoverLeftId] = useState<string | null>(null);
  const slotLayouts = useRef<SlotBox[]>([]);
  const slotNodes = useRef<Record<string, View | null>>({});

  const matchedRightForLeft = (leftId: string) =>
    matches.find((m) => m.leftId === leftId)?.rightId ?? null;

  const matchedLeftForRight = (rightId: string) =>
    matches.find((m) => m.rightId === rightId)?.leftId ?? null;

  const labelForId = (id: string) =>
    question.answers.find((a) => a.id === id)?.label ?? "";

  const availableRights = rights.filter((r) => !matchedLeftForRight(r.id));

  const refreshSlots = () => {
    Object.entries(slotNodes.current).forEach(([leftId, node]) => {
      node?.measureInWindow((x, y, width, height) => {
        slotLayouts.current = [
          ...slotLayouts.current.filter((s) => s.leftId !== leftId),
          { leftId, x, y, width, height },
        ];
      });
    });
  };

  const assignFromPoint = (
    rightId: string,
    absoluteX: number,
    absoluteY: number,
  ) => {
    if (disabled) return;
    refreshSlots();
    // measureInWindow is async; use last known layouts and also schedule a re-check
    const hit = slotLayouts.current.find(
      (slot) =>
        absoluteX >= slot.x &&
        absoluteX <= slot.x + slot.width &&
        absoluteY >= slot.y &&
        absoluteY <= slot.y + slot.height,
    );
    if (hit) {
      onAssign(hit.leftId, rightId);
      return;
    }
    // Fallback: measure now then assign
    let remaining = Object.keys(slotNodes.current).length;
    Object.entries(slotNodes.current).forEach(([leftId, node]) => {
      node?.measureInWindow((x, y, width, height) => {
        remaining -= 1;
        if (
          absoluteX >= x &&
          absoluteX <= x + width &&
          absoluteY >= y &&
          absoluteY <= y + height
        ) {
          onAssign(leftId, rightId);
          remaining = -1;
        }
      });
    });
  };

  return (
    <View className="mt-2" onLayout={refreshSlots}>
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
      <Text className="mt-3 text-sm text-muted">
        Glisse chaque os sur le bon numéro. Touche un numéro pour retirer.
      </Text>
      <View className="mt-4 flex-row gap-3">
        <View className="w-[48%] gap-2">
          {lefts.map((left) => {
            const linked = matchedRightForLeft(left.id);
            const placedLabel = linked ? labelForId(linked) : null;
            const webDropProps =
              Platform.OS === "web"
                ? {
                    onDragOver: (e: { preventDefault: () => void }) => {
                      e.preventDefault();
                      setHoverLeftId(left.id);
                    },
                    onDragLeave: () =>
                      setHoverLeftId((id) => (id === left.id ? null : id)),
                    onDrop: (e: {
                      preventDefault: () => void;
                      dataTransfer?: { getData: (k: string) => string };
                    }) => {
                      e.preventDefault();
                      setHoverLeftId(null);
                      const rightId = e.dataTransfer?.getData("text/plain");
                      if (rightId) onAssign(left.id, rightId);
                    },
                  }
                : {};
            return (
              <View
                key={left.id}
                ref={(node) => {
                  slotNodes.current[left.id] = node;
                }}
                onLayout={refreshSlots}
                {...(webDropProps as object)}
              >
                <Pressable
                  disabled={disabled}
                  onPress={() => {
                    if (disabled || !linked) return;
                    onUnassign(left.id);
                  }}
                  className={`min-h-[48px] justify-center rounded-xl border px-3 py-3 ${
                    wrong && linked
                      ? "border-red-500 bg-red-500/10"
                      : hoverLeftId === left.id
                        ? "border-accent bg-accent/10"
                        : linked
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-dashed border-border bg-surface/60"
                  }`}
                >
                  <Text className="text-base font-semibold text-white">
                    {left.label}
                    {placedLabel ? (
                      <Text className="font-normal text-white">
                        {"  "}
                        {placedLabel}
                      </Text>
                    ) : (
                      <Text className="font-normal text-muted">{"  "}…</Text>
                    )}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
        <View className="flex-1 gap-2">
          {availableRights.map((right) => (
            <DraggableChip
              key={right.id}
              right={right}
              disabled={disabled}
              onDropAt={assignFromPoint}
            />
          ))}
          {availableRights.length === 0 ? (
            <Text className="px-1 text-xs text-muted">
              Tous les os sont placés.
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
