import { useMemo } from "react";
import { Text, View } from "react-native";
import { DraggableReorderList } from "./DraggableReorderList";
import type { QuizQuestionAnswer } from "../types";

type OrderQuestionInput = {
  answers: QuizQuestionAnswer[];
};

type Props = {
  orderedIds: string[];
  answersById: Map<string, QuizQuestionAnswer>;
  onReorder: (ids: string[]) => void;
  /** @deprecated Prefer onReorder — kept for QuestionBody compat. */
  onMoveUp?: (index: number) => void;
  /** @deprecated Prefer onReorder — kept for QuestionBody compat. */
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
    // Fallback legacy up/down if only those are provided
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
    <View className="mt-2">
      <Text className="text-sm text-muted">
        Remets les étapes dans le bon ordre
      </Text>
      <View className="mt-4">
        <DraggableReorderList
          items={items}
          onReorder={handleReorder}
          disabled={disabled}
          wrong={wrong}
          onDraggingChange={onDraggingChange}
          hint="Maintiens une étape puis glisse-la à sa place"
          renderItem={(answer, index) => (
            <View className="flex-row items-center gap-3">
              <View className="h-7 w-7 items-center justify-center rounded-full bg-elevated">
                <Text className="text-sm font-semibold text-accent">
                  {index + 1}
                </Text>
              </View>
              <Text className="flex-1 text-base text-white">{answer.label}</Text>
            </View>
          )}
        />
      </View>
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
