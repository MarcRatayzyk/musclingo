import { Difficulty, Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { getLessonIllustrations } from "@muscle-mind/types";
import { ANATOMIE_LESSONS } from "./anatomie-lessons";
import { NUTRITION_LESSONS } from "./nutrition-lessons";
import { RECUPERATION_LESSONS } from "./recuperation-lessons";
import { BIOMECANIQUE_LESSONS } from "./biomecanique-lessons";
import { PROGRAMMATION_LESSONS } from "./programmation-lessons";
import {
  NUTRITION_GATES,
  type NutritionGateSeed,
} from "./nutrition-gates";
import { ANATOMIE_MINI_GAME_QUESTIONS } from "./mini-games/anatomie-questions";
import { BIOMECANIQUE_MINI_GAME_QUESTIONS } from "./mini-games/biomecanique-questions";
import { NUTRITION_MINI_GAME_QUESTIONS } from "./mini-games/nutrition-questions";
import { PROGRAMMATION_MINI_GAME_QUESTIONS } from "./mini-games/programmation-questions";
import { RECUPERATION_MINI_GAME_QUESTIONS } from "./mini-games/recuperation-questions";
import type { MiniGameQuestionSeed } from "./mini-games/types";

const prisma = new PrismaClient();

const UPLOADS_DIR = join(process.cwd(), "uploads");
const ASSETS_DIR = join(process.cwd(), "prisma", "assets");

function ensureUploadFile(url: string | null | undefined): void {
  if (!url?.startsWith("/uploads/")) return;
  const filename = url.replace("/uploads/", "");
  const assetPath = join(ASSETS_DIR, filename);
  const uploadPath = join(UPLOADS_DIR, filename);
  if (!existsSync(assetPath)) return;
  if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true });
  if (!existsSync(uploadPath)) copyFileSync(assetPath, uploadPath);
}

function ensureLessonIllustration(
  url: string | null | undefined,
): string | null {
  if (!url?.startsWith("/uploads/")) return url ?? null;
  ensureUploadFile(url);
  for (const item of getLessonIllustrations(url)) {
    ensureUploadFile(item.url);
  }
  return url;
}

type SeedQuestionAnswer = {
  label: string;
  isCorrect: boolean;
  order?: number;
  matchKey?: string;
};

type SeedQuestion = {
  type:
    | "SINGLE"
    | "TRUE_FALSE"
    | "TEXT"
    | "MULTI"
    | "ORDER"
    | "MATCH"
    | "HOTSPOT";
  prompt: string;
  explanation: string;
  answers: SeedQuestionAnswer[];
  payload?: Prisma.InputJsonValue;
};

type SeedLesson = {
  title: string;
  subtitle: string;
  markdown: string;
  durationSec: number;
  difficulty: Difficulty;
  order: number;
  xpReward: number;
  tags: string[];
  checkpointKey?: string;
  checkpointTitle?: string;
  checkpointOrder?: number;
  illustrationUrl?: string | null;
  sources?: string[];
  questions?: SeedQuestion[];
  quizPrompt?: string;
  quizCorrect?: string;
  quizWrong?: string[];
  tfPrompt?: string;
  tfIsTrue?: boolean;
  tfExplanation?: string;
};

