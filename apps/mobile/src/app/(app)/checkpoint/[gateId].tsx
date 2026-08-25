import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ConfettiBurst } from "@/features/gamification/confetti";
import {
  useCheckpointGate,
  useSubmitCheckpointGate,
} from "@/features/path/api";
import { ApiError } from "@/shared/api/client";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

type SubmitResult = {
  score: number;
  passed: boolean;
  passThreshold: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSec: number;
  xpEarned: number;
  xpTotal: number;
  level: number;
  nextLessonId: string | null;
  categoryId: string;
};

export default function CheckpointGateScreen() {
  const { gateId } = useLocalSearchParams<{ gateId: string }>();
  const { data: gate, isLoading, isError, error } = useCheckpointGate(gateId);
  const submit = useSubmitCheckpointGate();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, { questionId: string; selectedAnswerIds: string[] }>
  >({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const startRef = useRef<number>(0);
  const submittedRef = useRef(false);

  const question = gate?.questions[index];
  const isLast = !!gate && index >= gate.questions.length - 1;

  const finish = async (
    finalAnswers: Record<
      string,
      { questionId: string; selectedAnswerIds: string[] }
    >,
  ) => {
    if (!gate || submittedRef.current) return;
    submittedRef.current = true;
    const elapsed = Math.min(
      gate.timeLimitSec,
      Math.max(1, Math.round((Date.now() - startRef.current) / 1000)),
    );
    try {
      const res = await submit.mutateAsync({
        gateId: gate.id,
        answers: Object.values(finalAnswers),
        timeSpentSec: elapsed,
      });
      setResult(res);
    } catch {
      submittedRef.current = false;
    }
  };

  useEffect(() => {
    if (!started || !gate || result) return;
    if (timeLeft <= 0) {
      void finish(answers);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, timeLeft, gate, result, answers]);

  const pickAnswer = (answerId: string) => {
    if (!question || !gate || submittedRef.current) return;
    const nextAnswers = {
      ...answers,
      [question.id]: {
        questionId: question.id,
        selectedAnswerIds: [answerId],
      },
    };
    setAnswers(nextAnswers);

    if (isLast) {
      void finish(nextAnswers);
      return;
    }
    setIndex((i) => i + 1);
  };

  const begin = () => {
    if (!gate) return;
    setStarted(true);
    setTimeLeft(gate.timeLimitSec);
    startRef.current = Date.now();
  };

  const thresholdPct = useMemo(
    () => (gate ? Math.round(gate.passThreshold * 100) : 90),
    [gate],
  );

  if (isError) {
    const locked = error instanceof ApiError && error.status === 403;
    return (
      <Screen>
        <Text className="text-lg text-white">
          {locked ? "Checkpoint verrouillé" : "Checkpoint indisponible"}
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

  if (isLoading || !gate) {
    return (
      <Screen>
        <Text className="text-muted">Préparation du checkpoint…</Text>
      </Screen>
    );
  }

  if (result) {
    const needed = Math.ceil(gate.questions.length * gate.passThreshold);
    return (
      <Screen>
        <ConfettiBurst active={result.passed} />
        <View className="flex-1 justify-center">
          <Text className="text-xs uppercase tracking-[3px] text-accent">
            {result.passed ? "Checkpoint validé" : "Pas encore"}
          </Text>
          <Text className="mt-3 text-4xl font-semibold text-white">
            {result.correctCount}/{result.totalQuestions}
          </Text>
          <Text className="mt-2 text-muted">
            {result.passed
              ? `+${result.xpEarned} neurolift · ${result.timeSpentSec}s`
              : `Il faut ${needed}/${gate.questions.length} (${thresholdPct} %)`}
          </Text>
          <View className="mt-10 gap-3">
            {result.passed && result.nextLessonId ? (
              <PrimaryButton
                label="Leçon suivante"
                onPress={() =>
                  router.replace(`/(app)/lesson/${result.nextLessonId}`)
                }
              />
            ) : null}
            <PrimaryButton
              label={result.passed ? "Retour au parcours" : "Réessayer"}
              onPress={() => {
                if (result.passed) {
                  router.replace(`/(app)/category/${result.categoryId}`);
                } else {
                  submittedRef.current = false;
                  setResult(null);
                  setIndex(0);
                  setAnswers({});
                  setStarted(false);
                  setTimeLeft(gate.timeLimitSec);
                }
              }}
            />
          </View>
        </View>
      </Screen>
    );
  }

  if (!started) {
    return (
      <Screen>
        <View className="flex-1 justify-center">
          <Text className="text-xs uppercase tracking-[3px] text-accent">
            Checkpoint
          </Text>
          <Text className="mt-3 text-3xl font-semibold text-white">
            {gate.title}
          </Text>
          <Text className="mt-4 text-base text-muted">
            {gate.questionCount} questions en {gate.timeLimitSec} secondes.
            Objectif : {thresholdPct} % minimum.
          </Text>
          <View className="mt-10">
            <PrimaryButton label="C'est parti" onPress={begin} />
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="text-sm text-muted">
          {index + 1} / {gate.questions.length}
        </Text>
        <Text
          className={`text-lg font-semibold ${timeLeft <= 10 ? "text-red-400" : "text-accent"}`}
        >
          {timeLeft}s
        </Text>
      </View>

      <Text className="text-xl font-medium leading-8 text-white">
        {question?.prompt}
      </Text>

      <View className="mt-8 gap-3">
        {(question?.answers ?? []).map((a) => (
          <Pressable
            key={a.id}
            onPress={() => pickAnswer(a.id)}
            className="rounded-2xl border border-border bg-surface px-4 py-4 active:opacity-80"
          >
            <Text className="text-base text-white">{a.label}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
