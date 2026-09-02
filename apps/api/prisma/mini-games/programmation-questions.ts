import { qcm, tf } from "../anatomie-quiz-helpers";
import { tagged, type MiniGameQuestionSeed } from "./types";

const FONDAMENTAUX = tagged("fondamentaux", [
  qcm(
    "L'hypertrophie désigne surtout…",
    "L'augmentation de la taille des fibres musculaires",
    [
      "La perte de graisse uniquement",
      "L'amélioration du cardio seul",
      "La flexibilité maximale",
    ],
    "Hypertrophie = gain de masse musculaire.",
  ),
  tf(
    "Un débutant peut progresser avec peu de volume hebdomadaire.",
    true,
    "Les débutants répondent bien à un stimulus modéré.",
  ),
  qcm(
    "La spécificité en programmation signifie que…",
    "L'entraînement doit correspondre à l'objectif visé",
    [
      "Tous les sports demandent le même plan",
      "Il faut toujours courir",
      "Le volume n'a pas d'importance",
    ],
    "Tu t'entraînes pour ce que tu veux améliorer.",
  ),
]);

const VOLUME = tagged("volume", [
  qcm(
    "Le volume d'entraînement désigne surtout…",
    "Séries × reps × charge (travail total)",
    ["Uniquement le temps de repos", "La fréquence cardiaque", "Les pas"],
    "Volume = quantité de travail effectué.",
  ),
  tf(
    "10 séries par muscle par semaine peuvent suffire à un débutant.",
    true,
    "Fourchette basse souvent efficace au départ.",
  ),
  qcm(
    "Augmenter le volume indéfiniment…",
    "N'est pas toujours bénéfique (rendements décroissants)",
    [
      "Est toujours optimal",
      "N'a aucun effet",
      "Remplace la récupération",
    ],
    "Trop de volume peut nuire à la récupération.",
  ),
]);

const FREQUENCE = tagged("frequence", [
  qcm(
    "Entraîner un muscle 2×/semaine permet souvent…",
    "Une meilleure répartition du volume",
    [
      "Moins de récupération obligatoire",
      "Aucun stimulus",
      "De ne jamais progresser",
    ],
    "Fréquence modérée = plus de sessions de qualité.",
  ),
  tf(
    "La fréquence optimale est identique pour tous les niveaux.",
    false,
    "Elle dépend du volume, récupération et niveau.",
  ),
  qcm(
    "Un split bro (1 muscle/jour) implique typiquement…",
    "Une séance focalisée par groupe musculaire",
    [
      "Full body chaque jour",
      "Aucun jour de repos",
      "Uniquement du cardio",
    ],
    "Chaque jour cible un groupe principal.",
  ),
]);

const INTENSITE = tagged("intensite", [
  qcm(
    "Entraîner à 80 % du 1RM correspond à…",
    "Une charge lourde, peu de répétitions possibles",
    [
      "Une charge très légère",
      "Uniquement de l'endurance",
      "Aucune tension musculaire",
    ],
    "Plus le %1RM est haut, moins on fait de reps.",
  ),
  tf(
    "L'intensité peut se mesurer en %1RM ou en RPE.",
    true,
    "Deux échelles complémentaires.",
  ),
  qcm(
    "Le RIR 2 signifie…",
    "2 répétitions restantes avant l'échec",
    ["Échec immédiat", "10 reps de marge", "Repos de 2 min"],
    "RIR = reps in reserve.",
  ),
]);

const PROGRESSION = tagged("progression", [
  qcm(
    "Double progression consiste à…",
    "Monter en reps puis en charge dans une fourchette",
    [
      "Changer d'exercice chaque séance",
      "Ne jamais augmenter la charge",
      "Supprimer le repos",
    ],
    "Ex. 3×8-12 : d'abord plus de reps, puis plus lourd.",
  ),
  tf(
    "Tenir un journal d'entraînement aide à progresser.",
    true,
    "Suivre charge/reps évite de stagner.",
  ),
  qcm(
    "Une semaine de deload sert à…",
    "Réduire la fatigue accumulée",
    [
      "Maximiser le volume",
      "Arrêter définitivement",
      "Remplacer le sommeil",
    ],
    "Deload = récupération planifiée.",
  ),
]);

