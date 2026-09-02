import { CP } from "./checkpoints";
import { buildLesson } from "./build-lesson";

export const THEME_7_LESSONS = [
  buildLesson(
    "Tension mécanique",
    "Moteur de l'hypertrophie.",
    [
      `La **tension mécanique** est l'un des principaux concepts permettant de comprendre l'**hypertrophie**.`,
      `Un muscle doit produire de la **force** pour déplacer ou contrôler une résistance.`,
      `La question biomécanique intéressante devient alors : dans quelles **positions** et à quels **moments** du mouvement le muscle doit-il produire le plus de tension ?`,
      `À retenir : hypertrophie ≠ seulement « sentir le muscle » — c'est produire de la tension suffisante dans le temps.`,
    ],
    ["tension", "hypertrophie"],
    CP.entrainement,
    {
      q1: [
        "La tension mécanique est importante pour…",
        "Comprendre l'hypertrophie musculaire",
        ["Mesurer uniquement le BPM", "Choisir la musique", "Compter les pas"],
        "Force produite par le muscle contre résistance.",
      ],
      q2: [
        "La question biomécanique clé sur la tension est…",
        "Où et quand le muscle produit le plus de tension",
        ["Quelle couleur porter", "Quel jour est lundi", "Combien de miroirs"],
        "Position et moment dans l'amplitude.",
      ],
      q3: [
        "Pour l'hypertrophie, un muscle doit…",
        "Produire de la force contre une résistance",
        ["Rester totalement relâché", "Ne jamais se contracter", "Ignorer la charge"],
        "Tension mécanique = signal d'adaptation.",
      ],
      blank: [
        "La tension ___ est la force produite par le muscle pour contrôler la résistance.",
        "mécanique",
        ["digestive", "respiratoire seule", "cutanée"],
        "Concept central de l'hypertrophie.",
      ],
      tf1: [
        "Analyser où la tension est maximale aide à comprendre un exercice.",
        true,
        "Vrai : positions difficiles = plus de tension.",
      ],
      tf2: [
        "L'hypertrophie ne dépend d'aucune tension musculaire.",
        false,
        "Faux : la tension mécanique est un moteur clé.",
      ],
      multi: [
        "Quelles affirmations sur la tension mécanique sont correctes ? (plusieurs réponses)",
        ["Elle est liée à l'hypertrophie", "Elle dépend de la force produite contre la résistance", "Elle varie selon la position dans l'amplitude"],
        ["Elle est sans importance", "Elle ne dépend que du BPM", "Elle disparaît près de l'échec"],
        "Tension mécanique = signal d'adaptation hypertrophique.",
      ],
      order: [
        "Remets dans l'ordre l'analyse de tension pour l'hypertrophie :",
        [
          "Identifier l'exercice et la résistance",
          "Repérer où le muscle produit le plus de force",
          "Évaluer la tension le long de l'amplitude",
          "Adapter exercice ou technique si besoin",
        ],
        "Où et quand la tension est-elle maximale ?",
      ],
      match: [
        "Associe concept et implication :",
        [
          ["Tension mécanique", "Force musculaire contre résistance"],
          ["Position difficile", "Souvent plus de tension"],
          ["Hypertrophie", "Nécessite tension suffisante dans le temps"],
        ],
        "Sentir le muscle ≠ comprendre la tension.",
      ],
      scenario: [
        "Un pratiquant évite la portion difficile du curl (90°) en utilisant un tempo très rapide. Effet sur la tension mécanique ?",
        "Réduction du temps sous tension dans la zone de moment maximal",
        [
          "Augmentation automatique de l'hypertrophie",
          "Aucun effet : la vitesse remplace la tension",
          "Tension identique à toute vitesse",
        ],
        "Zone difficile = souvent plus de tension mécanique.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "La proximité de l'échec",
    "Intensité d'effort et recrutement.",
    [
      `À mesure qu'une série approche de l'**échec**, les exigences de production de force deviennent importantes.`,
      `L'**effort perçu** augmente et le corps doit recruter davantage de ressources pour continuer à produire la force nécessaire.`,
      `Cela explique pourquoi l'**intensité d'effort** est importante dans l'entraînement hypertrophique, indépendamment du pourcentage de 1RM affiché.`,
      `À retenir : proche de l'échec = plus de recrutement et plus de tension sur les dernières reps.`,
    ],
    ["echec", "intensite"],
    CP.entrainement,
    {
      q1: [
        "Proche de l'échec, le corps doit…",
        "Recruter davantage pour continuer à produire de la force",
        ["Désactiver tous les muscles", "Réduire la tension à zéro", "Arrêter la respiration"],
        "Recrutement accru en fin de série.",
      ],
      q2: [
        "L'intensité d'effort en hypertrophie…",
        "Compte au-delà du seul pourcentage de 1RM",
        ["Est sans importance", "Remplace la technique", "Ignore la fatigue"],
        "RPE et proximité de l'échec guident le stimulus.",
      ],
      q3: [
        "Quand la série approche de l'échec…",
        "L'effort perçu augmente généralement",
        ["Tout devient plus facile", "La gravité disparaît", "Les muscles se reposent"],
        "Dernières reps = plus exigeantes.",
      ],
      blank: [
        "S'approcher de l'___ augmente les exigences de force sur les dernières répétitions.",
        "échec",
        ["étirement passif", "sieste", "marche lente"],
        "Fin de série = intensité maximale relative.",
      ],
      tf1: [
        "Les dernières répétitions d'une série proche de l'échec sont souvent les plus exigeantes.",
        true,
        "Vrai : recrutement et effort augmentent.",
      ],
      tf2: [
        "L'intensité d'effort n'a aucun lien avec l'hypertrophie.",
        false,
        "Faux : proximité de l'échec influence le stimulus.",
      ],
      multi: [
        "Que se passe-t-il en s'approchant de l'échec ? (plusieurs réponses)",
        ["Recrutement musculaire accru", "Effort perçu augmenté", "Exigences de force plus élevées"],
        ["Tension musculaire nulle", "Muscles totalement relâchés", "Gravité disparaît"],
        "Fin de série = intensité maximale relative.",
      ],
      order: [
        "Remets dans l'ordre une série proche de l'échec :",
        [
          "Premières reps relativement contrôlées",
          "Fatigue progressive, vitesse diminue",
          "Recrutement accru des unités motrices",
          "Dernière rep : capacité force maximale atteinte",
        ],
        "Proximité échec = plus de recrutement.",
      ],
      match: [
        "Associe concept et signe observable :",
        [
          ["Proximité de l'échec", "Ralentissement concentrique"],
          ["Intensité d'effort (RPE)", "Au-delà du %1RM seul"],
          ["Dernières reps", "Souvent les plus exigeantes"],
        ],
        "RPE complète l'analyse de charge.",
      ],
      scenario: [
        "Deux séries : une arrêtée à RPE 6, l'autre à RPE 9. Même charge, même reps. Différence de stimulus hypertrophique probable ?",
        "RPE 9 = plus de recrutement et tension sur les dernières reps",
        [
          "Identique : seul le nombre de reps compte",
          "RPE 6 supérieur car plus facile",
          "RPE sans lien avec le recrutement",
        ],
        "Intensité d'effort compte au-delà du chiffre sur la barre.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "La vitesse de mouvement",
    "Force-vitesse et contrôle.",
    [
      `La **vitesse** influence la production de force. Dans certaines conditions, plus un muscle doit produire rapidement de la force, plus les relations **force-vitesse** deviennent importantes.`,
      `En musculation classique, ralentir volontairement chaque répétition n'est cependant pas automatiquement supérieur : il faut distinguer **contrôle**, vitesse naturelle et tempo artificiellement ralenti.`,
      `Un mouvement contrôlé n'est pas forcément un mouvement ultra-lent. L'objectif est de maîtriser la trajectoire sans sacrifier inutilement la tension.`,
      `À retenir : vitesse = variable biomécanique ; ni toujours lent, ni toujours explosif sans contexte.`,
    ],
    ["vitesse", "tempo"],
    CP.entrainement,
    {
      q1: [
        "La vitesse de mouvement influence…",
        "La capacité à produire de la force",
        ["Uniquement la couleur des haltères", "La digestion", "Le nom des muscles"],
        "Relation force-vitesse.",
      ],
      q2: [
        "Ralentir artificiellement chaque rep…",
        "N'est pas automatiquement supérieur",
        ["Est toujours obligatoire", "Supprime la tension", "Remplace la charge"],
        "Contrôle ≠ ultra-lent systématique.",
      ],
      q3: [
        "Un mouvement contrôlé signifie surtout…",
        "Maîtriser la trajectoire et la position",
        ["Toujours durer 10 secondes", "Ne jamais accélérer", "Ignorer la résistance"],
        "Contrôle géométrique du mouvement.",
      ],
      blank: [
        "Plus la force doit être produite rapidement, plus la relation force-___ compte.",
        "vitesse",
        ["couleur", "odeur", "température"],
        "Courbe force-vitesse du muscle.",
      ],
      tf1: [
        "La vitesse fait partie des variables biomécaniques d'un exercice.",
        true,
        "Vrai : elle modifie la production de force.",
      ],
      tf2: [
        "Plus un mouvement est lent, meilleur il est dans tous les cas.",
        false,
        "Faux : contexte et objectif guident la vitesse.",
      ],
      multi: [
        "Quelles affirmations sur la vitesse sont correctes ? (plusieurs réponses)",
        ["Elle influence la production de force", "Contrôle ≠ ultra-lent systématique", "Relation force-vitesse existe"],
        ["Plus lent = toujours supérieur", "Vitesse sans effet biomécanique", "Tempo artificiel toujours obligatoire"],
        "Vitesse = variable à contextualiser.",
      ],
      order: [
        "Remets dans l'ordre l'évaluation de la vitesse d'exécution :",
        [
          "Définir l'objectif (force, hypertrophie, technique…)",
          "Observer la vitesse naturelle sous charge",
          "Distinguer contrôle et ralentissement excessif",
          "Ajuster si nécessaire pour maintenir la tension",
        ],
        "Contrôle géométrique, pas lenteur dogmatique.",
      ],
      match: [
        "Associe concept et nuance :",
        [
          ["Contrôle", "Maîtrise trajectoire et position"],
          ["Force-vitesse", "Plus rapide = moins de force max instantanée"],
          ["Tempo ultra-lent", "Pas automatiquement supérieur"],
        ],
        "Ni toujours lent, ni toujours explosif sans contexte.",
      ],
      scenario: [
        "Un pratiquant ralentit artificiellement chaque rep à 5 secondes concentrique + 5 excentrique sur tous les exercices. Problème biomécanique ?",
        "Peut réduire la charge utilisable et ne pas être optimal pour tous les objectifs",
        [
          "Toujours supérieur pour hypertrophie et force",
          "La vitesse n'a aucun effet sur la tension",
          "Obligatoire selon la biomécanique",
        ],
        "Contrôle oui, tempo extrême non systématique.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "La phase excentrique",
    "Force en allongement.",
    [
      `Lors de la phase **excentrique**, le muscle produit de la force tout en **s'allongeant**.`,
      `Un muscle peut généralement produire **davantage** de force en contraction excentrique qu'en contraction concentrique.`,
      `Cela explique en partie pourquoi **contrôler** une charge descendante peut être différent du fait de la soulever.`,
      `À retenir : excentrique = plus de force disponible, mais aussi plus de contrôle et de stress mécanique possible.`,
    ],
    ["excentrique", "phase"],
    CP.entrainement,
    {
      q1: [
        "La phase excentrique correspond à…",
        "Production de force pendant l'allongement musculaire",
        ["Raccourcissement musculaire", "Repos total", "Absence de tension"],
        "Excentrique = allongement sous tension.",
      ],
      q2: [
        "En excentrique, un muscle peut généralement…",
        "Produire plus de force qu'en concentrique",
        ["Produire zéro force", "Moins de force qu'en isométrique toujours", "Ignorer la charge"],
        "Capacité force supérieure en excentrique.",
      ],
      q3: [
        "Contrôler la descente d'une charge…",
        "Peut être différent biomécaniquement de la montée",
        ["Est identique à la montée", "Supprime la tension", "N'implique aucun muscle"],
        "Profil excentrique spécifique.",
      ],
      blank: [
        "En phase excentrique, le muscle produit de la force en s'___.",
        "allongeant",
        ["reposant", "disparaissant", "digérant"],
        "Concentrique = raccourcir ; excentrique = allonger.",
      ],
      tf1: [
        "La phase excentrique implique une production de force pendant l'allongement.",
        true,
        "Vrai : définition de l'excentrique.",
      ],
      tf2: [
        "Un muscle produit toujours moins de force en excentrique qu'en concentrique.",
        false,
        "Faux : l'excentrique permet souvent plus de force.",
      ],
      multi: [
        "Quelles caractéristiques de la phase excentrique ? (plusieurs réponses)",
        ["Muscle s'allonge sous tension", "Force généralement supérieure à la concentrique", "Contrôle descente différent de la montée"],
        ["Muscle se raccourcit", "Aucune tension produite", "Identique biomécaniquement à la montée"],
        "Excentrique = allongement + forte capacité de force.",
      ],
      order: [
        "Remets dans l'ordre une rep avec phase excentrique contrôlée :",
        [
          "Fin de phase concentrique (muscle raccourci)",
          "Inversion du mouvement",
          "Production de force en allongement (excentrique)",
          "Contrôle de la charge vers la position de départ",
        ],
        "Descente contrôlée ≠ relâchement passif.",
      ],
      match: [
        "Associe phase et caractéristique :",
        [
          ["Excentrique", "Allongement sous tension"],
          ["Concentrique", "Raccourcissement sous tension"],
          ["Excentrique", "Capacité force souvent supérieure"],
        ],
        "Deux phases, profils mécaniques différents.",
      ],
      scenario: [
        "Au squat, un pratiquant laisse la barre « tomber » en descente sans contrôle. Quelle différence biomécanique vs descente contrôlée ?",
        "Perte du contrôle excentrique, contraintes et recrutement différents",
        [
          "Identique : la gravité fait tout le travail",
          "Excentrique sans tension musculaire",
          "Toujours plus sûr sans contrôle",
        ],
        "Contrôler la descente = phase excentrique active.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "La phase concentrique",
    "Force en raccourcissement et ralentissement.",
    [
      `Lors de la phase **concentrique**, le muscle produit une force tout en se **raccourcissant**.`,
      `Lorsque la charge devient trop importante par rapport aux capacités instantanées, la **vitesse diminue** jusqu'à ce que le mouvement ne puisse plus être poursuivi.`,
      `Cette diminution de vitesse est particulièrement visible lors des séries proches de l'**échec**.`,
      `À retenir : concentrique = phase « montante » ; ralentissement = signal de limite de force.`,
    ],
    ["concentrique", "phase"],
    CP.entrainement,
    {
      q1: [
        "La phase concentrique correspond à…",
        "Production de force pendant le raccourcissement musculaire",
        ["Allongement musculaire", "Repos passif", "Absence de mouvement"],
        "Concentrique = raccourcir sous tension.",
      ],
      q2: [
        "Quand la charge dépasse la capacité instantanée…",
        "La vitesse concentrique diminue jusqu'à l'arrêt",
        ["La vitesse augmente toujours", "La gravité s'annule", "Le muscle se déconnecte"],
        "Ralentissement visible près de l'échec.",
      ],
      q3: [
        "Le ralentissement concentrique en fin de série indique…",
        "Approche de la limite de force",
        ["Que l'exercice est trop facile", "Absence de tension", "Erreur de respiration seule"],
        "Vitesse qui chute = capacité maximale atteinte.",
      ],
      blank: [
        "En concentrique, le muscle se ___ tout en produisant de la force.",
        "raccourcit",
        ["allonge", "disperse", "refroidit"],
        "Opposé de la phase excentrique.",
      ],
      tf1: [
        "Près de l'échec, la vitesse concentrique diminue souvent.",
        true,
        "Vrai : signe de limite de production de force.",
      ],
      tf2: [
        "La phase concentrique correspond à un allongement musculaire.",
        false,
        "Faux : concentrique = raccourcissement.",
      ],
      multi: [
        "Quelles caractéristiques de la phase concentrique ? (plusieurs réponses)",
        ["Muscle se raccourcit sous tension", "Vitesse diminue près de l'échec", "Phase « montante » du mouvement"],
        ["Muscle s'allonge", "Repos sans tension", "Vitesse constante jusqu'à l'échec"],
        "Concentrique = raccourcissement + limite de force visible.",
      ],
      order: [
        "Remets dans l'ordre l'approche de l'échec en concentrique :",
        [
          "Charge manageable, vitesse normale",
          "Fatigue progressive en fin de série",
          "Vitesse concentrique diminue",
          "Impossibilité de poursuivre le mouvement (échec)",
        ],
        "Ralentissement = signal limite de force.",
      ],
      match: [
        "Associe phase et observation :",
        [
          ["Concentrique", "Raccourcissement musculaire"],
          ["Ralentissement", "Approche de la limite de force"],
          ["Échec", "Arrêt du mouvement concentrique"],
        ],
        "Vitesse qui chute = capacité max atteinte.",
      ],
      scenario: [
        "En dernière rep au bench, la barre monte très lentement puis s'arrête à mi-chemin. Qu'indique cela biomécaniquement ?",
        "Capacité de force concentrique insuffisante à cette position (échec)",
        [
          "Phase excentrique involontaire",
          "Technique parfaite recommandée",
          "Absence de tension musculaire",
        ],
        "Arrêt concentrique = limite de production de force.",
      ],
    },
    "INTERMEDIATE",
  ),
];
