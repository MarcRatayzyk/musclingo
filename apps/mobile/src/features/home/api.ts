import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../shared/api/client";
import { analytics } from "../../shared/analytics/posthog";

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
  sessionId: string;
  xpReward: number;
  perfectBonusXp: number;
  questionCount: number;
  quizTimeSec: number;
  wrongPenaltySec: number;
  questions: Array<{
    id: string;
    prompt: string;
    choices: Array<{ id: string; label: string }>;
  }>;
  answerKeys: Record<string, string>;
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
    queryKey: ["categories"],
    queryFn: () => apiFetch<Category[]>("/categories"),
  });
}

export function useOngoingPaths() {
  return useQuery({
    queryKey: ["categories", "ongoing"],
    queryFn: () => apiFetch<OngoingPath[]>("/categories/ongoing"),
  });
}

export function useRecommendedLesson() {
  return useQuery({
    queryKey: ["lessons", "recommended"],
    queryFn: () => apiFetch<RecommendedLesson | null>("/lessons/recommended"),
  });
}

export function useLesson(id: string) {
  return useQuery({
    queryKey: ["lessons", id],
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
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["me"] }),
        qc.invalidateQueries({ queryKey: ["categories"] }),
        qc.invalidateQueries({ queryKey: ["lessons"] }),
        qc.invalidateQueries({ queryKey: ["quiz"] }),
      ]);
    },
  });
}

export function useQuizByLesson(lessonId: string) {
  return useQuery({
    queryKey: ["quiz", lessonId],
    queryFn: async () => {
      analytics.capture(analytics.events.QUIZ_STARTED, { lessonId });
      const raw = await apiFetch<QuizPayload & { questionTimeSec?: number }>(
        `/quizzes/by-lesson/${lessonId}`,
      );
      return normalizeQuizPayload(raw);
    },
    enabled: !!lessonId,
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
