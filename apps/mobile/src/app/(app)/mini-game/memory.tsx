import { router } from "expo-router";
import { MotiView } from "moti";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useMe } from "@/features/auth/api";
import { useSubmitMemoryGameScore } from "@/features/memory-game/api";
import { useMemoryGame } from "@/features/memory-game/useMemoryGame";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

const PRESETS = [60, 90, 120];

export default function MemoryGameScreen() {
  const { data: me } = useMe();
  const submitScore = useSubmitMemoryGameScore();
  const game = useMemoryGame();
  const { width } = useWindowDimensions();
  const [customInput, setCustomInput] = useState("90");
  const [resultBest, setResultBest] = useState(me?.memoryGameBestScore ?? 0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const submittedRef = useRef(false);

  const bestKnown = me?.memoryGameBestScore ?? 0;

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
      <View className="mb-4 flex-row items-center justify-between">
        <Pressable onPress={() => router.replace("/(app)/mini-games")}>
          <Text className="text-sm text-muted">← Mini-jeux</Text>
        </Pressable>
        <Text className="text-xs uppercase tracking-[3px] text-accent">
          Mémoire
        </Text>
        <View style={{ width: 66 }} />
      </View>

      {game.phase === "setup" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-3xl font-semibold text-white">Mémoire</Text>
          <Text className="mt-2 text-base text-muted">
            Choisis ton temps de repos. Complète le plus de grilles possible
            avant la fin du chrono.
          </Text>

          <View className="mt-6 rounded-3xl border border-border bg-surface p-5">
            <Text className="text-sm text-muted">Meilleur score</Text>
            <Text className="mt-1 text-4xl font-semibold text-accent">
              {bestKnown}
            </Text>
            <Text className="mt-1 text-xs text-muted">
              grilles réussies
            </Text>
          </View>

          <Text className="mt-8 mb-3 text-lg font-semibold text-white">
            Temps de repos
          </Text>
          <View className="flex-row gap-3">
            {PRESETS.map((sec) => {
              const active = game.restSeconds === sec;
              return (
                <Pressable
                  key={sec}
                  onPress={() => {
                    game.setRestSeconds(sec);
                    setCustomInput(String(sec));
                  }}
                  className={`flex-1 rounded-2xl border py-4 ${
                    active
                      ? "border-accent bg-accent/20"
                      : "border-border bg-elevated"
                  }`}
                >
                  <Text
                    className={`text-center font-semibold ${
                      active ? "text-accent" : "text-white"
                    }`}
                  >
                    {sec}s
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            className="mt-4 rounded-2xl border border-border bg-surface px-4 py-4 text-white"
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

          <View className="mt-8 mb-10">
            <PrimaryButton
              label="Commencer"
              onPress={() => game.startGame(game.restSeconds)}
            />
          </View>
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
            {game.cards.map((card, index) => {
              const faceUp = game.isFaceUp(card.id);
              const matched = game.isMatched(card.id);
              return (
                <MotiView
                  key={card.id}
                  from={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 25, type: "timing", duration: 200 }}
                >
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
                </MotiView>
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
