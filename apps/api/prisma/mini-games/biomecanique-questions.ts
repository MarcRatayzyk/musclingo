import { qcm, tf } from "../anatomie-quiz-helpers";
import { tagged, type MiniGameQuestionSeed } from "./types";

const BASES = tagged("bases", [
  qcm(
    "Qu'est-ce qu'un plan sagittal ?",
    "Un plan qui divise le corps en gauche et droite",
    [
      "Un plan qui divise le corps en avant et arrière",
      "Un plan horizontal",
      "Un plan oblique",
    ],
    "Le plan sagittal sépare le corps en moitiés droite et gauche.",
  ),
  tf(
    "Le plan frontal divise le corps en avant et arrière.",
    true,
    "C'est le plan coronal (frontal).",
  ),
  qcm(
    "L'extension du coude correspond à…",
    "Augmenter l'angle du coude (bras tendu)",
    [
      "Diminuer l'angle du coude",
      "Rotation de l'avant-bras",
      "Écartement du bras",
    ],
    "Extension = ouverture de l'angle articulaire.",
  ),
  qcm(
    "La flexion du genou rapproche…",
    "Le mollet du fémur",
    ["Le pied de la hanche", "Le bassin du tronc", "Les côtes du bassin"],
    "La flexion du genou fléchit la jambe.",
  ),
  tf(
    "Un mouvement isométrique implique un changement de longueur musculaire visible.",
    false,
    "En isométrique, la longueur musculaire reste constante.",
  ),
]);

const MOUVEMENTS = tagged("mouvements", [
  qcm(
    "L'abduction de l'épaule correspond à…",
    "Écarter le bras du corps",
    ["Rapprocher le bras", "Rotation interne", "Flexion du coude"],
    "Abduction = s'éloigner de la ligne médiane.",
  ),
  qcm(
    "La rotation interne de la hanche fait tourner le genou vers…",
    "La ligne médiane",
    ["L'extérieur", "Le haut", "L'arrière"],
    "Rotation interne oriente vers le centre.",
  ),
  tf(
    "La supination de l'avant-bras oriente la paume vers le haut.",
    true,
    "Supination = paume vers le ciel.",
  ),
  qcm(
    "Un mouvement en chaîne fermée, c'est quand…",
    "La main ou le pied reste fixe",
    [
      "Le segment distal est libre",
      "Il n'y a pas de charge",
      "Le muscle ne travaille pas",
    ],
    "Ex. squat : pieds au sol = chaîne fermée.",
  ),
]);

const MUSCLES = tagged("muscles", [
  qcm(
    "Quel muscle est principal fléchisseur du coude ?",
    "Biceps brachial",
    ["Triceps brachial", "Deltoïde", "Grand dorsal"],
    "Le biceps fléchit le coude et supine.",
  ),
  qcm(
    "Le quadriceps produit surtout…",
    "L'extension du genou",
    ["La flexion du genou", "L'adduction", "La rotation du pied"],
    "Les 4 chefs du quadriceps étendent le genou.",
  ),
  tf(
    "Le grand fessier est un puissant extenseur de hanche.",
    true,
    "Il étend la hanche en montée ou sprint.",
  ),
  qcm(
    "Le muscle soléaire participe surtout à…",
    "La flexion plantaire (relevé de talon)",
    ["La dorsiflexion", "L'extension du genou", "La flexion du genou"],
    "Soléaire + gastrocnémiens = mollet.",
  ),
]);

const FORCES = tagged("forces", [
  qcm(
    "Le moment de force dépend de…",
    "La force et la distance au pivot",
    ["Uniquement de la masse", "La vitesse uniquement", "La température"],
    "Moment = force × bras de levier.",
  ),
  tf(
    "Plus le bras de levier est long, plus le moment est grand à force égale.",
    true,
    "Même force, levier plus long = moment plus élevé.",
  ),
  qcm(
    "La résistance externe dans un curl haltère, c'est surtout…",
    "La gravité agissant sur l'haltère",
    ["La friction de l'air", "La tension du tendon seul", "L'inertie nulle"],
    "La charge et la gravité créent la résistance.",
  ),
]);

const RESISTANCE = tagged("resistance", [
  qcm(
    "La résistance variable avec élastiques signifie que…",
    "La tension augmente avec l'étirement",
    [
      "La tension reste constante",
      "La charge diminue en fin de mouvement",
      "Il n'y a pas de résistance",
    ],
    "Plus l'élastique s'étire, plus il tire fort.",
  ),
  tf(
    "Un câble en position basse modifie la direction de la résistance.",
    true,
    "L'angle de tir change le profil de résistance.",
  ),
  qcm(
    "Au développé couché, la résistance est maximale quand…",
    "Les bras sont proches de la poitrine (bras de levier long)",
    [
      "Les bras sont tendus verticalement",
      "La barre est au-dessus du visage",
      "On est debout",
    ],
    "Le bras de levier horizontal influence le moment.",
  ),
]);

const EXERCICES = tagged("exercices", [
  qcm(
    "Le squat back est surtout un pattern de…",
    "Flexion-extension de hanche et genou",
    ["Isolation du biceps", "Rotation du tronc", "Flexion du poignet"],
    "Pattern fondamental triple extension partielle.",
  ),
  tf(
    "La traction pronation sollicite fortement le grand dorsal.",
    true,
    "Traction = extension/adduction épaule.",
  ),
  qcm(
    "Le hip hinge (soulevé de terre) mobilise surtout…",
    "Hanche en extension",
    ["Genou en isolation", "Cheville seule", "Coude"],
    "Extension de hanche dominante.",
  ),
]);

const ENTRAINEMENT = tagged("entrainement", [
  qcm(
    "Le RPE 8 signifie…",
    "Encore ~2 répétitions en réserve",
    [
      "Échec musculaire",
      "Aucun effort",
      "10 répétitions en réserve",
    ],
    "RPE 10 = échec, RPE 8 = marge de 2 reps.",
  ),
  tf(
    "Un tempo 3-1-1 indique 3 s en excentrique.",
    true,
    "Premier chiffre = phase excentrique.",
  ),
  qcm(
    "La pronation de l'avant-bras oriente la paume vers…",
    "Le bas",
    ["Le haut", "L'extérieur", "L'arrière"],
    "Pronation = paume vers le sol.",
  ),
  tf(
    "Le coude est une articulation en hinge (charnière).",
    true,
    "Flexion-extension principale.",
  ),
  qcm(
    "L'adduction du bras rapproche le membre…",
    "De la ligne médiane du corps",
    ["Du sol", "De l'extérieur", "Du plafond"],
    "Adduction = vers le centre.",
  ),
  qcm(
    "Un muscle agoniste est celui qui…",
    "Produit le mouvement principal",
    ["S'oppose au mouvement", "Stabilise uniquement", "Ne se contracte jamais"],
    "Agoniste = moteur principal du mouvement.",
  ),
  tf(
    "La biomécanique étudie les forces agissant sur le corps en mouvement.",
    true,
    "Mécanique appliquée au corps humain.",
  ),
]);

export const BIOMECANIQUE_MINI_GAME_QUESTIONS: MiniGameQuestionSeed[] = [
  ...BASES,
  ...MOUVEMENTS,
  ...MUSCLES,
  ...FORCES,
  ...RESISTANCE,
  ...EXERCICES,
  ...ENTRAINEMENT,
];
