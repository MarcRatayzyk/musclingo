import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ConfettiBurst } from "@/features/gamification/confetti";
import { useQuizByLesson, useSubmitQuiz } from "@/features/home/api";
import {
  MatchQuestion,
  addBidirectionalMatch,
  removeMatchForLeft,
  rightIdsInLeftOrder,
  splitMatchColumns,
} from "@/features/quiz/components/MatchQuestion";
import type { QuizQuestion } from "@/features/quiz/types";
import { ApiError } from "@/shared/api/client";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

type SubmitResult = {
  score: number;
  perfect: boolean;
  passed: boolean;
  stars: 0 | 1 | 2 | 3;
  timeSpentSec: number;
  nextLessonId: string | null;
  xpEarned: number;
  feedback: Array<{
    questionId: string;
    isCorrect: boolean;
    explanation: string;
  }>;
};

type AnswerRecord = {
  questionId: string;
  selectedAnswerIds: string[];
  timeSpentSec: number;
};

function formatTimer(sec: number) {
  const safe = Number.isFinite(sec) ? Math.max(0, Math.floor(sec)) : 0;
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function StarRow({ stars, size = 32 }: { stars: number; size?: number }) {
  return (
    <View className="flex-row gap-1">
      {[1, 2, 3].map((n) => (
        <Text
          key={n}
          style={{ fontSize: size, opacity: n <= stars ? 1 : 0.25 }}
          className="text-accent"
        >
          ★
        </Text>
      ))}
    </View>
  );
}

function TimeProgressBar({
  timeLeft,
  totalSec,
}: {
  timeLeft: number;
  totalSec: number;
}) {
  const safeLeft = Number.isFinite(timeLeft) ? timeLeft : 0;
  const safeTotal = Number.isFinite(totalSec) && totalSec > 0 ? totalSec : 60;
  const ratio = Math.max(0, Math.min(1, safeLeft / safeTotal));
  const barColor =
    ratio <= 1 / 6 ? "#F87171" : ratio <= 1 / 3 ? "#FBBF24" : "#7CFFCB";

  return (
    <View className="mt-2">
      <View className="h-2 overflow-hidden rounded-full bg-border">
        <View
          style={{
            width: `${ratio * 100}%`,
            height: "100%",
            backgroundColor: barColor,
          }}
        />
      </View>
      <Text className="mt-1 text-right text-xs text-muted">
        {formatTimer(safeLeft)} · 10 questions
      </Text>
    </View>
  );
}

export default function QuizScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { data: quiz, isLoading, isError, error, refetch } = useQuizByLesson(
    lessonId,
  );
  const submit = useSubmitQuiz();

  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [failed, setFailed] = useState(false);
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lockedChoice, setLockedChoice] = useState<string | null>(null);
  const [matches, setMatches] = useState<
    Array<{ leftId: string; rightId: string }>
  >([]);
  const [matchWrong, setMatchWrong] = useState(false);
  const matchTriedKeyRef = useRef("");

  const deadlineRef = useRef(Date.now() + 60_000);
  const accountedTimeRef = useRef(0);

  const quizTimeSec = quiz?.quizTimeSec ?? 60;
  const wrongPenaltySec = quiz?.wrongPenaltySec ?? 1;
  const answerKeys = useMemo(
    () => quiz?.answerKeys ?? {},
    [quiz?.answerKeys],
  );

  const syncTimerFromDeadline = useCallback(() => {
    const left = Math.max(
      0,
      Math.ceil((deadlineRef.current - Date.now()) / 1000),
    );
    setTimeLeft(left);
    return left;
  }, []);

  const resetTimer = useCallback(
    (durationSec: number) => {
      deadlineRef.current = Date.now() + durationSec * 1000;
      accountedTimeRef.current = 0;
      syncTimerFromDeadline();
    },
    [syncTimerFromDeadline],
  );

  const resetQuiz = useCallback(() => {
    setIndex(0);
    setAnswers([]);
    setResult(null);
    setFailed(false);
    setWrongFlash(null);
    setSubmitError(null);
    setLockedChoice(null);
    setMatches([]);
    setMatchWrong(false);
    matchTriedKeyRef.current = "";
    resetTimer(quizTimeSec);
    void refetch();
  }, [quizTimeSec, refetch, resetTimer]);

  useEffect(() => {
    if (!quiz) return;
    resetTimer(quiz.quizTimeSec);
  }, [quiz?.sessionId, quiz?.quizTimeSec, resetTimer]);

  const question = quiz?.questions[index];
  const isLast = !!quiz && index >= quiz.questions.length - 1;
  const matchQuestion = useMemo((): QuizQuestion | null => {
    if (!question) return null;
    const isMatch =
      question.type === "MATCH" ||
      question.choices.some((c) => !!c.matchKey);
    if (!isMatch) return null;
    return {
      id: question.id,
      type: "MATCH",
      prompt: question.prompt,
      order: index,
      payload: question.imageUrl ? { imageUrl: question.imageUrl } : null,
      answers: question.choices.map((c, i) => ({
        id: c.id,
        label: c.label,
        order: c.order ?? i,
        matchKey: c.matchKey,
      })),
    };
  }, [question, index]);

  useEffect(() => {
    setMatches([]);
    setMatchWrong(false);
    matchTriedKeyRef.current = "";
  }, [question?.id]);

  useEffect(() => {
    if (!quiz || result || failed) return;

    syncTimerFromDeadline();
    const id = setInterval(() => {
      const left = syncTimerFromDeadline();
      if (left <= 0) setFailed(true);
    }, 250);

    return () => clearInterval(id);
  }, [quiz, result, failed, syncTimerFromDeadline]);

  const elapsedTotalSec = () => {
    const left = Math.max(
      0,
      Math.ceil((deadlineRef.current - Date.now()) / 1000),
    );
    return Math.max(0, Math.min(quizTimeSec, quizTimeSec - left));
  };

  const commitQuestion = async (selectedAnswerIds: string[]) => {
    if (!quiz || !question || result || failed) return;

    const totalSoFar = elapsedTotalSec();
    const questionSpent = Math.max(1, totalSoFar - accountedTimeRef.current);
    accountedTimeRef.current = totalSoFar;

    const record: AnswerRecord = {
      questionId: question.id,
      selectedAnswerIds,
      timeSpentSec: questionSpent,
    };
    const nextAnswers = [...answers, record];

    if (!isLast) {
      setTimeout(() => {
        setAnswers(nextAnswers);
        setIndex((i) => i + 1);
        setLockedChoice(null);
      }, 180);
      return;
    }

    const totalTimeSpentSec = Math.max(1, accountedTimeRef.current);
    try {
      const resSubmit = await submit.mutateAsync({
        quizId: quiz.id,
        sessionId: quiz.sessionId,
        answers: nextAnswers,
        totalTimeSpentSec,
      });
      setResult(resSubmit);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Impossible d'envoyer le quiz",
      );
      setLockedChoice(null);
    }
  };

  const pickAnswer = async (choiceId: string) => {
    if (!quiz || !question || result || failed || lockedChoice) return;
    if (question.type === "MATCH" || question.choices.some((c) => !!c.matchKey)) {
      return;
    }

    const correctId = answerKeys[question.id];
    if (!correctId) return;

    setSubmitError(null);
    setLockedChoice(choiceId);

    const isCorrect = choiceId === correctId;

    if (!isCorrect) {
      setWrongFlash(choiceId);
      deadlineRef.current -= wrongPenaltySec * 1000;
      syncTimerFromDeadline();
      setTimeout(() => {
        setWrongFlash(null);
        setLockedChoice(null);
      }, 350);
      return;
    }

    await commitQuestion([choiceId]);
  };

  const confirmMatch = async () => {
    if (!quiz || !question || !matchQuestion || result || failed || lockedChoice) {
      return;
    }
    const { lefts } = splitMatchColumns(matchQuestion.answers);
    const selected = rightIdsInLeftOrder(lefts, matches);
    if (selected.length !== lefts.length) return;

    const expected = answerKeys[question.id];
    if (!expected) return;

    setSubmitError(null);
    setLockedChoice("match");

    if (selected.join("|") !== expected) {
      setMatchWrong(true);
      deadlineRef.current -= wrongPenaltySec * 1000;
      syncTimerFromDeadline();
      setTimeout(() => {
        setMatchWrong(false);
        setLockedChoice(null);
      }, 450);
      return;
    }

    await commitQuestion(selected);
  };

  useEffect(() => {
    if (!quiz || !question || !matchQuestion || result || failed || lockedChoice) {
      return;
    }
    const { lefts } = splitMatchColumns(matchQuestion.answers);
    const selected = rightIdsInLeftOrder(lefts, matches);
    if (selected.length !== lefts.length) {
      matchTriedKeyRef.current = "";
      return;
    }
    const key = selected.join("|");
    if (key === matchTriedKeyRef.current) return;
    matchTriedKeyRef.current = key;
    void confirmMatch();
  }, [matches, matchQuestion, question, quiz, result, failed, lockedChoice]);

  if (isError) {
    const locked = error instanceof ApiError && error.status === 403;
    return (
      <Screen>
        <Text className="text-lg text-white">
          {locked ? "Leçon verrouillée" : "Quiz indisponible"}
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

  if (failed) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl font-semibold text-white">
            Temps écoulé
          </Text>
          <Text className="mt-3 text-center text-muted">
            Les 10 questions doivent être répondues en moins d&apos;une minute.
          </Text>
          <View className="mt-10 w-full">
            <PrimaryButton label="Réessayer" onPress={resetQuiz} />
          </View>
        </View>
      </Screen>
    );
  }

  if (result) {
    return (
      <Screen>
        <ConfettiBurst active={result.stars === 3} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow justify-center pb-8"
        >
          <View className="flex-1 items-center justify-center">
            <StarRow stars={result.stars} size={40} />
            <Text className="mt-4 text-lg text-white">
              {result.passed
                ? `${result.stars} étoile${result.stars > 1 ? "s" : ""}`
                : "Quiz non validé"}
            </Text>
            <Text className="mt-2 text-sm text-muted">
              Temps total {formatTimer(result.timeSpentSec)} /{" "}
              {formatTimer(quizTimeSec)}
            </Text>
            <Text className="mt-6 text-5xl font-semibold text-accent">
              +{result.xpEarned} neurolift
            </Text>

            <View className="mt-10 w-full gap-4">
              {!result.passed ? (
                <PrimaryButton label="Réessayer le quiz" onPress={resetQuiz} />
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
          </View>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen>
      <View>
        <Text className="text-xs text-muted">
          Question {index + 1}/{quiz.questions.length}
        </Text>
        <TimeProgressBar timeLeft={timeLeft} totalSec={quizTimeSec} />
      </View>

      <ScrollView
        className="mt-4 flex-1"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-semibold text-white">
          {question?.prompt}
        </Text>

        {matchQuestion ? (
          <View className="mt-2 pb-8">
            <MatchQuestion
              question={matchQuestion}
              matches={matches}
              wrong={matchWrong}
              disabled={!!lockedChoice}
              onAssign={(leftId, rightId) => {
                if (lockedChoice) return;
                setMatches((current) =>
                  addBidirectionalMatch(current, leftId, rightId),
                );
              }}
              onUnassign={(leftId) => {
                if (lockedChoice) return;
                setMatches((current) => removeMatchForLeft(current, leftId));
              }}
            />
          </View>
        ) : (
          <View className="mt-6 gap-3">
            {question?.choices.map((choice) => {
              const isWrong = wrongFlash === choice.id;
              const isLocked = lockedChoice === choice.id;
              return (
                <Pressable
                  key={choice.id}
                  disabled={!!lockedChoice}
                  onPress={() => void pickAnswer(choice.id)}
                  className={`rounded-2xl border px-4 py-4 ${
                    isWrong
                      ? "border-red-500 bg-red-500/10"
                      : isLocked
                        ? "border-accent bg-accent/10"
                        : "border-border bg-surface"
                  }`}
                >
                  <Text className="text-base text-white">{choice.label}</Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {submitError ? (
          <Text className="mt-4 text-center text-sm text-red-400">
            {submitError}
          </Text>
        ) : null}
      </ScrollView>
    </Screen>
  );
}
