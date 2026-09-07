import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_3_QUIZZES } from "./theme-3-energie-questions";

export const THEME_3_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Métabolisme basal",
    subtitle: "L'énergie au repos.",
    markdown: `Même allongé sans bouger, ton corps brûle de l'énergie. C'est le métabolisme basal.

---

Le **métabolisme basal** (MB) est l'énergie utilisée au repos total : respiration, circulation, organes, température. Chez la plupart des gens, c'est la plus grosse part de la dépense quotidienne.

---

Il varie selon le poids, la taille, l'âge, le sexe et la **masse musculaire**. Plus tu as de muscle, plus ton MB tend à être un peu plus élevé.

---

Les formules (Mifflin-St Jeor…) donnent une **estimation**, pas une vérité exacte. Un écart de 10 à 15 % est normal.

---

À retenir : métabolisme basal = énergie minimale pour vivre au repos. La séance de sport s'ajoute ensuite.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 16,
    xpReward: 30,
    tags: ["metabolisme-basal", "energie"],
    sources: [
      "Mifflin et al. — A new predictive equation for resting energy expenditure (1990)",
    ],
    ...CP.energie,
    questions: THEME_3_QUIZZES[0],
  },
  {
    title: "Dépense énergétique",
    subtitle: "MB + activité + digestion.",
    markdown: `Tes besoins ne se résument pas à « ce que tu brûles à la salle ». La journée entière compte.

---

La **dépense énergétique totale** (DET) regroupe trois parts : **métabolisme basal**, **activité physique**, et **thermogenèse alimentaire** (énergie pour digérer).

---

Chez la plupart des gens, le basal représente la plus grosse part. L'activité et la digestion s'ajoutent ensuite.

---

Deux personnes du même poids peuvent avoir une DET différente : l'une marche beaucoup, l'autre est sédentaire ; l'une a plus de muscle, l'autre plus de gras.

---

À retenir : DET = basal + activité + digestion. Trois leviers, pas un chiffre magique.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 17,
    xpReward: 30,
    tags: ["depense-energetique", "energie"],
    ...CP.energie,
    questions: THEME_3_QUIZZES[1],
  },
  {
    title: "Activité physique",
    subtitle: "Sport et mouvements du quotidien.",
    markdown: `Ta séance de musculation brûle des calories. Mais ce n'est souvent pas le seul levier de ta journée.

---

L'**activité physique** inclut la salle, et aussi la marche, les escaliers, le ménage, le vélo. La part non sportive s'appelle la **NEAT**.

---

Chez une personne active au quotidien, la NEAT peut représenter beaucoup. Monter les escaliers, marcher entre les séries : ça s'additionne.

---

Plus une séance est lourde ou longue, plus la dépense pendant l'effort monte. Mais bouger plus au quotidien reste un levier simple et réaliste.

---

À retenir : activité = salle + vie quotidienne. Les deux comptent dans ta dépense totale.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 18,
    xpReward: 30,
    tags: ["activite", "neat", "energie"],
    ...CP.energie,
    questions: THEME_3_QUIZZES[2],
  },
  {
    title: "Thermogenèse alimentaire",
    subtitle: "L'énergie pour digérer.",
    markdown: `Digérer coûte aussi de l'énergie. Pas énorme, mais réel.

---

La **thermogenèse alimentaire** (TEF) est l'énergie dépensée pour digérer, absorber et stocker les aliments. Environ **5 à 10 %** de ta dépense totale.

---

Les **protéines** coûtent le plus à digérer, les glucides un peu moins, les lipides le moins. Un repas riche en protéines augmente donc légèrement cette dépense.

---

Attention : ce n'est pas un brûle-graisse magique. L'effet reste **modeste**. Le total calorique reste le levier principal.

---

À retenir : digérer consomme de l'énergie. Les protéines « coûtent » un peu plus, sans transformer le bilan à elles seules.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 19,
    xpReward: 30,
    tags: ["thermogenese", "digestion", "energie"],
    ...CP.energie,
    questions: THEME_3_QUIZZES[3],
  },
  {
    title: "Besoins caloriques",
    subtitle: "Estimer son apport.",
    markdown: `Tes besoins caloriques, c'est simplement l'énergie que ton corps dépense en moyenne.

---

Méthode courante : estimer le **métabolisme basal**, puis le multiplier par un **facteur d'activité** (sédentaire ≈ 1,2 ; modéré ≈ 1,55 ; actif ≈ 1,725). Tu obtiens un ordre de grandeur.

---

Exemple : MB 1800 kcal × 1,55 ≈ **2790 kcal/jour**. Ce n'est qu'un **point de départ**.

---

Ensuite, observe ton corps : énergie, performance, évolution du poids sur plusieurs semaines. Le chiffre sert de repère, pas de prison.

---

À retenir : besoins ≈ DET estimée. On affine avec le vécu, pas avec le calculateur seul.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 20,
    xpReward: 30,
    tags: ["besoins-caloriques", "energie"],
    ...CP.energie,
    questions: THEME_3_QUIZZES[4],
  },
  {
    title: "Balance énergétique",
    subtitle: "Entrées vs sorties.",
    markdown: `Prendre ou perdre du poids ne dépend pas d'un aliment « coupable ». Ça dépend surtout de la balance.

---

La **balance énergétique** compare ce que tu consommes (aliments et boissons) à ce que tu dépenses. Entrées = sorties en moyenne → poids qui tend à se stabiliser.

---

Entrées > sorties → stockage. Entrées < sorties → le corps puise dans ses réserves. Ce bilan se lit sur **plusieurs semaines**, pas sur une pesée du lendemain.

---

Le poids du jour fluctue avec l'eau, le sel et le transit. La tendance lissée compte davantage.

---

À retenir : balance = entrées vs sorties. Cadre simple pour comprendre l'évolution du poids.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 21,
    xpReward: 30,
    tags: ["balance-energetique", "energie"],
    ...CP.energie,
    questions: THEME_3_QUIZZES[5],
  },
  {
    title: "Déficit, maintien, surplus",
    subtitle: "Trois états de la balance.",
    markdown: `Selon ta balance, ton corps est en maintien, en surplus ou en déficit. Trois états, trois effets.

---

**Maintien** : tu manges environ ce que tu dépenses. Le poids se stabilise en moyenne.

---

**Surplus** : tu manges plus. Une partie peut servir à construire du muscle si tu t'entraînes. Le reste peut être stocké en gras. Tout l'excédent ne devient pas du muscle.

---

**Déficit** : tu manges moins. Le corps puise dans ses réserves. Il brûle surtout du gras, mais peut aussi perdre du muscle si le déficit est trop fort ou si les protéines manquent. L'entraînement lourd aide à préserver le muscle.

---

À retenir : maintien, surplus et déficit orientent le corps. Ce sont des mécanismes simples, pas des modes magiques.`,
    durationSec: 60,
    difficulty: "INTERMEDIATE",
    order: 22,
    xpReward: 30,
    tags: ["deficit", "surplus", "maintien", "energie"],
    sources: [
      "Helms et al. — Evidence-based recommendations for natural bodybuilding (2014)",
    ],
    ...CP.energie,
    questions: THEME_3_QUIZZES[6],
  },
];
