import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../shared/api/client";

export type PathNodeState = "locked" | "available" | "completed";

export type PathLessonNode = {
  id: string;
  title: string;
  subtitle: string | null;
  durationSec: number;
  xpReward: number;
  order: number;
  difficulty: string;
  checkpointKey: string;
  checkpointTitle: string;
  checkpointOrder: number;
  state: PathNodeState;
  hasQuiz: boolean;
  bestScore: number | null;
  bestStars: 0 | 1 | 2 | 3 | null;
  passed: boolean;
  readingCompleted: boolean;
};

export type PathGateNode = {
  id: string;
  title: string;
  checkpointKey: string;
  checkpointOrder: number;
  state: PathNodeState;
  passed: boolean;
  timeLimitSec: number;
  passThreshold: number;
  questionCount: number;
  bestScore: number | null;
  xpReward: number;
};

export type CategoryPath = {
  id: string;
  slug: string;
  name: string;
  color: string;
  icon: string;
  passThreshold: number;
  gatePassThreshold: number;
  units: Array<{
    checkpointKey: string;
    checkpointOrder: number;
    label: string;
    difficulty: string;
    lessons: PathLessonNode[];
    gate: PathGateNode | null;
  }>;
};

export type CheckpointGatePayload = {
  id: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  timeLimitSec: number;
  passThreshold: number;
  questionCount: number;
  xpReward: number;
  questions: Array<{
    id: string;
    type: string;
    prompt: string;
    order: number;
    answers: Array<{ id: string; label: string; order: number }>;
  }>;
};

export function useCheckpointGate(gateId: string) {
  return useQuery({
    queryKey: ["checkpoint-gates", gateId],
    queryFn: () => apiFetch<CheckpointGatePayload>(`/checkpoint-gates/${gateId}`),
    enabled: !!gateId,
  });
}

export function useSubmitCheckpointGate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      gateId: string;
      answers: Array<{ questionId: string; selectedAnswerIds: string[] }>;
      timeSpentSec: number;
    }) =>
      apiFetch<{
        gateId: string;
        score: number;
        passed: boolean;
        passThreshold: number;
        correctCount: number;
        totalQuestions: number;
        timeSpentSec: number;
        xpEarned: number;
        xpTotal: number;
        level: number;
        nextGateId: string | null;
        nextLessonId: string | null;
        categoryId: string;
        feedback: Array<{
          questionId: string;
          isCorrect: boolean;
          explanation: string;
        }>;
      }>(`/checkpoint-gates/${input.gateId}/submit`, {
        method: "POST",
        body: JSON.stringify({
          answers: input.answers,
          timeSpentSec: input.timeSpentSec,
        }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useCategoryPath(categoryId: string) {
  return useQuery({
    queryKey: ["categories", categoryId, "path"],
    queryFn: () => apiFetch<CategoryPath>(`/categories/${categoryId}/path`),
    enabled: !!categoryId,
  });
}
