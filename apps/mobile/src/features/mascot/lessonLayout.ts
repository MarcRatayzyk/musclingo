/**
 * Métriques responsives pour l’écran leçon (hauteur + largeur).
 * Remplit mieux les grands téléphones sans écraser les petits.
 */
export type LessonLayoutMetrics = {
  short: boolean;
  narrow: boolean;
  mascotSize: number;
  /** Pointe de la queue de bulle alignée sur le centre du mascot. */
  bubbleTailTipX: number;
  titleFontSize: number;
  titleLineHeight: number;
  chunkFontSize: number;
  chunkLineHeight: number;
  bubbleFontSize: number;
  bubbleLineHeight: number;
  bubblePadH: number;
  bubblePadV: number;
  continueMinWidth: number;
  continueHeight: number;
  continueFontSize: number;
  illustrationMaxH: (hasLegend: boolean) => number;
  illustrationMaxW: (hasLegend: boolean) => number;
  topSpacer: (viewportH: number) => number;
  bottomSpacer: (viewportH: number) => number;
  headerGap: number;
};

export function getLessonLayoutMetrics(
  screenW: number,
  screenH: number,
): LessonLayoutMetrics {
  const short = screenH < 720;
  const narrow = screenW < 380;
  const tall = screenH >= 880;

  const mascotSize = Math.round(
    Math.min(
      Math.max(
        screenH * (short ? 0.2 : tall ? 0.28 : 0.25),
        short ? 108 : 132,
      ),
      Math.min(screenW * (narrow ? 0.4 : 0.48), short ? 156 : tall ? 240 : 210),
    ),
  );

  const bubbleTailTipX = Math.round(mascotSize * 0.42);

  return {
    short,
    narrow,
    mascotSize,
    bubbleTailTipX,
    titleFontSize: short || narrow ? 16 : tall ? 19 : 18,
    titleLineHeight: short || narrow ? 22 : tall ? 26 : 24,
    chunkFontSize: short ? 17 : tall ? 21 : 19,
    chunkLineHeight: short ? 28 : tall ? 36 : 32,
    bubbleFontSize: short || narrow ? 16 : tall ? 19 : 18,
    bubbleLineHeight: short || narrow ? 24 : tall ? 30 : 28,
    bubblePadH: short || narrow ? 14 : 18,
    bubblePadV: short || narrow ? 12 : 16,
    continueMinWidth: short ? 48 : 56,
    continueHeight: short ? 40 : 44,
    continueFontSize: short ? 16 : 18,
    illustrationMaxH: (hasLegend) => {
      const ratio = short ? 0.34 : tall ? 0.44 : 0.4;
      const cap = hasLegend
        ? short
          ? 240
          : tall
            ? 360
            : 320
        : short
          ? 280
          : tall
            ? 420
            : 360;
      return Math.min(cap, Math.max(short ? 160 : 200, Math.round(screenH * ratio)));
    },
    illustrationMaxW: (hasLegend) => {
      if (hasLegend) {
        return Math.min(screenW * (narrow ? 0.58 : 0.64), short ? 240 : tall ? 340 : 300);
      }
      return Math.min(screenW - (narrow ? 28 : 36), short ? 320 : 400);
    },
    topSpacer: (viewportH) =>
      Math.max(
        short ? viewportH * 0.06 : viewportH * 0.08,
        // Laisse la bulle sous le TopFade (48px) + marge lisible.
        short ? 64 : 72,
      ),
    bottomSpacer: (viewportH) =>
      Math.max(
        short ? viewportH * 0.1 : viewportH * 0.12,
        short ? 28 : 36,
      ),
    headerGap: short ? 6 : 8,
  };
}
