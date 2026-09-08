import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_1_QUIZZES } from "./theme-1-micros-questions";

export const THEME_1_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Vitamines",
    subtitle: "Petites molécules, grands rôles.",
    markdown: `Tu peux manger assez de calories et manquer quand même de vitamines. Le volume ne remplace pas la variété.

---

Les **vitamines** sont des micronutriments indispensables en petites quantités. Ton corps ne peut pas (ou pas assez) les fabriquer : elles viennent surtout de l'alimentation.

---

Deux familles : **hydrosolubles** (B, C), plus facilement éliminées, et **liposolubles** (A, D, E, K), absorbées avec des graisses et stockées plus longtemps.

---

Exemple concret : la **vitamine D** aide à fixer le calcium sur les os. Les vitamines **B** participent à transformer les aliments en énergie. Une carence peut freiner récupération ou solidité osseuse sous charge.

---

À retenir : les vitamines soutiennent énergie, réparation et os. Manger varié reste la base.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 4,
    xpReward: 25,
    tags: ["vitamines", "micronutriments"],
    sources: [
      "Institute of Medicine — Dietary Reference Intakes for vitamins (2000)",
    ],
    ...CP.micronutriments,
    questions: THEME_1_QUIZZES[0],
  },
  {
    title: "Minéraux",
    subtitle: "Calcium, magnésium, sodium et plus.",
    markdown: `Sans minéraux, le muscle a du mal à se contracter correctement. Ce ne sont pas des détails.

---

Les **minéraux** (calcium, magnésium, sodium, potassium…) aident à solidifier les os, contracter les muscles et équilibrer les fluides.

---

Le **calcium** structure les os et intervient dans la contraction. Le **magnésium** participe à la production d'énergie et à la relaxation musculaire. Une carence peut se traduire par crampes ou fatigue.

---

En séance, tu perds de l'eau et du **sodium** en transpirant. **Sodium** et **potassium** régulent aussi l'équilibre hydrique et la transmission nerveuse.

---

À retenir : les minéraux soutiennent os, muscles et nerfs. Un manque peut limiter performance et récupération.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 5,
    xpReward: 25,
    tags: ["mineraux", "calcium", "magnesium"],
    ...CP.micronutriments,
    questions: THEME_1_QUIZZES[1],
  },
  {
    title: "Oligo-éléments",
    subtitle: "Fer, zinc, sélénium en traces.",
    markdown: `Parfois, un manque « invisible » freine tes séances. Les oligo-éléments agissent en très petites quantités.

---

Les **oligo-éléments** (fer, zinc, sélénium, iode…) sont des minéraux nécessaires **en traces**. « Oligo » veut dire « très peu », mais essentiels.

---

Le **fer** transporte l'oxygène dans le sang. Sans fer suffisant, tu fatigues plus vite, même si tes muscles sont forts. Le **zinc** aide à la réparation des tissus et à l'immunité.

---

Avec une alimentation variée, les carences restent rares. Mais les régimes très restrictifs peuvent en créer. L'excès de suppléments peut aussi être dangereux.

---

À retenir : en traces, les oligo-éléments soutiennent oxygénation, réparation et métabolisme. Varier l'assiette suffit le plus souvent.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 6,
    xpReward: 25,
    tags: ["oligo-elements", "fer", "zinc"],
    ...CP.micronutriments,
    questions: THEME_1_QUIZZES[2],
  },
  {
    title: "Eau",
    subtitle: "Le micronutriment oublié.",
    markdown: `Tu peux parfaitement manger et mal performer… simplement parce que tu bois trop peu.

---

L'**eau** n'apporte pas de calories, mais elle représente environ **60 %** du corps adulte. Elle transporte les nutriments, aide à évacuer les déchets et régule la température.

---

En séance, tu perds de l'eau par la sueur. Une déshydratation même légère baisse souvent force et concentration.

---

Repère simple : une urine claire en journée est un bon signe. La soif arrive souvent un peu tard : mieux vaut boire régulièrement que d'attendre d'avoir vraiment soif.

---

À retenir : bien s'hydrater est un levier simple pour performer et récupérer.`,
    durationSec: 50,
    difficulty: "BEGINNER",
    order: 7,
    xpReward: 25,
    tags: ["eau", "hydratation"],
    sources: [
      "Sawka et al. — ACSM Position Stand on exercise and fluid replacement (2007)",
    ],
    ...CP.micronutriments,
    questions: THEME_1_QUIZZES[3],
  },
];
