import { apiFetch } from "@/shared/api/client";
import { OFFLINE } from "@/shared/api/offline";
import { analytics } from "@/shared/analytics/posthog";
import { tokenStorage } from "@/shared/storage/mmkv";
import { useSessionStore } from "@/shared/store/session";
import type { AuthTokens } from "./api";

/**
 * Ensures a usable session. Offline: local tokens.
 * Online without tokens: creates a guest account.
 * Idempotent when tokens already exist.
 */
export async function ensureGuestSession(): Promise<boolean> {
  if (OFFLINE) {
    tokenStorage.setTokens("offline-access", "offline-refresh");
    useSessionStore.getState().setAuthenticated(true);
    return true;
  }

  if (tokenStorage.getAccess()) {
    useSessionStore.getState().setAuthenticated(true);
    return true;
  }

  try {
    const tokens = await apiFetch<AuthTokens>("/auth/guest", {
      method: "POST",
      body: "{}",
    });
    tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
    useSessionStore.getState().setAuthenticated(true);
    analytics.capture(analytics.events.GUEST_SESSION_STARTED);
    return true;
  } catch {
    return false;
  }
}
