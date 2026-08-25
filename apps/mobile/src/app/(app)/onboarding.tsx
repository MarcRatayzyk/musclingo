import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { useMe, useUpdatePreferredCategory } from "@/features/auth/api";
import { useCategories } from "@/features/home/api";
import { getPathIcon } from "@/features/path/icons";
import { Screen } from "@/shared/ui/primitives";

export default function OnboardingScreen() {
  const { data: me, isLoading: meLoading } = useMe();
  const { data, isLoading } = useCategories();
  const updatePreferred = useUpdatePreferredCategory();

  if (!meLoading && me?.preferredCategory) {
    return <Redirect href="/(app)/home" />;
  }

  return (
    <Screen>
      <Text className="text-xs uppercase tracking-[3px] text-accent">
        Bienvenue
      </Text>
      <Text className="mt-2 text-3xl font-semibold text-white">
        Par où veux-tu commencer ?
      </Text>
      <Text className="mt-2 mb-6 text-sm text-muted">
        Choisis ton premier parcours. Tu pourras en changer à tout moment.
      </Text>

      {(isLoading || meLoading) && (
        <Text className="text-muted">Chargement…</Text>
      )}

      {updatePreferred.error && (
        <Text className="mb-3 text-sm text-danger">
          {(updatePreferred.error as Error).message}
        </Text>
      )}

      <ScrollView showsVerticalScrollIndicator={false} className="mb-8">
        {data?.map((cat, index) => {
          const icon = getPathIcon(cat.slug);
          const busy = updatePreferred.isPending;

          return (
            <Pressable
              key={cat.id}
              disabled={busy}
              onPress={() => {
                updatePreferred.mutate(cat.id, {
                  onSuccess: () => {
                    router.replace("/(app)/home");
                  },
                });
              }}
            >
              <View
                
                
                
                className="mb-4 flex-row items-center gap-4 rounded-3xl border border-border bg-surface p-4"
                style={{
                  borderColor: cat.color + "55",
                  opacity: busy ? 0.6 : 1,
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    borderWidth: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: cat.color,
                    borderColor: cat.color,
                  }}
                >
                  <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                      width: 34,
                      height: 34,
                      tintColor: "#0B0F14",
                    }}
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-xl font-semibold text-white">
                    {cat.name}
                  </Text>
                  <Text className="mt-1 text-sm text-muted">
                    {cat.lessonCount} leçons
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
