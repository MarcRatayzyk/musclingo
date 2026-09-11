import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recordLessonCompletion } from "../retention/storage";
import { apiFetch } from "../../shared/api/client";
import { analytics } from "../../shared/analytics/posthog";
import { getAppLocale } from "@/i18n";

export type Category = {
  id: string;
  slug: string;
  name: string;
  color: string;
  icon: string;
  lessonCount: number;
  completedCount: number;
  xp: number;
  level: number;
  progress: number;
};

export type RecommendedLesson = {
  id: string;
  title: string;
  subtitle: string | null;
  durationSec: number;
  difficulty: string;
  xpReward: number;
  illustrationUrl: string | null;
  category: {
    id: string;
    name: string;
    color: string;
    slug: string;
    icon: string;
  };
};

export type LessonDetail = {
  id: string;
  title: string;
  subtitle: string | null;
  markdown: string;
  durationSec: number;
  difficulty: string;
  illustrationUrl: string | null;
  tags: string[];
  sources: string[];
  xpReward: number;
  order: number;
  category: RecommendedLesson["category"];
  quizId: string | null;
  progress: { status: string; completedAt: string | null } | null;
};

export type QuizPayload = {
  id: string;
  lessonId: string;
  lessonTitle: string;
  categorySlug?: string;
  sessionId: string;
  xpReward: number;
  perfectBonusXp: number;
  questionCount: number;
  quizTimeSec: number;
  wrongPenaltySec: number;
  extraTimeUsed?: boolean;
  extraTimeCharges?: number;
  quizHints?: number;
  starThresholds?: { three: number; two: number; one: number };
  questions: Array<{
    id: string;
    prompt: string;
    type?: "SINGLE" | "TRUE_FALSE" | "MULTI" | "ORDER" | "MATCH";
    imageUrl?: string | null;
    choices: Array<{
      id: string;
      label: string;
      matchKey?: string | null;
      order?: number;
    }>;
  }>;
  answerKeys: Record<string, string>;
  isRetry?: boolean;
  waterBottleRetryCost?: number;
  waterBottles?: number;
};

/** Compat API ancienne (`questionTimeSec`) et offline. */
export function normalizeQuizPayload(
  raw: QuizPayload & { questionTimeSec?: number },
): QuizPayload {
  return {
    ...raw,
    quizTimeSec: raw.quizTimeSec ?? raw.questionTimeSec ?? 60,
    wrongPenaltySec: raw.wrongPenaltySec ?? 1,
  };
}

export type OngoingPath = {
  category: {
    id: string;
    slug: string;
    name: string;
    color: string;
    icon: string;
    order: number;
  };
  lessonCount: number;
  completedCount: number;
  progress: number;
  lastActivityAt: string | null;
  nextLesson: {
    id: string;
    title: string;
    subtitle: string | null;
    durationSec: number;
    xpReward: number;
    difficulty: string;
  };
};

export function useCategories() {
  return useQuery({
    queryKey: ["categories", getAppLocale()],
    queryFn: () => apiFetch<Category[]>("/categories"),
  });
}

export function useOngoingPaths() {
  return useQuery({
    queryKey: ["categories", "ongoing", getAppLocale()],
    queryFn: () => apiFetch<OngoingPath[]>("/categories/ongoing"),
  });
}

export function useRecommendedLesson() {
  return useQuery({
    queryKey: ["lessons", "recommended", getAppLocale()],
    queryFn: () => apiFetch<RecommendedLesson | null>("/lessons/recommended"),
  });
}

export function useLesson(id: string) {
  return useQuery({
    queryKey: ["lessons", id, getAppLocale()],
    queryFn: () => {
      analytics.capture(analytics.events.LESSON_OPENED, { lessonId: id });
      return apiFetch<LessonDetail>(`/lessons/${id}`);
    },
    enabled: !!id,
  });
}

export function useCompleteLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      readingTimeSec,
    }: {
      id: string;
      readingTimeSec?: number;
    }) =>
      apiFetch<{
        quizId: string | null;
        nextLessonId: string | null;
      }>(`/lessons/${id}/complete`, {
        method: "POST",
        body: JSON.stringify({ readingTimeSec }),
      }),
    onSuccess: async (_data, vars) => {
      analytics.capture(analytics.events.LESSON_COMPLETED, {
        lessonId: vars.id,
      });
      recordLessonCompletion();
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["me"] }),
        qc.invalidateQueries({ queryKey: ["categories"] }),
        qc.invalidateQueries({ queryKey: ["lessons"] }),
        qc.invalidateQueries({ queryKey: ["quiz"] }),
      ]);
    },
  });
}

export type StartLessonResult = {
  lessonId: string;
  alreadyRead: boolean;
  consumed: number;
  waterBottles: number;
  waterBottlesMax: number;
  waterBottleCost: number;
  starsTotal: number;
};

