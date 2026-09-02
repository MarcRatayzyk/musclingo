import type { QuizQuestion } from "./types";

export function formatUserAnswer(
  question: QuizQuestion,
  state: {
    selectedAnswerIds: string[];
    orderedAnswerIds: string[];
    matches: Array<{ leftId: string; rightId: string }>;
    textAnswer: string;
  },
): string {
  const answersById = new Map(question.answers.map((a) => [a.id, a]));

  switch (question.type) {
    case "TEXT":
      return state.textAnswer.trim() || "—";
    case "ORDER":
      return (
        state.orderedAnswerIds
          .map((id) => answersById.get(id)?.label)
          .filter(Boolean)
          .join(" → ") || "—"
      );
    case "MATCH": {
      const seen = new Set<string>();
      const pairs: string[] = [];
      for (const m of state.matches) {
        const key = [m.leftId, m.rightId].sort().join(":");
        if (seen.has(key)) continue;
        seen.add(key);
        const left = answersById.get(m.leftId)?.label;
        const right = answersById.get(m.rightId)?.label;
        if (left && right && left !== right) {
          pairs.push(`${left} ↔ ${right}`);
        }
      }
      return pairs.join(" · ") || "—";
    }
    case "MULTI":
      return (
        state.selectedAnswerIds
          .map((id) => answersById.get(id)?.label)
          .filter(Boolean)
          .join(", ") || "—"
      );
    default:
      return (
        answersById.get(state.selectedAnswerIds[0] ?? "")?.label ?? "—"
      );
  }
}

export function formatCorrectAnswer(
  question: QuizQuestion,
  correctAnswerIds: string[],
): string {
  const answersById = new Map(question.answers.map((a) => [a.id, a]));

  switch (question.type) {
    case "ORDER":
      return [...question.answers]
        .sort((a, b) => a.order - b.order)
        .map((a) => a.label)
        .join(" → ");
    case "MATCH": {
      const groups = new Map<string, typeof question.answers>();
      for (const a of question.answers) {
        if (!a.matchKey) continue;
        const g = groups.get(a.matchKey) ?? [];
        g.push(a);
        groups.set(a.matchKey, g);
      }
      return [...groups.values()]
        .map((g) => {
          const sorted = [...g].sort((a, b) => a.order - b.order);
          return sorted.map((a) => a.label).join(" ↔ ");
        })
        .join(" · ");
    }
    case "MULTI":
      return correctAnswerIds
        .map((id) => answersById.get(id)?.label)
        .filter(Boolean)
        .join(", ");
    case "TEXT":
      return correctAnswerIds
        .map((id) => answersById.get(id)?.label)
        .filter(Boolean)
        .join(", ");
    default:
      return correctAnswerIds
        .map((id) => answersById.get(id)?.label)
        .filter(Boolean)
        .join(", ");
  }
}
