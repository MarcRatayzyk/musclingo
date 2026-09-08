import type { SeedQuestion } from "../anatomie-quiz-helpers";
import { qcm, tf, multi, order, match } from "../anatomie-quiz-helpers";
import { quiz20 } from "./quiz-bank";

type QcmDef = [
  prompt: string,
  correct: string,
  wrong: [string, string, string],
  explanation: string,
];
type TfDef = [prompt: string, isTrue: boolean, explanation: string];
type MultiDef = [
  prompt: string,
  correct: [string, string, ...string[]],
  wrong: [string, string, ...string[]],
  explanation: string,
];
type OrderDef = [
  prompt: string,
  steps: [string, string, string],
  explanation: string,
];
type MatchDef = [
  prompt: string,
  pairs: [[string, string], [string, string], [string, string]?],
  explanation: string,
];

type LessonQuizData = {
  qcms: [QcmDef, QcmDef, QcmDef, QcmDef, QcmDef, QcmDef, QcmDef, QcmDef];
  tfs: [TfDef, TfDef, TfDef, TfDef];
  multis: [MultiDef, MultiDef];
  orders: [OrderDef, OrderDef];
  matches: [MatchDef, MatchDef];
  reflections: [QcmDef, QcmDef];
};

const SLOTS = [0, 2, 1, 3, 1, 0, 3, 2, 0, 1] as const;

function buildLessonQuiz(data: LessonQuizData, offset = 0): SeedQuestion[] {
  return quiz20(
    ...data.qcms.map(([prompt, correct, wrong, explanation], index) =>
      qcm(prompt, correct, wrong, explanation, SLOTS[(index + offset) % SLOTS.length]),
    ),
    ...data.tfs.map(([prompt, isTrue, explanation]) => tf(prompt, isTrue, explanation)),
    ...data.multis.map(([prompt, correct, wrong, explanation]) =>
      multi(prompt, correct, wrong, explanation),
    ),
    ...data.orders.map(([prompt, steps, explanation]) => order(prompt, steps, explanation)),
    ...data.matches.map(([prompt, pairs, explanation]) => match(prompt, pairs, explanation)),
    ...data.reflections.map(([prompt, correct, wrong, explanation], index) =>
      qcm(prompt, correct, wrong, explanation, SLOTS[(index + offset + 8) % SLOTS.length]),
    ),
  );
}

const fruitsEtLegumes = buildLessonQuiz({
  qcms: [
    [
      "Pourquoi varier les couleurs des fruits et légumes ?",
      "Pour couvrir plus de micronutriments",
      ["Pour éviter toutes les protéines", "Pour supprimer les féculents", "Pour annuler les calories"],
      "Les couleurs reflètent souvent des familles différentes de vitamines, minéraux et polyphénols.",
    ],
    [
      "Quel rôle les fibres des légumes jouent-elles souvent dans un repas ?",
      "Elles augmentent la satiété",
      ["Elles digèrent les protéines", "Elles remplacent l'eau", "Elles bloquent tous les glucides"],
      "Les fibres ralentissent le repas et aident à se sentir rassasié plus longtemps.",
    ],
    [
      "Quel choix illustre une assiette riche en couleurs ?",
      "Carottes, épinards et myrtilles",
      ["Riz blanc, pain blanc et pâtes", "Poulet, oeufs et fromage", "Huile, beurre et noix"],
      "Associer plusieurs végétaux colorés diversifie les apports.",
    ],
    [
      "Les fruits et légumes apportent surtout quoi ?",
      "Micronutriments, eau et fibres",
      ["Créatine et caféine", "Alcool et sodium", "Protéines complètes uniquement"],
      "Ils contribuent surtout aux vitamines, minéraux, eau, fibres et composés protecteurs.",
    ],
    [
      "Dans un objectif musculation, les légumes remplacent-ils la source de protéines ?",
      "Non, ils la complètent",
      ["Oui, toujours", "Seulement en prise de masse", "Seulement si crus"],
      "Ils améliorent la qualité du repas, mais ne fournissent pas assez de protéines pour remplacer une source dédiée.",
    ],
    [
      "Quel fruit est pratique autour d'une séance ?",
      "Une banane",
      ["Une cuillère d'huile", "Un bouillon salé seul", "Un fromage très gras"],
      "La banane apporte des glucides faciles à utiliser, sans être obligatoire.",
    ],
    [
      "Que signifie viser 5 portions de fruits et légumes ?",
      "Un repère de fréquence quotidien",
      ["Une obligation au gramme près", "Un maximum strict", "Un substitut aux repas"],
      "C'est un repère simple pour augmenter la présence de végétaux dans la journée.",
    ],
    [
      "Quel légume aide à augmenter le volume du repas avec peu d'énergie ?",
      "Courgette",
      ["Beurre", "Sucre", "Crème entière"],
      "Les légumes riches en eau augmentent le volume sans beaucoup de calories.",
    ],
  ],
  tfs: [
    ["Manger des légumes peut aider à mieux gérer la faim.", true, "Leur volume et leurs fibres soutiennent la satiété."],
    ["Les fruits sont à éviter car ils contiennent du sucre.", false, "Le fruit entier apporte aussi eau, fibres et micronutriments."],
    ["Une assiette colorée garantit automatiquement assez de protéines.", false, "La couleur aide les micros, pas le total protéique."],
    ["Les légumes surgelés peuvent être utiles.", true, "Ils gardent une bonne qualité nutritionnelle et sont pratiques."],
  ],
  multis: [
    [
      "Quels apports sont typiques des fruits et légumes ?",
      ["Fibres", "Vitamines"],
      ["Protéines complètes en grande quantité", "Alcool"],
      "Ils sont surtout intéressants pour fibres, vitamines, minéraux et eau.",
    ],
    [
      "Quelles stratégies augmentent facilement les végétaux ?",
      ["Ajouter une crudité au déjeuner", "Prévoir un fruit en collation"],
      ["Supprimer toutes les protéines", "Boire uniquement du jus"],
      "Les ajouts simples tiennent mieux qu'une règle extrême.",
    ],
  ],
  orders: [
    [
      "Construis une assiette plus végétale.",
      ["Choisir deux couleurs de légumes", "Ajouter une source de protéines", "Compléter avec féculent et matière grasse"],
      "Les légumes enrichissent l'assiette, mais l'équilibre vient de l'ensemble.",
    ],
    [
      "Passe d'un repas pauvre en végétaux à un repas plus complet.",
      ["Identifier le repas concerné", "Ajouter un fruit ou un légume", "Observer la satiété"],
      "Commencer petit permet de garder l'habitude.",
    ],
  ],
  matches: [
    [
      "Associe aliment et intérêt principal.",
      [["Épinards", "Folates"], ["Orange", "Vitamine C"], ["Lentilles", "Fibres"]],
      "Chaque aliment a plusieurs intérêts, mais certains repères aident à varier.",
    ],
    [
      "Associe couleur et exemple.",
      [["Rouge", "Tomate"], ["Vert", "Brocoli"], ["Violet", "Myrtille"]],
      "Changer de couleur est une méthode simple pour diversifier.",
    ],
  ],
  reflections: [
    [
      "Un pratiquant mange poulet-riz à chaque repas et aucun légume. Quel conseil est le plus pertinent ?",
      "Ajouter progressivement des légumes variés",
      ["Remplacer le poulet par de la salade", "Supprimer le riz", "Ne manger que des jus"],
      "La priorité est d'améliorer les micros et les fibres sans casser l'apport protéique.",
    ],
    [
      "Après une séance, quel repas reste le plus équilibré ?",
      "Omelette, pommes de terre et légumes",
      ["Salade seule", "Bonbons et soda", "Huile et avocat seuls"],
      "Il combine protéines, glucides et végétaux.",
    ],
  ],
});

