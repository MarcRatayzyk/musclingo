import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useRegister } from "@/features/auth/api";
import { useSessionStore } from "@/shared/store/session";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

export default function RegisterScreen() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = useRegister();
  const setAuthenticated = useSessionStore((s) => s.setAuthenticated);

  return (
    <Screen>
      <Text className="mt-8 text-xs uppercase tracking-[3px] text-accent">
        Inscription
      </Text>
      <Text className="mt-3 text-4xl font-semibold text-white">
        Rejoins Muscle Mind
      </Text>

      <View className="mt-10 gap-3">
        <TextInput
          className="rounded-2xl border border-border bg-surface px-4 py-4 text-white"
          placeholder="Prénom"
          placeholderTextColor="#8B95A8"
          value={displayName}
          onChangeText={setDisplayName}
        />
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
          placeholder="Mot de passe (8+)"
          placeholderTextColor="#8B95A8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {register.error && (
        <Text className="mt-3 text-sm text-danger">
          {(register.error as Error).message}
        </Text>
      )}

      <View className="mt-6">
        <PrimaryButton
          label={register.isPending ? "Création…" : "Créer mon compte"}
          disabled={register.isPending}
          onPress={() => {
            register.mutate(
              { email, password, displayName },
              {
                onSuccess: () => {
                  setAuthenticated(true);
                  router.replace("/(app)/onboarding");
                },
              },
            );
          }}
        />
      </View>

      <Link href="/(auth)/login" className="mt-6 text-center text-muted">
        Déjà un compte ? Connexion
      </Link>
    </Screen>
  );
}
