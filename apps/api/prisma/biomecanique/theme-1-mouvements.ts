import { CP } from "./checkpoints";
import { buildLesson } from "./build-lesson";

export const THEME_1_LESSONS = [
  buildLesson(
    "Flexion et extension",
    "Diminuer ou augmenter l'angle.",
    [
      `La **flexion** diminue généralement l'angle entre deux segments, tandis que l'**extension** l'augmente.`,
      `Le **squat**, par exemple, implique notamment une flexion puis une extension de la hanche et du genou.`,
      `Il faut éviter de confondre le mouvement **global** avec celui d'une seule articulation : un exercice peut faire intervenir plusieurs articulations simultanément.`,
      `À retenir : flexion et extension décrivent un changement d'angle ; un exercice peut en combiner plusieurs.`,
    ],
    ["flexion", "extension"],
    CP.mouvements,
    {
      q1: [
        "La flexion correspond généralement à…",
        "Une diminution de l'angle entre deux segments",
        ["Une rotation externe", "Un écartement latéral", "Une inclinaison du tronc uniquement"],
        "Flexion = angle qui se referme.",
      ],
      q2: [
        "L'extension correspond généralement à…",
        "Une augmentation de l'angle entre deux segments",
        ["Un rapprochement vers la ligne médiane", "Une rotation interne seule", "Une pause isométrique"],
        "Extension = angle qui s'ouvre.",
      ],
      q3: [
        "Au squat, on observe surtout…",
        "Flexion puis extension de hanche et genou",
        ["Uniquement de l'abduction d'épaule", "Seulement une rotation de cheville", "Aucun mouvement articulaire"],
        "Le squat combine flexion et extension des membres inférieurs.",
      ],
      blank: [
        "Un exercice peut mobiliser plusieurs ___ en même temps.",
        "articulations",
        ["vitamines", "barres", "séances"],
        "Le mouvement global ne se réduit pas à une seule articulation.",
      ],
      tf1: [
        "Le squat implique notamment flexion et extension de hanche et genou.",
        true,
        "Vrai : c'est un mouvement multi-articulaire classique.",
      ],
      tf2: [
        "Flexion et extension décrivent toujours le mouvement global d'un seul exercice.",
        false,
        "Faux : plusieurs articulations peuvent bouger simultanément.",
      ],
      multi: [
        "Quels mouvements impliquent principalement flexion ou extension ? (plusieurs réponses)",
        ["Squat (hanche et genou)", "Curl biceps (coude)", "Extension de triceps (coude)"],
        ["Abduction latérale d'épaule", "Rotation externe de hanche seule", "Inclinaison latérale pure"],
        "Flexion/extension = changement d'angle entre segments.",
      ],
      order: [
        "Remets dans l'ordre la phase descendante d'un squat :",
        [
          "Flexion de la cheville (dorsiflexion)",
          "Flexion du genou",
          "Flexion de la hanche",
          "Contrôle excentrique de la descente",
        ],
        "Plusieurs articulations fléchissent simultanément au squat.",
      ],
      match: [
        "Associe mouvement et définition :",
        [
          ["Flexion", "Diminution de l'angle entre segments"],
          ["Extension", "Augmentation de l'angle entre segments"],
          ["Squat", "Flexion puis extension multi-articulaire"],
        ],
        "Définitions fondamentales du plan sagittal.",
      ],
      scenario: [
        "En bas d'un squat, les genoux et les hanches sont fléchis. Quel mouvement faut-il produire pour remonter ?",
        "Extension simultanée de la hanche et du genou",
        [
          "Abduction des épaules",
          "Flexion supplémentaire du tronc",
          "Rotation externe du coude uniquement",
        ],
        "Remonter = ouvrir les angles fléchis.",
      ],
    },
  ),
  buildLesson(
    "Abduction et adduction",
    "Éloignement et rapprochement.",
    [
      `L'**abduction** correspond généralement à l'éloignement d'un segment par rapport à la **ligne médiane** du corps.`,
      `L'**adduction** correspond au mouvement inverse : rapprocher le segment vers la ligne médiane.`,
      `Les **élévations latérales** sont un exemple classique d'exercice comportant une importante composante d'abduction de l'épaule.`,
      `À retenir : abduction/adduction décrivent un déplacement latéral par rapport au centre du corps.`,
    ],
    ["abduction", "adduction"],
    CP.mouvements,
    {
      q1: [
        "L'abduction correspond surtout à…",
        "L'éloignement d'un segment de la ligne médiane",
        ["La flexion du coude", "L'extension du genou", "La rotation du tronc uniquement"],
        "Abduction = s'éloigner du centre.",
      ],
      q2: [
        "L'adduction correspond à…",
        "Le rapprochement vers la ligne médiane",
        ["L'éloignement latéral", "La rotation externe", "L'extension complète du coude"],
        "Adduction = revenir vers le centre.",
      ],
      q3: [
        "Les élévations latérales comportent surtout…",
        "De l'abduction d'épaule",
        ["De la flexion de hanche", "De l'extension de cheville", "De la rotation du cou"],
        "Le bras s'écarte latéralement de la ligne médiane.",
      ],
      blank: [
        "L'abduction et l'adduction se décrivent par rapport à la ligne ___.",
        "médiane",
        ["verticale de la barre", "du sol uniquement", "des haltères"],
        "La référence est le centre anatomique du corps.",
      ],
      tf1: [
        "Les élévations latérales sont un bon exemple d'abduction d'épaule.",
        true,
        "Vrai : le bras s'écarte latéralement.",
      ],
      tf2: [
        "Abduction et adduction décrivent les mêmes mouvements.",
        false,
        "Faux : ce sont des directions opposées.",
      ],
      multi: [
        "Quels mouvements comportent une composante d'abduction ? (plusieurs réponses)",
        ["Élévations latérales", "Écartement de hanche (hip abduction)", "Ouverture des bras en étoile"],
        ["Adduction de la hanche", "Flexion du coude", "Extension du genou"],
        "Abduction = éloignement de la ligne médiane.",
      ],
      order: [
        "Remets dans l'ordre une élévation latérale du début à la fin :",
        [
          "Bras le long du corps (adduction)",
          "Début d'abduction d'épaule",
          "Bras à l'horizontale (abduction maximale)",
          "Retour contrôlé vers adduction",
        ],
        "Cycle abduction → adduction autour de la ligne médiane.",
      ],
      match: [
        "Associe terme et direction :",
        [
          ["Abduction", "Éloignement de la ligne médiane"],
          ["Adduction", "Rapprochement vers la ligne médiane"],
          ["Ligne médiane", "Référence centrale du corps"],
        ],
        "Directions opposées dans le plan frontal.",
      ],
      scenario: [
        "En fin d'élévation latérale, le bras est à l'horizontale, éloigné du corps. Quel mouvement ramène l'haltère le long du corps ?",
        "Adduction de l'épaule",
        [
          "Abduction supplémentaire",
          "Extension du coude seule",
          "Rotation du tronc sans mouvement d'épaule",
        ],
        "Revenir au centre = adduction.",
      ],
    },
  ),
  buildLesson(
    "Les rotations",
    "Changer l'orientation d'un segment.",
    [
      `Les articulations peuvent également produire des **rotations**. Elles changent l'orientation d'un segment autour d'un axe.`,
      `L'**épaule** est particulièrement intéressante car elle permet une grande quantité de rotation. La **hanche** possède elle aussi une importante capacité de rotation.`,
      `La position d'un membre peut donc changer fortement la manière dont les muscles participent au mouvement, notamment pour les muscles bi-articulaires.`,
      `À retenir : la rotation modifie l'alignement des segments et donc le recrutement musculaire.`,
    ],
    ["rotation", "epaule"],
    CP.mouvements,
    {
      q1: [
        "Une rotation articulaire…",
        "Change l'orientation d'un segment autour d'un axe",
        ["Augmente toujours l'angle en flexion", "Supprime la gravité", "Fixe la barre au sol"],
        "La rotation tourne le segment.",
      ],
      q2: [
        "Quelle articulation permet beaucoup de rotation ?",
        "L'épaule",
        ["Le coude uniquement", "L'articulation du genou seule", "Le sternum"],
        "L'épaule est très mobile en rotation.",
      ],
      q3: [
        "La hanche…",
        "Possède aussi une importante capacité de rotation",
        ["Ne peut jamais tourner", "Ne bouge qu'en flexion", "Remplace le rôle de la cheville"],
        "Hanche et épaule sont très mobiles.",
      ],
      blank: [
        "Changer la position d'un membre modifie comment les ___ participent au mouvement.",
        "muscles",
        ["vitamines", "chaussures", "horaires"],
        "La géométrie influence le recrutement.",
      ],
      tf1: [
        "La rotation de l'épaule peut modifier le recrutement musculaire.",
        true,
        "Vrai : la position change la ligne de traction.",
      ],
      tf2: [
        "Seule l'épaule peut produire de la rotation au corps humain.",
        false,
        "Faux : la hanche et d'autres articulations tournent aussi.",
      ],
      multi: [
        "Quelles articulations permettent des rotations importantes ? (plusieurs réponses)",
        ["Épaule", "Hanche", "Colonne vertébrale"],
        ["Coude uniquement", "Genou sans rotation", "Cheville fixe"],
        "Plusieurs articulations tournent autour d'un axe.",
      ],
      order: [
        "Remets dans l'ordre l'analyse d'une rotation articulaire :",
        [
          "Identifier le segment qui tourne",
          "Repérer l'axe de rotation",
          "Déterminer le plan (souvent transverse)",
          "Relier aux muscles rotateurs",
        ],
        "Rotation = changement d'orientation autour d'un axe.",
      ],
      match: [
        "Associe articulation et capacité rotatoire :",
        [
          ["Épaule", "Rotation interne et externe marquée"],
          ["Hanche", "Rotation importante en fente et squat"],
          ["Coude", "Pronation-supination de l'avant-bras"],
        ],
        "Chaque articulation a un profil rotatoire propre.",
      ],
      scenario: [
        "En développé couché prise serrée, les coudes restent proches du corps. Quelle rotation d'épaule favorise cette position ?",
        "Rotation interne de l'épaule",
        [
          "Abduction maximale permanente",
          "Extension de hanche",
          "Rotation externe maximale des coudes",
        ],
        "La position des coudes dépend de la rotation d'épaule.",
      ],
    },
  ),
  buildLesson(
    "Les mouvements scapulaires",
    "Omoplate : élévation, rétraction, rotation.",
    [
      `L'**omoplate** (scapula) est essentielle dans de nombreux mouvements du haut du corps.`,
      `Elle peut notamment :\n\n- s'**élever** ;\n- s'**abaisser** ;\n- se déplacer vers l'**avant** (protraction) ;\n- se **rapprocher** de la colonne (rétraction) ;\n- **tourner** vers le haut ou vers le bas.`,
      `Comprendre la scapula est indispensable pour analyser correctement les mouvements de **poussée** et de **tirage**.`,
      `À retenir : l'omoplate n'est pas fixe ; son contrôle conditionne épaule, dos et développés.`,
    ],
    ["scapula", "omoplate"],
    CP.mouvements,
    {
      q1: [
        "L'omoplate peut notamment…",
        "S'élever, s'abaisser, se protracter et se rétracter",
        ["Rester totalement immobile en permanence", "Remplacer le rôle du fémur", "Produire uniquement de la flexion de genou"],
        "La scapula est très mobile.",
      ],
      q2: [
        "La rétraction de l'omoplate correspond à…",
        "Un rapprochement vers la colonne",
        ["Un écartement latéral du bras", "Une flexion du coude seule", "Une extension de cheville"],
        "Rétraction = omoplates vers le dos.",
      ],
      q3: [
        "La scapula est surtout importante pour…",
        "Les mouvements de poussée et de tirage",
        ["Les squats uniquement", "La course à pied uniquement", "La digestion"],
        "Épaule et dos dépendent du contrôle scapulaire.",
      ],
      blank: [
        "L'omoplate est aussi appelée la ___.",
        "scapula",
        ["clavicule", "fémur", "sternum"],
        "Scapula = terme anatomique de l'omoplate.",
      ],
      tf1: [
        "Comprendre les mouvements scapulaires aide à analyser poussées et tirages.",
        true,
        "Vrai : la scapula oriente l'épaule.",
      ],
      tf2: [
        "L'omoplate reste fixe pendant un développé couché.",
        false,
        "Faux : elle bouge et se stabilise activement.",
      ],
      multi: [
        "Quels mouvements scapulaires existent ? (plusieurs réponses)",
        ["Élévation et abaissement", "Protraction et rétraction", "Rotation supérieure et inférieure"],
        ["Flexion de genou", "Extension de cheville", "Rotation du fémur uniquement"],
        "La scapula est très mobile en 6 directions principales.",
      ],
      order: [
        "Remets dans l'ordre la préparation scapulaire au tirage :",
        [
          "Rétraction des omoplates",
          "Dépression (abaissement) légère",
          "Stabilisation pendant le tirage",
          "Contrôle en fin de mouvement",
        ],
        "Scapula stable = base efficace pour tirer.",
      ],
      match: [
        "Associe mouvement scapulaire et description :",
        [
          ["Rétraction", "Omoplates vers la colonne"],
          ["Protraction", "Omoplates vers l'avant"],
          ["Élévation", "Omoplates vers le haut"],
        ],
        "Mouvements essentiels en poussée et tirage.",
      ],
      scenario: [
        "En rowing, les omoplates partent en protraction en fin de mouvement. Quel ajustement améliore le recrutement du dos ?",
        "Maintenir rétraction et dépression pendant le tirage",
        [
          "Élever les épaules vers les oreilles",
          "Laisser les omoplates totalement libres",
          "Protracter davantage à chaque rep",
        ],
        "Contrôle scapulaire = meilleur tirage.",
      ],
    },
  ),
  buildLesson(
    "Les mouvements de la colonne",
    "Flexion, extension, rotation, inclinaison.",
    [
      `La **colonne vertébrale** peut notamment effectuer de la flexion, de l'extension, de la rotation et de l'inclinaison latérale.`,
      `En musculation, la colonne ne doit pas être considérée comme une structure devant être systématiquement « immobile ». La question importante est plutôt : **quelle quantité de mouvement et quelle charge** sont appropriées à la tâche ?`,
      `Un deadlift contrôlé, un good morning ou un overhead squat impliquent des exigences différentes sur la colonne. L'analyse dépend du mouvement et du niveau de contrôle.`,
      `À retenir : colonne mobile oui, mais avec contrôle, charge adaptée et objectif clair.`,
    ],
    ["colonne", "rachis"],
    CP.mouvements,
    {
      q1: [
        "La colonne vertébrale peut produire notamment…",
        "Flexion, extension, rotation et inclinaison latérale",
        ["Uniquement de la flexion", "Aucun mouvement", "Seulement de l'abduction"],
        "Le rachis est multi-plan.",
      ],
      q2: [
        "En musculation, la bonne question sur la colonne est…",
        "Quelle amplitude et quelle charge sont appropriées ?",
        ["Doit-elle être totalement rigide en permanence ?", "Faut-il toujours l'immobiliser à 0° ?", "Peut-on ignorer sa position ?"],
        "Le contexte détermine l'exigence.",
      ],
      q3: [
        "Un deadlift contrôlé implique…",
        "Des exigences spécifiques de position et de charge sur la colonne",
        ["Aucune sollicitation du tronc", "Uniquement du travail de mollet", "Zéro contrôle postural"],
        "La colonne stabilise et transmet les forces.",
      ],
      blank: [
        "La colonne n'est pas toujours « immobile » : il faut adapter amplitude et ___.",
        "charge",
        ["couleur", "musique", "marque"],
        "Mouvement et charge doivent être compatibles.",
      ],
      tf1: [
        "La colonne peut bouger dans plusieurs directions selon l'exercice.",
        true,
        "Vrai : flexion, extension, rotation, inclinaison.",
      ],
      tf2: [
        "Toute flexion de colonne sous charge est toujours dangereuse sans nuance.",
        false,
        "Faux : tout dépend du contrôle, de l'amplitude et de la charge.",
      ],
      multi: [
        "Quels mouvements la colonne vertébrale peut-elle produire ? (plusieurs réponses)",
        ["Flexion", "Extension", "Rotation", "Inclinaison latérale"],
        ["Abduction d'épaule", "Flexion de cheville seule", "Pronation du poignet"],
        "Le rachis est mobile dans plusieurs plans.",
      ],
      order: [
        "Remets dans l'ordre l'analyse d'un deadlift sur la colonne :",
        [
          "Observer la position neutre de départ",
          "Identifier l'inclinaison du tronc sous charge",
          "Évaluer le contrôle lombaire",
          "Adapter charge et amplitude si nécessaire",
        ],
        "Colonne : contrôle et charge adaptée, pas rigidité absolue.",
      ],
      match: [
        "Associe exercice et exigence sur la colonne :",
        [
          ["Deadlift", "Stabilisation en flexion de hanche"],
          ["Good morning", "Contrôle en flexion de hanche dominante"],
          ["Overhead squat", "Extension thoracique + stabilité"],
        ],
        "Chaque exercice impose des exigences différentes au rachis.",
      ],
      scenario: [
        "Un pratiquant cambrer excessivement en bas de squat lourd. Quelle approche biomécanique est la plus pertinente ?",
        "Réduire charge ou amplitude et renforcer le contrôle du tronc",
        [
          "Ignorer la position car seuls les quadriceps comptent",
          "Augmenter la charge pour « corriger » automatiquement",
          "Imposer la même profondeur à tout le monde",
        ],
        "Amplitude, charge et contrôle doivent être compatibles.",
      ],
    },
  ),
];
