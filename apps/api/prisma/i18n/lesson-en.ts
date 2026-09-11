import { enOrTranslate } from "./auto-en";
import { translateCheckpointTitle } from "./en";

type SeedQuestionAnswerLike = {
  label: string;
  labelEn?: string;
  isCorrect: boolean;
  order?: number;
  matchKey?: string;
};

type SeedQuestionLike = {
  type: "SINGLE" | "TRUE_FALSE" | "TEXT" | "MULTI" | "ORDER" | "MATCH" | "HOTSPOT";
  prompt: string;
  promptEn?: string;
  explanation: string;
  explanationEn?: string;
  answers: SeedQuestionAnswerLike[];
  payload?: unknown;
};

export type SeedLessonLike = {
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  markdown: string;
  markdownEn?: string;
  durationSec: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  order: number;
  xpReward: number;
  tags: string[];
  checkpointKey?: string;
  checkpointTitle?: string;
  checkpointTitleEn?: string;
  checkpointOrder?: number;
  illustrationUrl?: string | null;
  sources?: string[];
  questions?: SeedQuestionLike[];
  quizPrompt?: string;
  quizPromptEn?: string;
  quizCorrect?: string;
  quizCorrectEn?: string;
  quizWrong?: string[];
  quizWrongEn?: string[];
  tfPrompt?: string;
  tfPromptEn?: string;
  tfIsTrue?: boolean;
  tfExplanation?: string;
  tfExplanationEn?: string;
};

type GateLike = {
  title: string;
  titleEn?: string;
  questions: SeedQuestionLike[];
};

type MiniGameQuestionLike = SeedQuestionLike;

const TITLE_EN: Record<string, string> = {
  Calories: "Calories",
  Protéines: "Proteins",
  Glucides: "Carbohydrates",
  Lipides: "Fats",
  Vitamines: "Vitamins",
  Minéraux: "Minerals",
  "Oligo-éléments": "Trace Elements",
  Eau: "Water",
  "Fruits et légumes": "Fruits and Vegetables",
  Féculents: "Starchy Foods",
  "Sources de protéines": "Protein Sources",
  "Matières grasses": "Dietary Fats",
  Laitiers: "Dairy",
  Fibres: "Fiber",
  Hydratation: "Hydration",
  "Journée équilibrée": "Balanced Day",
  "Métabolisme basal": "Basal Metabolism",
  "Dépense énergétique": "Energy Expenditure",
  "Activité physique": "Physical Activity",
  "Thermogenèse alimentaire": "Diet-Induced Thermogenesis",
  "Besoins caloriques": "Calorie Needs",
  "Balance énergétique": "Energy Balance",
  "Déficit, maintien, surplus": "Deficit, Maintenance, Surplus",
  Digestion: "Digestion",
  "Absorption intestinale": "Intestinal Absorption",
  "Glucose et glycémie": "Glucose and Blood Sugar",
  Insuline: "Insulin",
  "Stockage énergie": "Energy Storage",
  "Foie, muscles et gras": "Liver, Muscles, and Fat",
  "Fibres solubles et insolubles": "Soluble and Insoluble Fiber",
  Satiété: "Satiety",
  Transit: "Digestive Transit",
  Microbiote: "Microbiome",
  Fermentation: "Fermentation",
  "Santé digestive": "Digestive Health",
  "Étiquettes nutritionnelles": "Nutrition Labels",
  Ingrédients: "Ingredients",
  "Densité énergétique": "Energy Density",
  Portions: "Portions",
  "Sucres ajoutés": "Added Sugars",
  Sel: "Salt",
  "Qualité des graisses": "Fat Quality",
  "Marketing alimentaire": "Food Marketing",
  "Perte de poids": "Weight Loss",
  "Prise de masse": "Muscle Gain",
  "Performance sportive": "Athletic Performance",
  "Santé cardio": "Cardiovascular Health",
  Glycémie: "Blood Sugar",
  Vieillissement: "Aging",
  Végétarisme: "Vegetarianism",
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
  "Grand dorsal, grand rond, petit rond": "Latissimus Dorsi, Teres Major, Teres Minor",
  "Trapèze, rhomboïdes, élévateur": "Trapezius, Rhomboids, Levator Scapulae",
  "Abdominaux profonds et obliques": "Deep Abdominals and Obliques",
  "Serratus antérieur et stabilité scapulaire": "Serratus Anterior and Scapular Stability",
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
  "Longueur-tension et angles d'insertion": "Length-Tension and Insertion Angles",
  "Sommeil : le vrai stéroïde naturel": "Sleep: The Real Natural Steroid",
  "Hygiène de sommeil et sieste": "Sleep Hygiene and Naps",
  "Cycles de sommeil": "Sleep Cycles",
  "Hormones de la nuit": "Night Hormones",
  "DOMS : ami ou ennemi ?": "DOMS: Friend or Foe?",
  "Inflammation : signal utile": "Inflammation: A Useful Signal",
  "Adaptation et surcompensation": "Adaptation and Supercompensation",
  "Blessures de surutilisation": "Overuse Injuries",
  "Gestion du stress": "Stress Management",
  "Fatigue du système nerveux central": "Central Nervous System Fatigue",
  "Respiration et relaxation": "Breathing and Relaxation",
  "Variabilité de la fréquence cardiaque": "Heart Rate Variability",
  "Mobilité utile": "Useful Mobility",
  "Étirement statique vs dynamique": "Static vs Dynamic Stretching",
  "Quand étirer, et pourquoi": "When to Stretch, and Why",
  "Mobilité articulaire ciblée": "Targeted Joint Mobility",
  "Hydratation et récupération": "Hydration and Recovery",
  "Récupération active": "Active Recovery",
  "Auto-massage et foam rolling": "Self-Massage and Foam Rolling",
  "Froid et chaud": "Cold and Heat",
  "Signaux de surmenage": "Overtraining Signals",
  "Le déload, la pause stratégique": "Deload: The Strategic Break",
  "Overreaching : jusqu'où pousser": "Overreaching: How Far to Push",
  "Suivre sa fatigue dans le temps": "Tracking Fatigue Over Time",
};

