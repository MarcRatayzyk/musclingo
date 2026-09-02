import { OFFLINE } from "../api/offline";
import { analytics } from "../analytics/posthog";
import { tokenStorage } from "../storage/mmkv";
import { useSessionStore } from "../store/session";

export function invalidateSession() {
  if (OFFLINE) {
    tokenStorage.setTokens("offline-access", "offline-refresh");
    return;
  }

  tokenStorage.clear();
  analytics.reset();
  useSessionStore.getState().setAuthenticated(false);
}
