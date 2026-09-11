import { MINI_GAME_LIVES, MINI_GAME_MIN_DURATION_SEC } from "@muscle-mind/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { ConfettiBurst } from "@/features/gamification/confetti";
import {
  useMiniGames,
  useMiniGameQuestions,
  useSubmitMiniGameResult,
  type MiniGameResult,
} from "@/features/mini-games/api";
import { clampDuration, useFlashQuiz } from "@/features/mini-games/useFlashQuiz";
import { resolveMediaUrl } from "@/shared/api/client";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";
import { FlashGameSkeleton } from "@/shared/ui/Skeleton";

const DURATION_MODES = [
  { sec: 30, label: "Éclair", hint: "Tout donner" },
  { sec: 60, label: "Rapide", hint: "Équilibré" },
  { sec: 120, label: "Endurance", hint: "Tenir le rythme" },
] as const;

function Hearts({ left, total }: { left: number; total: number }) {
  return (
    <View className="flex-row gap-1">
      {Array.from({ length: total }, (_, i) => (
        <Text
          key={i}
          style={{ fontSize: 18, opacity: i < left ? 1 : 0.25 }}
        >
          {i < left ? "❤️" : "🖤"}
        </Text>
      ))}
    </View>
  );
}

function SetupHero({
  name,
  color,
  bestScore,
  gamesPlayed,
}: {
  name: string;
  color: string;
  bestScore: number;
  gamesPlayed: number;
}) {
  return (
    <Animated.View
      entering={FadeIn.duration(420)}
      style={{
        borderRadius: 28,
        borderWidth: 1,
        borderColor: color + "55",
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
          <LinearGradient id="flashSetupBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.28" />
            <Stop offset="0.55" stopColor="#121820" stopOpacity="1" />
            <Stop offset="1" stopColor="#0B0F14" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#flashSetupBg)" />
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
          backgroundColor: color + "22",
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
          {name}
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
              Parties
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: "800",
                marginTop: 2,
              }}
            >
              {gamesPlayed}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: "rgba(0,0,0,0.28)",
              paddingVertical: 12,
              paddingHorizontal: 12,
              alignItems: "flex-start",
            }}
          >
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
              Vies
            </Text>
            <Text style={{ fontSize: 18, marginTop: 4 }}>
              {"❤️".repeat(MINI_GAME_LIVES)}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function FlashQuizScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { data, isLoading, isError, error } = useMiniGameQuestions(
    categoryId ?? "",
  );
  const { data: summaries } = useMiniGames();
  const submitResult = useSubmitMiniGameResult();

  const questions = useMemo(() => data?.questions ?? [], [data]);
  const game = useFlashQuiz(questions);
  const summary = useMemo(
    () => summaries?.find((g) => g.categoryId === categoryId),
    [summaries, categoryId],
  );

  const [customInput, setCustomInput] = useState("60");
  const [showCustom, setShowCustom] = useState(false);
  const [result, setResult] = useState<MiniGameResult | null>(null);
  const submittedRef = useRef(false);

  const color = data?.color ?? "#7CFFB2";
  const isCustomDuration = !DURATION_MODES.some(
    (m) => m.sec === game.durationSec,
  );

  useEffect(() => {
    if (game.phase !== "finished") {
      submittedRef.current = false;
      return;
    }
    if (submittedRef.current || !categoryId) return;
    submittedRef.current = true;

    submitResult.mutate(
      {
        categoryId,
        durationSec: game.durationSec,
        correctCount: game.correctCount,
        wrongCount: game.wrongCount,
        bestCombo: game.bestCombo,
        endedBy: game.endedBy,
      },
      { onSuccess: setResult },
    );
    // Un seul envoi par partie terminée
  }, [game.phase, categoryId]);

  const startNewGame = (seconds: number) => {
    setResult(null);
    game.startGame(seconds);
  };

  return (
    <Screen>
      <View className="mb-4 flex-row items-center">
        <Pressable onPress={() => router.replace("/(app)/mini-games")}>
          <Text className="text-sm text-muted">← Mini-jeux</Text>
        </Pressable>
      </View>

      {isLoading && <FlashGameSkeleton />}

      {isError && (
        <Text className="text-muted">
          {error instanceof Error ? error.message : "Questions indisponibles"}
        </Text>
      )}

      {data && questions.length === 0 && (
        <View className="mt-10 items-center px-6">
          <Text className="text-center text-lg text-white">
            Pas encore de questions
          </Text>
          <Text className="mt-2 text-center text-sm text-muted">
            Apprends quelques leçons de ce parcours, puis reviens jouer.
          </Text>
        </View>
      )}

      {data && questions.length > 0 && game.phase === "setup" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SetupHero
            name={data.name}
            color={color}
            bestScore={summary?.bestScore ?? 0}
            gamesPlayed={summary?.gamesPlayed ?? 0}
          />

          <Animated.View entering={FadeInDown.duration(380).delay(80)}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {DURATION_MODES.map((mode) => {
                const active = game.durationSec === mode.sec;
                return (
                  <Pressable
                    key={mode.sec}
                    onPress={() => {
                      game.setDurationSec(mode.sec);
                      setCustomInput(String(mode.sec));
                      setShowCustom(false);
                    }}
                    style={{
                      flex: 1,
                      alignItems: "center",
                      borderRadius: 20,
                      borderWidth: 2,
                      borderColor: active ? color : "#2A3344",
                      backgroundColor: active ? color + "1A" : "#141820",
                      paddingVertical: 16,
                      paddingHorizontal: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: active ? color : "#FFFFFF",
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
                        color: active ? color : "rgba(255,255,255,0.45)",
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
                  color: isCustomDuration || showCustom ? color : "#8B95A8",
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                {showCustom || isCustomDuration
                  ? "Durée perso"
                  : "Personnaliser la durée…"}
              </Text>
            </Pressable>

            {(showCustom || isCustomDuration) && (
              <TextInput
                className="mt-2 rounded-2xl border border-border bg-surface px-4 py-4 text-white"
                placeholder={`Secondes (min. ${MINI_GAME_MIN_DURATION_SEC})`}
                placeholderTextColor="#8B95A8"
                keyboardType="number-pad"
                value={customInput}
                onChangeText={(t) => {
                  setCustomInput(t);
                  const n = parseInt(t, 10);
                  if (!Number.isNaN(n)) game.setDurationSec(clampDuration(n));
                }}
              />
            )}

            <View className="mb-10 mt-6">
              <PrimaryButton
                label={`C’est parti · ${game.durationSec}s`}
                onPress={() => startNewGame(game.durationSec)}
              />
            </View>
          </Animated.View>
        </ScrollView>
      )}

      {game.phase === "countdown" && (
        <View className="flex-1 items-center justify-center">
          <Text
            key={game.countdown}
            style={{
              color,
              fontSize: 96,
              fontWeight: "700",
            }}
          >
            {game.countdown > 0 ? String(game.countdown) : "Go"}
          </Text>
          <Text className="mt-4 text-sm text-muted">Prépare-toi…</Text>
        </View>
      )}

      {game.phase === "playing" && game.question && (
        <View className="flex-1">
          <View className="mb-5 flex-row items-center justify-between">
            <Hearts left={game.livesLeft} total={game.lives} />
            <View className="items-center">
              <Text className="text-xs text-muted">Bonnes</Text>
              <Text
                className="text-xl font-semibold"
                style={{ color }}
              >
                {game.correctCount}
              </Text>
            </View>
            <Text
              className={`text-2xl font-semibold ${
                game.secondsLeft <= 5 ? "text-danger" : "text-white"
              }`}
            >
              {game.secondsLeft}s
            </Text>
          </View>

          {game.combo >= 3 && (
            <View
              className="mb-3 self-center rounded-full px-4 py-1"
              style={{ backgroundColor: color + "22" }}
            >
              <Text
                className="text-xs font-semibold uppercase tracking-[2px]"
                style={{ color }}
              >
                Série de {game.combo}
              </Text>
            </View>
          )}

          <ScrollView showsVerticalScrollIndicator={false}>
            {game.question.imageUrl && (
              <View className="mb-4 items-center">
                <Image
                  source={{
                    uri: resolveMediaUrl(game.question.imageUrl) ?? undefined,
                  }}
                  style={{ width: "100%", height: 200 }}
                  resizeMode="contain"
                />
                {game.question.color && (
                  <View
                    className="mt-3 h-7 w-7 rounded-lg"
                    style={{
                      backgroundColor: game.question.color,
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.35)",
                    }}
                  />
                )}
              </View>
            )}

            <Text className="mb-5 text-xl font-semibold text-white">
              {game.question.prompt}
            </Text>

            {game.question.choices.map((choice) => {
              const picked = game.pickedChoiceId === choice.id;
              const revealed = game.feedback !== null;
              const showCorrect = revealed && choice.isCorrect;
              const showWrong = revealed && picked && !choice.isCorrect;

              return (
                <Pressable
                  key={choice.id}
                  disabled={revealed}
                  onPress={() => game.answer(choice.id)}
                  className="mb-3 rounded-2xl border px-4 py-4"
                  style={{
                    borderColor: showCorrect
                      ? "#7CFFB2"
                      : showWrong
                        ? "#FF6B7A"
                        : "#2A3344",
                    backgroundColor: showCorrect
                      ? "#7CFFB218"
                      : showWrong
                        ? "#FF6B7A18"
                        : "#1C2230",
                  }}
                >
                  <Text className="text-base font-medium text-white">
                    {choice.label}
                  </Text>
                </Pressable>
              );
            })}

            <Pressable
              disabled={!game.canSkip || game.feedback !== null}
              onPress={game.skip}
              className="mb-10 mt-2 rounded-2xl border border-border py-3"
              style={{ opacity: game.canSkip ? 1 : 0.35 }}
            >
              <Text className="text-center text-sm font-semibold text-muted">
                {game.canSkip ? "Passer (coûte une vie)" : "Passer…"}
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      )}

      {game.phase === "finished" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ConfettiBurst active={!!result?.isNewRecord} />

          <Text className="text-3xl font-semibold text-white">
            {game.endedBy === "lives" ? "Plus de vies" : "Temps écoulé"}
          </Text>
          <Text className="mt-2 text-base text-muted">
            {game.correctCount} bonne{game.correctCount === 1 ? "" : "s"}{" "}
            réponse{game.correctCount === 1 ? "" : "s"} en {game.durationSec}s.
          </Text>

          <View className="mt-8 rounded-3xl border border-border bg-surface p-5">
            <Text className="text-sm text-muted">Score</Text>
            <Text className="mt-1 text-5xl font-semibold text-white">
              {result?.score ?? game.score}
            </Text>
            <Text className="mt-1 text-xs text-muted">
              bonnes réponses par minute
            </Text>

            {result?.isNewRecord && (
              <Text
                className="mt-3 font-semibold"
                style={{ color }}
              >
                Nouveau record !
              </Text>
            )}

            <Text className="mt-3 text-sm text-muted">
              Meilleur score : {result?.bestScore ?? game.score}
            </Text>
          </View>

          <View className="mt-4 flex-row gap-3">
            <View className="flex-1 rounded-2xl border border-border bg-surface p-4">
              <Text className="text-xs text-muted">Meilleure série</Text>
              <Text className="mt-1 text-2xl font-semibold text-white">
                {game.bestCombo}
              </Text>
            </View>
            <View className="flex-1 rounded-2xl border border-border bg-surface p-4">
              <Text className="text-xs text-muted">Vies perdues</Text>
              <Text className="mt-1 text-2xl font-semibold text-white">
                {game.wrongCount}/{game.lives}
              </Text>
            </View>
          </View>

          {result && result.badgesEarned.length > 0 && (
            <View className="mt-4 rounded-3xl border border-border bg-surface p-4">
              <Text className="mb-2 text-sm font-semibold text-white">
                Nouveaux badges
              </Text>
              {result.badgesEarned.map((badge) => (
                <Text key={badge.code} className="mt-1 text-sm text-muted">
                  {badge.name} — {badge.description}
                </Text>
              ))}
            </View>
          )}

          <View className="mb-10 mt-8 gap-3">
            <PrimaryButton
              label="Rejouer"
              onPress={() => {
                setResult(null);
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
