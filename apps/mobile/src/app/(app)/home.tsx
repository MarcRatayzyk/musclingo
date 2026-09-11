import { Redirect, router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useMe } from "@/features/auth/api";
import { useCategories, useOngoingPaths } from "@/features/home/api";
import { CategoryPathView } from "@/features/path/CategoryPath";
import { useCategoryPath } from "@/features/path/api";
import { SectionBanner } from "@/features/path/SectionBanner";
import { unitKeyFromLessonScroll } from "@/features/path/scroll-sync";
import { UnitDetailSheet } from "@/features/path/UnitDetailSheet";
import { useStreakGoalClaim } from "@/features/onboarding/useStreakGoalClaim";
import { clearOnboardingProgress } from "@/features/onboarding/storage";
import { useOnboardingStore } from "@/features/onboarding/store";
import { Screen } from "@/shared/ui/primitives";
import { RewardsTopBar } from "@/shared/ui/RewardsTopBar";
import { MenuHamburgerIcon } from "@/shared/ui/MenuHamburger";
import { HomeSkeleton } from "@/shared/ui/Skeleton";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { data: me, isLoading: meLoading, isError: meError } = useMe();
  const { data: ongoing } = useOngoingPaths();
  const { data: categories, isError: categoriesError } = useCategories();
  useStreakGoalClaim();

  const scrollRef = useRef<ScrollView>(null);
  const scrollH = useRef(0);
  const layouts = useRef<Record<string, { y: number; height: number }>>({});
  const scrollY = useRef(0);
  const scrolledFor = useRef<string | null>(null);

  const [activeUnitKey, setActiveUnitKey] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeCategoryId = useMemo(() => {
    if (me?.preferredCategory?.id) return me.preferredCategory.id;
    if (ongoing?.[0]?.category.id) return ongoing[0].category.id;
    return categories?.[0]?.id ?? null;
  }, [me?.preferredCategory?.id, ongoing, categories]);

  const { data: path, isLoading: pathLoading, isError, error } =
    useCategoryPath(activeCategoryId ?? "");

  const lessons = useMemo(
    () => path?.units.flatMap((u) => u.lessons) ?? [],
    [path],
  );
  const lessonCount = lessons.length;

  const focusLessonId = useMemo(() => {
    if (!path) return null;
    const available = lessons.find((l) => l.state === "available");
    if (available) return available.id;
    const completed = [...lessons]
      .reverse()
      .find((l) => l.state === "completed");
    return completed?.id ?? lessons[0]?.id ?? null;
  }, [path, lessons]);

  const focusUnitKey = useMemo(() => {
    if (!path) return null;
    const unit = path.units.find((u) =>
      u.lessons.some((l) => l.id === focusLessonId),
    );
    return unit?.checkpointKey ?? path.units[0]?.checkpointKey ?? null;
  }, [path, focusLessonId]);

  useEffect(() => {
    setActiveUnitKey(focusUnitKey);
    setSheetOpen(false);
  }, [focusUnitKey]);

  const scrollToFocus = useCallback(() => {
    if (!focusLessonId) return;
    const layout = layouts.current[focusLessonId];
    if (!layout) return;
    const key = `${activeCategoryId}:${focusLessonId}:${layout.y}`;
    if (scrolledFor.current === key) return;
    scrolledFor.current = key;
    const viewport = scrollH.current || 400;
    const targetY = Math.max(
      0,
      layout.y + layout.height / 2 - viewport / 2,
    );
    scrollRef.current?.scrollTo({ y: targetY, animated: true });
  }, [activeCategoryId, focusLessonId]);

  useEffect(() => {
    scrolledFor.current = null;
    layouts.current = {};
    scrollY.current = 0;
  }, [activeCategoryId, focusLessonId]);

  const syncActiveUnit = useCallback(
    (offsetY: number) => {
      if (!path) return;
      const next = unitKeyFromLessonScroll(path.units, layouts.current, offsetY);
      if (next) {
        setActiveUnitKey((prev) => (next !== prev ? next : prev));
      }
    },
    [path],
  );

  useEffect(() => {
    const t = setTimeout(scrollToFocus, 80);
    return () => clearTimeout(t);
  }, [scrollToFocus, path]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!path) return;
      const y = e.nativeEvent.contentOffset.y;
      scrollY.current = y;
      syncActiveUnit(y);
    },
    [path, syncActiveUnit],
  );

  if (!meLoading && me && !me.preferredCategory) {
    clearOnboardingProgress();
    useOnboardingStore.getState().reset();
    return <Redirect href="/(app)/onboarding" />;
  }

  const showLoadError =
    !meLoading &&
    (meError || categoriesError || (!me && !meLoading) || !activeCategoryId);

  const pathColor = path?.color ?? me?.preferredCategory?.color ?? "#7CFFB2";
  const activeUnit =
    path?.units.find((u) => u.checkpointKey === activeUnitKey) ??
    path?.units[0];

  return (
    <Screen className="pt-8">
      <RewardsTopBar
        trailing={
          <Pressable
            onPress={() =>
              router.push("/(app)/categories?mode=picker" as never)
            }
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={t("home:viewOtherPaths")}
            style={{
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.12)",
              backgroundColor: "#141820",
            }}
          >
            <MenuHamburgerIcon size={20} color="#FFFFFF" />
          </Pressable>
        }
      />

      {path && activeUnit && lessonCount > 0 && (
        <SectionBanner
          color={pathColor}
          sectionIndex={activeUnit.checkpointOrder + 1}
          title={activeUnit.label}
          onPress={() => setSheetOpen(true)}
        />
      )}

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        onLayout={(e) => {
          scrollH.current = e.nativeEvent.layout.height;
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {(meLoading || pathLoading) && !showLoadError && <HomeSkeleton />}

        {showLoadError && (
          <View className="mt-10 items-center px-6">
            <Text className="text-center text-lg text-white">
              {t("home:homeLoadErrorTitle")}
            </Text>
            <Text className="mt-2 text-center text-sm text-muted">
              {t("home:homeLoadErrorBody")}
            </Text>
            <Pressable
              onPress={() => router.replace("/(auth)/login" as never)}
              className="mt-6 rounded-xl border border-accent px-6 py-3"
            >
              <Text className="text-accent">{t("home:reconnect")}</Text>
            </Pressable>
          </View>
        )}

        {isError && !showLoadError && (
          <Text className="text-muted">
            {error instanceof Error ? error.message : t("home:pathNotFound")}
          </Text>
        )}

        {path && lessonCount === 0 && (
          <View className="mt-10 items-center px-6">
            <Text className="text-center text-lg text-white">
              {t("home:pathSoonTitle")}
            </Text>
            <Text className="mt-2 text-center text-sm text-muted">
              {t("home:pathSoonBody")}
            </Text>
          </View>
        )}

        {path && lessonCount > 0 && (
          <CategoryPathView
            path={path}
            focusLessonId={focusLessonId ?? undefined}
            onLessonLayout={(lessonId, y, height) => {
              layouts.current[lessonId] = { y, height };
              syncActiveUnit(scrollY.current);
              if (lessonId === focusLessonId) {
                scrollToFocus();
              }
            }}
            onPressLesson={(lesson) => {
              if (lesson.state === "locked") return;
              router.push(`/(app)/lesson/${lesson.id}` as never);
            }}
            onPressQuiz={(lesson) => {
              if (lesson.state === "locked") return;
              router.push(`/(app)/quiz/${lesson.id}` as never);
            }}
            onPressGate={(gate) => {
              if (gate.state === "locked") return;
              router.push(`/(app)/checkpoint/${gate.id}` as never);
            }}
          />
        )}
      </ScrollView>

      {path && (
        <UnitDetailSheet
          visible={sheetOpen}
          path={path}
          unitKey={activeUnitKey}
          onClose={() => setSheetOpen(false)}
          onPressLesson={(lesson) => {
            if (lesson.state === "locked") return;
            router.push(`/(app)/lesson/${lesson.id}` as never);
          }}
          onPressGate={(gate) => {
            if (gate.state === "locked") return;
            router.push(`/(app)/checkpoint/${gate.id}` as never);
          }}
        />
      )}
    </Screen>
  );
}
