import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useClaimAccount, useMe, useRegister } from "@/features/auth/api";
import { useSessionStore } from "@/shared/store/session";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: me } = useMe();
  const register = useRegister();
  const claim = useClaimAccount();
  const setAuthenticated = useSessionStore((s) => s.setAuthenticated);

  const isGuest = !!me?.isGuest;
  const pending = register.isPending || claim.isPending;
  const error = register.error || claim.error;

  function onSubmit() {
    const body = { email, password, displayName };
    if (isGuest) {
      claim.mutate(body, {
        onSuccess: () => {
          setAuthenticated(true);
          router.replace("/(app)/home");
        },
      });
      return;
    }
    register.mutate(body, {
      onSuccess: () => {
        setAuthenticated(true);
        router.replace("/(app)/onboarding");
      },
    });
  }

  return (
    <Screen>
      <Text className="mt-8 text-xs uppercase tracking-[3px] text-accent">
        {isGuest ? t("auth:saveTag") : t("auth:registerTag")}
      </Text>
      <Text className="mt-3 text-4xl font-semibold text-white">
        {isGuest ? t("auth:saveProgressTitle") : t("auth:registerHeadline")}
      </Text>
      {isGuest ? (
        <Text className="mt-3 text-base text-muted">
          {t("auth:registerGuestBody")}
        </Text>
      ) : null}

      <View className="mt-10 gap-3">
        <TextInput
          className="rounded-2xl border border-border bg-surface px-4 py-4 text-white"
          placeholder={t("auth:displayName")}
          placeholderTextColor="#8B95A8"
          value={displayName}
          onChangeText={setDisplayName}
        />
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
          placeholder={t("auth:passwordMin")}
          placeholderTextColor="#8B95A8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error && (
        <Text className="mt-3 text-sm text-danger">
          {(error as Error).message}
        </Text>
      )}

      <View className="mt-6">
        <PrimaryButton
          label={
            pending
              ? t("auth:registerLoading")
              : isGuest
                ? t("auth:saveProgressCta")
                : t("auth:registerCta")
          }
          disabled={pending}
          onPress={onSubmit}
        />
      </View>

      <Link href="/(auth)/login" className="mt-6 text-center text-muted">
        {t("auth:hasAccount")} {t("auth:goLogin")}
      </Link>
    </Screen>
  );
}
