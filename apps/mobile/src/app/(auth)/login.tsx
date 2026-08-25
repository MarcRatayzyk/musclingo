import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useLogin } from "@/features/auth/api";
import { useSessionStore } from "@/shared/store/session";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

export default function LoginScreen() {
  const [email, setEmail] = useState(
    __DEV__ ? "demo@musclemind.app" : "",
  );
  const [password, setPassword] = useState(__DEV__ ? "Demo123!" : "");
  const login = useLogin();
  const setAuthenticated = useSessionStore((s) => s.setAuthenticated);

  return (
    <Screen>
      <Text className="mt-8 text-xs uppercase tracking-[3px] text-accent">
        Muscle Mind
      </Text>
      <Text className="mt-3 text-4xl font-semibold text-white">
        Apprends entre{"\n"}deux séries
      </Text>
      <Text className="mt-3 text-base text-muted">
        Micro-leçons scientifiques pendant ton repos.
      </Text>

      <View className="mt-10 space-y-3 gap-3">
        <TextInput
          className="rounded-2xl border border-border bg-surface px-4 py-4 text-white"
          placeholder="Email"
          placeholderTextColor="#8B95A8"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="rounded-2xl border border-border bg-surface px-4 py-4 text-white"
          placeholder="Mot de passe"
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
          label={login.isPending ? "Connexion…" : "Se connecter"}
          disabled={login.isPending}
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

      <Link href="/(auth)/register" className="mt-6 text-center text-muted">
        Créer un compte
      </Link>
    </Screen>
  );
}
