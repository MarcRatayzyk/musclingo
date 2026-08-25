import { router, useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { ConfettiBurst } from "@/features/gamification/confetti";
import { useQuizByLesson, useSubmitQuiz } from "@/features/home/api";
import { ApiError, resolveMediaUrl } from "@/shared/api/client";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

type SubmitResult = {
  score: number;
  perfect: boolean;
  passed: boolean;
  passThreshold: number;
  nextLessonId: string | null;
  categoryId: string;
  xpEarned: number;
  level: number;
  xpTotal: number;
  feedback: Array<{
    questionId: string;
    isCorrect: boolean;
    explanation: string;
    correctAnswerIds: string[];
  }>;
  badges: Array<{ code: string; name: string }>;
  streak: { current: number; longest: number };
};

type QuestionPayload = {
  imageUrl?: string;
  color?: string;
};

export default function QuizScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { data: quiz, isLoading, isError, error } = useQuizByLesson(lessonId);
  const submit = useSubmitQuiz();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { width: screenW } = useWindowDimensions();

  const question = quiz?.questions[index];
  const answers = useMemo(() => question?.answers ?? [], [question]);
  const isLast = !!quiz && index >= quiz.questions.length - 1;
  const isText = question?.type === "TEXT";
  const payload = (question?.payload ?? null) as QuestionPayload | null;
  const imageUri = resolveMediaUrl(payload?.imageUrl ?? null);
  const colorSwatch = payload?.color;
  const hasAnswer = isText
    ? !!(question && textAnswers[question.id]?.trim())
    : !!(question && selected[question.id]);

  if (isError) {
    const locked = error instanceof ApiError && error.status === 403;
    return (
      <Screen>
        <Text className="text-lg text-white">
          {locked ? "Leçon verrouillée" : "Quiz indisponible"}
        </Text>
        <Text className="mt-2 text-muted">
          {error instanceof Error ? error.message : "Erreur"}
        </Text>
        <View className="mt-8">
          <PrimaryButton
            label="Retour"
            onPress={() => router.replace("/(app)/categories")}
          />
        </View>
      </Screen>
    );
  }

  if (isLoading || !quiz) {
    return (
      <Screen>
        <Text className="text-muted">Préparation du quiz…</Text>
      </Screen>
    );
  }

  if (result) {
    const thresholdPct = Math.round(result.passThreshold * 100);
    const scorePct = Math.round(result.score * 100);
    const feedbackByQuestion = new Map(
      result.feedback.map((f) => [f.questionId, f]),
    );

    const getUserAnswerLabel = (questionId: string, type: string) => {
      const q = quiz.questions.find((item) => item.id === questionId);
      if (!q) return "—";
      if (type === "TEXT") {
        return textAnswers[questionId]?.trim() || "—";
      }
      const answerId = selected[questionId];
      return q.answers.find((a) => a.id === answerId)?.label ?? "—";
    };

    const getCorrectAnswerLabel = (
      questionId: string,
      correctAnswerIds: string[],
    ) => {
      const q = quiz.questions.find((item) => item.id === questionId);
      if (!q) return "—";
      return (
        q.answers
          .filter((a) => correctAnswerIds.includes(a.id))
          .map((a) => a.label)
          .join(", ") || "—"
      );
    };

    return (
      <Screen>
        <ConfettiBurst active={result.passed && result.perfect} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow justify-center pb-8"
        >
          <MotiView
            from={{ scale: 0.92, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 justify-center"
          >
            <MotiView
              from={{ translateY: 20, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ delay: 150 }}
            >
              <Text className="text-5xl font-semibold text-accent">
                +{result.xpEarned} neurolift
              </Text>
            </MotiView>

            <Text className="mt-3 text-lg text-white">
              {result.passed
                ? `Score ${scorePct} %`
                : `Score ${scorePct} % · ${thresholdPct} % requis`}
            </Text>

            <Pressable
              onPress={() => setShowCorrection((v) => !v)}
              className="mt-6 self-start active:opacity-70"
            >
              <Text className="text-sm text-muted underline">
                {showCorrection ? "Masquer la correction" : "Voir correction"}
              </Text>
            </Pressable>

            {showCorrection && (
              <View className="mt-4 gap-4">
                {quiz.questions.map((q, i) => {
                  const fb = feedbackByQuestion.get(q.id);
                  if (!fb) return null;
                  return (
                    <View
                      key={q.id}
                      className="rounded-2xl border border-border bg-surface px-4 py-3"
                    >
                      <Text className="text-xs text-muted">
                        Question {i + 1} · {fb.isCorrect ? "✓" : "✗"}
                      </Text>
                      <Text className="mt-1 text-base text-white">
                        {q.prompt}
                      </Text>
                      <Text className="mt-2 text-sm text-muted">
                        Ta réponse :{" "}
                        <Text className="text-white">
                          {getUserAnswerLabel(q.id, q.type)}
                        </Text>
                      </Text>
                      {!fb.isCorrect && (
                        <Text className="mt-1 text-sm text-muted">
                          Bonne réponse :{" "}
                          <Text className="text-accent">
                            {getCorrectAnswerLabel(q.id, fb.correctAnswerIds)}
                          </Text>
                        </Text>
                      )}
                      {fb.explanation ? (
                        <Text className="mt-2 text-sm text-muted">
                          {fb.explanation}
                        </Text>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            )}

            <View className="mt-10 gap-4">
              {!result.passed ? (
                <PrimaryButton
                  label="Réessayer le quiz"
                  onPress={() => {
                    setResult(null);
                    setShowCorrection(false);
                    setIndex(0);
                    setSelected({});
                    setTextAnswers({});
                    setSubmitError(null);
                  }}
                />
              ) : result.nextLessonId ? (
                <PrimaryButton
                  label="Leçon suivante"
                  onPress={() =>
                    router.replace(`/(app)/lesson/${result.nextLessonId}`)
                  }
                />
              ) : (
                <PrimaryButton
                  label="Retour au parcours"
                  onPress={() => router.replace("/(app)/home")}
                />
              )}

              <Pressable
                onPress={() => router.replace("/(app)/home")}
                className="items-center py-2 active:opacity-70"
              >
                <Text className="text-sm text-muted">Voir le parcours</Text>
              </Pressable>
            </View>
          </MotiView>
        </ScrollView>
      </Screen>
    );
  }

  const imgW = screenW - 48;

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text className="text-xs text-muted">
          Question {index + 1}/{quiz.questions.length}
        </Text>
        <ScrollView
          className="mt-4 flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <MotiView
            key={question?.id}
            from={{ opacity: 0, translateX: 28 }}
            animate={{ opacity: 1, translateX: 0 }}
          >
            <Text className="text-2xl font-semibold text-white">
              {question?.prompt}
            </Text>

            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                accessibilityLabel="Illustration du quiz"
                style={{
                  width: imgW,
                  height: Math.min(imgW * 1.1, 280),
                  marginTop: 16,
                  alignSelf: "center",
                }}
                resizeMode="contain"
              />
            ) : null}

            {colorSwatch ? (
              <View className="mt-4 flex-row items-center gap-3">
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    backgroundColor: colorSwatch,
                    borderWidth:
                      colorSwatch.toLowerCase() === "#f5f5f5" ? 1 : 0,
                    borderColor: "rgba(255,255,255,0.35)",
                  }}
                />
                <Text className="text-sm text-muted">Cette couleur</Text>
              </View>
            ) : null}

            {isText ? (
              <TextInput
                value={question ? textAnswers[question.id] ?? "" : ""}
                onChangeText={(value) => {
                  if (!question) return;
                  setTextAnswers((s) => ({ ...s, [question.id]: value }));
                }}
                placeholder="Écris le nom de la structure…"
                placeholderTextColor="rgba(255,255,255,0.35)"
                autoCapitalize="none"
                autoCorrect={false}
                className="mt-6 rounded-2xl border border-border bg-surface px-4 py-4 text-base text-white"
              />
            ) : (
              <View className="mt-6 gap-3">
                {answers.map((answer) => {
                  const isSelected = selected[question!.id] === answer.id;
                  return (
                    <Pressable
                      key={answer.id}
                      onPress={() =>
                        setSelected((s) => ({
                          ...s,
                          [question!.id]: answer.id,
                        }))
                      }
                      className={`rounded-2xl border px-4 py-4 ${
                        isSelected
                          ? "border-accent bg-accent/10"
                          : "border-border bg-surface"
                      }`}
                    >
                      <Text className="text-base text-white">
                        {answer.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </MotiView>
        </ScrollView>

        <View className="mb-4 gap-2">
          {submitError ? (
            <Text className="text-center text-sm text-red-400">
              {submitError}
            </Text>
          ) : null}
          <PrimaryButton
            label={
              submit.isPending
                ? "Correction…"
                : isLast
                  ? "Voir mon score"
                  : "Suivant"
            }
            disabled={!question || !hasAnswer || submit.isPending}
            onPress={async () => {
              if (!question) return;
              if (!isLast) {
                setIndex((i) => i + 1);
                return;
              }
              setSubmitError(null);
              try {
                const answersPayload = quiz.questions.map((q) => {
                  if (q.type === "TEXT") {
                    return {
                      questionId: q.id,
                      selectedAnswerIds: [] as string[],
                      textAnswer: textAnswers[q.id]?.trim() ?? "",
                    };
                  }
                  return {
                    questionId: q.id,
                    selectedAnswerIds: selected[q.id]
                      ? [selected[q.id]!]
                      : [],
                  };
                });
                const res = await submit.mutateAsync({
                  quizId: quiz.id,
                  answers: answersPayload,
                });
                setResult(res);
              } catch (err) {
                setSubmitError(
                  err instanceof Error
                    ? err.message
                    : "Impossible d’envoyer le quiz",
                );
              }
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
