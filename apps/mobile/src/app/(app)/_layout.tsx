import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";
import { tokenStorage } from "@/shared/storage/mmkv";
import { useSessionStore } from "@/shared/store/session";

export default function AppLayout() {
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated);

  if (!isAuthenticated || !tokenStorage.getAccess()) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#141820",
          borderTopColor: "#2A3344",
          height: 64,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#7CFFB2",
        tabBarInactiveTintColor: "#8B95A8",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => <Text style={{ color }}>⌂</Text>,
        }}
      />
      <Tabs.Screen
        name="mini-games"
        options={{
          title: "Mini-jeux",
          tabBarIcon: ({ color }) => <Text style={{ color }}>▣</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <Text style={{ color }}>◉</Text>,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="onboarding"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="lesson/[id]"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="quiz/[lessonId]"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="checkpoint/[gateId]"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="category/[id]"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="mini-game/memory"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="mini-game/flash/[categoryId]"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
    </Tabs>
  );
}
