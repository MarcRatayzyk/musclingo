import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_7_QUIZZES } from "./theme-7-objectifs-questions";

export const THEME_7_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Perte de poids",
    subtitle: "Déficit, protéines et muscle.",
    markdown: `Perdre du poids, ce n'est pas « supprimer un aliment ». C'est surtout créer un déficit.

---

Le **déficit calorique**, c'est consommer moins d'énergie que ton corps n'en dépense sur la durée. Il puise alors dans ses réserves, surtout le gras.

---

Sans **protéines** suffisantes et sans entraînement lourd, une partie de la perte peut venir du muscle. Un déficit **modéré** (environ 10 à 20 %) est souvent plus durable qu'un déficit agressif.

---

Fibres, légumes, eau et sommeil aident à tenir sans craquer. Regarde la tendance sur plusieurs semaines, pas une pesée isolée.

---

À retenir : déficit modéré + protéines + musculation = perdre surtout du gras.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 43,
    xpReward: 35,
    tags: ["perte-poids", "deficit", "seche"],
    sources: [
      "Helms et al. — Evidence-based recommendations for natural bodybuilding (2014)",
    ],
    ...CP.objectifs,
    questions: THEME_7_QUIZZES[0],
  },
  {
    title: "Prise de masse",
    subtitle: "Surplus intelligent, pas excès.",
    markdown: `Pour construire du muscle, l'entraînement seul ne suffit pas. Il faut aussi de l'énergie en plus.

---

La **prise de masse** combine entraînement progressif, protéines suffisantes et **surplus calorique** modéré. Sans surplus, le corps manque souvent d'énergie pour construire.

---

Un surplus de **200 à 500 kcal/jour** suffit souvent. Au-delà, l'excédent devient surtout du gras. Le corps ne peut construire du muscle qu'à un rythme limité.

---

Répartis les protéines sur la journée et garde assez de glucides pour les séances lourdes. Varie aussi l'assiette pour éviter les carences.

---

