import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_3_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Métabolisme basal",
    subtitle: "L'énergie au repos.",
    markdown: `Le **métabolisme basal** (MB) est l'énergie que ton corps brûle au **repos total** : respiration, circulation, fonctionnement des organes, température corporelle. C'est la plus grosse part de ta dépense quotidienne chez la plupart des gens.

---

Le MB varie selon le **poids**, la **taille**, l'**âge**, le **sexe** et la **masse musculaire**. Plus tu as de muscle, plus ton MB tend à être élevé : le muscle « brûle » plus d'énergie au repos que le gras.

---

On estime souvent le MB avec des **formules** (Mifflin-St Jeor, Harris-Benedict) ou indirectement via la calorimétrie. Ce sont des estimations, pas des vérités absolues : ±10 à 15 % d'écart est normal.

---

En musculation, **gagner du muscle** peut légèrement augmenter le MB sur le long terme. Ce n'est pas un boost énorme, mais c'est un avantage durable par rapport à une approche « cardio seul ».

---

Le MB ne compte **pas** la marche, le ménage, la séance de sport ni la digestion : ce sont d'autres composantes de la dépense totale.

---

À retenir : métabolisme basal = énergie minimale pour vivre au repos. Base de tout calcul de besoins, modulée par ta masse musculaire.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 16,
    xpReward: 30,
    tags: ["metabolisme-basal", "energie"],
    sources: [
      "Mifflin et al. — A new predictive equation for resting energy expenditure (1990)",
    ],
    ...CP.energie,
    questions: quiz6(
      qcm(
        "Le métabolisme basal correspond à…",
        "L'énergie brûlée au repos total",
        ["L'énergie brûlée uniquement en courant", "Les calories des boissons", "Le poids du muscle"],
        "MB = dépense au repos, sans activité.",
      ),
      qcm(
        "Le métabolisme basal est influencé notamment par…",
        "La masse musculaire",
        ["La couleur des chaussures", "La marque de complément", "L'heure du coucher seule"],
        "Plus de muscle = MB un peu plus élevé.",
      ),
      qcm(
        "Les formules de MB (Mifflin-St Jeor…) donnent…",
        "Une estimation, pas une valeur exacte",
        ["Une mesure parfaite au gramme", "Un chiffre identique pour tous", "Un chiffre sans marge d'erreur"],
        "Estimation ±10-15 % = normal.",
      ),
      fillBlank(
        "Au repos, le corps brûle de l'énergie pour la respiration, la circulation et la ___.",
        "température",
        ["couleur", "taille", "marque"],
        "Thermorégulation = partie du MB.",
      ),
      tf(
        "Gagner du muscle peut légèrement augmenter le métabolisme basal.",
        true,
        "Vrai : le muscle coûte plus cher en énergie au repos que le gras.",
      ),
      tf(
        "Le métabolisme basal inclut déjà la séance de musculation.",
        false,
        "Faux : le MB = repos ; l'activité s'ajoute ensuite.",
      ),
    ),
  },
  {
    title: "Dépense énergétique",
    subtitle: "MB + activité + digestion.",
    markdown: `La **dépense énergétique totale** (DET) regroupe tout ce que ton corps brûle dans une journée. Elle se décompose en trois grandes parts.

---

1. **Métabolisme basal** (60 à 75 % chez la plupart) : énergie au repos.
2. **Activité physique** (15 à 30 %) : marche, sport, gestes du quotidien.
3. **Thermogenèse alimentaire** (5 à 10 %) : énergie pour digérer les aliments.

---

La DET n'est **pas fixe** : elle change si tu bouges plus, si tu grossis ou maigris, si tu gagnes du muscle, ou si tu adaptes ton alimentation.

---

Deux personnes du même poids peuvent avoir des DET différentes : l'une marche beaucoup, l'autre est sédentaire. L'une a plus de muscle, l'autre plus de gras.

---

Comprendre la DET aide à relier **ce que tu manges** à **ce que tu dépenses**, sans tomber dans la précision obsessionnelle. C'est un **ordre de grandeur** utile.

