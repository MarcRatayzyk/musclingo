import { qcm, tf } from "../anatomie-quiz-helpers";
import { tagged, type MiniGameQuestionSeed } from "./types";

const SOMMEIL = tagged("sommeil", [
  qcm(
    "Le sommeil profond favorise surtout…",
    "La récupération physique et hormonale",
    [
      "La digestion uniquement",
      "La perte de muscle",
      "La déshydratation",
    ],
    "GH et réparation tissulaire surtout la nuit.",
  ),
  tf(
    "Moins de 6 h de sommeil régulier peut nuire à la récupération musculaire.",
    true,
    "Le manque de sommeil augmente le stress et la fatigue.",
  ),
  qcm(
    "Une hygiène de sommeil inclut…",
    "Horaires réguliers et environnement sombre",
    [
      "Écrans jusqu'au coucher",
      "Café en soirée",
      "Entraînement intense juste avant de dormir",
    ],
    "Routine stable + obscurité = meilleur sommeil.",
  ),
]);

const NUTRITION_RECUP = tagged("nutrition-recup", [
  qcm(
    "Les protéines post-entraînement servent surtout à…",
    "Fournir des acides aminés pour la réparation musculaire",
    [
      "Remplacer le sommeil",
      "Éliminer le lactate instantanément",
      "Bloquer la cortisol à 0",
    ],
    "Les AA sont les briques du muscle.",
  ),
  tf(
    "Les glucides après l'effort aident à reconstituer le glycogène.",
    true,
    "Important surtout si plusieurs séances rapprochées.",
  ),
  qcm(
    "Une hydratation insuffisante peut causer…",
    "Baisse de performance et maux de tête",
    [
      "Plus de force immédiate",
      "Meilleure récupération",
      "Aucun effet",
    ],
    "L'eau est essentielle aux fonctions cellulaires.",
  ),
]);

const STRESS = tagged("stress", [
  qcm(
    "Le stress chronique élevé peut…",
    "Entraver la récupération et la progression",
    [
      "Toujours améliorer les gains",
      "Remplacer l'entraînement",
      "Augmenter la testostérone sans limite",
    ],
    "Cortisol prolongé = moins favorable à l'anabolisme.",
  ),
  tf(
    "La marche légère peut aider à la récupération active.",
    true,
    "Mouvement basse intensité = circulation sans fatigue.",
  ),
  qcm(
    "La récupération active consiste à…",
    "Bouger légèrement pour favoriser la circulation",
    [
      "Faire une séance maximale",
      "Rester immobile 48 h",
      "S'entraîner à l'échec daily",
    ],
    "Ex. marche, vélo très léger.",
  ),
]);

const DOULEUR = tagged("douleur", [
  qcm(
    "Une DOMS (courbatures) indique surtout…",
    "Des micro-lésions et inflammation légère post-effort",
    [
      "Une blessure grave systématique",
      "Un manque de protéines instantané",
      "Qu'il faut arrêter définitivement",
    ],
    "Courbatures = adaptation, pas toujours dommage.",
  ),
  tf(
    "Une douleur articulaire aiguë doit être prise au sérieux.",
    true,
    "Différencier courbature musculaire vs douleur articulaire.",
  ),
  qcm(
    "Le repos complet entre deux séances du même muscle sert à…",
    "Laisser le temps aux tissus de se réparer",
    [
      "Perdre tous les gains",
      "Éviter toute adaptation",
      "Augmenter la fatigue chronique",
    ],
    "La supercompensation demande du temps.",
  ),
]);

const MOBILITE = tagged("mobilite", [
  qcm(
    "La mobilité désigne surtout…",
    "La capacité à bouger activement dans une amplitude",
    [
      "Uniquement les étirements passifs",
      "La force maximale",
      "La vitesse de sprint",
    ],
    "Mobilité = contrôle actif de l'amplitude.",
  ),
  tf(
    "Un échauffement dynamique peut améliorer la mobilité temporaire.",
    true,
    "Mouvements contrôlés préparent les articulations.",
  ),
  qcm(
    "Le foam rolling peut aider à…",
    "Réduire la tension perçue et la raideur",
    [
      "Remplacer le sommeil",
      "Guérir une fracture",
      "Augmenter le 1RM instantanément",
    ],
    "Auto-massage = confort, pas miracle.",
  ),
]);

