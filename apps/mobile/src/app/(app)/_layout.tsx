import { Redirect, Tabs } from "expo-router";
import { Image, type ImageSourcePropType } from "react-native";
import { tokenStorage } from "@/shared/storage/mmkv";
import { useSessionStore } from "@/shared/store/session";

const TAB_ICONS = {
  home: require("../../../assets/tab/map.png"),
  games: require("../../../assets/tab/games.png"),
  shop: require("../../../assets/tab/shop.png"),
  profile: require("../../../assets/tab/profile.png"),
} as const;

function TabIcon({
  source,
  color,
}: {
  source: ImageSourcePropType;
  color: string;
}) {
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={{ width: 30, height: 30, tintColor: color }}
    />
  );
}

export default function AppLayout() {
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated);

  if (!isAuthenticated || !tokenStorage.getAccess()) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#141820",
          borderTopColor: "#2A3344",
          height: 70,
          paddingBottom: 12,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#7CFFB2",
        tabBarInactiveTintColor: "#8B95A8",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <TabIcon source={TAB_ICONS.home} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mini-games"
        options={{
          title: "Mini-jeux",
          tabBarIcon: ({ color }) => (
            <TabIcon source={TAB_ICONS.games} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Boutique",
          tabBarIcon: ({ color }) => (
            <TabIcon source={TAB_ICONS.shop} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <TabIcon source={TAB_ICONS.profile} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="level-roadmap"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="manage-subscription"
        options={{ href: null, tabBarStyle: { display: "none" } }}
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