const SUBTITLE_EN: Record<string, string> = {
  "L'énergie des aliments.": "The energy in food.",
  "Les briques du muscle.": "The building blocks of muscle.",
  "L'énergie de l'effort.": "Fuel for training effort.",
  "Graisses et fonctions vitales.": "Fats and vital functions.",
  "Petites molécules, grands rôles.": "Small molecules, major roles.",
  "Calcium, magnésium, sodium et plus.": "Calcium, magnesium, sodium, and more.",
  "Fer, zinc, sélénium en traces.": "Iron, zinc, and selenium in trace amounts.",
  "Le micronutriment oublié.": "The forgotten micronutrient.",
  "Couleurs, fibres et vitamines.": "Colors, fiber, and vitamins.",
  "Pain, riz, pâtes, pommes de terre.": "Bread, rice, pasta, potatoes.",
  "Animal, végétal et variété.": "Animal, plant, and variety.",
  "Huiles, oléagineux, poissons gras.": "Oils, nuts, and fatty fish.",
  "Calcium, protéines et alternatives.": "Calcium, protein, and alternatives.",
  "Introduction aux fibres alimentaires.": "Introduction to dietary fiber.",
  "Boire au quotidien.": "Daily hydration habits.",
  "À quoi ressemble une assiette type.": "What a typical balanced plate looks like.",
  "L'énergie au repos.": "Energy at rest.",
  "MB + activité + digestion.": "BMR + activity + digestion.",
  "Sport et mouvements du quotidien.": "Training and daily movement.",
  "L'énergie pour digérer.": "Energy used for digestion.",
  "Estimer son apport.": "Estimate your intake.",
  "Entrées vs sorties.": "Intake vs expenditure.",
  "Trois états de la balance.": "Three energy-balance states.",
  "De la bouche à l'intestin.": "From mouth to intestine.",
  "Quand les nutriments entrent dans le sang.": "When nutrients enter the bloodstream.",
  "Le sucre dans le sang.": "Blood sugar basics.",
  "L'hormone qui range l'énergie.": "The hormone that stores energy.",
  "Glycogène et graisse.": "Glycogen and fat.",
  "Qui fait quoi avec l'énergie.": "Who does what with energy.",
  "Deux familles, deux rôles.": "Two families, two roles.",
  "Pourquoi certains repas calent plus.": "Why some meals keep you fuller.",
  "Le parcours des aliments non digérés.": "The path of undigested food.",
  "Les milliards de bactéries utiles.": "The billions of beneficial bacteria.",
  "Quand les fibres deviennent des acides gras.": "When fiber becomes fatty acids.",
  "Intestin en forme au quotidien.": "Daily gut health.",
  "Lire le tableau en 30 secondes.": "Read the label in 30 seconds.",
  "La liste qui dit la vérité.": "The list that tells the truth.",
  "Beaucoup de calories en peu de volume.": "Many calories in little volume.",
  "Ce que tu manges vraiment.": "What you actually eat.",
  "Repérer le sucre caché.": "Spot hidden sugar.",
  "Sodium, eau et tension.": "Sodium, water, and blood pressure.",
  "Saturées, insaturées, oméga-3.": "Saturated, unsaturated, omega-3.",
  "Déjouer les pièges du packaging.": "Avoid packaging traps.",
  "Déficit, protéines et muscle.": "Deficit, protein, and muscle.",
  "Surplus intelligent, pas excès.": "Smart surplus, not excess.",
  "Carburer l'effort à la salle.": "Fuel gym performance.",
  "Cœur, vaisseaux et assiette.": "Heart, vessels, and plate choices.",
  "Stabilité et objectifs de santé.": "Stability and health goals.",
  "Nutrition après 40 ans.": "Nutrition after 40.",
  "Muscu sans viande.": "Strength training without meat.",
  "Humérus, radius et ulna.": "Humerus, radius, and ulna.",
  "Clavicule, omoplate, côtes, sternum et rachis haut.":
    "Clavicle, scapula, ribs, sternum, and upper spine.",
  "Bassin, sacrum et lombaires.": "Pelvis, sacrum, and lumbar spine.",
  "Fémur, patella, tibia et fibula.": "Femur, patella, tibia, and fibula.",
};

