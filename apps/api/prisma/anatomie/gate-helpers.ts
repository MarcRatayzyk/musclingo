import type { SeedQuestion } from "../anatomie-quiz-helpers";

/** QCM répartis sur les leçons du thème (round-robin, prompts uniques). */
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
