import { qcm, quiz25, type SeedQuestion } from "../anatomie-quiz-helpers";

/** Répartition non cyclique des bonnes réponses (A=0 … D=3). */
export const CORRECT_SLOT: Array<0 | 1 | 2 | 3> = [
  0, 2, 1, 3, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 1, 3, 0, 2, 3, 1, 2, 0, 3,
];

export type QcmItem = [
  prompt: string,
  correct: string,
  wrong: [string, string, string],
  explanation: string,
];

export function bank25(items: QcmItem[]): SeedQuestion[] {
  if (items.length !== 25) {
    throw new Error(`bank25 attend 25 questions, reçu ${items.length}`);
  }
  return quiz25(
    ...items.map(([prompt, correct, wrong, explanation], i) =>
      qcm(prompt, correct, wrong, explanation, CORRECT_SLOT[i]!),
    ),
  );
}
