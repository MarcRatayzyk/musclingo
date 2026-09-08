import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight } from "react-native-reanimated";
import { useMe } from "@/features/auth/api";
import { ConfettiBurst } from "@/features/gamification/confetti";
import {
  useQuizByLesson,
  useQuizHint,
  useSubmitQuiz,
} from "@/features/home/api";
import { GorillaAvatar, quizResultMascotSource } from "@/features/mascot/components/GorillaAvatar";
import { mascotKindFromCategorySlug } from "@/features/mascot/assets";
import {
  MatchQuestion,
  initialOrderedRightIds,
  rightIdsInLeftOrder,
  splitMatchColumns,
} from "@/features/quiz/components/MatchQuestion";
import { MultiChoiceQuestion } from "@/features/quiz/components/MultiChoiceQuestion";
import {
  OrderQuestion,
  shuffleOrderIds,
} from "@/features/quiz/components/OrderQuestion";
import { TrueFalseQuestion } from "@/features/quiz/components/TrueFalseQuestion";
import type { QuizQuestion } from "@/features/quiz/types";
import { EXTRA_QUIZ_TIME_SEC, WATER_BOTTLE_QUIZ_RETRY_COST } from "@muscle-mind/types";
import { ApiError } from "@/shared/api/client";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";
import { ExtraTimeIcon, QuizHintIcon } from "@/shared/ui/BoostIcons";
import { NeuroliftAmount } from "@/shared/ui/Neurolift";
import { NeuroCoinAmount } from "@/shared/ui/NeuroCoin";
import { StarRow } from "@/shared/ui/Star";
import { NeuroCoinsEarnAnimation } from "@/shared/ui/StarsEarnAnimation";
import { WaterBottleIcon } from "@/shared/ui/WaterBottle";

