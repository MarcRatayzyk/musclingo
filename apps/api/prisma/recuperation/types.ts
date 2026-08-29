import type { Difficulty } from "@prisma/client";
import type { SeedQuestion } from "../anatomie-quiz-helpers";

export type RecuperationSeedLesson = {
  title: string;
  subtitle: string;
  markdown: string;
  durationSec: number;
  difficulty: Difficulty;
  order: number;
  xpReward: number;
  tags: string[];
  sources?: string[];
  checkpointKey: string;
  checkpointTitle: string;
  checkpointOrder: number;
  questions: SeedQuestion[];
};
