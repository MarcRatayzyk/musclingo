import type { IllustrationLegendItem } from "@muscle-mind/types";
import { ILLUSTRATION_LEGENDS } from "@muscle-mind/types";

export type { IllustrationLegendItem };
export { ILLUSTRATION_LEGENDS };

export type SeedQuestionAnswer = {
  label: string;
  isCorrect: boolean;
};

export type TextQuestionPayload = {
  imageUrl: string;
  color: string;
  aliases?: string[];
};

export type SeedQuestion = {
  type: "SINGLE" | "TRUE_FALSE" | "TEXT";
  prompt: string;
  explanation: string;
  answers: SeedQuestionAnswer[];
  payload?: TextQuestionPayload;
};

const V = "Vrai";
const F = "Faux";

export function qcm(
  prompt: string,
  correct: string,
  wrong: string[],
  explanation: string,
): SeedQuestion {
  return {
    type: "SINGLE",
    prompt,
    explanation,
    answers: [
      { label: correct, isCorrect: true },
      ...wrong.map((label) => ({ label, isCorrect: false })),
    ],
  };
}

export function fillBlank(
  prompt: string,
  correct: string,
  wrong: string[],
  explanation: string,
): SeedQuestion {
  return qcm(prompt, correct, wrong, explanation);
}

export function tf(
  prompt: string,
  isTrue: boolean,
  explanation: string,
): SeedQuestion {
  return {
    type: "TRUE_FALSE",
    prompt,
    explanation,
    answers: [
      { label: V, isCorrect: isTrue },
      { label: F, isCorrect: !isTrue },
    ],
  };
}

/** Saisie libre : pastille de couleur + image, sans nommer la couleur. */
export function textLabel(
  prompt: string,
  correct: string,
  aliases: string[],
  explanation: string,
  payload: { imageUrl: string; color: string },
): SeedQuestion {
  return {
    type: "TEXT",
    prompt,
    explanation,
    answers: [{ label: correct, isCorrect: true }],
    payload: {
      imageUrl: payload.imageUrl,
      color: payload.color,
      aliases,
    },
  };
}

/** Génère une question TEXT par entrée de légende colorée (pas les muscles en profondeur). */
export function legendTextQuestions(
  imageUrl: string,
  prompt = "Quelle structure correspond à cette couleur ?",
): SeedQuestion[] {
  const items = ILLUSTRATION_LEGENDS[imageUrl] ?? [];
  return items
    .filter((item: IllustrationLegendItem) => !!item.color)
    .map((item: IllustrationLegendItem) =>
      textLabel(
        prompt,
        item.label,
        item.aliases ?? [],
        `La bonne réponse est : ${item.label}.`,
        { imageUrl, color: item.color! },
      ),
    );
}

/** 3 QCM + 1 phrase à trou + 2 vrai/faux */
export function quiz6(
  a: SeedQuestion,
  b: SeedQuestion,
  c: SeedQuestion,
  blank: SeedQuestion,
  d: SeedQuestion,
  e: SeedQuestion,
): SeedQuestion[] {
  return [a, b, c, blank, d, e];
}
