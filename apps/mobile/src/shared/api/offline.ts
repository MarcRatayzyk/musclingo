/**
 * Mode 100 % offline : aucune requête réseau.
 * Contenu démo local pour parcourir l'app sur un APK natif.
 */

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
  gate1Passed: boolean;
  xpTotal: number;
  level: number;
  memoryBest: number;
  miniBest: number;
  miniPlayed: number;
  streak: number;
};

const state: OfflineState = {
  preferredCategoryId: CAT_ID,
  lesson1Done: false,
  lesson2Done: false,
  quiz1Passed: false,
  gate1Passed: false,
  xpTotal: 40,
  level: 1,
  memoryBest: 0,
  miniBest: 0,
  miniPlayed: 0,
  streak: 1,
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
            bestScore: state.quiz1Passed ? 100 : null,
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

function quizPayload() {
  return {
    id: QUIZ_1,
    lessonId: LESSON_1,
    lessonTitle: "Qu'est-ce qu'un muscle ?",
    xpReward: 15,
    perfectBonusXp: 5,
    questions: [
      {
        id: Q1,
        type: "SINGLE",
        prompt: "Un muscle sert principalement à…",
        order: 0,
        payload: null,
        answers: [
          { id: A1, label: "Produire un mouvement", order: 0 },
          { id: A2, label: "Digérer les aliments", order: 1 },
        ],
      },
      {
        id: Q2,
        type: "TRUE_FALSE",
        prompt: "Les tendons relient le muscle à l'os.",
        order: 1,
        payload: null,
        answers: [
          { id: A3, label: "Vrai", order: 0 },
          { id: A4, label: "Faux", order: 1 },
        ],
      },
    ],
  };
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

  const quizSubmit = path.match(/^\/quizzes\/([^/]+)\/submit$/);
  if (quizSubmit && method === "POST") {
    const answers = (body.answers as Array<{
      questionId: string;
      selectedAnswerIds: string[];
    }>) ?? [];
    const correctMap: Record<string, string> = { [Q1]: A1, [Q2]: A3 };
    let correct = 0;
    const feedback = Object.keys(correctMap).map((questionId) => {
      const selected =
        answers.find((a) => a.questionId === questionId)?.selectedAnswerIds ??
        [];
      const isCorrect = selected[0] === correctMap[questionId];
      if (isCorrect) correct += 1;
      return {
        questionId,
        isCorrect,
        explanation: isCorrect ? "Bonne réponse." : "Revois la leçon.",
        correctAnswerIds: [correctMap[questionId]],
      };
    });
    const score = Math.round((correct / 2) * 100);
    const passed = score >= 70;
    if (passed) {
      state.quiz1Passed = true;
      state.xpTotal += score === 100 ? 20 : 15;
    }
    return {
      score,
      perfect: score === 100,
      passed,
      passThreshold: 70,
      nextLessonId: LESSON_2,
      categoryId: CAT_ID,
      xpEarned: passed ? (score === 100 ? 20 : 15) : 0,
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
