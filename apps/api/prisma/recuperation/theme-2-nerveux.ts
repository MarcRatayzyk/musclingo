import type { RecuperationSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_2_LESSONS: RecuperationSeedLesson[] = [
  {
    title: "Gestion du stress",
    subtitle: "Le système nerveux aussi fatigué.",
    markdown: `Le stress ne vient pas que de la salle : travail, sommeil perturbé, vie personnelle sollicitent le même système nerveux que l'entraînement.

---

Le corps ne fait pas vraiment de différence entre « stress d'un squat lourd » et « stress d'une deadline » : les deux consomment des ressources de récupération communes.

---

Un **stress chronique** de vie, même sans grosse séance, peut suffire à retarder la récupération et à augmenter la sensation de fatigue à l'entraînement.

---

À l'inverse, réduire son stress global (organisation, sommeil, relations) libère de la capacité de récupération pour l'entraînement lui-même.

---

À retenir : le stress de la vie quotidienne compte dans le bilan global de récupération, pas seulement le volume soulevé en salle.`,
    durationSec: 80,
    difficulty: "BEGINNER",
    order: 0,
    xpReward: 25,
    tags: ["stress", "systeme-nerveux"],
    sources: ["Kalmbach et al. — Impact of stress on sleep (2018)"],
    ...CP.nerveux,
    questions: quiz6(
      qcm(
        "Le stress chronique peut…",
        "Freiner la récupération",
        ["Toujours améliorer la performance", "N'avoir aucun effet sur le corps", "Remplacer le sommeil"],
        "Stress de vie et stress d'entraînement partagent des ressources.",
      ),
      qcm(
        "Le corps distingue-t-il stress physique et stress psychologique ?",
        "Peu : les deux consomment des ressources de récupération communes",
        ["Oui, totalement, sans interaction", "Non, le stress mental n'a aucun coût", "Oui, le stress mental récupère plus vite toujours"],
        "Les deux types de stress se cumulent sur le même système.",
      ),
      qcm(
        "Réduire son stress global (sommeil, organisation) a pour effet de…",
        "Libérer de la capacité de récupération pour l'entraînement",
        ["N'avoir aucun lien avec l'entraînement", "Réduire la force automatiquement", "Augmenter systématiquement les DOMS"],
        "Moins de stress de vie = plus de ressources pour récupérer.",
      ),
      fillBlank(
        "Le stress de la vie quotidienne sollicite le même ___ nerveux que l'entraînement.",
        "système",
        ["muscle", "tendon", "organe"],
        "Stress physique et stress de vie partagent le même système nerveux.",
      ),
      tf(
        "Seul le volume en salle fatigue un athlète.",
        false,
        "Faux : stress de vie compte aussi.",
      ),
      tf(
        "Un stress chronique de vie peut augmenter la sensation de fatigue à l'entraînement.",
        true,
        "Vrai : les ressources de récupération sont partagées.",
      ),
    ),
  },
  {
    title: "Fatigue du système nerveux central",
    subtitle: "Différente de la fatigue musculaire.",
    markdown: `La **fatigue du système nerveux central (SNC)** touche la capacité à recruter fortement les muscles, indépendamment de leur état de réparation propre.

---

Elle apparaît surtout après des séances **lourdes et intenses** (proches du maximum), plus que lors de séries longues à charge modérée.

---

Contrairement aux DOMS, la fatigue du SNC ne se voit pas forcément : on peut se sentir « bien » musculairement mais avoir une force explosive réduite.

---

Elle se récupère généralement en **1 à 3 jours**, mais peut s'accumuler sur plusieurs semaines de charges maximales répétées sans variation.

---

À retenir : varier l'intensité au fil des semaines aide à limiter l'accumulation de fatigue nerveuse, distincte de la fatigue purement musculaire.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 1,
    xpReward: 30,
    tags: ["snc", "fatigue-nerveuse"],
    sources: ["Enoka & Duchateau — Muscle fatigue mechanisms (2016)"],
    ...CP.nerveux,
    questions: quiz6(
      qcm(
        "La fatigue du système nerveux central affecte surtout…",
        "La capacité à recruter fortement les muscles",
        ["Uniquement la digestion", "Uniquement le sommeil", "La couleur de la peau"],
        "Elle réduit le recrutement neuromusculaire maximal.",
      ),
      qcm(
        "La fatigue du SNC apparaît surtout après…",
        "Des séances lourdes proches du maximum",
        ["Des étirements légers", "Une sieste", "Un repas copieux"],
        "L'intensité élevée sollicite fortement le système nerveux.",
      ),
      qcm(
        "Contrairement aux DOMS, la fatigue du SNC…",
        "Ne se voit pas forcément à l'œil ou à la sensation musculaire",
        ["Se voit toujours immédiatement", "Provoque toujours des courbatures fortes", "Disparaît en quelques secondes"],
        "On peut se sentir bien musculairement mais moins explosif.",
      ),
      fillBlank(
        "La fatigue du SNC se récupère généralement en 1 à ___ jours.",
        "3",
        ["10", "30", "60"],
        "Récupération rapide comparée à d'autres formes de fatigue.",
      ),
      tf(
        "La fatigue du SNC est identique à la fatigue musculaire locale.",
        false,
        "Faux : ce sont deux formes de fatigue distinctes.",
      ),
      tf(
        "Varier l'intensité au fil des semaines aide à limiter l'accumulation de fatigue nerveuse.",
        true,
        "Vrai : cela évite l'accumulation de charges maximales répétées.",
      ),
    ),
  },
  {
    title: "Respiration et relaxation",
    subtitle: "Activer le système parasympathique.",
    markdown: `Le système nerveux **autonome** a deux modes principaux : le mode « alerte » (sympathique) et le mode « repos-digestion » (parasympathique).

---

L'entraînement intense active fortement le mode sympathique. La récupération nécessite de **repasser** en mode parasympathique pour permettre la réparation.

---

Une **respiration lente et profonde** (expiration plus longue que l'inspiration) favorise activement le passage vers ce mode de repos.

---

Des pratiques simples — respiration guidée, relaxation, temps calme sans écran — peuvent accélérer ce basculement après une séance ou une journée stressante.

---

À retenir : la récupération n'est pas seulement passive, on peut activement aider le système nerveux à basculer vers un état propice au repos.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 2,
    xpReward: 30,
    tags: ["respiration", "relaxation", "parasympathique"],
    sources: ["Jerath et al. — Physiology of long slow breathing (2006)"],
    ...CP.nerveux,
    questions: quiz6(
      qcm(
        "Le système nerveux parasympathique correspond au mode…",
        "Repos et digestion",
        ["Alerte maximale", "Sprint uniquement", "Sommeil profond exclusivement"],
        "C'est le mode associé à la récupération.",
      ),
      qcm(
        "Une respiration favorisant la relaxation se caractérise par…",
        "Une expiration plus longue que l'inspiration",
        ["Une respiration très rapide et courte", "L'apnée prolongée", "Une respiration uniquement par la bouche"],
        "Allonger l'expiration active le mode parasympathique.",
      ),
      qcm(
        "L'entraînement intense active surtout le mode…",
        "Sympathique (alerte)",
        ["Parasympathique uniquement", "Aucun des deux", "Digestif uniquement"],
        "L'effort intense sollicite le mode d'alerte du corps.",
      ),
      fillBlank(
        "Après l'effort, la récupération nécessite de repasser en mode ___.",
        "parasympathique",
        ["sympathique", "digestif seul", "aléatoire"],
        "Ce basculement permet la réparation du corps.",
      ),
      tf(
        "La récupération est purement passive, sans action possible dessus.",
        false,
        "Faux : la respiration et la relaxation peuvent l'accélérer.",
      ),
      tf(
        "Des pratiques comme la respiration guidée peuvent aider à basculer vers un état de repos.",
        true,
        "Vrai : elles favorisent le mode parasympathique.",
      ),
    ),
  },
  {
    title: "Variabilité de la fréquence cardiaque",
    subtitle: "Un indicateur, pas une vérité absolue.",
    markdown: `La **variabilité de la fréquence cardiaque (VFC)** mesure les petites variations entre les battements du cœur : plus elle est élevée, plus le corps bascule facilement entre les modes sympathique et parasympathique.

---

Une VFC **basse** un matin donné peut refléter une fatigue accumulée (sommeil, stress, séance dure la veille), sans forcément indiquer un problème grave isolé.

---

C'est un indicateur utile sur la **tendance**, observée sur plusieurs jours ou semaines, bien plus que sur une seule mesure ponctuelle.

---

La VFC ne remplace pas le ressenti : sensations, motivation et performance restent des signaux tout aussi importants à croiser.

---

À retenir : la VFC est un outil d'aide à la décision parmi d'autres, pas un verdict à suivre aveuglément séance après séance.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 3,
    xpReward: 35,
    tags: ["vfc", "hrv", "monitoring"],
    sources: ["Plews et al. — Heart rate variability for athletes (2013)"],
    ...CP.nerveux,
    questions: quiz6(
      qcm(
        "La variabilité de la fréquence cardiaque (VFC) reflète…",
        "La capacité à basculer entre modes sympathique et parasympathique",
        ["Uniquement la vitesse du cœur", "Le poids de corps", "La quantité de sommeil en minutes exactes"],
        "Plus elle est élevée, plus l'équilibre nerveux est flexible.",
      ),
      qcm(
        "Une VFC basse un matin donné…",
        "Peut refléter une fatigue accumulée, sans être alarmante isolément",
        ["Signifie toujours une blessure grave", "N'a aucune signification possible", "Prouve un manque de protéines"],
        "Une mesure isolée doit être interprétée avec prudence.",
      ),
      qcm(
        "La VFC est surtout utile quand elle est observée…",
        "Sur une tendance, plusieurs jours ou semaines",
        ["Une seule fois dans la vie", "Uniquement pendant l'effort", "Jamais, elle est inutile"],
        "La tendance informe mieux qu'une mesure ponctuelle.",
      ),
      fillBlank(
        "La VFC ne remplace pas le ___, qui reste un signal important.",
        "ressenti",
        ["poids", "salaire", "climat"],
        "Sensations et performance complètent la mesure de VFC.",
      ),
      tf(
        "Une seule mesure de VFC basse suffit à conclure à un surentraînement.",
        false,
        "Faux : c'est la tendance sur la durée qui est informative.",
      ),
      tf(
        "La VFC est un outil d'aide à la décision parmi d'autres signaux.",
        true,
        "Vrai : elle se croise avec le ressenti et la performance.",
      ),
    ),
  },
];
