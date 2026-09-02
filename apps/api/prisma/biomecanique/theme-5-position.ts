import { CP } from "./checkpoints";
import { buildLesson } from "./build-lesson";

export const THEME_5_LESSONS = [
  buildLesson(
    "La posture",
    "Organisation des segments dans l'espace.",
    [
      `La **posture** correspond à l'organisation des segments du corps dans l'espace.`,
      `Il n'existe pas nécessairement une posture universellement parfaite. Une posture efficace dépend de la personne, de l'exercice, de sa morphologie, de son objectif et de sa capacité à **contrôler** le mouvement.`,
      `Une bonne posture en squat n'est pas forcément identique à une bonne posture au développé militaire. Le contexte guide l'organisation corporelle.`,
      `À retenir : posture = position + contrôle + adéquation à la tâche.`,
    ],
    ["posture", "technique"],
    CP.position,
    {
      q1: [
        "La posture correspond à…",
        "L'organisation des segments du corps dans l'espace",
        ["Uniquement se tenir droit au repos", "La couleur des chaussures", "Le nombre de séries"],
        "C'est la configuration corporelle pendant le mouvement.",
      ],
      q2: [
        "Une posture efficace dépend notamment de…",
        "La personne, l'exercice et l'objectif",
        ["Un modèle unique pour tous", "La marque des haltères", "L'heure du repas"],
        "Pas de posture universelle parfaite.",
      ],
      q3: [
        "Une bonne posture en musculation implique surtout…",
        "Le contrôle du mouvement dans le contexte de l'exercice",
        ["Copier une photo sans réfléchir", "Rigidity maximale en permanence", "Ignorer la morphologie"],
        "Contrôle et adéquation à la tâche.",
      ],
      blank: [
        "Il n'existe pas une posture ___ parfaite pour tous les exercices et toutes les morphologies.",
        "universelle",
        ["respiratoire", "digestive", "cutanée"],
        "La posture s'adapte au contexte.",
      ],
      tf1: [
        "La posture optimale peut varier selon l'exercice.",
        true,
        "Vrai : squat ≠ développé ≠ rowing.",
      ],
      tf2: [
        "Une seule posture idéale convient à toutes les personnes et tous les mouvements.",
        false,
        "Faux : morphologie et objectif modifient la posture.",
      ],
      multi: [
        "Une posture efficace dépend de quels facteurs ? (plusieurs réponses)",
        ["Morphologie du pratiquant", "Exercice réalisé", "Objectif d'entraînement", "Capacité de contrôle"],
        ["Couleur des chaussures", "Marque de la barre", "Heure de la séance"],
        "Posture = position + contrôle + adéquation.",
      ],
      order: [
        "Remets dans l'ordre l'évaluation posturale d'un exercice :",
        [
          "Identifier l'exercice et l'objectif",
          "Observer l'organisation des segments",
          "Évaluer le contrôle du mouvement",
          "Adapter si nécessaire à la morphologie",
        ],
        "Pas de posture universelle parfaite.",
      ],
      match: [
        "Associe exercice et exigence posturale :",
        [
          ["Squat", "Organisation hanche-genou-pieds"],
          ["Développé militaire", "Stabilité tronc + position épaule"],
          ["Deadlift", "Chaîne postérieure alignée sous charge"],
        ],
        "Chaque mouvement a ses exigences posturales.",
      ],
      scenario: [
        "Un coach impose la même posture de squat à tous, sans regarder la morphologie. Quel problème biomécanique ?",
        "Ignore que proportions et mobilité modifient la posture optimale",
        [
          "Parfait : une posture unique est toujours meilleure",
          "La morphologie n'influence jamais la technique",
          "Seule la charge compte, pas la posture",
        ],
        "Posture efficace = adaptée à la personne et à la tâche.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "L'anthropométrie",
    "Proportions corporelles et technique.",
    [
      `L'**anthropométrie** étudie les dimensions du corps. Deux personnes ayant la même taille et le même poids peuvent avoir des proportions très différentes.`,
      `Exemples de variables importantes : longueur du **fémur**, du **tibia**, du **torse**, des **bras**, largeur du **bassin**.`,
      `Ces différences peuvent modifier fortement la **technique optimale** au squat, au deadlift ou au développé.`,
      `À retenir : tes segments osseux influencent ta mécanique — ce n'est pas un défaut, c'est une donnée.`,
    ],
    ["anthropometrie", "proportions"],
    CP.position,
    {
      q1: [
        "L'anthropométrie étudie…",
        "Les dimensions et proportions du corps",
        ["Uniquement le poids sur la balance", "La fréquence d'entraînement", "Les noms des muscles"],
        "Longueurs de segments et morphologie.",
      ],
      q2: [
        "Deux personnes de même taille et poids peuvent…",
        "Avoir des proportions très différentes",
        ["Avoir forcément les mêmes fémurs", "Squatter identiquement", "Avoir la même technique optimale"],
        "Morphologie ≠ taille affichée seule.",
      ],
      q3: [
        "La longueur du fémur influence notamment…",
        "La mécanique du squat et du bas du corps",
        ["Uniquement le curl biceps", "La digestion", "La vue"],
        "Segments longs modifient angles et posture.",
      ],
      blank: [
        "L'anthropométrie examine les ___ corporelles (fémur, torse, bras…).",
        "proportions",
        ["couleurs", "émotions", "horaires"],
        "Les proportions guident la technique.",
      ],
      tf1: [
        "Des fémurs plus longs peuvent changer l'apparence et la mécanique du squat.",
        true,
        "Vrai : morphologie influence la technique.",
      ],
      tf2: [
        "Toute personne de même poids doit adopter exactement la même technique.",
        false,
        "Faux : les proportions modifient la mécanique optimale.",
      ],
      multi: [
        "Quelles variables anthropométriques influencent la technique ? (plusieurs réponses)",
        ["Longueur du fémur", "Longueur du torse", "Longueur des bras", "Largeur du bassin"],
        ["Couleur des cheveux", "Taille de chaussure seule", "Prénom du pratiquant"],
        "Proportions osseuses = mécanique individuelle.",
      ],
      order: [
        "Remets dans l'ordre l'impact anthropométrique au squat :",
        [
          "Mesurer ou observer les proportions (fémur, tibia, torse)",
          "Identifier les angles articulaires résultants",
          "Adapter stance et inclinaison du tronc",
          "Trouver une technique compatible et efficace",
        ],
        "Morphologie guide la stratégie technique.",
      ],
      match: [
        "Associe segment et influence typique :",
        [
          ["Fémur long", "Plus d'inclinaison de tronc au squat"],
          ["Torse court", "Barre plus en avant au deadlift"],
          ["Bras longs", "Prise plus large possible au bench"],
        ],
        "Proportions modifient la géométrie du mouvement.",
      ],
      scenario: [
        "Deux pratiquants de même taille : l'un a des fémurs longs, l'autre courts. Le premier penche plus le tronc au squat. Explication ?",
        "Des fémurs longs augmentent le moment à la hanche, compensé par plus d'inclinaison",
        [
          "Manque de technique, pas de morphologie",
          "Les fémurs n'influencent pas le squat",
          "Seule la force des quadriceps compte",
        ],
        "Anthropométrie = donnée, pas défaut.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "Pourquoi la technique varie",
    "Morphologie, mobilité et objectif.",
    [
      `Il n'existe pas nécessairement une seule manière « parfaite » de faire un exercice.`,
      `Une personne avec de **longs fémurs** peut avoir besoin d'une stratégie différente au squat d'une personne avec des fémurs courts.`,
      `L'objectif est de trouver une technique permettant de produire efficacement la force recherchée avec une contrainte compatible avec les capacités de la personne.`,
      `À retenir : variabilité technique = adaptation intelligente, pas excuse pour le mauvais contrôle.`,
    ],
    ["technique", "morphologie"],
    CP.position,
    {
      q1: [
        "La technique varie entre individus car…",
        "Morphologie, mobilité et objectifs diffèrent",
        ["Les muscles ont des noms différents", "La gravité change", "Les haltères sont tous identiques"],
        "Chaque corps a ses contraintes.",
      ],
      q2: [
        "Au squat, des fémurs longs peuvent impliquer…",
        "Une stratégie technique différente",
        ["Exactement la même position qu'un fémur court", "Aucun mouvement de hanche", "Zéro inclinaison de torse"],
        "Proportions modifient la mécanique.",
      ],
      q3: [
        "L'objectif d'une bonne technique est…",
        "Produire la force visée avec des contraintes compatibles",
        ["Copier une vidéo sans diagnostic", "Maximiser l'amplitude à tout prix", "Ignorer la mobilité"],
        "Efficacité + tolérance individuelle.",
      ],
      blank: [
        "La technique optimale dépend de la morphologie, de la mobilité et de l'___.",
        "objectif",
        ["couleur", "marque", "musique"],
        "Force, hypertrophie ou rehab = exigences différentes.",
      ],
      tf1: [
        "Deux personnes peuvent squatter différemment tout en étant efficaces.",
        true,
        "Vrai : la morphologie guide la variabilité.",
      ],
      tf2: [
        "Il existe une technique universelle identique pour tous au deadlift.",
        false,
        "Faux : proportions et mobilité modifient la stratégie.",
      ],
      multi: [
        "Pourquoi la technique varie entre individus ? (plusieurs réponses)",
        ["Morphologie différente", "Mobilité variable", "Objectifs d'entraînement différents"],
        ["Muscles de noms différents", "Gravité change selon la personne", "Haltères de couleurs différentes"],
        "Variabilité = adaptation intelligente.",
      ],
      order: [
        "Remets dans l'ordre la recherche de technique optimale :",
        [
          "Définir l'objectif (force, hypertrophie, rehab…)",
          "Évaluer morphologie et mobilité",
          "Tester des stratégies compatibles",
          "Choisir la technique la plus efficace et tolérable",
        ],
        "Efficacité + contraintes individuelles.",
      ],
      match: [
        "Associe facteur et conséquence technique :",
        [
          ["Fémurs longs", "Squat avec plus d'inclinaison"],
          ["Mobilité cheville limitée", "Profondeur ou stance adaptés"],
          ["Objectif force", "Priorité transmission de charge"],
        ],
        "Facteurs qui modifient la stratégie.",
      ],
      scenario: [
        "Un pratiquant aux fémurs longs squatte avec plus d'inclinaison qu'un modèle « dos vertical ». Que conclure ?",
        "Technique probablement adaptée à sa morphologie, pas forcément incorrecte",
        [
          "Technique toujours mauvaise sans exception",
          "Morphologie sans importance en squat",
          "Doit copier exactement la vidéo du modèle",
        ],
        "Variabilité technique légitime selon proportions.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "L'amplitude de mouvement",
    "ROM : quantité, contrôle et objectif.",
    [
      `L'**amplitude** correspond à la quantité de mouvement réalisée (range of motion, ROM).`,
      `Une amplitude plus grande peut augmenter la longueur du trajet et modifier les angles articulaires.`,
      `Mais « plus d'amplitude » n'est pas automatiquement « mieux ». Il faut considérer l'**objectif**, la morphologie, le **contrôle** du mouvement et la **tolérance** individuelle.`,
      `À retenir : amplitude utile = amplitude contrôlée et compatible avec l'objectif.`,
    ],
    ["amplitude", "rom"],
    CP.position,
    {
      q1: [
        "L'amplitude de mouvement correspond à…",
        "La quantité de mouvement réalisée",
        ["La vitesse de la barre seule", "Le nombre de séries", "La couleur du programme"],
        "ROM = distance angulaire parcourue.",
      ],
      q2: [
        "Une amplitude plus grande peut…",
        "Modifier les angles articulaires et la longueur du trajet",
        ["Supprimer toute tension musculaire", "Rendre l'exercice toujours plus facile", "Remplacer la technique"],
        "Plus de ROM = géométrie différente.",
      ],
      q3: [
        "Plus d'amplitude est automatiquement mieux ?",
        "Non : cela dépend de l'objectif et du contrôle",
        ["Oui, toujours", "Oui, sans exception", "Oui, même sans mobilité"],
        "Contexte et tolérance individuelle comptent.",
      ],
      blank: [
        "L'amplitude utile est celle que tu peux ___ avec la charge visée.",
        "contrôler",
        ["ignorer", "copier", "deviner"],
        "Contrôle > amplitude maximale forcée.",
      ],
      tf1: [
        "L'amplitude doit être adaptée à l'objectif et à la morphologie.",
        true,
        "Vrai : ROM maximal n'est pas toujours optimal.",
      ],
      tf2: [
        "Toujours viser l'amplitude maximale sans nuance améliore tous les exercices.",
        false,
        "Faux : contrôle et tolérance limitent parfois le ROM.",
      ],
      multi: [
        "Quels facteurs déterminent une amplitude utile ? (plusieurs réponses)",
        ["Objectif de l'exercice", "Contrôle du mouvement", "Mobilité et tolérance individuelle"],
        ["Couleur du programme", "Marque de la salle", "Nombre de miroirs"],
        "ROM utile ≠ ROM maximal forcé.",
      ],
      order: [
        "Remets dans l'ordre l'évaluation de l'amplitude :",
        [
          "Définir l'objectif (hypertrophie, force, mobilité…)",
          "Tester l'amplitude contrôlable sous charge",
          "Vérifier la tolérance articulaire",
          "Ajuster ROM si nécessaire",
        ],
        "Amplitude contrôlée compatible avec l'objectif.",
      ],
      match: [
        "Associe concept et implication :",
        [
          ["ROM plus grand", "Trajet plus long, angles différents"],
          ["ROM limité", "Parfois choix de contrôle ou tolérance"],
          ["Objectif force", "ROM compatible avec charge max"],
        ],
        "Contexte guide l'amplitude optimale.",
      ],
      scenario: [
        "Un pratiquant force la profondeur maximale au squat malgré une perte de contrôle lombaire. Quelle approche biomécanique ?",
        "Réduire l'amplitude pour retrouver contrôle et tolérance",
        [
          "Toujours plus profond = toujours mieux",
          "Ignorer la colonne, seuls les quads comptent",
          "Augmenter la charge pour compenser",
        ],
        "Amplitude utile = amplitude contrôlée.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "La position articulaire",
    "Longueur musculaire et bras de levier.",
    [
      `La position d'une **articulation** modifie la longueur et l'orientation des muscles ainsi que leurs bras de levier.`,
      `C'est pourquoi un muscle peut être très sollicité dans une position et beaucoup moins dans une autre, même dans le même exercice.`,
      `Comprendre la position articulaire permet d'aller beaucoup plus loin que les simples noms d'exercices.`,
      `À retenir : angle articulaire = longueur musculaire + moment externe + recrutement.`,
    ],
    ["position-articulaire", "angle"],
    CP.position,
    {
      q1: [
        "Changer la position articulaire modifie…",
        "Longueur musculaire et bras de levier",
        ["Uniquement la respiration", "La masse de la barre", "Le nom du programme"],
        "Géométrie articulaire = recrutement variable.",
      ],
      q2: [
        "Dans un même exercice, un muscle peut…",
        "Être plus sollicité dans certaines positions",
        ["Travailler identiquement à chaque angle", "Ne jamais changer de tension", "Ignorer la charge"],
        "Profil de difficulté non uniforme.",
      ],
      q3: [
        "Analyser la position articulaire permet…",
        "D'aller au-delà des simples noms d'exercices",
        ["De supprimer la biomécanique", "D'ignorer la résistance", "De fixer le 1RM"],
        "L'angle explique le ressenti.",
      ],
      blank: [
        "La position articulaire influence la longueur du muscle et le bras de ___.",
        "levier",
        ["temps", "sang", "repas"],
        "Deux leviers biomécaniques clés.",
      ],
      tf1: [
        "Un curl biceps n'est pas également difficile à tous les angles du coude.",
        true,
        "Vrai : position articulaire modifie moment et longueur musculaire.",
      ],
      tf2: [
        "La position articulaire n'a aucun effet sur le recrutement musculaire.",
        false,
        "Faux : angle et longueur changent la tension.",
      ],
      multi: [
        "Que modifie la position articulaire ? (plusieurs réponses)",
        ["Longueur musculaire", "Bras de levier interne et externe", "Recrutement relatif des muscles"],
        ["Masse de la barre affichée", "Couleur des disques", "Nom du coach"],
        "Angle articulaire = géométrie + tension.",
      ],
      order: [
        "Remets dans l'ordre l'analyse par position articulaire :",
        [
          "Identifier l'articulation clé",
          "Mesurer ou estimer l'angle",
          "Déduire longueur musculaire et bras de levier",
          "Prédire la difficulté et le recrutement",
        ],
        "Position → longueur + moment + tension.",
      ],
      match: [
        "Associe position et effet typique au curl :",
        [
          ["Coude à 90°", "Souvent position la plus difficile"],
          ["Coude tendu (bas)", "Moment réduit, muscle plus allongé"],
          ["Coude fléchi (haut)", "Muscle plus raccourci"],
        ],
        "Profil non uniforme dans l'amplitude.",
      ],
      scenario: [
        "Au leg curl, la tension semble maximale en milieu d'amplitude. Quelle explication ?",
        "Combinaison favorable de longueur musculaire et moment de force à cet angle",
        [
          "La machine change de poids à mi-parcours",
          "Les ischios ne travaillent qu'au milieu",
          "La gravité disparaît en bas du mouvement",
        ],
        "Position articulaire modifie tension et difficulté.",
      ],
    },
    "INTERMEDIATE",
  ),
];
