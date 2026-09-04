import type { QuestionType } from "@muscle-mind/types";

export type QuizQuestionAnswer = {
  id: string;
  label: string;
  order: number;
  matchKey?: string | null;
};

export type QuizQuestionPayload = {
  imageUrl?: string;
  color?: string;
  regions?: Array<{
    order: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
};

export type QuizQuestion = {
  id: string;
  type: QuestionType;
  prompt: string;
  order: number;
  payload?: QuizQuestionPayload | null;
  answers: QuizQuestionAnswer[];
};

export type QuizAnswerState = {
  selectedAnswerIds: string[];
  orderedAnswerIds: string[];
  matches: Array<{ leftId: string; rightId: string }>;
  textAnswer: string;
};

export const emptyAnswerState = (): QuizAnswerState => ({
  selectedAnswerIds: [],
  orderedAnswerIds: [],
  matches: [],
  textAnswer: "",
});

export function isQuestionAnswered(
  question: QuizQuestion,
  state: QuizAnswerState,
): boolean {
  switch (question.type) {
    case "TEXT":
      return state.textAnswer.trim().length > 0;
    case "MULTI":
      return state.selectedAnswerIds.length > 0;
    case "ORDER":
      return state.orderedAnswerIds.length === question.answers.length;
    case "MATCH": {
      const pairCount = new Set(
        question.answers.map((a) => a.matchKey).filter(Boolean),
      ).size;
      return state.orderedAnswerIds.length === pairCount;
    }
    case "SINGLE":
    case "TRUE_FALSE":
    case "HOTSPOT":
      return state.selectedAnswerIds.length === 1;
    default:
      return false;
  }
}

export function buildSubmitPayload(
  question: QuizQuestion,
  state: QuizAnswerState,
) {
  if (question.type === "TEXT") {
    return {
      questionId: question.id,
      selectedAnswerIds: [] as string[],
      textAnswer: state.textAnswer.trim(),
    };
  }
  if (question.type === "ORDER") {
    return {
      questionId: question.id,
      selectedAnswerIds: [] as string[],
      orderedAnswerIds: state.orderedAnswerIds,
    };
  }
  if (question.type === "MATCH") {
    return {
      questionId: question.id,
      selectedAnswerIds: state.orderedAnswerIds,
    };
  }
  return {
    questionId: question.id,
    selectedAnswerIds: state.selectedAnswerIds,
  };
}
