import type { RecuperationSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_5_LESSONS: RecuperationSeedLesson[] = [
  {
    title: "Signaux de surmenage",
    subtitle: "Quand lever le pied.",
    markdown: `Une **baisse de performance** persistante, malgré un entraînement régulier, est l'un des premiers signaux à surveiller.

---

Un **sommeil dégradé** (endormissement difficile, réveils nocturnes) qui coïncide avec cette baisse de performance renforce l'hypothèse d'une fatigue mal gérée.

---

Une **motivation en chute libre** pour des séances habituellement appréciées peut aussi traduire une fatigue accumulée, pas juste un manque de discipline.

---

Des **douleurs diffuses** ou une sensation de lourdeur générale, sans blessure précise identifiable, complètent souvent ce tableau.

---

À retenir : perf en baisse + sommeil cassé + motivation en berne suggère souvent un besoin de réduire la charge, pas de « pousser plus fort ».`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 0,
    xpReward: 30,
    tags: ["surmenage", "surentrainement"],
    sources: ["Meeusen et al. — Prevention and diagnosis of overtraining (2013)"],
    ...CP.charge,
    questions: quiz6(
      qcm(
        "Perf en baisse + sommeil cassé suggère souvent…",
        "Un besoin de réduire la charge",
        ["Un besoin d'ajouter plus de séries", "Un signe de très bonne forme", "Rien de particulier"],
        "Ces signaux combinés indiquent une fatigue mal gérée.",
      ),
      qcm(
        "Une motivation en chute pour des séances habituellement appréciées peut traduire…",
        "Une fatigue accumulée",
        ["Toujours un simple manque de discipline", "Une amélioration de la forme", "Un excès de sommeil"],
        "La motivation peut être un indicateur physiologique, pas seulement mental.",
      ),
      qcm(
        "Des douleurs diffuses sans blessure précise, associées à une baisse de perf, évoquent…",
        "Un tableau de fatigue accumulée",
        ["Un simple manque d'échauffement isolé", "Une carence en vitamines uniquement", "Rien à surveiller"],
        "C'est un des signaux à combiner avec les autres.",
      ),
      fillBlank(
        "Un sommeil dégradé qui coïncide avec une baisse de performance renforce l'hypothèse d'une ___ mal gérée.",
        "fatigue",
        ["hydratation", "posture", "alimentation"],
        "Le sommeil dégradé est un indice fort de fatigue accumulée.",
      ),
      tf(
        "La fatigue se règle uniquement en ajoutant plus de caféine.",
        false,
        "Faux : il faut gérer charge et récupération.",
      ),
      tf(
        "Une baisse de performance persistante malgré un entraînement régulier est un signal à surveiller.",
        true,
        "Vrai : c'est l'un des premiers signes de fatigue accumulée.",
      ),
    ),
  },
  {
    title: "Le déload, la pause stratégique",
    subtitle: "Baisser pour mieux remonter.",
    markdown: `Un **déload** consiste à réduire volontairement le volume et/ou l'intensité d'entraînement pendant une période courte (souvent 3 à 7 jours), pour laisser le corps récupérer plus en profondeur.

---

Contrairement à une idée reçue, un déload ne signifie **pas** un arrêt total : on continue souvent à s'entraîner, mais avec des charges ou des volumes nettement réduits.

---

Il est particulièrement utile après plusieurs semaines de charge progressive, quand la fatigue s'accumule plus vite que la récupération entre les séances.

---

Un déload bien placé permet souvent de revenir plus fort la semaine suivante, avec des sensations et une motivation renouvelées.

---

À retenir : le déload est un outil de gestion de la fatigue à moyen terme, pas un signe d'échec ou de faiblesse dans un programme.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 1,
    xpReward: 30,
    tags: ["deload"],
    sources: ["Helms et al. — Recovery strategies for resistance training (2018)"],
    ...CP.charge,
    questions: quiz6(
      qcm(
        "Un déload sert surtout à…",
        "Réduire la fatigue accumulée",
        ["Arrêter totalement l'entraînement", "Augmenter le volume habituel", "Remplacer le sommeil"],
        "C'est une réduction temporaire de charge, pas un arrêt.",
      ),
      qcm(
        "Un déload dure généralement…",
        "Environ 3 à 7 jours",
        ["Plusieurs mois", "Une seule séance", "Une année complète"],
        "C'est une période courte et ciblée.",
      ),
      qcm(
        "Un déload est particulièrement utile…",
        "Après plusieurs semaines de charge progressive accumulée",
        ["Uniquement en cas de blessure grave", "Dès la première semaine d'entraînement", "Jamais, il est inutile"],
        "Il intervient quand la fatigue dépasse la récupération entre séances.",
      ),
      fillBlank(
        "Un déload consiste à réduire le volume et/ou l'___ d'entraînement pendant une période courte.",
        "intensité",
        ["âge", "appétit", "humeur"],
        "Le déload réduit volume et/ou intensité, pas l'entraînement en entier.",
      ),
      tf(
        "Un déload signifie forcément 0 entraînement.",
        false,
        "Faux : on réduit, on n'efface pas toujours tout.",
      ),
      tf(
        "Un déload bien placé peut permettre de revenir plus fort la semaine suivante.",
        true,
        "Vrai : il restaure la capacité de récupération.",
      ),
    ),
  },
  {
    title: "Overreaching : jusqu'où pousser",
    subtitle: "Fonctionnel vs non-fonctionnel.",
    markdown: `L'**overreaching fonctionnel** est une fatigue volontaire et temporaire, provoquée par un bloc d'entraînement intense, suivie d'une phase de repos qui produit un rebond de performance.

---

C'est une stratégie utilisée intentionnellement dans certains plans d'entraînement structurés, avec une récupération planifiée en amont.

---

L'**overreaching non-fonctionnel** survient quand la fatigue dépasse ce qui était prévu et que le rebond de performance n'arrive pas, même après un repos normal.

---

Sans correction, l'overreaching non-fonctionnel peut évoluer vers un véritable **surentraînement**, avec une récupération qui se compte alors en semaines, voire en mois.

---

À retenir : pousser fort peut être une stratégie voulue, mais seulement si une phase de récupération planifiée suit — sans plan de repos, le risque bascule vite du côté négatif.`,
    durationSec: 95,
    difficulty: "ADVANCED",
    order: 2,
    xpReward: 35,
    tags: ["overreaching", "surentrainement"],
    sources: ["Kreher & Schwartz — Overtraining syndrome review (2012)"],
    ...CP.charge,
    questions: quiz6(
      qcm(
        "L'overreaching fonctionnel se caractérise par…",
        "Une fatigue volontaire suivie d'un rebond de performance",
        ["Une fatigue permanente sans récupération possible", "L'absence totale de fatigue", "Un phénomène uniquement négatif"],
        "C'est une stratégie planifiée avec repos en amont.",
      ),
      qcm(
        "L'overreaching non-fonctionnel se distingue par…",
        "L'absence de rebond de performance malgré le repos",
        ["Un rebond de performance immédiat", "Une planification volontaire réussie", "Une amélioration continue sans repos"],
        "Le repos normal ne suffit plus à restaurer la performance.",
      ),
      qcm(
        "Sans correction, l'overreaching non-fonctionnel peut évoluer vers…",
        "Un véritable surentraînement",
        ["Une amélioration automatique", "Un simple rhume", "Rien de particulier"],
        "La fatigue non gérée peut s'aggraver sur la durée.",
      ),
      fillBlank(
        "La récupération d'un surentraînement se compte parfois en semaines, voire en ___.",
        "mois",
        ["minutes", "heures", "secondes"],
        "Le surentraînement installé demande une récupération longue.",
      ),
      tf(
        "L'overreaching fonctionnel est toujours dangereux et à éviter absolument.",
        false,
        "Faux : c'est une stratégie voulue si suivie d'un repos planifié.",
      ),
      tf(
        "Sans phase de récupération planifiée, le risque bascule vers l'overreaching non-fonctionnel.",
        true,
        "Vrai : le repos planifié fait la différence entre les deux.",
      ),
    ),
  },
  {
    title: "Suivre sa fatigue dans le temps",
    subtitle: "Un journal simple vaut mieux qu'un chiffre isolé.",
    markdown: `La **fatigue aiguë** (après une séance) est normale et se dissipe généralement en un à deux jours avec une récupération adéquate.

---

La **fatigue chronique** s'installe quand la fatigue aiguë de chaque séance ne se dissipe plus complètement avant la suivante, et s'accumule semaine après semaine.

---

Un suivi fiable combine idéalement des indicateurs **subjectifs** (qualité du sommeil, motivation, douleurs diffuses) et, quand c'est possible, un indicateur plus **objectif** comme la variabilité de la fréquence cardiaque (VFC) — aucun des deux, seul, ne suffit à trancher.

---

Noter simplement quelques repères après chaque séance aide à repérer une tendance avant qu'elle ne devienne un problème, sans transformer l'entraînement en calcul permanent.

---

Un seul mauvais jour n'est généralement pas un signal d'alerte ; une **tendance négative sur plusieurs séances consécutives**, sur plusieurs indicateurs à la fois, l'est davantage.

---

À retenir : suivre quelques indicateurs simples — subjectifs et objectifs — dans la durée permet d'ajuster la charge avant d'atteindre un vrai surentraînement, plutôt que de réagir seulement après coup.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 3,
    xpReward: 35,
    tags: ["suivi", "fatigue-chronique"],
    sources: ["Halson — Monitoring training load to understand fatigue (2014)"],
    ...CP.charge,
    questions: quiz6(
      qcm(
        "La fatigue aiguë, après une séance normale, se dissipe généralement en…",
        "Un à deux jours",
        ["Plusieurs mois", "Quelques secondes", "Elle ne se dissipe jamais"],
        "C'est une fatigue normale et transitoire.",
      ),
      qcm(
        "La fatigue chronique s'installe quand…",
        "La fatigue de chaque séance ne se dissipe plus avant la suivante",
        ["On dort plus de 8 h par nuit", "On prend un jour de repos par semaine", "On mange suffisamment de protéines"],
        "C'est l'accumulation progressive qui pose problème.",
      ),
      qcm(
        "Un suivi de fatigue fiable combine généralement…",
        "Des indicateurs subjectifs et objectifs, sans se fier à un seul",
        ["Uniquement la VFC, qui suffit à elle seule", "Uniquement le ressenti, sans autre donnée", "Le poids de corps exclusivement"],
        "Ni le ressenti seul ni un chiffre seul ne suffisent à trancher.",
      ),
      fillBlank(
        "Un seul mauvais jour est moins signifiant qu'une ___ négative sur plusieurs séances.",
        "tendance",
        ["couleur", "musique", "météo"],
        "C'est la répétition dans le temps qui est informative.",
      ),
      tf(
        "Un seul mauvais jour d'entraînement suffit à conclure à un surentraînement.",
        false,
        "Faux : c'est la tendance sur plusieurs séances qui compte.",
      ),
      tf(
        "Suivre quelques indicateurs simples dans le temps aide à ajuster la charge avant un vrai surentraînement.",
        true,
        "Vrai : cela permet de repérer une tendance négative tôt.",
      ),
    ),
  },
];
