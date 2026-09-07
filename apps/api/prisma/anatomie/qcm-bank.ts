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

/**
 * Remplace 4 QCM par des types diversifiés (TF / MULTI / ORDER),
 * placés en tête de banque. Conserve 21 QCM.
 */
export function diversifyBank(
  bank: SeedQuestion[],
  extras: SeedQuestion[],
): SeedQuestion[] {
  if (bank.length !== 25) {
    throw new Error(`diversifyBank attend une banque de 25, reçu ${bank.length}`);
  }
  if (extras.length !== 4) {
    throw new Error(`diversifyBank attend 4 extras, reçu ${extras.length}`);
  }
  return [...extras, ...bank.slice(0, 21)];
}

