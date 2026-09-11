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
import { ANATOMIE_GATES, type AnatomieGateSeed } from "./anatomie-gates";
import { ANATOMIE_MINI_GAME_QUESTIONS } from "./mini-games/anatomie-questions";
import { BIOMECANIQUE_MINI_GAME_QUESTIONS } from "./mini-games/biomecanique-questions";
import { NUTRITION_MINI_GAME_QUESTIONS } from "./mini-games/nutrition-questions";
import { PROGRAMMATION_MINI_GAME_QUESTIONS } from "./mini-games/programmation-questions";
import { RECUPERATION_MINI_GAME_QUESTIONS } from "./mini-games/recuperation-questions";
import type { MiniGameQuestionSeed } from "./mini-games/types";
import { BADGE_EN, CATEGORY_NAME_EN, translateCheckpointTitle } from "./i18n/en";
import { enOrTranslate } from "./i18n/auto-en";
import {
  enrichGateWithEnglish,
  enrichLessonWithEnglish,
  enrichMiniGameQuestionWithEnglish,
} from "./i18n/lesson-en";

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
  copyFileSync(assetPath, uploadPath);
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
  labelEn?: string;
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
  promptEn?: string;
  explanation: string;
  explanationEn?: string;
  answers: SeedQuestionAnswer[];
  payload?: Prisma.InputJsonValue;
};

type SeedLesson = {
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  markdown: string;
  markdownEn?: string;
  durationSec: number;
  difficulty: Difficulty;
  order: number;
  xpReward: number;
  tags: string[];
  checkpointKey?: string;
  checkpointTitle?: string;
  checkpointTitleEn?: string;
  checkpointOrder?: number;
  illustrationUrl?: string | null;
  sources?: string[];
  questions?: SeedQuestion[];
  quizPrompt?: string;
  quizPromptEn?: string;
  quizCorrect?: string;
  quizCorrectEn?: string;
  quizWrong?: string[];
  quizWrongEn?: string[];
  tfPrompt?: string;
  tfPromptEn?: string;
  tfIsTrue?: boolean;
  tfExplanation?: string;
  tfExplanationEn?: string;
};

function payloadImageUrl(payload: Prisma.InputJsonValue | undefined): string | undefined {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return undefined;
  }
  const imageUrl = (payload as { imageUrl?: unknown }).imageUrl;
  return typeof imageUrl === "string" ? imageUrl : undefined;
}

