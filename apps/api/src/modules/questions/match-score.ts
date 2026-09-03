type MatchAnswer = {
  id: string;
  matchKey?: string | null;
  order: number;
};

export function withPairedMatchKeys<T extends MatchAnswer>(answers: T[]): T[] {
  if (answers.some((a) => a.matchKey)) return answers;
  const sorted = [...answers].sort((a, b) => a.order - b.order);
  return sorted.map((answer, index) => ({
    ...answer,
    matchKey: `pair-${Math.floor(index / 2)}`,
  }));
}

export function matchRightIdsInLeftOrder(answers: MatchAnswer[]): string[] {
  const paired = withPairedMatchKeys(answers);
  const groups = new Map<string, MatchAnswer[]>();
  for (const answer of paired) {
    if (!answer.matchKey) continue;
    const group = groups.get(answer.matchKey) ?? [];
    group.push(answer);
    groups.set(answer.matchKey, group);
  }

  const pairs: Array<{ order: number; rightId: string }> = [];
  for (const group of groups.values()) {
    const sorted = [...group].sort((a, b) => a.order - b.order);
    const left = sorted[0];
    const right = sorted[1];
    if (!left || !right) continue;
    pairs.push({ order: left.order, rightId: right.id });
  }

  return pairs.sort((a, b) => a.order - b.order).map((p) => p.rightId);
}

export function isMatchSelectionCorrect(
  answers: MatchAnswer[],
  selectedRightIds: string[],
): boolean {
  const expected = matchRightIdsInLeftOrder(answers);
  return (
    selectedRightIds.length === expected.length &&
    expected.length > 0 &&
    selectedRightIds.every((id, i) => id === expected[i])
  );
}
