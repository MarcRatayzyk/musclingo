import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_4_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Digestion",
    subtitle: "De la bouche à l'intestin.",
    markdown: `La **digestion** transforme les aliments en nutriments que le corps peut utiliser. Elle commence dans la **bouche** (mastication, salive) et se poursuit dans l'**estomac** puis l'**intestin**.

---

Dans l'estomac, l'**acide** et les enzymes découpent les protéines en morceaux plus petits. Un repas mixte (protéines, glucides, lipides) y reste en moyenne **2 à 4 heures** avant de passer dans l'intestin.

---

Les **lipides** ralentissent la vidange de l'estomac. Un repas très gras retarde l'arrivée des nutriments dans le sang, ce qui peut prolonger la satiété mais aussi alourdir la digestion.

---

Les **enzymes** du pancréas et de la paroi intestinale finissent de découper protéines, glucides et lipides en unités absorbables : acides aminés, glucose, acides gras.

---

En musculation, comprendre la digestion aide à **espacer** les repas avant une séance (éviter la lourdeur) et à **répartir** les protéines sur la journée plutôt que tout ingérer d'un coup.

---

À retenir : la digestion est un processus **progressif** sur plusieurs heures. Ce n'est pas instantané : les nutriments arrivent dans le sang par vagues, pas en une seule fois.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 23,
    xpReward: 30,
    tags: ["digestion", "estomac", "enzymes"],
    sources: [
      "Gropper & Smith — Advanced Nutrition and Human Metabolism (2017)",
    ],
    ...CP.digestion,
    questions: quiz6(
      qcm(
        "La digestion commence dans…",
        "La bouche",
        ["L'estomac seulement", "Le foie", "Les muscles"],
        "Mastication et salive = première étape.",
      ),
      qcm(
        "Un repas mixte reste en moyenne dans l'estomac…",
        "2 à 4 heures",
        ["Quelques secondes", "12 heures", "Plusieurs jours"],
        "Vidange gastrique progressive selon la composition du repas.",
      ),
      qcm(
        "Les lipides dans un repas…",
        "Ralentissent la vidange de l'estomac",
        ["Accélèrent toujours la digestion", "Empêchent toute absorption", "Remplacent les protéines"],
        "Repas gras = digestion plus lente et satiété prolongée.",
      ),
      fillBlank(
        "Les protéines sont découpées en ___ absorbables.",
        "acides aminés",
        ["glucose", "vitamines", "fibres"],
        "Enzymes digestives = découpage en acides aminés.",
      ),
      tf(
        "Les nutriments d'un repas arrivent tous instantanément dans le sang.",
        false,
        "Faux : la digestion dure plusieurs heures, par vagues.",
      ),
      tf(
        "Comprendre la digestion aide à mieux planifier les repas autour de l'entraînement.",
        true,
        "Vrai : timing et légèreté du repas influencent le confort à la séance.",
      ),
    ),
  },
  {
    title: "Absorption intestinale",
    subtitle: "Quand les nutriments entrent dans le sang.",
    markdown: `L'**absorption** se fait surtout dans la **partie fine de l'intestin** (intestin grêle). C'est là que les nutriments découpés passent dans le sang et la lymphe pour être distribués au corps.

---

Les **acides aminés** et le **glucose** passent facilement dans le sang via la paroi intestinale. Ils sont ensuite transportés vers le foie, les muscles et les autres organes.

---

Les **lipides** sont emballés dans des structures spéciales (chylomicrons) et passent d'abord dans la **lymphe** avant d'atteindre le sang. C'est pourquoi leur absorption est un peu plus lente.

---

Certaines vitamines et minéraux ont besoin de **transporteurs** spécifiques. Un manque d'un minéral peut parfois bloquer l'absorption d'un autre (exemple : trop de fer sans cuivre suffisant).

---

La **surface** de l'intestin est énorme grâce aux villosités : des replis microscopiques qui multiplient la zone d'échange. Sans cette surface, l'absorption serait très limitée.

---