function buildQuizQuestionCreates(lesson: SeedLesson) {
  if (lesson.questions?.length) {
    return lesson.questions.map((q, order) => {
      if (q.payload?.imageUrl) ensureUploadFile(q.payload.imageUrl);
      return {
        type: q.type,
        prompt: q.prompt,
        explanation: q.explanation,
        order,
        payload: q.payload ? (q.payload as Prisma.InputJsonValue) : undefined,
        answers: {
          create: q.answers.map((a, i) => ({
            label: a.label,
            isCorrect: a.isCorrect,
            order: a.order ?? i,
            matchKey: a.matchKey ?? undefined,
          })),
        },
      };
    });
  }

  if (
    !lesson.quizPrompt ||
    !lesson.quizCorrect ||
    !lesson.quizWrong ||
    !lesson.tfPrompt ||
    lesson.tfIsTrue == null ||
    !lesson.tfExplanation
  ) {
    throw new Error(
      `Lesson "${lesson.title}" (order ${lesson.order}) needs questions[] or legacy quiz fields.`,
    );
  }

  return [
    {
      type: "SINGLE" as const,
      prompt: lesson.quizPrompt,
      explanation: `La bonne réponse est : ${lesson.quizCorrect}.`,
      order: 0,
      answers: {
        create: [
          { label: lesson.quizCorrect, isCorrect: true, order: 0 },
          ...lesson.quizWrong.map((label, i) => ({
            label,
            isCorrect: false,
            order: i + 1,
          })),
        ],
      },
    },
    {
      type: "TRUE_FALSE" as const,
      prompt: lesson.tfPrompt,
      explanation: lesson.tfExplanation,
      order: 1,
      answers: {
        create: [
          { label: "Vrai", isCorrect: lesson.tfIsTrue, order: 0 },
          { label: "Faux", isCorrect: !lesson.tfIsTrue, order: 1 },
        ],
      },
    },
  ];
}

function resolveCheckpoint(lesson: SeedLesson) {
  if (
    lesson.checkpointKey &&
    lesson.checkpointTitle != null &&
    lesson.checkpointOrder != null
  ) {
    return {
      checkpointKey: lesson.checkpointKey,
      checkpointTitle: lesson.checkpointTitle,
      checkpointOrder: lesson.checkpointOrder,
    };
  }
  if (lesson.difficulty === "INTERMEDIATE") {
    return {
      checkpointKey: "intermediaire",
      checkpointTitle: "Intermédiaire",
      checkpointOrder: 1,
    };
  }
  if (lesson.difficulty === "ADVANCED") {
    return {
      checkpointKey: "avance",
      checkpointTitle: "Avancé",
      checkpointOrder: 2,
    };
  }
  return {
    checkpointKey: "bases",
    checkpointTitle: "Bases",
    checkpointOrder: 0,
  };
}

const PATHS: Record<string, SeedLesson[]> = {
  anatomie: ANATOMIE_LESSONS,
  nutrition: NUTRITION_LESSONS,
  biomecanique: BIOMECANIQUE_LESSONS,
  programmation: PROGRAMMATION_LESSONS,
  recuperation: RECUPERATION_LESSONS,
};

async function upsertLessonWithQuiz(categoryId: string, lesson: SeedLesson) {
  const existing = await prisma.lesson.findFirst({
    where: { categoryId, order: lesson.order },
    include: { quiz: true },
  });

  const checkpoint = resolveCheckpoint(lesson);

  const baseData = {
    title: lesson.title,
    subtitle: lesson.subtitle,
    markdown: lesson.markdown,
    durationSec: lesson.durationSec,
    difficulty: lesson.difficulty,
    order: lesson.order,
    ...checkpoint,
    tags: lesson.tags,
    illustrationUrl: ensureLessonIllustration(lesson.illustrationUrl),
    sources: lesson.sources?.length
      ? lesson.sources
      : ["Contenu démo Muscle Mind : à remplacer via l’admin."],
    recommendedLevel:
      lesson.difficulty === "BEGINNER"
        ? 1
        : lesson.difficulty === "INTERMEDIATE"
          ? 3
          : 5,
    xpReward: lesson.xpReward,
    status: "PUBLISHED" as const,
  };

  const saved = existing
    ? await prisma.lesson.update({
        where: { id: existing.id },
        data: baseData,
      })
    : await prisma.lesson.create({
        data: { ...baseData, categoryId },
      });

  if (existing?.quiz) {
    await prisma.question.deleteMany({ where: { quizId: existing.quiz.id } });
    await prisma.quiz.delete({ where: { id: existing.quiz.id } });
  }

  await prisma.quiz.create({
    data: {
      lessonId: saved.id,
      xpReward: 40,
      perfectBonusXp: 20,
      questions: { create: buildQuizQuestionCreates(lesson) },
    },
  });

  return saved.id;
}

