import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useUpdatePreferredCategory } from "@/features/auth/api";
import { useCategories } from "@/features/home/api";
import { getPathIcon } from "@/features/path/icons";
import { localizeCategoryName } from "@/i18n/categoryNames";
import { Screen, XpBar } from "@/shared/ui/primitives";
import { CategoriesSkeleton } from "@/shared/ui/Skeleton";

export default function CategoriesScreen() {
  const { t } = useTranslation();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isPicker = mode !== "browse";
  const { data, isLoading, isError, error, refetch } = useCategories();
  const updatePreferred = useUpdatePreferredCategory();

  return (
    <Screen>
      <View className="mb-2 flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xs uppercase tracking-[3px] text-accent">
            {t("home:categories")}
          </Text>
          <Text className="mt-2 text-3xl font-semibold text-white">
            {isPicker ? t("home:changePath") : t("home:categoriesTitle")}
          </Text>
        </View>
        {isPicker && (
          <Pressable onPress={() => router.back()} hitSlop={12} className="px-2">
            <Text className="text-sm text-muted">{t("common:back")}</Text>
          </Pressable>
        )}
      </View>

      <Text className="mb-6 text-sm text-muted">
        {isPicker
          ? t("home:pickerHint")
          : t("home:browseHint")}
      </Text>

      {isLoading && <CategoriesSkeleton />}

      {isError && (
        <View className="mb-6 rounded-2xl border border-border bg-surface p-4">
          <Text className="text-base text-white">
            {t("home:categoriesLoadErrorTitle")}
          </Text>
          <Text className="mt-2 text-sm text-muted">
            {error instanceof Error ? error.message : t("errors:network")}
          </Text>
          <Pressable
            onPress={() => refetch()}
            className="mt-4 rounded-xl border border-accent py-3"
          >
            <Text className="text-center text-accent">{t("common:retry")}</Text>
          </Pressable>
        </View>
      )}

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
                      {localizeCategoryName(cat.name, cat.slug)}
                    </Text>
                    <Text
                      style={{ color: cat.color }}
                      className="font-semibold"
                    >
                      {t("home:levelShort", { level: cat.level })}
                    </Text>
                  </View>
                  <XpBar progress={cat.progress} />
                  <Text className="mt-2 text-sm text-muted">
                    {t("home:categoryProgressLine", {
                      completed: cat.completedCount,
                      total: cat.lessonCount,
                      xp: cat.xp,
                    })}
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
