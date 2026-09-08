import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/features/auth/api";
import { apiFetch } from "@/shared/api/client";
import {
  getClaimableStreakGoal,
  markStreakGoalClaimed,
} from "./storage";
import type { StreakGoalDays } from "./types";

type ClaimResult = {
  claimed: boolean;
  alreadyClaimed: boolean;
  neuroCoins: number;
  waterBottles: number;
};

/**
 * Si la streak courante atteint l’objectif onboarding, claim la récompense serveur.
 */
export function useStreakGoalClaim() {
  const { data: me } = useMe();
  const qc = useQueryClient();
  const attempted = useRef<StreakGoalDays | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (days: StreakGoalDays) =>
      apiFetch<ClaimResult>("/me/streak-goal/claim", {
        method: "POST",
        body: JSON.stringify({ days }),
      }),
    onSuccess: () => {
      markStreakGoalClaimed();
      void qc.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
      attempted.current = null;
    },
  });

  const streakCurrent = me?.streak?.current ?? 0;

  useEffect(() => {
    const claimable = getClaimableStreakGoal(streakCurrent);
    if (!claimable) return;
    if (attempted.current === claimable.days) return;
    if (isPending) return;
    attempted.current = claimable.days;
    mutate(claimable.days);
  }, [streakCurrent, isPending, mutate]);
}
