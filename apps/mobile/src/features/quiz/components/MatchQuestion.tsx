import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import type { QuizQuestion, QuizQuestionAnswer } from "../types";

type Props = {
  question: QuizQuestion;
  matches: Array<{ leftId: string; rightId: string }>;
  selectedLeftId: string | null;
  onSelectLeft: (id: string) => void;
  onSelectRight: (id: string) => void;
};

function splitMatchColumns(answers: QuizQuestionAnswer[]) {
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

  const shuffledRights = [...rights].sort((a, b) => a.label.localeCompare(b.label));
  return { lefts, rights: shuffledRights };
}

export function MatchQuestion({
  question,
  matches,
  selectedLeftId,
  onSelectLeft,
  onSelectRight,
}: Props) {
  const { lefts, rights } = useMemo(
    () => splitMatchColumns(question.answers),
    [question.answers],
  );

  const matchedRightForLeft = (leftId: string) =>
    matches.find((m) => m.leftId === leftId)?.rightId ?? null;

  const matchedLeftForRight = (rightId: string) =>
    matches.find((m) => m.rightId === rightId)?.leftId ?? null;

  return (
    <View className="mt-2">
      <Text className="text-sm text-muted">
        Associe chaque élément de gauche à droite
      </Text>
      <View className="mt-4 flex-row gap-3">
        <View className="flex-1 gap-2">
          {lefts.map((left) => {
            const linked = matchedRightForLeft(left.id);
            const isActive = selectedLeftId === left.id;
            return (
              <Pressable
                key={left.id}
                onPress={() => onSelectLeft(left.id)}
                className={`rounded-xl border px-3 py-3 ${
                  isActive
                    ? "border-accent bg-accent/10"
                    : linked
                      ? "border-green-500/50 bg-green-500/10"
                      : "border-border bg-surface"
                }`}
              >
                <Text className="text-sm text-white">{left.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <View className="flex-1 gap-2">
          {rights.map((right) => {
            const linked = matchedLeftForRight(right.id);
            return (
              <Pressable
                key={right.id}
                onPress={() => onSelectRight(right.id)}
                className={`rounded-xl border px-3 py-3 ${
                  linked
                    ? "border-green-500/50 bg-green-500/10"
                    : "border-border bg-surface"
                }`}
              >
                <Text className="text-sm text-white">{right.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export function addBidirectionalMatch(
  matches: Array<{ leftId: string; rightId: string }>,
  leftId: string,
  rightId: string,
): Array<{ leftId: string; rightId: string }> {
  const filtered = matches.filter(
    (m) => m.leftId !== leftId && m.rightId !== rightId && m.leftId !== rightId && m.rightId !== leftId,
  );
  return [
    ...filtered,
    { leftId, rightId },
    { leftId: rightId, rightId: leftId },
  ];
}