const feculents = buildLessonQuiz({
  qcms: [
    [
      "Quel est le rôle principal des féculents ?",
      "Apporter des glucides utilisables",
      ["Apporter uniquement des vitamines", "Remplacer les protéines", "Bloquer la prise de muscle"],
      "Les féculents fournissent des glucides, carburant important pour l'entraînement.",
    ],
    [
      "Le glycogène est surtout stocké dans quels tissus ?",
      "Muscles et foie",
      ["Os et tendons", "Peau et cheveux", "Poumons et reins"],
      "Les glucides sont stockés sous forme de glycogène dans les muscles et le foie.",
    ],
    [
      "Quel féculent est généralement plus complet ?",
      "Riz complet",
      ["Sucre blanc", "Pain de mie très raffiné", "Soda"],
      "Un féculent complet garde davantage de fibres et de micronutriments.",
    ],
    [
      "Que change une portion plus grande de pâtes ?",
      "Elle augmente surtout l'apport en glucides",
      ["Elle supprime les protéines", "Elle rend le repas sans calories", "Elle transforme les glucides en vitamines"],
      "La portion détermine une grande partie de l'énergie apportée.",
    ],
    [
      "En sèche, que faut-il retenir sur les féculents ?",
      "Ils peuvent rester selon la portion",
      ["Ils sont interdits", "Ils annulent le déficit", "Ils empêchent toute perte de gras"],
      "La perte de gras dépend du bilan global, pas d'un aliment isolé.",
    ],
    [
      "Quel moment peut justifier plus de glucides ?",
      "Autour d'une séance intense",
      ["Pendant une journée sans repas", "Uniquement avant de dormir", "Jamais en musculation"],
      "Les glucides peuvent soutenir les performances quand l'effort est exigeant.",
    ],
    [
      "Quel féculent apporte aussi des fibres ?",
      "Flocons d'avoine",
      ["Sucre en poudre", "Bonbons", "Huile d'olive"],
      "L'avoine apporte glucides, fibres et une texture rassasiante.",
    ],
    [
      "Comment ajuster les féculents sans tout supprimer ?",
      "Modifier la portion",
      ["Retirer tous les repas", "Boire moins d'eau", "Éviter les légumes"],
      "Jouer sur la portion est plus réaliste qu'interdire une famille entière.",
    ],
  ],
  tfs: [
    ["Les féculents peuvent aider à remplir les réserves de glycogène.", true, "Le glycogène musculaire dépend en partie des glucides consommés."],
    ["Les féculents complets sont toujours sans calories.", false, "Ils restent énergétiques, même s'ils sont souvent plus riches en fibres."],
    ["Une sèche impose zéro féculent.", false, "Le déficit calorique peut inclure des féculents bien portionnés."],
    ["La portion de féculents doit tenir compte de l'activité.", true, "Plus l'activité est élevée, plus les besoins peuvent augmenter."],
  ],
  multis: [
    [
      "Quels éléments distinguent souvent un féculent complet ?",
      ["Plus de fibres", "Plus de micronutriments conservés"],
      ["Zéro énergie", "Absence totale de glucides"],
      "Complet ne veut pas dire magique, mais souvent plus dense en nutriments.",
    ],
    [
      "Quels repères aident à gérer les féculents ?",
      ["Adapter à l'entraînement", "Observer la faim et l'énergie"],
      ["Les bannir le soir", "Les remplacer par du beurre"],
      "Les besoins varient avec l'activité, l'objectif et la tolérance.",
    ],
  ],
  orders: [
    [
      "Ajuste une portion de féculents pour une journée très active.",
      ["Évaluer la séance prévue", "Choisir une portion adaptée", "Observer énergie et faim"],
      "L'ajustement se fait à partir du contexte et du retour du corps.",
    ],
    [
      "Passe d'un féculent raffiné vers une option plus complète.",
      ["Choisir un repas test", "Remplacer une partie par du complet", "Garder si digestion correcte"],
      "La transition progressive limite les inconforts digestifs.",
    ],
  ],
  matches: [
    [
      "Associe féculent et point clé.",
      [["Pomme de terre", "Glucides et potassium"], ["Avoine", "Fibres"], ["Riz blanc", "Digestion souvent facile"]],
      "Chaque féculent a son intérêt selon le moment et la tolérance.",
    ],
    [
      "Associe situation et portion.",
      [["Repos complet", "Portion modérée"], ["Séance jambes", "Portion plus généreuse"], ["Collation rapide", "Fruit ou pain possible"]],
      "La portion suit l'effort et l'objectif.",
    ],
  ],
  reflections: [
    [
      "Un sportif a peur de manger du riz en sèche. Quelle réponse est la plus juste ?",
      "Le riz peut rester si le total de la journée est maîtrisé",
      ["Le riz bloque toute perte de gras", "Il faut le remplacer par de l'huile", "Il faut supprimer les légumes"],
      "Le contexte calorique compte davantage que l'aliment seul.",
    ],
    [
      "Avant une séance lourde, quel choix est le plus logique ?",
      "Une portion de pâtes avec une protéine",
      ["Une salade sans énergie", "Un repas uniquement gras", "Rien pour vider le glycogène"],
      "Des glucides digestes peuvent soutenir la performance.",
    ],
  ],
}, 1);

