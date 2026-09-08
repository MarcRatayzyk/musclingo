import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_6_QUIZZES } from "./theme-6-etiquettes-questions";

export const THEME_6_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Étiquettes nutritionnelles",
    subtitle: "Lire le tableau en 30 secondes.",
    markdown: `Le devant du paquet vend. L'étiquette, elle, informe.

---

Le tableau nutritionnel indique calories, protéines, glucides et lipides pour **100 g** (ou 100 ml), parfois aussi par **portion**.

---

Regarde d'abord la **taille de portion**. Un produit peut sembler léger pour 100 g… si tu en manges le double, les chiffres doublent aussi.

---

En musculation, l'étiquette sert surtout à repérer les **protéines** et à éviter les produits très sucrés ou très gras sans le réaliser. Le Nutri-Score aide à comparer vite, mais ne remplace pas le tableau.

---

À retenir : calories + macros + portion réelle. Toujours vérifier la référence (100 g ou portion).`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 35,
    xpReward: 35,
    tags: ["etiquette", "nutritionnel", "macros"],
    sources: [
      "ANSES — Étiquetage nutritionnel (2020)",
    ],
    ...CP.etiquettes,
    questions: THEME_6_QUIZZES[0],
  },
  {
    title: "Ingrédients",
    subtitle: "La liste qui dit la vérité.",
    markdown: `Si tu ne lis qu'une chose sur un paquet, lis la liste des ingrédients.

---

Ils sont classés par **ordre décroissant** de quantité. Le premier est le plus présent. Un produit « aux fruits » avec le sucre en tête contient surtout du sucre.

---

Les **additifs** apparaissent souvent avec un code **E**. Les **allergènes** (lait, gluten, œufs, fruits à coque…) doivent être mis en évidence.

---

« Light », « sans sucres ajoutés » ou « 0 % matière grasse » ne garantissent pas un produit sain. Regarde ce qui remplace : édulcorants, sel, amidon…

---

À retenir : la liste des ingrédients dit souvent plus que le packaging.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 36,
    xpReward: 35,
    tags: ["ingredients", "additifs", "allergenes"],
    sources: [
      "ANSES — Étiquetage nutritionnel (2020)",
    ],
    ...CP.etiquettes,
    questions: THEME_6_QUIZZES[1],
  },
  {
    title: "Densité énergétique",
    subtitle: "Beaucoup de calories en peu de volume.",
    markdown: `Deux assiettes de même taille peuvent avoir des calories très différentes. C'est la densité énergétique.

---

Elle mesure combien de calories un aliment apporte pour un volume ou un poids donné. Les **lipides** (9 kcal/g) rendent huiles, fromages gras et pâtisseries très denses.

---

Légumes et fruits ont une densité **basse** : beaucoup de volume, peu de calories. Pratiques en déficit pour calmer la faim.

---

En prise de masse, des aliments denses (oléagineux, avoine, huile) aident à atteindre les calories sans manger des montagnes. En sèche, l'inverse aide souvent.

---

À retenir : même volume, composition différente = calories très différentes.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 37,
    xpReward: 35,
    tags: ["densite-energetique", "calories", "volume"],
    sources: [
      "Rolls — The relationship between dietary energy density and body weight (2000)",
    ],
    ...CP.etiquettes,
    questions: THEME_6_QUIZZES[2],
  },
  {
    title: "Portions",
    subtitle: "Ce que tu manges vraiment.",
    markdown: `L'étiquette indique une portion. Toi, tu manges souvent autre chose.

---

Exemple : des céréales annoncent 30 g, tu en sers 60 g. Calories et sucres sont alors **doublés** par rapport à l'étiquette.

---

Pour les protéines (viande, poisson, tofu), une portion utile en musculation tourne souvent autour de **120 à 200 g**, selon ton poids et tes objectifs.

---

Peser un peu au début aide à calibrer l'œil. Ensuite, tu estimes mieux. Au restaurant, les portions sont souvent plus grandes que prévu.

---

À retenir : portion réelle > portion indiquée. Calibrer évite de se tromper sans le vouloir.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 38,
    xpReward: 35,
    tags: ["portions", "quantites", "balance"],
    sources: [
      "ANSES — Portions et apports de référence (2017)",
    ],
    ...CP.etiquettes,
    questions: THEME_6_QUIZZES[3],
  },
  {
    title: "Sucres ajoutés",
    subtitle: "Repérer le sucre caché.",
    markdown: `Le sucre du fruit entier et le sucre ajouté dans un soda n'ont pas le même impact pratique.

---

Les **sucres ajoutés** sont incorporés à la fabrication (sucre, sirop de glucose, miel ajouté…). Sur l'étiquette, « **dont sucres** » mélange sucres naturels et ajoutés. Pour distinguer, lis les **ingrédients**.

---

Le sucre se cache sous plusieurs noms : dextrose, maltodextrine, jus concentré… Les boissons sucrées apportent beaucoup sans satiété : un verre peut contenir **20 à 30 g**.

---

Un peu de sucre autour de l'entraînement n'est pas catastrophique. Un excès quotidien, lui, peut freiner la santé métabolique.

---

À retenir : liste des ingrédients + « dont sucres » = repérer le sucre ajouté.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 39,
    xpReward: 35,
    tags: ["sucre", "sucres-ajoutes", "etiquette"],
    sources: [
      "OMS — Guideline: sugars intake (2015)",
    ],
    ...CP.etiquettes,
    questions: THEME_6_QUIZZES[4],
  },
  {
    title: "Sel",
    subtitle: "Sodium, eau et tension.",
    markdown: `Le sel n'est pas « mauvais » en soi. C'est l'excès chronique qui pose problème.

---

Sur l'étiquette, cherche **sel** ou **sodium** (1 g de sel ≈ 400 mg de sodium). L'OMS recommande environ **5 g de sel par jour**.

---

La plupart de l'excès vient des produits transformés : charcuterie, plats préparés, chips, sauces. Un excès peut retenir l'eau et faire monter la tension chez les personnes sensibles.

---

Cuisiner maison avec herbes, citron et poivre réduit le sel ajouté sans perdre le goût. « Sans sel ajouté » ne signifie pas zéro sodium : certains aliments en contiennent naturellement.

---

À retenir : limiteur principal = produits transformés. Modérer le sel protège sur le long terme.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 40,
    xpReward: 35,
    tags: ["sel", "sodium", "tension"],
    sources: [
      "OMS — Reducing salt intake (2016)",
    ],
    ...CP.etiquettes,
    questions: THEME_6_QUIZZES[5],
  },
  {
    title: "Qualité des graisses",
    subtitle: "Saturées, insaturées, oméga-3.",
    markdown: `Toutes les graisses n'ont pas le même effet. La qualité compte autant que la quantité.

---

On distingue surtout graisses **saturées**, **insaturées** et **oméga-3**. Les saturées (beurre, charcuterie, fromages gras) en excès sont associées à un risque cardio accru.

---

Les insaturées (huile d'olive, avocat, oléagineux, poissons gras) sont favorables quand elles remplacent les saturées. Les **oméga-3** aident aussi à moduler l'inflammation après l'effort.

---

Les graisses **trans** sont à éviter autant que possible. Sur l'étiquette, regarde « matières grasses dont acides gras saturés ».

---

À retenir : privilégie insaturées et oméga-3, limite saturées et trans.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 41,
    xpReward: 35,
    tags: ["graisses", "omega-3", "saturees"],
    sources: [
      "ANSES — Lipides et santé (2011)",
    ],
    ...CP.etiquettes,
    questions: THEME_6_QUIZZES[6],
  },
  {
    title: "Marketing alimentaire",
    subtitle: "Déjouer les pièges du packaging.",
    markdown: `Un packaging « sport » ne fait pas un produit adapté à la musculation.

---

Méfie-toi des mentions **light**, **0 %**, **protéiné**, **fitness**. Elles mettent un point en avant et cachent souvent le reste : sucre, sel, additifs.

---

Une barre « protéinée » peut contenir autant de sucre qu'une barre classique. Les images de fruits ou d'athlètes ne prouvent rien sur la composition.

---

Les allégations (« source de protéines ») respectent des seuils légaux, mais le produit peut rester très sucré. Lis toujours le dos du paquet.

---

À retenir : le devant vend, l'arrière informe. Fie-toi aux chiffres, pas au marketing.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 42,
    xpReward: 35,
    tags: ["marketing", "packaging", "pieges"],
    sources: [
      "ANSES — Étiquetage nutritionnel (2020)",
    ],
    ...CP.etiquettes,
    questions: THEME_6_QUIZZES[7],
  },
];
