import { CP } from "./checkpoints";
import { buildLesson } from "./build-lesson";

export const THEME_8_LESSONS = [
  buildLesson(
    "La méthode d'analyse en 7 questions",
    "Analyser n'importe quel exercice.",
    [
      `Pour analyser presque n'importe quel exercice, pose-toi ces **sept questions** :\n\n1. Quelle est la **résistance** ?\n2. Dans quelle **direction** agit-elle ?\n3. Quelles **articulations** bougent ?\n4. Quels **mouvements** produisent-elles ?\n5. Quels **muscles** peuvent produire ces mouvements ?\n6. À quels moments les **bras de levier** sont-ils les plus importants ?\n7. Comment la **technique** modifie-t-elle ces éléments ?`,
      `Avec cette méthode, tu peux analyser un exercice que tu n'as jamais vu auparavant.`,
      `C'est la synthèse de tout le parcours biomécanique : résistance → articulations → muscles → leviers → technique.`,
      `À retenir : 7 questions = grille d'analyse universelle.`,
    ],
    ["analyse", "methode"],
    CP.analyse,
    {
      q1: [
        "La première question d'analyse est…",
        "Quelle est la résistance ?",
        ["Quelle est la couleur du tapis ?", "Quel est le nom du coach ?", "Combien de miroirs ?"],
        "Identifier la charge externe.",
      ],
      q2: [
        "La deuxième question porte sur…",
        "La direction de la résistance",
        ["La marque des chaussures", "L'heure du repas", "Le BPM au repos"],
        "Ligne de résistance.",
      ],
      q3: [
        "La septième question concerne…",
        "Comment la technique modifie les éléments",
        ["La couleur des haltères", "Le type de musique", "Le nombre de followers"],
        "Technique redistribue contraintes et leviers.",
      ],
      blank: [
        "Pour analyser un exercice, il faut identifier quelles ___ bougent.",
        "articulations",
        ["vitamines", "séances", "chaussures"],
        "Question 3 de la méthode.",
      ],
      tf1: [
        "Cette méthode permet d'analyser un exercice inconnu.",
        true,
        "Vrai : grille reproductible.",
      ],
      tf2: [
        "Il suffit de mémoriser exercice = muscle sans poser de questions.",
        false,
        "Faux : l'analyse structurée est essentielle.",
      ],
      multi: [
        "Quelles questions font partie de la méthode en 7 points ? (plusieurs réponses)",
        ["Quelle est la résistance ?", "Quelles articulations bougent ?", "Comment la technique modifie-t-elle les éléments ?"],
        ["Quelle est la couleur du tapis ?", "Quel est le BPM ?", "Quelle marque de ceinture ?"],
        "Grille reproductible pour tout exercice.",
      ],
      order: [
        "Remets dans l'ordre les 4 premières questions de la méthode :",
        [
          "Quelle est la résistance ?",
          "Dans quelle direction agit-elle ?",
          "Quelles articulations bougent ?",
          "Quels mouvements produisent-elles ?",
        ],
        "Résistance → direction → articulations → mouvements.",
      ],
      match: [
        "Associe question et contenu :",
        [
          ["Question 1", "Identifier la résistance"],
          ["Question 3", "Articulations mobilisées"],
          ["Question 6", "Moments de bras de levier max"],
        ],
        "Chaque question couvre un aspect de l'analyse.",
      ],
      scenario: [
        "Tu découvres un exercice inconnu à la poulie. Par quoi commencer l'analyse ?",
        "Identifier la résistance et sa direction (questions 1 et 2)",
        [
          "Mémoriser quel muscle « travaille » sans observer",
          "Ignorer la direction du câble",
          "Copier la technique d'un exercice différent",
        ],
        "Toujours commencer par résistance et direction.",
      ],
    },
    "ADVANCED",
  ),
  buildLesson(
    "Identifier le muscle limitant",
    "Impliqué ≠ limitant.",
    [
      `Le muscle qui « travaille » n'est pas nécessairement celui qui **limite** la série.`,
      `Un exercice peut être limité par : la **force** d'un muscle, la **stabilité**, la **respiration**, la **prise**, la **technique** ou la **fatigue générale**.`,
      `Il faut donc différencier **muscle impliqué** et **muscle limitant**. C'est crucial pour programmer et corriger.`,
      `À retenir : celui qui brûle n'est pas toujours celui qui lâche en premier.`,
    ],
    ["limitant", "fatigue"],
    CP.analyse,
    {
      q1: [
        "Muscle impliqué et muscle limitant…",
        "Ne sont pas toujours les mêmes",
        ["Sont toujours identiques", "N'existent pas en biomécanique", "Se confondent toujours"],
        "Impliqué ≠ facteur d'échec.",
      ],
      q2: [
        "Une série peut être limitée par…",
        "Force musculaire, stabilité, prise ou technique",
        ["Uniquement la couleur des disques", "Le jour de la semaine", "La température"],
        "Plusieurs facteurs possibles.",
      ],
      q3: [
        "Identifier le facteur limitant aide à…",
        "Programmer et corriger plus efficacement",
        ["Ignorer la technique", "Supprimer l'analyse", "Fixer le 1RM sans réfléchir"],
        "Diagnostic avant prescription.",
      ],
      blank: [
        "Le muscle qui « travaille » n'est pas forcément celui qui ___ la série.",
        "limite",
        ["nomme", "colore", "remplace"],
        "Limitant = cause de l'échec.",
      ],
      tf1: [
        "La stabilité peut être le facteur limitant d'un exercice.",
        true,
        "Vrai : pas toujours la force pure d'un muscle.",
      ],
      tf2: [
        "Le muscle qui brûle le plus est toujours celui qui limite la série.",
        false,
        "Faux : impliqué et limitant diffèrent.",
      ],
      multi: [
        "Quels facteurs peuvent limiter une série ? (plusieurs réponses)",
        ["Force d'un muscle spécifique", "Stabilité", "Prise ou grip", "Technique"],
        ["Couleur des disques", "Jour de la semaine", "Type de musique"],
        "Limitant ≠ toujours le muscle qui « brûle ».",
      ],
      order: [
        "Remets dans l'ordre l'identification du facteur limitant :",
        [
          "Observer où/ quand la série échoue",
          "Lister muscles impliqués",
          "Distinguer impliqué vs limitant",
          "Proposer correction ciblée",
        ],
        "Diagnostic avant prescription.",
      ],
      match: [
        "Associe concept et définition :",
        [
          ["Muscle impliqué", "Participe au mouvement"],
          ["Muscle limitant", "Cause l'échec ou le blocage"],
          ["Stabilité limitante", "Tronc ou grip lâche en premier"],
        ],
        "Crucial pour programmer et corriger.",
      ],
      scenario: [
        "En deadlift, un pratiquant lâche la barre car ses avant-bras lâchent avant le dos. Facteur limitant ?",
        "Grip / avant-bras, pas nécessairement chaîne postérieure ou dos",
        [
          "Toujours les lombaires",
          "Toujours les fessiers",
          "Le muscle qui brûle le plus dans le dos",
        ],
        "Celui qui lâche en premier = limitant réel.",
      ],
    },
    "ADVANCED",
  ),
  buildLesson(
    "Modifier un exercice volontairement",
    "Changer le profil biomécanique.",
    [
      `Une fois la biomécanique comprise, on peut **modifier** un exercice pour changer son profil.`,
      `On peut modifier : la **position du corps**, la **prise**, l'**amplitude**, la **trajectoire**, la **distance** entre charge et articulation, la **direction de résistance** et la **vitesse**.`,
      `La question devient alors : quelle modification augmente ou diminue le moment sur l'articulation ou le muscle que je veux cibler ?`,
      `À retenir : modifier un exercice = modifier délibérément le profil de tension.`,
    ],
    ["modification", "variante"],
    CP.analyse,
    {
      q1: [
        "Pour modifier le profil d'un exercice, on peut changer…",
        "Prise, amplitude, trajectoire ou direction de résistance",
        ["Uniquement la musique", "La couleur des murs", "Le prénom du coach"],
        "Leviers biomécaniques multiples.",
      ],
      q2: [
        "La bonne question lors d'une modification est…",
        "Quel moment ou muscle veux-je augmenter ou diminuer ?",
        ["Comment copier une vidéo ?", "Quelle est la mode ?", "Faut-il toujours plus de poids ?"],
        "Objectif biomécanique clair.",
      ],
      q3: [
        "Rapprocher la charge de l'articulation…",
        "Diminue généralement le moment externe",
        ["Augmente toujours le moment", "N'a aucun effet", "Supprime les muscles"],
        "Levier biomécanique modifiable.",
      ],
      blank: [
        "Modifier la ___ de résistance change le profil d'un exercice à la poulie.",
        "direction",
        ["couleur", "odeur", "température"],
        "Câble vs haltère = direction différente.",
      ],
      tf1: [
        "Comprendre la biomécanique permet de créer des variantes ciblées.",
        true,
        "Vrai : modification volontaire du profil.",
      ],
      tf2: [
        "Seul le poids sur la barre peut être modifié, jamais la géométrie.",
        false,
        "Faux : prise, amplitude et trajectoire sont des leviers.",
      ],
      multi: [
        "Quels leviers permettent de modifier un exercice ? (plusieurs réponses)",
        ["Prise et amplitude", "Trajectoire et position du corps", "Direction de résistance (poulie)", "Distance charge-articulation"],
        ["Couleur des disques", "Marque de la salle", "Heure d'entraînement"],
        "Modification volontaire = profil de tension ciblé.",
      ],
      order: [
        "Remets dans l'ordre la modification ciblée d'un exercice :",
        [
          "Définir l'objectif (plus/moins de moment sur X)",
          "Identifier le levier biomécanique disponible",
          "Appliquer la modification (prise, poulie, amplitude…)",
          "Vérifier l'effet sur le profil de tension",
        ],
        "Objectif biomécanique clair avant modification.",
      ],
      match: [
        "Associe modification et effet typique :",
        [
          ["Rapprocher charge du corps", "Réduit moment externe"],
          ["Poulie basse vs haute", "Change direction de résistance"],
          ["Prise plus serrée au bench", "Plus de travail triceps"],
        ],
        "Chaque levier modifie le profil.",
      ],
      scenario: [
        "Tu veux augmenter le moment sur le deltoïde en élévation latérale sans changer la masse. Quelle modification ?",
        "Ralentir en position bras horizontal ou ajouter une pause où le levier est maximal",
        [
          "Rapprocher l'haltère du corps en permanence",
          "Utiliser une prise plus serrée au poignet uniquement",
          "Augmenter la vitesse en bas du mouvement",
        ],
        "Plus de temps sous tension au moment maximal.",
      ],
    },
    "ADVANCED",
  ),
  buildLesson(
    "Corriger une technique",
    "Diagnostic avant consigne.",
    [
      `Il ne faut pas corriger une technique simplement parce qu'elle ne ressemble pas à un **modèle visuel**.`,
      `Il faut d'abord déterminer : quel est l'**objectif** ? Quel est le **problème** ? Quelle **capacité** manque ? Quelle modification permet de résoudre le problème ?`,
      `Exemple : si une personne n'arrive pas à descendre suffisamment au squat, les causes possibles incluent mobilité, proportions, contrôle moteur, stabilité ou charge trop élevée.`,
      `À retenir : une bonne correction commence par un diagnostic, pas par une consigne automatique.`,
    ],
    ["correction", "technique"],
    CP.analyse,
    {
      q1: [
        "Avant de corriger une technique, il faut…",
        "Identifier l'objectif et le problème réel",
        ["Copier une photo sans analyse", "Imposer la même posture à tous", "Augmenter la charge"],
        "Diagnostic avant prescription.",
      ],
      q2: [
        "Si quelqu'un ne descend pas assez au squat, les causes peuvent être…",
        "Mobilité, proportions, stabilité ou charge excessive",
        ["Uniquement la flemme", "La couleur des chaussures", "Le nom du programme"],
        "Multiples facteurs biomécaniques.",
      ],
      q3: [
        "Corriger sans diagnostic mène souvent à…",
        "Des consignes inadaptées",
        ["Une technique parfaite automatique", "Zéro problème", "Plus de mobilité instantanée"],
        "Correction ≠ copier un modèle.",
      ],
      blank: [
        "Une bonne correction commence par un ___, pas par une consigne automatique.",
        "diagnostic",
        ["miroir", "selfie", "hashtag"],
        "Comprendre le pourquoi avant le comment.",
      ],
      tf1: [
        "Deux personnes peuvent avoir des techniques différentes mais efficaces.",
        true,
        "Vrai : morphologie et objectif guident la technique.",
      ],
      tf2: [
        "Il faut toujours corriger pour ressembler à un modèle visuel unique.",
        false,
        "Faux : diagnostic et objectif priment sur l'apparence.",
      ],
      multi: [
        "Avant de corriger une technique, quoi évaluer ? (plusieurs réponses)",
        ["Objectif du mouvement", "Problème réel identifié", "Capacité manquante (mobilité, force, contrôle)"],
        ["Ressemblance à une photo", "Couleur des chaussures", "Popularité sur les réseaux"],
        "Diagnostic avant consigne.",
      ],
      order: [
        "Remets dans l'ordre une correction technique efficace :",
        [
          "Définir l'objectif de l'exercice",
          "Identifier le problème observé",
          "Diagnostiquer la cause (mobilité, charge, proportions…)",
          "Prescrire une modification adaptée",
        ],
        "Comprendre le pourquoi avant le comment.",
      ],
      match: [
        "Associe problème squat et cause possible :",
        [
          ["Profondeur insuffisante", "Mobilité cheville ou hanche"],
          ["Valgus genoux", "Contrôle ou force hanche"],
          ["Cambrure excessive", "Charge excessive ou mobilité thoracique"],
        ],
        "Multiples causes biomécaniques possibles.",
      ],
      scenario: [
        "Un pratiquant ne descend pas assez au squat. Le coach impose immédiatement « dos vertical » sans diagnostic. Quel problème ?",
        "Correction sans analyse de mobilité, proportions ou charge",
        [
          "Approche biomécanique optimale",
          "Morphologie sans importance",
          "Tout le monde doit avoir le même dos vertical",
        ],
        "Bonne correction = diagnostic, pas copie de modèle.",
      ],
    },
    "ADVANCED",
  ),
  buildLesson(
    "Analyser n'importe quel exercice",
    "La compétence finale.",
    [
      `La dernière compétence consiste à ne plus mémoriser des listes du type « exercice X = muscle Y ». Tu dois être capable de **reconstruire** l'analyse.`,
      `Pour chaque exercice :\n\n1. Observe la **résistance**.\n2. Identifie sa **direction**.\n3. Identifie les **articulations**.\n4. Détermine leurs **mouvements**.\n5. Identifie les muscles capables de produire ces mouvements.\n6. Analyse les **bras de levier**.\n7. Observe comment ils changent pendant l'**amplitude**.\n8. Analyse la **position** du muscle.\n9. Observe la **technique** et les proportions du pratiquant.\n10. Détermine quel muscle ou quelle structure est réellement **limitante**.`,
      `C'est cette méthode qui transforme la biomécanique en outil pratique de **programmation** et d'**analyse** de la musculation.`,
      `À retenir : tu as maintenant la grille complète — applique-la à chaque nouvel exercice.`,
    ],
    ["synthese", "competence"],
    CP.analyse,
    {
      q1: [
        "La compétence finale en biomécanique est de…",
        "Reconstruire l'analyse plutôt que mémoriser des listes",
        ["Apprendre 500 noms d'exercices", "Ignorer la résistance", "Copier sans réfléchir"],
        "Méthode > mémoire passive.",
      ],
      q2: [
        "Étape 6 de l'analyse complète :",
        "Analyser les bras de levier",
        ["Choisir la musique", "Compter les miroirs", "Mesurer la température"],
        "Leviers = difficulté ressentie.",
      ],
      q3: [
        "Étape 10 de l'analyse complète :",
        "Déterminer le facteur réellement limitant",
        ["Nommer la couleur des haltères", "Fixer le BPM", "Ignorer la technique"],
        "Limitant = cause de l'échec ou du blocage.",
      ],
      blank: [
        "La biomécanique devient un outil pratique quand tu peux l'appliquer à la ___ et à l'analyse.",
        "programmation",
        ["couleur", "mode", "météo"],
        "Lien entre théorie et pratique.",
      ],
      tf1: [
        "Cette méthode en 10 étapes couvre résistance, articulations, muscles et technique.",
        true,
        "Vrai : synthèse complète du parcours.",
      ],
      tf2: [
        "Mémoriser « exercice = muscle » suffit pour analyser n'importe quel mouvement.",
        false,
        "Faux : l'analyse reconstruite est la vraie compétence.",
      ],
      multi: [
        "Quelles étapes couvrent l'analyse complète en 10 points ? (plusieurs réponses)",
        ["Résistance et direction", "Articulations et mouvements", "Bras de levier et facteur limitant"],
        ["Couleur des haltères", "Nombre de followers", "Marque de la ceinture"],
        "Synthèse de tout le parcours biomécanique.",
      ],
      order: [
        "Remets dans l'ordre les 4 premières étapes de l'analyse complète :",
        [
          "Observer la résistance",
          "Identifier sa direction",
          "Repérer les articulations",
          "Déterminer leurs mouvements",
        ],
        "Base reproductible pour tout exercice nouveau.",
      ],
      match: [
        "Associe étape et contenu (analyse 10 étapes) :",
        [
          ["Étape 6", "Analyser les bras de levier"],
          ["Étape 8", "Position musculaire selon l'angle"],
          ["Étape 10", "Facteur réellement limitant"],
        ],
        "Grille complète résistance → limitant.",
      ],
      scenario: [
        "Tu vois un exercice de tirage unilatéral à la poulie pour la première fois. Quelle compétence appliquer ?",
        "Reconstruire l'analyse : résistance, direction, articulations, muscles, leviers, limitant",
        [
          "Deviner le muscle sans observer le mouvement",
          "Copier la liste « exercice = muscle » d'un site",
          "Ignorer la direction du câble",
        ],
        "Méthode > mémoire passive : tu peux analyser l'inconnu.",
      ],
    },
    "ADVANCED",
  ),
];
