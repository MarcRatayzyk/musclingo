import { Pressable, Text, View } from "react-native";
import type { QuizQuestion } from "../types";

type Props = {
  question: QuizQuestion;
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export function MultiChoiceQuestion({
  question,
  selectedIds,
  onToggle,
}: Props) {
  return (
    <View className="mt-2">
      <Text className="text-sm text-muted">Plusieurs réponses possibles</Text>
      <View className="mt-4 gap-3">
        {question.answers.map((answer) => {
          const isSelected = selectedIds.includes(answer.id);
          return (
            <Pressable
              key={answer.id}
              onPress={() => onToggle(answer.id)}
              className={`flex-row items-center gap-3 rounded-2xl border px-4 py-4 ${
                isSelected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface"
              }`}
            >
              <View
                className={`h-5 w-5 items-center justify-center rounded border ${
                  isSelected ? "border-accent bg-accent" : "border-muted"
                }`}
              >
                {isSelected ? (
                  <Text className="text-xs font-bold text-black">✓</Text>
                ) : null}
              </View>
              <Text className="flex-1 text-base text-white">{answer.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
