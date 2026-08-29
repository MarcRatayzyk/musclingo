import type { RecuperationSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_0_LESSONS: RecuperationSeedLesson[] = [
  {
    title: "Sommeil : le vrai stéroïde naturel",
    subtitle: "7–9 h, régularité.",
    markdown: `Le **sommeil** est le moment où le corps répare le plus efficacement les tissus sollicités à l'entraînement. Aucun complément ne remplace une nuit correcte.

---

La plupart des adultes actifs ont besoin de **7 à 9 heures** de sommeil par nuit. En dessous, la récupération musculaire et nerveuse est mesurablement réduite.

---

La **régularité** compte autant que la durée : se coucher et se lever à des heures proches chaque jour stabilise l'horloge interne et améliore la qualité du sommeil.

---

Un déficit chronique de sommeil augmente le risque de blessure, réduit la force et la motivation à s'entraîner, même si les séances restent identiques sur le papier.

---

À retenir : le sommeil n'est pas un luxe optionnel, c'est un pilier de récupération au même titre que la nutrition et l'entraînement.`,
    durationSec: 80,
    difficulty: "BEGINNER",
    order: 0,
    xpReward: 25,
    tags: ["sommeil", "duree"],
    sources: [
      "Watson et al. — Recommended sleep amount for adults (2015)",
    ],
    ...CP.sommeil,
    questions: quiz6(
      qcm(
        "Pour la récupération musculaire, le sommeil est…",
        "Un pilier majeur, difficile à remplacer",
        [
          "Un simple bonus sans effet mesurable",
          "Utile seulement pour le cerveau",
          "Moins important que les compléments",
        ],
        "Le sommeil est un moteur central de la récupération.",
      ),
      qcm(
        "La durée de sommeil recommandée pour un adulte actif est…",
        "7 à 9 heures",
        ["4 à 5 heures", "10 à 12 heures", "Peu importe, seule la sieste compte"],
        "En dessous de 7 h, la récupération se dégrade.",
      ),
      qcm(
        "Se coucher à des horaires réguliers…",
        "Stabilise l'horloge interne et la qualité du sommeil",
        [
          "N'a aucun effet si la durée totale est identique",
          "Dérègle le corps",
          "Ne concerne que les enfants",
        ],
        "La régularité renforce l'efficacité du sommeil.",
      ),
      fillBlank(
        "Un déficit chronique de sommeil réduit la ___ et la motivation à s'entraîner.",
        "force",
        ["taille", "vue", "voix"],
        "Moins dormir réduit mesurablement force et motivation à l'entraînement.",
      ),
      tf(
        "Dormir 4 h suffit si les séances sont dures.",
        false,
        "Faux : le déficit de sommeil freine récup et perf.",
      ),
      tf(
        "Un manque chronique de sommeil augmente le risque de blessure.",
        true,
        "Vrai : la vigilance et la qualité tissulaire baissent.",
      ),
    ),
  },
  {
    title: "Hygiène de sommeil et sieste",
    subtitle: "Écran, lumière, caféine.",
    markdown: `La **lumière bleue** des écrans le soir retarde la sécrétion de mélatonine, l'hormone qui déclenche l'endormissement. Réduire les écrans avant le coucher aide à s'endormir plus vite.

---

La **caféine** a une demi-vie longue (plusieurs heures) : un café pris en fin d'après-midi peut encore perturber le sommeil la nuit suivante chez certaines personnes.

---

Une **sieste courte** (15–20 minutes) en début d'après-midi peut compenser partiellement une nuit courte, sans perturber le sommeil nocturne suivant.

---

Une chambre **fraîche, sombre et calme** favorise un endormissement plus rapide et un sommeil plus stable sur toute la nuit.

---

À retenir : la quantité de sommeil compte, mais l'environnement et les habitudes du soir influencent directement sa qualité.`,
    durationSec: 85,
    difficulty: "BEGINNER",
    order: 1,
    xpReward: 25,
    tags: ["sommeil", "hygiene", "sieste"],
    sources: ["Chang et al. — Evening use of light-emitting eReaders (2015)"],
    ...CP.sommeil,
    questions: quiz6(
      qcm(
        "La lumière bleue des écrans le soir…",
        "Retarde la sécrétion de mélatonine",
        ["Améliore l'endormissement", "N'a aucun effet", "Augmente la GH"],
        "Elle perturbe le signal hormonal du sommeil.",
      ),
      qcm(
        "Une sieste efficace pour compenser une nuit courte dure environ…",
        "15 à 20 minutes",
        ["3 heures", "1 minute", "Toute l'après-midi"],
        "Une sieste courte évite d'entrer en sommeil profond.",
      ),
      qcm(
        "La caféine prise en fin d'après-midi peut…",
        "Perturber le sommeil de la nuit suivante",
        ["N'avoir aucun effet le soir", "Améliorer l'endormissement", "Remplacer une nuit de sommeil"],
        "Sa demi-vie longue prolonge son effet stimulant.",
      ),
      fillBlank(
        "Une chambre fraîche, sombre et ___ favorise l'endormissement.",
        "calme",
        ["bruyante", "chauffée", "éclairée"],
        "Un environnement propice améliore la qualité du sommeil.",
      ),
      tf(
        "Une sieste de 20 minutes perturbe systématiquement le sommeil nocturne.",
        false,
        "Faux : une sieste courte est généralement sans conséquence notable.",
      ),
      tf(
        "Réduire les écrans avant le coucher peut aider à s'endormir plus vite.",
        true,
        "Vrai : moins de lumière bleue favorise la mélatonine.",
      ),
    ),
  },
  {
    title: "Cycles de sommeil",
    subtitle: "Léger, profond, paradoxal.",
    markdown: `Une nuit se compose de plusieurs **cycles** d'environ 90 minutes, alternant sommeil léger, sommeil profond et sommeil paradoxal (rêves).

---

Le **sommeil profond**, concentré en début de nuit, est la phase la plus réparatrice pour le corps : c'est là que la sécrétion de GH est maximale.

---

Le **sommeil paradoxal**, plus présent en fin de nuit, joue surtout un rôle dans la récupération cognitive et la consolidation de la mémoire, y compris motrice.

---

Se réveiller **au milieu d'un cycle** (alarme mal placée) donne souvent une sensation de fatigue, même après une durée totale suffisante.

---

À retenir : la qualité du sommeil dépend aussi de sa **structure** en cycles, pas seulement du nombre d'heures passées au lit.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 2,
    xpReward: 30,
    tags: ["sommeil", "cycles"],
    sources: ["Carskadon & Dement — Normal human sleep (2011)"],
    ...CP.sommeil,
    questions: quiz6(
      qcm(
        "Un cycle de sommeil dure environ…",
        "90 minutes",
        ["10 minutes", "4 heures", "24 heures"],
        "Une nuit s'organise en cycles d'environ 90 min.",
      ),
      qcm(
        "Le sommeil profond, très réparateur, est surtout concentré…",
        "En début de nuit",
        ["En fin de nuit uniquement", "À midi", "Uniquement pendant la sieste"],
        "Le sommeil profond domine les premiers cycles.",
      ),
      qcm(
        "Le sommeil paradoxal contribue surtout à…",
        "La récupération cognitive et la mémoire",
        ["La réparation osseuse uniquement", "La digestion", "La production de sueur"],
        "Sommeil paradoxal = rôle cognitif et mnésique important.",
      ),
      fillBlank(
        "Se réveiller au milieu d'un ___ donne une sensation de fatigue.",
        "cycle",
        ["repas", "échauffement", "étirement"],
        "Interrompre un cycle nuit à la sensation de repos.",
      ),
      tf(
        "Le nombre total d'heures dormies est le seul facteur qui compte.",
        false,
        "Faux : la structure en cycles compte aussi.",
      ),
      tf(
        "Le sommeil profond est la phase la plus liée à la sécrétion de GH.",
        true,
        "Vrai : GH culmine pendant le sommeil profond.",
      ),
    ),
  },
  {
    title: "Hormones de la nuit",
    subtitle: "GH, testostérone et cortisol.",
    markdown: `Pendant le sommeil profond, le corps libère un pic d'**hormone de croissance (GH)**, essentielle à la réparation des tissus musculaires et osseux.

---

La **testostérone** suit aussi un rythme lié au sommeil : elle remonte pendant la nuit et culmine le matin. Moins dormir réduit sa production sur la durée.

---

À l'inverse, le manque de sommeil élève le **cortisol**, une hormone de stress qui, en excès chronique, freine la récupération et favorise le stockage de graisse abdominale.

---

Ces hormones agissent en **équilibre** : un bon sommeil favorise les hormones « constructrices » (GH, testostérone) au détriment du cortisol.

---

À retenir : sauter des heures de sommeil n'est pas neutre hormonalement — cela déplace la balance vers un état moins favorable à la récupération.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 3,
    xpReward: 30,
    tags: ["sommeil", "hormones", "cortisol"],
    sources: [
      "Leproult & Van Cauter — Effect of sleep debt on hormones (2011)",
    ],
    ...CP.sommeil,
    questions: quiz6(
      qcm(
        "Le pic d'hormone de croissance (GH) survient surtout…",
        "Pendant le sommeil profond",
        ["Juste après un repas sucré", "Pendant l'échauffement", "Au réveil uniquement"],
        "Le sommeil profond est le principal déclencheur de GH.",
      ),
      qcm(
        "Un manque chronique de sommeil tend à…",
        "Augmenter le cortisol",
        ["Supprimer totalement le cortisol", "N'avoir aucun effet hormonal", "Augmenter uniquement la GH"],
        "Le stress du manque de sommeil élève le cortisol.",
      ),
      qcm(
        "La testostérone suit un rythme qui…",
        "Remonte la nuit et culmine le matin",
        ["Reste identique jour et nuit", "Chute uniquement le matin", "Dépend seulement de l'alimentation"],
        "Le sommeil structure la sécrétion de testostérone.",
      ),
      fillBlank(
        "Un cortisol chroniquement élevé ___ la récupération.",
        "freine",
        ["accélère", "n'affecte pas", "double"],
        "Le cortisol en excès s'oppose aux hormones de réparation.",
      ),
      tf(
        "Bien dormir favorise l'équilibre entre hormones constructrices et cortisol.",
        true,
        "Vrai : le sommeil pousse la balance vers GH/testostérone.",
      ),
      tf(
        "Le manque de sommeil n'a aucun impact hormonal mesurable.",
        false,
        "Faux : GH, testostérone et cortisol sont tous affectés.",
      ),
    ),
  },
];
