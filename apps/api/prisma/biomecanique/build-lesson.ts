import type { Difficulty } from "@prisma/client";
import {
  qcm,
  fillBlank,
  tf,
  multi,
  order,
  match,
  quiz10,
} from "../anatomie-quiz-helpers";
import type { BiomecaniqueSeedLesson } from "./types";

type Checkpoint = {
  checkpointKey: string;
  checkpointTitle: string;
  checkpointOrder: number;
};

type QcmDef = [string, string, string[], string];
type TfDef = [string, boolean, string];
type MultiDef = [string, string[], string[], string];
type OrderDef = [string, string[], string];
type MatchDef = [string, [string, string][], string];

type QuizDef = {
  q1: QcmDef;
  q2: QcmDef;
  q3: QcmDef;
  blank: QcmDef;
  tf1: TfDef;
  tf2: TfDef;
  multi: MultiDef;
  order: OrderDef;
  match: MatchDef;
  scenario: QcmDef;
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
): BiomecaniqueSeedLesson {
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
    questions: quiz10(
      qcm(...quiz.q1),
      qcm(...quiz.q2),
      qcm(...quiz.q3),
      fillBlank(...quiz.blank),
      tf(...quiz.tf1),
      tf(...quiz.tf2),
      multi(...quiz.multi),
      order(...quiz.order),
      match(...quiz.match),
      qcm(...quiz.scenario),
    ),
  };
}

export type { QuizDef };