const SEANCES = tagged("seances", [
  qcm(
    "Un échauffement efficace inclut souvent…",
    "Mouvements spécifiques + montée progressive en charge",
    [
      "Étirements statiques longs avant chaque série lourde",
      "Aucune activation",
      "Uniquement du cardio 1 h",
    ],
    "Préparer articulations et pattern du jour.",
  ),
  tf(
    "Les séries d'approche avant une série lourde sont utiles.",
    true,
    "Elles préparent le système nerveux.",
  ),
]);

const SPLITS = tagged("splits", [
  qcm(
    "Un full body 3×/semaine convient surtout…",
    "Aux débutants ou emplois du temps serrés",
    [
      "Uniquement aux compétiteurs avancés",
      "À ceux qui ne veulent jamais récupérer",
      "Aux personnes sans objectif",
    ],
    "Chaque séance touche tout le corps.",
  ),
  tf(
    "Upper/Lower divise le corps en haut et bas.",
    true,
    "2 types de séances alternées.",
  ),
  qcm(
    "Push/Pull/Legs classe les séances par…",
    "Type de mouvement (poussée, tirage, jambes)",
    ["Couleur des vêtements", "Heure du jour", "Âge du pratiquant"],
    "PPL = organisation par pattern.",
  ),
]);

const PERIODISATION = tagged("periodisation", [
  qcm(
    "La périodisation linéaire alterne souvent…",
    "Phases volume puis intensité",
    [
      "Uniquement du repos",
      "Jamais de changement",
      "Que du cardio",
    ],
    "Progression structurée sur mesocycles.",
  ),
  tf(
    "Un bloc d'accumulation augmente souvent le volume.",
    true,
    "Accumulation = plus de travail, intensité modérée.",
  ),
]);

const INDIVIDUALISATION = tagged("individualisation", [
  qcm(
    "Individualiser un programme, c'est…",
    "Adapter volume, exercices et récup au profil",
    [
      "Copier un influenceur",
      "Ignorer la récupération",
      "Utiliser le même plan pour tous",
    ],
    "Age, niveau, contraintes = variables clés.",
  ),
  tf(
    "La récupération entre séries influence la qualité des reps suivantes.",
    true,
    "Repos adapté = meilleure performance.",
  ),
  qcm(
    "Un mesocycle dure typiquement…",
    "4 à 8 semaines",
    ["1 jour", "2 ans", "Quelques minutes"],
    "Bloc d'entraînement cohérent sur plusieurs semaines.",
  ),
  qcm(
    "La fatigue aiguë disparaît en général en…",
    "Quelques jours avec repos adapté",
    ["10 secondes", "Jamais", "1 an minimum"],
    "Différent de la fatigue chronique.",
  ),
  qcm(
    "La surcharge progressive peut passer par…",
    "Plus de reps, de charge ou de séries",
    ["Moins de repos permanent", "Aucun changement", "Uniquement le cardio"],
    "Plusieurs leviers existent.",
  ),
  tf(
    "Un débutant bénéficie souvent d'un full body 2-3×/semaine.",
    true,
    "Fréquence modérée + pattern complets.",
  ),
  qcm(
    "Le repos inter-séries sert surtout à…",
    "Récupérer pour maintenir la qualité des reps",
    ["Augmenter la fatigue inutilement", "Remplacer le sommeil", "Diminuer la force"],
    "Repos = performance sur les reps suivantes.",
  ),
]);

export const PROGRAMMATION_MINI_GAME_QUESTIONS: MiniGameQuestionSeed[] = [
  ...FONDAMENTAUX,
  ...VOLUME,
  ...FREQUENCE,
  ...INTENSITE,
  ...PROGRESSION,
  ...SEANCES,
  ...SPLITS,
  ...PERIODISATION,
  ...INDIVIDUALISATION,
];
