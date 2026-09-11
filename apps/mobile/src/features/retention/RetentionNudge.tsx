import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import type { Me } from "@/features/auth/api";
import { analytics } from "@/shared/analytics/posthog";
import { refreshHealthScoreIfNeeded } from "./healthScore";
import { pickRetentionNudge, type RetentionNudge } from "./nudgeRules";
import { loadRetentionState, markNudgeShown } from "./storage";

export function RetentionNudgeBanner({
  me,
}: {
  me: Pick<
    Me,
    "streak" | "waterBottles" | "waterBottlesMax" | "preferredCategory"
  > | null;
}) {
  const [nudge, setNudge] = useState<RetentionNudge | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const trackedId = useRef<string | null>(null);
  const healthTracked = useRef(false);

  useEffect(() => {
    if (!me || dismissed) {
      setNudge(null);
      return;
    }

    const before = loadRetentionState().lastHealthScoreAt;
    const health = refreshHealthScoreIfNeeded(me);
    const after = loadRetentionState().lastHealthScoreAt;
    if (!healthTracked.current && before !== after) {
      healthTracked.current = true;
      analytics.capture(analytics.events.ENGAGEMENT_HEALTH_SCORED, {
        score: health.score,
        band: health.band,
      });
    }

    const next = pickRetentionNudge(
      health,
      me.preferredCategory?.id ?? null,
    );
    setNudge(next);

    if (next && trackedId.current !== next.id) {
      trackedId.current = next.id;
      analytics.capture(analytics.events.RETENTION_NUDGE_SHOWN, {
        nudgeId: next.id,
      });
      markNudgeShown(next.id);
    }
  }, [me, dismissed]);

  if (!nudge || dismissed) return null;

  return (
    <View className="mb-3 rounded-2xl border border-accent/40 bg-surface px-4 py-3">
      <View className="flex-row items-start gap-3">
        <View className="flex-1">
          <Text className="text-sm leading-5 text-white">{nudge.message}</Text>
          <Pressable
            className="mt-2 self-start"
            onPress={() => {
              analytics.capture(analytics.events.RETENTION_NUDGE_TAPPED, {
                nudgeId: nudge.id,
              });
              router.push(nudge.href as never);
            }}
          >
            <Text className="text-sm font-semibold text-accent">
              {nudge.ctaLabel}
            </Text>
          </Pressable>
        </View>
        <Pressable
          hitSlop={10}
          onPress={() => setDismissed(true)}
          accessibilityLabel="Fermer"
        >
          <Text className="text-base text-muted">×</Text>
        </Pressable>
      </View>
    </View>
  );
}
