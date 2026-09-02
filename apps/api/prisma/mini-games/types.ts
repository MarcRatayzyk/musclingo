import type { SeedQuestion } from "../anatomie-quiz-helpers";

/**
 * Question dédiée au mini-jeu. `checkpointKey` sert à ne tirer que les thèmes
 * déjà abordés par le joueur.
 */
export type MiniGameQuestionSeed = SeedQuestion & {
  checkpointKey?: string;
  /** Tags thématiques (ex. humerus, avant-bras) pour le quiz de fin de leçon. */
  themeTags?: string[];
};

export function tagged(
  checkpointKey: string,
  questions: SeedQuestion[],
): MiniGameQuestionSeed[] {
  return questions.map((q) => ({ ...q, checkpointKey }));
}

export function themed(
  checkpointKey: string,
  themeTags: string[],
  questions: SeedQuestion[],
): MiniGameQuestionSeed[] {
  return questions.map((q) => ({ ...q, checkpointKey, themeTags }));
}
