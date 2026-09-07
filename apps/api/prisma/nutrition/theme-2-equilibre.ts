import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_2_QUIZZES } from "./theme-2-equilibre-questions";

export const THEME_2_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Fruits et légumes",
    subtitle: "Couleurs, fibres et vitamines.",
    markdown: `Une assiette de sportif n'est pas seulement protéines et riz. Les fruits et légumes font le lien avec la récupération.

---

Ils apportent **vitamines**, **minéraux**, **fibres** et composés antioxydants. Ils ne remplacent pas protéines ou féculents : ils complètent l'assiette.

---

Manger **plusieurs couleurs** (vert, orange, rouge, violet) augmente la diversité des micronutriments. Les légumes feuilles sont peu caloriques mais riches : utiles pour remplir l'assiette sans exploser les calories.

---

Les fruits apportent aussi des glucides naturels et de l'eau. Pratiques en collation légère avant ou après une séance.

---

À retenir : vise plusieurs couleurs dans la semaine. La variété compte plus qu'un seul « super-aliment ».`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 8,
    xpReward: 25,
    tags: ["fruits", "legumes", "equilibre"],
    ...CP.equilibre,
    questions: THEME_2_QUIZZES[0],
  },
  {
    title: "Féculents",
    subtitle: "Pain, riz, pâtes, pommes de terre.",
    markdown: `Sans féculents, beaucoup de sportifs sentent leurs séances s'essouffler. Ce n'est pas un hasard.

---

Les **féculents** (pain, riz, pâtes, pommes de terre, avoine…) sont une source majeure de **glucides**. Ils aident à remplir le glycogène musculaire.

---

Les versions **complètes** apportent plus de fibres et montent souvent la glycémie plus lentement que les versions raffinées. Mais la **portion** compte autant que le type.

---

En sèche, les féculents ne sont pas « interdits ». C'est la quantité totale de calories qui oriente le corps, pas un aliment isolé.

---

À retenir : féculents = carburant du muscle. Associe-les à protéines et légumes.`,
    durationSec: 50,
    difficulty: "BEGINNER",
    order: 9,
    xpReward: 25,
    tags: ["feculents", "glucides", "equilibre"],
    ...CP.equilibre,
    questions: THEME_2_QUIZZES[1],
  },
  {
    title: "Sources de protéines",
    subtitle: "Animal, végétal et variété.",
    markdown: `Tu n'as pas besoin d'une seule source « parfaite » de protéines. Tu as besoin d'un total suffisant.

---

Les protéines viennent d'aliments **animaux** (viande, poisson, œufs, laitiers) ou **végétaux** (légumineuses, tofu, tempeh, seitan). Les sources animales sont souvent complètes en acides aminés.

---

Les sources végétales peuvent aussi bien couvrir les besoins si tu combines (légumineuses + céréales) et si tu vises la diversité sur la journée.

---

En musculation, ce qui compte d'abord, c'est l'**apport total**. Poulet, œufs, fromage blanc, lentilles : variez pour couvrir aussi les micronutriments sans te lasser.

---

À retenir : animal ou végétal, le total journalier adapté à ton entraînement prime.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 10,
    xpReward: 25,
    tags: ["proteines", "sources", "equilibre"],
    ...CP.equilibre,
    questions: THEME_2_QUIZZES[2],
  },
  {
    title: "Matières grasses",
    subtitle: "Huiles, oléagineux, poissons gras.",
    markdown: `Couper toutes les graisses pour « sécher » n'est pas une bonne idée. Ton corps en a besoin.

---

Huiles, avocat, noix, poissons gras et fromages apportent des **lipides**. Ils soutiennent les hormones et l'absorption des vitamines A, D, E et K.

---

Les graisses **insaturées** (huile d'olive, colza, poissons gras, noix) sont généralement favorables. Les saturées ne sont pas interdites, mais un excès prolongé peut poser problème.

---

Une poignée d'oléagineux ou un filet d'huile enrichit un repas. Les fritures, elles, ajoutent vite beaucoup de calories dans un petit volume.

---

À retenir : intègre des graisses de qualité. Elles complètent protéines et féculents.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 11,
    xpReward: 25,
    tags: ["lipides", "huiles", "equilibre"],
    ...CP.equilibre,
    questions: THEME_2_QUIZZES[3],
  },
  {
    title: "Laitiers",
    subtitle: "Calcium, protéines et alternatives.",
    markdown: `Les laitiers ne sont pas obligatoires. Mais ils restent souvent pratiques pour un sportif.

---

Lait, yaourt, fromage et fromage blanc apportent **calcium** et **protéines**. Le fromage blanc et le yaourt grec concentrent les protéines avec peu de lactose : utiles en collation.

---

Le calcium soutient la santé osseuse, importante sous charges lourdes comme le squat ou le soulevé de terre.

---

Si tu ne consommes pas de lait animal, choisis des alternatives **enrichies en calcium**. Et si tu digères mal le lactose, yaourts, fromages affinés ou boissons végétales peuvent mieux convenir.

---

À retenir : laitiers ou alternatives enrichies = protéines + calcium, utiles mais pas indispensables.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 12,
    xpReward: 25,
    tags: ["laitiers", "calcium", "equilibre"],
    ...CP.equilibre,
    questions: THEME_2_QUIZZES[4],
  },
  {
    title: "Fibres",
    subtitle: "Introduction aux fibres alimentaires.",
    markdown: `Tu peux manger assez… et encore avoir faim trop vite. Les fibres changent souvent ça.

---

Les **fibres** sont des glucides que le corps ne digère pas complètement. On les trouve dans légumes, fruits, légumineuses, céréales complètes et oléagineux.

---

Elles ralentissent l'absorption du glucose et prolongent la **satiété**. Elles soutiennent aussi un transit plus régulier.

---

Augmente-les **progressivement** et bois assez d'eau. Un bond brutal (beaucoup de légumineuses d'un coup) peut créer des ballonnements.

---

À retenir : fibres = satiété et digestion. Introduction douce, eau suffisante.`,
    durationSec: 50,
    difficulty: "BEGINNER",
    order: 13,
    xpReward: 25,
    tags: ["fibres", "digestion", "equilibre"],
    ...CP.equilibre,
    questions: THEME_2_QUIZZES[5],
  },
  {
    title: "Hydratation",
    subtitle: "Boire au quotidien.",
    markdown: `Boire uniquement à la salle, ce n'est pas une vraie hydratation. C'est un réflexe de toute la journée.

---

Les besoins varient selon le poids, la chaleur et l'activité. Une estimation courante : environ **30 à 40 ml par kg** de poids et par jour, plus si tu transpires beaucoup.

---

Répartis les boissons : réveil, repas, avant et après la séance. L'**eau** reste la base. Thé et café peuvent compter, avec modération.

---

Pour une séance classique de musculation (< 90 min), l'eau suffit en général. En chaleur ou séance longue, de petites gorgées régulières aident davantage.

---

À retenir : hydratation = habitude quotidienne. Urine claire et boissons régulières valent mieux que la soif en urgence.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 14,
    xpReward: 25,
    tags: ["hydratation", "eau", "equilibre"],
    ...CP.equilibre,
    questions: THEME_2_QUIZZES[6],
  },
  {
    title: "Journée équilibrée",
    subtitle: "À quoi ressemble une assiette type.",
    markdown: `Pas besoin d'un régime compliqué pour bien manger. Une structure d'assiette suffit souvent à démarrer.

---

Un modèle simple : **demi-assiette de légumes**, **quart de protéines**, **quart de féculents**, plus un peu de lipides de qualité et de l'eau.

---

Au petit-déjeuner : protéines + féculent ou fruit + un peu de lipides. Les collations (fruit, yaourt, poignée d'amandes) aident si tu t'entraînes entre deux repas.

---

Ce modèle laisse ensuite de la place pour ajuster les **quantités** selon ton objectif : maintien, surplus ou déficit.

---

À retenir : structure d'abord, quantités ensuite. Une assiette claire vaut mieux qu'un plan parfait jamais suivi.`,
    durationSec: 55,
    difficulty: "BEGINNER",
    order: 15,
    xpReward: 25,
    tags: ["equilibre", "assiette", "quotidien"],
    ...CP.equilibre,
    questions: THEME_2_QUIZZES[7],
  },
];
