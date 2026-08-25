import { z } from "zod";

export const RoleSchema = z.enum(["USER", "ADMIN"]);
export type Role = z.infer<typeof RoleSchema>;

export const LessonStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);
export type LessonStatus = z.infer<typeof LessonStatusSchema>;

export const QuestionTypeSchema = z.enum([
  "SINGLE",
  "TRUE_FALSE",
  "MULTI",
  "ORDER",
  "MATCH",
  "TEXT",
]);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export const DifficultySchema = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);
export type Difficulty = z.infer<typeof DifficultySchema>;

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  displayName: z.string().min(2).max(64),
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const RefreshSchema = z.object({
  refreshToken: z.string().min(1),
});
export type RefreshInput = z.infer<typeof RefreshSchema>;

export const CompleteLessonSchema = z.object({
  readingTimeSec: z.number().int().min(0).max(3600).optional(),
});
export type CompleteLessonInput = z.infer<typeof CompleteLessonSchema>;

export const SubmitMemoryGameScoreSchema = z.object({
  score: z.number().int().min(0).max(100),
});
export type SubmitMemoryGameScoreInput = z.infer<
  typeof SubmitMemoryGameScoreSchema
>;

export const UpdatePreferredCategorySchema = z.object({
  preferredCategoryId: z.string().cuid(),
});
export type UpdatePreferredCategoryInput = z.infer<
  typeof UpdatePreferredCategorySchema
>;

export const SubmitQuizSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string().cuid(),
      selectedAnswerIds: z.array(z.string().cuid()).default([]),
      orderedAnswerIds: z.array(z.string().cuid()).optional(),
      textAnswer: z.string().max(200).optional(),
      matches: z
        .array(
          z.object({
            leftId: z.string().cuid(),
            rightId: z.string().cuid(),
          }),
        )
        .optional(),
    }),
  ),
});
export type SubmitQuizInput = z.infer<typeof SubmitQuizSchema>;

export const SubmitCheckpointGateSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string().cuid(),
      selectedAnswerIds: z.array(z.string().cuid()).default([]),
    }),
  ),
  timeSpentSec: z.number().int().min(0).max(600),
});
export type SubmitCheckpointGateInput = z.infer<
  typeof SubmitCheckpointGateSchema
>;

export const MINI_GAME_MIN_DURATION_SEC = 30;
export const MINI_GAME_MAX_DURATION_SEC = 300;
export const MINI_GAME_LIVES = 3;
/** Délai avant que « Passer » devienne cliquable, pour pousser à répondre. */
export const MINI_GAME_SKIP_DELAY_MS = 1500;

export const SubmitMiniGameResultSchema = z
  .object({
    durationSec: z
      .number()
      .int()
      .min(MINI_GAME_MIN_DURATION_SEC)
      .max(MINI_GAME_MAX_DURATION_SEC),
    correctCount: z.number().int().min(0).max(1000),
    wrongCount: z.number().int().min(0).max(MINI_GAME_LIVES),
    bestCombo: z.number().int().min(0).max(1000),
    endedBy: z.enum(["time", "lives"]),
  })
  .refine((v) => v.bestCombo <= v.correctCount, {
    message: "bestCombo cannot exceed correctCount",
    path: ["bestCombo"],
  })
  .refine((v) => (v.endedBy === "lives" ? v.wrongCount === MINI_GAME_LIVES : true), {
    message: "endedBy=lives requires all lives to be lost",
    path: ["wrongCount"],
  });
export type SubmitMiniGameResultInput = z.infer<
  typeof SubmitMiniGameResultSchema
>;

/** Score = bonnes réponses par minute, sur la durée choisie (non gonflable). */
export function getMiniGameScore(correctCount: number, durationSec: number) {
  if (durationSec <= 0) return 0;
  return Math.round((correctCount * 60) / durationSec);
}

export const CreateCategorySchema = z.object({
  slug: z.string().min(2).max(64),
  name: z.string().min(2).max(64),
  color: z.string().min(4).max(16),
  icon: z.string().min(1).max(64),
  order: z.number().int().min(0).default(0),
});
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;

export const CreateLessonSchema = z.object({
  categoryId: z.string().cuid(),
  title: z.string().min(2).max(200),
  subtitle: z.string().max(300).optional(),
  markdown: z.string().min(1),
  durationSec: z.number().int().min(30).max(1800).default(90),
  difficulty: DifficultySchema.default("BEGINNER"),
  illustrationUrl: z
    .union([
      z.string().url(),
      z.string().regex(/^\/uploads\/[A-Za-z0-9._-]+$/),
      z.literal(""),
      z.null(),
    ])
    .optional()
    .transform((v) => (v === "" ? null : v)),
  order: z.number().int().min(0).default(0),
  checkpointKey: z.string().min(1).max(64).default("bases"),
  checkpointTitle: z.string().min(1).max(120).default("Bases"),
  checkpointOrder: z.number().int().min(0).default(0),
  tags: z.array(z.string()).default([]),
  sources: z.array(z.string()).default([]),
  recommendedLevel: z.number().int().min(1).default(1),
  xpReward: z.number().int().min(1).default(25),
  status: LessonStatusSchema.default("DRAFT"),
});
export type CreateLessonInput = z.infer<typeof CreateLessonSchema>;

export const UpdateLessonSchema = CreateLessonSchema.partial();
export type UpdateLessonInput = z.infer<typeof UpdateLessonSchema>;

export const CreateQuestionSchema = z.object({
  type: QuestionTypeSchema,
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  order: z.number().int().min(0).default(0),
  payload: z.record(z.unknown()).optional(),
  answers: z
    .array(
      z.object({
        label: z.string().min(1),
        isCorrect: z.boolean().default(false),
        order: z.number().int().min(0).default(0),
        matchKey: z.string().optional().nullable(),
      }),
    )
    .min(1),
});

export const UpsertQuizSchema = z.object({
  lessonId: z.string().cuid(),
  xpReward: z.number().int().min(1).default(40),
  perfectBonusXp: z.number().int().min(0).default(20),
  questions: z.array(CreateQuestionSchema).min(1),
});
export type UpsertQuizInput = z.infer<typeof UpsertQuizSchema>;

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export type PaginationInput = z.infer<typeof PaginationSchema>;
