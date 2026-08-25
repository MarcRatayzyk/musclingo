import { Redirect, router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
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
import { getPathIcon } from "@/features/path/icons";
import { SectionBanner } from "@/features/path/SectionBanner";
import { UnitDetailSheet } from "@/features/path/UnitDetailSheet";
import { Screen } from "@/shared/ui/primitives";

function unitKeyFromScroll(
  units: Array<{ checkpointKey: string }>,
  layouts: Record<string, number>,
  scrollY: number,
) {
  let current: string | null = null;
  for (const unit of units) {
    const y = layouts[unit.checkpointKey];
    if (y == null) continue;
    if (y <= scrollY + 32) current = unit.checkpointKey;
  }
  return current;
}

export default function HomeScreen() {
  const { data: me, isLoading: meLoading } = useMe();
  const { data: ongoing } = useOngoingPaths();
  const { data: categories } = useCategories();

  const scrollRef = useRef<ScrollView>(null);
  const scrollH = useRef(0);
  const layouts = useRef<Record<string, { y: number; height: number }>>({});
  const unitLayouts = useRef<Record<string, number>>({});
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
  const completedCount = lessons.filter((l) => l.state === "completed").length;

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
    unitLayouts.current = {};
  }, [activeCategoryId, focusLessonId]);

  useEffect(() => {
    const t = setTimeout(scrollToFocus, 80);
    return () => clearTimeout(t);
  }, [scrollToFocus, path]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!path) return;
      const y = e.nativeEvent.contentOffset.y;
      const next = unitKeyFromScroll(path.units, unitLayouts.current, y);
      if (next && next !== activeUnitKey) setActiveUnitKey(next);
    },
    [path, activeUnitKey],
  );

  if (!meLoading && me && !me.preferredCategory) {
    return <Redirect href="/(app)/onboarding" />;
  }

  const pathColor = path?.color ?? me?.preferredCategory?.color ?? "#7CFFB2";
  const pathSlug = path?.slug ?? me?.preferredCategory?.slug ?? "anatomie";
  const activeUnit =
    path?.units.find((u) => u.checkpointKey === activeUnitKey) ??
    path?.units[0];

  return (
    <Screen>
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center pr-3">
          <View
            className="mr-3 items-center justify-center"
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              borderWidth: 2,
              backgroundColor: pathColor,
              borderColor: pathColor,
            }}
          >
            <Image
              source={getPathIcon(pathSlug)}
              resizeMode="contain"
              style={{ width: 26, height: 26, tintColor: "#0B0F14" }}
            />
          </View>
          <Text className="text-sm font-medium" style={{ color: pathColor }}>
            {path ? `${completedCount}/${lessonCount} leçons` : "—"}
          </Text>
        </View>
        <Pressable
          onPress={() =>
            router.push("/(app)/categories?mode=picker" as never)
          }
          hitSlop={12}
          className="h-11 w-11 items-center justify-center rounded-2xl border border-border bg-elevated"
        >
          <Text className="text-xl text-accent">⊞</Text>
        </Pressable>
      </View>

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
        {(meLoading || pathLoading) && (
          <Text className="text-muted">Chargement du parcours…</Text>
        )}

        {isError && (
          <Text className="text-muted">
            {error instanceof Error ? error.message : "Parcours introuvable"}
          </Text>
        )}

        {path && lessonCount === 0 && (
          <View className="mt-10 items-center px-6">
            <Text className="text-center text-lg text-white">
              Parcours bientôt disponible
            </Text>
            <Text className="mt-2 text-center text-sm text-muted">
              Les leçons de cette catégorie arriveront bientôt.
            </Text>
          </View>
        )}

        {path && lessonCount > 0 && (
          <CategoryPathView
            path={path}
            focusLessonId={focusLessonId ?? undefined}
            onUnitLayout={(checkpointKey, y) => {
              unitLayouts.current[checkpointKey] = y;
            }}
            onLessonLayout={(lessonId, y, height) => {
              layouts.current[lessonId] = { y, height };
              if (lessonId === focusLessonId) {
                scrollToFocus();
              }
            }}
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
