import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/client";

export type MemoryGameScoreResult = {
  bestScore: number;
  isNewRecord: boolean;
};

export function useSubmitMemoryGameScore() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (score: number) =>
      apiFetch<MemoryGameScoreResult>("/me/memory-game/score", {
        method: "POST",
        body: JSON.stringify({ score }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