const sourcesProteines = buildLessonQuiz({
  qcms: [
    [
      "Quel est l'intérêt principal des sources de protéines ?",
      "Fournir des acides aminés",
      ["Hydrater les articulations", "Remplacer les fibres", "Créer le déficit calorique"],
      "Les protéines apportent les acides aminés utiles à la réparation et au maintien musculaire.",
    ],
    [
      "Quel aliment est une source animale de protéines ?",
      "Oeufs",
      ["Lentilles", "Riz", "Huile de colza"],
      "Les oeufs font partie des protéines animales.",
    ],
    [
      "Quel aliment est une source végétale de protéines ?",
      "Pois chiches",
      ["Poulet", "Saumon", "Fromage blanc"],
      "Les légumineuses contribuent à l'apport protéique végétal.",
    ],
    [
      "Que faut-il suivre en priorité pour les protéines ?",
      "Le total journalier",
      ["Une prise unique énorme", "Le nombre de couleurs", "L'heure exacte uniquement"],
      "La répartition aide, mais le total quotidien reste un repère majeur.",
    ],
    [
      "Pourquoi associer légumineuses et céréales ?",
      "Pour améliorer le profil en acides aminés",
      ["Pour supprimer les calories", "Pour rendre le repas sans glucides", "Pour éviter toute digestion"],
      "Lentilles et riz se complètent mieux que chaque aliment seul.",
    ],
    [
      "Quel duo illustre une combinaison végétale classique ?",
      "Semoule et pois chiches",
      ["Poulet et saumon", "Huile et avocat", "Pomme et salade"],
      "Céréales et légumineuses peuvent former un repas végétal plus complet.",
    ],
    [
      "Quel critère compte pour choisir une source protéique ?",
      "Qualité, quantité et tolérance",
      ["La couleur de l'emballage", "Le fait d'être toujours liquide", "L'absence totale de lipides"],
      "Un bon choix dépend aussi de la digestion, du budget et du repas.",
    ],
    [
      "Quel exemple apporte protéines et peu de lipides ?",
      "Blanc de poulet",
      ["Beurre", "Sucre", "Huile d'olive"],
      "Le blanc de poulet est une source protéique maigre.",
    ],
  ],
  tfs: [
    ["Les protéines végétales peuvent contribuer au total journalier.", true, "Elles comptent dans l'apport total, même si leur profil varie."],
    ["Une seule source de protéines est obligatoire pour progresser.", false, "La variété aide à couvrir les besoins et à tenir le plan."],
    ["Les légumineuses apportent aussi des glucides et des fibres.", true, "Elles ne sont pas des protéines pures, ce qui est utile à considérer."],
    ["Le total de protéines sur la journée n'a aucune importance.", false, "C'est un repère central pour le maintien et le développement musculaire."],
  ],
  multis: [
    [
      "Quelles sources peuvent contribuer aux protéines ?",
      ["Tofu", "Poisson"],
      ["Huile de tournesol", "Confiture"],
      "Les protéines viennent de sources animales ou végétales.",
    ],
    [
      "Quels points rendent un repas végétal plus solide en protéines ?",
      ["Associer légumineuses et céréales", "Prévoir une portion suffisante"],
      ["Ne manger que des fruits", "Retirer tous les féculents"],
      "La complémentarité et la quantité évitent un repas trop léger.",
    ],
  ],
  orders: [
    [
      "Construis une journée protéinée cohérente.",
      ["Fixer un repère journalier", "Répartir sur plusieurs repas", "Ajuster selon faim et digestion"],
      "La régularité compte plus qu'un seul très gros repas.",
    ],
    [
      "Créer un repas végétal riche en protéines.",
      ["Choisir une légumineuse", "Ajouter une céréale", "Compléter avec légumes et matière grasse"],
      "Cette structure améliore la qualité globale du repas.",
    ],
  ],
  matches: [
    [
      "Associe source et famille.",
      [["Oeuf", "Animale"], ["Lentilles", "Végétale"], ["Tofu", "Végétale"]],
      "Les deux familles peuvent être utilisées dans une alimentation sportive.",
    ],
    [
      "Associe duo et intérêt.",
      [["Riz + haricots", "Complémentarité"], ["Poulet + légumes", "Protéines + micros"], ["Skyr + fruit", "Collation protéinée"]],
      "Le contexte du repas donne du sens à la source choisie.",
    ],
  ],
  reflections: [
    [
      "Un pratiquant végétarien manque souvent de protéines. Quelle action est prioritaire ?",
      "Planifier des portions de légumineuses, tofu ou produits laitiers",
      ["Ajouter seulement de l'huile", "Supprimer les céréales", "Manger uniquement des fruits"],
      "Il faut organiser des sources protéiques réelles à chaque repas clé.",
    ],
    [
      "Quel repas soutient le mieux la récupération ?",
      "Riz, lentilles, légumes et yaourt",
      ["Salade verte seule", "Pain et soda", "Huile et noix uniquement"],
      "Il apporte protéines, glucides et micronutriments.",
    ],
  ],
}, 2);

