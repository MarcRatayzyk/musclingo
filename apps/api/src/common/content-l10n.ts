import { pickLocalized, type AppLocale } from "./locale";
import { enOrTranslate } from "./auto-en";
import { LESSON_MARKDOWN_EN_BY_TITLE } from "./lesson-markdown-en";

const CATEGORY_NAME_BY_SLUG_EN: Record<string, string> = {
  anatomie: "Anatomy",
  nutrition: "Nutrition",
  biomecanique: "Biomechanics",
  programmation: "Programming",
  recuperation: "Recovery",
};

const CATEGORY_NAME_EN: Record<string, string> = {
  Anatomie: "Anatomy",
  Nutrition: "Nutrition",
  Biomécanique: "Biomechanics",
  Programmation: "Programming",
  Récupération: "Recovery",
};

export function pickCategoryName(
  fr: string,
  en: string | null | undefined,
  locale: AppLocale,
  slug?: string,
): string {
  if (locale !== "en") return fr;
  if (en && en.trim()) return en;
  if (slug && CATEGORY_NAME_BY_SLUG_EN[slug]) return CATEGORY_NAME_BY_SLUG_EN[slug];
  return CATEGORY_NAME_EN[fr] ?? fr;
}

/** Runtime FR→EN for checkpoint / unit titles when DB *En is empty. */
const CHECKPOINT_TITLE_EN: Record<string, string> = {
  Bases: "Basics",
  Intermédiaire: "Intermediate",
  Avancé: "Advanced",
  Os: "Bones",
  "Haut du corps niveau 1": "Upper body level 1",
  "Bas du corps niveau 1": "Lower body level 1",
  Articulations: "Joints",
  "Haut du corps niveau 2": "Upper body level 2",
  "Bas du corps niveau 2": "Lower body level 2",
  "Tissus et fonctionnement": "Tissues and function",
  "Organisation du mouvement": "Movement organization",
  "Checkpoint Os": "Bones Checkpoint",
  "Checkpoint Haut du corps niveau 1": "Upper body level 1 Checkpoint",
  "Checkpoint Bas du corps niveau 1": "Lower body level 1 Checkpoint",
  "Checkpoint Articulations": "Joints Checkpoint",
  "Checkpoint Haut du corps niveau 2": "Upper body level 2 Checkpoint",
  "Checkpoint Bas du corps niveau 2": "Lower body level 2 Checkpoint",
  "Checkpoint Tissus et fonctionnement": "Tissues and function Checkpoint",
  "Checkpoint Organisation du mouvement": "Movement organization Checkpoint",
  Macronutriments: "Macronutrients",
  Micronutriments: "Micronutrients",
  "Alimentation équilibrée": "Balanced eating",
  "Besoins énergétiques": "Energy needs",
  "Digestion et métabolisme": "Digestion and metabolism",
  "Fibres et microbiote": "Fiber and microbiome",
  "Lire les aliments": "Reading food labels",
  "Nutrition et objectifs": "Nutrition and goals",
  "Checkpoint Macronutriments": "Macronutrients Checkpoint",
  "Checkpoint Micronutriments": "Micronutrients Checkpoint",
  "Checkpoint Alimentation équilibrée": "Balanced eating Checkpoint",
  "Checkpoint Besoins énergétiques": "Energy needs Checkpoint",
  "Checkpoint Digestion et métabolisme": "Digestion and metabolism Checkpoint",
  "Checkpoint Fibres et microbiote": "Fiber and microbiome Checkpoint",
  "Checkpoint Lire les aliments": "Reading food labels Checkpoint",
  "Checkpoint Nutrition et objectifs": "Nutrition and goals Checkpoint",
  Sommeil: "Sleep",
  "Douleurs et tissus": "Pain and tissues",
  "Système nerveux et stress": "Nervous system and stress",
  "Mobilité et étirements": "Mobility and stretching",
  "Récupération active et outils": "Active recovery and tools",
  "Charge, fatigue et surentraînement": "Load, fatigue and overtraining",
  "Fondamentaux de la programmation": "Programming fundamentals",
  "Le volume": "Volume",
  "Fréquence et distribution": "Frequency and distribution",
  "Intensité et effort": "Intensity and effort",
  Progression: "Progression",
  "Organiser les séances": "Organizing sessions",
  "Construire les splits": "Building splits",
  Périodisation: "Periodization",
  Individualisation: "Individualization",
  "Spécialisation et programmation avancée":
    "Specialization and advanced programming",
  "Les bases du corps humain": "Human body basics",
  "Comprendre les mouvements": "Understanding movements",
};

export function translateCheckpointTitle(fr: string): string {
  if (!fr) return fr;
  const exact = CHECKPOINT_TITLE_EN[fr];
  if (exact) return exact;
  if (fr.startsWith("Checkpoint ")) {
    const rest = fr.slice("Checkpoint ".length);
    const restEn = CHECKPOINT_TITLE_EN[rest] ?? rest;
    return `${restEn} Checkpoint`;
  }
  return fr;
}

/** Prefer DB *En, else known FR→EN checkpoint maps (works before reseed). */
export function pickCheckpointTitle(
  fr: string,
  en: string | null | undefined,
  locale: AppLocale,
): string {
  if (locale !== "en") return fr;
  if (en && en.trim()) return en;
  return translateCheckpointTitle(fr);
}

