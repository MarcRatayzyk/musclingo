import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { tokenStorage } from "@/shared/storage/mmkv";
import { useSessionStore } from "@/shared/store/session";

export default function Index() {
  const hydrated = useSessionStore((s) => s.hasHydrated);

  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color="#7CFFB2" />
      </View>
    );
  }

  const isAuthenticated = useSessionStore((s) => s.isAuthenticated);

  if (isAuthenticated && tokenStorage.getAccess()) {
    return <Redirect href="/(app)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
