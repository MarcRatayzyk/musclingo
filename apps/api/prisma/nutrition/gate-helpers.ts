import type { SeedQuestion } from "../anatomie-quiz-helpers";

export function gate20(
  q1: SeedQuestion,
  q2: SeedQuestion,
  q3: SeedQuestion,
  q4: SeedQuestion,
  q5: SeedQuestion,
  q6: SeedQuestion,
  q7: SeedQuestion,
  q8: SeedQuestion,
  q9: SeedQuestion,
  q10: SeedQuestion,
  q11: SeedQuestion,
  q12: SeedQuestion,
  q13: SeedQuestion,
  q14: SeedQuestion,
  q15: SeedQuestion,
  q16: SeedQuestion,
  q17: SeedQuestion,
  q18: SeedQuestion,
  q19: SeedQuestion,
  q20: SeedQuestion,
): SeedQuestion[] {
  return [
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    q11,
    q12,
    q13,
    q14,
    q15,
    q16,
    q17,
    q18,
    q19,
    q20,
  ];
}

/** QCM / questions réparties sur les leçons du thème (round-robin, prompts uniques). */
export function condenseThemeToGateN(
  banks: SeedQuestion[][],
  count: number,
): SeedQuestion[] {
  const seen = new Set<string>();
  const picked: SeedQuestion[] = [];
  let round = 0;
  while (picked.length < count) {
    let added = false;
    for (const bank of banks) {
      const q = bank[round];
      if (!q) continue;
      const key = q.prompt.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      picked.push(q);
      added = true;
      if (picked.length === count) break;
    }
    if (!added) {
      throw new Error(
        `Impossible de composer ${count} questions de checkpoint (obtenu ${picked.length})`,
      );
    }
    round += 1;
  }
  return picked;
}

export function condenseThemeToGate20(banks: SeedQuestion[][]): SeedQuestion[] {
  return condenseThemeToGateN(banks, 20);
}