function translateTitle(fr: string): string {
  return TITLE_EN[fr] ?? enOrTranslate(fr);
}

function translateSubtitle(fr: string): string {
  return SUBTITLE_EN[fr] ?? enOrTranslate(fr);
}

export { translateTitle as translateLessonTitle, translateSubtitle as translateLessonSubtitle };

export function enrichQuestionWithEnglish<T extends SeedQuestionLike>(question: T): T {
  return {
    ...question,
    promptEn: question.promptEn ?? enOrTranslate(question.prompt),
    explanationEn: question.explanationEn ?? enOrTranslate(question.explanation),
    answers: question.answers.map((answer) => ({
      ...answer,
      labelEn: answer.labelEn ?? enOrTranslate(answer.label),
    })),
  };
}

export function enrichLessonWithEnglish<T extends SeedLessonLike>(lesson: T): T {
  return {
    ...lesson,
    titleEn: lesson.titleEn ?? translateTitle(lesson.title),
    subtitleEn: lesson.subtitleEn ?? translateSubtitle(lesson.subtitle),
    markdownEn: lesson.markdownEn ?? enOrTranslate(lesson.markdown),
    checkpointTitleEn:
      lesson.checkpointTitleEn ??
      (lesson.checkpointTitle ? translateCheckpointTitle(lesson.checkpointTitle) : undefined),
    quizPromptEn: lesson.quizPromptEn ?? (lesson.quizPrompt ? enOrTranslate(lesson.quizPrompt) : undefined),
    quizCorrectEn:
      lesson.quizCorrectEn ?? (lesson.quizCorrect ? enOrTranslate(lesson.quizCorrect) : undefined),
    quizWrongEn:
      lesson.quizWrongEn ??
      (lesson.quizWrong ? lesson.quizWrong.map((value) => enOrTranslate(value)) : undefined),
    tfPromptEn: lesson.tfPromptEn ?? (lesson.tfPrompt ? enOrTranslate(lesson.tfPrompt) : undefined),
    tfExplanationEn:
      lesson.tfExplanationEn ??
      (lesson.tfExplanation ? enOrTranslate(lesson.tfExplanation) : undefined),
    questions: lesson.questions?.map((question) => enrichQuestionWithEnglish(question)),
  };
}

export function enrichGateWithEnglish<T extends GateLike>(gate: T): T {
  return {
    ...gate,
    titleEn: gate.titleEn ?? translateCheckpointTitle(gate.title),
    questions: gate.questions.map((question) => enrichQuestionWithEnglish(question)),
  };
}

export function enrichMiniGameQuestionWithEnglish<T extends MiniGameQuestionLike>(
  question: T,
): T {
  return enrichQuestionWithEnglish(question);
}
