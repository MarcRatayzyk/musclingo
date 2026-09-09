import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import type { LevelRewardItem } from "@muscle-mind/types";
import { listLevelRewardEntries } from "@muscle-mind/types";
import { useMe } from "@/features/auth/api";
import { GorillaAvatar } from "@/features/mascot/components/GorillaAvatar";
import { BoostIcon } from "@/shared/ui/BoostIcons";
import { Screen, XpBar } from "@/shared/ui/primitives";
import { NeuroliftAmount } from "@/shared/ui/Neurolift";

export default function LevelRoadmapScreen() {
  const { data: me, isLoading } = useMe();
  const level = me?.level ?? 1;
  const roadmap =
    me?.levelRoadmap ??
    [
      { level: 1, rewards: [] as LevelRewardItem[], claimed: level >= 1 },
      ...listLevelRewardEntries().map((e) => ({
        level: e.level,
        rewards: [...e.rewards],
        claimed: (me?.claimedLevels ?? []).includes(e.level),
      })),
    ];

  const nextXp = me
    ? Math.max(0, me.xpProgress.nextLevelXp - me.xpTotal)
    : 0;

  return (
    <Screen>
      <View className="mb-3 flex-row items-center gap-3">
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Retour"
          className="h-10 w-10 items-center justify-center rounded-full border border-border active:opacity-70"
        >
          <Text className="text-xl text-white">←</Text>
        </Pressable>
        <Text className="flex-1 text-2xl font-semibold text-white">
          Roadmap niveaux
        </Text>
      </View>

      {isLoading || !me ? (
        <Text className="text-muted">Chargement…</Text>
      ) : (
        <>
          <View
            style={{
              marginBottom: 18,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.08)",
              backgroundColor: "#141820",
              paddingHorizontal: 14,
              paddingVertical: 12,
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
            }}
          >
            <GorillaAvatar pose="present" size="sm" />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#7CFFB2",
                  fontSize: 11,
                  fontWeight: "800",
                  letterSpacing: 1.4,
                  textTransform: "uppercase",
                }}
              >
                Niveau {me.level}
              </Text>
              <View style={{ marginTop: 8 }}>
                <XpBar progress={me.xpProgress.progress} />
              </View>
              <View
                style={{
                  marginTop: 6,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <NeuroliftAmount
                  amount={me.xpTotal}
                  size="sm"
                  color="#8B95A8"
                />
                <Text style={{ color: "#8B95A8", fontSize: 11 }}>
                  · encore {nextXp} XP
                </Text>
              </View>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <View className="items-center pb-12 pt-2">
              {roadmap.map((node, i) => {
                const isCurrent = node.level === level;
                const isPast = node.level < level;
                const isLocked = node.level > level;
                const nodeSize = isCurrent ? 68 : 60;

                return (
                  <View
                    key={node.level}
                    style={{ width: "100%", alignItems: "center" }}
                  >
                    {i > 0 ? (
                      <View
                        style={{
                          width: 3,
                          height: 28,
                          borderRadius: 2,
                          backgroundColor:
                            isPast || isCurrent ? "#7CFFB2" : "#2A3344",
                          opacity: isPast || isCurrent ? 0.8 : 0.5,
                        }}
                      />
                    ) : null}
                    <View
                      style={{
                        alignItems: "center",
                        marginBottom: 18,
                        maxWidth: 280,
                      }}
                    >
                      <View
                        style={{
                          width: nodeSize,
                          height: nodeSize,
                          borderRadius: 999,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 3,
                          borderColor: isLocked ? "#2A3344" : "#7CFFB2",
                          backgroundColor: isPast
                            ? "#7CFFB2"
                            : isCurrent
                              ? "rgba(124,255,178,0.18)"
                              : "#141820",
                          opacity: isLocked ? 0.55 : 1,
                        }}
                      >
                        <Text
                          style={{
                            color: isPast
                              ? "#0B0F14"
                              : isLocked
                                ? "#8B95A8"
                                : "#7CFFB2",
                            fontSize: isCurrent ? 22 : 18,
                            fontWeight: "800",
                          }}
                        >
                          {node.level}
                        </Text>
                      </View>
                      {node.rewards.length > 0 ? (
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 8,
                          }}
                        >
                          {node.rewards.map((r, idx) => (
                            <View
                              key={`${node.level}-${r.kind}-${idx}`}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 6,
                                opacity: isLocked ? 0.55 : 1,
                              }}
                            >
                              <Text
                                style={{
                                  color: isLocked ? "#8B95A8" : "#FFFFFF",
                                  fontSize: 15,
                                  fontWeight: "700",
                                }}
                              >
                                {r.amount}
                              </Text>
                              <BoostIcon kind={r.kind} size={22} />
                            </View>
                          ))}
                        </View>
                      ) : null}
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </Screen>
  );
}
