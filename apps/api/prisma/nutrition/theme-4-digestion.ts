import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_4_QUIZZES } from "./theme-4-digestion-questions";

export const THEME_4_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Digestion",
    subtitle: "De la bouche à l'intestin.",
    markdown: `Les nutriments d'un repas n'arrivent pas instantanément dans ton sang. La digestion prend du temps.

---

Elle commence dans la **bouche**, continue dans l'**estomac**, puis dans l'**intestin**. Un repas mixte reste souvent **2 à 4 heures** dans l'estomac.

---

Les **lipides** ralentissent la vidange gastrique. Un repas très gras prolonge la satiété, mais peut aussi alourdir juste avant une séance.

---

Les enzymes découpent protéines, glucides et lipides en unités absorbables : acides aminés, glucose, acides gras.

---

À retenir : la digestion est progressive. Les nutriments arrivent par vagues, pas d'un seul coup.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 23,
    xpReward: 30,
    tags: ["digestion", "estomac", "enzymes"],
    sources: [
      "Gropper & Smith — Advanced Nutrition and Human Metabolism (2017)",
    ],
    ...CP.digestion,
    questions: THEME_4_QUIZZES[0],
  },
  {
    title: "Absorption intestinale",
    subtitle: "Quand les nutriments entrent dans le sang.",
    markdown: `Digérer ne suffit pas. Encore faut-il que les nutriments passent dans le corps.

---

L'**absorption** se fait surtout dans l'**intestin grêle**. Glucose et acides aminés passent dans le sang. Les lipides empruntent d'abord surtout la **lymphe**, ce qui ralentit un peu le trajet.

---

La surface intestinale est énorme grâce aux **villosités** : des replis microscopiques qui multiplient la zone d'échange.

---

Sans cette surface, tu digérerais… mais tu absorberais beaucoup moins. C'est la vraie porte d'entrée des nutriments.

---

À retenir : l'intestin grêle fait entrer les nutriments dans le corps. Protéines, glucides et lipides n'empruntent pas exactement le même chemin.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 24,
    xpReward: 30,
    tags: ["absorption", "intestin", "nutriments"],
    sources: [
      "Gropper & Smith — Advanced Nutrition and Human Metabolism (2017)",
    ],
    ...CP.digestion,
    questions: THEME_4_QUIZZES[1],
  },
  {
    title: "Glucose et glycémie",
    subtitle: "Le sucre dans le sang.",
    markdown: `Ton énergie du moment dépend beaucoup du glucose qui circule dans ton sang.

---

Le **glucose** est le principal sucre sanguin. La **glycémie**, c'est simplement sa concentration dans le sang.

---

Après un repas riche en glucides, la glycémie monte. Les glucides rapides (sucre, jus) montent plus vite ; les plus lents (avoine, légumineuses) montent plus doucement.

---

Pendant un effort intense, le muscle consomme beaucoup de glucose. Fibres et lipides dans un repas ralentissent l'entrée du sucre dans le sang et donnent souvent une énergie plus stable.

---

À retenir : une glycémie trop en dents de scie peut freiner énergie et performance.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 25,
    xpReward: 30,
    tags: ["glucose", "glycemie", "glucides"],
    sources: [
      "Burke et al. — Carbohydrates for training and competition (2011)",
    ],
    ...CP.digestion,
    questions: THEME_4_QUIZZES[2],
  },
  {
    title: "Insuline",
    subtitle: "L'hormone qui range l'énergie.",
    markdown: `L'insuline n'est pas l'ennemie du muscle. C'est surtout un signal de rangement.

---

Produite par le **pancréas**, elle est libérée quand la glycémie monte. Elle aide le **glucose** à entrer dans les cellules pour faire baisser la glycémie et stocker l'énergie.

---

Dans le muscle, elle aide aussi les **acides aminés** à entrer. C'est l'un des intérêts de protéines + glucides après l'effort.

---

L'entraînement régulier améliore souvent la **sensibilité** à l'insuline : moins d'insuline suffit pour faire entrer le glucose. Bon signe pour la santé métabolique.

---

À retenir : l'insuline range l'énergie. Au bon moment, elle aide aussi à recharger et réparer.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 26,
    xpReward: 30,
    tags: ["insuline", "pancreas", "glycemie"],
    sources: [
      "Aragon & Schoenfeld — Nutrient timing revisited (2013)",
    ],
    ...CP.digestion,
    questions: THEME_4_QUIZZES[3],
  },
  {
    title: "Stockage énergie",
    subtitle: "Glycogène et graisse.",
    markdown: `Quand tu manges plus que tu dépenses, l'énergie ne disparaît pas. Elle est stockée.

---

Deux réserves principales : le **glycogène** et le **gras**. Le glycogène est du glucose stocké, surtout dans muscle et foie. C'est une réserve **rapide** mais **limitée**.

---

Le gras corporel est une réserve **vaste**. Le corps y puise surtout en effort modéré prolongé, ou en déficit calorique.

---

En musculation, remplir le glycogène musculaire favorise la performance. L'excédent chronique, lui, finit souvent en gras.

---

À retenir : glycogène = réserve rapide ; gras = réserve longue. Les deux n'ont pas le même rôle.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 27,
    xpReward: 30,
    tags: ["stockage", "glycogene", "gras"],
    sources: [
      "Helms et al. — Evidence-based recommendations for natural bodybuilding (2014)",
    ],
    ...CP.digestion,
    questions: THEME_4_QUIZZES[4],
  },
  {
    title: "Foie, muscles et gras",
    subtitle: "Qui fait quoi avec l'énergie.",
    markdown: `Ton corps ne stocke pas l'énergie n'importe où, n'importe comment. Chaque organe a un rôle.

---

Le **foie** régule beaucoup : il stocke du glycogène et peut le libérer dans le sang entre les repas pour stabiliser la glycémie.

---

Les **muscles** utilisent surtout leur **propre glycogène** pendant l'effort. Ils ne le partagent pas directement avec le reste du corps.

---

Le **tissu adipeux** stocke l'excédent sous forme de triglycérides. En déficit, le corps mobilise progressivement ces réserves.

---

À retenir : foie = régulation ; muscles = consommation locale ; gras = réserve longue durée.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 28,
    xpReward: 30,
    tags: ["foie", "muscle", "metabolisme"],
    sources: [
      "Gropper & Smith — Advanced Nutrition and Human Metabolism (2017)",
    ],
    ...CP.digestion,
    questions: THEME_4_QUIZZES[5],
  },
];
