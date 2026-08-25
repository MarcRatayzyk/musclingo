import { qcm, tf } from "../anatomie-quiz-helpers";
import { tagged, type MiniGameQuestionSeed } from "./types";

/** Insertions et origines musculaires. */
const INSERTIONS = tagged("muscles-bas", [
  qcm(
    "Le quadriceps s'insère sur…",
    "la tubérosité tibiale",
    ["le calcanéum", "le grand trochanter", "l'olécrâne"],
    "Le quadriceps se termine sur la tubérosité tibiale via le tendon patellaire.",
  ),
  qcm(
    "Les ischio-jambiers naissent sur…",
    "la tubérosité ischiatique",
    ["le pubis", "le sacrum", "la rotule"],
    "Ils partent de l'ischion, en bas du bassin.",
  ),
  qcm(
    "Le triceps sural (mollet) s'insère sur…",
    "le calcanéum",
    ["la tubérosité tibiale", "la rotule", "le talus"],
    "Le tendon d'Achille relie le mollet au calcanéum.",
  ),
  qcm(
    "Le grand fessier s'insère principalement sur…",
    "le fémur",
    ["le tibia", "la rotule", "le sacrum"],
    "Il tire sur le fémur pour étendre la hanche.",
  ),
  qcm(
    "Le psoas-iliaque s'insère sur…",
    "le petit trochanter du fémur",
    ["le grand trochanter", "la crête iliaque", "le tibia"],
    "Le psoas descend du rachis vers le petit trochanter.",
  ),
  qcm(
    "Les adducteurs naissent sur…",
    "le pubis",
    ["l'ischion", "le sacrum", "le fémur"],
    "Les adducteurs partent du pubis vers la face interne du fémur.",
  ),
  qcm(
    "Le tendon d'Achille relie…",
    "le mollet au calcanéum",
    [
      "le quadriceps au tibia",
      "les ischios au bassin",
      "le fessier au fémur",
    ],
    "C'est le tendon du triceps sural.",
  ),
]);

const INSERTIONS_HAUT = tagged("muscles-haut", [
  qcm(
    "Le triceps brachial s'insère sur…",
    "l'olécrâne",
    ["la tubérosité radiale", "la clavicule", "l'acromion"],
    "Le triceps tire sur l'olécrâne pour étendre le coude.",
  ),
  qcm(
    "Le biceps brachial s'insère sur…",
    "la tubérosité radiale",
    ["l'olécrâne", "l'humérus", "le sternum"],
    "Le biceps se termine sur le radius, ce qui explique la supination.",
  ),
  qcm(
    "Le grand pectoral s'insère sur…",
    "l'humérus",
    ["le radius", "l'omoplate", "la clavicule seule"],
    "Il part du sternum et de la clavicule pour tirer sur l'humérus.",
  ),
  qcm(
    "Le grand dorsal s'insère sur…",
    "l'humérus",
    ["l'omoplate", "l'ulna", "les côtes"],
    "Malgré sa large origine dorsale, il se termine sur l'humérus.",
  ),
  qcm(
    "Le deltoïde s'insère sur…",
    "l'humérus",
    ["l'omoplate", "la clavicule", "le radius"],
    "Il se termine sur le V deltoïdien de l'humérus.",
  ),
  qcm(
    "Le deltoïde naît sur…",
    "la clavicule, l'acromion et l'omoplate",
    ["le sternum et les côtes", "les vertèbres cervicales", "l'humérus seul"],
    "Ses trois faisceaux partent de la ceinture scapulaire.",
  ),
  qcm(
    "Le trapèze s'insère sur…",
    "la clavicule et l'omoplate",
    ["l'humérus", "les côtes", "le sternum"],
    "Le trapèze agit sur la ceinture scapulaire, pas sur le bras.",
  ),
  qcm(
    "Le droit de l'abdomen s'insère sur…",
    "le pubis",
    ["le fémur", "le sacrum", "la crête iliaque"],
    "Il relie les cartilages costaux au pubis.",
  ),
]);

