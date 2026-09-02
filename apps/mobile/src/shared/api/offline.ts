import {
  computeLessonQuizStars,
  getLessonQuizXpMultiplier,
  isLessonQuizPassed,
} from "@muscle-mind/types";

export const OFFLINE =
  process.env.EXPO_PUBLIC_OFFLINE === "1" ||
  process.env.EXPO_PUBLIC_OFFLINE === "true";

const CAT_ID = "offline_cat_anatomie";
const LESSON_1 = "offline_lesson_1";
const LESSON_2 = "offline_lesson_2";
const QUIZ_1 = "offline_quiz_1";
const GATE_1 = "offline_gate_1";
const Q1 = "offline_q1";
const Q2 = "offline_q2";
const A1 = "offline_a1";
const A2 = "offline_a2";
const A3 = "offline_a3";
const A4 = "offline_a4";
const GQ1 = "offline_gq1";
const GA1 = "offline_ga1";
const GA2 = "offline_ga2";
const MQ1 = "offline_mq1";
const MA1 = "offline_ma1";
const MA2 = "offline_ma2";

type OfflineState = {
  preferredCategoryId: string | null;
  lesson1Done: boolean;
  lesson2Done: boolean;
  quiz1Passed: boolean;
  quiz1BestStars: 0 | 1 | 2 | 3;
  gate1Passed: boolean;
  xpTotal: number;
  level: number;
  memoryBest: number;
  miniBest: number;
  miniPlayed: number;
  streak: number;
  quizSessionId: string;
  quizQuestionIds: string[];
};

const OFFLINE_SESSION = "offline_session_quiz";

const state: OfflineState = {
  preferredCategoryId: CAT_ID,
  lesson1Done: false,
  lesson2Done: false,
  quiz1Passed: false,
  quiz1BestStars: 0,
  gate1Passed: false,
  xpTotal: 40,
  level: 1,
  memoryBest: 0,
  miniBest: 0,
  miniPlayed: 0,
  streak: 1,
  quizSessionId: OFFLINE_SESSION,
  quizQuestionIds: [],
};

function categoryMeta() {
  return {
    id: CAT_ID,
    slug: "anatomie",
    name: "Anatomie",
    color: "#3D9CF0",
    icon: "corps",
  };
}

function me() {
  const nextLevelXp = 100;
  return {
    id: "offline_user",
    email: "demo@offline.local",
    displayName: "Démo Offline",
    avatarUrl: null,
    role: "USER",
    xpTotal: state.xpTotal,
    level: state.level,
    memoryGameBestScore: state.memoryBest,
    xpProgress: {
      level: state.level,
      currentLevelXp: state.xpTotal % nextLevelXp,
      nextLevelXp,
      progress: (state.xpTotal % nextLevelXp) / nextLevelXp,
    },
    streak: {
      current: state.streak,
      longest: Math.max(state.streak, 3),
      lastActivityDate: new Date().toISOString().slice(0, 10),
    },
    preferredCategory: state.preferredCategoryId ? categoryMeta() : null,
    recentBadges: [
      {
        code: "OFFLINE_DEMO",
        name: "Mode démo",
        description: "App native sans réseau",
        icon: "⭐",
        earnedAt: new Date().toISOString(),
      },
    ],
  };
}

function lessonNode(
  id: string,
  title: string,
  order: number,
  stateNode: "locked" | "available" | "completed",
  extras: Partial<{
    hasQuiz: boolean;
    passed: boolean;
    readingCompleted: boolean;
    bestScore: number | null;
    bestStars: 0 | 1 | 2 | 3 | null;
  }> = {},
) {
  return {
    id,
    title,
    subtitle: "Contenu local (hors ligne)",
    durationSec: 90,
    xpReward: 20,
    order,
    difficulty: "BEGINNER",
    checkpointKey: "unit_1",
    checkpointTitle: "Bases",
    checkpointOrder: 1,
    state: stateNode,
    hasQuiz: extras.hasQuiz ?? true,
    bestScore: extras.bestScore ?? null,
    bestStars: extras.bestStars ?? null,
    passed: extras.passed ?? false,
    readingCompleted: extras.readingCompleted ?? false,
  };
}

