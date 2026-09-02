import { CP } from "./checkpoints";
import { buildLesson } from "./build-lesson";

export const THEME_0_LESSONS = [
  buildLesson(
    "Qu'est-ce que la biomécanique ?",
    "Forces, articulations et mouvements.",
    [
      `La **biomécanique** est l'étude du mouvement du corps humain à partir des principes de la mécanique. En musculation, elle permet de comprendre pourquoi un exercice est difficile, quelles articulations travaillent, quels muscles produisent le mouvement et comment la position du corps modifie les contraintes.`,
      `Elle ne consiste pas simplement à dire « cet exercice travaille tel muscle ». On cherche plutôt à comprendre les **relations** entre forces, articulations, muscles, mouvements et résistances.`,
      `Cette approche transforme la musculation en analyse : au lieu de mémoriser des listes, tu apprends à **reconstruire** pourquoi un mouvement est exigeant dans une position donnée.`,
      `À retenir : la biomécanique relie mécanique et corps humain pour expliquer le mouvement, pas seulement nommer les muscles.`,
    ],
    ["introduction", "biomecanique"],
    CP.basesCorps,
    {
      q1: [
        "La biomécanique étudie surtout…",
        "Le mouvement du corps à partir de principes mécaniques",
        [
          "Uniquement les noms des muscles",
          "La nutrition sportive",
          "Les programmes d'entraînement uniquement",
        ],
        "La biomécanique analyse forces, articulations et mouvements.",
      ],
      q2: [
        "En musculation, la biomécanique aide à comprendre…",
        "Pourquoi un exercice est difficile et quelles articulations travaillent",
        [
          "Seulement combien de calories brûler",
          "Uniquement la fréquence cardiaque",
          "Le nom des salles de sport",
        ],
        "Elle relie position du corps, muscles et contraintes.",
      ],
      q3: [
        "Une approche biomécanique vise surtout à…",
        "Comprendre les relations entre forces, muscles et mouvements",
        [
          "Mémoriser exercice = muscle sans analyse",
          "Ignorer la position du corps",
          "Supprimer toute résistance externe",
        ],
        "L'analyse prime sur la simple étiquette musculaire.",
      ],
      blank: [
        "La biomécanique ne se limite pas à dire quel muscle « travaille », elle analyse les ___ entre forces et mouvements.",
        "relations",
        ["couleurs", "marques", "horaires"],
        "L'objectif est de comprendre comment tout s'articule.",
      ],
      tf1: [
        "La biomécanique permet d'expliquer comment la position du corps modifie les contraintes.",
        true,
        "Vrai : la géométrie du mouvement change la difficulté.",
      ],
      tf2: [
        "Dire « cet exercice = ce muscle » suffit pour une analyse biomécanique complète.",
        false,
        "Faux : il faut aussi forces, articulations et résistance.",
      ],
      multi: [
        "Quels éléments la biomécanique étudie-t-elle ? (plusieurs réponses)",
        ["Forces", "Articulations", "Mouvements"],
        ["Couleurs des haltères", "Marques de compléments", "Horaires de séance"],
        "La biomécanique relie mécanique, corps humain et mouvement.",
      ],
      order: [
        "Remets dans l'ordre une analyse biomécanique simple :",
        [
          "Identifier la résistance externe",
          "Déterminer la direction de la force",
          "Repérer les articulations mobilisées",
          "Relier muscles et mouvements produits",
        ],
        "C'est la logique de base pour analyser n'importe quel exercice.",
      ],
      match: [
        "Associe chaque concept à sa définition :",
        [
          ["Force", "Action mécanique avec intensité et direction"],
          ["Articulation", "Zone de mobilité entre os"],
          ["Muscle", "Structure qui produit la tension"],
        ],
        "Trois piliers de l'analyse biomécanique.",
      ],
      scenario: [
        "Un débutant dit : « Le développé couché, c'est juste les pectoraux. » Quelle réponse biomécanique est la plus juste ?",
        "Il faut aussi analyser résistance, articulations (épaule, coude) et leviers",
        [
          "Suffit de mémoriser exercice = muscle",
          "La biomécanique ne s'applique qu'aux jambes",
          "Seule la charge externe compte, pas la technique",
        ],
        "Une analyse complète dépasse l'étiquette musculaire.",
      ],
    },
  ),
  buildLesson(
    "Les grandes structures du corps",
    "Muscle, tendon, os, articulation.",
    [
      `Le corps peut être simplifié en plusieurs systèmes : les **os** forment la structure, les **articulations** permettent les mouvements, les **muscles** produisent les forces et les **tendons** transmettent cette force aux os.`,
      `Pour analyser un exercice, raisonne avec cette chaîne :\n\n**muscle → tendon → os → articulation → mouvement**.`,
      `Le **système nerveux** commande les muscles et adapte leur activation en fonction de la tâche. Sans activation nerveuse, le muscle ne produit pas de tension utile.`,
      `À retenir : chaque mouvement en salle se lit comme une chaîne mécanique commandée par le système nerveux.`,
    ],
    ["structures", "chaine"],
    CP.basesCorps,
    {
      q1: [
        "Dans la chaîne d'analyse, que transmet le tendon ?",
        "La force du muscle vers l'os",
        ["La nutrition vers le muscle", "L'air vers les poumons", "La barre vers le sol"],
        "Le tendon relie muscle et os.",
      ],
      q2: [
        "Les articulations permettent surtout…",
        "Les mouvements entre les os",
        ["La digestion", "La production d'oxygène", "Le stockage des graisses"],
        "Sans articulation, pas de mobilité osseuse.",
      ],
      q3: [
        "Le système nerveux…",
        "Commande les muscles et adapte leur activation",
        ["Remplace les os", "Supprime la gravité", "Fixe la charge externe"],
        "L'activation musculaire dépend du contrôle nerveux.",
      ],
      blank: [
        "La chaîne d'analyse suit : muscle → tendon → os → ___ → mouvement.",
        "articulation",
        ["vitamine", "barre", "respiration"],
        "L'articulation est le lien mobile entre os.",
      ],
      tf1: [
        "Les os forment la structure sur laquelle s'appuient muscles et articulations.",
        true,
        "Vrai : les os sont le squelette mécanique du mouvement.",
      ],
      tf2: [
        "Un muscle produit du mouvement sans passer par tendon ni os.",
        false,
        "Faux : la force musculaire se transmet via tendon et os.",
      ],
      multi: [
        "Quels éléments font partie de la chaîne d'analyse muscle → mouvement ? (plusieurs réponses)",
        ["Muscle", "Tendon", "Os", "Articulation"],
        ["Vitamine D", "Barre olympique", "Chronomètre"],
        "Chaque maillon transmet ou permet le mouvement.",
      ],
      order: [
        "Remets dans l'ordre la transmission de force :",
        [
          "Activation nerveuse du muscle",
          "Production de tension musculaire",
          "Transmission via le tendon",
          "Mouvement à l'articulation",
        ],
        "Sans activation nerveuse, pas de tension utile.",
      ],
      match: [
        "Associe structure et rôle :",
        [
          ["Os", "Structure squelettique de support"],
          ["Tendon", "Transmet la force du muscle à l'os"],
          ["Articulation", "Permet le mouvement entre os"],
        ],
        "La chaîne mécanique du corps humain.",
      ],
      scenario: [
        "Après une blessure au tendon, un pratiquant ne peut plus transmettre efficacement la force du biceps. Quel maillon de la chaîne est directement affecté ?",
        "Le tendon, lien entre muscle et os",
        [
          "L'articulation seule, sans lien avec le muscle",
          "Le système nerveux remplace le tendon",
          "L'os produit directement la force",
        ],
        "Le tendon est le relais indispensable muscle → os.",
      ],
    },
  ),
  buildLesson(
    "Les os comme leviers",
    "Axe, levier et force musculaire.",
    [
      `Les os peuvent être considérés comme des **leviers**. Une articulation joue souvent le rôle de point de rotation, tandis que les muscles appliquent une force sur l'os.`,
      `Lors d'un **curl biceps**, le coude constitue approximativement l'axe de rotation, l'avant-bras représente le levier et le biceps produit une force permettant de fléchir le coude.`,
      `La **géométrie** du système est fondamentale : modifier une distance peut modifier considérablement la difficulté, même si la charge reste identique.`,
      `À retenir : voir l'os comme un levier aide à comprendre pourquoi un même poids peut sembler très différent selon la position du bras.`,
    ],
    ["levier", "os"],
    CP.basesCorps,
    {
      q1: [
        "Dans un curl biceps, l'axe de rotation approximatif est…",
        "Le coude",
        ["L'épaule seule", "Le poignet", "La hanche"],
        "Le coude sert de pivot pour la flexion.",
      ],
      q2: [
        "L'avant-bras dans un curl agit surtout comme…",
        "Un levier",
        ["Une articulation", "Un tendon", "Une résistance externe"],
        "Le segment osseux amplifie le moment de force.",
      ],
      q3: [
        "Modifier la géométrie d'un mouvement peut…",
        "Changer fortement la difficulté ressentie",
        ["Annuler toute force musculaire", "Supprimer l'articulation", "Fixer la gravité"],
        "Distance et angle modifient le couple.",
      ],
      blank: [
        "Les os agissent comme des ___ autour d'une articulation qui sert de pivot.",
        "leviers",
        ["liquides", "poumons", "vitamines"],
        "Le levier osseux transforme la force musculaire en mouvement.",
      ],
      tf1: [
        "Dans un curl, le biceps produit une force qui fléchit le coude.",
        true,
        "Vrai : c'est l'exemple classique du levier au coude.",
      ],
      tf2: [
        "La géométrie du système n'a aucun effet sur la difficulté d'un exercice.",
        false,
        "Faux : distance et angle changent le moment de force.",
      ],
      multi: [
        "Dans un curl biceps, quels éléments correspondent au modèle du levier ? (plusieurs réponses)",
        ["Coude = axe de rotation", "Avant-bras = levier", "Biceps = force appliquée"],
        ["Poignet = axe principal", "Gravité = muscle agoniste", "Barre = articulation"],
        "Le modèle levier explique la mécanique du curl.",
      ],
      order: [
        "Remets dans l'ordre les composants du levier au curl :",
        [
          "Identifier l'axe de rotation (coude)",
          "Repérer le levier (avant-bras)",
          "Localiser la force musculaire (biceps)",
          "Observer l'effet sur l'angle du coude",
        ],
        "Axe, levier et force définissent le mouvement.",
      ],
      match: [
        "Associe chaque terme à son rôle au curl :",
        [
          ["Axe", "Point de rotation au coude"],
          ["Levier", "Segment osseux (avant-bras)"],
          ["Force", "Tension produite par le biceps"],
        ],
        "Modèle classique du levier en biomécanique.",
      ],
      scenario: [
        "Deux pratiquants font un curl avec 10 kg. L'un garde l'avant-bras horizontal, l'autre le bras le long du corps. Pourquoi le premier ressent-il plus de difficulté ?",
        "Le bras de levier par rapport à la gravité est plus grand à 90°",
        [
          "La masse de l'haltère a doublé",
          "Le biceps ne travaille plus en position horizontale",
          "La gravité disparaît bras le long du corps",
        ],
        "Même masse, géométrie différente = moment différent.",
      ],
    },
  ),
  buildLesson(
    "Les articulations",
    "Mobilité variable selon les régions.",
    [
      `Une **articulation** est une zone où plusieurs os sont reliés et peuvent avoir une certaine mobilité.`,
      `Toutes les articulations ne fonctionnent pas de la même manière. L'**épaule** possède une grande liberté de mouvement, tandis que certaines articulations sont beaucoup plus limitées.`,
      `En musculation, chaque exercice impose une **combinaison particulière** de mouvements articulaires. Analyser un exercice, c'est d'abord identifier quelles articulations bougent et comment.`,
      `À retenir : la mobilité articulaire conditionne les mouvements possibles et la technique optimale.`,
    ],
    ["articulations", "mobilite"],
    CP.basesCorps,
    {
      q1: [
        "Une articulation est une zone où…",
        "Plusieurs os sont reliés avec une certaine mobilité",
        ["Les muscles stockent l'énergie", "La barre est fixée", "Le sang circule uniquement"],
        "L'articulation permet le mouvement entre os.",
      ],
      q2: [
        "L'épaule se distingue surtout par…",
        "Une grande liberté de mouvement",
        ["Une mobilité quasi nulle", "L'absence d'os", "L'absence de muscles"],
        "C'est une articulation très mobile.",
      ],
      q3: [
        "Pour analyser un exercice, il faut identifier…",
        "Quelles articulations bougent et comment",
        ["Seulement la couleur des haltères", "Uniquement le BPM", "Le nom du coach"],
        "Chaque exercice combine des mouvements articulaires.",
      ],
      blank: [
        "Toutes les articulations n'ont pas la même ___ de mouvement.",
        "liberté",
        ["couleur", "température", "saveur"],
        "Certaines sont très mobiles, d'autres très limitées.",
      ],
      tf1: [
        "L'épaule est une articulation particulièrement mobile.",
        true,
        "Vrai : elle permet de nombreux mouvements.",
      ],
      tf2: [
        "Toutes les articulations du corps ont exactement la même amplitude.",
        false,
        "Faux : la mobilité varie fortement selon les articulations.",
      ],
      multi: [
        "Quelles affirmations sur les articulations sont correctes ? (plusieurs réponses)",
        ["Elles relient plusieurs os", "Leur mobilité varie selon la région", "Elles conditionnent les mouvements possibles"],
        ["Toutes ont la même amplitude", "Elles ne bougent jamais en musculation", "Elles remplacent les muscles"],
        "Mobilité articulaire = base de l'analyse d'exercice.",
      ],
      order: [
        "Remets dans l'ordre l'analyse articulaire d'un exercice :",
        [
          "Identifier l'exercice observé",
          "Repérer quelles articulations bougent",
          "Décrire le type de mouvement à chaque articulation",
          "Relier aux muscles capables de produire ces mouvements",
        ],
        "Articulations d'abord, muscles ensuite.",
      ],
      match: [
        "Associe articulation et caractéristique :",
        [
          ["Épaule", "Grande liberté de mouvement"],
          ["Coude", "Principalement flexion-extension"],
          ["Genou", "Articulation principale du membre inférieur"],
        ],
        "Chaque articulation a un profil de mobilité propre.",
      ],
      scenario: [
        "Un coach analyse un développé militaire. Quelle étape articulaire est prioritaire ?",
        "Identifier les mouvements d'épaule, de scapula et de coude",
        [
          "Ignorer l'épaule car seuls les pectoraux comptent",
          "Ne regarder que la charge sur la barre",
          "Supposer que toutes les articulations bougent pareil",
        ],
        "Chaque exercice combine des mouvements articulaires spécifiques.",
      ],
    },
  ),
  buildLesson(
    "Les plans et axes de mouvement",
    "Sagittal, frontal, transverse.",
    [
      `Pour décrire les mouvements, on utilise notamment trois **plans** :\n\n- **plan sagittal** : mouvements vers l'avant et l'arrière ;\n- **plan frontal** : mouvements vers les côtés ;\n- **plan transverse** : rotations.`,
      `Les **axes** sont perpendiculaires à ces plans. Ils permettent de préciser autour de quoi tourne un segment.`,
      `Cette classification permet de décrire précisément un mouvement au lieu de simplement dire « le bras monte ». C'est une base pour l'analyse technique.`,
      `À retenir : plans et axes donnent un langage précis pour décrire n'importe quel mouvement en salle.`,
    ],
    ["plans", "axes"],
    CP.basesCorps,
    {
      q1: [
        "Le plan sagittal décrit surtout les mouvements…",
        "Vers l'avant et l'arrière",
        ["Uniquement latéraux", "Uniquement rotatoires", "Sans direction"],
        "Flexion/extension se situent souvent dans ce plan.",
      ],
      q2: [
        "Le plan frontal correspond surtout aux mouvements…",
        "Vers les côtés",
        ["Rotatoires uniquement", "Vers l'avant uniquement", "Sans amplitude"],
        "Abduction/adduction sont souvent dans ce plan.",
      ],
      q3: [
        "Le plan transverse décrit surtout…",
        "Les rotations",
        ["Les flexions du coude uniquement", "La respiration", "La digestion"],
        "Les rotations s'analysent dans ce plan.",
      ],
      blank: [
        "Les axes de mouvement sont ___ aux plans anatomiques.",
        "perpendiculaires",
        ["identiques", "parallèles au sol uniquement", "sans rapport"],
        "Plan et axe se complètent pour décrire le mouvement.",
      ],
      tf1: [
        "Décrire un mouvement avec plans et axes est plus précis que « le bras monte ».",
        true,
        "Vrai : cela standardise l'analyse biomécanique.",
      ],
      tf2: [
        "Il n'existe qu'un seul plan pour décrire tous les mouvements du corps.",
        false,
        "Faux : on utilise sagittal, frontal et transverse.",
      ],
      multi: [
        "Quels plans anatomiques existent ? (plusieurs réponses)",
        ["Plan sagittal", "Plan frontal", "Plan transverse"],
        ["Plan diagonal uniquement", "Plan vertical unique", "Plan respiratoire"],
        "Trois plans de référence pour décrire le mouvement.",
      ],
      order: [
        "Remets dans l'ordre une description précise d'un mouvement :",
        [
          "Identifier le segment qui bouge",
          "Déterminer le plan du mouvement",
          "Préciser l'axe de rotation",
          "Nommer le mouvement (flexion, abduction…)",
        ],
        "Plans et axes standardisent la description.",
      ],
      match: [
        "Associe plan et type de mouvement typique :",
        [
          ["Plan sagittal", "Flexion et extension"],
          ["Plan frontal", "Abduction et adduction"],
          ["Plan transverse", "Rotations"],
        ],
        "Chaque plan accueille des mouvements caractéristiques.",
      ],
      scenario: [
        "Un bras s'élève latéralement jusqu'à l'horizontale. Dans quel plan se situe principalement ce mouvement ?",
        "Plan frontal (abduction d'épaule)",
        [
          "Plan sagittal uniquement",
          "Plan transverse uniquement",
          "Aucun plan ne s'applique",
        ],
        "L'écartement latéral est décrit dans le plan frontal.",
      ],
    },
  ),
];
