import { useMemo } from "react";
import {
  Image,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { resolveMediaUrl } from "@/shared/api/client";
import { DraggableReorderList } from "./DraggableReorderList";
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

  return (
    <View className="mt-2">
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

      <View className="mt-4 flex-row gap-3">
        <View className="w-9 justify-start pt-0">
          {lefts.map((left) => (
            <View
              key={left.id}
              style={{ height: 54, marginBottom: 10, justifyContent: "center" }}
            >
              <Text className="text-center text-xl font-semibold text-white">
                {left.label}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-1">
          <DraggableReorderList
            items={orderedRights}
            onReorder={onReorder}
            disabled={disabled}
            wrong={wrong}
            onDraggingChange={onDraggingChange}
            hint="Maintiens une réponse puis glisse-la face au bon numéro"
            renderItem={(right) => (
              <Text style={{ color: "#FFFFFF", fontSize: 15, lineHeight: 20 }}>
                {right.label}
              </Text>
            )}
          />
        </View>
      </View>
    </View>
  );
}