const matieresGrasses = buildLessonQuiz({
  qcms: [
    [
      "Quel rôle ont les matières grasses alimentaires ?",
      "Participer aux hormones et aux vitamines liposolubles",
      ["Remplacer toute hydratation", "Supprimer la faim définitivement", "Transformer les glucides en protéines"],
      "Les lipides soutiennent notamment les membranes, hormones et vitamines A, D, E, K.",
    ],
    [
      "Quelle huile est riche en oméga-3 végétaux ?",
      "Huile de colza",
      ["Huile de coco", "Huile de palme", "Beurre clarifié"],
      "Le colza apporte de l'ALA, un oméga-3 végétal utile.",
    ],
    [
      "Quel aliment apporte des graisses insaturées ?",
      "Avocat",
      ["Sucre blanc", "Riz blanc", "Soda"],
      "L'avocat contient surtout des lipides insaturés.",
    ],
    [
      "Pourquoi ne pas supprimer toutes les graisses en sèche ?",
      "Elles restent nécessaires au fonctionnement du corps",
      ["Elles n'ont aucune calorie", "Elles remplacent l'entraînement", "Elles empêchent toute faim"],
      "Réduire peut aider le déficit, mais zéro lipide n'est pas une bonne stratégie.",
    ],
    [
      "Quel poisson est intéressant pour les oméga-3 ?",
      "Sardine",
      ["Dinde", "Riz", "Banane"],
      "Les poissons gras apportent EPA et DHA.",
    ],
    [
      "Que faut-il surveiller avec les huiles ?",
      "La quantité versée",
      ["La couleur du verre", "Le moment exact de la journée", "La présence de protéines"],
      "Les huiles sont denses en calories, donc la portion compte.",
    ],
    [
      "Quel choix est le plus riche en lipides ?",
      "Une poignée de noix",
      ["Un concombre", "Un blanc d'oeuf", "Une pomme"],
      "Les oléagineux sont nutritifs mais énergétiques.",
    ],
    [
      "Quelle vitamine dépend d'une absorption avec les graisses ?",
      "Vitamine D",
      ["Vitamine C", "Vitamine B1", "Vitamine B12 uniquement"],
      "La vitamine D est liposoluble.",
    ],
  ],
  tfs: [
    ["Les graisses insaturées sont souvent à privilégier.", true, "Huiles végétales, noix et poissons gras sont de bons repères."],
    ["Toutes les matières grasses sont identiques.", false, "Le type de lipides et la quantité changent l'intérêt nutritionnel."],
    ["Les huiles apportent beaucoup d'énergie pour un petit volume.", true, "Une cuillère peut compter vite dans le total calorique."],
    ["Supprimer tous les lipides améliore toujours la santé hormonale.", false, "Un apport trop bas peut poser problème."],
  ],
  multis: [
    [
      "Quels aliments apportent des graisses intéressantes ?",
      ["Noix", "Sardines"],
      ["Soda", "Bonbons"],
      "Noix et poissons gras apportent des lipides utiles, avec des profils différents.",
    ],
    [
      "Quels rôles concernent les lipides ?",
      ["Absorption de vitamines liposolubles", "Fonctionnement hormonal"],
      ["Stockage du glycogène", "Hydratation directe"],
      "Les lipides ont des rôles structurels et hormonaux.",
    ],
  ],
  orders: [
    [
      "Ajoute des lipides sans exploser les calories.",
      ["Choisir une source de qualité", "Mesurer une petite portion", "Ajuster le reste du repas"],
      "La qualité et la quantité comptent ensemble.",
    ],
    [
      "Améliore le profil lipidique d'une semaine.",
      ["Repérer les graisses dominantes", "Ajouter poissons gras ou colza", "Limiter les excès répétés"],
      "On cherche un meilleur équilibre, pas une interdiction totale.",
    ],
  ],
  matches: [
    [
      "Associe source et intérêt.",
      [["Huile d'olive", "Insaturées"], ["Sardines", "Oméga-3"], ["Beurre", "À doser"]],
      "Chaque source a une place possible selon la quantité.",
    ],
    [
      "Associe lipide et repère.",
      [["Noix", "Dense en énergie"], ["Colza", "ALA"], ["Saumon", "EPA/DHA"]],
      "Les repères aident à varier les sources.",
    ],
  ],
  reflections: [
    [
      "Quel conseil donner à quelqu'un qui retire toute matière grasse pour sécher ?",
      "Garder une portion mesurée de bonnes sources",
      ["Tout supprimer jusqu'à la compétition", "Remplacer par du sucre", "Boire moins d'eau"],
      "Un déficit peut être construit sans descendre les lipides à zéro.",
    ],
    [
      "Quel dîner est le plus cohérent pour inclure de bons lipides ?",
      "Saumon, légumes et riz",
      ["Soda et bonbons", "Concombre seul", "Riz nature sans protéine"],
      "Il apporte oméga-3, glucides et micronutriments.",
    ],
  ],
}, 3);

