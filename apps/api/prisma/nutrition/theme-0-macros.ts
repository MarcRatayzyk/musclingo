import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_0_QUIZZES } from "./theme-0-macros-questions";

export const THEME_0_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Calories",
    subtitle: "L'énergie des aliments.",
    markdown: `Tu peux manger « beaucoup » sans forcément apporter beaucoup d'énergie. Tout dépend des calories.

---

Une **calorie** (kcal) mesure l'énergie que les aliments apportent. Ton corps l'utilise pour respirer, digérer, bouger, s'entraîner et récupérer.

---

Tous les aliments n'apportent pas la même énergie. **1 g de protéine = 4 kcal**, **1 g de glucide = 4 kcal**, **1 g de lipide = 9 kcal**. Les lipides sont donc plus denses pour un même poids.

---

En musculation, construire et réparer le muscle coûte de l'énergie. Sans assez de calories, la récupération après les séries devient plus difficile.

---

À retenir : la calorie mesure l'énergie des aliments. C'est la base pour relier assiette et effort à la salle.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 0,
    xpReward: 25,
    tags: ["calories", "energie"],
    sources: [
      "Hall et al. — Dynamic model predicting energy expenditure (2011)",
    ],
    ...CP.macros,
    questions: THEME_0_QUIZZES[0],
  },
  {
    title: "Protéines",
    subtitle: "Les briques du muscle.",
    markdown: `Manger des protéines ne fait pas automatiquement prendre du muscle. Elles fournissent surtout les matériaux.

---

Les **protéines** des aliments sont découpées en **acides aminés**. Ce sont les briques dont ton corps a besoin pour réparer et construire les tissus.

---

L'entraînement donne le signal. Les protéines fournissent une partie des matériaux. Sans apport suffisant, la réparation des fibres sollicitées reste limitée.

---

Le corps ne stocke pas les protéines comme réserve. L'excédent est utilisé comme énergie ou éliminé. Le **total de la journée** compte plus que l'heure exacte du repas.

---

À retenir : les protéines participent à la construction et à la réparation musculaire.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 1,
    xpReward: 25,
    tags: ["proteines", "acides-amines", "digestion"],
    sources: [
      "ISSN Position Stand — Protein and exercise (2017)",
      "Morton et al. — Meta-analysis protein intake and muscle mass (2018)",
    ],
    ...CP.macros,
    questions: THEME_0_QUIZZES[1],
  },
  {
    title: "Glucides",
    subtitle: "L'énergie de l'effort.",
    markdown: `Les glucides ne font pas grossir à eux seuls. Ils fournissent surtout du carburant pour l'effort.

---

Les **glucides** (pain, riz, fruits…) sont digérés en **glucose**. Ton corps l'utilise comme énergie, surtout quand l'intensité monte.

---

Le glucose en trop est stocké en **glycogène**, surtout dans les **muscles** et le **foie**. Pendant une série lourde, le muscle puise dans sa propre réserve.

---

Si ces réserves sont basses, tu fatigues plus vite et tu fais souvent moins de reps. C'est pour cela que les glucides ont une place utile autour de l'entraînement.

---

À retenir : les glucides alimentent l'effort. Sans eux, la performance à la salle baisse souvent.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 2,
    xpReward: 25,
    tags: ["glucides", "glycogene"],
    sources: [
      "Burke et al. — Carbohydrates for training and competition (2011)",
    ],
    ...CP.macros,
    questions: THEME_0_QUIZZES[2],
  },
  {
    title: "Lipides",
    subtitle: "Graisses et fonctions vitales.",
    markdown: `Les graisses n'ont pas bonne réputation. Pourtant, ton corps en a vraiment besoin.

---

Les **lipides** entrent dans la composition de toutes tes cellules. Ils aident aussi à fabriquer des **hormones**, dont certaines interviennent dans la récupération et le développement musculaire.

---

Certaines vitamines (**A, D, E, K**) ne s'absorbent bien qu'avec des graisses dans le repas. Sans lipides, tu peux manquer de ces vitamines même en mangeant « assez ».

---

Ils apportent **9 kcal par gramme**, plus que protéines et glucides. Ils ralentissent aussi la digestion, ce qui prolonge souvent la satiété.

---

À retenir : les lipides ne servent pas qu'à stocker du gras. Ils soutiennent cellules, hormones et vitamines.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 3,
    xpReward: 25,
    tags: ["lipides", "hormones"],
    sources: [
      "Helms et al. — Evidence-based recommendations for natural bodybuilding (2014)",
    ],
    ...CP.macros,
    questions: THEME_0_QUIZZES[3],
  },
];