À retenir : surplus modéré + protéines + entraînement. Plus de calories ne veut pas dire plus de muscle sans limite.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 44,
    xpReward: 35,
    tags: ["prise-masse", "surplus", "hypertrophie"],
    sources: [
      "Garthe et al. — Effect of nutritional intervention on body composition (2011)",
    ],
    ...CP.objectifs,
    questions: THEME_7_QUIZZES[1],
  },
  {
    title: "Performance sportive",
    subtitle: "Carburer l'effort à la salle.",
    markdown: `Pour performer, tu as besoin d'énergie disponible, pas seulement de motivation.

---

Avant une séance lourde, un repas **1 à 3 h** avant avec glucides et protéines fournit du carburant sans trop de lourdeur.

---

Pendant une séance classique (< 90 min), le muscle utilise surtout le **glycogène** déjà stocké. Après l'effort, protéines + glucides aident à recharger et réparer. La « fenêtre » dure des heures, pas 5 minutes.

---

Une déshydratation légère (1 à 2 % du poids) baisse déjà la force. Boire régulièrement compte autant que le timing parfait.

---

À retenir : glycogène + protéines + hydratation. Le total de la journée prime sur l'horloge.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 45,
    xpReward: 35,
    tags: ["performance", "glycogene", "timing"],
    sources: [
      "Burke et al. — Carbohydrates for training and competition (2011)",
      "ISSN Position Stand — Nutrient timing (2017)",
    ],
    ...CP.objectifs,
    questions: THEME_7_QUIZZES[2],
  },
  {
    title: "Santé cardio",
    subtitle: "Cœur, vaisseaux et assiette.",
    markdown: `La musculation aide le cœur. L'assiette aussi.

---

Trop de sel, de sucres ajoutés et de graisses saturées augmente le risque cardio sur la durée. À l'inverse, fruits, légumes, légumineuses, céréales complètes, poissons gras et huile d'olive forment un schéma favorable.

---

Les **oméga-3** et graisses **insaturées** sont utiles, surtout quand elles remplacent les saturées. Limiter charcuterie, fritures, pâtisseries et sodas aide beaucoup.

---

L'entraînement améliore aussi pression, profil lipidique et sensibilité à l'insuline. Mais il ne remplace pas une alimentation solide.

---

À retenir : cœur en forme = assiette variée, peu transformée, riche en végétaux et oméga-3.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 46,
    xpReward: 35,
    tags: ["sante-cardio", "coeur", "oméga-3"],
    sources: [
      "ANSES — Lipides et santé (2011)",
    ],
    ...CP.objectifs,
    questions: THEME_7_QUIZZES[3],
  },
  {
    title: "Glycémie",
    subtitle: "Stabilité et objectifs de santé.",
    markdown: `Une glycémie stable, c'est souvent plus d'énergie constante… et moins de fringales.

---

Des repas très riches en **glucides rapides** seuls font monter puis chuter le sucre sanguin vite. Résultat fréquent : coup de barre.

---

Associer **fibres, protéines et lipides** aux glucides ralentit l'absorption. L'activité physique améliore aussi la **sensibilité à l'insuline** : le muscle utilise mieux le glucose.

---

En cas de prédiabète ou diabète, le suivi médical prime. Les principes généraux restent utiles : repas équilibrés, mouvement, moins de sucres ajoutés.

---

À retenir : glycémie stable = assiette mixte + mouvement. Utile pour l'entraînement et la santé.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 47,
    xpReward: 35,
    tags: ["glycemie", "insuline", "equilibre"],
    sources: [
      "American Diabetes Association — Standards of Care (2024)",
    ],
    ...CP.objectifs,
    questions: THEME_7_QUIZZES[4],
  },
  {
    title: "Vieillissement",
    subtitle: "Nutrition après 40 ans.",
    markdown: `Avec l'âge, le muscle ne se perd pas « automatiquement ». Il se perd surtout si on s'entraîne moins et si on mange moins de protéines.

---

La **sarcopénie**, c'est la perte progressive de muscle. Chez les seniors actifs, les besoins en **protéines** peuvent augmenter pour mieux préserver la masse.

---

**Vitamine D** et **calcium** soutiennent les os. La **B12** peut manquer avec l'âge, surtout en régime végétalien. Fruits, légumes colorés et oméga-3 aident aussi à gérer l'inflammation.

---

La soif diminue parfois… sans que les besoins en eau baissent. Boire régulièrement reste important.

---

À retenir : protéines + entraînement + variété. Ce n'est jamais trop tard pour préserver muscle et os.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 48,
    xpReward: 35,
    tags: ["vieillissement", "sarcopenie", "seniors"],
    sources: [
      "Bauer et al. — Evidence-based recommendations for protein intake (2013)",
    ],
    ...CP.objectifs,
    questions: THEME_7_QUIZZES[5],
  },
  {
    title: "Végétarisme",
    subtitle: "Muscu sans viande.",
    markdown: `On peut progresser en musculation sans viande. À condition de bien construire l'assiette.

---

Une alimentation végétarienne ou végétalienne peut suffire si elle est **variée** et **planifiée**. Points d'attention : protéines, fer, B12, oméga-3, parfois vitamine D.

---

Combine légumineuses, céréales, tofu, tempeh, seitan, et laitiers/œufs si tu es végétarien. Le fer végétal s'absorbe mieux avec de la vitamine C.

---

En végan, la **B12** doit être supplémentée. En prise de masse, le volume alimentaire est souvent plus grand, car beaucoup d'aliments végétaux sont moins denses en calories.

---

À retenir : muscu végétarienne = possible avec variété et couverture des points clés. Pas de handicap automatique.`,
    durationSec: 60,
    difficulty: "ADVANCED",
    order: 49,
    xpReward: 35,
    tags: ["vegetarisme", "vegan", "proteines-vegetales"],
    sources: [
      "Melina et al. — Position of the Academy of Nutrition and Dietetics: vegetarian diets (2016)",
    ],
    ...CP.objectifs,
    questions: THEME_7_QUIZZES[6],
  },
];
