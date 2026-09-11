import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import {
  logout,
  useClearPreferredCategory,
  useMe,
  useUpdateLocale,
} from "@/features/auth/api";
import { CategoryRadarChart } from "@/features/home/CategoryRadarChart";
import { useCategories } from "@/features/home/api";
import { getAppLocale, setAppLocale } from "@/i18n";
import type { AppLocale } from "@/i18n/localeStorage";
import {
  clearOnboardingProgress,
} from "@/features/onboarding/storage";
import { useOnboardingStore } from "@/features/onboarding/store";
import { computeHealthScore } from "@/features/retention/healthScore";
import {
  isEffectivelyPremium,
  isPaused,
  loadRetentionState,
  planDisplayName,
} from "@/features/retention/storage";
import { useSessionStore } from "@/shared/store/session";
import { Screen, XpBar } from "@/shared/ui/primitives";
import { NeuroliftAmount, NeuroliftIcon } from "@/shared/ui/Neurolift";
import { NeuroCoinAmount } from "@/shared/ui/NeuroCoin";
import { StarAmount } from "@/shared/ui/Star";
import { WaterBottleAmount } from "@/shared/ui/WaterBottle";
import { ProfileSkeleton, RadarSkeleton } from "@/shared/ui/Skeleton";

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const qc = useQueryClient();
  const { data: me, isLoading: meLoading } = useMe();
  const { data: categories, isLoading: catsLoading } = useCategories();
  const setAuthenticated = useSessionStore((s) => s.setAuthenticated);
  const clearPreferred = useClearPreferredCategory();
  const updateLocale = useUpdateLocale();
  const [retention, setRetention] = useState(loadRetentionState);
  const [restartingOnboarding, setRestartingOnboarding] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRetention(loadRetentionState());
    }, []),
  );

  const premium = isEffectivelyPremium(retention);
  const paused = isPaused(retention);
  const health = useMemo(
    () => computeHealthScore(me ?? null, retention),
    [me, retention],
  );

  const overallPct =
    categories && categories.length > 0
      ? Math.round(
          (categories.reduce((sum, c) => sum + c.progress, 0) /
            categories.length) *
            100,
        )
      : 0;

  const currentLocale: AppLocale = i18n.language?.startsWith("en")
    ? "en"
    : getAppLocale();

  async function onChangeLocale(locale: AppLocale) {
    if (locale === currentLocale || updateLocale.isPending) return;
    await setAppLocale(locale);
    try {
      await updateLocale.mutateAsync(locale);
    } catch {
      // Endpoint locale absent: invalidate content caches with new X-Locale.
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["shop"] });
      qc.invalidateQueries({ queryKey: ["mini-games"] });
      qc.invalidateQueries({ queryKey: ["lessons"] });
    }
  }

  return (
    <Screen className="pt-8">
      <ScrollView showsVerticalScrollIndicator={false} className="mb-8">
        <Text className="text-3xl font-semibold text-white">
          {t("home:profile")}
        </Text>

        <View className="mt-4 flex-row items-center justify-between rounded-2xl border border-border bg-surface p-3">
          <Text className="text-sm text-muted">{t("common:language")}</Text>
          <View className="flex-row gap-2">
            {(["fr", "en"] as AppLocale[]).map((locale) => {
              const selected = currentLocale === locale;
              return (
                <Pressable
                  key={locale}
                  onPress={() => void onChangeLocale(locale)}
                  disabled={updateLocale.isPending}
                  className={`rounded-xl px-3 py-2 ${
                    selected ? "bg-accent/20" : "bg-elevated"
                  }`}
                >
                  <Text className={selected ? "text-accent" : "text-white"}>
                    {locale.toUpperCase()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {meLoading || !me ? (
          <ProfileSkeleton />
        ) : (
          <>
            <View className="mt-6 rounded-3xl border border-border bg-surface p-5">
              <View className="flex-row items-center gap-4">
                <View className="h-16 w-16 items-center justify-center rounded-full bg-accent/15">
                  <Text className="text-2xl font-semibold text-accent">
                    {me.displayName.slice(0, 1).toUpperCase()}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-semibold text-white">
                    {me.displayName}
                  </Text>
                  <Text className="mt-1 text-sm text-muted">{me.email}</Text>
                </View>
              </View>

              <Pressable
                onPress={() => router.push("/(app)/level-roadmap")}
                className="mt-5 active:opacity-80"
              >
                <View className="flex-row justify-between">
                  <Stat label={t("common:level")} value={String(me.level)} />
                  <View className="items-center">
                    <NeuroliftIcon size={28} />
                    <Text className="mt-1 text-lg font-semibold text-white">
                      {me.xpTotal}
                    </Text>
                    <Text className="text-[11px] text-muted">
                      {t("home:neurolift")}
                    </Text>
                  </View>
                  <Stat
                    label={t("common:streak")}
                    value={t("common:daysShort", { count: me.streak.current })}
                  />
                  <Stat label={t("common:global")} value={`${overallPct}%`} accent />
                </View>

                <View className="mt-4">
                  <XpBar progress={me.xpProgress.progress} />
                  <View className="mt-2 flex-row flex-wrap items-center gap-1.5">
                    <NeuroliftAmount
                      amount={me.xpTotal}
                      size="sm"
                      color="#8B95A8"
                    />
                    <Text className="text-xs text-muted">
                      {t("home:xpToNextLevel", {
                        nextXp: me.xpProgress.nextLevelXp,
                        level: me.level + 1,
                      })}
                    </Text>
                  </View>
                  <Text className="mt-2 text-xs text-accent">
                    {t("home:viewRewardsRoadmap")}
                  </Text>
                </View>
              </Pressable>
            </View>

            <View className="mt-4 flex-row gap-3">
              <View className="flex-1 items-center rounded-3xl border border-border bg-surface p-4">
                <StarAmount amount={me.starsTotal ?? 0} size="lg" />
                <Text className="mt-1 text-center text-[11px] text-muted">
                  {t("home:starsEarned")}
                </Text>
              </View>
              <View className="flex-1 items-center rounded-3xl border border-border bg-surface p-4">
                <NeuroCoinAmount
                  amount={me.neuroCoinBalance ?? 0}
                  size="lg"
                />
                <Text className="mt-1 text-center text-[11px] text-muted">
                  {t("home:neuroCoins")}
                </Text>
              </View>
              <View className="flex-1 items-center rounded-3xl border border-border bg-surface p-4">
                <WaterBottleAmount
                  amount={me.waterBottles ?? 15}
                  max={me.waterBottlesMax ?? 15}
                  size="lg"
                />
              </View>
            </View>
          </>
        )}

        <Text className="mb-3 mt-8 text-lg font-semibold text-white">
          {t("home:categoryProgress")}
        </Text>

        {catsLoading && <RadarSkeleton />}

        {!catsLoading && categories && categories.length > 0 ? (
          <CategoryRadarChart
            categories={categories}
            radarHint={t("home:radarNeedCategories")}
          />
        ) : null}

        {!!me?.recentBadges?.length && (
          <View className="mt-8">
            <Text className="mb-3 text-lg font-semibold text-white">
              {t("home:badges")}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {me.recentBadges.map((b) => (
                <View
                  key={b.code}
                  className="rounded-2xl border border-border bg-elevated px-4 py-3"
                >
                  <Text className="font-medium text-white">{b.name}</Text>
                  <Text className="mt-1 text-xs text-muted">
                    {b.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Pressable
          className="mt-10 rounded-2xl border border-border bg-surface py-4"
          onPress={() => router.push("/(app)/manage-subscription")}
        >
          <Text className="text-center text-base text-white">
            {t("home:manageSub")}
          </Text>
          <Text className="mt-1 text-center text-xs text-muted">
            {premium || paused
              ? t("home:subStatusPremium", {
                  plan: planDisplayName(retention.planId),
                  paused: paused ? t("home:subPausedShort") : "",
                  health: health.label,
                })
              : t("home:noActiveSub")}
          </Text>
        </Pressable>

        <Pressable
          className="mt-3 rounded-2xl border border-accent/40 bg-accent/10 py-4"
          disabled={restartingOnboarding || clearPreferred.isPending}
          onPress={() => {
            setRestartingOnboarding(true);
            clearPreferred.mutate(undefined, {
              onSuccess: () => {
                clearOnboardingProgress();
                useOnboardingStore.getState().reset();
                router.replace("/(app)/onboarding");
              },
              onError: () => {
                // Offline / API down : reset local quand même
                clearOnboardingProgress();
                useOnboardingStore.getState().reset();
                router.replace("/(app)/onboarding");
              },
              onSettled: () => setRestartingOnboarding(false),
            });
          }}
        >
          <Text className="text-center text-base text-accent">
            {restartingOnboarding || clearPreferred.isPending
              ? t("home:resetting")
              : t("home:restartOnboarding")}
          </Text>
        </Pressable>

        <Pressable
          className="mt-3 mb-6 rounded-2xl border border-border py-4"
          onPress={() => {
            logout();
            setAuthenticated(false);
            router.replace("/(auth)/login");
          }}
        >
          <Text className="text-center text-base text-danger">
            {t("common:logout")}
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <View className="items-center">
      <Text className="text-xs text-muted">{label}</Text>
      <Text
        className={`mt-1 text-lg font-semibold tabular-nums ${
          accent ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}
