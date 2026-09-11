import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/features/auth/api";
import { ensureGuestSession } from "@/features/auth/ensureGuestSession";
import { hasCompletedOnboarding } from "@/features/onboarding/storage";
import { useSessionStore } from "@/shared/store/session";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

export default function LoginScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState(
    __DEV__ ? "demo@musclemind.app" : "",
  );
  const [password, setPassword] = useState(__DEV__ ? "Demo123!" : "");
  const [guestBusy, setGuestBusy] = useState(false);
  const login = useLogin();
  const setAuthenticated = useSessionStore((s) => s.setAuthenticated);

  async function continueAsGuest() {
    setGuestBusy(true);
    const ok = await ensureGuestSession();
    setGuestBusy(false);
    if (!ok) return;
    setAuthenticated(true);
    router.replace(
      hasCompletedOnboarding() ? "/(app)/home" : "/(app)/onboarding",
    );
  }

  return (
    <Screen>
      <Text className="mt-8 text-xs uppercase tracking-[3px] text-accent">
        Muscle Mind
      </Text>
      <Text className="mt-3 text-4xl font-semibold text-white">
        {t("auth:headlineLine1")}
        {"\n"}
        {t("auth:headlineLine2")}
      </Text>
      <Text className="mt-3 text-base text-muted">
        {t("auth:headlineBody")}
      </Text>

      <View className="mt-10 space-y-3 gap-3">
        <TextInput
          className="rounded-2xl border border-border bg-surface px-4 py-4 text-white"
          placeholder={t("auth:email")}
          placeholderTextColor="#8B95A8"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="rounded-2xl border border-border bg-surface px-4 py-4 text-white"
          placeholder={t("auth:password")}
          placeholderTextColor="#8B95A8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {login.error && (
        <Text className="mt-3 text-sm text-danger">
          {(login.error as Error).message}
        </Text>
      )}

      <View className="mt-6">
        <PrimaryButton
          label={login.isPending ? t("auth:loginLoading") : t("auth:loginCta")}
          disabled={login.isPending || guestBusy}
          onPress={() => {
            login.mutate(
              { email, password },
              {
                onSuccess: () => {
                  setAuthenticated(true);
                  router.replace("/(app)/home");
                },
              },
            );
          }}
        />
      </View>

      <Pressable
        onPress={() => void continueAsGuest()}
        disabled={guestBusy || login.isPending}
        className="mt-5 items-center py-2 active:opacity-70"
      >
        <Text className="text-accent">
          {guestBusy ? t("auth:guestPreparing") : t("auth:continueAsGuest")}
        </Text>
      </Pressable>

      <Link href="/(auth)/register" className="mt-4 text-center text-muted">
        {t("auth:goRegister")}
      </Link>
    </Screen>
  );
}