À retenir : l'intestin grêle est la porte d'entrée des nutriments dans le corps. Protéines, glucides et lipides empruntent des chemins légèrement différents, mais tous finissent disponibles pour les cellules.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 24,
    xpReward: 30,
    tags: ["absorption", "intestin", "nutriments"],
    sources: [
      "Gropper & Smith — Advanced Nutrition and Human Metabolism (2017)",
    ],
    ...CP.digestion,
    questions: quiz6(
      qcm(
        "L'absorption des nutriments se fait surtout dans…",
        "L'intestin grêle",
        ["La bouche", "L'estomac seul", "Les poumons"],
        "Paroi intestinale = zone principale d'absorption.",
      ),
      qcm(
        "Les lipides alimentaires passent d'abord surtout dans…",
        "La lymphe",
        ["L'air", "Les os directement", "La bile seule"],
        "Chylomicrons → lymphe → sang.",
      ),
      qcm(
        "Les villosités intestinales servent à…",
        "Augmenter la surface d'absorption",
        ["Produire des hormones", "Stocker le glycogène", "Filtrer l'air"],
        "Plus de surface = meilleure absorption.",
      ),
      fillBlank(
        "Le glucose et les acides aminés passent directement dans le ___.",
        "sang",
        ["muscle", "cerveau seul", "gras"],
        "Transport sanguin vers le foie et les tissus.",
      ),
      tf(
        "Tous les nutriments empruntent exactement le même chemin d'absorption.",
        false,
        "Faux : lipides, glucides et protéines ont des voies différentes.",
      ),
      tf(
        "Un déficit en certains minéraux peut perturber l'absorption d'autres nutriments.",
        true,
        "Vrai : les minéraux interagissent entre eux à l'absorption.",
      ),
    ),
  },
  {
    title: "Glucose et glycémie",
    subtitle: "Le sucre dans le sang.",
    markdown: `Le **glucose** est le principal sucre circulant dans le sang. On appelle **glycémie** sa concentration dans le sang, mesurée en mmol/L ou mg/dL.

---

Après un repas riche en glucides, la glycémie **monte**. Plus les glucides sont **rapides** (sucre blanc, jus), plus la montée est brusque. Les glucides **lents** (avoine, légumineuses) montent plus doucement.

---

Le corps vise une glycémie **stable**. Trop haut ou trop bas pose problème : fatigue, fringales, baisse de concentration ou de performance.

---

Pendant l'effort intense, le muscle consomme beaucoup de glucose. Si la glycémie chute trop, tu peux **fatiguer** plus vite, surtout en séance longue ou cardio.

---

Les **fibres** et les **lipides** dans un repas ralentissent l'entrée du glucose dans le sang. C'est pourquoi un repas équilibré donne une énergie plus **progressive**.

---

À retenir : la glycémie reflète l'énergie disponible à court terme dans le sang. Pour l'entraînement, une montée trop rapide suivie d'une chute peut nuire à la performance.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 25,
    xpReward: 30,
    tags: ["glucose", "glycemie", "glucides"],
    sources: [
      "Burke et al. — Carbohydrates for training and competition (2011)",
    ],
    ...CP.digestion,
    questions: quiz6(
      qcm(
        "La glycémie mesure…",
        "La concentration de glucose dans le sang",
        ["Le poids du muscle", "La quantité de protéines", "Le niveau de fer"],
        "Glycémie = sucre sanguin.",
      ),
      qcm(
        "Les glucides rapides (sucre blanc, jus)…",
        "Font monter la glycémie plus vite",
        ["Ne changent pas la glycémie", "La font toujours baisser", "Remplacent les protéines"],
        "Absorption rapide = pic glycémique plus marqué.",
      ),
      qcm(
        "Pendant un effort intense, le muscle consomme surtout…",
        "Du glucose",
        ["Uniquement du gras", "De l'eau seule", "Des vitamines"],
        "Glucose = carburant privilégié à haute intensité.",
      ),
      fillBlank(
        "Les fibres et lipides dans un repas ___ l'entrée du glucose dans le sang.",
        "ralentissent",
        ["accélèrent", "suppriment", "doublent"],
        "Repas mixte = montée glycémique plus douce.",
      ),
      tf(
        "Une glycémie très instable peut affecter l'énergie à l'entraînement.",
        true,
        "Vrai : pics et chutes = fatigue et fringales.",
      ),
      tf(
        "La glycémie n'a aucun lien avec la performance sportive.",
        false,
        "Faux : le glucose alimente l'effort musculaire intense.",
      ),
    ),
  },
  {
    title: "Insuline",
    subtitle: "L'hormone qui range l'énergie.",
    markdown: `L'**insuline** est une hormone produite par le **pancréas**. Elle est libérée quand la glycémie monte, surtout après un repas contenant des glucides.

---

Son rôle principal : faire **entrer le glucose** dans les cellules (muscle, foie, tissu adipeux) pour faire baisser la glycémie et **stocker** l'énergie.

---

Dans le **muscle**, l'insuline aide aussi les **acides aminés** à entrer. C'est un des mécanismes qui explique l'intérêt de protéines + glucides après l'entraînement.

---

Quand tu es **à jeun** longtemps, l'insuline est basse et le corps puise plutôt dans ses **réserves** (glycogène, puis gras).

---

Une **sensibilité** à l'insuline élevée signifie que peu d'insuline suffit pour faire entrer le glucose. L'**entraînement régulier** améliore cette sensibilité, ce qui est favorable pour la santé métabolique.

---

À retenir : l'insuline n'est pas « l'ennemi » du muscle. C'est un signal de rangement qui, au bon moment (après l'effort), aide à recharger le glycogène et à utiliser les protéines.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 26,
    xpReward: 30,
    tags: ["insuline", "pancreas", "glycemie"],
    sources: [
      "Aragon & Schoenfeld — Nutrient timing revisited (2013)",
    ],
    ...CP.digestion,
    questions: quiz6(
      qcm(
        "L'insuline est produite par…",
        "Le pancréas",
        ["Le foie", "Le muscle", "L'estomac"],
        "Îlots de Langerhans du pancréas = source d'insuline.",
      ),
      qcm(
        "L'insuline est libérée surtout quand…",
        "La glycémie monte",
        ["On dort", "On jeûne longtemps", "On transpire"],
        "Repas glucidique = montée glycémique = sécrétion d'insuline.",
      ),
      qcm(
        "Dans le muscle, l'insuline aide à faire entrer…",
        "Le glucose et les acides aminés",
        ["Uniquement le gras", "L'eau seule", "Les vitamines seules"],
        "Double rôle : énergie + matériaux pour la réparation.",
      ),
      fillBlank(
        "L'entraînement régulier améliore la ___ à l'insuline.",
        "sensibilité",
        ["couleur", "température", "taille"],
        "Meilleure sensibilité = moins d'insuline nécessaire.",
      ),
      tf(
        "L'insuline sert uniquement à stocker du gras, jamais à aider le muscle.",
        false,
        "Faux : elle aide aussi le glucose et les acides aminés à entrer dans le muscle.",
      ),
      tf(
        "Après l'entraînement, protéines et glucides profitent en partie à l'action de l'insuline.",
        true,
        "Vrai : le muscle est plus réceptif aux nutriments post-effort.",
      ),
    ),
  },
  {
    title: "Stockage énergie",
    subtitle: "Glycogène et graisse.",
    markdown: `Quand tu manges plus d'énergie que tu n'en dépenses, le corps **stocke** l'excédent. Deux réserves principales : le **glycogène** et le **gras**.

---

Le **glycogène** est du glucose stocké sous forme de chaîne. Le **muscle** en garde pour ses propres séries ; le **foie** en garde pour stabiliser la glycémie entre les repas.

---

Les réserves de glycogène sont **limitées** (environ 300 à 500 g au total selon la masse musculaire et l'entraînement). L'excédent chronique de glucides finit converti en **gras**.

---

Le **gras corporel** est une réserve d'énergie **vaste** : des milliers de kcal peuvent y être stockées. Le corps y puise surtout en effort **modéré** et prolongé, ou en déficit calorique.

---

En **surplus calorique**, une partie sert à reconstituer le glycogène et à construire du muscle (si tu t'entraînes), le reste peut partir en gras.

---

À retenir : glycogène = réserve rapide et limitée ; gras = réserve longue et abondante. En musculation, remplir le glycogène musculaire favorise la performance ; le gras sert surtout de réserve énergétique globale.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 27,
    xpReward: 30,
    tags: ["stockage", "glycogene", "gras"],
    sources: [
      "Helms et al. — Evidence-based recommendations for natural bodybuilding (2014)",
    ],
    ...CP.digestion,
    questions: quiz6(
      qcm(
        "Le glycogène est…",
        "Du glucose stocké sous forme de chaîne",
        ["De la protéine musculaire", "De l'eau pure", "Du fer"],
        "Glycogène = réserve de glucides.",
      ),
      qcm(
        "Les réserves de glycogène sont…",
        "Limitées",
        ["Illimitées", "Uniquement dans le gras", "Absentes chez l'humain"],
        "Capacité finie : l'excédent devient gras.",
      ),
      qcm(
        "Le gras corporel sert surtout de réserve…",
        "Longue durée et abondante",
        ["Instantanée de 5 secondes", "De protéines", "D'eau seule"],
        "Des milliers de kcal peuvent être stockées en gras.",
      ),
      fillBlank(
        "Le ___ stocke du glycogène pour stabiliser la glycémie entre les repas.",
        "foie",
        ["cerveau seul", "cœur seul", "poumon"],
        "Foie = tampon glycémique.",
      ),
      tf(
        "Tout excédent de glucides reste toujours sous forme de glycogène sans limite.",
        false,
        "Faux : au-delà de la capacité, conversion en gras.",
      ),
      tf(
        "Remplir le glycogène musculaire aide la performance à l'entraînement.",
        true,
        "Vrai : plus de glycogène = plus d'énergie pour les séries.",
      ),
    ),
  },
  {
    title: "Foie, muscles et gras",
    subtitle: "Qui fait quoi avec l'énergie.",
    markdown: `Le **foie** est le chef d'orchestre métabolique. Il reçoit les nutriments absorbés et décide en partie où envoyer l'énergie : stockage, utilisation immédiate ou libération.

---

Le **foie** stocke du glycogène et peut le **libérer** dans le sang quand tu es à jeun, pour maintenir une glycémie stable entre les repas.

---

Les **muscles** utilisent surtout leur **propre glycogène** pendant l'effort. Ils ne le partagent pas directement avec le reste du corps : une fois utilisé localement, il faut le recharger via le sang.

---

Le **tissu adipeux** stocke l'excédent énergétique sous forme de **triglycérides**. En déficit calorique, le corps mobilise progressivement ces réserves.

---

L'**alcool** est traité en **priorité** par le foie. Tant qu'il le traite, le stockage du gras alimentaire est souvent reporté : le foie ne fait pas tout en même temps avec la même efficacité.

---

À retenir : foie = régulation globale ; muscles = consommation locale du glycogène ; gras = réserve longue durée. Comprendre ces rôles aide à lire ton énergie au quotidien et à l'entraînement.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 28,
    xpReward: 30,
    tags: ["foie", "muscle", "metabolisme"],
    sources: [
      "Gropper & Smith — Advanced Nutrition and Human Metabolism (2017)",
    ],
    ...CP.digestion,
    questions: quiz6(
      qcm(
        "Le foie stocke du glycogène surtout pour…",
        "Stabiliser la glycémie entre les repas",
        ["Contrôler la respiration", "Produire des muscles", "Digérer les fibres"],
        "Libération de glucose quand tu es à jeun.",
      ),
      qcm(
        "Pendant l'effort, le muscle utilise surtout…",
        "Son propre glycogène",
        ["Le glycogène du foie directement", "Les protéines du repas en cours", "L'alcool"],
        "Réserve locale = carburant des séries.",
      ),
      qcm(
        "L'alcool est traité par le foie…",
        "En priorité",
        ["Après tout le gras seulement", "Jamais", "Par les muscles"],
        "Le foie privilégie l'alcool, ce qui retarde d'autres traitements.",
      ),
      fillBlank(
        "Le tissu adipeux stocke l'excédent sous forme de ___.",
        "triglycérides",
        ["glucose libre", "acides aminés", "fibres"],
        "Graisse = forme de stockage énergétique.",
      ),
      tf(
        "Le muscle peut donner son glycogène directement à un autre organe pendant l'effort.",
        false,
        "Faux : le glycogène musculaire est utilisé localement.",
      ),
      tf(
        "En déficit calorique, le corps peut puiser dans les réserves de gras.",
        true,
        "Vrai : mobilisation progressive des triglycérides.",
      ),
    ),
  },
];