function buildGateQuestionCreates(gate: NutritionGateSeed) {
  return gate.questions.map((q, order) => ({
    type: q.type,
    prompt: q.prompt,
    explanation: q.explanation,
    order,
    answers: {
      create: q.answers.map((a, i) => ({
        label: a.label,
        isCorrect: a.isCorrect,
        order: i,
      })),
    },
  }));
}

async function upsertCheckpointGate(
  categoryId: string,
  gate: NutritionGateSeed,
) {
  const existing = await prisma.checkpointGate.findUnique({
    where: {
      categoryId_checkpointKey: {
        categoryId,
        checkpointKey: gate.checkpointKey,
      },
    },
  });

  const baseData = {
    title: gate.title,
    checkpointOrder: gate.checkpointOrder,
    timeLimitSec: gate.timeLimitSec,
    passThreshold: gate.passThreshold,
    questionCount: gate.questionCount,
    xpReward: gate.xpReward,
  };

  if (existing) {
    await prisma.checkpointQuestion.deleteMany({
      where: { gateId: existing.id },
    });
    await prisma.checkpointGate.update({
      where: { id: existing.id },
      data: baseData,
    });
    for (const q of buildGateQuestionCreates(gate)) {
      await prisma.checkpointQuestion.create({
        data: { gateId: existing.id, ...q },
      });
    }
    return existing.id;
  }

  const saved = await prisma.checkpointGate.create({
    data: {
      ...baseData,
      categoryId,
      checkpointKey: gate.checkpointKey,
      questions: { create: buildGateQuestionCreates(gate) },
    },
  });
  return saved.id;
}