type SubmitResult = {
  score: number;
  perfect: boolean;
  passed: boolean;
  stars: 0 | 1 | 2 | 3;
  starsGained?: number;
  neuroCoinsEarned?: number;
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

type QuizQuestionType = NonNullable<
  NonNullable<ReturnType<typeof useQuizByLesson>["data"]>["questions"][number]["type"]
>;

function resolveType(
  question: {
    type?: QuizQuestionType;
    choices: Array<{ matchKey?: string | null }>;
  },
): QuizQuestionType {
  if (question.type) return question.type;
  if (question.choices.some((c) => !!c.matchKey)) return "MATCH";
  return "SINGLE";
}

function formatTimer(sec: number) {
  const safe = Number.isFinite(sec) ? Math.max(0, Math.floor(sec)) : 0;
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
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

function toQuizQuestion(
  question: {
    id: string;
    prompt: string;
    type?: QuizQuestionType;
    imageUrl?: string | null;
    choices: Array<{
      id: string;
      label: string;
      matchKey?: string | null;
      order?: number;
    }>;
  },
  index: number,
): QuizQuestion {
  const type = resolveType(question);
  return {
    id: question.id,
    type,
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
}

export default function QuizScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { data: me } = useMe();
  const [started, setStarted] = useState(false);
  const [useExtraTime, setUseExtraTime] = useState(false);
  const { data: quiz, isLoading, isError, error } = useQuizByLesson(
    lessonId,
    { enabled: started, useExtraTime },
  );
  const submit = useSubmitQuiz();
  const hintMutation = useQuizHint();

  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [failed, setFailed] = useState(false);
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lockedChoice, setLockedChoice] = useState<string | null>(null);
  const [selectedMultiIds, setSelectedMultiIds] = useState<string[]>([]);
  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  const [validateWrong, setValidateWrong] = useState(false);
  const [matchDragging, setMatchDragging] = useState(false);
  const [coinsAfter, setCoinsAfter] = useState<number | null>(null);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);
  const [hintUsedForQuestion, setHintUsedForQuestion] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(0);

  const deadlineRef = useRef(Date.now() + 60_000);
  const accountedTimeRef = useRef(0);
  const coinsBeforeRef = useRef(0);

  useEffect(() => {
    if (me?.neuroCoinBalance != null && !result) {
      coinsBeforeRef.current = me.neuroCoinBalance;
    }
  }, [me?.neuroCoinBalance, result]);

  useEffect(() => {
    if (result?.passed && me?.neuroCoinBalance != null) {
      setCoinsAfter(me.neuroCoinBalance);
    }
  }, [result, me?.neuroCoinBalance]);

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
    setSelectedMultiIds([]);
    setOrderedIds([]);
    setValidateWrong(false);
    setMatchDragging(false);
    setCoinsAfter(null);
    setEliminatedIds([]);
    setHintUsedForQuestion(false);
    setStarted(false);
  }, []);

  useEffect(() => {
    if (!quiz) return;
    resetTimer(quiz.quizTimeSec);
    setHintsLeft(quiz.quizHints ?? me?.quizHints ?? 0);
  }, [quiz?.sessionId, quiz?.quizTimeSec, quiz?.quizHints, me?.quizHints, resetTimer]);

  const question = quiz?.questions[index];
  const questionType = question ? resolveType(question) : "SINGLE";
  const isLast = !!quiz && index >= quiz.questions.length - 1;
  const quizQuestion = useMemo((): QuizQuestion | null => {
    if (!question) return null;
    return toQuizQuestion(question, index);
  }, [question, index]);

  const answersById = useMemo(() => {
    const map = new Map<string, QuizQuestion["answers"][number]>();
    if (!quizQuestion) return map;
    for (const a of quizQuestion.answers) map.set(a.id, a);
    return map;
  }, [quizQuestion]);

  useEffect(() => {
    if (!quizQuestion) {
      setSelectedMultiIds([]);
      setOrderedIds([]);
      return;
    }
    setSelectedMultiIds([]);
    setValidateWrong(false);
    setMatchDragging(false);
    setEliminatedIds([]);
    setHintUsedForQuestion(false);
    if (quizQuestion.type === "MATCH") {
      setOrderedIds(initialOrderedRightIds(quizQuestion.answers));
    } else if (quizQuestion.type === "ORDER") {
      setOrderedIds(shuffleOrderIds(quizQuestion));
    } else {
      setOrderedIds([]);
    }
  }, [question?.id, quizQuestion]);

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

  const applyWrongPenalty = () => {
    deadlineRef.current -= wrongPenaltySec * 1000;
    syncTimerFromDeadline();
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
    if (questionType !== "SINGLE" && questionType !== "TRUE_FALSE") return;

    const correctId = answerKeys[question.id];
    if (!correctId) return;

    setSubmitError(null);
    setLockedChoice(choiceId);

    const isCorrect = choiceId === correctId;

    if (!isCorrect) {
      setWrongFlash(choiceId);
      applyWrongPenalty();
      setTimeout(() => {
        setWrongFlash(null);
        setLockedChoice(null);
      }, 350);
      return;
    }

    await commitQuestion([choiceId]);
  };

  const confirmValidate = async () => {
    if (!quiz || !question || !quizQuestion || result || failed || lockedChoice) {
      return;
    }

    const expected = answerKeys[question.id];
    if (!expected) return;

    let selected: string[] = [];
    if (questionType === "MULTI") {
      selected = [...selectedMultiIds].sort();
      if (selected.length === 0) return;
    } else if (questionType === "ORDER") {
      selected = orderedIds;
      if (selected.length !== quizQuestion.answers.length) return;
    } else if (questionType === "MATCH") {
      const { lefts } = splitMatchColumns(quizQuestion.answers);
      selected = rightIdsInLeftOrder(lefts, orderedIds);
      if (selected.length !== lefts.length) return;
    } else {
      return;
    }

    setSubmitError(null);
    setLockedChoice("validate");

    if (selected.join("|") !== expected) {
      setValidateWrong(true);
      applyWrongPenalty();
      setTimeout(() => {
        setValidateWrong(false);
        setLockedChoice(null);
      }, 450);
      return;
    }

    await commitQuestion(selected);
  };

  const applyHint = async () => {
    if (
      !quiz ||
      !question ||
      hintUsedForQuestion ||
      hintsLeft <= 0 ||
      hintMutation.isPending ||
      result ||
      failed
    ) {
      return;
    }
    try {
      const res = await hintMutation.mutateAsync({
        quizId: quiz.id,
        sessionId: quiz.sessionId,
        questionId: question.id,
      });
      setHintsLeft(res.quizHints);
      setHintUsedForQuestion(true);
      if (res.kind === "eliminate" && res.eliminatedChoiceIds.length > 0) {
        setEliminatedIds((prev) => [...prev, ...res.eliminatedChoiceIds]);
      } else if (res.kind === "orderReveal" && res.revealedAnswerId) {
        setOrderedIds((prev) => {
          const next = prev.filter((id) => id !== res.revealedAnswerId);
          next.unshift(res.revealedAnswerId!);
          return next;
        });
      } else if (res.kind === "matchReveal" && res.revealedRightId) {
        setOrderedIds((prev) => {
          const next = prev.filter((id) => id !== res.revealedRightId);
          next.unshift(res.revealedRightId!);
          return next;
        });
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Indice indisponible",
      );
    }
  };

  const needsValidate =
    questionType === "MULTI" ||
    questionType === "ORDER" ||
    questionType === "MATCH";

  const canValidate =
    !!quizQuestion &&
    !lockedChoice &&
    ((questionType === "MULTI" && selectedMultiIds.length > 0) ||
      (questionType === "ORDER" &&
        orderedIds.length === quizQuestion.answers.length) ||
      (questionType === "MATCH" && orderedIds.length > 0));

  const extraCharges = me?.extraTimeCharges ?? 0;
  const visibleChoices = useMemo(() => {
    if (!question) return [];
    return question.choices.filter((c) => !eliminatedIds.includes(c.id));
  }, [question, eliminatedIds]);

  if (!started) {
    return (
      <Screen>
        <View className="flex-1 justify-center">
          <Text className="text-xs uppercase tracking-[3px] text-accent">
            Quiz
          </Text>
          <Text className="mt-3 text-3xl font-semibold text-white">
            Prêt ?
          </Text>
          <Text className="mt-4 text-base text-muted">
            10 questions chronométrées. Les seuils d&apos;étoiles suivent le
            temps imparti
            {useExtraTime
              ? ` (${60 + EXTRA_QUIZ_TIME_SEC} s, 3★ ≤ ${45 + EXTRA_QUIZ_TIME_SEC} s)`
              : " (60 s, 3★ ≤ 45 s)"}
            .
          </Text>
          {extraCharges > 0 ? (
            <Pressable
              onPress={() => setUseExtraTime((v) => !v)}
              className={`mt-6 flex-row items-center gap-3 rounded-2xl border px-4 py-3 ${
                useExtraTime
                  ? "border-accent bg-accent/15"
                  : "border-border bg-surface"
              }`}
            >
              <ExtraTimeIcon size={40} />
              <View className="flex-1">
                <Text className="text-base font-medium text-white">
                  +{EXTRA_QUIZ_TIME_SEC} s ({extraCharges} restant
                  {extraCharges > 1 ? "s" : ""})
                </Text>
                <Text className="mt-1 text-sm text-muted">
                  Décale aussi les seuils d&apos;étoiles
                </Text>
              </View>
            </Pressable>
          ) : null}
          <View className="mt-10">
            <PrimaryButton label="C'est parti" onPress={() => setStarted(true)} />
          </View>
        </View>
      </Screen>
    );
  }

  if (isError) {
    const locked = error instanceof ApiError && error.status === 403;
    const noBottles =
      locked &&
      typeof error.message === "string" &&
      error.message.toLowerCase().includes("bouteille");
    return (
      <Screen>
        <Text className="text-lg text-white">
          {noBottles
            ? "Plus assez de bouteilles"
            : locked
              ? "Leçon verrouillée"
              : "Quiz indisponible"}
        </Text>
        {noBottles ? (
          <Text className="mt-3 text-muted">
            Relancer un quiz coûte {WATER_BOTTLE_QUIZ_RETRY_COST} bouteilles.
            Passe à la boutique ou attends demain.
          </Text>
        ) : null}
        <View className="mt-8 gap-3">
          {noBottles ? (
            <PrimaryButton
              label="Boutique"
              onPress={() => router.replace("/(app)/shop")}
            />
          ) : null}
          <PrimaryButton
            label="Retour"
            onPress={() => router.replace("/(app)/home")}
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
            <View className="mt-3 flex-row items-center justify-center gap-2">
              <Text className="text-sm text-muted">
                Coût : {WATER_BOTTLE_QUIZ_RETRY_COST}
              </Text>
              <WaterBottleIcon size={18} />
            </View>
          </View>
        </View>
      </Screen>
    );
  }

  if (result) {
    const fromTotal = coinsBeforeRef.current;
    const coinsEarned = result.neuroCoinsEarned ?? 0;
    const toTotal =
      coinsAfter ??
      me?.neuroCoinBalance ??
      fromTotal + coinsEarned;
    const showCoinAnim = result.passed && coinsEarned > 0;
    const mascotKind = mascotKindFromCategorySlug(quiz?.categorySlug);
    const mascotPose = result.passed
      ? result.stars >= 3
        ? "present"
        : "default"
      : "doubt";
    const mascotOverride = quizResultMascotSource(
      mascotKind,
      result.passed,
      result.stars,
    );

    return (
      <Screen>
        <ConfettiBurst active={result.stars === 3} />
        {showCoinAnim ? (
          <NeuroCoinsEarnAnimation
            active
            earned={coinsEarned}
            fromTotal={fromTotal}
            toTotal={toTotal}
          />
        ) : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow justify-center pb-8"
        >
          <View className="flex-1 items-center justify-center">
            <Animated.View entering={FadeIn.duration(420)}>
              <GorillaAvatar
                pose={mascotPose}
                size="md"
                kind={mascotKind}
                sourceOverride={mascotOverride}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(280).duration(420)}
              className="mt-5 items-center"
            >
              <StarRow stars={result.stars} size={40} />
              <Text className="mt-4 text-lg text-white">
                {result.passed
                  ? `${result.stars} étoile${result.stars > 1 ? "s" : ""}`
                  : "Quiz non validé"}
              </Text>
            </Animated.View>

            <View className="mt-8 w-full flex-row items-center justify-center gap-10">
              <Animated.View entering={FadeInLeft.delay(700).duration(420)}>
                <NeuroliftAmount
                  amount={result.xpEarned}
                  size="xl"
                  signed
                  color="#7CFFB2"
                />
              </Animated.View>
              {coinsEarned > 0 ? (
                <Animated.View entering={FadeInRight.delay(1050).duration(420)}>
                  <NeuroCoinAmount
                    amount={coinsEarned}
                    size="xl"
                    signed
                    color="#E8B84A"
                  />
                </Animated.View>
              ) : null}
            </View>

            <Animated.View
              entering={FadeInDown.delay(coinsEarned > 0 ? 1450 : 1100).duration(
                420,
              )}
              className="mt-12 w-full gap-4"
            >
              {!result.passed ? (
                <View>
                  <PrimaryButton
                    label="Réessayer le quiz"
                    onPress={resetQuiz}
                  />
                  <View className="mt-3 flex-row items-center justify-center gap-2">
                    <Text className="text-sm text-muted">
                      Coût : {WATER_BOTTLE_QUIZ_RETRY_COST}
                    </Text>
                    <WaterBottleIcon size={18} />
                  </View>
                </View>
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
            </Animated.View>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen>
      <View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-muted">
            Question {index + 1}/{quiz.questions.length}
          </Text>
          {hintsLeft > 0 && !hintUsedForQuestion ? (
            <Pressable
              onPress={() => void applyHint()}
              disabled={hintMutation.isPending}
              className="flex-row items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 active:opacity-70"
            >
              <QuizHintIcon size={16} />
              <Text className="text-xs font-medium text-accent">
                {hintsLeft}
              </Text>
            </Pressable>
          ) : hintsLeft > 0 && hintUsedForQuestion ? (
            <View className="flex-row items-center gap-1.5 opacity-50">
              <QuizHintIcon size={14} />
              <Text className="text-xs text-muted">Utilisé</Text>
            </View>
          ) : null}
        </View>
        <TimeProgressBar timeLeft={timeLeft} totalSec={quizTimeSec} />
      </View>

      {questionType === "MATCH" || questionType === "ORDER" ? (
        <View className="mt-3 flex-1" style={{ minHeight: 0 }}>
          <Text
            className="mb-2 text-lg font-semibold leading-6 text-white"
            numberOfLines={2}
          >
            {question?.prompt}
          </Text>

          {quizQuestion && questionType === "MATCH" ? (
            <MatchQuestion
              question={quizQuestion}
              orderedRightIds={orderedIds}
              wrong={validateWrong}
              disabled={!!lockedChoice}
              onDraggingChange={setMatchDragging}
              onReorder={setOrderedIds}
            />
          ) : null}

          {quizQuestion && questionType === "ORDER" ? (
            <View
              className="flex-1"
              style={{ minHeight: 0 }}
              pointerEvents={lockedChoice ? "none" : "auto"}
            >
              <OrderQuestion
                orderedIds={orderedIds}
                answersById={answersById}
                wrong={validateWrong}
                disabled={!!lockedChoice}
                onDraggingChange={setMatchDragging}
                onReorder={setOrderedIds}
              />
              {validateWrong ? (
                <Text className="mt-1 text-center text-sm text-red-400">
                  Ordre incorrect — réessaie
                </Text>
              ) : null}
            </View>
          ) : null}

          {needsValidate ? (
            <View className="mt-3 shrink-0 pb-1">
              <PrimaryButton
                label="Valider"
                disabled={!canValidate}
                onPress={() => void confirmValidate()}
              />
            </View>
          ) : null}

          {submitError ? (
            <Text className="mt-2 text-center text-sm text-red-400">
              {submitError}
            </Text>
          ) : null}
        </View>
      ) : (
        <ScrollView
          className="mt-4 flex-1"
          showsVerticalScrollIndicator={false}
          scrollEnabled={!matchDragging}
        >
          <Text className="text-2xl font-semibold text-white">
            {question?.prompt}
          </Text>

          {quizQuestion && questionType === "MULTI" ? (
            <View
              className={`mt-2 pb-4 ${validateWrong ? "opacity-80" : ""}`}
              pointerEvents={lockedChoice ? "none" : "auto"}
            >
              <MultiChoiceQuestion
                question={{
                  ...quizQuestion,
                  answers: quizQuestion.answers.filter(
                    (a) => !eliminatedIds.includes(a.id),
                  ),
                }}
                selectedIds={selectedMultiIds}
                onToggle={(id) => {
                  setSelectedMultiIds((prev) =>
                    prev.includes(id)
                      ? prev.filter((x) => x !== id)
                      : [...prev, id],
                  );
                }}
              />
              {validateWrong ? (
                <Text className="mt-2 text-center text-sm text-red-400">
                  Pas tout à fait — réessaie
                </Text>
              ) : null}
            </View>
          ) : null}

          {questionType === "TRUE_FALSE" && question ? (
            <TrueFalseQuestion
              choices={visibleChoices}
              lockedChoiceId={lockedChoice}
              wrongChoiceId={wrongFlash}
              disabled={!!lockedChoice}
              onSelect={(id) => void pickAnswer(id)}
            />
          ) : null}

          {questionType === "SINGLE" && (
            <View className="mt-6 gap-3">
              {visibleChoices.map((choice) => {
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

          {needsValidate ? (
            <View className="mt-6 pb-8">
              <PrimaryButton
                label="Valider"
                disabled={!canValidate}
                onPress={() => void confirmValidate()}
              />
            </View>
          ) : null}

          {submitError ? (
            <Text className="mt-4 text-center text-sm text-red-400">
              {submitError}
            </Text>
          ) : null}
        </ScrollView>
      )}
    </Screen>
  );
}
