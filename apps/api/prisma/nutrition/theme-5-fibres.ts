import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_5_QUIZZES } from "./theme-5-fibres-questions";

export const THEME_5_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Fibres solubles et insolubles",
    subtitle: "Deux familles, deux rôles.",
    markdown: `Toutes les fibres n'agissent pas de la même façon. Deux familles, deux rôles utiles.

---

Les fibres **solubles** (avoine, pommes, légumineuses) forment un **gel** dans l'intestin. Elles ralentissent l'absorption du sucre et du gras.

---

Les fibres **insolubles** (blé complet, légumes feuillus) absorbent de l'eau et donnent du volume aux selles. Elles aident le **transit**.

---

La plupart des végétaux mélangent les deux. En musculation, elles améliorent digestion et satiété sans ajouter beaucoup de calories : utile en sèche pour calmer la faim.

---

À retenir : solubles = gel et ralentissement ; insolubles = volume et transit.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 29,
    xpReward: 30,
    tags: ["fibres", "solubles", "insolubles"],
    sources: [
      "Slavin — Fiber and prebiotics: mechanisms and health benefits (2013)",
    ],
    ...CP.fibres,
    questions: THEME_5_QUIZZES[0],
  },
  {
    title: "Satiété",
    subtitle: "Pourquoi certains repas calent plus.",
    markdown: `Deux repas avec les mêmes calories ne calment pas toujours la faim de la même façon.

---

La **satiété**, c'est la sensation de « repas qui dure ». Elle dépend du volume, de la composition et du temps que le cerveau met à recevoir le signal.

---

**Protéines** et **fibres** calent souvent plus que des glucides rapides seuls. Les **lipides** prolongent aussi la satiété, mais ils apportent beaucoup de calories.

---

Le cerveau met environ **15 à 20 minutes** à dire « assez ». Manger lentement aide à ne pas dépasser ses besoins sans le vouloir.

---

À retenir : satiété = volume + protéines + fibres + un peu de temps.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 30,
    xpReward: 30,
    tags: ["satiete", "appetit", "repas"],
    sources: [
      "Slavin — Fiber and prebiotics: mechanisms and health benefits (2013)",
    ],
    ...CP.fibres,
    questions: THEME_5_QUIZZES[1],
  },
  {
    title: "Transit",
    subtitle: "Le parcours des aliments non digérés.",
    markdown: `Un intestin qui fonctionne mal se sent. Et ça peut gâcher une séance.

---

Le **transit** désigne le temps que mettent aliments et résidus à traverser le tube digestif. Trop lent : constipation, lourdeur. Trop rapide : absorption parfois moins bonne.

---

Fibres **insolubles** + **eau** facilitent le transit en donnant volume et souplesse aux selles. Mais trop de fibres d'un coup, sans assez d'eau, provoque souvent ballonnements.

---

Bouger aide aussi : marche, cardio léger et musculation stimulent le système digestif.

---

À retenir : transit confortable = fibres progressives + eau + mouvement.`,
    durationSec: 55,
    difficulty: "INTERMEDIATE",
    order: 31,
    xpReward: 30,
    tags: ["transit", "constipation", "digestion"],
    sources: [
      "Slavin — Fiber and prebiotics: mechanisms and health benefits (2013)",
    ],
    ...CP.fibres,
    questions: THEME_5_QUIZZES[2],
  },
  {
    title: "Microbiote",
    subtitle: "Les milliards de bactéries utiles.",
    markdown: `Ton intestin abrite un écosystème vivant. Et ce n'est pas un détail.

---

Le **microbiote** regroupe des milliards de bactéries, surtout dans le côlon. Une grande partie est utile : digestion de certaines fibres, production de vitamines, protection de la paroi.

---

Un microbiote **varié** est associé à une meilleure santé digestive. La diversité alimentaire nourrit cette diversité microbienne.

---

Antibiotiques, stress prolongé ou régime très pauvre en fibres peuvent l'appauvrir. Probiotiques et prébiotiques peuvent aider dans certains cas, mais une assiette variée reste la base.

---

À retenir : fibres et légumes variés soutiennent un microbiote en forme.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 32,
    xpReward: 35,
    tags: ["microbiote", "bacteries", "intestin"],
    sources: [
      "Hills et al. — Gut microbiome and nutrition (2019)",
    ],
    ...CP.fibres,
    questions: THEME_5_QUIZZES[3],
  },
  {
    title: "Fermentation",
    subtitle: "Quand les fibres deviennent des acides gras.",
    markdown: `Certaines fibres ne sont pas digérées par toi… mais par tes bactéries. Et c'est utile.

---

Dans le côlon, le microbiote **fermente** surtout les fibres solubles. Ce processus produit des gaz et des **acides gras à chaîne courte** (AGCC).

---

Ces AGCC nourrissent les cellules de la paroi intestinale et aident à moduler l'inflammation. Un peu de gaz est normal. Des ballonnements excessifs viennent souvent d'une hausse trop brutale en fibres.

---

Trop peu de fibres = moins de fermentation utile. Trop d'un coup = inconfort temporaire.

---

À retenir : la fermentation transforme les fibres en composés utiles. Progression et variété évitent l'inconfort.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 33,
    xpReward: 35,
    tags: ["fermentation", "agcc", "fibres"],
    sources: [
      "Slavin — Fiber and prebiotics: mechanisms and health benefits (2013)",
    ],
    ...CP.fibres,
    questions: THEME_5_QUIZZES[4],
  },
  {
    title: "Santé digestive",
    subtitle: "Intestin en forme au quotidien.",
    markdown: `Un intestin confortable, ce n'est pas du luxe. C'est la base pour utiliser correctement ce que tu manges.

---

Les piliers : alimentation **variée** (fibres, fruits, légumes), **eau** suffisante, repas pas trop rapides, et **activité physique** régulière.

---

Les aliments ultra-transformés, souvent pauvres en fibres, peuvent perturber le confort intestinal sur la durée. Le stress chronique aussi, via l'axe intestin-cerveau.

---

En musculation, moins de ballonnements et de crampes digestives, c'est aussi plus de focus sur la barre.

---

À retenir : digestion saine = variété + eau + mouvement. Ce n'est pas un détail secondaire.`,
    durationSec: 55,
    difficulty: "ADVANCED",
    order: 34,
    xpReward: 35,
    tags: ["sante-digestive", "intestin", "confort"],
    sources: [
      "Hills et al. — Gut microbiome and nutrition (2019)",
    ],
    ...CP.fibres,
    questions: THEME_5_QUIZZES[5],
  },
];
