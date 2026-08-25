import {
  MINI_GAME_LIVES,
  MINI_GAME_MAX_DURATION_SEC,
  MINI_GAME_MIN_DURATION_SEC,
  MINI_GAME_SKIP_DELAY_MS,
  getMiniGameScore,
} from "@muscle-mind/types";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MiniGameQuestion } from "./api";

export type FlashPhase = "setup" | "countdown" | "playing" | "finished";
export type FlashFeedback = "correct" | "wrong" | null;
export type FlashEndedBy = "time" | "lives";

export function clampDuration(seconds: number) {
  return Math.max(
    MINI_GAME_MIN_DURATION_SEC,
    Math.min(MINI_GAME_MAX_DURATION_SEC, Math.floor(seconds)),
  );
}

export function useFlashQuiz(questions: MiniGameQuestion[]) {
  const [phase, setPhase] = useState<FlashPhase>("setup");
  const [durationSec, setDurationSec] = useState(60);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [livesLeft, setLivesLeft] = useState(MINI_GAME_LIVES);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [feedback, setFeedback] = useState<FlashFeedback>(null);
  const [pickedChoiceId, setPickedChoiceId] = useState<string | null>(null);
  const [canSkip, setCanSkip] = useState(false);
  const [endedBy, setEndedBy] = useState<FlashEndedBy>("time");

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const livesRef = useRef(MINI_GAME_LIVES);
  const answeredRef = useRef(false);

  const clearAdvanceTimer = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  const finish = useCallback((reason: FlashEndedBy) => {
    clearAdvanceTimer();
    setEndedBy(reason);
    setPhase("finished");
  }, []);

  const startGame = useCallback((seconds: number) => {
    const duration = clampDuration(seconds);
    clearAdvanceTimer();
    livesRef.current = MINI_GAME_LIVES;
    answeredRef.current = false;
    setDurationSec(duration);
    setSecondsLeft(duration);
    setIndex(0);
    setCorrectCount(0);
    setLivesLeft(MINI_GAME_LIVES);
    setCombo(0);
    setBestCombo(0);
    setFeedback(null);
    setPickedChoiceId(null);
    setCanSkip(false);
    setEndedBy("time");
    setCountdown(3);
    setPhase("countdown");
  }, []);

  // Décompte 3-2-1 avant le départ
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) {
      setPhase("playing");
      return;
    }
    const id = setTimeout(() => setCountdown((c) => c - 1), 700);
    return () => clearTimeout(id);
  }, [phase, countdown]);

  // Chrono de la partie
  useEffect(() => {
    if (phase !== "playing") return;
    if (secondsLeft <= 0) {
      finish("time");
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secondsLeft, finish]);

  // « Passer » ne devient cliquable qu'après un délai, pour pousser à répondre
  useEffect(() => {
    if (phase !== "playing") {
      setCanSkip(false);
      return;
    }
    setCanSkip(false);
    const id = setTimeout(() => setCanSkip(true), MINI_GAME_SKIP_DELAY_MS);
    return () => clearTimeout(id);
  }, [phase, index]);

  useEffect(() => () => clearAdvanceTimer(), []);

  const registerWrong = useCallback(() => {
    setCombo(0);
    const remaining = livesRef.current - 1;
    livesRef.current = remaining;
    setLivesLeft(remaining);
    return remaining;
  }, []);

  const goToNext = useCallback(
    (remainingLives: number) => {
      if (remainingLives <= 0) {
        finish("lives");
        return;
      }
      answeredRef.current = false;
      setFeedback(null);
      setPickedChoiceId(null);
      setIndex((i) => i + 1);
    },
    [finish],
  );

  const answer = useCallback(
    (choiceId: string) => {
      if (phase !== "playing" || answeredRef.current) return;
      const question = questions[index % Math.max(questions.length, 1)];
      if (!question) return;

      answeredRef.current = true;
      const choice = question.choices.find((c) => c.id === choiceId);
      const isCorrect = !!choice?.isCorrect;

      setPickedChoiceId(choiceId);
      setFeedback(isCorrect ? "correct" : "wrong");

      let remaining = livesRef.current;
      if (isCorrect) {
        setCorrectCount((n) => n + 1);
        setCombo((c) => {
          const next = c + 1;
          setBestCombo((b) => Math.max(b, next));
          return next;
        });
      } else {
        remaining = registerWrong();
      }

      advanceTimer.current = setTimeout(
        () => goToNext(remaining),
        isCorrect ? 320 : 620,
      );
    },
    [phase, questions, index, registerWrong, goToNext],
  );

  /** Passer compte comme une erreur : une vie en moins. */
  const skip = useCallback(() => {
    if (phase !== "playing" || answeredRef.current || !canSkip) return;
    answeredRef.current = true;
    setFeedback("wrong");
    const remaining = registerWrong();
    advanceTimer.current = setTimeout(() => goToNext(remaining), 520);
  }, [phase, canSkip, registerWrong, goToNext]);

  const resetToSetup = useCallback(() => {
    clearAdvanceTimer();
    livesRef.current = MINI_GAME_LIVES;
    answeredRef.current = false;
    setPhase("setup");
    setSecondsLeft(0);
    setIndex(0);
    setCorrectCount(0);
    setLivesLeft(MINI_GAME_LIVES);
    setCombo(0);
    setBestCombo(0);
    setFeedback(null);
    setPickedChoiceId(null);
    setCanSkip(false);
  }, []);

  const question =
    questions.length > 0 ? questions[index % questions.length]! : null;

  return {
    phase,
    durationSec,
    setDurationSec,
    secondsLeft,
    countdown,
    question,
    questionNumber: index + 1,
    correctCount,
    wrongCount: MINI_GAME_LIVES - livesLeft,
    livesLeft,
    lives: MINI_GAME_LIVES,
    combo,
    bestCombo,
    feedback,
    pickedChoiceId,
    canSkip,
    endedBy,
    // Score projeté sur la durée choisie, comme le calcul serveur.
    score: getMiniGameScore(correctCount, durationSec),
    startGame,
    answer,
    skip,
    resetToSetup,
  };
}
