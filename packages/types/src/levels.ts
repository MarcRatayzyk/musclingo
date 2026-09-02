/** Quiz de fin de leçon chronométré */
export const LESSON_QUIZ_QUESTION_COUNT = 10;
/** Durée totale du quiz (10 questions). */
export const LESSON_QUIZ_TOTAL_TIME_SEC = 60;
/** @deprecated Alias historique — préférer LESSON_QUIZ_TOTAL_TIME_SEC */
export const LESSON_QUIZ_QUESTION_TIME_SEC = LESSON_QUIZ_TOTAL_TIME_SEC;
export const LESSON_QUIZ_WRONG_PENALTY_SEC = 1;
export const LESSON_QUIZ_STAR_THRESHOLDS_SEC = {
  three: 45,
  two: 52.5,
  one: 60,
} as const;
export const LESSON_QUIZ_SESSION_TTL_MIN = 30;

/** Minimum quiz score (0–1) required to unlock the next lesson on a category path. */
export const QUIZ_PASS_THRESHOLD = 0.7;

/** Étoiles globales selon le temps total du quiz (en secondes). */
export function computeLessonQuizStars(totalTimeSec: number): 0 | 1 | 2 | 3 {
  if (totalTimeSec <= 0) return 0;
  if (totalTimeSec <= LESSON_QUIZ_STAR_THRESHOLDS_SEC.three) return 3;
  if (totalTimeSec <= LESSON_QUIZ_STAR_THRESHOLDS_SEC.two) return 2;
  if (totalTimeSec <= LESSON_QUIZ_STAR_THRESHOLDS_SEC.one) return 1;
  return 0;
}

export function isLessonQuizPassed(stars: number): boolean {
  return stars >= 1;
}

/** XP proportionnel aux étoiles (1★=60 %, 2★=80 %, 3★=100 %). */
export function getLessonQuizXpMultiplier(stars: number): number {
  if (stars >= 3) return 1;
  if (stars === 2) return 0.8;
  if (stars === 1) return 0.6;
  return 0;
}

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
