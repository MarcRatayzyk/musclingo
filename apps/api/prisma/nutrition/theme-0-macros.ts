import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_0_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Calories",
    subtitle: "L'énergie des aliments.",
    markdown: `Une **calorie** (kcal) mesure l'énergie que les aliments apportent au corps. Cette énergie sert à respirer, digérer, bouger, s'entraîner et récupérer.

---

Chaque aliment apporte une certaine quantité d'énergie. Une pomme, une tranche de pain ou un steak ne « pèsent » pas la même chose en calories, même si la portion semble similaire.

---

Le corps **dépense** de l'énergie en permanence : au repos (respiration, circulation), à la digestion, à la marche et à l'entraînement. Manger, c'est **apporter** de l'énergie pour alimenter ces fonctions.

---

En musculation, l'énergie alimentaire compte : construire et réparer le muscle demande des calories. Sans assez d'énergie, le corps peine à récupérer après les séries.

---

Les aliments n'apportent pas tous la même énergie : **1 g de protéine = 4 kcal**, **1 g de glucide = 4 kcal**, **1 g de lipide = 9 kcal**. Les lipides sont donc les plus « denses » en calories pour un même poids.

---

À retenir : la calorie (kcal) est l'unité qui mesure l'énergie des aliments. Comprendre cette base aide à lire les étiquettes et à relier nutrition et effort à la salle.`,
    durationSec: 85,
    difficulty: "BEGINNER",
    order: 0,
    xpReward: 25,
    tags: ["calories", "energie"],
    sources: [
      "Hall et al. — Dynamic model predicting energy expenditure (2011)",
    ],
    ...CP.macros,
    questions: quiz6(
      qcm(
        "Une calorie (kcal) mesure…",
        "L'énergie apportée par les aliments",
        ["Le poids du muscle", "La quantité d'eau bue", "La vitesse de course"],
        "La kcal = unité d'énergie alimentaire.",
      ),
      qcm(
        "1 g de lipide apporte environ…",
        "9 kcal",
        ["4 kcal", "1 kcal", "0 kcal"],
        "Les lipides sont plus caloriques que protéines et glucides.",
      ),
      qcm(
        "Le corps dépense de l'énergie pour…",
        "Respirer, digérer, bouger et s'entraîner",
        ["Uniquement courir", "Uniquement dormir", "Rien du tout au repos"],
        "La dépense énergétique est permanente, même au repos.",
      ),
      fillBlank(
        "1 g de protéine ou de glucide apporte ___ kcal.",
        "4",
        ["9", "7", "1"],
        "Protéines et glucides = 4 kcal/g.",
      ),
      tf(
        "Construire et réparer le muscle demande de l'énergie au corps.",
        true,
        "Vrai : la réparation musculaire coûte des calories.",
      ),
      tf(
        "Les calories des boissons (jus, alcool) ne comptent pas.",
        false,
        "Faux : toutes les calories comptent dans l'apport énergétique.",
      ),
    ),
  },
  {
    title: "Protéines",
    subtitle: "Les briques du muscle.",
    markdown: `Les **protéines** des aliments (viande, poisson, œufs, légumineuses…) sont découpées par la digestion en petites unités : les **acides aminés**. Ce sont les briques dont le corps a besoin pour réparer et construire le muscle.

---

La digestion d'un repas protéiné prend du temps : compte **plusieurs heures** entre le moment où tu manges et le moment où les acides aminés arrivent dans le sang. Ce n'est pas instantané.

---

Point important : le muscle **ne stocke pas** les protéines comme réserve. Contrairement au glycogène (glucides) ou au gras, il n'y a pas de « réserve de protéines » dans le corps. L'excédent est utilisé comme énergie ou éliminé.

---

Après l'entraînement, le corps a besoin d'acides aminés pour **réparer** les fibres musculaires sollicitées. Sans protéines suffisantes, cette réparation est limitée, et la progression musculaire aussi.

---

Le corps ne peut utiliser qu'une **quantité limitée de protéines par repas** pour construire du muscle. Au-delà, l'effet n'augmente plus. C'est pourquoi l'apport se répartit naturellement sur la journée.

---

En musculation, les besoins sont plus élevés qu'au quotidien (autour de **1,6 à 2,2 g par kg** de poids de corps), parce que l'entraînement abîme et reconstruit en permanence les fibres musculaires.

---

À retenir : les protéines = briques du muscle, digérées sur des heures, sans réserve. Le total de la journée compte plus que l'heure exacte du repas.`,
    durationSec: 95,
    difficulty: "BEGINNER",
    order: 1,
    xpReward: 25,
    tags: ["proteines", "acides-amines", "digestion"],
    sources: [
      "ISSN Position Stand — Protein and exercise (2017)",
      "Morton et al. — Meta-analysis protein intake and muscle mass (2018)",
    ],
    ...CP.macros,
    questions: quiz6(
      qcm(
        "Les protéines alimentaires sont transformées en…",
        "Acides aminés",
        ["Glucose", "Graisse", "Eau"],
        "La digestion découpe les protéines en acides aminés.",
      ),
      qcm(
        "La digestion d'un repas protéiné dure…",
        "Plusieurs heures",
        ["Quelques secondes", "Exactement 1 minute", "Plusieurs jours"],
        "Les acides aminés arrivent progressivement dans le sang.",
      ),
      qcm(
        "Les protéines servent surtout à…",
        "Réparer et construire le muscle",
        ["Stocker de l'énergie longtemps", "Remplacer l'eau", "Produire du glycogène"],
        "Acides aminés = matériau de réparation musculaire.",
      ),
      fillBlank(
        "Contrairement au gras ou aux glucides, le corps n'a pas de ___ de protéines.",
        "réserve",
        ["besoin", "source", "limite"],
        "Pas de stock protéique : l'excédent est utilisé ou éliminé.",
      ),
      tf(
        "Le muscle peut stocker les protéines en réserve pour plus tard.",
        false,
        "Faux : il n'existe pas de réserve protéique dans le corps.",
      ),
      tf(
        "L'entraînement augmente les besoins en protéines.",
        true,
        "Vrai : les fibres abîmées doivent être réparées.",
      ),
    ),
  },
  {
    title: "Glucides",
    subtitle: "L'énergie de l'effort.",
    markdown: `Les **glucides** (pain, riz, pâtes, fruits, légumes…) sont digérés en **glucose**, une forme de sucre que le corps utilise comme carburant. C'est la source d'énergie préférée pour l'effort intense.

---

Le glucose en trop est stocké sous forme de **glycogène**, surtout dans les **muscles** et le **foie**. C'est la réserve d'énergie rapide utilisée pendant les séries à la salle.

---

Quand tu fais une série lourde, le muscle puise dans **son propre glycogène**. Si les réserves sont basses, tu fatigues plus vite et tu fais moins de reps.

---

Les glucides ne « font pas grossir » à eux seuls : c'est un **excès de calories** au total qui entraîne la prise de gras. Les glucides remplissent surtout un rôle **énergétique** en musculation.

---

Certains glucides montent la glycémie vite (sucre blanc, jus), d'autres plus lentement (avoine, patate). Les glucides lents donnent une énergie plus **stable** sur plusieurs heures.

---

Le corps ne peut stocker qu'une **quantité limitée** de glycogène. L'excédent chronique est converti en graisse.

---

À retenir : les glucides = carburant de l'effort, stockés en glycogène dans le muscle. Sans eux, la performance à l'entraînement baisse.`,
    durationSec: 90,
    difficulty: "BEGINNER",
    order: 2,
    xpReward: 25,
    tags: ["glucides", "glycogene"],
    sources: [
      "Burke et al. — Carbohydrates for training and competition (2011)",
    ],
    ...CP.macros,
    questions: quiz6(
      qcm(
        "Le glycogène est une réserve de…",
        "Glucose (glucides)",
        ["Protéines", "Graisse", "Eau"],
        "Glycogène = glucose stocké dans muscle et foie.",
      ),
      qcm(
        "Pendant une série lourde, le muscle utilise surtout…",
        "Son propre glycogène",
        ["Les protéines du repas en cours", "Le gras du ventre", "L'eau"],
        "Chaque muscle puise dans sa réserve locale.",
      ),
      qcm(
        "Les glucides servent surtout à…",
        "Fournir de l'énergie à l'effort",
        ["Construire directement le muscle", "Remplacer les protéines", "Produire des hormones"],
        "Carburant privilégié pour l'intensité à la salle.",
      ),
      fillBlank(
        "Le glycogène se stocke surtout dans le ___ et le foie.",
        "muscle",
        ["cerveau seul", "cheveu", "os"],
        "Réserve d'énergie rapide pour l'effort.",
      ),
      tf(
        "Les glucides font grossir automatiquement, quelle que soit la quantité totale de calories.",
        false,
        "Faux : c'est l'excès calorique global qui compte.",
      ),
      tf(
        "Sans glucides suffisants, la performance à l'entraînement baisse.",
        true,
        "Vrai : moins de glycogène = moins d'énergie pour les séries.",
      ),
    ),
  },
  {
    title: "Lipides",
    subtitle: "Graisses et fonctions vitales.",
    markdown: `Les **lipides** (graisses alimentaires) ont mauvaise réputation, mais le corps en a **besoin** pour fonctionner. Ce n'est pas juste du stockage de gras.

---

Les lipides entrent dans la composition de **toutes les cellules** du corps, y compris les fibres musculaires. Ils forment la « enveloppe » qui protège chaque cellule.

---

Le corps utilise aussi les lipides pour fabriquer des **hormones**, dont la **testostérone**, importante pour la récupération et le développement musculaire chez l'homme.

---

Certaines vitamines (**A, D, E, K**) ne peuvent être absorbées **qu'avec des graisses** dans l'alimentation. Sans lipides, tu peux manquer de vitamines même en mangeant suffisamment.

---

Les lipides apportent **9 kcal par gramme**, plus que les protéines et glucides (4 kcal/g). Ils ralentissent aussi la digestion, ce qui prolonge la sensation de satiété.

---

Les **oméga-3** (poissons gras, noix) aident à gérer l'inflammation après l'entraînement. Les graisses saturées et insaturées ont des rôles différents : la diversité des sources compte.

---

À retenir : les lipides ne servent pas qu'à stocker du gras. Ils sont essentiels pour les **hormones, les cellules et les vitamines**.`,
    durationSec: 85,
    difficulty: "BEGINNER",
    order: 3,
    xpReward: 25,
    tags: ["lipides", "hormones"],
    sources: [
      "Helms et al. — Evidence-based recommendations for natural bodybuilding (2014)",
    ],
    ...CP.macros,
    questions: quiz6(
      qcm(
        "Les lipides servent notamment à…",
        "Fabriquer des hormones et protéger les cellules",
        ["Remplacer les protéines", "Stocker du glycogène", "Produire de l'eau"],
        "Graisses = structure cellulaire + hormones.",
      ),
      qcm(
        "Les vitamines A, D, E et K…",
        "Ont besoin de graisses alimentaires pour être absorbées",
        ["Se trouvent uniquement dans l'eau", "Remplacent les glucides", "Ne servent à rien"],
        "Vitamines liposolubles = absorption avec des lipides.",
      ),
      qcm(
        "1 g de lipide apporte…",
        "9 kcal",
        ["4 kcal", "1 kcal", "0 kcal"],
        "Les lipides sont les plus denses en calories.",
      ),
      fillBlank(
        "Le corps utilise les lipides pour fabriquer des ___, dont la testostérone.",
        "hormones",
        ["muscles", "os", "cheveux"],
        "Cholestérol alimentaire = base des hormones stéroïdiennes.",
      ),
      tf(
        "Supprimer toutes les graisses de l'alimentation est sans conséquence.",
        false,
        "Faux : hormones, cellules et vitamines en dépendent.",
      ),
      tf(
        "Les lipides ne servent qu'à stocker du gras corporel.",
        false,
        "Faux : ils remplissent des fonctions vitales bien avant le stockage.",
      ),
    ),
  },
];
