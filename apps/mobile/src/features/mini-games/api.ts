import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { analytics } from "@/shared/analytics/posthog";
import { apiFetch } from "@/shared/api/client";

export type MiniGameSummary = {
  categoryId: string;
  slug: string;
  name: string;
  color: string;
  bestScore: number;
  gamesPlayed: number;
};

export type MiniGameChoice = {
  id: string;
  label: string;
  isCorrect: boolean;
};

export type MiniGameQuestion = {
  id: string;
  prompt: string;
  explanation: string;
  imageUrl: string | null;
  color: string | null;
  choices: MiniGameChoice[];
};

export type MiniGameQuestionSet = {
  categoryId: string;
  slug: string;
  name: string;
  color: string;
  questions: MiniGameQuestion[];
};

export type MiniGameResult = {
  score: number;
  bestScore: number;
  isNewRecord: boolean;
  gamesPlayed: number;
  correctCount: number;
  wrongCount: number;
  bestCombo: number;
  livesLost: number;
  lives: number;
  badgesEarned: Array<{
    code: string;
    name: string;
    description: string;
    icon: string;
  }>;
};

export type SubmitMiniGameInput = {
  categoryId: string;
  durationSec: number;
  correctCount: number;
  wrongCount: number;
  bestCombo: number;
  endedBy: "time" | "lives";
};

export function useMiniGames() {
  return useQuery({
    queryKey: ["mini-games"],
    queryFn: () => apiFetch<MiniGameSummary[]>("/mini-games"),
  });
}

export function useMiniGameQuestions(categoryId: string) {
  return useQuery({
    queryKey: ["mini-games", categoryId, "questions"],
    queryFn: () => {
      analytics.capture(analytics.events.MINIGAME_STARTED, {
        game: "flash-quiz",
        categoryId,
      });
      return apiFetch<MiniGameQuestionSet>(
        `/mini-games/${categoryId}/questions`,
      );
    },
    enabled: !!categoryId,
    // Un nouveau tirage à chaque partie plutôt qu'un pool mis en cache.
    staleTime: 0,
    gcTime: 0,
  });
}

export function useSubmitMiniGameResult() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, ...body }: SubmitMiniGameInput) =>
      apiFetch<MiniGameResult>(`/mini-games/${categoryId}/results`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: (data, variables) => {
      analytics.capture(analytics.events.MINIGAME_COMPLETED, {
        game: "flash-quiz",
        categoryId: variables.categoryId,
        score: data.score,
        durationSec: variables.durationSec,
        endedBy: variables.endedBy,
        isNewRecord: data.isNewRecord,
      });
      for (const badge of data.badgesEarned) {
        analytics.capture(analytics.events.BADGE_EARNED, { code: badge.code });
      }
      qc.invalidateQueries({ queryKey: ["mini-games"] });
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
