import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { tokenStorage } from "../storage/mmkv";
import { useSessionStore } from "../store/session";
import { analytics } from "../analytics/posthog";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  const setAuthenticated = useSessionStore((s) => s.setAuthenticated);
  const setHydrated = useSessionStore((s) => s.setHydrated);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void (async () => {
      await tokenStorage.hydrate();
      const hasToken = !!tokenStorage.getAccess();
      setAuthenticated(hasToken);
      setHydrated(true);
      setReady(true);
      analytics.capture(analytics.events.SESSION_START);

    const key = process.env.EXPO_PUBLIC_POSTHOG_KEY;
    if (key) {
      // Lazy stub host for PostHog — full native SDK wired when key present.
      (globalThis as { __posthog?: { capture: Function; identify: Function; reset: Function } }).__posthog = {
        capture: (event: string, props?: object) => {
          void fetch(
            `${process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com"}/capture/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                api_key: key,
                event,
                properties: { ...props, distinct_id: "anon" },
              }),
            },
          ).catch(() => undefined);
        },
        identify: () => undefined,
        reset: () => undefined,
      };
    }
    })();
  }, [setAuthenticated, setHydrated]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GestureHandlerRootView>
  );
}
