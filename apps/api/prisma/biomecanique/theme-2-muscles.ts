import { CP } from "./checkpoints";
import { buildLesson } from "./build-lesson";

export const THEME_2_LESSONS = [
  buildLesson(
    "Comment fonctionne un muscle",
    "Activation, tension et mouvement.",
    [
      `Un muscle produit une **tension** lorsqu'il est activé par le système nerveux.`,
      `Cette tension est transmise par le **tendon** aux os et peut provoquer un mouvement articulaire.`,
      `Un muscle ne « sait » pas qu'il fait un squat ou un curl. Il produit simplement des **forces** qui contribuent à un mouvement particulier selon sa ligne de traction et la position articulaire.`,
      `À retenir : muscle = générateur de tension ; le mouvement final dépend de la géométrie et des autres muscles impliqués.`,
    ],
    ["muscle", "tension"],
    CP.muscles,
    {
      q1: [
        "Un muscle produit de la tension quand…",
        "Il est activé par le système nerveux",
        ["Il est au repos total sans signal", "La barre est plus légère que 1 kg", "La salle est chauffée"],
        "L'activation nerveuse déclenche la contraction.",
      ],
      q2: [
        "La tension musculaire est transmise aux os via…",
        "Le tendon",
        ["Le cartilage seul", "La peau", "L'air ambiant"],
        "Tendon = lien muscle-os.",
      ],
      q3: [
        "Un muscle en musculation…",
        "Produit des forces selon sa position, pas selon le nom de l'exercice",
        ["Choisit consciemment de faire un squat", "Change de fonction selon la marque des haltères", "Ne répond qu'aux machines"],
        "Le muscle répond à la demande mécanique.",
      ],
      blank: [
        "La tension musculaire peut provoquer un mouvement ___ si la géométrie le permet.",
        "articulaire",
        ["digestif", "respiratoire seul", "cutané"],
        "Force + articulation = mouvement possible.",
      ],
      tf1: [
        "Un muscle ne « sait » pas quel exercice tu fais : il produit de la force.",
        true,
        "Vrai : c'est le contexte mécanique qui compte.",
      ],
      tf2: [
        "Un muscle peut transmettre de la force aux os sans tendon.",
        false,
        "Faux : le tendon assure la transmission.",
      ],
      multi: [
        "Quelles affirmations sur le fonctionnement musculaire sont correctes ? (plusieurs réponses)",
        ["La tension nécessite une activation nerveuse", "Le tendon transmet la force à l'os", "Le muscle répond au contexte mécanique, pas au nom de l'exercice"],
        ["Le muscle « choisit » consciemment l'exercice", "La tension passe directement os → muscle", "Sans nerveux, le muscle produit quand même du mouvement"],
        "Muscle = générateur de tension commandé par le système nerveux.",
      ],
      order: [
        "Remets dans l'ordre la production d'un mouvement :",
        [
          "Signal nerveux vers le muscle",
          "Production de tension musculaire",
          "Transmission via le tendon",
          "Rotation ou translation à l'articulation",
        ],
        "Du signal à la force, puis au mouvement.",
      ],
      match: [
        "Associe élément et fonction :",
        [
          ["Système nerveux", "Commande l'activation musculaire"],
          ["Muscle", "Produit la tension"],
          ["Tendon", "Relie muscle et os"],
        ],
        "Chaîne neuromusculaire de base.",
      ],
      scenario: [
        "Un pratiquant fait un squat puis un leg press avec la même intensité perçue. Le quadriceps produit-il de la tension différemment selon l'exercice ?",
        "Oui : la géométrie et la résistance changent le contexte mécanique",
        [
          "Non : le muscle « sait » toujours qu'il fait du quadriceps",
          "Non : seule la couleur de la machine compte",
          "Oui : le muscle cesse de produire de la tension au leg press",
        ],
        "Le muscle répond à la demande mécanique, pas à l'étiquette.",
      ],
    },
  ),
  buildLesson(
    "Origine, insertion et ligne de traction",
    "Comprendre l'action d'un muscle.",
    [
      `Pour comprendre l'action d'un muscle, il faut connaître approximativement son **origine**, son **insertion**, la **direction** dans laquelle il tire et les **articulations** qu'il traverse.`,
      `La **ligne de traction** permet de comprendre quelles actions un muscle peut produire. C'est l'une des bases fondamentales de l'analyse biomécanique.`,
      `Exemple : le biceps tire approximativement vers le haut sur l'avant-bras, ce qui favorise la flexion du coude dans certaines positions.`,
      `À retenir : origine + insertion + direction = prédire l'action possible d'un muscle.`,
    ],
    ["origine", "insertion"],
    CP.muscles,
    {
      q1: [
        "La ligne de traction d'un muscle indique surtout…",
        "La direction dans laquelle il tire",
        ["Sa couleur à l'IRM", "Son prix en compléments", "Sa température"],
        "La direction prédit l'action articulaire.",
      ],
      q2: [
        "Pour analyser un muscle, on considère notamment…",
        "Origine, insertion et articulations traversées",
        ["Uniquement son nom latin", "Seulement la charge externe", "La musique de la salle"],
        "La géométrie musculaire guide l'analyse.",
      ],
      q3: [
        "L'insertion d'un muscle correspond à…",
        "L'attache distale (souvent la plus mobile)",
        ["Le centre du corps uniquement", "La résistance externe", "Le point d'appui au sol"],
        "Origine et insertion définissent la ligne de traction.",
      ],
      blank: [
        "Origine, insertion et ligne de ___ sont des bases de l'analyse musculaire.",
        "traction",
        ["respiration", "digestion", "circulation"],
        "La direction de tirage détermine l'action.",
      ],
      tf1: [
        "Connaître la ligne de traction aide à prédire l'action d'un muscle.",
        true,
        "Vrai : c'est un outil fondamental.",
      ],
      tf2: [
        "Seul le nom du muscle suffit pour comprendre son action sans regarder ses attaches.",
        false,
        "Faux : origine et insertion sont essentielles.",
      ],
      multi: [
        "Pour déterminer l'action d'un muscle, quels éléments sont nécessaires ? (plusieurs réponses)",
        ["Origine et insertion", "Direction de la ligne de traction", "Articulations traversées"],
        ["Couleur du muscle à l'IRM", "Marque des haltères", "Heure de la séance"],
        "Géométrie musculaire = prédiction de l'action.",
      ],
      order: [
        "Remets dans l'ordre l'analyse de l'action musculaire :",
        [
          "Repérer origine et insertion",
          "Tracer la ligne de traction",
          "Identifier les articulations traversées",
          "Prédire le mouvement possible",
        ],
        "Origine → insertion → direction → action.",
      ],
      match: [
        "Associe terme et définition :",
        [
          ["Origine", "Attache proximale (souvent fixe)"],
          ["Insertion", "Attache distale (souvent mobile)"],
          ["Ligne de traction", "Direction dans laquelle le muscle tire"],
        ],
        "Bases de l'analyse musculaire.",
      ],
      scenario: [
        "Le biceps tire l'avant-bras vers le haut. Quelle action articulaire favorise-t-il principalement ?",
        "Flexion du coude",
        [
          "Extension du genou",
          "Abduction de la hanche",
          "Extension de la cheville",
        ],
        "Ligne de traction du biceps = flexion du coude.",
      ],
    },
  ),
  buildLesson(
    "Agonistes et antagonistes",
    "Actions principales et opposées.",
    [
      `L'**agoniste** est généralement considéré comme un muscle contribuant fortement à une action donnée.`,
      `L'**antagoniste** produit une action opposée. Exemple : biceps en flexion du coude, triceps en extension.`,
      `Mais la réalité est plus complexe : plusieurs muscles peuvent participer simultanément au même mouvement et certains muscles peuvent **changer de rôle** selon la position de l'articulation.`,
      `À retenir : agoniste/antagoniste sont des rôles contextuels, pas des étiquettes fixes.`,
    ],
    ["agoniste", "antagoniste"],
    CP.muscles,
    {
      q1: [
        "Un agoniste est surtout…",
        "Un muscle contribuant fortement à l'action visée",
        ["Toujours au repos", "Un muscle qui ne travaille jamais", "Un muscle uniquement excentrique"],
        "L'agoniste mène l'action analysée.",
      ],
      q2: [
        "Un antagoniste produit…",
        "Une action opposée à celle de l'agoniste",
        ["Exactement la même action", "Aucune force", "Uniquement de la stabilité sans opposition"],
        "Antagoniste = direction opposée.",
      ],
      q3: [
        "Plusieurs muscles peuvent…",
        "Participer simultanément au même mouvement",
        ["Jamais travailler ensemble", "Remplacer les articulations", "Supprimer la gravité"],
        "Le recrutement est souvent multi-musculaire.",
      ],
      blank: [
        "Un muscle peut changer de ___ selon la position articulaire.",
        "rôle",
        ["couleur", "nom", "marque"],
        "Agoniste/antagoniste dépendent du contexte.",
      ],
      tf1: [
        "Le rôle agoniste ou antagoniste peut varier selon la position.",
        true,
        "Vrai : le contexte modifie le recrutement.",
      ],
      tf2: [
        "Un seul muscle travaille toujours seul pendant un mouvement.",
        false,
        "Faux : plusieurs muscles coopèrent souvent.",
      ],
      multi: [
        "Quelles affirmations sur agonistes et antagonistes sont correctes ? (plusieurs réponses)",
        ["L'agoniste contribue fortement à l'action visée", "L'antagoniste produit une action opposée", "Un muscle peut changer de rôle selon la position"],
        ["Agoniste et antagoniste sont des étiquettes fixes", "Un seul muscle suffit à tout mouvement", "Les antagonistes ne produisent jamais de force"],
        "Agoniste/antagoniste = rôles contextuels.",
      ],
      order: [
        "Remets dans l'ordre la flexion du coude au curl :",
        [
          "Biceps (agoniste) fléchit le coude",
          "Triceps (antagoniste) s'allonge passivement ou freine",
          "Autres muscles stabilisent l'épaule",
          "Extension controlée en phase excentrique",
        ],
        "Coopération et opposition simultanées.",
      ],
      match: [
        "Associe muscle et rôle au curl :",
        [
          ["Biceps", "Agoniste de la flexion du coude"],
          ["Triceps", "Antagoniste (extension opposée)"],
          ["Deltoïde antérieur", "Stabilisateur de l'épaule"],
        ],
        "Exemple classique agoniste/antagoniste.",
      ],
      scenario: [
        "En extension de triceps, le biceps s'allonge pendant que le triceps raccourcit. Quel rôle joue le biceps ici ?",
        "Antagoniste (action opposée à l'extension)",
        [
          "Agoniste principal du mouvement",
          "Muscle inactif sans aucun rôle",
          "Seul muscle impliqué",
        ],
        "Pendant l'extension, le biceps est l'antagoniste.",
      ],
    },
  ),
  buildLesson(
    "Muscles mono- et bi-articulaires",
    "Une ou deux articulations traversées.",
    [
      `Certains muscles traversent **une seule** articulation, d'autres en traversent **deux**.`,
      `Le **droit fémoral**, par exemple, traverse la hanche et le genou. Sa longueur et sa capacité à produire de la force dépendent donc de la position de **plusieurs** articulations.`,
      `C'est extrêmement important pour comprendre le leg extension, le leg curl, les mouvements de bras et de nombreuses variantes.`,
      `À retenir : un muscle bi-articulaire « ressent » la position de deux articulations à la fois.`,
    ],
    ["bi-articulaire", "mono-articulaire"],
    CP.muscles,
    {
      q1: [
        "Un muscle bi-articulaire…",
        "Traverse deux articulations",
        ["Ne traverse aucune articulation", "Remplace les tendons", "Ne produit jamais de force"],
        "Exemple : droit fémoral (hanche + genou).",
      ],
      q2: [
        "Le droit fémoral traverse…",
        "La hanche et le genou",
        ["Le coude et le poignet", "L'épaule seule", "La cheville uniquement"],
        "C'est un classique bi-articulaire.",
      ],
      q3: [
        "La force d'un muscle bi-articulaire dépend…",
        "De la position de plusieurs articulations",
        ["Uniquement du nom de l'exercice", "Seulement de la température", "Du type de chaussures"],
        "Deux articulations modifient sa longueur.",
      ],
      blank: [
        "Un muscle ___ traverse une seule articulation.",
        "mono-articulaire",
        ["bi-articulaire", "cardiaque", "osseux"],
        "Mono = une articulation ; bi = deux.",
      ],
      tf1: [
        "La position de la hanche peut influencer le droit fémoral au genou.",
        true,
        "Vrai : muscle bi-articulaire = interactions entre articulations.",
      ],
      tf2: [
        "Tous les muscles traversent exactement deux articulations.",
        false,
        "Faux : certains sont mono-articulaires.",
      ],
      multi: [
        "Quels muscles sont bi-articulaires ? (plusieurs réponses)",
        ["Droit fémoral (hanche + genou)", "Biceps (épaule + coude)", "Long chef du triceps (épaule + coude)"],
        ["Vaste médial (genou seul)", "Brachial (coude seul)", "Soleaire (cheville seule)"],
        "Bi-articulaire = traverse deux articulations.",
      ],
      order: [
        "Remets dans l'ordre l'effet d'un muscle bi-articulaire :",
        [
          "Identifier les deux articulations traversées",
          "Observer la position de chaque articulation",
          "Déterminer la longueur musculaire résultante",
          "Prédire la force disponible",
        ],
        "Deux articulations modifient longueur et force.",
      ],
      match: [
        "Associe muscle et articulations traversées :",
        [
          ["Droit fémoral", "Hanche et genou"],
          ["Biceps", "Épaule et coude"],
          ["Vaste médial", "Genou uniquement"],
        ],
        "Mono vs bi-articulaire en pratique.",
      ],
      scenario: [
        "Au leg extension, un pratiquant fléchit fortement la hanche en gardant le buste penché. Comment cela affecte-t-il le droit fémoral ?",
        "Il s'allonge davantage, modifiant sa capacité de force au genou",
        [
          "Aucun effet car le droit fémoral ne traverse que le genou",
          "Le droit fémoral disparaît en position assise",
          "Seul le biceps est affecté",
        ],
        "Muscle bi-articulaire = position de hanche ET genou comptent.",
      ],
    },
    "INTERMEDIATE",
  ),
  buildLesson(
    "La relation longueur-tension",
    "Force selon la longueur musculaire.",
    [
      `Un muscle ne produit pas nécessairement sa force maximale lorsqu'il est extrêmement **raccourci** ou extrêmement **allongé**.`,
      `Il existe une relation entre la **longueur** du muscle et sa capacité à produire de la tension : la courbe longueur-tension.`,
      `Cela explique pourquoi un exercice peut être très difficile dans certaines positions et beaucoup plus facile dans d'autres, même avec la même charge.`,
      `À retenir : la position articulaire modifie la longueur musculaire et donc la force disponible.`,
    ],
    ["longueur-tension", "force"],
    CP.muscles,
    {
      q1: [
        "La relation longueur-tension décrit…",
        "Comment la force varie selon la longueur du muscle",
        ["Comment les calories varient selon l'heure", "La vitesse de course uniquement", "La couleur du muscle"],
        "Longueur musculaire influence la tension.",
      ],
      q2: [
        "Un muscle extrêmement raccourci ou allongé…",
        "Ne produit pas toujours sa force maximale",
        ["Produit toujours plus de force", "Ne peut jamais produire de tension", "Ignore la charge externe"],
        "Les extrêmes de longueur limitent souvent la force.",
      ],
      q3: [
        "Avec la même charge, un exercice peut sembler plus dur…",
        "Dans certaines positions articulaires",
        ["À chaque instant de façon identique", "Uniquement le lundi", "Seulement à jeun"],
        "La géométrie modifie la difficulté ressentie.",
      ],
      blank: [
        "La courbe longueur-___ relie longueur musculaire et capacité de production de force.",
        "tension",
        ["vitesse", "température", "couleur"],
        "C'est un concept clé de physiologie musculaire.",
      ],
      tf1: [
        "La position articulaire peut rendre une même charge plus ou moins difficile.",
        true,
        "Vrai : longueur musculaire et bras de levier changent.",
      ],
      tf2: [
        "Un muscle produit toujours sa force max en position très raccourcie.",
        false,
        "Faux : les extrêmes de longueur réduisent souvent la force.",
      ],
      multi: [
        "Quelles affirmations sur la relation longueur-tension sont correctes ? (plusieurs réponses)",
        ["La force varie selon la longueur musculaire", "Les extrêmes raccourci/allongé limitent souvent la force", "La position articulaire modifie la difficulté ressentie"],
        ["La force est identique à toute longueur", "Seule la charge externe compte", "La longueur musculaire n'influence jamais le curl"],
        "Courbe longueur-tension = concept clé.",
      ],
      order: [
        "Remets dans l'ordre l'effet de la longueur sur la force :",
        [
          "Position articulaire détermine la longueur musculaire",
          "Longueur influence les filaments actifs",
          "Capacité de force varie le long de la courbe",
          "Certaines positions du mouvement sont plus difficiles",
        ],
        "Position → longueur → tension disponible.",
      ],
      match: [
        "Associe position et effet typique :",
        [
          ["Muscle très raccourci", "Force souvent réduite"],
          ["Longueur intermédiaire", "Force souvent optimale"],
          ["Muscle très allongé", "Force souvent réduite"],
        ],
        "Courbe en cloche de la relation longueur-tension.",
      ],
      scenario: [
        "Au curl, la rep est plus difficile à 90° qu'en bas du mouvement avec le même haltère. Quelle explication biomécanique est la plus probable ?",
        "Combinaison de bras de levier et longueur musculaire défavorables à 90°",
        [
          "L'haltère devient plus lourd à mi-amplitude",
          "Le biceps ne fonctionne qu'en bas du mouvement",
          "La gravité disparaît en position basse",
        ],
        "Même charge, profil de difficulté variable.",
      ],
    },
    "INTERMEDIATE",
  ),
];
