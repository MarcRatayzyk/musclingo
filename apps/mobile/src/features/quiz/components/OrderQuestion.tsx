import { Pressable, Text, View } from "react-native";
import type { QuizQuestion, QuizQuestionAnswer } from "../types";

type OrderQuestionInput = {
  answers: QuizQuestionAnswer[];
};

type Props = {
  orderedIds: string[];
  answersById: Map<string, QuizQuestionAnswer>;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
};

export function OrderQuestion({
  orderedIds,
  answersById,
  onMoveUp,
  onMoveDown,
}: Props) {
  return (
    <View className="mt-2">
      <Text className="text-sm text-muted">
        Remets les étapes dans le bon ordre
      </Text>
      <View className="mt-4 gap-3">
        {orderedIds.map((id, index) => {
          const answer = answersById.get(id);
          if (!answer) return null;
          return (
            <View
              key={id}
              className="flex-row items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-3"
            >
              <Text className="w-6 text-center text-sm text-muted">
                {index + 1}
              </Text>
              <Text className="flex-1 text-base text-white">{answer.label}</Text>
              <View className="gap-1">
                <Pressable
                  onPress={() => onMoveUp(index)}
                  disabled={index === 0}
                  className={`rounded-lg px-2 py-1 ${index === 0 ? "opacity-30" : "active:opacity-70"}`}
                >
                  <Text className="text-accent">▲</Text>
                </Pressable>
                <Pressable
                  onPress={() => onMoveDown(index)}
                  disabled={index === orderedIds.length - 1}
                  className={`rounded-lg px-2 py-1 ${index === orderedIds.length - 1 ? "opacity-30" : "active:opacity-70"}`}
                >
                  <Text className="text-accent">▼</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
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
