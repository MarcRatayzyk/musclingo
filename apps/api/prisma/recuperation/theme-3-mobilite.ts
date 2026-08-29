import type { RecuperationSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_3_LESSONS: RecuperationSeedLesson[] = [
  {
    title: "Mobilité utile",
    subtitle: "Amplitude que tu contrôles.",
    markdown: `La **mobilité** désigne l'amplitude de mouvement qu'une articulation peut atteindre **avec contrôle actif**, pas juste en se laissant étirer passivement.

---

Une bonne mobilité pour la musculation, c'est avant tout avoir assez d'amplitude pour exécuter ses exercices clés (squat, développé, rowing) en **technique correcte**.

---

Au-delà de ce besoin fonctionnel, une mobilité extrême n'apporte pas forcément un bénéfice supplémentaire pour la prise de muscle ou de force.

---

Un manque de mobilité, à l'inverse, peut forcer des compensations techniques qui augmentent le risque de blessure sur certains mouvements.

---

À retenir : la mobilité utile est celle qui **sert tes mouvements d'entraînement**, pas une performance de souplesse en soi.`,
    durationSec: 80,
    difficulty: "BEGINNER",
    order: 0,
    xpReward: 25,
    tags: ["mobilite"],
    sources: ["Behm et al. — Effects of stretching on performance (2016)"],
    ...CP.mobilite,
    questions: quiz6(
      qcm(
        "Une bonne mobilité, c'est surtout…",
        "Une amplitude contrôlée, suffisante pour la technique",
        ["Le grand écart obligatoire", "Une articulation totalement relâchée", "La capacité à ne jamais avoir mal"],
        "L'objectif est fonctionnel, lié aux mouvements pratiqués.",
      ),
      qcm(
        "Un manque de mobilité sur un mouvement clé peut…",
        "Forcer des compensations techniques risquées",
        ["Toujours améliorer la sécurité", "N'avoir aucun effet technique", "Augmenter automatiquement la force"],
        "Les compensations peuvent surcharger d'autres structures.",
      ),
      qcm(
        "Une mobilité extrême, au-delà du besoin fonctionnel…",
        "N'apporte pas forcément un bénéfice supplémentaire",
        ["Garantit toujours plus de force", "Est indispensable pour tous les sports", "Réduit systématiquement les DOMS"],
        "Le surplus de souplesse n'est pas automatiquement utile.",
      ),
      fillBlank(
        "La mobilité désigne l'amplitude de mouvement qu'une articulation peut atteindre avec un contrôle ___.",
        "actif",
        ["absent", "passif", "aléatoire"],
        "C'est le contrôle actif de l'amplitude qui définit la mobilité utile.",
      ),
      tf(
        "Il faut être contorsionniste pour squatter correctement.",
        false,
        "Faux : amplitude suffisante et contrôle suffisent.",
      ),
      tf(
        "La mobilité utile est celle qui sert les mouvements pratiqués à l'entraînement.",
        true,
        "Vrai : c'est un critère fonctionnel, pas esthétique.",
      ),
    ),
  },
  {
    title: "Étirement statique vs dynamique",
    subtitle: "Deux outils, deux moments.",
    markdown: `L'**étirement dynamique** (mouvements contrôlés en amplitude croissante) prépare le corps à l'effort en activant les muscles tout en gagnant en amplitude.

---

L'**étirement statique** (position maintenue, sans mouvement) vise plutôt à relâcher une tension musculaire après l'effort ou en dehors de l'entraînement.

---

Un étirement statique **long et intense juste avant** un effort explosif ou lourd peut temporairement réduire la force et la puissance disponibles.

---

À l'inverse, un échauffement dynamique bien mené améliore généralement la préparation avant une séance de force ou de puissance.

---

À retenir : dynamique avant l'effort, statique plutôt après ou à distance — le bon outil dépend du moment, pas d'une règle unique.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 1,
    xpReward: 30,
    tags: ["etirement", "echauffement"],
    sources: ["Behm & Chaouachi — Review of acute stretching effects (2011)"],
    ...CP.mobilite,
    questions: quiz6(
      qcm(
        "L'étirement dynamique consiste en…",
        "Des mouvements contrôlés en amplitude croissante",
        ["Une position statique maintenue longtemps", "L'immobilité totale", "Un massage profond"],
        "Le dynamique combine mouvement et gain d'amplitude.",
      ),
      qcm(
        "Un étirement statique long et intense juste avant un effort lourd peut…",
        "Réduire temporairement la force disponible",
        ["Toujours augmenter la force immédiatement", "N'avoir aucun effet sur la performance", "Remplacer l'échauffement"],
        "L'effet peut être une baisse passagère de puissance.",
      ),
      qcm(
        "L'étirement statique est plutôt adapté…",
        "Après l'effort ou à distance de la séance",
        ["Uniquement juste avant un record de force", "Jamais en musculation", "Uniquement pendant l'échauffement explosif"],
        "Il vise plutôt le relâchement, hors contexte de performance immédiate.",
      ),
      fillBlank(
        "Avant un effort explosif, l'échauffement ___ est généralement préférable au statique long.",
        "dynamique",
        ["statique", "immobile", "passif"],
        "Le dynamique prépare mieux sans réduire la puissance.",
      ),
      tf(
        "L'étirement statique et dynamique servent exactement au même moment et au même objectif.",
        false,
        "Faux : chacun a un contexte d'usage différent.",
      ),
      tf(
        "Un échauffement dynamique bien mené peut améliorer la préparation avant une séance de force.",
        true,
        "Vrai : il active les muscles sans réduire la puissance.",
      ),
    ),
  },
  {
    title: "Quand étirer, et pourquoi",
    subtitle: "Pas une obligation systématique.",
    markdown: `Étirer un muscle après l'entraînement ne prévient pas forcément les **DOMS** de façon significative, contrairement à une croyance répandue.

---

L'intérêt principal de l'étirement post-séance est plutôt le **confort ressenti** et le relâchement de tension, pas une accélération prouvée de la récupération tissulaire.

---

Pour gagner en amplitude sur le long terme, la **régularité** (plusieurs séances par semaine, sur plusieurs semaines) compte plus qu'une séance isolée très intense.

---

Il n'existe pas d'obligation universelle de s'étirer : un athlète avec une mobilité suffisante pour ses mouvements n'a pas besoin d'en rajouter systématiquement.

---

À retenir : l'étirement est un outil à utiliser selon un besoin identifié (confort, amplitude manquante), pas un rituel obligatoire pour tout le monde.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 2,
    xpReward: 30,
    tags: ["etirement", "doms"],
    sources: ["Herbert & de Noronha — Stretching to prevent soreness (2011)"],
    ...CP.mobilite,
    questions: quiz6(
      qcm(
        "S'étirer après l'entraînement pour prévenir les DOMS est…",
        "Peu efficace scientifiquement, malgré la croyance répandue",
        ["Une méthode garantie à 100 %", "Obligatoire pour tous les athlètes", "Le seul moyen de récupérer"],
        "L'effet préventif sur les DOMS est faible.",
      ),
      qcm(
        "Pour gagner en amplitude durablement, ce qui compte le plus est…",
        "La régularité sur plusieurs semaines",
        ["Une seule séance très intense", "Le hasard", "La météo"],
        "La progression de mobilité se construit dans la durée.",
      ),
      qcm(
        "L'intérêt principal de l'étirement post-séance est surtout…",
        "Le confort ressenti et le relâchement de tension",
        ["Une accélération prouvée de la réparation musculaire", "Une augmentation garantie de la force", "La disparition immédiate des DOMS"],
        "C'est un bénéfice de confort plus que de récupération tissulaire.",
      ),
      fillBlank(
        "Il n'existe pas d'___ universelle de s'étirer pour tout le monde.",
        "obligation",
        ["interdiction", "récompense", "moyenne"],
        "Le besoin d'étirement dépend du contexte individuel.",
      ),
      tf(
        "S'étirer après l'effort élimine significativement les DOMS.",
        false,
        "Faux : l'effet préventif démontré est faible.",
      ),
      tf(
        "La régularité sur plusieurs semaines est plus efficace qu'une séance isolée intense pour gagner en amplitude.",
        true,
        "Vrai : la mobilité se construit progressivement.",
      ),
    ),
  },
  {
    title: "Mobilité articulaire ciblée",
    subtitle: "Cheville, hanche, épaule.",
    markdown: `Certaines articulations sont particulièrement souvent limitantes en musculation : la **cheville** (flexion dorsale au squat), la **hanche** (profondeur au squat, extension au soulevé) et l'**épaule** (amplitude au développé, aux tractions).

---

Un manque de flexion de cheville peut pousser le buste trop en avant au squat, reportant davantage de contrainte sur le bas du dos.

---

Une hanche raide peut limiter la profondeur du squat ou provoquer une compensation lombaire pour « aller chercher » l'amplitude manquante.

---

Travailler la mobilité **spécifiquement** sur l'articulation limitante, plutôt que de façon générale sur tout le corps, est généralement plus efficace et plus rapide.

---

À retenir : identifier l'articulation réellement limitante sur un mouvement précis oriente un travail de mobilité ciblé et utile.`,
    durationSec: 95,
    difficulty: "ADVANCED",
    order: 3,
    xpReward: 35,
    tags: ["mobilite", "cheville", "hanche", "epaule"],
    sources: ["Kritz et al. — Screening for functional mobility (2009)"],
    ...CP.mobilite,
    questions: quiz6(
      qcm(
        "Un manque de flexion de cheville au squat tend à…",
        "Pousser le buste trop en avant",
        ["Améliorer automatiquement la profondeur", "N'avoir aucun effet sur la posture", "Réduire la charge sur le dos"],
        "Le manque d'amplitude à la cheville se répercute sur la posture globale.",
      ),
      qcm(
        "Une hanche raide peut provoquer…",
        "Une compensation lombaire pour aller chercher l'amplitude",
        ["Une amélioration automatique de la profondeur du squat", "Un effet uniquement sur les bras", "Aucune conséquence technique"],
        "Le corps compense souvent au niveau lombaire.",
      ),
      qcm(
        "Pour progresser efficacement en mobilité, il est généralement préférable de…",
        "Cibler l'articulation réellement limitante",
        ["Travailler tout le corps de façon générale sans distinction", "Ignorer les articulations spécifiques", "Se concentrer uniquement sur les mains"],
        "Un travail ciblé est plus efficace qu'une approche généraliste.",
      ),
      fillBlank(
        "L'épaule est souvent limitante pour le développé et les ___.",
        "tractions",
        ["squats", "abdominaux", "mollets"],
        "L'amplitude d'épaule conditionne ces mouvements de tirage/poussée haut du corps.",
      ),
      tf(
        "Toutes les articulations doivent recevoir exactement le même travail de mobilité, sans distinction.",
        false,
        "Faux : cibler l'articulation limitante est plus efficace.",
      ),
      tf(
        "La cheville, la hanche et l'épaule sont des articulations fréquemment limitantes en musculation.",
        true,
        "Vrai : elles conditionnent squat, soulevé, développé et tractions.",
      ),
    ),
  },
];
