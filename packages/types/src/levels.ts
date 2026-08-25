/** Minimum quiz score (0–1) required to unlock the next lesson on a category path. */
export const QUIZ_PASS_THRESHOLD = 0.7;

/**
 * Score de passage en tenant compte du nombre de questions.
 * Ex. 6 questions × 70 % → 4 bonnes réponses (arrondi) suffisent.
 */
export function isQuizScorePassing(
  score: number,
  totalQuestions: number,
): boolean {
  if (totalQuestions <= 0) return score >= QUIZ_PASS_THRESHOLD;
  const correct = Math.round(score * totalQuestions);
  const needed = Math.max(
    1,
    Math.round(totalQuestions * QUIZ_PASS_THRESHOLD),
  );
  return correct >= needed;
}

/** Minimum checkpoint gate score (0–1), default 90 %. */
export const GATE_PASS_THRESHOLD = 0.9;

export function isGateScorePassing(
  score: number,
  totalQuestions: number,
  passThreshold = GATE_PASS_THRESHOLD,
): boolean {
  if (totalQuestions <= 0) return score >= passThreshold;
  const correct = Math.round(score * totalQuestions);
  const needed = Math.max(1, Math.round(totalQuestions * passThreshold));
  return correct >= needed;
}

/** Cumulative XP thresholds for levels 1..n (index 0 = level 1). */
export const LEVEL_THRESHOLDS = [
  0, 150, 400, 750, 1200, 1800, 2500, 3400, 4500, 5800, 7300, 9000, 11000,
  13500, 16500, 20000, 24000, 28500, 33500, 39000,
] as const;

export function getLevelFromXp(xp: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    const threshold = LEVEL_THRESHOLDS[i];
    if (threshold === undefined || xp < threshold) break;
    level = i + 1;
  }
  return level;
}

export function getXpProgress(xp: number): {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progress: number;
} {
  const level = getLevelFromXp(xp);
  const currentLevelXp = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextLevelXp =
    LEVEL_THRESHOLDS[level] ??
    currentLevelXp + Math.max(500, Math.floor(currentLevelXp * 0.25));
  const span = nextLevelXp - currentLevelXp;
  const progress = span <= 0 ? 1 : Math.min(1, (xp - currentLevelXp) / span);
  return { level, currentLevelXp, nextLevelXp, progress };
}