export function useStartLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<StartLessonResult>(`/lessons/${id}/start`, {
        method: "POST",
        body: JSON.stringify({}),
      }),
    onSuccess: async (data) => {
      qc.setQueryData(["me"], (prev: unknown) => {
        if (!prev || typeof prev !== "object") return prev;
        return {
          ...prev,
          waterBottles: data.waterBottles,
          waterBottlesMax: data.waterBottlesMax,
          waterBottleCost: data.waterBottleCost,
          starsTotal: data.starsTotal,
        };
      });
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useQuizByLesson(
  lessonId: string,
  opts?: { enabled?: boolean; useExtraTime?: boolean },
) {
  const qc = useQueryClient();
  const enabled = opts?.enabled !== false && !!lessonId;
  const useExtraTime = !!opts?.useExtraTime;
  return useQuery({
    queryKey: ["quiz", lessonId, useExtraTime ? "extra" : "base"],
    queryFn: async () => {
      analytics.capture(analytics.events.QUIZ_STARTED, { lessonId });
      const qs = useExtraTime ? "?useExtraTime=true" : "";
      const raw = await apiFetch<QuizPayload & { questionTimeSec?: number }>(
        `/quizzes/by-lesson/${lessonId}${qs}`,
      );
      const normalized = normalizeQuizPayload(raw);
      qc.setQueryData(["me"], (prev: unknown) => {
        if (!prev || typeof prev !== "object") return prev;
        return {
          ...prev,
          ...(typeof normalized.waterBottles === "number"
            ? { waterBottles: normalized.waterBottles }
            : {}),
          ...(typeof normalized.extraTimeCharges === "number"
            ? { extraTimeCharges: normalized.extraTimeCharges }
            : {}),
          ...(typeof normalized.quizHints === "number"
            ? { quizHints: normalized.quizHints }
            : {}),
        };
      });
      void qc.invalidateQueries({ queryKey: ["me"] });
      return normalized;
    },
    enabled,
    retry: false,
  });
}

export function useQuizHint() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      quizId: string;
      sessionId: string;
      questionId: string;
    }) =>
      apiFetch<{
        kind: "eliminate" | "orderReveal" | "matchReveal";
        eliminatedChoiceIds: string[];
        revealedAnswerId?: string;
        revealedOrderIndex?: number;
        revealedRightId?: string;
        quizHints: number;
      }>(`/quizzes/${input.quizId}/hint`, {
        method: "POST",
        body: JSON.stringify({
          sessionId: input.sessionId,
          questionId: input.questionId,
        }),
      }),
    onSuccess: (data) => {
      qc.setQueryData(["me"], (prev: unknown) => {
        if (!prev || typeof prev !== "object") return prev;
        return { ...prev, quizHints: data.quizHints };
      });
    },
  });
}

export function useSubmitQuiz() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      quizId,
      sessionId,
      answers,
      totalTimeSpentSec,
    }: {
      quizId: string;
      sessionId: string;
      answers: Array<{
        questionId: string;
        selectedAnswerIds: string[];
        timeSpentSec: number;
      }>;
      totalTimeSpentSec: number;
    }) =>
      apiFetch(`/quizzes/${quizId}/submit`, {
        method: "POST",
        body: JSON.stringify({ sessionId, answers, totalTimeSpentSec }),
      }) as Promise<{
        score: number;
        perfect: boolean;
        passed: boolean;
        stars: 0 | 1 | 2 | 3;
        starsGained?: number;
        neuroCoinsEarned?: number;
        timeSpentSec: number;
        nextLessonId: string | null;
        categoryId: string;
        xpEarned: number;
        level: number;
        xpTotal: number;
        feedback: Array<{
          questionId: string;
          isCorrect: boolean;
          explanation: string;
          correctAnswerIds: string[];
          timeSpentSec: number;
        }>;
        badges: Array<{ code: string; name: string }>;
        streak: { current: number; longest: number };
      }>,
    onSuccess: async (data, vars) => {
      analytics.capture(analytics.events.QUIZ_COMPLETED, {
        quizId: vars.quizId,
        score: data.score,
        stars: data.stars,
      });
      analytics.capture(
        data.passed
          ? analytics.events.QUIZ_PASSED
          : analytics.events.QUIZ_FAILED,
        { quizId: vars.quizId },
      );
      analytics.capture(analytics.events.XP_EARNED, { amount: data.xpEarned });
      analytics.capture(analytics.events.STREAK_UPDATED, {
        current: data.streak.current,
      });
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["me"] }),
        qc.invalidateQueries({ queryKey: ["categories"] }),
        qc.invalidateQueries({ queryKey: ["lessons"] }),
        qc.invalidateQueries({ queryKey: ["quiz"] }),
      ]);
    },
  });
}
