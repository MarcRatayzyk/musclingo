import { router } from "expo-router";
import { MotiView } from "moti";
import { Pressable, ScrollView, Text, View } from "react-native";
import { logout, useMe } from "@/features/auth/api";
import { useCategories } from "@/features/home/api";
import { useSessionStore } from "@/shared/store/session";
import { Screen, XpBar } from "@/shared/ui/primitives";

export default function ProfileScreen() {
  const { data: me, isLoading: meLoading } = useMe();
  const { data: categories, isLoading: catsLoading } = useCategories();
  const setAuthenticated = useSessionStore((s) => s.setAuthenticated);

  const overallPct =
    categories && categories.length > 0
      ? Math.round(
          (categories.reduce((sum, c) => sum + c.progress, 0) /
            categories.length) *
            100,
        )
      : 0;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} className="mb-8">
        <Text className="text-xs uppercase tracking-[3px] text-accent">
          Compte
        </Text>
        <Text className="mt-2 text-3xl font-semibold text-white">Profil</Text>

        {meLoading || !me ? (
          <Text className="mt-6 text-muted">Chargement…</Text>
        ) : (
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="mt-6 rounded-3xl border border-border bg-surface p-5"
          >
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

            <View className="mt-5 flex-row justify-between">
              <Stat label="Niveau" value={String(me.level)} />
              <Stat label="Neurolift" value={String(me.xpTotal)} />
              <Stat label="Streak" value={`${me.streak.current}j`} />
              <Stat label="Global" value={`${overallPct}%`} accent />
            </View>

            <View className="mt-4">
              <XpBar progress={me.xpProgress.progress} />
              <Text className="mt-2 text-xs text-muted">
                {me.xpTotal} / {me.xpProgress.nextLevelXp} neurolift vers le
                niveau {me.level + 1}
              </Text>
            </View>
          </MotiView>
        )}

        <Text className="mb-3 mt-8 text-lg font-semibold text-white">
          Progression par catégorie
        </Text>

        {catsLoading && <Text className="text-muted">Chargement…</Text>}

        <View className="gap-3">
          {categories?.map((cat, index) => {
            const pct = Math.round(cat.progress * 100);
            return (
              <MotiView
                key={cat.id}
                from={{ opacity: 0, translateY: 14 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 70 }}
                className="rounded-3xl border border-border bg-surface p-5"
                style={{ borderColor: `${cat.color}66` }}
              >
                <View className="mb-3 flex-row items-center justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="text-lg font-semibold text-white">
                      {cat.name}
                    </Text>
                    <Text className="mt-1 text-sm text-muted">
                      {cat.completedCount}/{cat.lessonCount} leçons · Niv.{" "}
                      {cat.level}
                    </Text>
                  </View>
                  <View
                    className="min-w-[64px] items-center rounded-2xl px-3 py-2"
                    style={{ backgroundColor: `${cat.color}22` }}
                  >
                    <Text
                      className="text-xl font-semibold tabular-nums"
                      style={{ color: cat.color }}
                    >
                      {pct}%
                    </Text>
                  </View>
                </View>
                <XpBar progress={cat.progress} color={cat.color} />
                <Text className="mt-2 text-xs text-muted">
                  {cat.xp} neurolift acquis
                </Text>
              </MotiView>
            );
          })}
        </View>

        {!!me?.recentBadges?.length && (
          <View className="mt-8">
            <Text className="mb-3 text-lg font-semibold text-white">
              Badges
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
          className="mt-10 mb-6 rounded-2xl border border-border py-4"
          onPress={() => {
            logout();
            setAuthenticated(false);
            router.replace("/(auth)/login");
          }}
        >
          <Text className="text-center text-base text-danger">
            Se déconnecter
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
