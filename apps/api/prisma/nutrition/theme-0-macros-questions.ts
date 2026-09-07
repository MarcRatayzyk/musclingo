import type { SeedQuestion } from "../anatomie-quiz-helpers";
import { qcm, tf, multi, order, match } from "../anatomie-quiz-helpers";
import { quiz20 } from "./quiz-bank";

export const THEME_0_QUIZZES: SeedQuestion[][] = [
  quiz20(
    qcm(
      "Une kcal sert à mesurer quoi dans un aliment ?",
      "L'énergie qu'il apporte",
      ["Sa masse en grammes", "Sa quantité d'eau", "Sa teneur en vitamines"],
      "La kcal est une unité d'énergie alimentaire.",
    ),
    qcm(
      "Quel nutriment apporte 9 kcal par gramme ?",
      "Les lipides",
      ["Les protéines", "Les glucides", "L'eau"],
      "Les lipides sont plus denses en énergie que protéines et glucides.",
    ),
    qcm(
      "1 g de protéines apporte environ...",
      "4 kcal",
      ["9 kcal", "0 kcal", "12 kcal"],
      "Les protéines apportent environ 4 kcal par gramme.",
    ),
    qcm(
      "Même au repos, ton corps dépense de l'énergie pour...",
      "Respirer et faire fonctionner les organes",
      ["Construire uniquement du muscle", "Transformer l'eau en calories", "Stocker seulement du gras"],
      "La dépense énergétique existe aussi hors entraînement.",
    ),
    qcm(
      "À poids égal, l'aliment le plus calorique est souvent celui qui contient plus de...",
      "Lipides",
      ["Eau", "Fibres seules", "Minéraux"],
      "Les lipides apportent 9 kcal/g, contre 4 pour protéines et glucides.",
    ),
    qcm(
      "En musculation, un apport calorique trop bas peut surtout gêner...",
      "La récupération après les séries",
      ["La couleur des haltères", "La mesure des vitamines", "La digestion de l'eau"],
      "Réparer et construire le muscle demande de l'énergie.",
    ),
    qcm(
      "Quel duo apporte 4 kcal par gramme ?",
      "Protéines et glucides",
      ["Lipides et eau", "Vitamines et minéraux", "Lipides et protéines"],
      "Protéines et glucides ont la même densité énergétique de base.",
    ),
    qcm(
      "Relier assiette et effort commence par comprendre...",
      "Les calories consommées et dépensées",
      ["Uniquement le poids des aliments", "La couleur des repas", "Le nombre d'exercices par muscle"],
      "Les calories permettent de comparer apport alimentaire et dépense du corps.",
    ),
    tf(
      "Les lipides apportent plus de kcal par gramme que les glucides.",
      true,
      "Vrai : 9 kcal/g pour les lipides contre 4 kcal/g pour les glucides.",
    ),
    tf(
      "Le corps dépense de l'énergie seulement pendant le sport.",
      false,
      "Faux : il dépense aussi pour respirer, digérer et fonctionner au repos.",
    ),
    tf(
      "Construire et réparer du muscle coûte de l'énergie.",
      true,
      "Vrai : la récupération musculaire demande des calories.",
    ),
    tf(
      "Une kcal indique directement la quantité de muscle dans un aliment.",
      false,
      "Faux : elle mesure l'énergie, pas le muscle.",
    ),
    multi(
      "Quelles situations utilisent de l'énergie dans la journée ?",
      ["Digérer un repas", "S'entraîner à la salle", "Respirer au repos"],
      ["Mesurer la taille d'une assiette"],
      "Le corps dépense de l'énergie pour ses fonctions vitales et l'activité.",
    ),
    multi(
      "Quels repères kcal/g sont corrects ?",
      ["1 g de protéines = 4 kcal", "1 g de glucides = 4 kcal", "1 g de lipides = 9 kcal"],
      ["1 g d'eau = 9 kcal"],
      "Les trois macronutriments énergétiques n'ont pas tous la même densité.",
    ),
    order(
      "Remets le lien énergie-muscle dans l'ordre.",
      ["Tu manges des aliments", "Ils apportent des kcal", "Le corps utilise cette énergie pour récupérer"],
      "L'énergie alimentaire sert ensuite aux fonctions du corps, dont la récupération.",
    ),
    order(
      "Pour comparer deux aliments, quelle démarche est logique ?",
      ["Regarder les macronutriments", "Identifier leur densité kcal/g", "Estimer l'énergie totale apportée"],
      "Les kcal viennent des macronutriments et de leur quantité.",
    ),
    match(
      "Associe chaque repère à son idée.",
      [
        ["Kcal", "Énergie alimentaire"],
        ["Lipides", "9 kcal/g"],
        ["Protéines", "4 kcal/g"],
      ],
      "Ces repères aident à lire l'énergie d'un repas.",
    ),
    match(
      "Associe dépense et exemple.",
      [
        ["Fonction vitale", "Respirer"],
        ["Activité sportive", "S'entraîner"],
        ["Récupération", "Réparer le muscle"],
      ],
      "La dépense énergétique couvre le repos, l'effort et la récupération.",
    ),
    qcm(
      "Tu manges peu avant une séance lourde et récupères mal. Quelle piste est cohérente ?",
      "L'apport en énergie peut être insuffisant",
      ["Les calories ne concernent pas la musculation", "Les lipides ne comptent jamais", "La récupération ne dépend pas du corps"],
      "Sans assez d'énergie, la récupération peut devenir plus difficile.",
    ),
    qcm(
      "Deux collations ont le même poids. Celle riche en graisses sera souvent...",
      "Plus dense en calories",
      ["Toujours sans énergie", "Identique en kcal quoi qu'il arrive", "Moins énergétique que l'eau"],
      "À poids égal, plus de lipides augmente souvent les kcal.",
    ),
  ),
  quiz20(
    qcm(
      "Les protéines sont digérées en...",
      "Acides aminés",
      ["Glucose", "Glycogène", "Sodium"],
      "La digestion découpe les protéines en acides aminés.",
    ),
    qcm(
      "Dans le muscle, les acides aminés servent surtout à...",
      "Réparer et construire les tissus",
      ["Stocker l'eau", "Produire du glycogène", "Remplacer les lipides"],
      "Les protéines fournissent des matériaux pour les tissus.",
    ),
    qcm(
      "En musculation, l'entraînement joue surtout le rôle de...",
      "Signal pour adapter le muscle",
      ["Réserve de protéines", "Source directe d'acides aminés", "Substitut au repas"],
      "L'entraînement donne le signal, l'alimentation apporte les matériaux.",
    ),
    qcm(
      "Le corps stocke les protéines comme réserve longue durée ?",
      "Non, il n'a pas de réserve protéique dédiée",
      ["Oui, dans le glycogène", "Oui, dans l'eau", "Oui, uniquement la nuit"],
      "L'excédent de protéines n'est pas gardé comme stock spécifique.",
    ),
    qcm(
      "Pour couvrir ses besoins, le plus important est souvent...",
      "Le total de protéines sur la journée",
      ["La minute exacte du repas", "Manger sans glucides", "Ne manger qu'après 22 h"],
      "Le total journalier compte plus que le timing parfait.",
    ),
    qcm(
      "Sans apport protéique suffisant, la réparation des fibres sollicitées peut être...",
      "Limitée",
      ["Automatique et maximale", "Remplacée par l'eau", "Assurée par le sodium"],
      "Les fibres ont besoin de matériaux pour se réparer.",
    ),
    qcm(
      "Quel énoncé décrit le mieux les protéines ?",
      "Des matériaux de construction et réparation",
      ["Le carburant principal des séries intenses", "Une vitamine liposoluble", "Une réserve d'eau"],
      "Elles participent surtout à la structure et à la réparation.",
    ),
    qcm(
      "Si tu répartis tes protéines sur la journée, l'objectif principal est de...",
      "Atteindre un total suffisant",
      ["Créer une réserve infinie", "Éliminer le besoin d'entraînement", "Transformer le muscle en glycogène"],
      "Le total quotidien reste le repère central pour débuter.",
    ),
    tf(
      "Les protéines fournissent des acides aminés.",
      true,
      "Vrai : ce sont les briques issues de leur digestion.",
    ),
    tf(
      "Manger des protéines fait automatiquement prendre du muscle sans entraînement.",
      false,
      "Faux : l'entraînement donne le signal d'adaptation.",
    ),
    tf(
      "Le corps ne garde pas un grand stock de protéines pour plus tard.",
      true,
      "Vrai : il n'existe pas de réserve protéique dédiée.",
    ),
    tf(
      "L'heure exacte du repas compte toujours plus que le total de la journée.",
      false,
      "Faux : le total journalier est le repère prioritaire.",
    ),
    multi(
      "Quels rôles sont associés aux protéines ?",
      ["Fournir des acides aminés", "Aider à réparer les tissus", "Participer à construire le muscle"],
      ["Former le glycogène musculaire"],
      "Les protéines apportent des matériaux, pas la réserve principale de glucides.",
    ),
    multi(
      "Que faut-il retenir pour progresser en musculation ?",
      ["L'entraînement envoie un signal", "Les protéines apportent des matériaux", "Le total journalier compte"],
      ["Les protéines se stockent comme une réserve spéciale"],
      "Signal et matériaux doivent aller ensemble.",
    ),
    order(
      "Remets le trajet des protéines dans l'ordre.",
      ["Tu manges une source de protéines", "La digestion libère des acides aminés", "Le corps les utilise pour réparer les tissus"],
      "Les acides aminés sont utilisés après digestion.",
    ),
    order(
      "Pour soutenir la réparation après une séance, quelle suite est logique ?",
      ["S'entraîner crée un signal", "Apporter assez de protéines dans la journée", "Les fibres disposent de matériaux pour se réparer"],
      "Le signal seul ne suffit pas sans matériaux disponibles.",
    ),
    match(
      "Associe chaque terme à son idée.",
      [
        ["Protéines", "Sources d'acides aminés"],
        ["Acides aminés", "Briques des tissus"],
        ["Entraînement", "Signal d'adaptation"],
      ],
      "Ces trois éléments expliquent le rôle des protéines en musculation.",
    ),
    match(
      "Associe l'idée au bon repère.",
      [
        ["Total journalier", "Priorité pratique"],
        ["Pas de réserve", "Apport régulier utile"],
        ["Réparation", "Fibres sollicitées"],
      ],
      "Le cours insiste sur le total, l'absence de réserve et la réparation.",
    ),
    qcm(
      "Tu as fait une séance mais ton apport protéique de la journée est très bas. Que manque-t-il surtout ?",
      "Des matériaux pour réparer les fibres",
      ["Un signal d'entraînement", "Une réserve de glycogène protéique", "Une vitamine qui remplace les protéines"],
      "L'entraînement donne le signal, mais les protéines apportent les briques.",
    ),
    qcm(
      "Quel raisonnement est le plus juste pour un débutant ?",
      "Chercher un apport protéique suffisant sur la journée",
      ["Tout miser sur une seule minute après la séance", "Penser que plus aucune calorie ne compte", "Supprimer l'entraînement si les protéines sont hautes"],
      "Le total de la journée est un repère simple et fiable.",
    ),
  ),
  quiz20(
    qcm(
      "Les glucides sont digérés principalement en...",
      "Glucose",
      ["Acides aminés", "Vitamines", "Calcium"],
      "Le glucose est la forme utilisée comme énergie.",
    ),
    qcm(
      "Le glycogène est une réserve de...",
      "Glucose",
      ["Protéines", "Lipides", "Eau"],
      "Le glycogène correspond à du glucose stocké.",
    ),
    qcm(
      "Le glycogène se stocke surtout dans...",
      "Les muscles et le foie",
      ["Les cheveux et les ongles", "Les os uniquement", "La sueur"],
      "Ces réserves servent à fournir de l'énergie.",
    ),
    qcm(
      "Pendant une série lourde, le muscle utilise surtout...",
      "Son propre glycogène",
      ["Le calcium des os", "Les protéines stockées", "L'eau comme carburant"],
      "Le muscle puise dans sa réserve locale de glycogène.",
    ),
    qcm(
      "Les glucides sont particulièrement utiles quand...",
      "L'intensité de l'effort monte",
      ["Tu veux remplacer l'eau", "Tu veux supprimer les calories", "Tu ne bouges jamais"],
      "Ils fournissent un carburant efficace pour l'effort intense.",
    ),
    qcm(
      "Si les réserves de glycogène sont basses, tu risques surtout de...",
      "Fatiguer plus vite",
      ["Avoir plus de protéines stockées", "Ne plus transpirer", "Absorber plus de vitamine D"],
      "Moins de glycogène peut réduire les reps et la performance.",
    ),
    qcm(
      "Quel énoncé évite le mythe sur les glucides ?",
      "Ils ne font pas grossir automatiquement",
      ["Ils font toujours grossir", "Ils n'apportent jamais d'énergie", "Ils remplacent toute récupération"],
      "La prise de gras dépend surtout de l'excès calorique global.",
    ),
    qcm(
      "Autour de l'entraînement, les glucides peuvent aider à...",
      "Avoir de l'énergie pour les séries",
      ["Créer directement des hormones", "Remplacer les acides aminés", "Annuler le besoin de sommeil"],
      "Le cours présente les glucides comme carburant de l'effort.",
    ),
    tf(
      "Les glucides sont transformés en glucose.",
      true,
      "Vrai : c'est leur forme énergétique principale.",
    ),
    tf(
      "Le glycogène musculaire est inutile pendant une série intense.",
      false,
      "Faux : il sert justement de réserve locale.",
    ),
    tf(
      "Le foie et les muscles stockent du glycogène.",
      true,
      "Vrai : ce sont les deux lieux cités dans le cours.",
    ),
    tf(
      "Les glucides font grossir quelle que soit la quantité totale de calories.",
      false,
      "Faux : il faut regarder l'équilibre énergétique global.",
    ),
    multi(
      "Quels éléments décrivent les glucides ?",
      ["Ils deviennent du glucose", "Ils alimentent l'effort intense", "Ils peuvent être stockés en glycogène"],
      ["Ils sont la réserve de protéines du corps"],
      "Les glucides sont liés au glucose, au glycogène et à l'énergie.",
    ),
    multi(
      "Où trouve-t-on les réserves de glycogène citées ?",
      ["Dans les muscles", "Dans le foie"],
      ["Dans les cheveux"],
      "Le cours cite surtout muscles et foie.",
    ),
    order(
      "Remets le parcours des glucides dans l'ordre.",
      ["Tu manges des glucides", "Ils deviennent du glucose", "Le glucose peut servir d'énergie ou être stocké en glycogène"],
      "Les glucides passent par le glucose avant usage ou stockage.",
    ),
    order(
      "Pendant une séance intense, quelle suite est logique ?",
      ["Le muscle démarre la série", "Il puise dans son glycogène", "La fatigue arrive plus vite si la réserve est basse"],
      "Le glycogène disponible influence la capacité à enchaîner les efforts.",
    ),
    match(
      "Associe chaque terme.",
      [
        ["Glucides", "Source de glucose"],
        ["Glycogène", "Glucose stocké"],
        ["Effort intense", "Besoin rapide d'énergie"],
      ],
      "Ces associations résument le rôle énergétique des glucides.",
    ),
    match(
      "Associe réserve et lieu.",
      [
        ["Muscle", "Glycogène local"],
        ["Foie", "Stock de glycogène"],
      ],
      "Le glycogène se trouve surtout dans les muscles et le foie.",
    ),
    qcm(
      "Tu fais moins de reps que d'habitude avec peu de glucides depuis la veille. Quelle explication colle au cours ?",
      "Les réserves de glycogène peuvent être plus basses",
      ["Les glucides ont détruit les protéines", "Le foie ne stocke jamais d'énergie", "La sueur a remplacé le glucose"],
      "Des réserves basses peuvent faire fatiguer plus vite.",
    ),
    qcm(
      "Quel conseil est le plus nuancé ?",
      "Adapter les glucides à l'effort et aux calories totales",
      ["Les interdire car ils font toujours grossir", "En manger annule tout excès calorique", "Les remplacer par de l'eau pour l'énergie"],
      "Les glucides sont utiles, mais le total calorique reste important.",
    ),
  ),
  quiz20(
    qcm(
      "Les lipides entrent dans la composition...",
      "Des cellules",
      ["Du glycogène", "De l'eau", "Du sodium"],
      "Les graisses font partie des structures cellulaires.",
    ),
    qcm(
      "Les lipides aident aussi à fabriquer...",
      "Des hormones",
      ["Du glucose uniquement", "Des os directement", "De la sueur"],
      "Ils participent à la production hormonale.",
    ),
    qcm(
      "Quelles vitamines s'absorbent mieux avec des graisses ?",
      "A, D, E et K",
      ["B et C", "Sodium et potassium", "Fer et zinc"],
      "Les vitamines A, D, E et K sont liposolubles.",
    ),
    qcm(
      "1 g de lipide apporte environ...",
      "9 kcal",
      ["4 kcal", "0 kcal", "2 kcal"],
      "Les lipides sont les macronutriments les plus denses en énergie.",
    ),
    qcm(
      "Les lipides ralentissent souvent la digestion, ce qui peut augmenter...",
      "La satiété",
      ["La perte d'eau", "Le stockage de protéines", "La création de calcium"],
      "Une digestion plus lente peut aider à se sentir rassasié plus longtemps.",
    ),
    qcm(
      "Supprimer toutes les graisses peut poser problème pour...",
      "Les cellules, hormones et vitamines ADEK",
      ["La couleur des aliments", "La forme des haltères", "Le comptage des pas"],
      "Le cours présente les lipides comme utiles à plusieurs fonctions vitales.",
    ),
    qcm(
      "Pourquoi les lipides sont-ils dits plus denses ?",
      "Ils apportent plus de kcal par gramme",
      ["Ils contiennent toujours plus d'eau", "Ils remplacent les protéines", "Ils ne se digèrent pas"],
      "9 kcal/g est plus élevé que 4 kcal/g.",
    ),
    qcm(
      "Un repas avec un peu de lipides peut aider à absorber...",
      "La vitamine D",
      ["Le glycogène musculaire", "Le sodium de la sueur", "Les protéines stockées"],
      "La vitamine D fait partie des vitamines liposolubles.",
    ),
    tf(
      "Les lipides servent uniquement à stocker du gras corporel.",
      false,
      "Faux : ils soutiennent aussi cellules, hormones et vitamines.",
    ),
    tf(
      "Les vitamines A, D, E et K sont liées à l'absorption avec des graisses.",
      true,
      "Vrai : ce sont des vitamines liposolubles.",
    ),
    tf(
      "Les lipides apportent moins de calories par gramme que les glucides.",
      false,
      "Faux : ils apportent 9 kcal/g contre 4 pour les glucides.",
    ),
    tf(
      "Les lipides peuvent prolonger la satiété.",
      true,
      "Vrai : ils ralentissent souvent la digestion.",
    ),
    multi(
      "Quels rôles appartiennent aux lipides ?",
      ["Participer aux membranes cellulaires", "Aider à fabriquer des hormones", "Favoriser l'absorption des vitamines ADEK"],
      ["Stocker le glycogène dans le muscle"],
      "Les lipides ont des rôles structurels, hormonaux et vitaminiques.",
    ),
    multi(
      "Quels énoncés sont corrects ?",
      ["1 g de lipide = 9 kcal", "Les lipides peuvent aider la satiété", "Les lipides sont utiles au corps"],
      ["Les lipides n'ont aucune fonction vitale"],
      "Les lipides sont énergétiques et fonctionnels.",
    ),
    order(
      "Pour absorber une vitamine liposoluble, quelle suite est logique ?",
      ["Le repas contient une vitamine ADEK", "Il apporte aussi des lipides", "L'absorption de cette vitamine est facilitée"],
      "Les vitamines liposolubles s'absorbent mieux avec des graisses.",
    ),
    order(
      "Remets l'effet satiété dans l'ordre.",
      ["Tu manges un repas avec des lipides", "La digestion peut être ralentie", "La satiété dure souvent plus longtemps"],
      "Les lipides ralentissent souvent la digestion.",
    ),
    match(
      "Associe chaque élément.",
      [
        ["Lipides", "9 kcal/g"],
        ["Vitamines ADEK", "Liposolubles"],
        ["Satiété", "Digestion plus lente"],
      ],
      "Ces repères résument l'intérêt des lipides.",
    ),
    match(
      "Associe rôle et exemple.",
      [
        ["Cellules", "Composition des membranes"],
        ["Hormones", "Fabrication soutenue par les lipides"],
        ["Vitamines", "Absorption des ADEK"],
      ],
      "Les lipides ne servent pas seulement au stockage d'énergie.",
    ),
    qcm(
      "Un débutant veut enlever toutes les graisses pour être plus sec. Quel risque le cours suggère ?",
      "Fragiliser des fonctions utiles comme hormones et absorption des vitamines",
      ["Créer plus de glycogène", "Augmenter automatiquement les reps", "Annuler tous les besoins en calories"],
      "Les lipides ont des rôles nécessaires, même en nutrition sportive.",
    ),
    qcm(
      "Pourquoi une petite portion d'huile peut vite augmenter les kcal d'un repas ?",
      "Parce que les lipides sont très denses en énergie",
      ["Parce que l'huile contient des protéines", "Parce que l'eau apporte 9 kcal/g", "Parce que les vitamines créent des kcal"],
      "Les lipides apportent 9 kcal par gramme.",
    ),
  ),
];
