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

export default function CategoryPathScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError, error } = useCategoryPath(id);

  const scrollRef = useRef<ScrollView>(null);
  const unitLayouts = useRef<Record<string, number>>({});
  const [activeUnitKey, setActiveUnitKey] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const focusLessonId = useMemo(() => {
    if (!data) return null;
    const lessons = data.units.flatMap((u) => u.lessons);
    const available = lessons.find((l) => l.state === "available");
    if (available) return available.id;
    const completed = [...lessons]
      .reverse()
      .find((l) => l.state === "completed");
    return completed?.id ?? lessons[0]?.id ?? null;
  }, [data]);

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
    unitLayouts.current = {};
  }, [focusUnitKey]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!data) return;
      const y = e.nativeEvent.contentOffset.y;
      const next = unitKeyFromScroll(data.units, unitLayouts.current, y);
      if (next && next !== activeUnitKey) setActiveUnitKey(next);
    },
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
  const activeUnit =
    data.units.find((u) => u.checkpointKey === activeUnitKey) ?? data.units[0];

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
            onUnitLayout={(checkpointKey, y) => {
              unitLayouts.current[checkpointKey] = y;
            }}
            onPressLesson={(lesson) => {
              if (lesson.state === "locked") return;
              router.push(`/(app)/lesson/${lesson.id}`);
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
    </Screen>
  );
}
