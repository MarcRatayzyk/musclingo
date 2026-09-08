import { AVAILABLE_PATH_SLUGS, PATH_OPTIONS } from "./content";
import type { MotivationId, OnboardingAnswers, PathSlug } from "./types";

const MOTIVATION_WEIGHTS: Record<MotivationId, Partial<Record<PathSlug, number>>> = {
  understand_training: { programmation: 3, anatomie: 2, biomecanique: 1 },
  build_workouts: { programmation: 4, anatomie: 1, biomecanique: 1 },
  nutrition: { nutrition: 5, recuperation: 1 },
  anatomy: { anatomie: 5, biomecanique: 2 },
  progress: { programmation: 3, biomecanique: 2, anatomie: 1 },
  autonomy: { anatomie: 3, programmation: 2, biomecanique: 1 },
};

const LEVEL_BIAS: Record<
  NonNullable<OnboardingAnswers["level"]>,
  Partial<Record<PathSlug, number>>
> = {
  beginner: { anatomie: 2, nutrition: 1 },
  basics: { anatomie: 1, programmation: 1 },
  regular: { programmation: 1, biomecanique: 1 },
  advanced: { biomecanique: 2, programmation: 1 },
};

export function recommendPath(answers: OnboardingAnswers): PathSlug {
  const scores: Record<PathSlug, number> = {
    anatomie: 1,
    nutrition: 0,
    programmation: 0,
    biomecanique: 0,
    recuperation: 0,
  };

  for (const motivation of answers.motivations) {
    const weights = MOTIVATION_WEIGHTS[motivation];
    for (const [slug, weight] of Object.entries(weights) as Array<
      [PathSlug, number]
    >) {
      scores[slug] += weight;
    }
  }

  if (answers.level) {
    const bias = LEVEL_BIAS[answers.level];
    for (const [slug, weight] of Object.entries(bias) as Array<
      [PathSlug, number]
    >) {
      scores[slug] += weight;
    }
  }

  let best: PathSlug = "anatomie";
  let bestScore = -1;
  for (const slug of AVAILABLE_PATH_SLUGS) {
    const score = scores[slug];
    if (score > bestScore) {
      best = slug;
      bestScore = score;
    }
  }
  return best;
}

export function pathLabel(slug: PathSlug): string {
  return PATH_OPTIONS.find((p) => p.slug === slug)?.label ?? slug;
}
