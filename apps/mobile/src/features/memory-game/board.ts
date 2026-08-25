export type MemoryCard = {
  id: string;
  pairId: number;
  symbol: string;
  isFree: boolean;
};

const SYMBOLS = [
  "💪",
  "🏋️",
  "🧠",
  "❤️",
  "⚡",
  "🔥",
  "🥗",
  "😴",
  "🦴",
  "🫁",
  "🦵",
  "🫀",
  "🩸",
  "🧬",
  "⏱️",
  "🎯",
  "🏆",
  "📈",
];

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Build an n×n board. Odd grids get one free center tile. */
export function createBoard(size: number): MemoryCard[] {
  const total = size * size;
  const hasFree = total % 2 === 1;
  const pairCount = Math.floor(total / 2);
  const cards: MemoryCard[] = [];

  for (let i = 0; i < pairCount; i += 1) {
    const symbol = SYMBOLS[i % SYMBOLS.length];
    cards.push(
      { id: `${size}-${i}-a`, pairId: i, symbol, isFree: false },
      { id: `${size}-${i}-b`, pairId: i, symbol, isFree: false },
    );
  }

  const shuffled = shuffle(cards);

  if (hasFree) {
    const free: MemoryCard = {
      id: `${size}-free`,
      pairId: -1,
      symbol: "★",
      isFree: true,
    };
    const center = Math.floor(total / 2);
    shuffled.splice(center, 0, free);
  }

  return shuffled;
}
