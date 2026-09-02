import type { IllustrationLegendItem } from "@muscle-mind/types";
import {
  getIllustrationHotspot,
  ILLUSTRATION_LEGENDS,
} from "@muscle-mind/types";

export type { IllustrationLegendItem };
export { ILLUSTRATION_LEGENDS };

export type SeedQuestionAnswer = {
  label: string;
  isCorrect: boolean;
  order?: number;
  matchKey?: string;
};

export type TextQuestionPayload = {
  imageUrl: string;
  color: string;
  aliases?: string[];
};

export type HotspotRegionPayload = {
  order: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HotspotQuestionPayload = {
  imageUrl: string;
  regions: HotspotRegionPayload[];
};

export type SeedQuestion = {
  type:
    | "SINGLE"
    | "TRUE_FALSE"
    | "TEXT"
    | "MULTI"
    | "ORDER"
    | "MATCH"
    | "HOTSPOT";
  prompt: string;
  explanation: string;
  answers: SeedQuestionAnswer[];
  payload?: TextQuestionPayload | HotspotQuestionPayload;
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

/** Plusieurs bonnes réponses à cocher. */
export function multi(
  prompt: string,
  correct: string[],
  wrong: string[],
  explanation: string,
): SeedQuestion {
  return {
    type: "MULTI",
    prompt,
    explanation,
    answers: [
      ...correct.map((label) => ({ label, isCorrect: true })),
      ...wrong.map((label) => ({ label, isCorrect: false })),
    ],
  };
}

/** Remettre les étapes dans le bon ordre (answers affichées inversées). */
export function order(
  prompt: string,
  stepsInOrder: string[],
  explanation: string,
): SeedQuestion {
  const displayOrder = [...stepsInOrder].reverse();
  return {
    type: "ORDER",
    prompt,
    explanation,
    answers: displayOrder.map((label) => ({
      label,
      isCorrect: false,
      order: stepsInOrder.indexOf(label),
    })),
  };
}

/** Associer des paires via matchKey. */
export function match(
  prompt: string,
  pairs: [string, string][],
  explanation: string,
): SeedQuestion {
  const answers: SeedQuestionAnswer[] = [];
  pairs.forEach(([left, right], i) => {
    const key = `pair-${i}`;
    answers.push({ label: left, isCorrect: false, matchKey: key });
    answers.push({ label: right, isCorrect: false, matchKey: key });
  });
  return {
    type: "MATCH",
    prompt,
    explanation,
    answers,
  };
}

export type HotspotRegionDef = {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isCorrect: boolean;
};

/** Tap sur une zone de l'illustration. */
export function hotspot(
  prompt: string,
  imageUrl: string,
  regions: HotspotRegionDef[],
  explanation: string,
): SeedQuestion {
  return {
    type: "HOTSPOT",
    prompt,
    explanation,
    answers: regions.map((r) => ({
      label: r.label,
      isCorrect: r.isCorrect,
    })),
    payload: {
      imageUrl,
      regions: regions.map((r, order) => ({
        order,
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
      })),
    },
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

/** Tap sur illustration à partir des régions définies dans @muscle-mind/types. */
export function hotspotFromIllustration(
  imageUrl: string,
  index = 0,
): SeedQuestion {
  const def = getIllustrationHotspot(imageUrl, index);
  if (!def) {
    throw new Error(`No hotspot defined for ${imageUrl}[${index}]`);
  }
  return hotspot(
    def.prompt,
    imageUrl,
    def.regions.map((r) => ({
      label: r.label,
      x: r.x,
      y: r.y,
      width: r.width,
      height: r.height,
      isCorrect: !!r.isCorrect,
    })),
    def.explanation,
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

/** 3 QCM + blank + 2 TF + MULTI + ORDER + MATCH + slot #10 */
export function quiz10(
  q1: SeedQuestion,
  q2: SeedQuestion,
  q3: SeedQuestion,
  blank: SeedQuestion,
  tf1: SeedQuestion,
  tf2: SeedQuestion,
  multiQ: SeedQuestion,
  orderQ: SeedQuestion,
  matchQ: SeedQuestion,
  slot10: SeedQuestion,
): SeedQuestion[] {
  return [q1, q2, q3, blank, tf1, tf2, multiQ, orderQ, matchQ, slot10];
}
