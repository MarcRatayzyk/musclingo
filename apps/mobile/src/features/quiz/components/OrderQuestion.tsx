import { useMemo } from "react";
import { Text, View } from "react-native";
import {
  DraggableReorderList,
  MATCH_ROW_GAP,
  MATCH_ROW_H,
} from "./DraggableReorderList";
import type { QuizQuestionAnswer } from "../types";

type OrderQuestionInput = {
  answers: QuizQuestionAnswer[];
};

type Props = {
  orderedIds: string[];
  answersById: Map<string, QuizQuestionAnswer>;
  onReorder: (ids: string[]) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  wrong?: boolean;
  disabled?: boolean;
  onDraggingChange?: (dragging: boolean) => void;
};

export function OrderQuestion({
  orderedIds,
  answersById,
  onReorder,
  onMoveUp,
  onMoveDown,
  wrong = false,
  disabled = false,
  onDraggingChange,
}: Props) {
  const items = useMemo(
    () =>
      orderedIds
        .map((id) => answersById.get(id))
        .filter((a): a is QuizQuestionAnswer => !!a),
    [orderedIds, answersById],
  );

  const handleReorder = (ids: string[]) => {
    if (onReorder) {
      onReorder(ids);
      return;
    }
    const from = orderedIds.findIndex((id, i) => id !== ids[i]);
    if (from < 0) return;
    const to = ids.findIndex((id) => id === orderedIds[from]);
    if (to < 0 || from === to) return;
    if (to < from) {
      for (let i = from; i > to; i -= 1) onMoveUp?.(i);
    } else {
      for (let i = from; i < to; i += 1) onMoveDown?.(i);
    }
  };

  return (
    <View className="mt-1 flex-1" style={{ minHeight: 0 }}>
      <Text className="mb-2 text-sm text-muted">
        Remets les étapes dans le bon ordre
      </Text>
      <DraggableReorderList
        items={items}
        onReorder={handleReorder}
        disabled={disabled}
        wrong={wrong}
        onDraggingChange={onDraggingChange}
        hint={null}
        rowHeight={MATCH_ROW_H}
        gap={MATCH_ROW_GAP}
        renderItem={(answer, index) => (
          <View className="flex-row items-center gap-3">
            <View className="h-6 w-6 items-center justify-center rounded-full bg-elevated">
              <Text className="text-xs font-semibold text-accent">
                {index + 1}
              </Text>
            </View>
            <Text
              className="flex-1 text-[15px] text-white"
              numberOfLines={2}
            >
              {answer.label}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export function shuffleOrderIds(question: OrderQuestionInput): string[] {
  const ids = question.answers.map((a) => a.id);
  const shuffled = [...ids];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (shuffled.every((id, i) => id === ids[i]) && shuffled.length > 1) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}
