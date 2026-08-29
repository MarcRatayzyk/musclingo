import { Difficulty, Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { getLessonIllustrations } from "@muscle-mind/types";
import { ANATOMIE_LESSONS } from "./anatomie-lessons";
import { NUTRITION_LESSONS } from "./nutrition-lessons";
import { RECUPERATION_LESSONS } from "./recuperation-lessons";
import {
  NUTRITION_GATES,
  type NutritionGateSeed,
} from "./nutrition-gates";
import { ANATOMIE_MINI_GAME_QUESTIONS } from "./mini-games/anatomie-questions";
import { NUTRITION_MINI_GAME_QUESTIONS } from "./mini-games/nutrition-questions";
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

type SeedQuestionAnswer = { label: string; isCorrect: boolean };

type SeedQuestion = {
  type: "SINGLE" | "TRUE_FALSE" | "TEXT";
  prompt: string;
  explanation: string;
  answers: SeedQuestionAnswer[];
  payload?: {
    imageUrl: string;
    color: string;
    aliases?: string[];
  };
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
            order: i,
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
  biomecanique: [
    {
      title: "Levier et moment de force",
      subtitle: "Pourquoi un exercice « pique ».",
      markdown: `# Levier

Plus le bras de levier est long, plus le moment est grand.
Changer l’angle change la difficulté ressentie.
Comprendre ça = mieux choisir ses variantes.`,
      durationSec: 80,
      difficulty: "BEGINNER",
      order: 0,
      xpReward: 25,
      tags: ["levier"],
      quizPrompt: "Un bras de levier plus long…",
      quizCorrect: "Augmente souvent le moment de force",
      quizWrong: ["Supprime la gravité", "Annule le muscle", "Fixe le 1RM"],
      tfPrompt:
        "Tous les angles d’un même exercice demandent exactement le même effort.",
      tfIsTrue: false,
      tfExplanation: "Faux : le moment varie avec l’angle.",
    },
    {
      title: "Chaîne ouverte vs fermée",
      subtitle: "Pied / main libre ou fixée.",
      markdown: `# Chaînes

Chaîne fermée : extrémité fixée (squat).
Chaîne ouverte : extrémité libre (leg curl).
Les deux ont leur place selon l’objectif.`,
      durationSec: 70,
      difficulty: "BEGINNER",
      order: 1,
      xpReward: 25,
      tags: ["chaine"],
      quizPrompt: "Le squat est typiquement…",
      quizCorrect: "Une chaîne fermée",
      quizWrong: [
        "Une chaîne ouverte pure",
        "Un cardio HIIT",
        "Un stretch passif",
      ],
      tfPrompt: "Seules les chaînes ouvertes construisent du muscle.",
      tfIsTrue: false,
      tfExplanation: "Faux : les deux modalités sont utiles.",
    },
    {
      title: "Stabilité et base d’appui",
      subtitle: "Moins stable ≠ toujours mieux.",
      markdown: `# Stabilité

Surface instable augmente la demande d’équilibre.
Mais peut réduire la charge utile pour l’hypertrophie.
Choisir la stabilité selon l’objectif (force vs proprio).`,
      durationSec: 75,
      difficulty: "BEGINNER",
      order: 2,
      xpReward: 25,
      tags: ["stabilite"],
      quizPrompt:
        "Pour maximiser la charge en hypertrophie, on privilégie souvent…",
      quizCorrect: "Une base stable",
      quizWrong: [
        "Un ballon exclusivement",
        "Les yeux fermés",
        "Zéro chaussures obligatoires",
      ],
      tfPrompt: "Plus c’est instable, plus on prend forcément du muscle.",
      tfIsTrue: false,
      tfExplanation: "Faux : l’instabilité peut limiter la charge.",
    },
    {
      title: "Trajectoire de barre au développé",
      subtitle: "Ligne légèrement en J.",
      markdown: `# Bench path

La barre ne monte pas en ligne parfaitement verticale.
Légère courbe vers les épaules en lockout.
Omoplates serrées = base solide.`,
      durationSec: 90,
      difficulty: "INTERMEDIATE",
      order: 3,
      xpReward: 30,
      tags: ["bench"],
      quizPrompt: "Au développé couché, les omoplates…",
      quizCorrect: "Sont souvent rétractées pour une base stable",
      quizWrong: [
        "Doivent protraire à chaque rep",
        "Sont inutiles",
        "Remplacent la ceinture",
      ],
      tfPrompt:
        "La barre doit forcément rester au-dessus des yeux tout le mouvement.",
      tfIsTrue: false,
      tfExplanation: "Faux : la trajectoire est un peu courbe.",
    },
    {
      title: "Squat : genoux et hanches",
      subtitle: "Qui mène la danse ?",
      markdown: `# Squat mechanics

Genoux avancent, hanches reculent, dosage selon morphologie.
Talons au sol, thorax organique.
La profondeur utile = celle que tu contrôles.`,
      durationSec: 95,
      difficulty: "INTERMEDIATE",
      order: 4,
      xpReward: 30,
      tags: ["squat"],
      quizPrompt: "Dans un squat contrôlé, les talons…",
      quizCorrect: "Restent au sol",
      quizWrong: [
        "Doivent décoller",
        "Tournent vers l’intérieur forcé",
        "Sont inutiles",
      ],
      tfPrompt:
        "Tout le monde doit squatter identiquement, même profondeur et même stance.",
      tfIsTrue: false,
      tfExplanation: "Faux : morphologie et mobilité changent la technique.",
    },
    {
      title: "Deadlift : wedges et tension",
      subtitle: "Tirer le monde sans perdre le dos.",
      markdown: `# Deadlift

Wedge dans le sol, tension avant la décollée.
Barre proche des tibias/cuisses.
Verrouillage = hanches + genoux, pas un hyper-extension lombaire.`,
      durationSec: 100,
      difficulty: "ADVANCED",
      order: 5,
      xpReward: 35,
      tags: ["deadlift"],
      quizPrompt: "Avant de décoller la barre, on cherche surtout…",
      quizCorrect: "À créer de la tension",
      quizWrong: [
        "À retenir son souffle 2 minutes",
        "À regarder le plafond",
        "À arrondir volontairement",
      ],
      tfPrompt:
        "Finir un deadlift en cambrant maximalement le bas du dos est idéal.",
      tfIsTrue: false,
      tfExplanation: "Faux : verrouiller sans hyperlordose excessive.",
    },
  ],
  programmation: [
    {
      title: "Volume, intensité, fréquence",
      subtitle: "Les 3 leviers de base.",
      markdown: `# Leviers

**Volume** : quantité de travail.
**Intensité** : charge / proximité de l’échec.
**Fréquence** : fois par muscle / semaine.
On ajuste un levier à la fois.`,
      durationSec: 80,
      difficulty: "BEGINNER",
      order: 0,
      xpReward: 25,
      tags: ["volume"],
      quizPrompt: "Le volume désigne surtout…",
      quizCorrect: "La quantité de travail",
      quizWrong: [
        "La couleur des haltères",
        "Le nom du coach",
        "La musique de la salle",
      ],
      tfPrompt:
        "Augmenter volume, intensité et fréquence d’un coup est toujours optimal.",
      tfIsTrue: false,
      tfExplanation:
        "Faux : progresser un levier à la fois limite le burn-out.",
    },
    {
      title: "Surcharge progressive",
      subtitle: "Le moteur des gains.",
      markdown: `# Progressive overload

Plus de charge, reps, séries, ou meilleur contrôle.
Sans progression mesurable, adaptation stagne.
Tenir un logbook aide.`,
      durationSec: 70,
      difficulty: "BEGINNER",
      order: 1,
      xpReward: 25,
      tags: ["progression"],
      quizPrompt: "La surcharge progressive consiste à…",
      quizCorrect: "Augmenter graduellement la demande",
      quizWrong: [
        "Changer d’exercice chaque jour au hasard",
        "Ne jamais noter ses perfs",
        "Couper le sommeil",
      ],
      tfPrompt:
        "Faire toujours exactement la même chose 2 ans garantit des gains infinis.",
      tfIsTrue: false,
      tfExplanation: "Faux : sans surcharge, plateau probable.",
    },
    {
      title: "Full body vs split",
      subtitle: "Choisir selon ton emploi du temps.",
      markdown: `# Splits

Full body : fréquent, bien pour débutants.
Split : plus de volume par séance et muscle.
Le meilleur plan = celui que tu suis.`,
      durationSec: 75,
      difficulty: "BEGINNER",
      order: 2,
      xpReward: 25,
      tags: ["split"],
      quizPrompt: "Un full body convient souvent aux…",
      quizCorrect: "Débutants / agendas chargés",
      quizWrong: [
        "Personnes qui détestent s’entraîner",
        "Robots uniquement",
        "Séances de 10 secondes",
      ],
      tfPrompt: "Le split PPL est le seul format scientifique valide.",
      tfIsTrue: false,
      tfExplanation: "Faux : plusieurs splits marchent si volume/récup OK.",
    },
    {
      title: "RPE et proximité de l’échec",
      subtitle: "S’arrêter à 1–3 reps en réserve.",
      markdown: `# RPE

RPE 7–9 = zone hypertrophie fréquente.
Aller à l’échec souvent = fatigue élevée.
Apprendre à estimer les reps en réserve.`,
      durationSec: 85,
      difficulty: "INTERMEDIATE",
      order: 3,
      xpReward: 30,
      tags: ["rpe"],
      quizPrompt: "Un RPE élevé signifie…",
      quizCorrect: "Une série proche de l’échec",
      quizWrong: ["Une série très facile", "Un cardio long", "Un étirement"],
      tfPrompt: "Chaque série de chaque exercice doit être à l’échec absolu.",
      tfIsTrue: false,
      tfExplanation: "Faux : doser l’échec selon le contexte.",
    },
    {
      title: "Déload : la pause stratégique",
      subtitle: "Baisser pour mieux remonter.",
      markdown: `# Deload

Réduire volume/intensité 1 semaine.
Dissipe fatigue, garde la technique.
Utile après blocs durs ou signes de stagnation.`,
      durationSec: 70,
      difficulty: "INTERMEDIATE",
      order: 4,
      xpReward: 30,
      tags: ["deload"],
      quizPrompt: "Un déload sert surtout à…",
      quizCorrect: "Réduire la fatigue accumulée",
      quizWrong: [
        "Supprimer les protéines",
        "Doubler le volume",
        "Arrêter de dormir",
      ],
      tfPrompt: "Un déload signifie forcément 0 entraînement.",
      tfIsTrue: false,
      tfExplanation: "Faux : on réduit, on n’efface pas toujours tout.",
    },
    {
      title: "Périodisation simple",
      subtitle: "Blocs accumulation → intensification.",
      markdown: `# Périodisation

Bloc volume → bloc intensité → test / deload.
Évite de tout maximiser en même temps.
Adapte la durée des blocs à ta récupération.`,
      durationSec: 95,
      difficulty: "ADVANCED",
      order: 5,
      xpReward: 35,
      tags: ["periodisation"],
      quizPrompt: "Une périodisation simple alterne souvent…",
      quizCorrect: "Volume puis intensité",
      quizWrong: [
        "Uniquement du cardio",
        "Uniquement du stretching",
        "Zéro planification",
      ],
      tfPrompt: "Changer de programme chaque semaine sans fil rouge est idéal.",
      tfIsTrue: false,
      tfExplanation: "Faux : la continuité sur un bloc compte.",
    },
  ],
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
    await prisma.miniGameQuestion.create({
      data: {
        categoryId,
        checkpointKey: q.checkpointKey ?? null,
        type: q.type,
        prompt: q.prompt,
        explanation: q.explanation,
        order,
        payload: q.payload ? (q.payload as Prisma.InputJsonValue) : undefined,
        answers: {
          create: q.answers.map((a, i) => ({
            label: a.label,
            isCorrect: a.isCorrect,
            order: i,
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

  console.log("Seed complete");
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);
  console.log(`Demo user (mobile): ${demoEmail} / ${demoPassword}`);
  console.log(`Lessons seeded: ${total}`);
  console.log(`Nutrition gates seeded: ${NUTRITION_GATES.length}`);
  console.log(
    `Mini-game questions seeded: ${
      ANATOMIE_MINI_GAME_QUESTIONS.length + NUTRITION_MINI_GAME_QUESTIONS.length
    }`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