const laitiers = buildLessonQuiz({
  qcms: [
    [
      "Quels nutriments les produits laitiers apportent souvent ?",
      "Calcium et protéines",
      ["Caféine et créatine", "Alcool et fibres", "Oméga-3 uniquement"],
      "Lait, yaourt et fromage blanc peuvent contribuer au calcium et aux protéines.",
    ],
    [
      "Pourquoi le fromage blanc est apprécié en musculation ?",
      "Il apporte des protéines facilement",
      ["Il remplace toute séance", "Il ne contient jamais de calories", "Il supprime les glucides"],
      "C'est une option pratique pour augmenter l'apport protéique.",
    ],
    [
      "Que signifie une boisson végétale enrichie ?",
      "Du calcium ou des vitamines ont été ajoutés",
      ["Elle contient forcément plus de protéines", "Elle est toujours sans sucre", "Elle remplace toutes les sources animales"],
      "L'enrichissement peut rapprocher certains apports des laitiers, surtout le calcium.",
    ],
    [
      "Quel point vérifier sur une alternative végétale ?",
      "Protéines, calcium et sucres ajoutés",
      ["La couleur du bouchon", "L'absence de liquide", "Le nombre de cuillères"],
      "Toutes les alternatives ne se valent pas.",
    ],
    [
      "Que peut provoquer une intolérance au lactose ?",
      "Des troubles digestifs",
      ["Une prise de muscle instantanée", "Une déshydratation certaine", "Une absence de besoin en calcium"],
      "Une mauvaise digestion du lactose peut causer ballonnements ou inconfort.",
    ],
    [
      "Quel produit laitier est souvent riche en protéines ?",
      "Skyr",
      ["Soda", "Huile", "Confiture"],
      "Le skyr est concentré en protéines.",
    ],
    [
      "Le fromage est-il identique au fromage blanc ?",
      "Non, il est souvent plus gras et salé",
      ["Oui, toujours", "Non, il ne contient pas de calcium", "Oui, il est toujours sans calories"],
      "Le fromage peut avoir sa place, mais les portions sont différentes.",
    ],
    [
      "Quel minéral est central pour les os ?",
      "Calcium",
      ["Sodium uniquement", "Fer uniquement", "Iode uniquement"],
      "Le calcium participe à la santé osseuse.",
    ],
  ],
  tfs: [
    ["Les produits laitiers peuvent aider à atteindre le total protéique.", true, "Fromage blanc, skyr ou yaourt grec sont pratiques."],
    ["Toutes les boissons végétales sont naturellement riches en calcium.", false, "Il faut vérifier l'enrichissement sur l'étiquette."],
    ["L'intolérance au lactose varie selon les personnes.", true, "La tolérance dépend de la dose et du produit."],
    ["Un produit laitier est obligatoire pour être en bonne santé.", false, "On peut couvrir les besoins autrement si l'alimentation est bien construite."],
  ],
  multis: [
    [
      "Quels critères regarder pour choisir un laitier ou équivalent ?",
      ["Teneur en protéines", "Calcium"],
      ["Couleur de l'emballage", "Promesse détox"],
      "Les critères utiles sont nutritionnels et pratiques.",
    ],
    [
      "Quelles options peuvent convenir si le lactose gêne ?",
      ["Produit sans lactose", "Alternative enrichie en calcium"],
      ["Soda", "Suppression de toute protéine"],
      "Il existe des solutions sans renoncer aux apports clés.",
    ],
  ],
  orders: [
    [
      "Choisis une collation lactée utile.",
      ["Vérifier la tolérance digestive", "Choisir une source protéinée", "Ajouter fruit ou céréales si besoin"],
      "La collation doit servir l'objectif et rester digeste.",
    ],
    [
      "Comparer une alternative végétale.",
      ["Lire protéines et calcium", "Regarder les sucres ajoutés", "Décider selon les besoins"],
      "L'étiquette évite de supposer que toutes les options se valent.",
    ],
  ],
  matches: [
    [
      "Associe produit et point fort.",
      [["Fromage blanc", "Protéines"], ["Lait enrichi", "Calcium"], ["Fromage", "Saveur mais portion à doser"]],
      "Les produits ont des intérêts différents.",
    ],
    [
      "Associe situation et option.",
      [["Lactose mal toléré", "Sans lactose"], ["Besoin protéique", "Skyr"], ["Sans lait animal", "Boisson enrichie"]],
      "L'option dépend du besoin et de la tolérance.",
    ],
  ],
  reflections: [
    [
      "Un élève remplace son skyr par une boisson d'amande non enrichie. Que doit-il vérifier ?",
      "Que protéines et calcium restent suffisants",
      ["Que la boisson soit plus claire", "Que le repas n'ait plus de glucides", "Que l'eau soit supprimée"],
      "Certaines boissons végétales apportent peu de protéines et de calcium.",
    ],
    [
      "Quel choix est pertinent après une séance si le lactose est bien toléré ?",
      "Fromage blanc, fruit et flocons d'avoine",
      ["Huile seule", "Salade sans protéine", "Soda et bonbons"],
      "La combinaison apporte protéines et glucides utiles.",
    ],
  ],
}, 4);

