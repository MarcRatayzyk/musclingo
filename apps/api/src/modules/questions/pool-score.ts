export type PoolAnswerType =
  | "SINGLE"
  | "TRUE_FALSE"
  | "MULTI"
  | "ORDER"
  | "MATCH";

/** Canonical key for MULTI (sorted) / ORDER & MATCH (sequence). */
export function joinedAnswerKey(ids: string[]): string {
  return ids.join("|");
}

export function isPoolAnswerCorrect(
  type: PoolAnswerType,
  selectedAnswerIds: string[],
  correctChoiceId: string,
): boolean {
  if (type === "MULTI") {
    const selected = [...selectedAnswerIds].sort().join("|");
    return selected.length > 0 && selected === correctChoiceId;
  }
  if (type === "ORDER" || type === "MATCH") {
    return (
      selectedAnswerIds.length > 0 &&
      joinedAnswerKey(selectedAnswerIds) === correctChoiceId
    );
  }
  return (
    selectedAnswerIds.length === 1 &&
    selectedAnswerIds[0] === correctChoiceId
  );
}
