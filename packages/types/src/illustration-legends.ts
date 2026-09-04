export type IllustrationLegendItem = {
  /** Pastille visible sur l'image. Absent si le muscle est en profondeur. */
  color?: string;
  label: string;
  aliases?: string[];
  /** Ex. « sous les muscles » quand cité en leçon mais non visible en surface. */
  note?: string;
};

export type LessonIllustration = {
  url: string;
  title: string;
};

/**
 * Galeries multi-images : clé = illustrationUrl principale de la leçon.
 * Si absente, l'UI n'affiche que l'URL principale.
 */
export const ILLUSTRATION_GALLERIES: Record<string, LessonIllustration[]> = {};


export function getLessonIllustrations(
  illustrationUrl: string | null | undefined,
): LessonIllustration[] {
  if (!illustrationUrl) return [];
  return (
    ILLUSTRATION_GALLERIES[illustrationUrl] ?? [
      { url: illustrationUrl, title: "Illustration" },
    ]
  );
}

/** Légendes des illustrations (pastille → structure). */
export const ILLUSTRATION_LEGENDS: Record<string, IllustrationLegendItem[]> = {
  "/uploads/bras-osseux.png": [
    {
      color: "#9E1560",
      label: "omoplate",
      aliases: ["scapula", "l'omoplate", "les omoplates"],
    },
    {
      color: "#2769C1",
      label: "humérus",
      aliases: ["humerus", "l'humérus", "l'humerus"],
    },
    {
      color: "#1D8554",
      label: "radius",
      aliases: ["le radius"],
    },
    {
      color: "#D0AB2F",
      label: "ulna",
      aliases: ["cubitus", "l'ulna", "le cubitus"],
    },
    {
      color: "#F5F5F5",
      label: "main",
      aliases: ["carpe", "métacarpes", "metacarpés", "phalanges", "la main"],
    },
  ],
  "/uploads/cage-thoracique.png": [
    {
      color: "#7B2D8E",
      label: "sternum",
      aliases: ["le sternum"],
    },
    {
      color: "#2E8B57",
      label: "omoplates",
      aliases: ["omoplate", "les omoplates", "scapula", "scapulas"],
    },
    {
      color: "#E67E22",
      label: "cervicales",
      aliases: [
        "vertèbres cervicales",
        "vertebres cervicales",
        "cervicale",
        "les cervicales",
      ],
    },
    {
      color: "#C0392B",
      label: "vertèbres thoraciques",
      aliases: [
        "vertebres thoraciques",
        "thoraciques",
        "les thoraciques",
        "vertèbre thoracique",
      ],
    },
    {
      color: "#F5F5F5",
      label: "côtes et clavicules",
      aliases: [
        "cotes et clavicules",
        "côtes",
        "cotes",
        "clavicules",
        "clavicule",
        "côtes et clavicule",
      ],
    },
  ],
  "/uploads/cuisse-genou-jambe.png": [
    {
      color: "#1A6B7A",
      label: "fémur",
      aliases: ["femur", "le fémur", "le femur"],
    },
    {
      color: "#D4C4A8",
      label: "patella",
      aliases: ["rotule", "la patella", "la rotule"],
    },
    {
      color: "#C0392B",
      label: "tibia",
      aliases: ["le tibia"],
    },
    {
      color: "#6C3483",
      label: "fibula",
      aliases: ["péroné", "perone", "la fibula", "le péroné", "le perone"],
    },
  ],
  "/uploads/bras-triceps.png": [
    {
      color: "#1E4FD6",
      label: "triceps",
      aliases: ["le triceps", "triceps brachial", "triceps brachii"],
    },
    {
      color: "#E74C5C",
      label: "biceps",
      aliases: ["le biceps", "biceps brachial", "biceps brachii"],
    },
    {
      color: "#3EC6D8",
      label: "brachio-radial",
      aliases: [
        "brachio radial",
        "brachioradial",
        "brachioradialis",
        "le brachio-radial",
        "brachio-radialis",
      ],
    },
    {
      color: "#4CAF50",
      label: "fléchisseurs",
      aliases: [
        "flechisseurs",
        "fléchisseur",
        "flechisseur",
        "les fléchisseurs",
        "flexor carpi radialis",
        "fléchisseur radial",
      ],
    },
    {
      color: "#9B59B6",
      label: "fléchisseur ulnaire",
      aliases: [
        "flechisseur ulnaire",
        "fléchisseurs ulnaires",
        "flexor carpi ulnaris",
        "fléchisseur cubital",
      ],
    },
  ],
  "/uploads/bras-muscles.png": [
    {
      color: "#1E4FD6",
      label: "triceps",
      aliases: ["le triceps", "triceps brachial", "triceps brachii"],
    },
    {
      color: "#E74C5C",
      label: "biceps",
      aliases: ["le biceps", "biceps brachial", "biceps brachii"],
    },
    {
      color: "#3EC6D8",
      label: "brachio-radial",
      aliases: [
        "brachio radial",
        "brachioradial",
        "brachioradialis",
        "le brachio-radial",
        "brachio-radialis",
      ],
    },
    {
      color: "#4CAF50",
      label: "fléchisseurs",
      aliases: [
        "flechisseurs",
        "fléchisseur",
        "flechisseur",
        "les fléchisseurs",
        "flexor carpi radialis",
        "fléchisseur radial",
      ],
    },
    {
      color: "#9B59B6",
      label: "fléchisseur ulnaire",
      aliases: [
        "flechisseur ulnaire",
        "fléchisseurs ulnaires",
        "flexor carpi ulnaris",
        "fléchisseur cubital",
      ],
    },
  ],
  "/uploads/pectoraux-epaules.png": [
    {
      color: "#E53935",
      label: "grand pectoral",
      aliases: [
        "pectoral",
        "pectoraux",
        "grand pec",
        "le grand pectoral",
        "pectoralis major",
        "pecs",
      ],
    },
    {
      color: "#1E88E5",
      label: "deltoïde",
      aliases: [
        "deltoide",
        "deltoïdes",
        "deltoides",
        "le deltoïde",
        "épaule",
        "epaules",
        "épaules",
      ],
    },
    {
      color: "#43A047",
      label: "dentelé antérieur",
      aliases: [
        "dentele anterieur",
        "dentelé",
        "dentele",
        "serratus",
        "serratus anterior",
        "le dentelé antérieur",
      ],
    },
  ],
  "/uploads/tronc-abdominaux.png": [
    {
      color: "#E53935",
      label: "grand droit",
      aliases: [
        "grand droit de l abdomen",
        "grand droit de l'abdomen",
        "rectus abdominis",
        "abdominaux",
        "abdos",
        "six pack",
        "le grand droit",
        "droit de l abdomen",
      ],
    },
    {
      color: "#1E88E5",
      label: "oblique externe",
      aliases: [
        "obliques externes",
        "obliques",
        "oblique",
        "l oblique externe",
        "external oblique",
        "les obliques",
      ],
    },
  ],
  "/uploads/dos-muscles.png": [
    {
      color: "#8E44AD",
      label: "deltoïde postérieur",
      aliases: [
        "deltoide posterieur",
        "deltoïde",
        "deltoide",
        "épaule arrière",
        "epaule arriere",
        "posterior deltoid",
      ],
    },
    {
      color: "#43A047",
      label: "rhomboïdes",
      aliases: [
        "rhomboide",
        "rhomboïdes",
        "rhomboides",
        "rhomboid",
        "rhomboids",
        "les rhomboïdes",
      ],
    },
    {
      color: "#E67E22",
      label: "grand rond",
      aliases: [
        "teres major",
        "le grand rond",
        "petit lat",
      ],
    },
    {
      color: "#1E88E5",
      label: "grand dorsal",
      aliases: [
        "latissimus dorsi",
        "lat",
        "lats",
        "le grand dorsal",
        "dorsal",
      ],
    },
  ],
  "/uploads/trapeze-erecteurs.png": [
    {
      color: "#1E88E5",
      label: "trapèze",
      aliases: [
        "trapeze",
        "trapèzes",
        "trapezes",
        "le trapèze",
        "trapezius",
      ],
    },
    {
      color: "#E67E22",
      label: "érecteurs du rachis",
      aliases: [
        "erecteurs du rachis",
        "érecteurs",
        "erecteurs",
        "erector spinae",
        "les érecteurs",
        "érecteur du rachis",
      ],
    },
    {
      color: "#43A047",
      label: "élévateur de la scapula",
      aliases: [
        "elevateur de la scapula",
        "élévateur",
        "elevateur",
        "levator scapulae",
        "élévateur de l omoplate",
        "élévateur de l'omoplate",
      ],
    },
  ],
  "/uploads/devant-cuisse.png": [
    {
      color: "#E53935",
      label: "quadriceps",
      aliases: [
        "quad",
        "quads",
        "le quadriceps",
        "quadriceps femoris",
        "droit fémoral",
      ],
    },
    {
      color: "#43A047",
      label: "ilio-psoas",
      aliases: [
        "iliopsoas",
        "psoas",
        "iliaque",
        "l ilio-psoas",
        "l'ilio-psoas",
        "le psoas",
      ],
    },
    {
      color: "#E67E22",
      label: "tenseur du fascia lata",
      aliases: [
        "tfl",
        "tenseur",
        "tensor fasciae latae",
        "tensor fascia lata",
        "le tfl",
        "fascia lata",
      ],
    },
  ],
  "/uploads/arriere-cuisse.png": [
    {
      color: "#1E88E5",
      label: "biceps fémoral",
      aliases: [
        "biceps femoral",
        "le biceps fémoral",
        "ischio externe",
        "chef long",
      ],
    },
    {
      color: "#43A047",
      label: "chef court du biceps fémoral",
      aliases: [
        "chef court",
        "biceps fémoral chef court",
        "short head",
      ],
    },
    {
      color: "#8E44AD",
      label: "semi-tendineux",
      aliases: [
        "semitendineux",
        "semi tendineux",
        "le semi-tendineux",
        "semitendinosus",
      ],
    },
    {
      color: "#8E44AD",
      label: "grand adducteur",
      aliases: [
        "adducteur",
        "le grand adducteur",
        "adductor magnus",
        "adducteurs",
      ],
    },
    {
      label: "semi-membraneux",
      note: "sous les muscles",
      aliases: [
        "semimembraneux",
        "semi membraneux",
        "le semi-membraneux",
        "semimembranosus",
      ],
    },
  ],
  "/uploads/fessiers.png": [
    {
      color: "#E53935",
      label: "grand fessier",
      aliases: [
        "gluteus maximus",
        "le grand fessier",
        "fessier",
        "fessiers",
        "grand glutéal",
      ],
    },
    {
      color: "#1E88E5",
      label: "moyen fessier",
      aliases: [
        "gluteus medius",
        "le moyen fessier",
        "moyen",
        "medius",
      ],
    },
    {
      color: "#F1C40F",
      label: "petit fessier",
      note: "sous le moyen fessier",
      aliases: [
        "gluteus minimus",
        "le petit fessier",
        "petit",
        "minimus",
      ],
    },
  ],
  "/uploads/bas-jambes.png": [
    {
      color: "#E53935",
      label: "gastrocnémien",
      aliases: [
        "gastrocnemien",
        "gastrocnémiens",
        "gastrocnemiens",
        "gastroc",
        "jumeaux",
        "le gastrocnémien",
        "mollets",
      ],
    },
    {
      color: "#E67E22",
      label: "soléaire",
      note: "sous les gastrocnémiens",
      aliases: [
        "soleaire",
        "soleus",
        "le soléaire",
      ],
    },
    {
      color: "#1E88E5",
      label: "tibial antérieur",
      aliases: [
        "tibial anterieur",
        "jambier antérieur",
        "jambier anterieur",
        "tibialis anterior",
        "le tibial antérieur",
      ],
    },
    {
      color: "#F1C40F",
      label: "long fibulaire",
      aliases: [
        "long peronier",
        "long péronier",
        "péronier",
        "peronier",
        "fibulaire",
        "fibulaires",
        "peroneus longus",
        "le long fibulaire",
      ],
    },
  ],
};

export function getIllustrationLegend(
  illustrationUrl: string | null | undefined,
): IllustrationLegendItem[] {
  if (!illustrationUrl) return [];
  return ILLUSTRATION_LEGENDS[illustrationUrl] ?? [];
}

/** Normalise une réponse texte pour comparaison (casse, accents, ponctuation). */
export function normalizeTextAnswer(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/['’`]/g, " ")
    .replace(/[^a-z0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isTextAnswerCorrect(
  submitted: string,
  correct: string,
  aliases: string[] = [],
): boolean {
  const normalized = normalizeTextAnswer(submitted);
  if (!normalized) return false;
  const candidates = [correct, ...aliases].map(normalizeTextAnswer);
  return candidates.includes(normalized);
}
