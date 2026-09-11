import { useMemo } from "react";
import {
  Image,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { resolveMediaUrl } from "@/shared/api/client";
import {
  DraggableReorderList,
  MATCH_ROW_GAP,
  MATCH_ROW_H,
} from "./DraggableReorderList";
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
  const { height: screenH, width: screenW } = useWindowDimensions();
  const imageUri = resolveMediaUrl(question.payload?.imageUrl ?? null);
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

  const listH =
    orderedRights.length * (MATCH_ROW_H + MATCH_ROW_GAP) - MATCH_ROW_GAP;
  // Image takes remaining space but stays capped so 4 rows + bouton restent visibles.
  const imgMax = Math.min(Math.max(screenH * 0.32, 140), 220);
  const longestLeft = lefts.reduce(
    (max, left) => Math.max(max, left.label.trim().length),
    1,
  );
  // ~9px/char + padding ; court pour « 1 », large pour « Protéines ».
  const leftColW = Math.min(
    Math.max(longestLeft * 9 + 12, 40),
    Math.round(screenW * 0.4),
  );

  return (
    <View className="flex-1" style={{ minHeight: 0 }}>
      {imageUri ? (
        <View
          style={{
            flexGrow: 1,
            flexShrink: 1,
            minHeight: 110,
            maxHeight: imgMax,
            marginBottom: 8,
          }}
        >
          <Image
            source={{ uri: imageUri }}
            accessibilityLabel="Illustration numérotée"
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      ) : null}

      <View
        className="flex-row gap-2"
        style={{ height: listH, flexShrink: 0 }}
      >
        <View style={{ width: leftColW, flexShrink: 0 }}>
          {lefts.map((left) => (
            <View
              key={left.id}
              style={{
                height: MATCH_ROW_H,
                marginBottom: MATCH_ROW_GAP,
                justifyContent: "center",
                paddingRight: 4,
              }}
            >
              <Text
                className="text-right text-base font-semibold text-white"
                numberOfLines={2}
              >
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
            hint={null}
            rowHeight={MATCH_ROW_H}
            gap={MATCH_ROW_GAP}
            renderItem={(right) => (
              <Text
                style={{ color: "#FFFFFF", fontSize: 14, lineHeight: 18 }}
                numberOfLines={2}
              >
                {right.label}
              </Text>
            )}
          />
        </View>
      </View>
    </View>
  );
}