function categoryPath() {
  const l1State = state.lesson1Done ? "completed" : "available";
  const l2State = !state.lesson1Done
    ? "locked"
    : state.lesson2Done
      ? "completed"
      : "available";
  const gateState = state.gate1Passed
    ? "completed"
    : state.quiz1Passed
      ? "available"
      : "locked";

  return {
    id: CAT_ID,
    slug: "anatomie",
    name: "Anatomie",
    color: "#3D9CF0",
    icon: "corps",
    passThreshold: 70,
    gatePassThreshold: 70,
    units: [
      {
        checkpointKey: "unit_1",
        checkpointOrder: 1,
        label: "Bases du muscle",
        difficulty: "BEGINNER",
        lessons: [
          lessonNode(LESSON_1, "Qu'est-ce qu'un muscle ?", 1, l1State, {
            readingCompleted: state.lesson1Done,
            passed: state.quiz1Passed,
            bestScore: state.quiz1Passed ? 1 : null,
            bestStars: state.quiz1BestStars || null,
          }),
          lessonNode(LESSON_2, "Fibres et contraction", 2, l2State, {
            hasQuiz: false,
            readingCompleted: state.lesson2Done,
          }),
        ],
        gate: {
          id: GATE_1,
          title: "Checkpoint Bases",
          checkpointKey: "unit_1",
          checkpointOrder: 1,
          state: gateState,
          passed: state.gate1Passed,
          timeLimitSec: 60,
          passThreshold: 70,
          questionCount: 1,
          bestScore: state.gate1Passed ? 100 : null,
          xpReward: 30,
        },
      },
    ],
  };
}

function lessonDetail(id: string) {
  const isFirst = id === LESSON_1;
  return {
    id,
    title: isFirst ? "Qu'est-ce qu'un muscle ?" : "Fibres et contraction",
    subtitle: "Leçon démo hors ligne",
    markdown: isFirst
      ? `# Muscle Mind (offline)\n\nCette version native **n'appelle aucune URL**.\n\nUn muscle est un tissu capable de se **contracter** pour produire un mouvement.\n\n## À retenir\n- Agoniste / antagoniste\n- Contraction volontaire\n- Rôle des tendons`
      : `# Fibres musculaires\n\nIl existe des fibres **lentes** (endurance) et **rapides** (puissance).\n\nTout le contenu est embarqué localement — aucun serveur requis.`,
    durationSec: 90,
    difficulty: "BEGINNER",
    illustrationUrl: null,
    tags: ["offline", "démo"],
    sources: [],
    xpReward: 20,
    category: categoryMeta(),
    quizId: isFirst ? QUIZ_1 : null,
    progress: {
      status: (isFirst ? state.lesson1Done : state.lesson2Done)
        ? "COMPLETED"
        : "NOT_STARTED",
      completedAt: null,
    },
  };
}

const OFFLINE_QUIZ_POOL: Array<{
  id: string;
  prompt: string;
  explanation: string;
  correctId: string;
  choices: Array<{ id: string; label: string }>;
}> = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  const correctId = `offline_ca${n}`;
  return {
    id: `mini:offline_mq${n}`,
    prompt:
      n % 2 === 1
        ? `Question ${n} : un muscle produit principalement un mouvement.`
        : `Question ${n} : les tendons relient le muscle à l'os.`,
    explanation: "Réponse démo hors ligne.",
    correctId,
    choices: [
      { id: correctId, label: n % 2 === 1 ? "Vrai" : "Vrai" },
      {
        id: `offline_cw${n}`,
        label: n % 2 === 1 ? "Faux" : "Faux",
      },
    ],
  };
});

