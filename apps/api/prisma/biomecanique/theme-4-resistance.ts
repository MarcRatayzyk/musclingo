import { CP } from "./checkpoints";
import { buildLesson } from "./build-lesson";

export const THEME_4_LESSONS = [
  buildLesson(
    "La ligne de résistance",
    "Direction de la charge.",
    [
      `Pour analyser un exercice, il faut déterminer dans quelle **direction** la résistance agit : c'est la **ligne de résistance**.`,
      `Avec un **haltère**, la résistance est essentiellement verticale à cause de la gravité.`,
      `Avec une **machine**, la résistance peut être modifiée par les poulies, les cames et la géométrie de la machine. Avec un **câble**, la direction suit le câble.`,
      `À retenir : identifier la ligne de résistance est l'étape 2 de toute analyse biomécanique.`,
    ],
    ["resistance", "direction"],
    CP.resistance,
    {
      q1: [
        "La ligne de résistance décrit…",
        "La direction dans laquelle agit la charge",
        ["Le nom du muscle agoniste", "La fréquence d'entraînement", "La couleur des haltères"],
        "Direction de la force externe.",
      ],
      q2: [
        "Avec un haltère libre, la résistance est surtout…",
        "Verticale (gravité)",
        ["Horizontale uniquement", "Nulle", "Aléatoire sans effet"],
        "La gravité tire vers le bas.",
      ],
      q3: [
        "Sur une machine, la résistance peut être modifiée par…",
        "Poulies, cames et géométrie",
        ["Uniquement la musique", "La couleur du tapis", "Le prénom du coach"],
        "Le matériel redirige la force.",
      ],
      blank: [
        "Avec un câble, la ligne de résistance suit l'orientation du ___.",
        "câble",
        ["sol", "miroir", "ventilateur"],
        "La poulie définit la direction de tirage.",
      ],
      tf1: [
        "Identifier la direction de la résistance est essentiel pour analyser un exercice.",
        true,
        "Vrai : sans direction, pas d'analyse du moment.",
      ],
      tf2: [
        "Toutes les résistances en salle sont toujours strictement verticales.",
        false,
        "Faux : machines et câbles peuvent changer la direction.",
      ],
      multi: [
        "Quelles sources de résistance existent en musculation ? (plusieurs réponses)",
        ["Haltère (gravité, verticale)", "Câble (direction du câble)", "Machine (poulies et cames)"],
        ["Ventilateur de salle", "Miroir", "Musique"],
        "Chaque équipement a sa ligne de résistance.",
      ],
      order: [
        "Remets dans l'ordre l'analyse de la ligne de résistance :",
        [
          "Identifier la source de charge (haltère, câble, machine)",
          "Déterminer la direction de la force externe",
          "Repérer où elle s'applique sur le corps",
          "Relier au moment articulaire produit",
        ],
        "Étape 2 de toute analyse biomécanique.",
      ],
      match: [
        "Associe équipement et ligne de résistance :",
        [
          ["Haltère libre", "Essentiellement verticale (gravité)"],
          ["Câble", "Suit l'orientation du câble"],
          ["Machine à came", "Variable selon l'angle"],
        ],
        "Direction de résistance selon le matériel.",
      ],
      scenario: [
        "Tu passes d'un curl haltère à un curl à la poulie basse. Qu'est-ce qui change biomécaniquement en priorité ?",
        "La direction de la résistance par rapport au bras",
        [
          "Rien : même exercice, même biomécanique",
          "Seule la couleur de la poulie compte",
          "La gravité disparaît avec un câble",
        ],
        "Ligne de résistance ≠ toujours verticale avec un câble.",
      ],
    },
  ),
  buildLesson(
    "Charge externe et charge interne",
    "Ce qu'on ajoute vs ce que le corps subit.",
    [
      `La **charge externe** correspond à ce que l'on ajoute au système : haltères, barre, poids, machine, etc.`,
      `La **charge interne** correspond aux contraintes et forces produites **à l'intérieur** du corps : compression articulaire, tension musculaire, contraintes ligamentaires.`,
      `Une charge externe identique peut donc générer des contraintes internes très différentes selon la **technique**.`,
      `À retenir : 100 kg sur la barre ≠ 100 kg de stress identique dans chaque tissu.`,
    ],
    ["charge-externe", "charge-interne"],
    CP.resistance,
    {
      q1: [
        "La charge externe correspond à…",
        "Ce qu'on ajoute : barre, haltères, machine",
        ["Les forces dans les muscles uniquement", "La fatigue nerveuse", "La respiration"],
        "C'est la résistance visible.",
      ],
      q2: [
        "La charge interne correspond à…",
        "Les contraintes produites à l'intérieur du corps",
        ["Le poids des plaques seulement", "La température de la salle", "Le BPM au repos"],
        "Tensions et contraintes tissulaires.",
      ],
      q3: [
        "Même charge externe + technique différente =",
        "Contraintes internes potentiellement différentes",
        ["Toujours le même stress interne", "Zéro tension musculaire", "Même angle articulaire forcé"],
        "La technique redistribue les contraintes.",
      ],
      blank: [
        "La charge ___ est ce que tu ajoutes au système (barre, haltères…).",
        "externe",
        ["interne", "mentale", "respiratoire"],
        "Externe = hors du corps ; interne = dans les tissus.",
      ],
      tf1: [
        "Une meilleure technique peut modifier les contraintes internes à charge égale.",
        true,
        "Vrai : la géométrie change les forces internes.",
      ],
      tf2: [
        "Charge externe et charge interne sont toujours identiques.",
        false,
        "Faux : la technique modifie la charge interne.",
      ],
      multi: [
        "Quels éléments relèvent de la charge interne ? (plusieurs réponses)",
        ["Tension musculaire", "Compression articulaire", "Contraintes ligamentaires"],
        ["Poids des disques sur la barre", "Masse de l'haltère externe", "Charge affichée sur la machine"],
        "Interne = forces et contraintes dans les tissus.",
      ],
      order: [
        "Remets dans l'ordre charge externe → interne :",
        [
          "Charge externe appliquée (barre, haltères)",
          "Réaction du corps (muscles, os, ligaments)",
          "Contraintes internes dans les tissus",
          "Technique qui redistribue ces contraintes",
        ],
        "100 kg barre ≠ 100 kg stress identique partout.",
      ],
      match: [
        "Associe type de charge et exemple :",
        [
          ["Charge externe", "100 kg sur la barre au squat"],
          ["Charge interne", "Compression au genou et tension quad"],
          ["Technique", "Modifie la répartition interne"],
        ],
        "Externe visible, interne ressentie par les tissus.",
      ],
      scenario: [
        "Deux pratiquants squattent 100 kg. L'un a les genoux valgus, l'autre les genoux alignés. Même charge externe, même stress interne ?",
        "Non : la technique modifie les contraintes articulaires internes",
        [
          "Oui : 100 kg = stress identique",
          "Oui : seule la charge externe compte",
          "Non : le valgus réduit toute contrainte",
        ],
        "Technique = redistribution des contraintes internes.",
      ],
    },
  ),
  buildLesson(
    "Pourquoi 100 kg ne valent pas toujours 100 kg",
    "Masse, distance, géométrie et amplitude.",
    [
      `Faire 100 kg au **squat** et 100 kg à un mouvement où la charge est beaucoup plus éloignée d'une articulation ne représente pas la même demande biomécanique.`,
      `La masse seule ne suffit pas à déterminer la difficulté. Il faut prendre en compte : **force × distance × géométrie × articulation × amplitude × vitesse**.`,
      `Comparer deux performances uniquement sur le chiffre affiché peut être trompeur sans contexte biomécanique.`,
      `À retenir : le chiffre sur la barre est une information partielle.`,
    ],
    ["charge", "comparaison"],
    CP.resistance,
    {
      q1: [
        "Deux mouvements à 100 kg peuvent différer car…",
        "Bras de levier, géométrie et articulations changent la demande",
        ["La gravité change de masse", "Les muscles disparaissent", "La barre devient plus légère"],
        "La masse affichée ne raconte pas tout.",
      ],
      q2: [
        "Pour évaluer la difficulté, il faut considérer notamment…",
        "Force, distance, géométrie et amplitude",
        ["Uniquement le nom de l'exercice", "La couleur des bandes", "L'heure de la séance"],
        "Plusieurs variables mécaniques entrent en jeu.",
      ],
      q3: [
        "Comparer deux charges sans contexte biomécanique…",
        "Peut être trompeur",
        ["Est toujours parfaitement fiable", "Ignore la technique", "Remplace l'analyse"],
        "Le contexte compte autant que le chiffre.",
      ],
      blank: [
        "La masse seule ne suffit pas : il faut aussi la ___ perpendiculaire à l'axe.",
        "distance",
        ["couleur", "odeur", "musique"],
        "Force × distance = moment.",
      ],
      tf1: [
        "100 kg au squat et 100 kg bras tendu à l'épaule n'imposent pas la même demande.",
        true,
        "Vrai : bras de levier et géométrie diffèrent.",
      ],
      tf2: [
        "Seul le chiffre sur la barre détermine la difficulté biomécanique.",
        false,
        "Faux : géométrie, amplitude et vitesse comptent.",
      ],
      multi: [
        "Quels facteurs influencent la demande biomécanique au-delà de la masse ? (plusieurs réponses)",
        ["Bras de levier", "Géométrie articulaire", "Amplitude du mouvement", "Vitesse d'exécution"],
        ["Couleur des disques", "Marque de la ceinture", "Heure du repas"],
        "Masse seule = information partielle.",
      ],
      order: [
        "Remets dans l'ordre l'évaluation de la difficulté réelle :",
        [
          "Noter la masse externe (100 kg)",
          "Analyser bras de levier et géométrie",
          "Considérer l'amplitude et la vitesse",
          "Comparer la demande biomécanique totale",
        ],
        "Le chiffre sur la barre ne raconte pas tout.",
      ],
      match: [
        "Associe situation et explication :",
        [
          ["100 kg squat", "Demande multi-articulaire, charge verticale"],
          ["100 kg bras tendu latéralement", "Grand bras de levier épaule"],
          ["Comparaison naïve", "Peut être trompeuse"],
        ],
        "Contexte biomécanique avant comparaison.",
      ],
      scenario: [
        "Un pratiquant compare son squat 140 kg à l'équivalent en élévation latérale avec 14 kg par bras. Analyse biomécanique ?",
        "Comparaison invalide : géométrie, leviers et articulations totalement différents",
        [
          "Comparaison parfaite : 140 = 14 × 10",
          "L'élévation latérale est toujours plus facile",
          "Seule la masse totale compte",
        ],
        "Ne pas comparer des mouvements sans contexte mécanique.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "Les machines et leurs cames",
    "Résistance variable selon l'angle.",
    [
      `Les machines de musculation peuvent utiliser des systèmes mécaniques destinés à modifier la résistance au cours de l'**amplitude**.`,
      `Une **came** peut faire varier le bras de levier du système. Ainsi, une machine peut être conçue pour augmenter ou diminuer la difficulté à certains angles articulaires.`,
      `Cela explique pourquoi une machine peut sembler « lourde » en bas du mouvement et plus légère en haut, ou l'inverse.`,
      `À retenir : la courbe de résistance d'une machine dépend de sa mécanique, pas seulement du poids affiché.`,
    ],
    ["machine", "came"],
    CP.resistance,
    {
      q1: [
        "Une came sur une machine sert surtout à…",
        "Modifier la résistance selon l'angle",
        ["Chauffer la salle", "Mesurer le BPM", "Remplacer les muscles"],
        "Le bras de levier interne varie.",
      ],
      q2: [
        "Sur une machine à came, la difficulté…",
        "Peut changer selon la position dans l'amplitude",
        ["Est identique à chaque angle", "Disparaît en haut du mouvement", "Ne dépend pas de la géométrie"],
        "Profil de résistance non uniforme.",
      ],
      q3: [
        "Le poids affiché sur une machine…",
        "Ne décrit pas toujours la résistance ressentie à chaque angle",
        ["Garantit une résistance constante", "Remplace l'analyse biomécanique", "Est toujours égal au squat"],
        "La mécanique modifie le profil.",
      ],
      blank: [
        "Une came modifie le bras de ___ du système mécanique.",
        "levier",
        ["muscle", "temps", "sang"],
        "Variation du levier = variation de résistance.",
      ],
      tf1: [
        "Les machines peuvent être conçues pour varier la résistance selon l'angle.",
        true,
        "Vrai : c'est le rôle des cames.",
      ],
      tf2: [
        "Toutes les machines offrent une résistance strictement constante en tous points.",
        false,
        "Faux : poulies et cames modifient le profil.",
      ],
      multi: [
        "Comment une came modifie-t-elle la résistance ? (plusieurs réponses)",
        ["Varie le bras de levier interne", "Change la difficulté selon l'angle", "Crée un profil de résistance non uniforme"],
        ["Supprime toute résistance en haut", "Double la masse réelle", "Ignore la géométrie"],
        "Came = levier variable selon l'amplitude.",
      ],
      order: [
        "Remets dans l'ordre le fonctionnement d'une machine à came :",
        [
          "Rotation de la came avec l'amplitude",
          "Variation du bras de levier interne",
          "Modification de la résistance ressentie",
          "Profil lourd en bas / léger en haut (ou inverse)",
        ],
        "La came sculpte la courbe de résistance.",
      ],
      match: [
        "Associe élément et effet :",
        [
          ["Came", "Modifie le bras de levier selon l'angle"],
          ["Poids affiché", "Ne décrit pas toujours la résistance ressentie"],
          ["Amplitude", "Position où la résistance varie"],
        ],
        "Machine ≠ résistance constante garantie.",
      ],
      scenario: [
        "Sur une leg extension à came, la charge semble énorme en bas et légère en haut. Explication ?",
        "La came augmente le bras de levier interne en extension basse du genou",
        [
          "Le poids affiché double en montant",
          "Les quadriceps cessent de travailler en haut",
          "La gravité s'inverse sur la machine",
        ],
        "Profil de résistance conçu par la mécanique interne.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "Les câbles",
    "Résistance selon l'orientation du câble.",
    [
      `Avec une **poulie**, la direction de la résistance dépend de l'**orientation du câble**.`,
      `C'est l'une des raisons pour lesquelles un exercice à la poulie peut être très différent d'un exercice avec haltère.`,
      `Le câble permet notamment de créer une résistance qui n'est pas uniquement verticale, ce qui change les moments articulaires tout au long du mouvement.`,
      `À retenir : poulie haute, basse ou intermédiaire = profil de résistance différent.`,
    ],
    ["cable", "poulie"],
    CP.resistance,
    {
      q1: [
        "Avec un câble, la direction de la résistance suit…",
        "L'orientation du câble",
        ["Uniquement la verticale", "Le nom du muscle", "La fréquence cardiaque"],
        "Le câble définit la ligne de tirage.",
      ],
      q2: [
        "Un exercice à la poulie diffère d'un haltère car…",
        "La direction de résistance peut rester relative au câble, pas seulement verticale",
        ["La gravité disparaît", "La masse devient nulle", "Les articulations ne bougent pas"],
        "Profil de résistance différent.",
      ],
      q3: [
        "Changer la hauteur de la poulie…",
        "Modifie le profil de résistance de l'exercice",
        ["N'a aucun effet", "Supprime le travail musculaire", "Fixe l'amplitude"],
        "Hauteur de poulie = géométrie différente.",
      ],
      blank: [
        "Le câble permet une résistance qui n'est pas uniquement ___.",
        "verticale",
        ["musculaire", "articulaire", "nerveuse"],
        "Contrairement à un haltère libre dominé par la gravité.",
      ],
      tf1: [
        "Poulie haute et poulie basse ne produisent pas le même profil de résistance.",
        true,
        "Vrai : l'angle du câble change tout.",
      ],
      tf2: [
        "Un câble et un haltère produisent toujours exactement la même résistance.",
        false,
        "Faux : direction et profil diffèrent.",
      ],
      multi: [
        "Quelles différences entre câble et haltère ? (plusieurs réponses)",
        ["Direction de résistance relative au câble", "Profil non uniquement vertical", "Moments articulaires variables dans l'amplitude"],
        ["Masse nulle au câble", "Gravité absente totalement", "Articulations immobiles"],
        "Poulie haute vs basse = profils différents.",
      ],
      order: [
        "Remets dans l'ordre l'analyse d'un exercice au câble :",
        [
          "Identifier la hauteur de la poulie",
          "Tracer la direction du câble",
          "Déterminer la ligne de résistance",
          "Analyser le moment articulaire le long du mouvement",
        ],
        "Le câble définit la ligne de tirage.",
      ],
      match: [
        "Associe configuration et effet :",
        [
          ["Poulie haute", "Résistance tirant vers le haut/arrière"],
          ["Poulie basse", "Résistance tirant vers le bas/avant"],
          ["Haltère libre", "Résistance essentiellement verticale"],
        ],
        "Direction de résistance selon l'équipement.",
      ],
      scenario: [
        "Tu fais un curl à la poulie basse vs curl haltère. Pourquoi le profil de difficulté diffère-t-il ?",
        "La résistance suit le câble (diagonale montante) et non la verticale pure",
        [
          "Le câble est plus lourd qu'un haltère",
          "Le biceps ne fonctionne qu'avec un câble",
          "La poulie supprime la tension musculaire",
        ],
        "Ligne de résistance différente = moment différent.",
      ],
    },
    "INTERMEDIATE",
  ),
];
