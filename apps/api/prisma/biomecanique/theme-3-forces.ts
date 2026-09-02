import { CP } from "./checkpoints";
import { buildLesson } from "./build-lesson";

export const THEME_3_LESSONS = [
  buildLesson(
    "Qu'est-ce qu'une force ?",
    "Intensité, direction, sens, point d'application.",
    [
      `Une **force** possède notamment : une **intensité**, une **direction**, un **sens** et un **point d'application**.`,
      `Une charge de 100 kg n'est donc pas simplement « 100 kg de difficulté ». La manière dont cette charge agit sur le corps dépend de sa direction et de sa position.`,
      `En biomécanique, décrire une force complètement permet d'analyser son effet sur les articulations et les muscles.`,
      `À retenir : une force est un vecteur — intensité seule ne suffit pas.`,
    ],
    ["force", "vecteur"],
    CP.forces,
    {
      q1: [
        "Une force se caractérise notamment par…",
        "Intensité, direction, sens et point d'application",
        ["Uniquement sa couleur", "Seulement le nom de l'exercice", "La marque de la salle"],
        "Une force est un vecteur complet.",
      ],
      q2: [
        "100 kg sur la barre ne donnent pas toujours la même difficulté car…",
        "La direction et la position de la charge changent l'effet mécanique",
        ["La gravité disparaît", "Les muscles ne réagissent pas", "La masse change"],
        "Géométrie et direction comptent.",
      ],
      q3: [
        "Le point d'application d'une force correspond à…",
        "L'endroit où la force est exercée",
        ["La fin de la série", "Le nom du muscle", "La fréquence cardiaque"],
        "Où la force s'applique modifie le moment.",
      ],
      blank: [
        "En biomécanique, une force possède une intensité et une ___.",
        "direction",
        ["couleur", "odeur", "saveur"],
        "Direction + sens = vecteur.",
      ],
      tf1: [
        "Décrire une force nécessite plus que son intensité seule.",
        true,
        "Vrai : direction, sens et point d'application comptent.",
      ],
      tf2: [
        "Deux forces de même intensité produisent toujours le même effet.",
        false,
        "Faux : direction et point d'application changent l'effet.",
      ],
      multi: [
        "Quelles caractéristiques définissent une force en biomécanique ? (plusieurs réponses)",
        ["Intensité (magnitude)", "Direction", "Sens", "Point d'application"],
        ["Couleur", "Odeur", "Nom de l'exercice"],
        "Une force est un vecteur complet.",
      ],
      order: [
        "Remets dans l'ordre la description d'une force externe :",
        [
          "Identifier l'objet qui exerce la force (barre, sol…)",
          "Mesurer ou estimer l'intensité",
          "Déterminer direction et sens",
          "Localiser le point d'application sur le corps",
        ],
        "Description complète avant analyse du moment.",
      ],
      match: [
        "Associe caractéristique et exemple :",
        [
          ["Intensité", "100 kg sur la barre"],
          ["Direction", "Verticale vers le bas (gravité)"],
          ["Point d'application", "Mains sur la barre au squat"],
        ],
        "Chaque composante du vecteur force.",
      ],
      scenario: [
        "Deux pratiquants soulèvent 80 kg. L'un pousse verticalement, l'autre pousse obliquement. Même intensité, même effet ?",
        "Non : la composante perpendiculaire au mouvement diffère",
        [
          "Oui : 80 kg = toujours identique",
          "Oui : seul le poids du pratiquant compte",
          "Non : l'intensité change automatiquement",
        ],
        "Direction et point d'application modifient l'effet mécanique.",
      ],
    },
  ),
  buildLesson(
    "La gravité",
    "Force vers le bas et bras de levier.",
    [
      `La **gravité** exerce une force vers le bas. C'est extrêmement important en musculation.`,
      `Un haltère, par exemple, est principalement soumis à la gravité. Modifier la trajectoire du membre par rapport à la **verticale** peut donc changer considérablement le bras de levier et la difficulté.`,
      `C'est pourquoi un même poids peut sembler très différent selon que le bras est tendu latéralement ou proche du corps.`,
      `À retenir : avec des charges libres, la résistance est surtout verticale — la géométrie du membre fait le reste.`,
    ],
    ["gravite", "verticale"],
    CP.forces,
    {
      q1: [
        "La gravité exerce une force…",
        "Vers le bas",
        ["Vers le haut uniquement", "Latéralement seulement", "Sans direction"],
        "C'est la force dominante avec des charges libres.",
      ],
      q2: [
        "Un haltère libre est surtout soumis à…",
        "La gravité",
        ["La magnétosphère", "Le vent en salle", "La rotation de la Terre seule"],
        "La charge « tombe » verticalement.",
      ],
      q3: [
        "Modifier la trajectoire du membre par rapport à la verticale…",
        "Change le bras de levier et la difficulté",
        ["N'a aucun effet", "Supprime la masse", "Annule les muscles"],
        "Géométrie + gravité = moment variable.",
      ],
      blank: [
        "Avec un haltère, la résistance due à la gravité est essentiellement ___.",
        "verticale",
        ["horizontale uniquement", "nulle", "aléatoire sans effet"],
        "Vers le bas = direction de la gravité.",
      ],
      tf1: [
        "Tenir un haltère bras tendu à l'horizontale est souvent plus dur qu'au corps.",
        true,
        "Vrai : le bras de levier augmente au niveau de l'épaule.",
      ],
      tf2: [
        "La gravité n'a presque aucun rôle en musculation avec des haltères.",
        false,
        "Faux : c'est la force externe principale.",
      ],
      multi: [
        "Quelles affirmations sur la gravité en musculation sont correctes ? (plusieurs réponses)",
        ["Elle agit vers le bas", "Elle domine avec les charges libres", "Modifier l'orientation du membre change le bras de levier"],
        ["Elle disparaît en salle", "Elle agit toujours horizontalement", "Elle ne affecte pas les haltères"],
        "Gravité + géométrie = résistance ressentie.",
      ],
      order: [
        "Remets dans l'ordre l'effet de la gravité sur un haltère :",
        [
          "Masse de l'haltère soumise à la gravité",
          "Force verticale vers le bas",
          "Membre orienté par rapport à la verticale",
          "Bras de levier et moment à l'articulation",
        ],
        "Gravité fixe, géométrie variable.",
      ],
      match: [
        "Associe position du bras et effet :",
        [
          ["Bras le long du corps", "Bras de levier réduit à l'épaule"],
          ["Bras horizontal latéralement", "Bras de levier maximal à l'épaule"],
          ["Haltère libre", "Résistance essentiellement verticale"],
        ],
        "Même masse, moment différent selon la position.",
      ],
      scenario: [
        "En élévation latérale, l'haltère semble très lourd bras à l'horizontale mais facile en bas. Quelle explication gravitationnelle ?",
        "Le bras de levier par rapport à la verticale est maximal à l'horizontale",
        [
          "L'haltère grossit en montant",
          "La gravité s'inverse en bas du mouvement",
          "Le deltoïde ne travaille qu'en bas",
        ],
        "Moment externe maximal quand le levier est perpendiculaire à la gravité.",
      ],
    },
  ),
  buildLesson(
    "Les forces de réaction",
    "Le sol te pousse en retour.",
    [
      `Lorsque vous poussez contre le **sol**, le sol exerce une force sur vous. C'est une **force de réaction**.`,
      `Elle est fondamentale dans les exercices comme le **squat**, le **soulevé de terre**, la **presse à cuisses**, les **fentes** et les mouvements athlétiques.`,
      `Sans cette réaction, tu ne pourrais pas te propulser ni stabiliser ta base d'appui sous charge.`,
      `À retenir : chaque poussée contre un support génère une réaction égale et opposée (principe d'action-réaction).`,
    ],
    ["reaction", "sol"],
    CP.forces,
    {
      q1: [
        "Une force de réaction du sol…",
        "S'exerce quand tu pousses contre le sol",
        ["N'existe qu'en apesanteur", "Remplace les muscles", "Supprime la gravité"],
        "Action sur le sol → réaction sur le corps.",
      ],
      q2: [
        "Quel exercice repose fortement sur la force de réaction ?",
        "Le squat",
        ["Le curl allongé sans appui", "L'étirement passif seul", "La respiration"],
        "Pieds au sol = chaîne de réaction.",
      ],
      q3: [
        "La force de réaction permet surtout…",
        "De se propulser et de stabiliser la base d'appui",
        ["De digérer plus vite", "D'augmenter la masse osseuse instantanément", "De supprimer la fatigue"],
        "Sans réaction, pas de poussée efficace.",
      ],
      blank: [
        "Quand tu pousses le sol, le sol te pousse en retour : c'est la force de ___.",
        "réaction",
        ["digestion", "friction nulle", "rotation"],
        "Principe fondamental en chaîne fermée.",
      ],
      tf1: [
        "Le soulevé de terre implique des forces de réaction au sol.",
        true,
        "Vrai : les pieds poussent le sol pour transmettre la force.",
      ],
      tf2: [
        "Les forces de réaction n'interviennent pas dans la presse à cuisses.",
        false,
        "Faux : la plateforme exerce une réaction sur les pieds.",
      ],
      multi: [
        "Quels exercices reposent fortement sur les forces de réaction du sol ? (plusieurs réponses)",
        ["Squat", "Soulevé de terre", "Fentes", "Presse à cuisses"],
        ["Curl allongé sans appui", "Étirement passif", "Respiration seule"],
        "Poussée contre un support = force de réaction.",
      ],
      order: [
        "Remets dans l'ordre l'action-réaction au squat :",
        [
          "Pieds poussent le sol vers le bas",
          "Sol exerce une réaction vers le haut",
          "Force transmise via jambes et tronc",
          "Corps et barre accélèrent vers le haut",
        ],
        "Principe d'action-réaction de Newton.",
      ],
      match: [
        "Associe concept et application :",
        [
          ["Force de réaction", "Sol qui pousse vers le haut"],
          ["Action", "Pieds qui poussent le sol"],
          ["Squat", "Exercice en chaîne fermée avec réaction"],
        ],
        "Sans réaction, pas de propulsion ni stabilisation.",
      ],
      scenario: [
        "Un pratiquant fait un squat et sent ses pieds « pousser le sol ». Que se passe-t-il biomécaniquement ?",
        "Le sol exerce une force de réaction égale et opposée vers le haut",
        [
          "Le sol absorbe toute la force sans répondre",
          "Seule la gravité compte, pas la réaction",
          "La réaction va latéralement uniquement",
        ],
        "Action sur le sol → réaction sur le corps.",
      ],
    },
  ),
  buildLesson(
    "Le couple de force",
    "Moment = force × bras de levier.",
    [
      `Le concept probablement le plus important de la biomécanique appliquée à la musculation est le **moment de force**, ou **couple**.`,
      `De manière simplifiée : **Moment = Force × bras de levier**.`,
      `Si une force agit loin d'une articulation, elle peut créer un moment important. C'est précisément pourquoi modifier la position d'un membre peut transformer complètement la difficulté d'un exercice.`,
      `À retenir : ce n'est pas seulement la charge qui compte, c'est la charge × distance perpendiculaire à l'axe.`,
    ],
    ["moment", "couple"],
    CP.forces,
    {
      q1: [
        "Le moment de force dépend surtout de…",
        "La force et le bras de levier",
        ["La couleur des plaques", "Le nom du programme", "La musique"],
        "Moment = Force × bras de levier.",
      ],
      q2: [
        "Si une force agit loin d'une articulation…",
        "Le moment peut être plus important",
        ["Le moment disparaît", "La masse diminue", "La gravité s'annule"],
        "Plus de distance perpendiculaire = plus de moment.",
      ],
      q3: [
        "Modifier la position d'un membre peut…",
        "Transformer la difficulté d'un exercice",
        ["Ne jamais changer l'effort", "Supprimer les articulations", "Fixer la charge interne"],
        "La géométrie modifie le couple.",
      ],
      blank: [
        "Moment de force ≈ Force × bras de ___.",
        "levier",
        ["muscle", "temps", "respiration"],
        "Formule fondamentale de la biomécanique.",
      ],
      tf1: [
        "Le moment de force est un concept central en musculation.",
        true,
        "Vrai : il explique pourquoi la position change tout.",
      ],
      tf2: [
        "Seule l'intensité de la force compte, jamais sa distance à l'articulation.",
        false,
        "Faux : le bras de levier est essentiel.",
      ],
      multi: [
        "Quels facteurs déterminent le moment de force ? (plusieurs réponses)",
        ["Intensité de la force", "Bras de levier (distance perpendiculaire)", "Point d'application par rapport à l'axe"],
        ["Couleur des disques", "Nom du programme", "Température de la salle"],
        "Moment = Force × bras de levier.",
      ],
      order: [
        "Remets dans l'ordre le calcul simplifié du moment :",
        [
          "Identifier l'axe de rotation (articulation)",
          "Mesurer la force appliquée",
          "Déterminer la distance perpendiculaire (bras de levier)",
          "Multiplier force × bras de levier",
        ],
        "Formule fondamentale de la biomécanique appliquée.",
      ],
      match: [
        "Associe terme et formule :",
        [
          ["Moment de force", "Force × bras de levier"],
          ["Bras de levier", "Distance perpendiculaire à l'axe"],
          ["Couple", "Synonyme de moment de force"],
        ],
        "Concept central en musculation.",
      ],
      scenario: [
        "Tu tiens 5 kg bras tendu vs 5 kg au corps. Le moment à l'épaule est-il identique ?",
        "Non : bras tendu = bras de levier plus grand = moment plus élevé",
        [
          "Oui : 5 kg = toujours le même moment",
          "Oui : seule la masse compte",
          "Non : bras tendu réduit le moment",
        ],
        "Même force, distance différente = moment différent.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "Le bras de levier",
    "Distance perpendiculaire à l'axe.",
    [
      `Le **bras de levier** correspond à la distance **perpendiculaire** entre l'axe de rotation et la ligne d'action de la force.`,
      `Plus cette distance est importante, plus le moment produit par la force est important.`,
      `Exemple : tenir un haltère bras tendu est beaucoup plus exigeant pour l'épaule que tenir le même haltère avec le bras proche du corps. La masse n'a pas changé : le **bras de levier** a changé.`,
      `À retenir : rapprocher la charge de l'articulation ou du corps réduit souvent le moment externe.`,
    ],
    ["bras-de-levier", "moment"],
    CP.forces,
    {
      q1: [
        "Le bras de levier est…",
        "La distance perpendiculaire entre l'axe et la ligne d'action de la force",
        ["La longueur totale du muscle", "Le poids de la barre seul", "La durée de la série"],
        "C'est la composante géométrique du moment.",
      ],
      q2: [
        "Bras tendu latéralement vs haltère au corps :",
        "Le bras tendu augmente le bras de levier à l'épaule",
        ["Aucune différence", "La masse double", "La gravité disparaît"],
        "Même masse, moment différent.",
      ],
      q3: [
        "Augmenter le bras de levier…",
        "Augmente le moment de force",
        ["Diminue toujours la difficulté", "Supprime la résistance", "Fixe l'articulation"],
        "Distance perpendiculaire = couple plus grand.",
      ],
      blank: [
        "Si la masse ne change pas mais que le bras de levier augmente, le moment ___.",
        "augmente",
        ["disparaît", "devient nul", "ne change jamais"],
        "Moment = force × distance perpendiculaire.",
      ],
      tf1: [
        "Rapprocher une charge du corps réduit souvent le moment externe.",
        true,
        "Vrai : le bras de levier diminue.",
      ],
      tf2: [
        "Le bras de levier est la masse totale de l'haltère.",
        false,
        "Faux : c'est une distance géométrique.",
      ],
      multi: [
        "Quelles actions modifient le bras de levier externe ? (plusieurs réponses)",
        ["Éloigner la charge du corps", "Tendre le bras latéralement", "Changer l'angle du segment"],
        ["Réduire la masse de l'haltère uniquement", "Changer la couleur des disques", "Respirer plus fort"],
        "Géométrie du membre = levier variable.",
      ],
      order: [
        "Remets dans l'ordre l'effet d'un bras de levier accru :",
        [
          "Charge éloignée de l'axe de rotation",
          "Distance perpendiculaire augmentée",
          "Moment de force externe plus grand",
          "Exercice perçu comme plus difficile",
        ],
        "Plus de distance = plus de moment.",
      ],
      match: [
        "Associe situation et bras de levier :",
        [
          ["Haltère au corps", "Bras de levier minimal"],
          ["Bras horizontal", "Bras de levier maximal (haltère libre)"],
          ["Barre proche en deadlift", "Moment réduit sur la colonne"],
        ],
        "Exemples concrets du bras de levier.",
      ],
      scenario: [
        "Pour réduire le stress lombaire au deadlift, un coach conseille de garder la barre proche des tibias. Pourquoi ?",
        "Rapprocher la charge réduit le bras de levier externe sur la colonne",
        [
          "La barre devient plus légère physiquement",
          "Les muscles lombaires ne travaillent plus",
          "La gravité disparaît barre proche",
        ],
        "Distance barre-colonne = levier sur le dos.",
      ],
    },
    "INTERMEDIATE",
  ),
];
