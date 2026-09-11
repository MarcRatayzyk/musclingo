import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/client";
import { invalidateSession } from "@/shared/auth/session";
import { tokenStorage } from "@/shared/storage/mmkv";
import { analytics } from "@/shared/analytics/posthog";
import type { AppLocale } from "@/i18n/localeStorage";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type Me = {
  id: string;
  email: string | null;
  isGuest?: boolean;
  displayName: string;
  avatarUrl: string | null;
  role: string;
  locale?: "fr" | "en";
  xpTotal: number;
  level: number;
  memoryGameBestScore: number;
  starsTotal: number;
  /** @deprecated Conservé pour compat — utiliser neuroCoinBalance. */
  starBalance: number;
  neuroCoinBalance: number;
  waterBottles: number;
  waterBottlesMax: number;
  waterBottleCost: number;
  quizHints: number;
  extraTimeCharges: number;
  streakFreezes: number;
  claimedLevels?: number[];
  levelRoadmap?: Array<{
    level: number;
    rewards: Array<{
      kind:
        | "neuroCoins"
        | "waterBottles"
        | "quizHint"
        | "extraTime"
        | "streakFreeze";
      amount: number;
    }>;
    claimed: boolean;
  }>;
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

function identifyFromMe(me: Me) {
  if (!me?.id) return;
  analytics.identify(me.id, {
    email: me.email,
    displayName: me.displayName,
    isGuest: me.isGuest ?? false,
  });
}

export function useMe(enabled = true) {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const me = await apiFetch<Me>("/me");
      identifyFromMe(me);
      if (me.locale === "en" || me.locale === "fr") {
        const { setAppLocale, getAppLocale } = await import("@/i18n");
        if (getAppLocale() !== me.locale) {
          await setAppLocale(me.locale);
        }
      }
      return me;
    },
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

/** Efface preferredCategory pour rejouer l’onboarding. */
export function useClearPreferredCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiFetch<Me>("/me/preferred-category", {
        method: "DELETE",
      }),
    onSuccess: (data) => {
      qc.setQueryData(["me"], data);
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateLocale() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (locale: AppLocale) =>
      apiFetch<Me>("/me/locale", {
        method: "PATCH",
        body: JSON.stringify({ locale }),
      }),
    onSuccess: (data) => {
      qc.setQueryData(["me"], data);
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["shop"] });
      qc.invalidateQueries({ queryKey: ["mini-games"] });
      qc.invalidateQueries({ queryKey: ["lessons"] });
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

/** Upgrade guest session → full account (keeps server progress). */
export function useClaimAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      email: string;
      password: string;
      displayName: string;
    }) =>
      apiFetch<AuthTokens>("/auth/claim", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: (data: AuthTokens) => {
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      analytics.capture(analytics.events.CLAIM_COMPLETED);
      analytics.capture(analytics.events.SIGNUP);
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function logout() {
  invalidateSession();
}