function buildQuizQuestionCreates(lesson: SeedLesson) {
  if (lesson.questions?.length) {
    return lesson.questions.map((q, order) => {
      const imageUrl = payloadImageUrl(q.payload);
      if (imageUrl) ensureUploadFile(imageUrl);
      return {
        type: q.type,
        prompt: q.prompt,
        promptEn: q.promptEn ?? enOrTranslate(q.prompt),
        explanation: q.explanation,
        explanationEn: q.explanationEn ?? enOrTranslate(q.explanation),
        order,
        payload: q.payload ? (q.payload as Prisma.InputJsonValue) : undefined,
        answers: {
          create: q.answers.map((a, i) => ({
            label: a.label,
            labelEn: a.labelEn ?? enOrTranslate(a.label),
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
      promptEn: lesson.quizPromptEn ?? enOrTranslate(lesson.quizPrompt),
      explanation: `La bonne réponse est : ${lesson.quizCorrect}.`,
      explanationEn: `The correct answer is: ${lesson.quizCorrectEn ?? enOrTranslate(lesson.quizCorrect)}.`,
      order: 0,
      answers: {
        create: [
          {
            label: lesson.quizCorrect,
            labelEn: lesson.quizCorrectEn ?? enOrTranslate(lesson.quizCorrect),
            isCorrect: true,
            order: 0,
          },
          ...lesson.quizWrong.map((label, i) => ({
            label,
            labelEn: lesson.quizWrongEn?.[i] ?? enOrTranslate(label),
            isCorrect: false,
            order: i + 1,
          })),
        ],
      },
    },
    {
      type: "TRUE_FALSE" as const,
      prompt: lesson.tfPrompt,
      promptEn: lesson.tfPromptEn ?? enOrTranslate(lesson.tfPrompt),
      explanation: lesson.tfExplanation,
      explanationEn: lesson.tfExplanationEn ?? enOrTranslate(lesson.tfExplanation),
      order: 1,
      answers: {
        create: [
          {
            label: "Vrai",
            labelEn: "True",
            isCorrect: lesson.tfIsTrue,
            order: 0,
          },
          {
            label: "Faux",
            labelEn: "False",
            isCorrect: !lesson.tfIsTrue,
            order: 1,
          },
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
  const localized = enrichLessonWithEnglish(lesson);
  const existing = await prisma.lesson.findFirst({
    where: { categoryId, order: localized.order },
    include: { quiz: true },
  });

  const checkpoint = resolveCheckpoint(localized);

  const baseData = {
    title: localized.title,
    titleEn: localized.titleEn ?? enOrTranslate(localized.title),
    subtitle: localized.subtitle,
    subtitleEn: localized.subtitleEn ?? enOrTranslate(localized.subtitle),
    markdown: localized.markdown,
    markdownEn: localized.markdownEn ?? enOrTranslate(localized.markdown),
    durationSec: localized.durationSec,
    difficulty: localized.difficulty,
    order: localized.order,
    ...checkpoint,
    checkpointTitleEn:
      localized.checkpointTitleEn ??
      translateCheckpointTitle(checkpoint.checkpointTitle),
    tags: localized.tags,
    illustrationUrl: ensureLessonIllustration(localized.illustrationUrl),
    sources: localized.sources?.length
      ? localized.sources
      : ["Contenu démo Muscle Mind : à remplacer via l’admin."],
    recommendedLevel:
      localized.difficulty === "BEGINNER"
        ? 1
        : localized.difficulty === "INTERMEDIATE"
          ? 3
          : 5,
    xpReward: localized.xpReward,
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
      questions: { create: buildQuizQuestionCreates(localized) },
    },
  });

  return saved.id;
}

function buildGateQuestionCreates(gate: NutritionGateSeed | AnatomieGateSeed) {
  const localizedGate = enrichGateWithEnglish(gate);
  return localizedGate.questions.map((q, order) => {
    const imageUrl = payloadImageUrl(q.payload as Prisma.InputJsonValue | undefined);
    if (imageUrl) ensureUploadFile(imageUrl);
    return {
      type: q.type,
      prompt: q.prompt,
      promptEn: q.promptEn,
      explanation: q.explanation,
      explanationEn: q.explanationEn,
      order,
      payload: q.payload
        ? (q.payload as Prisma.InputJsonValue)
        : undefined,
      answers: {
        create: q.answers.map((a, i) => ({
          label: a.label,
          labelEn: a.labelEn,
          isCorrect: a.isCorrect,
          order: a.order ?? i,
          matchKey: a.matchKey ?? undefined,
        })),
      },
    };
  });
}

async function upsertCheckpointGate(
  categoryId: string,
  gate: NutritionGateSeed | AnatomieGateSeed,
) {
  const localizedGate = enrichGateWithEnglish(gate);
  const existing = await prisma.checkpointGate.findUnique({
    where: {
      categoryId_checkpointKey: {
        categoryId,
        checkpointKey: localizedGate.checkpointKey,
      },
    },
  });

  const baseData = {
    title: localizedGate.title,
    titleEn: localizedGate.titleEn ?? translateCheckpointTitle(localizedGate.title),
    checkpointOrder: localizedGate.checkpointOrder,
    timeLimitSec: localizedGate.timeLimitSec,
    passThreshold: localizedGate.passThreshold,
    questionCount: localizedGate.questionCount,
    xpReward: localizedGate.xpReward,
  };

  if (existing) {
    await prisma.checkpointQuestion.deleteMany({
      where: { gateId: existing.id },
    });
    await prisma.checkpointGate.update({
      where: { id: existing.id },
      data: baseData,
    });
    for (const q of buildGateQuestionCreates(localizedGate)) {
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
      checkpointKey: localizedGate.checkpointKey,
      questions: { create: buildGateQuestionCreates(localizedGate) },
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
    const localized = enrichMiniGameQuestionWithEnglish(q);
    if (localized.payload?.imageUrl) ensureUploadFile(localized.payload.imageUrl);
    const payload = {
      ...(localized.payload ?? {}),
      ...(localized.themeTags?.length ? { themeTags: localized.themeTags } : {}),
    };
    await prisma.miniGameQuestion.create({
      data: {
        categoryId,
        checkpointKey: localized.checkpointKey ?? null,
        type: localized.type,
        prompt: localized.prompt,
        promptEn: localized.promptEn,
        explanation: localized.explanation,
        explanationEn: localized.explanationEn,
        order,
        payload:
          Object.keys(payload).length > 0
            ? (payload as Prisma.InputJsonValue)
            : undefined,
        answers: {
          create: localized.answers.map((a, i) => ({
            label: a.label,
            labelEn: a.labelEn,
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
  const adminEmail = (
    process.env.ADMIN_EMAIL ?? "admin@musclemind.app"
  ).toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!adminPassword || adminPassword.length < 8) {
    throw new Error(
      "ADMIN_PASSWORD is required when seeding (min 8 characters). Refusing default Admin123!.",
    );
  }
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: adminPasswordHash,
        displayName: "Admin",
        role: "ADMIN",
        streak: { create: {} },
      },
    });
    console.log(`Created admin user ${adminEmail}`);
  } else {
    console.log(
      `Admin user ${adminEmail} already exists — password/role left unchanged`,
    );
  }

  if (process.env.SEED_DEMO_USER === "1") {
    const demoEmail = "demo@musclemind.app";
    const demoPassword = "Demo123!";
    const demoPasswordHash = await bcrypt.hash(demoPassword, 10);
    const existingDemo = await prisma.user.findUnique({
      where: { email: demoEmail },
    });
    if (!existingDemo) {
      await prisma.user.create({
        data: {
          email: demoEmail,
          passwordHash: demoPasswordHash,
          displayName: "Démo",
          role: "USER",
          streak: { create: {} },
        },
      });
      console.log(`Created demo user ${demoEmail}`);
    } else {
      console.log(`Demo user ${demoEmail} already exists — left unchanged`);
    }
  } else {
    console.log("SEED_DEMO_USER unset — demo user skipped");
  }

  const categories = [
    {
      slug: "anatomie",
      name: "Anatomie",
      nameEn: CATEGORY_NAME_EN.anatomie,
      color: "#5B8CFF",
      icon: "body",
      order: 0,
    },
    {
      slug: "nutrition",
      name: "Nutrition",
      nameEn: CATEGORY_NAME_EN.nutrition,
      color: "#7CFFB2",
      icon: "nutrition",
      order: 1,
    },
    {
      slug: "biomecanique",
      name: "Biomécanique",
      nameEn: CATEGORY_NAME_EN.biomecanique,
      color: "#FF8C5B",
      icon: "mechanics",
      order: 2,
    },
    {
      slug: "programmation",
      name: "Programmation",
      nameEn: CATEGORY_NAME_EN.programmation,
      color: "#C77DFF",
      icon: "program",
      order: 3,
    },
    {
      slug: "recuperation",
      name: "Récupération",
      nameEn: CATEGORY_NAME_EN.recuperation,
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

  // Compte démo : skip onboarding mobile (preferredCategory requis).
  const demoEmail = "demo@musclemind.app";
  const nutritionForDemo = await prisma.category.findUniqueOrThrow({
    where: { slug: "nutrition" },
  });
  const demoUser = await prisma.user.findUnique({
    where: { email: demoEmail },
    select: { id: true },
  });
  if (demoUser) {
    await prisma.user.update({
      where: { email: demoEmail },
      data: { preferredCategoryId: nutritionForDemo.id },
    });
  }

  // Compte test onboarding : sans preferredCategory pour rejouer le funnel.
  const onboardEmail = "onboard@musclemind.app";
  const onboardPasswordHash = await bcrypt.hash("Onboard123!", 10);
  await prisma.user.upsert({
    where: { email: onboardEmail },
    update: { preferredCategoryId: null },
    create: {
      email: onboardEmail,
      passwordHash: onboardPasswordHash,
      displayName: "Onboard",
      role: "USER",
      preferredCategoryId: null,
      streak: { create: {} },
    },
  });
  console.log(`Onboard test user ready: ${onboardEmail} / Onboard123!`);

  await prisma.badge.upsert({
    where: { code: "FIRST_LESSON" },
    update: {
      nameEn: BADGE_EN.FIRST_LESSON.name,
      descriptionEn: BADGE_EN.FIRST_LESSON.description,
    },
    create: {
      code: "FIRST_LESSON",
      name: "Première leçon",
      nameEn: BADGE_EN.FIRST_LESSON.name,
      description: "Tu as terminé ta première micro-leçon.",
      descriptionEn: BADGE_EN.FIRST_LESSON.description,
      icon: "book",
    },
  });

  await prisma.badge.upsert({
    where: { code: "FIRST_QUIZ" },
    update: {
      nameEn: BADGE_EN.FIRST_QUIZ.name,
      descriptionEn: BADGE_EN.FIRST_QUIZ.description,
    },
    create: {
      code: "FIRST_QUIZ",
      name: "Premier quiz",
      nameEn: BADGE_EN.FIRST_QUIZ.name,
      description: "Tu as validé ton premier quiz.",
      descriptionEn: BADGE_EN.FIRST_QUIZ.description,
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
    const en = BADGE_EN[badge.code];
    await prisma.badge.upsert({
      where: { code: badge.code },
      update: {
        nameEn: en?.name,
        descriptionEn: en?.description,
      },
      create: {
        ...badge,
        nameEn: en?.name,
        descriptionEn: en?.description,
      },
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
  for (const gate of ANATOMIE_GATES) {
    await upsertCheckpointGate(anatomieCategory.id, gate);
  }
  const keepAnatomieGateKeys = ANATOMIE_GATES.map((g) => g.checkpointKey);
  await prisma.checkpointGate.deleteMany({
    where: {
      categoryId: anatomieCategory.id,
      checkpointKey: { notIn: keepAnatomieGateKeys },
    },
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
  console.log(`Demo user (mobile): ${demoEmail} / Demo123! (si SEED_DEMO_USER=1)`);
  console.log(`Onboard test: ${onboardEmail} / Onboard123!`);
  console.log(`Lessons seeded: ${total}`);
  console.log(`Nutrition gates seeded: ${NUTRITION_GATES.length}`);
  console.log(`Anatomie gates seeded: ${ANATOMIE_GATES.length}`);
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