function quizPayload() {
  state.quizQuestionIds = OFFLINE_QUIZ_POOL.map((q) => q.id);
  const answerKeys = Object.fromEntries(
    OFFLINE_QUIZ_POOL.map((q) => [q.id, q.correctId]),
  );
  return {
    id: QUIZ_1,
    lessonId: LESSON_1,
    lessonTitle: "Qu'est-ce qu'un muscle ?",
    sessionId: OFFLINE_SESSION,
    xpReward: 15,
    perfectBonusXp: 5,
    questionCount: 10,
    quizTimeSec: 60,
    wrongPenaltySec: 1,
    questions: OFFLINE_QUIZ_POOL.map(({ id, prompt, choices }) => ({
      id,
      prompt,
      choices,
    })),
    answerKeys,
  };
}

function offlineCheckAnswer(
  questionId: string,
  selectedAnswerIds: string[],
): boolean {
  const q = OFFLINE_QUIZ_POOL.find((item) => item.id === questionId);
  if (!q) return false;
  return selectedAnswerIds[0] === q.correctId;
}

function parseBody(init?: RequestInit): Record<string, unknown> {
  if (!init?.body || typeof init.body !== "string") return {};
  try {
    return JSON.parse(init.body) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export async function offlineFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const method = (init?.method ?? "GET").toUpperCase();
  const body = parseBody(init);

  // Auth
  if (path === "/auth/login" || path === "/auth/register") {
    return {
      accessToken: "offline-access",
      refreshToken: "offline-refresh",
    } as T;
  }
  if (path === "/auth/refresh") {
    return {
      accessToken: "offline-access",
      refreshToken: "offline-refresh",
    } as T;
  }

  if (path === "/me" && method === "GET") {
    return me() as T;
  }

  if (path === "/me/preferred-category" && method === "PATCH") {
    state.preferredCategoryId =
      (body.preferredCategoryId as string) ?? CAT_ID;
    return me() as T;
  }

  if (path === "/me/memory-game/score" && method === "POST") {
    const score = Number(body.score ?? 0);
    const isNewRecord = score > state.memoryBest;
    if (isNewRecord) state.memoryBest = score;
    return { bestScore: state.memoryBest, isNewRecord } as T;
  }

  if (path === "/categories" && method === "GET") {
    const completed =
      Number(state.lesson1Done) + Number(state.lesson2Done);
    return [
      {
        ...categoryMeta(),
        lessonCount: 2,
        completedCount: completed,
        xp: state.xpTotal,
        level: state.level,
        progress: completed / 2,
      },
    ] as T;
  }

  if (path === "/categories/ongoing" && method === "GET") {
    return [
      {
        category: { ...categoryMeta(), order: 0 },
        lessonCount: 2,
        completedCount: Number(state.lesson1Done) + Number(state.lesson2Done),
        progress:
          (Number(state.lesson1Done) + Number(state.lesson2Done)) / 2,
        lastActivityAt: new Date().toISOString(),
        nextLesson: {
          id: state.lesson1Done ? LESSON_2 : LESSON_1,
          title: state.lesson1Done
            ? "Fibres et contraction"
            : "Qu'est-ce qu'un muscle ?",
          subtitle: "Contenu local",
          durationSec: 90,
          xpReward: 20,
          difficulty: "BEGINNER",
        },
      },
    ] as T;
  }

  if (path === "/lessons/recommended" && method === "GET") {
    return {
      id: LESSON_1,
      title: "Qu'est-ce qu'un muscle ?",
      subtitle: "Leçon démo",
      durationSec: 90,
      difficulty: "BEGINNER",
      xpReward: 20,
      illustrationUrl: null,
      category: categoryMeta(),
    } as T;
  }

  const lessonMatch = path.match(/^\/lessons\/([^/]+)$/);
  if (lessonMatch && method === "GET") {
    return lessonDetail(lessonMatch[1]) as T;
  }

  const completeMatch = path.match(/^\/lessons\/([^/]+)\/complete$/);
  if (completeMatch && method === "POST") {
    const id = completeMatch[1];
    if (id === LESSON_1) {
      state.lesson1Done = true;
      state.xpTotal += 20;
      return { quizId: QUIZ_1, nextLessonId: LESSON_2 } as T;
    }
    if (id === LESSON_2) {
      state.lesson2Done = true;
      state.xpTotal += 20;
      return { quizId: null, nextLessonId: null } as T;
    }
    return { quizId: null, nextLessonId: null } as T;
  }

  const quizByLesson = path.match(/^\/quizzes\/by-lesson\/([^/]+)$/);
  if (quizByLesson && method === "GET") {
    return quizPayload() as T;
  }

  const quizCheck = path.match(/^\/quizzes\/([^/]+)\/check-answer$/);
  if (quizCheck && method === "POST") {
    const questionId = String(body.questionId ?? "");
    const selected = (body.selectedAnswerIds as string[]) ?? [];
    return {
      correct: offlineCheckAnswer(questionId, selected),
    } as T;
  }

  const quizSubmit = path.match(/^\/quizzes\/([^/]+)\/submit$/);
  if (quizSubmit && method === "POST") {
    const answers =
      (body.answers as Array<{
        questionId: string;
        selectedAnswerIds: string[];
        timeSpentSec: number;
      }>) ?? [];
    const totalTimeSpentSec = Number(body.totalTimeSpentSec ?? 0);
    let correct = 0;
    const feedback = state.quizQuestionIds.map((questionId) => {
      const selected =
        answers.find((a) => a.questionId === questionId)?.selectedAnswerIds ??
        [];
      const isCorrect = offlineCheckAnswer(questionId, selected);
      if (isCorrect) correct += 1;
      const q = OFFLINE_QUIZ_POOL.find((item) => item.id === questionId);
      return {
        questionId,
        isCorrect,
        explanation: q?.explanation ?? "",
        correctAnswerIds: q ? [q.correctId] : [],
        timeSpentSec:
          answers.find((a) => a.questionId === questionId)?.timeSpentSec ?? 0,
      };
    });
    const allCorrect = correct === state.quizQuestionIds.length;
    const stars = allCorrect
      ? computeLessonQuizStars(totalTimeSpentSec)
      : 0;
    const passed = allCorrect && isLessonQuizPassed(stars);
    const score = correct / Math.max(1, state.quizQuestionIds.length);
    const perfect = stars === 3;
    const xpEarned = passed
      ? Math.round(15 * getLessonQuizXpMultiplier(stars)) + (perfect ? 5 : 0)
      : 0;
    if (passed) {
      state.quiz1Passed = true;
      state.quiz1BestStars = Math.max(
        state.quiz1BestStars,
        stars,
      ) as 0 | 1 | 2 | 3;
      state.xpTotal += xpEarned;
    }
    return {
      score,
      perfect,
      passed,
      stars,
      timeSpentSec: totalTimeSpentSec,
      nextLessonId: passed ? LESSON_2 : null,
      categoryId: CAT_ID,
      xpEarned,
      level: state.level,
      xpTotal: state.xpTotal,
      feedback,
      badges: [],
      streak: { current: state.streak, longest: 3 },
    } as T;
  }

  const pathMatch = path.match(/^\/categories\/([^/]+)\/path$/);
  if (pathMatch && method === "GET") {
    return categoryPath() as T;
  }

  const gateGet = path.match(/^\/checkpoint-gates\/([^/]+)$/);
  if (gateGet && method === "GET") {
    return {
      id: GATE_1,
      title: "Checkpoint Bases",
      categorySlug: "anatomie",
      categoryName: "Anatomie",
      timeLimitSec: 60,
      passThreshold: 70,
      questionCount: 1,
      xpReward: 30,
      questions: [
        {
          id: GQ1,
          type: "SINGLE",
          prompt: "Les tendons relient…",
          order: 0,
          answers: [
            { id: GA1, label: "Le muscle à l'os", order: 0 },
            { id: GA2, label: "Deux os entre eux", order: 1 },
          ],
        },
      ],
    } as T;
  }

  const gateSubmit = path.match(/^\/checkpoint-gates\/([^/]+)\/submit$/);
  if (gateSubmit && method === "POST") {
    const answers = (body.answers as Array<{
      questionId: string;
      selectedAnswerIds: string[];
    }>) ?? [];
    const ok = answers.some(
      (a) => a.questionId === GQ1 && a.selectedAnswerIds[0] === GA1,
    );
    const score = ok ? 100 : 0;
    const passed = score >= 70;
    if (passed) {
      state.gate1Passed = true;
      state.xpTotal += 30;
    }
    return {
      gateId: GATE_1,
      score,
      passed,
      passThreshold: 70,
      correctCount: ok ? 1 : 0,
      totalQuestions: 1,
      timeSpentSec: Number(body.timeSpentSec ?? 10),
      xpEarned: passed ? 30 : 0,
      xpTotal: state.xpTotal,
      level: state.level,
      nextGateId: null,
      nextLessonId: null,
      categoryId: CAT_ID,
      feedback: [
        {
          questionId: GQ1,
          isCorrect: ok,
          explanation: ok ? "Exact." : "Le tendon relie muscle et os.",
        },
      ],
    } as T;
  }

  if (path === "/mini-games" && method === "GET") {
    return [
      {
        categoryId: CAT_ID,
        slug: "anatomie",
        name: "Anatomie",
        color: "#3D9CF0",
        bestScore: state.miniBest,
        gamesPlayed: state.miniPlayed,
      },
    ] as T;
  }

  const miniQ = path.match(/^\/mini-games\/([^/]+)\/questions$/);
  if (miniQ && method === "GET") {
    return {
      categoryId: CAT_ID,
      slug: "anatomie",
      name: "Anatomie",
      color: "#3D9CF0",
      questions: [
        {
          id: MQ1,
          prompt: "Le biceps brachial fléchit le coude.",
          explanation: "Oui, c'est son action principale.",
          imageUrl: null,
          color: "#3D9CF0",
          choices: [
            { id: MA1, label: "Vrai", isCorrect: true },
            { id: MA2, label: "Faux", isCorrect: false },
          ],
        },
        {
          id: "offline_mq2",
          prompt: "Le triceps est un muscle du mollet.",
          explanation: "Non, il est à l'arrière du bras.",
          imageUrl: null,
          color: "#3D9CF0",
          choices: [
            { id: "offline_ma3", label: "Vrai", isCorrect: false },
            { id: "offline_ma4", label: "Faux", isCorrect: true },
          ],
        },
      ],
    } as T;
  }

  const miniResult = path.match(/^\/mini-games\/([^/]+)\/results$/);
  if (miniResult && method === "POST") {
    const correctCount = Number(body.correctCount ?? 0);
    const durationSec = Number(body.durationSec ?? 60) || 60;
    const score = Math.round((correctCount * 60) / durationSec);
    const isNewRecord = score > state.miniBest;
    if (isNewRecord) state.miniBest = score;
    state.miniPlayed += 1;
    return {
      score,
      bestScore: state.miniBest,
      isNewRecord,
      gamesPlayed: state.miniPlayed,
      correctCount,
      wrongCount: Number(body.wrongCount ?? 0),
      bestCombo: Number(body.bestCombo ?? 0),
      livesLost: Number(body.wrongCount ?? 0),
      lives: 3,
      badgesEarned: [],
    } as T;
  }

  throw new Error(`[offline] endpoint non mocké: ${method} ${path}`);
}
