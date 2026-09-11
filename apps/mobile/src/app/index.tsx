import { Redirect, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { hasCompletedOnboarding } from "@/features/onboarding/storage";
import { ensureGuestSession } from "@/features/auth/ensureGuestSession";
import { tokenStorage } from "@/shared/storage/mmkv";
import { useSessionStore } from "@/shared/store/session";
import { BootSkeleton } from "@/shared/ui/Skeleton";

export default function Index() {
  const hydrated = useSessionStore((s) => s.hasHydrated);
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
  const [bootstrapping, setBootstrapping] = useState(false);
  const [failed, setFailed] = useState(false);
  const [readyPath, setReadyPath] = useState<string | null>(null);

  const bootstrap = useCallback(async () => {
    setBootstrapping(true);
    setFailed(false);
    const ok = await ensureGuestSession();
    setBootstrapping(false);
    if (!ok) {
      setFailed(true);
      return;
    }
    setReadyPath(
      hasCompletedOnboarding() ? "/(app)/home" : "/(app)/onboarding",
    );
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (isAuthenticated && tokenStorage.getAccess()) {
      setReadyPath(
        hasCompletedOnboarding() ? "/(app)/home" : "/(app)/onboarding",
      );
      return;
    }
    void bootstrap();
  }, [hydrated, isAuthenticated, bootstrap]);

  if (!hydrated || bootstrapping || (!readyPath && !failed)) {
    return <BootSkeleton />;
  }

  if (failed) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-8">
        <Text className="text-center text-lg text-white">
          Impossible de démarrer la session
        </Text>
        <Text className="mt-2 text-center text-muted">
          Vérifie ta connexion et réessaie.
        </Text>
        <Pressable
          onPress={() => void bootstrap()}
          className="mt-8 rounded-2xl bg-accent px-8 py-4 active:opacity-90"
        >
          <Text className="font-semibold text-background">Réessayer</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/(auth)/login")}
          className="mt-4 py-2 active:opacity-70"
        >
          <Text className="text-muted">J’ai un compte</Text>
        </Pressable>
      </View>
    );
  }

  return <Redirect href={readyPath as "/(app)/home"} />;
}
