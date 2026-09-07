import type { SeedQuestion } from "../anatomie-quiz-helpers";
import { qcm, tf, multi, order, match } from "../anatomie-quiz-helpers";
import { quiz20 } from "./quiz-bank";

export const THEME_1_QUIZZES: SeedQuestion[][] = [
  quiz20(
    qcm(
      "Les vitamines sont nécessaires...",
      "En petites quantités",
      ["En très grandes quantités", "Uniquement après une séance", "Seulement si on mange trop de protéines"],
      "Les vitamines sont des micronutriments indispensables à faible dose.",
    ),
    qcm(
      "Les vitamines B et C sont plutôt...",
      "Hydrosolubles",
      ["Liposolubles", "Des minéraux", "Des glucides"],
      "Les vitamines B et C se dissolvent dans l'eau.",
    ),
    qcm(
      "Les vitamines A, D, E et K sont...",
      "Liposolubles",
      ["Hydrosolubles", "Des protéines", "Du glycogène"],
      "Elles s'absorbent avec des graisses et se stockent plus longtemps.",
    ),
    qcm(
      "La vitamine D aide surtout à...",
      "Fixer le calcium sur les os",
      ["Stocker les glucides", "Créer de la sueur", "Remplacer l'eau"],
      "La vitamine D soutient la santé osseuse avec le calcium.",
    ),
    qcm(
      "Les vitamines B participent à...",
      "Transformer les aliments en énergie",
      ["Fabriquer directement du muscle", "Remplacer le sommeil", "Créer du calcium"],
      "Elles interviennent dans le métabolisme énergétique.",
    ),
    qcm(
      "Pourquoi manger varié reste important ?",
      "Pour couvrir différents apports en vitamines",
      ["Pour éviter toutes les calories", "Pour ne manger que des lipides", "Pour remplacer l'entraînement"],
      "Aucun aliment unique ne couvre simplement toute la diversité des vitamines.",
    ),
    qcm(
      "Une carence en vitamines peut freiner...",
      "La récupération ou la solidité osseuse",
      ["La gravité", "La taille des haltères", "La quantité d'eau dans une bouteille"],
      "Le cours relie certaines carences à l'énergie, la récupération et les os.",
    ),
    qcm(
      "Le corps fabrique toutes les vitamines en quantité suffisante ?",
      "Non, elles viennent surtout de l'alimentation",
      ["Oui, toujours", "Oui, seulement pendant le sport", "Non, mais elles sont inutiles"],
      "La plupart doivent être apportées par l'alimentation.",
    ),
    tf(
      "Les vitamines sont des micronutriments.",
      true,
      "Vrai : elles sont nécessaires en petites quantités.",
    ),
    tf(
      "Les vitamines liposolubles s'absorbent mieux avec des graisses.",
      true,
      "Vrai : c'est le cas des vitamines A, D, E et K.",
    ),
    tf(
      "Les vitamines B remplacent les glucides comme source de calories.",
      false,
      "Faux : elles aident à transformer les aliments en énergie, sans remplacer les calories.",
    ),
    tf(
      "Une alimentation variée est inutile si on mange assez de calories.",
      false,
      "Faux : les calories ne garantissent pas tous les micronutriments.",
    ),
    multi(
      "Quelles vitamines sont liposolubles ?",
      ["Vitamine A", "Vitamine D", "Vitamine E", "Vitamine K"],
      ["Vitamine C"],
      "A, D, E et K s'absorbent avec des graisses.",
    ),
    multi(
      "Quels rôles sont associés aux vitamines dans le cours ?",
      ["Soutenir la production d'énergie", "Aider la solidité osseuse", "Participer à la récupération"],
      ["Former le glycogène musculaire"],
      "Les vitamines soutiennent plusieurs fonctions sans être des macronutriments.",
    ),
    order(
      "Pour couvrir ses vitamines, quelle démarche est logique ?",
      ["Manger différents aliments", "Apporter plusieurs familles de vitamines", "Soutenir énergie, os et récupération"],
      "La variété alimentaire aide à couvrir des besoins variés.",
    ),
    order(
      "Remets le lien vitamine D-os dans l'ordre.",
      ["Tu apportes de la vitamine D", "Elle aide à fixer le calcium", "Les os sont mieux soutenus sous charge"],
      "La vitamine D participe à l'utilisation du calcium pour les os.",
    ),
    match(
      "Associe chaque famille.",
      [
        ["Hydrosolubles", "Vitamines B et C"],
        ["Liposolubles", "Vitamines A, D, E, K"],
        ["Vitamine D", "Calcium et os"],
      ],
      "Ces associations reprennent les grandes familles du cours.",
    ),
    match(
      "Associe vitamine et rôle.",
      [
        ["Vitamines B", "Énergie à partir des aliments"],
        ["Vitamine D", "Fixation du calcium"],
      ],
      "Les exemples du cours relient B à l'énergie et D aux os.",
    ),
    qcm(
      "Tu manges assez de calories mais toujours les mêmes aliments. Quel risque reste possible ?",
      "Manquer de certaines vitamines",
      ["Ne plus avoir besoin de micronutriments", "Créer trop de glycogène avec la vitamine D", "Transformer les vitamines en protéines"],
      "Le volume calorique ne remplace pas la variété.",
    ),
    qcm(
      "Un repas totalement sans graisses peut surtout gêner l'absorption de...",
      "Vitamines A, D, E et K",
      ["Vitamines B et C", "Glucose", "Sodium"],
      "Les vitamines liposolubles ont besoin de graisses pour être bien absorbées.",
    ),
  ),
  quiz20(
    qcm(
      "Les minéraux aident notamment à...",
      "Contracter les muscles et équilibrer les fluides",
      ["Remplacer les glucides", "Créer directement des protéines", "Supprimer toute dépense d'énergie"],
      "Ils soutiennent les muscles, les os, les nerfs et les fluides.",
    ),
    qcm(
      "Le calcium sert surtout à...",
      "Structurer les os et aider la contraction",
      ["Stocker le glycogène", "Remplacer l'eau", "Fabriquer les vitamines"],
      "Le calcium est important pour les os et la contraction musculaire.",
    ),
    qcm(
      "Le magnésium participe à...",
      "La production d'énergie et la relaxation musculaire",
      ["La fabrication de sueur uniquement", "La digestion des protéines seule", "La création de lipides"],
      "Le cours relie magnésium, énergie et relaxation musculaire.",
    ),
    qcm(
      "En transpirant, on perd surtout...",
      "De l'eau et du sodium",
      ["Des protéines intactes", "Du calcium osseux", "Du glycogène solide"],
      "La sueur contient de l'eau et des sels minéraux comme le sodium.",
    ),
    qcm(
      "Sodium et potassium aident à réguler...",
      "L'équilibre hydrique et la transmission nerveuse",
      ["Le stockage des vitamines ADEK", "La couleur du muscle", "La fabrication de protéines"],
      "Ce sont des électrolytes importants pour les fluides et les nerfs.",
    ),
    qcm(
      "Un manque de minéraux peut se traduire par...",
      "Fatigue ou crampes",
      ["Une absence totale de calories", "Un surplus automatique de protéines", "Une meilleure contraction garantie"],
      "Le cours cite crampes et fatigue comme signes possibles.",
    ),
    qcm(
      "Quel minéral est lié à la relaxation musculaire ?",
      "Magnésium",
      ["Glucose", "Vitamine C", "Glycogène"],
      "Le magnésium participe à la relaxation musculaire.",
    ),
    qcm(
      "Pour un sportif, supprimer tout le sel sans réflexion peut poser souci car...",
      "Le sodium a un rôle dans l'équilibre hydrique",
      ["Le sodium remplace les protéines", "Le sel apporte toutes les vitamines", "La sueur ne contient jamais de sodium"],
      "Le sodium est utile, même si l'excès n'est pas recherché.",
    ),
    tf(
      "Les minéraux participent à la contraction musculaire.",
      true,
      "Vrai : le calcium, le sodium et le potassium y contribuent.",
    ),
    tf(
      "La sueur fait perdre de l'eau et du sodium.",
      true,
      "Vrai : c'est une perte importante pendant l'effort.",
    ),
    tf(
      "Le calcium sert uniquement à fabriquer de l'énergie.",
      false,
      "Faux : il structure surtout les os et intervient dans la contraction.",
    ),
    tf(
      "Le potassium et le sodium n'ont aucun lien avec les nerfs.",
      false,
      "Faux : ils participent à la transmission nerveuse.",
    ),
    multi(
      "Quels rôles sont associés aux minéraux ?",
      ["Solidifier les os", "Aider les contractions musculaires", "Équilibrer les fluides"],
      ["Fournir 9 kcal/g"],
      "Les minéraux ne fournissent pas d'énergie, mais soutiennent des fonctions clés.",
    ),
    multi(
      "Quels minéraux ou électrolytes sont cités dans le cours ?",
      ["Calcium", "Magnésium", "Sodium", "Potassium"],
      ["Glycogène"],
      "Ces quatre éléments font partie des minéraux mentionnés.",
    ),
    order(
      "Pendant une séance chaude, quelle suite est logique ?",
      ["Tu transpires", "Tu perds de l'eau et du sodium", "L'équilibre hydrique peut être perturbé"],
      "La transpiration modifie les fluides et certains minéraux.",
    ),
    order(
      "Remets le rôle du calcium dans l'ordre.",
      ["Le corps dispose de calcium", "Les os sont structurés", "La contraction musculaire est soutenue"],
      "Le calcium est utile aux os et au muscle.",
    ),
    match(
      "Associe chaque minéral à son rôle.",
      [
        ["Calcium", "Os et contraction"],
        ["Magnésium", "Énergie et relaxation"],
        ["Sodium", "Perte dans la sueur"],
      ],
      "Ces associations suivent les exemples du cours.",
    ),
    match(
      "Associe le duo à son idée.",
      [
        ["Sodium et potassium", "Équilibre hydrique"],
        ["Minéraux", "Muscles et nerfs"],
      ],
      "Les minéraux participent aux contractions, aux nerfs et aux fluides.",
    ),
    qcm(
      "Après une séance très transpirante, penser uniquement aux protéines oublie surtout...",
      "Les pertes d'eau et de sodium",
      ["La création de vitamines par la sueur", "Le stockage de protéines dans les os", "La disparition des glucides du foie"],
      "La transpiration concerne aussi l'hydratation et les sels minéraux.",
    ),
    qcm(
      "Des crampes répétées peuvent faire regarder, entre autres, l'apport en...",
      "Minéraux impliqués dans le muscle",
      ["Vitamine D uniquement", "Calories de l'eau", "Glycogène des cheveux"],
      "Un manque de minéraux peut contribuer à crampes ou fatigue.",
    ),
  ),
  quiz20(
    qcm(
      "Un oligo-élément est nécessaire...",
      "En traces",
      ["En kilogrammes", "Uniquement en boisson", "Jamais dans l'alimentation"],
      "Oligo signifie très petite quantité, mais essentielle.",
    ),
    qcm(
      "Le fer sert surtout à...",
      "Transporter l'oxygène dans le sang",
      ["Stocker les lipides", "Former le glycogène", "Remplacer le calcium"],
      "Le fer participe au transport de l'oxygène vers les tissus.",
    ),
    qcm(
      "Le zinc intervient notamment dans...",
      "La réparation des tissus et l'immunité",
      ["La production de sueur", "Le stockage du glucose", "La fabrication d'eau"],
      "Le zinc soutient réparation et défenses immunitaires.",
    ),
    qcm(
      "L'iode est indispensable au bon fonctionnement...",
      "De la thyroïde",
      ["Du glycogène musculaire", "Des cheveux uniquement", "De la sueur"],
      "L'iode participe au fonctionnement de la thyroïde.",
    ),
    qcm(
      "Avec une alimentation variée, les carences en oligo-éléments sont souvent...",
      "Rares",
      ["Certaines à chaque repas", "Impossibles seulement avec du soda", "Toujours utiles"],
      "Le cours indique que la variété couvre souvent les besoins.",
    ),
    qcm(
      "Les régimes très restrictifs peuvent...",
      "Créer des carences",
      ["Garantir tous les oligo-éléments", "Supprimer le besoin de fer", "Remplacer le zinc par l'eau"],
      "Moins de variété peut limiter certains apports.",
    ),
    qcm(
      "Pourquoi éviter l'excès de suppléments ?",
      "Certains oligo-éléments peuvent devenir dangereux en excès",
      ["Ils deviennent toujours des glucides", "Ils empêchent toute hydratation", "Ils annulent le besoin d'oxygène"],
      "Un besoin en traces ne signifie pas qu'il faut en prendre beaucoup.",
    ),
    qcm(
      "Une fatigue rapide malgré des muscles forts peut évoquer un souci de...",
      "Transport de l'oxygène",
      ["Couleur des aliments", "Stockage de protéines", "Satiété par les lipides"],
      "Le fer aide à transporter l'oxygène ; un manque peut fatiguer.",
    ),
    tf(
      "Les oligo-éléments sont utiles en très petites quantités.",
      true,
      "Vrai : ce sont des minéraux nécessaires en traces.",
    ),
    tf(
      "Le fer aide au transport de l'oxygène.",
      true,
      "Vrai : c'est son rôle principal cité dans le cours.",
    ),
    tf(
      "Plus on prend d'oligo-éléments en supplément, mieux c'est.",
      false,
      "Faux : l'excès peut être dangereux.",
    ),
    tf(
      "L'iode n'a aucun lien avec la thyroïde.",
      false,
      "Faux : il est indispensable à son bon fonctionnement.",
    ),
    multi(
      "Quels oligo-éléments sont cités ?",
      ["Fer", "Zinc", "Iode"],
      ["Glycogène"],
      "Fer, zinc et iode font partie des exemples du cours.",
    ),
    multi(
      "Quels rôles sont corrects ?",
      ["Le fer transporte l'oxygène", "Le zinc aide la réparation", "L'iode soutient la thyroïde"],
      ["Les oligo-éléments apportent 9 kcal/g"],
      "Les oligo-éléments sont fonctionnels, pas énergétiques.",
    ),
    order(
      "Remets le risque d'un régime restrictif dans l'ordre.",
      ["Tu réduis beaucoup la variété", "Certains apports en traces baissent", "Une carence peut apparaître"],
      "La restriction forte peut diminuer des apports essentiels.",
    ),
    order(
      "Remets le lien fer-effort dans l'ordre.",
      ["Le fer est disponible", "L'oxygène circule dans le sang", "L'effort est mieux soutenu"],
      "Le transport de l'oxygène aide à limiter la fatigue rapide.",
    ),
    match(
      "Associe chaque oligo-élément.",
      [
        ["Fer", "Transport de l'oxygène"],
        ["Zinc", "Réparation et immunité"],
        ["Iode", "Thyroïde"],
      ],
      "Ces trois exemples structurent la leçon.",
    ),
    match(
      "Associe l'idée à son repère.",
      [
        ["Oligo", "Très peu"],
        ["Suppléments en excès", "Risque possible"],
        ["Alimentation variée", "Base suffisante le plus souvent"],
      ],
      "Le cours insiste sur de petits besoins et la prudence avec les excès.",
    ),
    qcm(
      "Tu veux prendre du fer sans raison précise pour mieux performer. Quelle réponse est la plus prudente ?",
      "Éviter l'excès et miser d'abord sur une alimentation variée",
      ["Multiplier les doses car plus est toujours mieux", "Remplacer tous les repas par du fer", "Ignorer les apports alimentaires"],
      "Les oligo-éléments sont nécessaires en traces, et l'excès peut être risqué.",
    ),
    qcm(
      "Un sportif très restrictif dans son assiette doit surtout surveiller...",
      "Le risque de manquer de certains oligo-éléments",
      ["La transformation du zinc en glycogène", "La disparition des calories de l'eau", "La création automatique d'iode"],
      "Les restrictions fortes peuvent créer des carences.",
    ),
  ),
  quiz20(
    qcm(
      "L'eau représente environ quelle part du corps adulte ?",
      "60 %",
      ["10 %", "5 %", "100 %"],
      "Le cours donne environ 60 % du corps adulte.",
    ),
    qcm(
      "L'eau sert notamment à...",
      "Transporter les nutriments et réguler la température",
      ["Apporter 4 kcal/g", "Remplacer les protéines", "Créer du glycogène"],
      "L'eau aide au transport, à l'élimination et à la thermorégulation.",
    ),
    qcm(
      "En séance, on perd de l'eau principalement par...",
      "La sueur",
      ["Les os", "Les ongles", "Le glycogène"],
      "La transpiration est une perte hydrique importante.",
    ),
    qcm(
      "Une déshydratation même légère peut baisser...",
      "La force et la concentration",
      ["La quantité de vitamines dans l'air", "Le poids des haltères", "La densité des lipides"],
      "Le cours relie déshydratation, performance et concentration.",
    ),
    qcm(
      "Un repère simple d'hydratation en journée est...",
      "Une urine claire",
      ["Une urine toujours très foncée", "Ne jamais boire", "Avoir soif toute la journée"],
      "Une urine claire est un indicateur pratique.",
    ),
    qcm(
      "La soif est souvent un signal...",
      "Tardif",
      ["Toujours anticipé", "Inutile", "Calorique"],
      "Mieux vaut boire régulièrement que d'attendre la soif forte.",
    ),
    qcm(
      "L'eau apporte combien de calories ?",
      "0 kcal",
      ["4 kcal/g", "9 kcal/g", "20 kcal/g"],
      "L'eau n'est pas un macronutriment énergétique.",
    ),
    qcm(
      "Bien s'hydrater aide surtout à...",
      "Performer et récupérer",
      ["Supprimer les besoins en sommeil", "Créer directement du muscle", "Remplacer tous les minéraux"],
      "L'hydratation soutient l'effort et la récupération.",
    ),
    tf(
      "L'eau transporte des nutriments dans le corps.",
      true,
      "Vrai : c'est l'un de ses rôles principaux.",
    ),
    tf(
      "Attendre d'avoir très soif est toujours la meilleure stratégie.",
      false,
      "Faux : la soif arrive souvent un peu tard.",
    ),
    tf(
      "L'eau aide à réguler la température.",
      true,
      "Vrai : elle participe à la thermorégulation.",
    ),
    tf(
      "L'eau apporte autant de kcal que les glucides.",
      false,
      "Faux : l'eau apporte 0 kcal.",
    ),
    multi(
      "Quels rôles sont associés à l'eau ?",
      ["Transporter les nutriments", "Réguler la température", "Aider à évacuer les déchets"],
      ["Apporter 9 kcal/g"],
      "L'eau soutient le fonctionnement du corps sans apporter de calories.",
    ),
    multi(
      "Quels signes ou situations concernent l'hydratation ?",
      ["Sueur pendant la séance", "Urine claire en journée", "Soif qui arrive tard"],
      ["Stockage de protéines en réserve"],
      "Sueur, urine et soif sont des repères liés à l'eau.",
    ),
    order(
      "Pendant une séance, remets la suite dans l'ordre.",
      ["Tu transpires", "Tu perds de l'eau", "La performance peut baisser si tu ne compenses pas"],
      "La perte hydrique peut réduire force et concentration.",
    ),
    order(
      "Pour gérer l'hydratation, quelle suite est logique ?",
      ["Boire régulièrement", "Observer une urine plutôt claire", "Limiter le risque de déshydratation"],
      "Boire avant la soif forte aide à maintenir l'hydratation.",
    ),
    match(
      "Associe chaque repère.",
      [
        ["Eau corporelle", "Environ 60 %"],
        ["Sueur", "Perte d'eau"],
        ["Urine claire", "Bon signe pratique"],
      ],
      "Ces repères aident à comprendre l'hydratation.",
    ),
    match(
      "Associe rôle et effet.",
      [
        ["Transport", "Nutriments"],
        ["Température", "Régulation"],
        ["Déshydratation", "Force et concentration en baisse"],
      ],
      "L'eau soutient le transport, la température et la performance.",
    ),
    qcm(
      "Tu as soif seulement en fin de séance et tes reps chutent. Que suggère le cours ?",
      "Boire plus régulièrement avant d'avoir très soif",
      ["Attendre encore plus longtemps", "Remplacer l'eau par des lipides", "Chercher des calories dans l'eau"],
      "La soif arrive souvent tard, et la déshydratation peut réduire la performance.",
    ),
    qcm(
      "Si ton urine est souvent très foncée en journée, quel ajustement est cohérent ?",
      "Améliorer ton hydratation régulière",
      ["Supprimer les protéines", "Ajouter des calories à l'eau", "Éviter toute boisson jusqu'à la séance"],
      "Une urine claire est un repère simple d'hydratation correcte.",
    ),
  ),
];