/** Actions musculaires. */
const ACTIONS = tagged("organisation-mvt", [
  qcm(
    "L'action principale du quadriceps est…",
    "étendre le genou",
    ["fléchir le genou", "étendre la hanche", "fléchir la cheville"],
    "Le quadriceps tend la jambe, comme en squat remontée.",
  ),
  qcm(
    "L'action principale des ischio-jambiers est…",
    "fléchir le genou",
    ["étendre le genou", "abduire la hanche", "fléchir le tronc"],
    "Ils fléchissent le genou et participent à l'extension de hanche.",
  ),
  qcm(
    "L'action principale du biceps brachial est…",
    "fléchir le coude",
    ["étendre le coude", "abduire l'épaule", "fléchir le poignet"],
    "Il fléchit le coude et tourne l'avant-bras en supination.",
  ),
  qcm(
    "L'action principale du triceps est…",
    "étendre le coude",
    ["fléchir le coude", "élever l'épaule", "tourner le tronc"],
    "Le triceps tend le bras, comme en dips ou développé.",
  ),
  qcm(
    "L'action principale du grand fessier est…",
    "étendre la hanche",
    ["fléchir la hanche", "fléchir le genou", "fléchir le tronc"],
    "Il pousse la hanche vers l'avant, clé du hip thrust.",
  ),
  qcm(
    "L'action principale du deltoïde moyen est…",
    "élever le bras sur le côté",
    ["tirer le bras vers le bas", "fléchir le coude", "tourner le tronc"],
    "C'est l'abduction de l'épaule, comme les élévations latérales.",
  ),
  qcm(
    "L'action principale du grand dorsal est…",
    "tirer le bras vers le bas et l'arrière",
    ["élever le bras", "étendre le coude", "fléchir la hanche"],
    "C'est le muscle des tractions.",
  ),
  qcm(
    "L'action principale des mollets est…",
    "pousser sur la pointe des pieds",
    [
      "ramener le pied vers le tibia",
      "fléchir le genou",
      "étendre la hanche",
    ],
    "C'est la flexion plantaire de la cheville.",
  ),
  qcm(
    "L'action principale du droit de l'abdomen est…",
    "fléchir le tronc vers l'avant",
    ["étendre le tronc", "tourner le bassin", "élever les épaules"],
    "Il rapproche le sternum du pubis.",
  ),
  qcm(
    "L'action principale du grand pectoral est…",
    "ramener le bras vers l'avant et vers l'intérieur",
    ["tirer le bras vers l'arrière", "étendre le coude", "élever l'omoplate"],
    "C'est le muscle de la poussée horizontale.",
  ),
]);

/** Couples agoniste / antagoniste. */
const ANTAGONISTES = tagged("articulations", [
  qcm(
    "L'antagoniste du biceps est…",
    "le triceps",
    ["le deltoïde", "le grand dorsal", "le trapèze"],
    "Un fléchit le coude, l'autre l'étend.",
  ),
  qcm(
    "L'antagoniste du quadriceps est…",
    "les ischio-jambiers",
    ["le grand fessier", "les mollets", "les adducteurs"],
    "Extension contre flexion du genou.",
  ),
  qcm(
    "L'antagoniste du psoas est…",
    "le grand fessier",
    ["le quadriceps", "les abdominaux", "les adducteurs"],
    "Le psoas fléchit la hanche, le fessier l'étend.",
  ),
  qcm(
    "L'antagoniste du grand pectoral est plutôt…",
    "le grand dorsal",
    ["le deltoïde antérieur", "le triceps", "le droit de l'abdomen"],
    "Poussée contre tirage.",
  ),
  qcm(
    "L'antagoniste des mollets est…",
    "le tibial antérieur",
    ["le quadriceps", "les ischios", "le grand fessier"],
    "Le tibial antérieur ramène le pied vers le tibia.",
  ),
]);

/** Vrai / faux rapides. */
const VRAI_FAUX = tagged("tissus", [
  tf(
    "Le tendon d'Achille relie le quadriceps au tibia.",
    false,
    "Faux : il relie le mollet au calcanéum.",
  ),
  tf(
    "Les ischio-jambiers sont situés à l'arrière de la cuisse.",
    true,
    "Vrai : ils sont opposés au quadriceps.",
  ),
  tf(
    "Le quadriceps compte quatre chefs musculaires.",
    true,
    "Vrai, d'où son nom.",
  ),
  tf(
    "Le triceps compte deux chefs musculaires.",
    false,
    "Faux : il en compte trois.",
  ),
  tf(
    "Le biceps brachial croise à la fois l'épaule et le coude.",
    true,
    "Vrai : c'est un muscle bi-articulaire.",
  ),
  tf(
    "Le grand fessier est un fléchisseur de hanche.",
    false,
    "Faux : c'est un extenseur de hanche.",
  ),
  tf(
    "Un muscle tire toujours sur l'os, il ne pousse jamais.",
    true,
    "Vrai : la contraction ne fait que tirer.",
  ),
  tf(
    "L'origine est le point le plus fixe, l'insertion le plus mobile.",
    true,
    "Vrai : c'est la convention utilisée en anatomie.",
  ),
  tf(
    "Le deltoïde possède trois faisceaux.",
    true,
    "Vrai : antérieur, moyen et postérieur.",
  ),
  tf(
    "Les abdominaux s'insèrent sur le fémur.",
    false,
    "Faux : le droit de l'abdomen s'insère sur le pubis.",
  ),
]);

export const ANATOMIE_MINI_GAME_QUESTIONS: MiniGameQuestionSeed[] = [
  ...INSERTIONS,
  ...INSERTIONS_HAUT,
  ...ACTIONS,
  ...ANTAGONISTES,
  ...VRAI_FAUX,
];
