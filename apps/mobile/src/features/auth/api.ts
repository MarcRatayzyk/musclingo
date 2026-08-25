import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/client";
import { tokenStorage } from "@/shared/storage/mmkv";
import { analytics } from "@/shared/analytics/posthog";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type Me = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  role: string;
  xpTotal: number;
  level: number;
  memoryGameBestScore: number;
  xpProgress: {
    level: number;
    currentLevelXp: number;
    nextLevelXp: number;
    progress: number;
  };
  streak: {
    current: number;
    longest: number;
    lastActivityDate: string | null;
  };
  preferredCategory: {
    id: string;
    slug: string;
    name: string;
    color: string;
    icon: string;
  } | null;
  recentBadges: Array<{
    code: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: string;
  }>;
};

export function useMe(enabled = true) {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch<Me>("/me"),
    enabled: enabled && !!tokenStorage.getAccess(),
  });
}

export function useUpdatePreferredCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (preferredCategoryId: string) =>
      apiFetch<Me>("/me/preferred-category", {
        method: "PATCH",
        body: JSON.stringify({ preferredCategoryId }),
      }),
    onSuccess: (data) => {
      qc.setQueryData(["me"], data);
      qc.invalidateQueries({ queryKey: ["me"] });
      if (data.preferredCategory?.id) {
        qc.invalidateQueries({
          queryKey: ["categories", data.preferredCategory.id, "path"],
        });
      }
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      apiFetch<AuthTokens>("/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: (data: AuthTokens) => {
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      analytics.capture(analytics.events.LOGIN);
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      email: string;
      password: string;
      displayName: string;
    }) =>
      apiFetch<AuthTokens>("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: (data: AuthTokens) => {
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      analytics.capture(analytics.events.SIGNUP);
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function logout() {
  tokenStorage.clear();
  analytics.reset();
}