const SUPPLEMENTS = tagged("supplements", [
  qcm(
    "La créatine monohydrate est surtout utile pour…",
    "Améliorer la performance en efforts courts/intenses",
    [
      "Remplacer les protéines",
      "Guérir les tendons seule",
      "Dormir 12 h",
    ],
    "Créatine = réserve energetique musculaire.",
  ),
  tf(
    "Aucun supplément ne remplace une alimentation et un sommeil corrects.",
    true,
    "Les bases restent prioritaires.",
  ),
  qcm(
    "La caféine avant l'entraînement peut…",
    "Augmenter l'alerte et la performance perçue",
    [
      "Remplacer l'échauffement",
      "Empêcher toute fatigue utile à vie",
      "Hydrater le corps",
    ],
    "Effet ergogénique modéré chez beaucoup.",
  ),
]);

const PLANIFICATION = tagged("planification", [
  qcm(
    "Un jour off complet par semaine peut…",
    "Aider à récupérer mentalement et physiquement",
    [
      "Annuler tous les progrès",
      "Remplacer 8 h de sommeil",
      "Augmenter le risque de blessure systématiquement",
    ],
    "Le repos fait partie du plan.",
  ),
  tf(
    "Alterner intensités lourdes et légères dans la semaine peut gérer la fatigue.",
    true,
    "Periodisation daily undulating possible.",
  ),
  qcm(
    "Écouter les signaux de fatigue persistante incite à…",
    "Ajuster volume, sommeil ou stress",
    [
      "Doubler le volume",
      "Supprimer toute récupération",
      "Ignorer la douleur articulaire",
    ],
    "Fatigue chronique = signal d'alarme.",
  ),
]);

const BLESSURE = tagged("blessure", [
  qcm(
    "En cas de douleur aiguë pendant un exercice, il est prudent de…",
    "Arrêter le mouvement et évaluer",
    [
      "Forcer jusqu'à l'échec",
      "Augmenter la charge",
      "Ignorer systématiquement",
    ],
    "Mieux vaut stopper que aggraver.",
  ),
  tf(
    "Reprendre progressivement après une pause réduit le risque de rechute.",
    true,
    "Retour graduel en charge et volume.",
  ),
  tf(
    "Étirer légèrement après l'effort peut aider au confort sans remplacer le repos.",
    true,
    "Étirements modérés ≠ récupération complète seule.",
  ),
  qcm(
    "La variabilité de fréquence cardiaque (HRV) peut indiquer…",
    "L'état de récupération du système nerveux",
    [
      "Uniquement la force max",
      "Le poids osseux",
      "La taille des muscles",
    ],
    "HRV basse persistante = fatigue possible.",
  ),
  qcm(
    "Un bain froid après l'entraînement peut…",
    "Réduire la perception d'inflammation aiguë",
    [
      "Remplacer les protéines",
      "Augmenter le sommeil profond garanti",
      "Guérir une entorse",
    ],
    "Effet modéré sur confort post-effort.",
  ),
  qcm(
    "Les protéines distribuées dans la journée…",
    "Aident à couvrir les besoins de réparation",
    ["Remplacent le sommeil", "Empêchent toute courbature", "Ne servent jamais"],
    "Apports réguliers = apports en AA.",
  ),
  tf(
    "Marcher 20 min le jour de repos peut favoriser la récupération.",
    true,
    "Activité légère sans surcharge.",
  ),
  qcm(
    "Un signe de surentraînement peut être…",
    "Fatigue persistante et baisse de performance",
    ["Progression linéaire infinie", "Sommeil parfait garanti", "Aucune variation"],
    "Écouter les signaux de fatigue.",
  ),
]);

export const RECUPERATION_MINI_GAME_QUESTIONS: MiniGameQuestionSeed[] = [
  ...SOMMEIL,
  ...NUTRITION_RECUP,
  ...STRESS,
  ...DOULEUR,
  ...MOBILITE,
  ...SUPPLEMENTS,
  ...PLANIFICATION,
  ...BLESSURE,
];
