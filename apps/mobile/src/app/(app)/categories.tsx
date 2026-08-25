import { MotiView } from "moti";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useUpdatePreferredCategory } from "@/features/auth/api";
import { useCategories } from "@/features/home/api";
import { getPathIcon } from "@/features/path/icons";
import { Screen, XpBar } from "@/shared/ui/primitives";

export default function CategoriesScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isPicker = mode === "picker" || true;
  const { data, isLoading } = useCategories();
  const updatePreferred = useUpdatePreferredCategory();

  return (
    <Screen>
      <View className="mb-2 flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xs uppercase tracking-[3px] text-accent">
            Parcours
          </Text>
          <Text className="mt-2 text-3xl font-semibold text-white">
            {isPicker ? "Changer de parcours" : "Catégories"}
          </Text>
        </View>
        {isPicker && (
          <Pressable onPress={() => router.back()} hitSlop={12} className="px-2">
            <Text className="text-sm text-muted">Retour</Text>
          </Pressable>
        )}
      </View>

      <Text className="mb-6 text-sm text-muted">
        Sélectionne le parcours affiché sur l&apos;accueil.
      </Text>

      {isLoading && <Text className="text-muted">Chargement…</Text>}

      {updatePreferred.error && (
        <Text className="mb-3 text-sm text-danger">
          {(updatePreferred.error as Error).message}
        </Text>
      )}

      <ScrollView showsVerticalScrollIndicator={false} className="mb-8">
        {data?.map((cat, index) => {
          const icon = getPathIcon(cat.slug);
          const started = cat.completedCount > 0;
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
              <MotiView
                from={{ opacity: 0, translateY: 16 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 80 }}
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
                    backgroundColor: started ? cat.color : "#1C2230",
                    borderColor: cat.color,
                  }}
                >
                  <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                      width: 34,
                      height: 34,
                      tintColor: started ? "#0B0F14" : "#FFFFFF",
                    }}
                  />
                </View>

                <View className="flex-1">
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-xl font-semibold text-white">
                      {cat.name}
                    </Text>
                    <Text
                      style={{ color: cat.color }}
                      className="font-semibold"
                    >
                      Niv. {cat.level}
                    </Text>
                  </View>
                  <XpBar progress={cat.progress} />
                  <Text className="mt-2 text-sm text-muted">
                    {cat.completedCount}/{cat.lessonCount} leçons · {cat.xp} XP
                  </Text>
                </View>
              </MotiView>
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
