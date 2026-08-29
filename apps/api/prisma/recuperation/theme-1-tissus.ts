import type { RecuperationSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_1_LESSONS: RecuperationSeedLesson[] = [
  {
    title: "DOMS : ami ou ennemi ?",
    subtitle: "Courbatures ≠ bons gains.",
    markdown: `Les **DOMS** (courbatures retardées) apparaissent 24 à 72 h après l'effort, surtout lors de mouvements nouveaux ou en phase excentrique marquée.

---

Elles traduisent des **micro-dommages** dans les fibres musculaires et le tissu conjonctif, suivis d'une réponse inflammatoire locale.

---

Contrairement à une idée reçue, l'intensité des DOMS **ne mesure pas** la qualité d'une séance : on peut très bien progresser sans grosses courbatures.

---

À l'inverse, des DOMS très fortes et répétées peuvent signaler un volume ou une nouveauté trop marqués, avec un risque de récupération incomplète avant la séance suivante.

---

À retenir : les DOMS sont un signal normal, pas un objectif à rechercher pour « valider » une séance.`,
    durationSec: 80,
    difficulty: "BEGINNER",
    order: 0,
    xpReward: 25,
    tags: ["doms", "courbatures"],
    sources: ["Cheung et al. — Delayed onset muscle soreness (2003)"],
    ...CP.tissus,
    questions: quiz6(
      qcm(
        "Les DOMS indiquent surtout…",
        "Des micro-dommages musculaires, pas la qualité de la séance",
        ["Une séance ratée", "Un manque de protéines", "Un excès de sommeil"],
        "Les courbatures ne mesurent pas l'efficacité d'un entraînement.",
      ),
      qcm(
        "Les DOMS apparaissent typiquement…",
        "24 à 72 h après l'effort",
        ["Immédiatement pendant la série", "Une semaine après", "Uniquement le lendemain matin sans exception"],
        "Le délai caractéristique est de 1 à 3 jours.",
      ),
      qcm(
        "Les DOMS sont surtout liées à…",
        "Des mouvements nouveaux ou une phase excentrique marquée",
        ["La chaleur ambiante", "La quantité d'eau bue", "L'heure de la séance"],
        "Nouveauté et excentrique augmentent le micro-dommage.",
      ),
      fillBlank(
        "Les DOMS traduisent des micro-dommages suivis d'une réponse ___ locale.",
        "inflammatoire",
        ["digestive", "hormonale", "osseuse"],
        "Une inflammation locale accompagne la réparation des micro-dommages.",
      ),
      tf(
        "Pas de courbatures = séance inutile.",
        false,
        "Faux : on peut progresser sans DOMS marquées.",
      ),
      tf(
        "Des DOMS très fortes et répétées peuvent signaler un volume mal dosé.",
        true,
        "Vrai : cela peut nuire à la récupération avant la séance suivante.",
      ),
    ),
  },
  {
    title: "Inflammation : signal utile",
    subtitle: "Aiguë vs chronique.",
    markdown: `Après l'entraînement, une **inflammation aiguë** locale se met en place : c'est une étape normale et nécessaire du processus de réparation musculaire.

---

Cette inflammation attire des cellules immunitaires qui nettoient les tissus endommagés et déclenchent la reconstruction des fibres.

---

Le problème apparaît quand l'inflammation devient **chronique** : accumulée séance après séance sans récupération suffisante, elle finit par freiner les adaptations au lieu de les soutenir.

---

Certaines pratiques (anti-inflammatoires pris systématiquement, glace immédiate et prolongée) peuvent, à haute dose, **atténuer le signal** utile à l'adaptation musculaire.

---

À retenir : l'inflammation aiguë post-effort est un allié de la récupération ; c'est son accumulation chronique qui pose problème.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 1,
    xpReward: 30,
    tags: ["inflammation", "recuperation"],
    sources: ["Peake et al. — Muscle damage and inflammation (2017)"],
    ...CP.tissus,
    questions: quiz6(
      qcm(
        "L'inflammation aiguë après l'entraînement est…",
        "Une étape normale et utile à la réparation",
        ["Toujours un signe de blessure grave", "Sans lien avec la récupération", "Un phénomène uniquement négatif"],
        "Elle déclenche le nettoyage et la reconstruction tissulaire.",
      ),
      qcm(
        "Le problème survient surtout quand l'inflammation devient…",
        "Chronique, accumulée sans récupération suffisante",
        ["Absente totalement", "Présente une seule fois", "Liée uniquement au sommeil"],
        "L'accumulation chronique freine les adaptations.",
      ),
      qcm(
        "Un usage systématique et à haute dose d'anti-inflammatoires ou de glace peut…",
        "Atténuer un signal utile à l'adaptation",
        ["Toujours accélérer la progression musculaire", "N'avoir aucun effet", "Remplacer le sommeil"],
        "Bloquer le signal inflammatoire peut nuire à l'adaptation.",
      ),
      fillBlank(
        "L'inflammation aiguë attire des cellules qui ___ les tissus endommagés.",
        "nettoient",
        ["détruisent", "ignorent", "congèlent"],
        "Ce nettoyage précède la reconstruction musculaire.",
      ),
      tf(
        "L'inflammation post-effort est toujours nuisible à la récupération.",
        false,
        "Faux : l'inflammation aiguë est une étape normale et utile.",
      ),
      tf(
        "Une inflammation chronique, accumulée sans récupération, peut freiner la progression.",
        true,
        "Vrai : elle finit par nuire aux adaptations.",
      ),
    ),
  },
  {
    title: "Adaptation et surcompensation",
    subtitle: "Stress → repos → progrès.",
    markdown: `L'entraînement crée un **stress** qui fatigue temporairement le corps et abaisse légèrement sa capacité de performance juste après la séance.

---

Pendant la **récupération**, le corps répare les tissus sollicités et les renforce légèrement au-dessus du niveau initial : c'est la **surcompensation**.

---

Si la séance suivante arrive **trop tôt**, avant la fin de la réparation, la fatigue s'accumule sans que la surcompensation ait eu lieu.

---

Si elle arrive **trop tard**, l'effet de surcompensation peut s'estomper avant d'être exploité par un nouveau stimulus.

---

À retenir : la progression ne vient pas de l'entraînement seul, mais du cycle **stress → récupération → surcompensation**, correctement espacé.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 2,
    xpReward: 30,
    tags: ["surcompensation", "adaptation"],
    sources: ["Bompa & Buzzichelli — Periodization theory and methodology (2018)"],
    ...CP.tissus,
    questions: quiz6(
      qcm(
        "La surcompensation correspond à…",
        "Un léger renforcement au-dessus du niveau initial après récupération",
        ["Une fatigue permanente", "Une baisse définitive de performance", "Un phénomène uniquement mental"],
        "Le corps se répare puis progresse légèrement au-delà.",
      ),
      qcm(
        "Enchaîner les séances trop tôt, avant réparation, tend à…",
        "Accumuler la fatigue sans profiter de la surcompensation",
        ["Accélérer systématiquement les gains", "N'avoir aucun effet", "Améliorer le sommeil"],
        "La fenêtre de surcompensation n'est pas respectée.",
      ),
      qcm(
        "Le cycle qui explique la progression est…",
        "Stress → récupération → surcompensation",
        ["Stress → stress → stress", "Repos → repos → repos", "Nutrition seule → progrès"],
        "Ce cycle en trois temps structure l'adaptation.",
      ),
      fillBlank(
        "Si le repos est trop long, l'effet de ___ peut s'estomper.",
        "surcompensation",
        ["fatigue", "inflammation", "digestion"],
        "Un stimulus trop tardif rate la fenêtre favorable.",
      ),
      tf(
        "La progression vient uniquement de l'entraînement, sans lien avec le repos.",
        false,
        "Faux : le repos permet la surcompensation qui produit le progrès.",
      ),
      tf(
        "Enchaîner les séances trop rapprochées peut empêcher la surcompensation.",
        true,
        "Vrai : la fatigue s'accumule sans réparation complète.",
      ),
    ),
  },
  {
    title: "Blessures de surutilisation",
    subtitle: "Tendinopathies et accumulation.",
    markdown: `Contrairement à une blessure aiguë (entorse, déchirure), une **tendinopathie** apparaît progressivement, par accumulation de contraintes répétées sans récupération suffisante.

---

Les tendons se réparent **plus lentement** que le muscle : une progression de charge trop rapide peut dépasser leur capacité d'adaptation, même si le muscle, lui, suit.

---

Une douleur tendineuse qui **persiste** ou s'aggrave d'une séance à l'autre est un signal à ne pas ignorer, contrairement à une gêne musculaire passagère.

---

Réduire temporairement le volume ou l'intensité sur la zone touchée, plutôt que de s'arrêter totalement, permet souvent de maintenir une charge tolérable pendant la réparation.

---

À retenir : les blessures de surutilisation se construisent sur la durée — les prévenir passe par une progression de charge prudente, pas seulement par le repos ponctuel.`,
    durationSec: 95,
    difficulty: "ADVANCED",
    order: 3,
    xpReward: 35,
    tags: ["tendinopathie", "blessure", "surutilisation"],
    sources: ["Cook & Purdam — Tendinopathy continuum model (2009)"],
    ...CP.tissus,
    questions: quiz6(
      qcm(
        "Une tendinopathie apparaît typiquement…",
        "Par accumulation progressive de contraintes",
        ["D'un seul coup, comme une entorse", "Uniquement à cause du sommeil", "Sans lien avec la charge d'entraînement"],
        "C'est une blessure de surutilisation, pas un traumatisme brutal.",
      ),
      qcm(
        "Les tendons, comparés au muscle, se réparent…",
        "Plus lentement",
        ["Plus vite", "À la même vitesse", "Instantanément"],
        "Leur capacité d'adaptation est plus lente que celle du muscle.",
      ),
      qcm(
        "Une douleur tendineuse qui persiste et s'aggrave doit être…",
        "Prise au sérieux, pas ignorée",
        ["Toujours ignorée si on aime l'exercice", "Un signe positif de progression", "Sans importance"],
        "C'est un signal d'alerte différent d'une gêne passagère.",
      ),
      fillBlank(
        "Une progression de charge trop ___ peut dépasser la capacité d'adaptation du tendon.",
        "rapide",
        ["lente", "stable", "légère"],
        "Le tendon a besoin de temps pour suivre l'augmentation de charge.",
      ),
      tf(
        "Face à une douleur tendineuse persistante, arrêter totalement est la seule option valable.",
        false,
        "Faux : réduire la charge sur la zone est souvent plus adapté qu'un arrêt total.",
      ),
      tf(
        "Les blessures de surutilisation se construisent sur la durée, pas en une séance.",
        true,
        "Vrai : elles résultent d'une accumulation de contraintes.",
      ),
    ),
  },
];