const fibres = buildLessonQuiz({
  qcms: [
    [
      "Les fibres sont-elles complètement digérées par l'humain ?",
      "Non, pas complètement",
      ["Oui, comme le glucose", "Oui, comme l'alcool", "Elles deviennent toutes protéines"],
      "Une partie résiste à la digestion et nourrit aussi le microbiote.",
    ],
    [
      "Quel effet les fibres ont souvent sur la satiété ?",
      "Elles l'augmentent",
      ["Elles la suppriment totalement", "Elles donnent zéro volume", "Elles empêchent de boire"],
      "Le volume et le ralentissement digestif peuvent aider à mieux tenir entre les repas.",
    ],
    [
      "Quel système bénéficie d'un apport régulier en fibres ?",
      "Le transit intestinal",
      ["La vision nocturne uniquement", "La taille des os", "La fréquence cardiaque seule"],
      "Les fibres participent à un transit plus régulier.",
    ],
    [
      "Quel aliment est riche en fibres ?",
      "Lentilles",
      ["Huile", "Sucre blanc", "Blanc d'oeuf"],
      "Les légumineuses sont des sources importantes de fibres.",
    ],
    [
      "Pourquoi augmenter les fibres progressivement ?",
      "Pour limiter les inconforts digestifs",
      ["Pour annuler les calories", "Pour éviter toute hydratation", "Pour perdre du muscle"],
      "Une hausse trop rapide peut causer ballonnements ou gêne.",
    ],
    [
      "Quel élément accompagne bien une hausse des fibres ?",
      "Boire suffisamment d'eau",
      ["Supprimer les légumes", "Ne plus marcher", "Manger plus vite"],
      "L'eau aide les fibres à soutenir le transit.",
    ],
    [
      "Quel petit-déjeuner augmente les fibres ?",
      "Flocons d'avoine et fruit",
      ["Croissant seul", "Soda", "Beurre seul"],
      "L'avoine et le fruit apportent fibres et glucides.",
    ],
    [
      "Quel repère est réaliste pour les fibres ?",
      "Les augmenter par petites étapes",
      ["Doubler du jour au lendemain", "Les éviter toute l'année", "Les remplacer par de la caféine"],
      "La progression améliore la tolérance.",
    ],
  ],
  tfs: [
    ["Les fibres peuvent ralentir la digestion.", true, "Cela explique une partie de leur effet sur la satiété."],
    ["Plus de fibres d'un coup est toujours mieux.", false, "La tolérance digestive impose souvent une progression."],
    ["Les fibres existent dans les légumes, fruits, céréales complètes et légumineuses.", true, "Ces familles sont de bons repères."],
    ["Les fibres remplacent le besoin en protéines.", false, "Elles ont un autre rôle dans l'équilibre alimentaire."],
  ],
  multis: [
    [
      "Quelles sources apportent des fibres ?",
      ["Haricots rouges", "Pain complet"],
      ["Huile", "Poulet"],
      "Les végétaux peu raffinés sont les meilleures sources.",
    ],
    [
      "Quelles habitudes aident à mieux tolérer les fibres ?",
      ["Augmenter progressivement", "Boire assez d'eau"],
      ["Tout ajouter en une journée", "Manger toujours sans légumes"],
      "Progression et hydratation réduisent les gênes.",
    ],
  ],
  orders: [
    [
      "Augmente les fibres sans inconfort majeur.",
      ["Ajouter une petite portion", "Boire suffisamment", "Réévaluer la digestion"],
      "La tolérance se construit progressivement.",
    ],
    [
      "Améliore un repas pauvre en fibres.",
      ["Repérer l'absence de végétaux", "Ajouter légume ou légumineuse", "Garder une portion adaptée"],
      "Une modification simple peut améliorer satiété et transit.",
    ],
  ],
  matches: [
    [
      "Associe aliment et apport.",
      [["Lentilles", "Fibres + protéines végétales"], ["Pomme", "Fibres + eau"], ["Avoine", "Fibres + glucides"]],
      "Les aliments riches en fibres apportent souvent plusieurs nutriments.",
    ],
    [
      "Associe effet et explication.",
      [["Satiété", "Volume"], ["Transit", "Régularité"], ["Inconfort initial", "Hausse trop rapide"]],
      "Les fibres sont utiles, mais leur dose compte.",
    ],
  ],
  reflections: [
    [
      "Une personne passe de zéro légumineuse à deux grosses portions par jour et se sent ballonnée. Que conseiller ?",
      "Réduire puis progresser plus lentement avec assez d'eau",
      ["Arrêter toute protéine", "Ne plus boire", "Ajouter plus de sucre"],
      "La progression est souvent la clé de la tolérance.",
    ],
    [
      "Quel changement simple améliore un sandwich très raffiné ?",
      "Ajouter crudités et pain plus complet",
      ["Retirer toute garniture protéinée", "Ajouter seulement de l'huile", "Le remplacer par un soda"],
      "On augmente les fibres sans perdre la structure du repas.",
    ],
  ],
}, 5);

