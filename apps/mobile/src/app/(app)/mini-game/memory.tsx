import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { useMe } from "@/features/auth/api";
import { useSubmitMemoryGameScore } from "@/features/memory-game/api";
import { useMemoryGame } from "@/features/memory-game/useMemoryGame";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

const COLOR = "#7CFFB2";

const REST_MODES = [
  { sec: 60, label: "Court", hint: "Intense" },
  { sec: 90, label: "Classique", hint: "Équilibré" },
  { sec: 120, label: "Long", hint: "Tranquille" },
] as const;

function SetupHero({ bestScore }: { bestScore: number }) {
  return (
    <Animated.View
      entering={FadeIn.duration(420)}
      style={{
        borderRadius: 28,
        borderWidth: 1,
        borderColor: COLOR + "55",
        overflow: "hidden",
        marginBottom: 22,
      }}
    >
      <Svg
        pointerEvents="none"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id="memorySetupBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={COLOR} stopOpacity="0.28" />
            <Stop offset="0.55" stopColor="#121820" stopOpacity="1" />
            <Stop offset="1" stopColor="#0B0F14" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#memorySetupBg)" />
      </Svg>
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -36,
          right: -24,
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: COLOR + "22",
        }}
      />
      <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 18 }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 34,
            fontWeight: "900",
            letterSpacing: 0.3,
          }}
        >
          Mémoire
        </Text>

        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: "rgba(0,0,0,0.28)",
              paddingVertical: 12,
              paddingHorizontal: 12,
            }}
          >
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
              Record
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: "800",
                marginTop: 2,
              }}
            >
              {bestScore}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: "rgba(0,0,0,0.28)",
              paddingVertical: 12,
              paddingHorizontal: 12,
            }}
          >
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
              Objectif
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: "700",
                marginTop: 6,
              }}
            >
              Grilles max
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function MemoryGameScreen() {
  const { data: me } = useMe();
  const submitScore = useSubmitMemoryGameScore();
  const game = useMemoryGame();
  const { width } = useWindowDimensions();
  const [customInput, setCustomInput] = useState("90");
  const [showCustom, setShowCustom] = useState(false);
  const [resultBest, setResultBest] = useState(me?.memoryGameBestScore ?? 0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const submittedRef = useRef(false);

  const bestKnown = me?.memoryGameBestScore ?? 0;
  const isCustomRest = !REST_MODES.some((m) => m.sec === game.restSeconds);

  useEffect(() => {
    if (game.phase !== "finished") {
      submittedRef.current = false;
      return;
    }
    if (submittedRef.current) return;
    submittedRef.current = true;

    submitScore.mutate(game.score, {
      onSuccess: (res) => {
        setResultBest(res.bestScore);
        setIsNewRecord(res.isNewRecord);
      },
      onError: () => {
        setResultBest(Math.max(bestKnown, game.score));
        setIsNewRecord(game.score > bestKnown);
      },
    });
    // Submit score once when the session ends
  }, [game.phase, game.score, bestKnown]);

  const gap = 8;
  const pad = 20;
  const boardWidth = Math.min(width - pad * 2, 360);
  const cellSize =
    (boardWidth - gap * (game.gridSize - 1)) / Math.max(game.gridSize, 1);

  return (
    <Screen>
      <View className="mb-4 flex-row items-center">
        <Pressable onPress={() => router.replace("/(app)/mini-games")}>
          <Text className="text-sm text-muted">← Mini-jeux</Text>
        </Pressable>
      </View>

      {game.phase === "setup" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SetupHero bestScore={bestKnown} />

          <Animated.View entering={FadeInDown.duration(380).delay(80)}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {REST_MODES.map((mode) => {
                const active = game.restSeconds === mode.sec;
                return (
                  <Pressable
                    key={mode.sec}
                    onPress={() => {
                      game.setRestSeconds(mode.sec);
                      setCustomInput(String(mode.sec));
                      setShowCustom(false);
                    }}
                    style={{
                      flex: 1,
                      alignItems: "center",
                      borderRadius: 20,
                      borderWidth: 2,
                      borderColor: active ? COLOR : "#2A3344",
                      backgroundColor: active ? COLOR + "1A" : "#141820",
                      paddingVertical: 16,
                      paddingHorizontal: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: active ? COLOR : "#FFFFFF",
                        fontSize: 18,
                        fontWeight: "900",
                      }}
                    >
                      {mode.sec}s
                    </Text>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 13,
                        fontWeight: "800",
                        marginTop: 8,
                        textAlign: "center",
                      }}
                    >
                      {mode.label}
                    </Text>
                    <Text
                      style={{
                        color: active ? COLOR : "rgba(255,255,255,0.45)",
                        fontSize: 11,
                        fontWeight: "600",
                        marginTop: 3,
                        textAlign: "center",
                      }}
                    >
                      {mode.hint}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={() => setShowCustom((v) => !v)}
              style={{ marginTop: 14, paddingVertical: 6 }}
            >
              <Text
                style={{
                  color: isCustomRest || showCustom ? COLOR : "#8B95A8",
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                {showCustom || isCustomRest
                  ? "Durée perso"
                  : "Personnaliser la durée…"}
              </Text>
            </Pressable>

            {(showCustom || isCustomRest) && (
              <TextInput
                className="mt-2 rounded-2xl border border-border bg-surface px-4 py-4 text-white"
                placeholder="Secondes (ex. 75)"
                placeholderTextColor="#8B95A8"
                keyboardType="number-pad"
                value={customInput}
                onChangeText={(t) => {
                  setCustomInput(t);
                  const n = parseInt(t, 10);
                  if (!Number.isNaN(n) && n > 0) game.setRestSeconds(n);
                }}
              />
            )}

            <View className="mb-10 mt-6">
              <PrimaryButton
                label={`C’est parti · ${game.restSeconds}s`}
                onPress={() => game.startGame(game.restSeconds)}
              />
            </View>
          </Animated.View>
        </ScrollView>
      )}

      {game.phase === "playing" && (
        <View className="flex-1">
          <View className="mb-4 flex-row items-end justify-between">
            <View>
              <Text className="text-sm text-muted">Grille</Text>
              <Text className="text-2xl font-semibold text-white">
                {game.gridSize}×{game.gridSize}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-muted">Score</Text>
              <Text className="text-2xl font-semibold text-accent">
                {game.score}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-sm text-muted">Temps</Text>
              <Text
                className={`text-2xl font-semibold ${
                  game.secondsLeft <= 10 ? "text-danger" : "text-white"
                }`}
              >
                {game.secondsLeft}s
              </Text>
            </View>
          </View>

          <View
            className="self-center"
            style={{
              width: boardWidth,
              flexDirection: "row",
              flexWrap: "wrap",
              gap,
            }}
          >
            {game.cards.map((card) => {
              const faceUp = game.isFaceUp(card.id);
              const matched = game.isMatched(card.id);
              return (
                <View key={card.id}>
                  <Pressable
                    onPress={() => game.flipCard(card.id)}
                    disabled={faceUp}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: 14,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: matched
                        ? "#7CFFB266"
                        : faceUp
                          ? "#7CFFB2"
                          : "#2A3344",
                      backgroundColor: matched
                        ? "#7CFFB218"
                        : faceUp
                          ? "#1A2230"
                          : "#141820",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Math.min(cellSize * 0.42, 28),
                        color: faceUp ? "#FFFFFF" : "#2A3344",
                      }}
                    >
                      {faceUp ? card.symbol : "?"}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {game.phase === "finished" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-3xl font-semibold text-white">Temps écoulé</Text>
          <Text className="mt-2 text-base text-muted">
            Tu as complété {game.score} grille
            {game.score === 1 ? "" : "s"} pendant ton repos.
          </Text>

          <View className="mt-8 rounded-3xl border border-border bg-surface p-5">
            <Text className="text-sm text-muted">Score de la session</Text>
            <Text className="mt-1 text-5xl font-semibold text-white">
              {game.score}
            </Text>
            {isNewRecord && (
              <Text className="mt-3 font-semibold text-accent">
                Nouveau record !
              </Text>
            )}
            <Text className="mt-3 text-sm text-muted">
              Meilleur score : {resultBest || Math.max(bestKnown, game.score)}
            </Text>
          </View>

          <View className="mt-8 gap-3 mb-10">
            <PrimaryButton
              label="Rejouer"
              onPress={() => {
                setIsNewRecord(false);
                game.resetToSetup();
              }}
            />
            <Pressable
              onPress={() => router.replace("/(app)/mini-games")}
              className="rounded-2xl border border-border py-4"
            >
              <Text className="text-center text-base font-semibold text-muted">
                Retour aux mini-jeux
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}
