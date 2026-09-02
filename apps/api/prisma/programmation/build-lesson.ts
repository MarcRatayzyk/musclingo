import type { Difficulty } from "@prisma/client";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";
import type { ProgrammationSeedLesson } from "./types";

type Checkpoint = {
  checkpointKey: string;
  checkpointTitle: string;
  checkpointOrder: number;
};

type QuizDef = {
  q1: [string, string, string[], string];
  q2: [string, string, string[], string];
  q3: [string, string, string[], string];
  blank: [string, string, string[], string];
  tf1: [string, boolean, string];
  tf2: [string, boolean, string];
};

const XP: Record<Difficulty, number> = {
  BEGINNER: 25,
  INTERMEDIATE: 30,
  ADVANCED: 35,
};

export function buildLesson(
  title: string,
  subtitle: string,
  paragraphs: string[],
  tags: string[],
  cp: Checkpoint,
  quiz: QuizDef,
  difficulty: Difficulty = "BEGINNER",
  durationSec = 80,
): ProgrammationSeedLesson {
  const markdown = paragraphs
    .map((p, i) => (i === 0 ? p : `---\n\n${p}`))
    .join("\n\n");

  return {
    title,
    subtitle,
    markdown,
    durationSec,
    difficulty,
    order: 0,
    xpReward: XP[difficulty],
    tags,
    ...cp,
    questions: quiz6(
      qcm(...quiz.q1),
      qcm(...quiz.q2),
      qcm(...quiz.q3),
      fillBlank(...quiz.blank),
      tf(...quiz.tf1),
      tf(...quiz.tf2),
    ),
  };
}
