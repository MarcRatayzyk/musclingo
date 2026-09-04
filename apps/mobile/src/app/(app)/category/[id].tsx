import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from "react-native";
import { CategoryPathView } from "@/features/path/CategoryPath";
import { useCategoryPath } from "@/features/path/api";
import { SectionBanner } from "@/features/path/SectionBanner";
import { unitKeyFromLessonScroll } from "@/features/path/scroll-sync";
import { UnitDetailSheet } from "@/features/path/UnitDetailSheet";
import {
  AnatomyPathOnboarding,
  hasSeenAnatomyOnboarding,
} from "@/features/mascot";
import { Screen } from "@/shared/ui/primitives";

export default function CategoryPathScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError, error } = useCategoryPath(id);

  const scrollRef = useRef<ScrollView>(null);
  const lessonLayouts = useRef<Record<string, { y: number; height: number }>>({});
  const scrollY = useRef(0);
  const [activeUnitKey, setActiveUnitKey] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [anatomyOnboardingOpen, setAnatomyOnboardingOpen] = useState(false);

  const lessons = useMemo(
    () => data?.units.flatMap((u) => u.lessons) ?? [],
    [data],
  );

  const focusLessonId = useMemo(() => {
    if (!data) return null;
    const available = lessons.find((l) => l.state === "available");
    if (available) return available.id;
    const completed = [...lessons]
      .reverse()
      .find((l) => l.state === "completed");
    return completed?.id ?? lessons[0]?.id ?? null;
  }, [data, lessons]);

  const focusUnitKey = useMemo(() => {
    if (!data) return null;
    const unit = data.units.find((u) =>
      u.lessons.some((l) => l.id === focusLessonId),
    );
    return unit?.checkpointKey ?? data.units[0]?.checkpointKey ?? null;
  }, [data, focusLessonId]);

  useEffect(() => {
    setActiveUnitKey(focusUnitKey);
    setSheetOpen(false);
    lessonLayouts.current = {};
    scrollY.current = 0;
  }, [focusUnitKey]);

  const syncActiveUnit = useCallback(
    (units: NonNullable<typeof data>["units"], offsetY: number) => {
      const next = unitKeyFromLessonScroll(units, lessonLayouts.current, offsetY);
      if (next) {
        setActiveUnitKey((prev) => (next !== prev ? next : prev));
      }
    },
    [],
  );

  useEffect(() => {
    if (isLoading || !data) return;
    if (data.slug !== "anatomie") return;
    const count = data.units.reduce((n, u) => n + u.lessons.length, 0);
    if (count === 0) return;
    if (hasSeenAnatomyOnboarding()) return;
    setAnatomyOnboardingOpen(true);
  }, [data, isLoading]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!data) return;
      const y = e.nativeEvent.contentOffset.y;
      scrollY.current = y;
      syncActiveUnit(data.units, y);
    },
    [data, syncActiveUnit],
  );

  const activeUnit = useMemo(
    () =>
      data?.units.find((u) => u.checkpointKey === activeUnitKey) ??
      data?.units[0] ??
      null,
    [data, activeUnitKey],
  );

  if (isLoading) {
    return (
      <Screen>
        <Text className="text-muted">Chargement du parcours…</Text>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <Text className="text-muted">
          {error instanceof Error ? error.message : "Parcours introuvable"}
        </Text>
      </Screen>
    );
  }

  const lessonCount = data.units.reduce((n, u) => n + u.lessons.length, 0);
  const completedCount = data.units.reduce(
    (n, u) => n + u.lessons.filter((l) => l.state === "completed").length,
    0,
  );

  return (
    <Screen>
      <Text
        className="text-xs uppercase tracking-[3px]"
        style={{ color: data.color }}
      >
        Parcours
      </Text>
      <Text className="mt-2 text-3xl font-semibold text-white">{data.name}</Text>
      <Text className="mb-3 mt-1 text-sm text-muted">
        {completedCount}/{lessonCount} leçons
      </Text>

      {activeUnit && lessonCount > 0 && (
        <SectionBanner
          color={data.color}
          sectionIndex={activeUnit.checkpointOrder + 1}
          title={activeUnit.label}
          onPress={() => setSheetOpen(true)}
        />
      )}

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {lessonCount === 0 ? (
          <View className="mt-10 items-center px-6">
            <Text className="text-center text-lg text-white">
              Parcours bientôt disponible
            </Text>
            <Text className="mt-2 text-center text-sm text-muted">
              Les leçons de cette catégorie arriveront bientôt.
            </Text>
          </View>
        ) : (
          <CategoryPathView
            path={data}
            focusLessonId={focusLessonId ?? undefined}
            onLessonLayout={(lessonId, y, height) => {
              lessonLayouts.current[lessonId] = { y, height };
              syncActiveUnit(data.units, scrollY.current);
            }}
            onPressLesson={(lesson) => {
              if (lesson.state === "locked") return;
              router.push(`/(app)/lesson/${lesson.id}`);
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

      <UnitDetailSheet
        visible={sheetOpen}
        path={data}
        unitKey={activeUnitKey}
        onClose={() => setSheetOpen(false)}
        onPressLesson={(lesson) => {
          if (lesson.state === "locked") return;
          router.push(`/(app)/lesson/${lesson.id}`);
        }}
        onPressGate={(gate) => {
          if (gate.state === "locked") return;
          router.push(`/(app)/checkpoint/${gate.id}` as never);
        }}
      />
      <AnatomyPathOnboarding
        visible={anatomyOnboardingOpen}
        onClose={() => setAnatomyOnboardingOpen(false)}
        accentColor={data.color}
      />
    </Screen>
  );
}
