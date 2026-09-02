export type HotspotRegionDef = {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isCorrect?: boolean;
};

export type IllustrationHotspotQuiz = {
  prompt: string;
  explanation: string;
  regions: HotspotRegionDef[];
};

/** Zones cliquables normalisées (0–1) par illustration. */
export const ILLUSTRATION_HOTSPOTS: Record<string, IllustrationHotspotQuiz[]> = {
  "/uploads/bras-osseux.png": [
    {
      prompt: "Sur cette illustration, où se situe l'humérus ?",
      explanation:
        "L'humérus est l'os unique du bras, entre l'épaule et le coude.",
      regions: [
        {
          label: "Humérus",
          x: 0.38,
          y: 0.06,
          width: 0.2,
          height: 0.4,
          isCorrect: true,
        },
        {
          label: "Radius",
          x: 0.55,
          y: 0.48,
          width: 0.14,
          height: 0.32,
        },
        {
          label: "Ulna",
          x: 0.4,
          y: 0.48,
          width: 0.12,
          height: 0.32,
        },
      ],
    },
  ],
  "/uploads/bras-muscles.png": [
    {
      prompt: "Quel muscle correspond à la zone avant du bras (galbe) ?",
      explanation:
        "Le biceps est le muscle principal du galbe avant ; il fléchit le coude.",
      regions: [
        {
          label: "Biceps",
          x: 0.32,
          y: 0.18,
          width: 0.22,
          height: 0.38,
          isCorrect: true,
        },
        {
          label: "Brachio-radial",
          x: 0.52,
          y: 0.42,
          width: 0.16,
          height: 0.28,
        },
        {
          label: "Fléchisseurs",
          x: 0.28,
          y: 0.52,
          width: 0.18,
          height: 0.22,
        },
      ],
    },
  ],
  "/uploads/pectoraux-epaules.png": [
    {
      prompt: "Quel muscle occupe la large zone rouge du torse ?",
      explanation:
        "Le grand pectoral est le principal muscle de poussée du haut du corps.",
      regions: [
        {
          label: "Grand pectoral",
          x: 0.28,
          y: 0.32,
          width: 0.44,
          height: 0.28,
          isCorrect: true,
        },
        {
          label: "Deltoïde",
          x: 0.12,
          y: 0.18,
          width: 0.2,
          height: 0.22,
        },
        {
          label: "Dentelé antérieur",
          x: 0.62,
          y: 0.38,
          width: 0.16,
          height: 0.24,
        },
      ],
    },
  ],
};

export function getIllustrationHotspot(
  imageUrl: string,
  index = 0,
): IllustrationHotspotQuiz | null {
  return ILLUSTRATION_HOTSPOTS[imageUrl]?.[index] ?? null;
}