const LESSON_TITLE_EN: Record<string, string> = {
  "Bras et avant-bras": "Arm and Forearm",
  "Cage thoracique et ceinture scapulaire": "Thoracic Cage and Shoulder Girdle",
  "Bassin et rachis lombaire": "Pelvis and Lumbar Spine",
  "Cuisse, genou et jambe": "Thigh, Knee, and Lower Leg",
  "Les bras": "Arms",
  "Pectoraux et épaules": "Chest and Shoulders",
  "Tronc et abdominaux": "Trunk and Abdominals",
  "Le dos": "Back",
  "Trapèze et érecteurs": "Trapezius and Erectors",
  "Devant de cuisse": "Front Thigh",
  "Arrière de cuisse": "Back Thigh",
  "Les fessiers": "Glutes",
  "Bas de jambes": "Lower Legs",
  "L'épaule": "Shoulder",
  "Coude et poignet": "Elbow and Wrist",
  "La hanche": "Hip",
  "Le genou": "Knee",
  "La cheville": "Ankle",
  "Colonne et disques": "Spine and Discs",
  "Scapulo-thoracique": "Scapulothoracic Joint",
  "Biceps et brachial": "Biceps and Brachialis",
  "Triceps : les trois chefs": "Triceps: The Three Heads",
  "Deltoïde et coiffe des rotateurs": "Deltoid and Rotator Cuff",
  "Grand et petit pectoral": "Pectoralis Major and Minor",
  "Grand dorsal, grand rond, petit rond":
    "Latissimus Dorsi, Teres Major, Teres Minor",
  "Trapèze, rhomboïdes, élévateur": "Trapezius, Rhomboids, Levator Scapulae",
  "Abdominaux profonds et obliques": "Deep Abdominals and Obliques",
  "Serratus antérieur et stabilité scapulaire":
    "Serratus Anterior and Scapular Stability",
  "Quadriceps : les quatre chefs": "Quadriceps: The Four Heads",
  "Ischio-jambiers en détail": "Hamstrings in Detail",
  "Grand, moyen, petit fessier et TFL": "Glute Max, Med, Min and TFL",
  "Mollets, tibial, fibulaires": "Calves, Tibialis, Fibularis",
  "Iliopsoas et fléchisseurs de hanche": "Iliopsoas and Hip Flexors",
  "Plancher pelvien et core anatomique": "Pelvic Floor and Anatomical Core",
  "Chaînes antérieure et postérieure": "Anterior and Posterior Chains",
  "Fibre et sarcomère": "Fiber and Sarcomere",
  "Tendons et ligaments": "Tendons and Ligaments",
  "Unités motrices et types de fibres": "Motor Units and Fiber Types",
  "Fascias et aponévroses": "Fascia and Aponeuroses",
  "Innervation et contrôle musculaire": "Innervation and Muscle Control",
  "Agoniste, antagoniste, stabilisateur": "Agonist, Antagonist, Stabilizer",
  "Chaînes et synergies": "Chains and Synergies",
  "Plans et axes": "Planes and Axes",
  "Longueur-tension et angles d'insertion":
    "Length-Tension and Insertion Angles",
};

const LESSON_SUBTITLE_EN: Record<string, string> = {
  "Humérus, radius et ulna.": "Humerus, radius, and ulna.",
  "Clavicule, omoplate, côtes, sternum et rachis haut.":
    "Clavicle, scapula, ribs, sternum, and upper spine.",
  "Bassin, sacrum et lombaires.": "Pelvis, sacrum, and lumbar spine.",
  "Lombaires, sacrum, coccyx, os coxal, ilion et acétabulum.":
    "Lumbar spine, sacrum, coccyx, hip bone, ilium, and acetabulum.",
  "Fémur, patella, tibia et fibula.": "Femur, patella, tibia, and fibula.",
  "Fémur, patella, tibia, fibula et ligaments croisés.":
    "Femur, patella, tibia, fibula, and cruciate ligaments.",
};

export function pickLessonTitle(
  fr: string,
  en: string | null | undefined,
  locale: AppLocale,
): string {
  if (locale !== "en") return fr;
  if (en && en.trim()) return en;
  return LESSON_TITLE_EN[fr] ?? enOrTranslate(fr);
}

export function pickLessonSubtitle(
  fr: string | null | undefined,
  en: string | null | undefined,
  locale: AppLocale,
): string | null {
  if (!fr && !en) return null;
  if (locale !== "en") return fr ?? en ?? null;
  if (en && en.trim()) return en;
  if (!fr) return null;
  return LESSON_SUBTITLE_EN[fr] ?? enOrTranslate(fr);
}

export function pickLessonMarkdown(
  fr: string,
  en: string | null | undefined,
  locale: AppLocale,
  title?: string,
): string {
  if (locale !== "en") return fr;
  if (en && en.trim()) return en;
  if (title && LESSON_MARKDOWN_EN_BY_TITLE[title]) {
    return LESSON_MARKDOWN_EN_BY_TITLE[title]!;
  }
  return enOrTranslate(fr);
}

export function pickLocalizedWithFallback(
  fr: string,
  en: string | null | undefined,
  locale: AppLocale,
  fallbackEn?: string,
): string {
  if (locale !== "en") return fr;
  if (en && en.trim()) return en;
  if (fallbackEn && fallbackEn.trim()) return fallbackEn;
  return pickLocalized(fr, en, locale);
}
