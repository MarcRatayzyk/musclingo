import type { Difficulty } from "@prisma/client";
import type { SeedQuestion } from "../anatomie-quiz-helpers";

export type AnatomieSeedLesson = {
  title: string;
  subtitle: string;
  markdown: string;
  durationSec: number;
  difficulty: Difficulty;
  order: number;
  xpReward: number;
  tags: string[];
  illustrationUrl?: string | null;
  checkpointKey: string;
  checkpointTitle: string;
  checkpointOrder: number;
  questions: SeedQuestion[];
};
