import {
  qcm,
  type SeedQuestion,
} from "../anatomie-quiz-helpers";

/** Répartition non cyclique des bonnes réponses (A=0 … D=3). */
export const CORRECT_SLOT: Array<0 | 1 | 2 | 3> = [
  0, 2, 1, 3, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 1, 3, 0, 2,
];

export type QcmItem = [
  prompt: string,
  correct: string,
  wrong: [string, string, string],
  explanation: string,
];

/** Banque de exactement 20 questions pour une leçon Nutrition. */
export function quiz20(...questions: SeedQuestion[]): SeedQuestion[] {
  if (questions.length !== 20) {
    throw new Error(`quiz20 attend 20 questions, reçu ${questions.length}`);
  }
  return questions;
}

/** Construit n QCM avec slots de réponse correcte rotatifs. */
export function qcmN(items: QcmItem[], offset = 0): SeedQuestion[] {
  return items.map(([prompt, correct, wrong, explanation], i) =>
    qcm(
      prompt,
      correct,
      wrong,
      explanation,
      CORRECT_SLOT[(i + offset) % CORRECT_SLOT.length]!,
    ),
  );
}