/** Remplace la banque dédiée d'une catégorie (les questions n'ont pas de clé stable). */
async function replaceMiniGameQuestions(
  categoryId: string,
  questions: MiniGameQuestionSeed[],
) {
  await prisma.miniGameQuestion.deleteMany({ where: { categoryId } });

  for (const [order, q] of questions.entries()) {
    if (q.payload?.imageUrl) ensureUploadFile(q.payload.imageUrl);
    const payload = {
      ...(q.payload ?? {}),
      ...(q.themeTags?.length ? { themeTags: q.themeTags } : {}),
    };
    await prisma.miniGameQuestion.create({
      data: {
        categoryId,
        checkpointKey: q.checkpointKey ?? null,
        type: q.type,
        prompt: q.prompt,
        explanation: q.explanation,
        order,
        payload:
          Object.keys(payload).length > 0
            ? (payload as Prisma.InputJsonValue)
            : undefined,
        answers: {
          create: q.answers.map((a, i) => ({
            label: a.label,
            isCorrect: a.isCorrect,
            order: a.order ?? i,
            matchKey: a.matchKey ?? undefined,
          })),
        },
      },
    });
  }
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@musclemind.app";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin123!";
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", passwordHash: adminPasswordHash },
    create: {
      email: adminEmail,
      passwordHash: adminPasswordHash,
      displayName: "Admin",
      role: "ADMIN",
      streak: { create: {} },
    },
  });

  const demoEmail = "demo@musclemind.app";
  const demoPassword = "Demo123!";
  const demoPasswordHash = await bcrypt.hash(demoPassword, 10);

  await prisma.user.upsert({
    where: { email: demoEmail },
    update: { role: "USER", passwordHash: demoPasswordHash },
    create: {
      email: demoEmail,
      passwordHash: demoPasswordHash,
      displayName: "Démo",
      role: "USER",
      streak: { create: {} },
    },
  });

  const categories = [
    {
      slug: "anatomie",
      name: "Anatomie",
      color: "#5B8CFF",
      icon: "body",
      order: 0,
    },
    {
      slug: "nutrition",
      name: "Nutrition",
      color: "#7CFFB2",
      icon: "nutrition",
      order: 1,
    },
    {
      slug: "biomecanique",
      name: "Biomécanique",
      color: "#FF8C5B",
      icon: "mechanics",
      order: 2,
    },
    {
      slug: "programmation",
      name: "Programmation",
      color: "#C77DFF",
      icon: "program",
      order: 3,
    },
    {
      slug: "recuperation",
      name: "Récupération",
      color: "#5BE0FF",
      icon: "recovery",
      order: 4,
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  await prisma.badge.upsert({
    where: { code: "FIRST_LESSON" },
    update: {},
    create: {
      code: "FIRST_LESSON",
      name: "Première leçon",
      description: "Tu as terminé ta première micro-leçon.",
      icon: "book",
    },
  });

  await prisma.badge.upsert({
    where: { code: "FIRST_QUIZ" },
    update: {},
    create: {
      code: "FIRST_QUIZ",
      name: "Premier quiz",
      description: "Tu as validé ton premier quiz.",
      icon: "quiz",
    },
  });

  const miniGameBadges = [
    {
      code: "MINIGAME_FIRST",
      name: "Premier quiz éclair",
      description: "Tu as joué ta première partie de quiz éclair.",
      icon: "bolt",
    },
    {
      code: "MINIGAME_COMBO_10",
      name: "Série de 10",
      description: "10 bonnes réponses d'affilée en quiz éclair.",
      icon: "fire",
    },
    {
      code: "MINIGAME_FLAWLESS",
      name: "Sans faute",
      description: "Une partie de quiz éclair terminée sans perdre de vie.",
      icon: "shield",
    },
    {
      code: "MINIGAME_SPEED_20",
      name: "Éclair",
      description: "Un score de 20 ou plus en quiz éclair.",
      icon: "rocket",
    },
  ];

  for (const badge of miniGameBadges) {
    await prisma.badge.upsert({
      where: { code: badge.code },
      update: {},
      create: badge,
    });
  }

  let total = 0;
  for (const [slug, lessons] of Object.entries(PATHS)) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug },
    });
    for (const lesson of lessons) {
      await upsertLessonWithQuiz(category.id, lesson);
      total += 1;
    }
    const keepOrders = lessons.map((l) => l.order);
    await prisma.lesson.deleteMany({
      where: { categoryId: category.id, order: { notIn: keepOrders } },
    });
  }

  const nutritionCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "nutrition" },
  });
  for (const gate of NUTRITION_GATES) {
    await upsertCheckpointGate(nutritionCategory.id, gate);
  }
  const keepGateKeys = NUTRITION_GATES.map((g) => g.checkpointKey);
  await prisma.checkpointGate.deleteMany({
    where: {
      categoryId: nutritionCategory.id,
      checkpointKey: { notIn: keepGateKeys },
    },
  });

  const anatomieCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "anatomie" },
  });
  await replaceMiniGameQuestions(
    anatomieCategory.id,
    ANATOMIE_MINI_GAME_QUESTIONS,
  );
  await replaceMiniGameQuestions(
    nutritionCategory.id,
    NUTRITION_MINI_GAME_QUESTIONS,
  );

  const biomecaniqueCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "biomecanique" },
  });
  const programmationCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "programmation" },
  });
  const recuperationCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "recuperation" },
  });
  await replaceMiniGameQuestions(
    biomecaniqueCategory.id,
    BIOMECANIQUE_MINI_GAME_QUESTIONS,
  );
  await replaceMiniGameQuestions(
    programmationCategory.id,
    PROGRAMMATION_MINI_GAME_QUESTIONS,
  );
  await replaceMiniGameQuestions(
    recuperationCategory.id,
    RECUPERATION_MINI_GAME_QUESTIONS,
  );

  const miniGameTotal =
    ANATOMIE_MINI_GAME_QUESTIONS.length +
    NUTRITION_MINI_GAME_QUESTIONS.length +
    BIOMECANIQUE_MINI_GAME_QUESTIONS.length +
    PROGRAMMATION_MINI_GAME_QUESTIONS.length +
    RECUPERATION_MINI_GAME_QUESTIONS.length;

  console.log("Seed complete");
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);
  console.log(`Demo user (mobile): ${demoEmail} / ${demoPassword}`);
  console.log(`Lessons seeded: ${total}`);
  console.log(`Nutrition gates seeded: ${NUTRITION_GATES.length}`);
  console.log(`Mini-game questions seeded: ${miniGameTotal}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