const hydratation = buildLessonQuiz({
  qcms: [
    [
      "Quelle boisson doit rester la base de l'hydratation ?",
      "L'eau",
      ["Soda", "Alcool", "Boisson énergisante"],
      "L'eau couvre l'essentiel des besoins sans calories ni stimulants.",
    ],
    [
      "Quel repère estime souvent les besoins quotidiens en eau ?",
      "30 à 40 ml par kg",
      ["1 ml par kg", "300 ml par kg", "Aucune eau si on mange"],
      "Ce repère reste une estimation à ajuster selon chaleur et activité.",
    ],
    [
      "Pour une séance de moins de 90 minutes, que suffit souvent-il de boire ?",
      "De l'eau",
      ["Un soda obligatoire", "De l'alcool léger", "Aucune boisson"],
      "Pour une séance classique, l'eau suffit dans la plupart des cas.",
    ],
    [
      "Quel signe peut suggérer une hydratation insuffisante ?",
      "Urines très foncées",
      ["Ongles longs", "Cheveux courts", "Chaussures serrées"],
      "La couleur des urines est un repère imparfait mais pratique.",
    ],
    [
      "Quel facteur augmente les besoins en eau ?",
      "La chaleur",
      ["Le sommeil seul", "Une assiette plus colorée", "Le fait de manger lentement"],
      "Chaleur et transpiration augmentent les pertes hydriques.",
    ],
    [
      "Pourquoi boire autour de l'entraînement ?",
      "Pour compenser une partie des pertes",
      ["Pour remplacer les protéines", "Pour annuler les courbatures", "Pour créer du glycogène"],
      "La transpiration peut réduire l'eau corporelle disponible.",
    ],
    [
      "Quel aliment contribue aussi à l'hydratation ?",
      "Pastèque",
      ["Huile", "Noix seules", "Chocolat noir uniquement"],
      "Certains fruits et légumes apportent beaucoup d'eau.",
    ],
    [
      "Quel ajustement est pertinent si la séance est longue et très chaude ?",
      "Prévoir davantage d'eau et parfois électrolytes",
      ["Arrêter de boire", "Boire seulement après 24 h", "Supprimer tous les glucides"],
      "Les pertes en sueur peuvent justifier un plan plus précis.",
    ],
  ],
  tfs: [
    ["L'eau est la boisson de référence au quotidien.", true, "Elle hydrate sans sucre ajouté ni alcool."],
    ["La formule 30-40 ml/kg est une vérité exacte pour tous.", false, "C'est une estimation à ajuster au contexte."],
    ["Une séance courte impose toujours une boisson sucrée.", false, "L'eau suffit souvent sous 90 minutes."],
    ["Les fruits et légumes peuvent contribuer à l'apport en eau.", true, "Ils ne remplacent pas tout, mais participent."],
  ],
  multis: [
    [
      "Quels facteurs augmentent les besoins en eau ?",
      ["Transpiration", "Chaleur"],
      ["Moins de mouvement", "Repas plus froid uniquement"],
      "Les pertes par sueur modifient les besoins.",
    ],
    [
      "Quels repères aident à suivre l'hydratation ?",
      ["Couleur des urines", "Soif et contexte d'activité"],
      ["Nombre de likes", "Couleur de la gourde"],
      "Aucun repère n'est parfait, mais ils guident les ajustements.",
    ],
  ],
  orders: [
    [
      "Planifie l'eau d'une journée active.",
      ["Estimer un besoin de base", "Ajouter selon chaleur et séance", "Répartir les prises"],
      "Répartir évite de tout boire trop tard.",
    ],
    [
      "Gère l'hydratation pendant une séance classique.",
      ["Arriver déjà hydraté", "Boire par petites gorgées", "Réhydrater après si besoin"],
      "L'objectif est de limiter les pertes sans inconfort.",
    ],
  ],
  matches: [
    [
      "Associe situation et choix.",
      [["Journée normale", "Eau régulière"], ["Séance courte", "Eau"], ["Long effort chaud", "Eau + électrolytes possibles"]],
      "Le choix dépend de la durée, de l'intensité et de la chaleur.",
    ],
    [
      "Associe repère et signification.",
      [["Soif forte", "Signal tardif possible"], ["Urines pâles", "Hydratation souvent correcte"], ["Transpiration", "Pertes à compenser"]],
      "Ces indicateurs guident sans remplacer le bon sens.",
    ],
  ],
  reflections: [
    [
      "Un pratiquant boit seulement pendant la séance et très peu le reste du jour. Quel conseil est prioritaire ?",
      "Répartir l'eau sur la journée",
      ["Boire tout en une fois le soir", "Remplacer par du soda", "Ne boire qu'après la séance"],
      "L'hydratation quotidienne se construit avant l'entraînement.",
    ],
    [
      "Pour 70 kg, quelle estimation de base est cohérente avec 30-40 ml/kg ?",
      "Environ 2,1 à 2,8 litres",
      ["0,2 litre", "10 litres obligatoires", "Aucune eau si fruits"],
      "70 x 30-40 ml donne un ordre de grandeur, à ajuster.",
    ],
  ],
}, 6);

