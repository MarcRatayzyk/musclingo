import { Pressable, Text, View } from "react-native";
import type { QuizQuestion } from "../types";

type Props = {
  question: QuizQuestion;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function SingleChoiceQuestion({ question, selectedId, onSelect }: Props) {
  return (
    <View className="mt-6 gap-3">
      {question.answers.map((answer) => {
        const isSelected = selectedId === answer.id;
        return (
          <Pressable
            key={answer.id}
            onPress={() => onSelect(answer.id)}
            className={`rounded-2xl border px-4 py-4 ${
              isSelected
                ? "border-accent bg-accent/10"
                : "border-border bg-surface"
            }`}
          >
            <Text className="text-base text-white">{answer.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
