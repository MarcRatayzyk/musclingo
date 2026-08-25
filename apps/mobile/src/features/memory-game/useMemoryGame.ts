import { useCallback, useEffect, useRef, useState } from "react";
import { createBoard, type MemoryCard } from "./board";

export type GamePhase = "setup" | "playing" | "finished";

type FlipState = {
  revealedIds: string[];
  matchedIds: string[];
  locked: boolean;
};

const INITIAL_FLIP: FlipState = {
  revealedIds: [],
  matchedIds: [],
  locked: false,
};

export function useMemoryGame() {
  const [phase, setPhase] = useState<GamePhase>("setup");
  const [restSeconds, setRestSeconds] = useState(90);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [gridSize, setGridSize] = useState(2);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flip, setFlip] = useState<FlipState>(INITIAL_FLIP);
  const mismatchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scoreRef = useRef(0);

  const clearMismatchTimer = () => {
    if (mismatchTimer.current) {
      clearTimeout(mismatchTimer.current);
      mismatchTimer.current = null;
    }
  };

  const startGrid = useCallback((size: number) => {
    clearMismatchTimer();
    const board = createBoard(size);
    const freeIds = board.filter((c) => c.isFree).map((c) => c.id);
    setCards(board);
    setFlip({
      revealedIds: [],
      matchedIds: freeIds,
      locked: false,
    });
    setGridSize(size);
  }, []);

  const startGame = useCallback(
    (seconds: number) => {
      const duration = Math.max(10, Math.min(600, Math.floor(seconds)));
      scoreRef.current = 0;
      setScore(0);
      setRestSeconds(duration);
      setSecondsLeft(duration);
      setPhase("playing");
      startGrid(2);
    },
    [startGrid],
  );

  const finishGame = useCallback(() => {
    clearMismatchTimer();
    setPhase("finished");
  }, []);

  // Countdown — ends the game when time hits 0
  useEffect(() => {
    if (phase !== "playing") return;
    if (secondsLeft <= 0) {
      finishGame();
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secondsLeft, finishGame]);

  useEffect(() => () => clearMismatchTimer(), []);

  const advanceOrStay = useCallback(
    (matchedIds: string[]) => {
      const pairCards = cards.filter((c) => !c.isFree);
      const allMatched = pairCards.every((c) => matchedIds.includes(c.id));
      if (!allMatched) return;

      const nextScore = scoreRef.current + 1;
      scoreRef.current = nextScore;
      setScore(nextScore);

      // Small delay so the last match is visible, then next grid
      mismatchTimer.current = setTimeout(() => {
        startGrid(gridSize + 1);
      }, 450);
    },
    [cards, gridSize, startGrid],
  );

  const flipCard = useCallback(
    (cardId: string) => {
      if (phase !== "playing") return;
      if (flip.locked) return;
      if (flip.matchedIds.includes(cardId)) return;
      if (flip.revealedIds.includes(cardId)) return;
      if (flip.revealedIds.length >= 2) return;

      const nextRevealed = [...flip.revealedIds, cardId];
      setFlip((prev) => ({ ...prev, revealedIds: nextRevealed }));

      if (nextRevealed.length < 2) return;

      const [aId, bId] = nextRevealed;
      const a = cards.find((c) => c.id === aId);
      const b = cards.find((c) => c.id === bId);
      if (!a || !b) return;

      if (a.pairId === b.pairId) {
        const matchedIds = [...flip.matchedIds, aId, bId];
        setFlip({
          revealedIds: [],
          matchedIds,
          locked: false,
        });
        advanceOrStay(matchedIds);
      } else {
        setFlip((prev) => ({ ...prev, locked: true }));
        mismatchTimer.current = setTimeout(() => {
          setFlip((prev) => ({
            ...prev,
            revealedIds: [],
            locked: false,
          }));
        }, 650);
      }
    },
    [phase, flip, cards, advanceOrStay],
  );

  const resetToSetup = useCallback(() => {
    clearMismatchTimer();
    setPhase("setup");
    setSecondsLeft(0);
    setCards([]);
    setFlip(INITIAL_FLIP);
    setGridSize(2);
    scoreRef.current = 0;
    setScore(0);
  }, []);

  const isFaceUp = (cardId: string) =>
    flip.revealedIds.includes(cardId) || flip.matchedIds.includes(cardId);

  const isMatched = (cardId: string) => flip.matchedIds.includes(cardId);

  return {
    phase,
    restSeconds,
    setRestSeconds,
    secondsLeft,
    gridSize,
    score,
    cards,
    startGame,
    flipCard,
    resetToSetup,
    isFaceUp,
    isMatched,
  };
}