const journeeEquilibree = buildLessonQuiz({
  qcms: [
    [
      "Quel repère simple structure une assiette équilibrée ?",
      "Demi légumes, quart protéines, quart féculents",
      ["Tout protéines", "Tout légumes", "Tout matières grasses"],
      "Ce repère aide à équilibrer sans compter chaque gramme.",
    ],
    [
      "Pourquoi commencer par la structure avant les quantités ?",
      "Pour poser une base cohérente",
      ["Pour ignorer les calories à vie", "Pour supprimer les protéines", "Pour éviter toute progression"],
      "Une bonne structure rend les ajustements plus simples ensuite.",
    ],
    [
      "Quel élément complète souvent l'assiette en petite quantité ?",
      "Une matière grasse de qualité",
      ["Un litre de soda", "Un bonbon obligatoire", "Aucune boisson"],
      "Les lipides utiles ont leur place, mais la portion compte.",
    ],
    [
      "Quel repas respecte le mieux le repère d'assiette ?",
      "Poulet, riz, brocoli et huile d'olive",
      ["Riz seul", "Salade seule", "Fromage seul"],
      "Il rassemble protéines, féculents, légumes et lipides.",
    ],
    [
      "Quel rôle a le quart protéiné ?",
      "Soutenir maintien et récupération musculaire",
      ["Remplacer l'eau", "Apporter uniquement des fibres", "Supprimer la faim pour toujours"],
      "La protéine est importante pour le muscle, surtout avec l'entraînement.",
    ],
    [
      "Quel rôle a le quart féculent ?",
      "Fournir de l'énergie",
      ["Créer toutes les vitamines", "Remplacer les légumes", "Éliminer les lipides"],
      "Les glucides aident à couvrir les besoins énergétiques.",
    ],
    [
      "Quel rôle a la moitié de légumes ?",
      "Apporter volume, fibres et micronutriments",
      ["Apporter toute la créatine", "Remplacer le sommeil", "Supprimer les calories du repas"],
      "Les légumes améliorent la densité nutritionnelle et la satiété.",
    ],
    [
      "Comment adapter l'assiette à une séance très intense ?",
      "Augmenter un peu les féculents si besoin",
      ["Retirer toute eau", "Retirer toutes les protéines", "Ne manger que des légumes"],
      "Le repère reste flexible selon l'activité.",
    ],
  ],
  tfs: [
    ["La structure de l'assiette peut guider sans peser les aliments.", true, "C'est un outil pratique pour débuter."],
    ["Une assiette équilibrée interdit les féculents.", false, "Les féculents ont leur place, surtout chez les sportifs."],
    ["Les quantités peuvent être ajustées après la structure.", true, "Objectif, faim et activité guident les portions."],
    ["Une journée équilibrée se juge sur un seul aliment isolé.", false, "C'est l'ensemble de la journée et de la semaine qui compte."],
  ],
  multis: [
    [
      "Quels éléments composent une assiette équilibrée classique ?",
      ["Source de protéines", "Légumes"],
      ["Alcool", "Bonbons obligatoires"],
      "Protéines, légumes, féculents et lipides structurent le repas.",
    ],
    [
      "Quels facteurs peuvent ajuster les portions ?",
      ["Objectif physique", "Niveau d'activité"],
      ["Couleur de l'assiette", "Marque des couverts"],
      "Les portions ne sont pas identiques pour tous.",
    ],
  ],
  orders: [
    [
      "Construis une assiette équilibrée.",
      ["Remplir la moitié avec des légumes", "Ajouter un quart de protéines", "Compléter avec féculents et lipides dosés"],
      "La structure donne une base facile à répéter.",
    ],
    [
      "Ajuste une journée pour la musculation.",
      ["Assurer protéines à chaque repas clé", "Placer des glucides autour de l'effort", "Compléter avec légumes, eau et lipides"],
      "L'équilibre soutient autant l'énergie que la récupération.",
    ],
  ],
  matches: [
    [
      "Associe partie de l'assiette et rôle.",
      [["Demi légumes", "Fibres et micros"], ["Quart protéines", "Récupération"], ["Quart féculents", "Énergie"]],
      "Chaque zone répond à un besoin différent.",
    ],
    [
      "Associe repas et amélioration.",
      [["Pâtes seules", "Ajouter protéines et légumes"], ["Salade seule", "Ajouter protéines et féculents"], ["Poulet seul", "Ajouter légumes et énergie"]],
      "L'équilibre vient de la complémentarité.",
    ],
  ],
  reflections: [
    [
      "Un débutant veut tout peser mais oublie légumes et protéines. Que lui proposer d'abord ?",
      "Structurer l'assiette avec les grands groupes",
      ["Compter seulement les épices", "Supprimer les repas", "Ne garder que les féculents"],
      "La structure crée une base avant les réglages fins.",
    ],
    [
      "Quel déjeuner est le plus cohérent avant une séance jambes ?",
      "Riz, dinde, légumes et huile d'olive",
      ["Concombre seul", "Bonbons seuls", "Beurre et fromage seuls"],
      "Il apporte énergie, protéines et micronutriments.",
    ],
  ],
}, 7);

export const THEME_2_QUIZZES: SeedQuestion[][] = [
  fruitsEtLegumes,
  feculents,
  sourcesProteines,
  matieresGrasses,
  laitiers,
  fibres,
  hydratation,
  journeeEquilibree,
];
