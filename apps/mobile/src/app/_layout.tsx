import "../../global.css";
import { useEffect } from "react";
import { Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { AppProviders } from "@/shared/providers/app-providers";

async function collapseAndroidNavBar() {
  if (Platform.OS !== "android") return;
  try {
    await NavigationBar.setVisibilityAsync("hidden");
    await NavigationBar.setBehaviorAsync("overlay-swipe");
    await NavigationBar.setBackgroundColorAsync("#0A0F14");
  } catch {
    // Web / Expo Go sans plugin natif : ignorer.
  }
}

export default function RootLayout() {
  useEffect(() => {
    void collapseAndroidNavBar();
  }, []);

  return (
    <AppProviders>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0A0F14" },
          animation: "fade",
        }}
      />
    </AppProviders>
  );
}