---

À retenir : DET = basal + activité + digestion. Trois leviers, pas un seul chiffre magique.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 17,
    xpReward: 30,
    tags: ["depense-energetique", "energie"],
    ...CP.energie,
    questions: quiz6(
      qcm(
        "La dépense énergétique totale comprend…",
        "Métabolisme basal, activité et thermogenèse alimentaire",
        ["Uniquement le sport", "Uniquement le sommeil", "Uniquement les protéines"],
        "DET = MB + activité + digestion.",
      ),
      qcm(
        "La plus grosse part de la DET chez la plupart des gens est…",
        "Le métabolisme basal",
        ["La marche seule", "La thermogenèse alimentaire", "Les étirements"],
        "MB = 60-75 % en général.",
      ),
      qcm(
        "Deux personnes du même poids peuvent avoir une DET différente car…",
        "Leur activité et leur masse musculaire diffèrent",
        ["Le poids est le seul facteur", "La DET est identique pour tous", "L'âge ne joue aucun rôle"],
        "Activité + composition corporelle = DET variable.",
      ),
      fillBlank(
        "La thermogenèse alimentaire représente environ ___ % de la DET.",
        "5 à 10",
        ["50 à 60", "0", "80 à 90"],
        "Digestion = petite part mais réelle.",
      ),
      tf(
        "La DET change si tu bouges plus ou si ta masse musculaire évolue.",
        true,
        "Vrai : DET dynamique, pas figée.",
      ),
      tf(
        "La DET se résume uniquement aux calories brûlées à la salle.",
        false,
        "Faux : marche, NEAT et digestion comptent aussi.",
      ),
    ),
  },
  {
    title: "Activité physique",
    subtitle: "Sport et mouvements du quotidien.",
    markdown: `L'**activité physique** dans la DET inclut ta séance de musculation, mais aussi la marche, les escaliers, le ménage, le vélo pour aller au travail. C'est la part **mobile** de ta dépense.

---

La séance de musculation brûle des calories, surtout si elle est intense ou longue. Mais ce n'est souvent **pas** la plus grosse part de la journée : la **NEAT** (activité non sportive) peut représenter plus chez une personne active au quotidien.

---

Un **NEAT élevé** (beaucoup de marche, travail debout) peut faire une vraie différence sur la DET sans ajouter de séances cardio. Monter les escaliers, marcher entre les séries : ça compte.

---

Plus la séance est **lourde** (gros volumes, courtes pauses), plus la dépense pendant l'effort est élevée. Mais la récupération post-effort consomme aussi un peu d'énergie (EPOC, effet modeste).

---

Adapter l'activité à ton **objectif** viendra plus tard (surplus, déficit). Pour l'instant : comprendre que bouger plus = dépenser plus, de façon progressive et réaliste.

---

À retenir : activité = salle + vie quotidienne. NEAT et séance s'additionnent dans ta dépense totale.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 18,
    xpReward: 30,
    tags: ["activite", "neat", "energie"],
    ...CP.energie,
    questions: quiz6(
      qcm(
        "La NEAT désigne…",
        "L'activité non sportive du quotidien",
        ["Uniquement la musculation", "Le sommeil profond", "La digestion seule"],
        "NEAT = marche, escaliers, gestes du quotidien.",
      ),
      qcm(
        "Une séance de musculation intense…",
        "Augmente la dépense pendant l'effort",
        ["Ne brûle aucune calorie", "Remplace le métabolisme basal", "Supprime la NEAT"],
        "Effort = calories brûlées pendant la séance.",
      ),
      qcm(
        "Chez une personne très active au quotidien…",
        "La NEAT peut dépasser la dépense de la séance",
        ["La NEAT est toujours nulle", "Seule la salle compte", "Marcher ne brûle rien"],
        "Vie active = NEAT significative.",
      ),
      fillBlank(
        "Monter les escaliers et marcher contribuent à la ___ énergétique.",
        "dépense",
        ["digestion", "masse", "couleur"],
        "Mouvement quotidien = part de la DET.",
      ),
      tf(
        "Bouger plus au quotidien augmente la dépense énergétique totale.",
        true,
        "Vrai : NEAT + sport = activité dans la DET.",
      ),
      tf(
        "Seule la musculation compte dans l'activité physique.",
        false,
        "Faux : marche, travail debout et cardio comptent aussi.",
      ),
    ),
  },
  {
    title: "Thermogenèse alimentaire",
    subtitle: "L'énergie pour digérer.",
    markdown: `La **thermogenèse alimentaire** (TEF) est l'énergie que le corps dépense pour **digérer, absorber et stocker** les aliments. Environ **5 à 10 %** de ta DET.

---

Chaque macronutriment a un coût digestif différent : les **protéines** coûtent le plus (~20 à 30 % de leurs calories), les **glucides** un peu moins (~5 à 10 %), les **lipides** le moins (~0 à 3 %).

---

Un repas **riche en protéines** demande donc un peu plus d'énergie à digérer qu'un repas très gras de même calories. C'est un effet **modeste**, pas un « brûle-graisse magique ».

---

Un repas **très copieux** ou très gras peut aussi prolonger la digestion et la sensation de satiété, ce qui influence indirectement ce que tu manges ensuite.

---

La TEF ne remplace pas le contrôle des **calories totales**. C'est une **nuance** à connaître, pas le levier principal de ta nutrition.

---

À retenir : digérer coûte de l'énergie. Les protéines « coûtent » un peu plus à traiter, mais l'effet reste modeste dans le bilan global.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 19,
    xpReward: 30,
    tags: ["thermogenese", "digestion", "energie"],
    ...CP.energie,
    questions: quiz6(
      qcm(
        "La thermogenèse alimentaire, c'est…",
        "L'énergie dépensée pour digérer les aliments",
        ["L'énergie du sport uniquement", "Le stockage du gras seul", "La respiration nocturne"],
        "TEF = coût énergétique de la digestion.",
      ),
      qcm(
        "Le macronutriment qui coûte le plus à digérer est…",
        "Les protéines",
        ["Les lipides", "L'eau", "Les vitamines"],
        "Protéines = ~20-30 % de TEF.",
      ),
      qcm(
        "La TEF représente environ…",
        "5 à 10 % de la dépense totale",
        ["50 % de la dépense", "0 % toujours", "80 % de la dépense"],
        "Part modeste mais réelle de la DET.",
      ),
      fillBlank(
        "Digérer, absorber et stocker les aliments consomme de l'___.",
        "énergie",
        ["eau seule", "muscle", "vitamine C"],
        "TEF = calories brûlées par la digestion.",
      ),
      tf(
        "Un repas riche en protéines augmente légèrement la dépense digestive.",
        true,
        "Vrai : effet modeste mais documenté.",
      ),
      tf(
        "La thermogenèse alimentaire suffit à elle seule à créer un grand déficit calorique.",
        false,
        "Faux : effet modeste ; le total calorique reste central.",
      ),
    ),
  },
  {
    title: "Besoins caloriques",
    subtitle: "Estimer son apport.",
    markdown: `Tes **besoins caloriques** correspondent à ta **dépense énergétique totale** en moyenne. Manger à ce niveau, c'est couvrir ce que ton corps brûle.

---

Méthode courante : estimer le **MB** (formule), multiplier par un **facteur d'activité** (sédentaire 1,2 ; modéré 1,55 ; actif 1,725 ; très actif 1,9), obtenir un ordre de grandeur de la DET.

---

Exemple simplifié : MB estimé à 1800 kcal × facteur 1,55 (modéré) ≈ **2790 kcal/jour**. Ce n'est qu'une **base de départ**, à ajuster selon tes résultats réels (poids, performance, récupération).

---

En musculation, les besoins montent si tu t'entraînes souvent, si tu as beaucoup de muscle, ou si tu es en période de **volume élevé**. Baissent en cas de blessure ou d'arrêt prolongé.

---

Observons le **corps** plutôt que le calculateur seul : énergie stable, performance qui progresse, poids qui évolue lentement dans le sens visé. Le chiffre sert de repère, pas de prison.

---

À retenir : besoins ≈ DET estimée (MB × activité). Point de départ, à affiner avec le vécu et les objectifs.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 20,
    xpReward: 30,
    tags: ["besoins-caloriques", "energie"],
    ...CP.energie,
    questions: quiz6(
      qcm(
        "Les besoins caloriques correspondent à…",
        "La dépense énergétique totale moyenne",
        ["Uniquement le métabolisme basal", "Le poids du gras seul", "Les calories des boissons"],
        "Besoins ≈ ce que le corps dépense.",
      ),
      qcm(
        "Pour estimer la DET, on multiplie souvent le MB par…",
        "Un facteur d'activité",
        ["Zéro", "Le nombre de séances au hasard", "L'âge seul"],
        "MB × facteur activité = estimation DET.",
      ),
      qcm(
        "Un facteur d'activité « modéré » est environ…",
        "1,55",
        ["0,5", "3,0", "10,0"],
        "Échelle classique : sédentaire 1,2 → actif 1,725.",
      ),
      fillBlank(
        "Le calculateur donne un ___, à ajuster selon tes résultats réels.",
        "repère",
        ["dogme", "interdit", "mythe"],
        "Estimation = point de départ, pas vérité absolue.",
      ),
      tf(
        "Les besoins caloriques augmentent si tu t'entraînes plus souvent.",
        true,
        "Vrai : plus d'activité = plus de dépense.",
      ),
      tf(
        "Une formule en ligne donne toujours la valeur exacte au kcal près.",
        false,
        "Faux : marge d'erreur normale ; ajuster avec le vécu.",
      ),
    ),
  },
  {
    title: "Balance énergétique",
    subtitle: "Entrées vs sorties.",
    markdown: `La **balance énergétique** compare ce que tu **consommes** (calories des aliments et boissons) à ce que tu **dépenses** (DET). C'est le cadre pour comprendre l'évolution du poids.

---

Si les **entrées = sorties** en moyenne sur plusieurs semaines, le poids tend à se **stabiliser**. Ce n'est pas au jour le jour : le poids fluctue (eau, repas, cycle).

---

Si les **entrées > sorties**, l'excédent d'énergie est **stocké** (gras, un peu de muscle si tu t'entraînes). Si **entrées < sorties**, le corps **puise** dans ses réserves.

---

La balance ne dit **pas** d'où viennent les calories (protéines, glucides, lipides) : c'est une vue **globale**. La qualité de l'alimentation compte pour la santé et la performance, en plus du chiffre total.

---

En musculation, la balance s'observe sur **plusieurs semaines**, pas sur une pesée du lendemain après un gros repas. Patience et moyenne lissée.

---

À retenir : balance = entrées vs sorties. Cadre simple pour relier alimentation, dépense et évolution du poids corporel.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 21,
    xpReward: 30,
    tags: ["balance-energetique", "energie"],
    ...CP.energie,
    questions: quiz6(
      qcm(
        "La balance énergétique compare…",
        "Les calories consommées aux calories dépensées",
        ["Les protéines aux lipides", "Le sommeil au sport", "L'eau aux vitamines"],
        "Entrées vs sorties = balance.",
      ),
      qcm(
        "Si entrées = sorties en moyenne sur plusieurs semaines…",
        "Le poids tend à se stabiliser",
        ["On perd 5 kg par jour", "On gagne 10 kg de muscle", "Rien ne se passe jamais"],
        "Équilibre moyen = poids stable.",
      ),
      qcm(
        "Le poids fluctue au jour le jour à cause notamment…",
        "De l'eau et du contenu intestinal",
        ["Uniquement du gras pur", "De la couleur des aliments", "Du type de chaussures"],
        "Fluctuations daily ≠ graisse pure.",
      ),
      fillBlank(
        "La balance énergétique est une vue ___ des entrées et sorties.",
        "globale",
        ["détaillée par vitamine", "impossible", "inutile"],
        "Total calorique, pas répartition des macros seule.",
      ),
      tf(
        "La balance énergétique s'interprète mieux sur plusieurs semaines qu'en un jour.",
        true,
        "Vrai : moyenne lissée > pesée isolée.",
      ),
      tf(
        "La balance énergétique indique exactement combien de gramme de muscle a été gagné hier.",
        false,
        "Faux : elle parle du bilan global, pas de la composition précise daily.",
      ),
    ),
  },
  {
    title: "Déficit, maintien, surplus",
    subtitle: "Trois états de la balance.",
    markdown: `Selon ta balance énergétique, ton corps est dans l'un de trois états : **maintien**, **surplus** ou **déficit**. Voici la première fois qu'on les détaille dans le parcours.

---

**Maintien** : tu manges environ ce que tu dépenses. Le poids se stabilise en moyenne. Utile pour consolider ses habitudes ou maintenir sa composition actuelle.

---

**Surplus** : tu manges **plus** que tu dépenses. Le corps dispose d'énergie en plus. Une partie peut servir à **construire du muscle** si tu t'entraînes, une autre peut être stockée en gras. Tout l'excédent ne devient pas du muscle.

---

**Déficit** : tu manges **moins** que tu dépenses. Le corps puise dans ses réserves. Il brûle surtout du gras, mais peut aussi perdre du muscle si le déficit est trop fort ou si les protéines manquent. L'entraînement lourd aide à **préserver** le muscle.

---

La **recomposition** (perdre du gras et gagner du muscle en même temps) est surtout possible chez les **débutants** ou après une longue pause. Chez les pratiquants avancés, des phases dédiées sont souvent plus efficaces.

---

Avec le temps, le corps **s'adapte** : en déficit prolongé, il dépense un peu moins (adaptation métabolique). Cause fréquente de **plateau** en période de sèche.

---

À retenir : maintien, surplus et déficit orientent le corps vers l'équilibre, le stockage ou la perte de réserves. Ce sont des mécanismes simples, pas des modes magiques.`,
    durationSec: 95,
    difficulty: "INTERMEDIATE",
    order: 22,
    xpReward: 30,
    tags: ["deficit", "surplus", "maintien", "energie"],
    sources: [
      "Helms et al. — Evidence-based recommendations for natural bodybuilding (2014)",
    ],
    ...CP.energie,
    questions: quiz6(
      qcm(
        "En surplus calorique, l'excédent sert notamment à…",
        "Construire du muscle (si on s'entraîne)",
        ["Supprimer le gras", "Remplacer le sommeil", "Bloquer la digestion"],
        "Énergie en plus = possibilité de construire du tissu maigre.",
      ),
      qcm(
        "En déficit trop fort, le corps peut perdre…",
        "Du gras et du muscle",
        ["Uniquement de l'eau", "Rien du tout", "Uniquement des vitamines"],
        "Déficit agressif + peu de protéines = risque musculaire.",
      ),
      qcm(
        "La recomposition est surtout possible chez…",
        "Les débutants ou après une longue pause",
        ["Les champions expérimentés", "Ceux qui ne s'entraînent pas", "Tout le monde également"],
        "Stimulus nouveau = gains plus faciles simultanés.",
      ),
      fillBlank(
        "En déficit prolongé, le corps ___ un peu sa dépense pour s'adapter.",
        "réduit",
        ["double", "supprime", "ignore"],
        "Adaptation = cause fréquente de plateau en sèche.",
      ),
      tf(
        "100 % des calories en surplus deviennent du muscle.",
        false,
        "Faux : une partie est stockée en gras.",
      ),
      tf(
        "L'entraînement lourd aide à préserver le muscle en déficit.",
        true,
        "Vrai : signal au corps de garder les fibres sollicitées.",
      ),
    ),
  },
];
