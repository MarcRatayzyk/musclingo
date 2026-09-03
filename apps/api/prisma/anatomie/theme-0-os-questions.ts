import { bank25 } from "./qcm-bank";
import type { SeedQuestion } from "../anatomie-quiz-helpers";

export const THEME_0_QUIZZES: SeedQuestion[][] = [
  bank25([
    [
      "Quel os unique constitue le bras, de l'épaule au coude ?",
      "L'humérus",
      ["Le radius", "L'ulna", "Le fémur"],
      "L'humérus est le seul os du segment bras. Radius et ulna commencent plus bas, dans l'avant-bras.",
    ],
    [
      "Où s'emboîte la tête de l'humérus ?",
      "Dans l'omoplate",
      ["Dans le sternum", "Dans l'acétabulum", "Dans le radius"],
      "La tête humérale s'articule avec l'omoplate. L'acétabulum, lui, reçoit la tête du fémur à la hanche.",
    ],
    [
      "De quel côté de l'avant-bras se trouve le radius ?",
      "Côté pouce",
      ["Côté petit doigt", "Côté interne du coude uniquement", "Côté omoplate"],
      "Le radius est latéral, aligné avec le pouce. L'ulna est du côté du petit doigt.",
    ],
    [
      "De quel côté de l'avant-bras se trouve l'ulna ?",
      "Côté petit doigt",
      ["Côté pouce", "Côté rotule", "Entre les deux métacarpiens"],
      "L'ulna est médial, du côté de l'auriculaire. Le radius est du côté du pouce.",
    ],
    [
      "Quel os forme surtout la charnière du coude ?",
      "L'ulna",
      ["Le radius", "La clavicule", "La patella"],
      "L'ulna assure la charnière du coude. Le radius, lui, pivote autour de l'ulna pour orienter la paume.",
    ],
    [
      "Que fait le radius par rapport à l'ulna quand tu orientes la paume ?",
      "Il pivote autour de l'ulna",
      [
        "Il reste fixe pendant que l'ulna tourne",
        "Il se déboîte du coude",
        "Il se solidarise au fémur",
      ],
      "La prono-supination vient du radius qui tourne autour de l'ulna, plus stable au coude.",
    ],
    [
      "En supination, comment est orientée la paume ?",
      "Vers le haut",
      ["Vers le bas", "Vers l'arrière du crâne", "Face au sol, pouce en dedans"],
      "Supination = paume vers le haut, comme pour tenir un bol. La pronation inverse cette orientation.",
    ],
    [
      "En pronation, comment est orientée la paume ?",
      "Vers le bas",
      ["Vers le haut", "Vers le plafond, pouce en dehors", "Face à l'omoplate"],
      "Pronation = paume vers le bas. C'est la position d'un curl inversé.",
    ],
    [
      "Un curl biceps classique, paume vers le haut, place l'avant-bras en…",
      "Supination",
      ["Pronation", "Extension de hanche", "Rotation du tibia"],
      "Paume haute = supination. Le coude se fléchit, mais c'est l'orientation de l'avant-bras qui définit le curl classique.",
    ],
    [
      "Un curl inversé, paume vers le bas, place l'avant-bras en…",
      "Pronation",
      ["Supination", "Lordose cervicale", "Cyphose thoracique"],
      "Paume basse = pronation. La flexion de coude reste la même, seule la prise change.",
    ],
    [
      "Que partagent le curl classique, le curl marteau et le curl inversé ?",
      "La même flexion de coude",
      [
        "La même orientation de paume",
        "Un radius immobile",
        "L'absence d'humérus dans le mouvement",
      ],
      "Les trois fléchissent le coude. Ce qui change, c'est la position de l'avant-bras et donc les muscles recrutés.",
    ],
    [
      "Quelle différence distingue surtout ces trois curls ?",
      "La prise, donc la position de l'avant-bras",
      [
        "L'os du bras utilisé",
        "La présence ou non de l'ulna",
        "Le fait de fléchir la hanche",
      ],
      "Humérus, radius et ulna restent les mêmes. Seule l'orientation radio-ulnaire (prise) varie.",
    ],
    [
      "Un curl marteau en prise neutre se situe entre…",
      "Supination et pronation",
      [
        "Flexion et extension de genou",
        "Cyphose et lordose",
        "Tibia et fibula",
      ],
      "Pouces vers l'avant, paume ni pleinement haute ni pleinement basse : une position intermédiaire d'avant-bras.",
    ],
    [
      "Pourquoi peux-tu tourner la paume sans changer la flexion du coude ?",
      "Parce que le radius pivote autour de l'ulna, qui reste la charnière",
      [
        "Parce que l'humérus se tord sur lui-même comme un radius",
        "Parce que l'omoplate tourne autour du radius",
        "Parce que l'ulna pivote autour du radius",
      ],
      "Deux libertés distinctes : l'ulna gère la charnière, le radius la rotation. Tu peux donc fléchir et orienter la main séparément.",
    ],
    [
      "Que se passerait-il si le radius ne pouvait plus pivoter autour de l'ulna ?",
      "La prono-supination serait bloquée",
      [
        "Le coude ne pourrait plus du tout fléchir",
        "L'humérus quitterait l'omoplate",
        "Seule la pronation resterait possible",
      ],
      "La flexion via la charnière ulnaire pourrait rester possible, mais tu ne pourrais plus orienter la paume haut ou bas.",
    ],
    [
      "Un pratiquant passe du curl classique au curl inversé. Que change-t-il surtout ?",
      "L'orientation de la paume, donc les muscles sollicités",
      [
        "L'os unique du bras",
        "La tête de l'humérus, qui quitte l'omoplate",
        "La charnière du coude, qui passe sur le radius seul",
      ],
      "Même flexion de coude, prise différente. Les muscles de l'avant-bras et du bras ne travaillent plus dans la même géométrie.",
    ],
    [
      "Quels os portent tes curls, tes extensions et tes dips ?",
      "Humérus, radius et ulna",
      ["Fémur, tibia et fibula", "Radius, ulna et fémur", "Clavicule, sternum et patella"],
      "Ces trois os forment la chaîne du membre supérieur, de l'épaule au poignet.",
    ],
    [
      "Combien d'os forment l'avant-bras ?",
      "Deux",
      ["Un", "Trois", "Cinq"],
      "Radius et ulna. L'humérus est l'os unique du bras, au-dessus du coude.",
    ],
    [
      "Quelle affirmation sur le coude est incorrecte ?",
      "Le radius forme la charnière principale du coude",
      [
        "L'ulna est côté petit doigt",
        "L'humérus s'emboîte dans l'omoplate",
        "La supination oriente la paume vers le haut",
      ],
      "C'est l'ulna qui forme surtout la charnière. Le radius pivote autour d'elle pour orienter la main.",
    ],
    [
      "Pourquoi changer de prise au curl peut-il modifier le ressenti musculaire alors que le coude fait le même mouvement ?",
      "La rotation radio-ulnaire place les muscles dans des positions mécaniques différentes",
      [
        "L'humérus change d'os selon la prise",
        "Le coude n'est plus une charnière en pronation",
        "L'omoplate bloque alors le radius",
      ],
      "La flexion reste identique, mais l'orientation de l'avant-bras change les bras de levier et le recrutement.",
    ],
    [
      "Pour un dip ou une extension, quel os transmet surtout la poussée de l'épaule vers l'avant-bras ?",
      "L'humérus",
      ["Le tibia", "Le calcanéum", "L'axis"],
      "L'humérus relie l'omoplate au coude. Radius et ulna prennent le relais sous le coude.",
    ],
    [
      "Quelle affirmation décrit le mieux le couple radius–ulna ?",
      "L'ulna stabilise la charnière ; le radius tourne pour orienter la main",
      [
        "Le radius est la charnière ; l'ulna tourne autour du pouce",
        "Les deux os pivotent également autour de l'humérus",
        "L'ulna est côté pouce et le radius côté petit doigt",
      ],
      "Division des rôles : charnière d'un côté, pivot de l'autre. Inverser ces rôles est une confusion fréquente.",
    ],
    [
      "Un pratiquant a la paume vers le sol pendant un curl. Quelle position d'avant-bras décrit-on ?",
      "La pronation",
      [
        "La supination",
        "Une prise neutre stricte de type marteau",
        "Une extension d'épaule",
      ],
      "Paume vers le sol = pronation, typique du curl inversé.",
    ],
    [
      "Quelle différence y a-t-il entre le rôle de l'humérus et celui du radius ?",
      "L'humérus est l'os unique du bras ; le radius est un os de l'avant-bras qui pivote",
      [
        "Les deux sont des os uniques du bras",
        "Le radius s'emboîte dans l'omoplate",
        "L'humérus est l'os côté pouce de l'avant-bras",
      ],
      "Segments distincts : humérus au-dessus du coude, radius en dessous, du côté du pouce.",
    ],
    [
      "Que se passe-t-il à l'épaule quand tu lèves le bras pour un curl ?",
      "La tête de l'humérus reste emboîtée dans l'omoplate pendant que le coude se fléchit",
      [
        "L'humérus quitte l'omoplate pour s'articuler avec le radius",
        "L'ulna remplace l'humérus dans l'omoplate",
        "Le sternum devient la charnière du coude",
      ],
      "La chaîne reste continue : tête humérale dans l'omoplate, flexion au coude, avant-bras radius–ulna.",
    ],
  ] satisfies QcmItem[]),

  bank25([
    [
      "Comment l'omoplate se comporte-t-elle sur la cage thoracique ?",
      "Elle glisse librement, sans être verrouillée dans une cavité",
      [
        "Elle est emboîtée comme la tête du fémur dans l'acétabulum",
        "Elle est soudée au sternum",
        "Elle pivote autour de l'ulna",
      ],
      "L'omoplate n'est pas une articulation « à cavité fixe » : elle glisse sur la cage, d'où la grande mobilité de l'épaule.",
    ],
    [
      "Quels os forment la ceinture scapulaire ?",
      "La clavicule et l'omoplate",
      ["Le sternum et le sacrum", "Le radius et l'ulna", "L'ilion et l'ischion"],
      "Clavicule + omoplate = socle mobile du bras. Ce n'est pas la ceinture pelvienne (bassin).",
    ],
    [
      "Que relie la clavicule ?",
      "Le sternum à l'épaule",
      ["L'omoplate au radius", "Le bassin au fémur", "Les cervicales aux côtes"],
      "La clavicule transmet les forces du bras vers le tronc en reliant sternum et épaule.",
    ],
    [
      "Combien de paires de côtes forment typiquement la cage thoracique ?",
      "Douze",
      ["Sept", "Cinq", "Huit"],
      "Douze paires de côtes, associées au sternum. Sept, cinq et huit correspondent à d'autres comptes vertébraux ou carpien.",
    ],
    [
      "Quel rôle principal jouent les vertèbres cervicales ici ?",
      "Porter la tête",
      ["S'articuler avec chaque paire de côtes", "Former le talon", "Recevoir la tête du fémur"],
      "Les cervicales portent la tête. Ce sont les thoraciques qui s'articulent avec les côtes.",
    ],
    [
      "Avec quoi s'articulent surtout les vertèbres thoraciques ?",
      "Les côtes",
      ["Le radius", "Le fémur", "Les phalanges"],
      "T1 à T12 portent les articulations costo-vertébrales, ce qui rigidifie le haut du dos par rapport au cou.",
    ],
    [
      "Au développé couché, que fait-on des omoplates avant de pousser ?",
      "On les fixe en arrière",
      [
        "On les laisse glisser vers les oreilles",
        "On les écarte au maximum du sternum",
        "On les rapproche de la colonne comme en fin de rowing",
      ],
      "Fixer les omoplates en arrière crée un socle stable. Les rapprocher activement de la colonne décrit plutôt le rowing.",
    ],
    [
      "Au rowing, que cherche-t-on surtout à faire avec les omoplates ?",
      "Les rapprocher de la colonne",
      [
        "Les figer en avant sur la cage",
        "Les coller au sternum",
        "Les bloquer en pronation",
      ],
      "Le tirage rapproche les omoplates. Au développé, on les fixe plutôt en arrière avant de pousser.",
    ],
    [
      "Quelle affirmation décrit le mieux la cage thoracique ?",
      "Sternum et côtes protègent cœur et poumons, et ancrent pectoraux et abdominaux",
      [
        "Elle est formée uniquement de l'omoplate et de la clavicule",
        "Elle glisse librement sur l'humérus",
        "Elle porte la tête à la place des cervicales",
      ],
      "La cage est le sternum plus les côtes. La ceinture scapulaire (clavicule + omoplate) glisse dessus.",
    ],
    [
      "Pourquoi la mobilité de l'omoplate est-elle à la fois une chance et une exigence ?",
      "Elle permet de hausser, d'abaisser ou de rapprocher les omoplates, mais demande du contrôle",
      [
        "Elle verrouille l'épaule comme une hanche profonde",
        "Elle empêche tout développé couché",
        "Elle remplace le rôle des côtes",
      ],
      "Sans cavité verrouillée, l'épaule gagne en amplitude. Sans contrôle, le socle du bras devient instable.",
    ],
    [
      "Un pratiquant sent ses épaules « flotter » au développé. Que lui manque-t-il le plus souvent ?",
      "Un calage des omoplates en arrière sur la cage",
      [
        "Un pivot du radius autour de l'ulna",
        "Une lordose lombaire maximale",
        "Un rapprochement du tibia et de la fibula",
      ],
      "Sans omoplates fixées, la ceinture scapulaire glisse au lieu de servir de socle à la poussée.",
    ],
    [
      "Quelle différence y a-t-il entre développé couché et rowing pour les omoplates ?",
      "On les fixe en arrière pour pousser ; on les rapproche pour tirer",
      [
        "On les rapproche pour pousser ; on les écarte pour tirer",
        "Elles sont immobiles dans les deux cas",
        "Seul le sternum bouge, jamais l'omoplate",
      ],
      "Même ceinture scapulaire, deux stratégies : stabilité de poussée versus mouvement de tirage.",
    ],
    [
      "Que transmet surtout la clavicule pendant une poussée ou un tirage lourd ?",
      "Les forces du bras vers le tronc",
      [
        "Le poids du corps vers le talus",
        "La flexion du coude vers l'ulna",
        "La lordose vers le sacrum",
      ],
      "En reliant sternum et épaule, la clavicule envoie les charges du membre supérieur vers le thorax.",
    ],
    [
      "Que se passe-t-il quand tu bloques ta respiration sous une barre lourde ?",
      "La cage se rigidifie",
      [
        "Les omoplates se soudent au radius",
        "Les cervicales s'articulent avec les côtes",
        "La clavicule quitte le sternum",
      ],
      "Sternum et côtes forment un cylindre qui peut se rigidifier. C'est un ancrage de tronc, pas un mouvement d'omoplate.",
    ],
    [
      "Quelle affirmation sur l'omoplate est incorrecte ?",
      "L'omoplate est verrouillée dans une cavité profonde comme la hanche",
      [
        "La clavicule et l'omoplate forment la ceinture scapulaire",
        "Les thoraciques s'articulent avec les côtes",
        "Les cervicales portent la tête",
      ],
      "L'omoplate glisse sur la cage. La hanche, avec l'acétabulum, est l'emboîture profonde.",
    ],
    [
      "Pourquoi le haut du dos est-il plus « cage » que « bras » dans une poussée ?",
      "Parce que sternum et côtes offrent un ancrage stable pendant que l'omoplate se cale dessus",
      [
        "Parce que le radius s'articule avec chaque côte",
        "Parce que l'humérus est soudé au sternum",
        "Parce que les cervicales portent les côtes",
      ],
      "Ceinture scapulaire mobile sur cage stable : c'est la base mécanique des poussées et des tirages.",
    ],
    [
      "Un pratiquant hausse les épaules à chaque répétition de rowing. Que révèle ce geste ?",
      "L'omoplate glisse vers le haut au lieu d'être contrôlée vers la colonne",
      [
        "La clavicule s'est détachée du sternum",
        "Les côtes ne s'articulent plus avec les thoraciques",
        "Les cervicales ont pris le rôle des omoplates",
      ],
      "Hausser, abaisser et rapprocher sont des libertés réelles de l'omoplate. En rowing, le rapprochement doit rester contrôlé.",
    ],
    [
      "Quelle structure n'appartient pas à la ceinture scapulaire ?",
      "Le sternum",
      ["La clavicule", "L'omoplate", "Les deux os de la ceinture scapulaire"],
      "Le sternum fait partie de la cage. La ceinture scapulaire, c'est clavicule + omoplate, même si la clavicule s'y accroche.",
    ],
    [
      "Quelle différence y a-t-il entre cervicales et thoraciques dans cette région ?",
      "Les cervicales portent la tête ; les thoraciques s'articulent avec les côtes",
      [
        "Les cervicales portent les côtes ; les thoraciques portent la tête",
        "Les deux s'articulent également avec les côtes",
        "Les thoraciques glissent sur l'omoplate comme un radius",
      ],
      "Même colonne, rôles distincts : tête en haut, cage plus bas.",
    ],
    [
      "Pourquoi un développé couché « sans dos » fatigue-t-il souvent plus les épaules ?",
      "Sans omoplates calées, le bras pousse depuis un socle qui glisse",
      [
        "Parce que l'ulna n'est plus la charnière du coude",
        "Parce que le sternum cesse de relier les côtes",
        "Parce que les cervicales s'articulent alors avec le radius",
      ],
      "La mobilité de l'omoplate devient un inconvénient si elle n'est pas contrôlée au moment de pousser.",
    ],
    [
      "Que protège surtout la cage thoracique ?",
      "Le cœur et les poumons",
      ["Le cerveau", "Les phalanges", "Le talus"],
      "Sternum et côtes forment un bouclier viscéral, tout en servant d'ancrage musculaire.",
    ],
    [
      "Un pratiquant rapproche les omoplates en fin de tirage horizontal. Quel os glisse alors sur la cage ?",
      "L'omoplate",
      ["La clavicule uniquement, sans l'omoplate", "Le sacrum", "Le calcanéum"],
      "C'est l'omoplate qui glisse. La clavicule accompagne le mouvement en restant le pont vers le sternum.",
    ],
    [
      "Quelle affirmation sur la colonne thoracique est incorrecte ?",
      "Les vertèbres cervicales s'articulent avec les douze paires de côtes",
      [
        "La cage compte le sternum et douze paires de côtes",
        "Au rowing, on rapproche les omoplates",
        "La clavicule relie le sternum à l'épaule",
      ],
      "Ce sont les thoraciques qui s'articulent avec les côtes. Les cervicales portent la tête.",
    ],
    [
      "Pourquoi la ceinture scapulaire n'est-elle pas une copie de la hanche ?",
      "Elle repose sur un glissement d'omoplate, pas sur une cavité profonde unique",
      [
        "Elle contient un acétabulum identique à celui du bassin",
        "La clavicule y joue le rôle du fémur",
        "Les côtes y remplacent le radius et l'ulna",
      ],
      "Hanche = emboîture. Épaule scapulaire = socle mobile sur la cage, d'où plus de liberté et plus de besoin de contrôle.",
    ],
    [
      "Que se passe-t-il mécaniquement si tu hausses, abaisses, puis rapproches les omoplates ?",
      "Tu explores les libertés de la ceinture scapulaire sur une cage restée relativement stable",
      [
        "Tu fais pivoter le sternum autour de l'ulna",
        "Tu changes le nombre de paires de côtes",
        "Tu transformes les cervicales en thoraciques",
      ],
      "La cage sert de rail ; l'omoplate se déplace dessus. C'est tout le principe de la ceinture scapulaire.",
    ],
  ] satisfies QcmItem[]),

  bank25([
    [
      "Combien de vertèbres lombaires compte un adulte typique ?",
      "Cinq (L1 à L5)",
      ["Sept (C1 à C7)", "Douze (T1 à T12)", "Trois"],
      "Cinq lombaires portent le poids du tronc. Sept et douze correspondent aux cervicales et aux thoraciques.",
    ],
    [
      "Comment s'appelle la courbure naturelle des lombaires vers l'avant ?",
      "La lordose",
      ["La cyphose", "La scoliose", "L'acétabulum"],
      "Lordose = creux lombaire vers l'avant. La cyphose est la courbure arrondie du thorax.",
    ],
    [
      "Quelle forme a le sacrum ?",
      "Un os triangulaire soudé",
      ["Un os long comme le fémur", "Huit petits os comme le carpe", "Une rotule flottante"],
      "Le sacrum est triangulaire, soudé, entre les lombaires au-dessus et le coccyx en dessous.",
    ],
    [
      "Où se situe le coccyx ?",
      "Sous le sacrum",
      ["Au-dessus de L1", "Entre l'ilion et le pubis", "Dans le genou"],
      "Le coccyx est la petite queue osseuse sous le sacrum.",
    ],
    [
      "L'os coxal est la fusion de quels éléments ?",
      "Ilion, ischion et pubis",
      ["Radius, ulna et humérus", "Talus, calcanéum et tibia", "Atlas, axis et sacrum"],
      "À l'âge adulte, ces trois pièces forment l'os de la hanche de chaque côté.",
    ],
    [
      "Que forme surtout l'ilion ?",
      "Les ailes du bassin, celles que tu sens en posant les mains sur les hanches",
      ["La rotule", "La clavicule", "Le tendon d'Achille"],
      "L'ilion est la grande partie supérieure et latérale de l'os coxal.",
    ],
    [
      "Qu'est-ce que l'acétabulum ?",
      "La cavité où s'emboîte la tête du fémur",
      [
        "La tête de l'humérus dans l'omoplate",
        "Le disque entre deux lombaires",
        "L'os du talon",
      ],
      "Creusée dans l'os coxal, cette emboîture fait la hanche. Ce n'est pas la glène de l'épaule.",
    ],
    [
      "Que transmet surtout le sacrum ?",
      "Les forces de la colonne vers le bassin",
      [
        "Les forces du radius vers l'ulna",
        "Le poids du crâne vers les côtes uniquement",
        "La pronation vers le carpe",
      ],
      "Placé sous les lombaires, le sacrum envoie la charge du tronc vers les os coxaux.",
    ],
    [
      "Pourquoi la profondeur de squat confortable n'est-elle pas la même pour tout le monde ?",
      "La forme et l'orientation de l'acétabulum varient d'une personne à l'autre",
      [
        "Tout le monde a le même nombre de lombaires variables",
        "Le coccyx change de côté selon la séance",
        "L'ilion disparaît en flexion de hanche",
      ],
      "L'emboîture de hanche n'a pas la même géométrie chez chacun : l'amplitude osseuse du squat suit cette forme.",
    ],
    [
      "Un pratiquant cambré à l'excès sous une barre. Que cherche-t-on plutôt à préserver ?",
      "Une lordose proche du neutre pour ménager les disques",
      [
        "Une cyphose lombaire maximale",
        "Un sacrum détaché du bassin",
        "Un acétabulum ouvert vers l'omoplate",
      ],
      "Les lombaires ont une lordose naturelle, mais sous charge on la garde proche du neutre.",
    ],
    [
      "Quelle différence y a-t-il entre lordose et cyphose ?",
      "La lordose est le creux lombaire vers l'avant ; la cyphose est l'arrondi thoracique",
      [
        "La lordose est thoracique ; la cyphose est lombaire",
        "Les deux décrivent l'acétabulum",
        "La cyphose est le nom des cinq lombaires",
      ],
      "Deux courbures opposées de la colonne, souvent inversées dans le vocabulaire courant.",
    ],
    [
      "Où se situe le sacrum par rapport aux lombaires et au coccyx ?",
      "Sous les lombaires, au-dessus du coccyx",
      [
        "Au-dessus de L1, sous le crâne",
        "Entre le radius et l'ulna",
        "Dans l'acétabulum",
      ],
      "Ordre de haut en bas : L1–L5, sacrum, coccyx.",
    ],
    [
      "Un pratiquant sent les mains sur les crêtes iliaques pour « verrouiller » le bassin au soulevé de terre. Que palpe-t-il ?",
      "L'ilion",
      ["L'ischion uniquement", "Le pubis uniquement", "Le calcanéum"],
      "Les ailes que l'on sent sur les hanches appartiennent à l'ilion, partie haute de l'os coxal.",
    ],
    [
      "Quelle affirmation sur l'acétabulum est incorrecte ?",
      "L'acétabulum reçoit la tête de l'humérus",
      [
        "Les lombaires vont de L1 à L5",
        "L'os coxal fusionne ilion, ischion et pubis",
        "Le sacrum est triangulaire",
      ],
      "L'acétabulum reçoit la tête du fémur. La tête de l'humérus s'emboîte dans l'omoplate.",
    ],
    [
      "Pourquoi les lombaires sont-elles plus massives que les autres vertèbres du tronc ?",
      "Elles portent le poids du tronc à la charnière avec les jambes",
      [
        "Elles s'articulent chacune avec une paire de côtes",
        "Elles font dire oui et non à la tête",
        "Elles forment le carpe",
      ],
      "Squat et soulevé de terre font passer toute la force par cette zone. D'où des vertèbres plus robustes.",
    ],
    [
      "Que se passe-t-il si l'acétabulum d'un pratiquant est plus « fermé » que celui d'un autre ?",
      "La hanche bute plus tôt ; le squat profond peut être moins confortable",
      [
        "Le nombre de lombaires diminue",
        "Le sacrum se transforme en cyphose",
        "L'ilion cesse de faire partie de l'os coxal",
      ],
      "La profondeur de squat n'est pas qu'une affaire de souplesse : la forme osseuse de l'emboîture compte.",
    ],
    [
      "Quelle structure relie le rachis lombaire au bassin ?",
      "Le sacrum",
      ["La clavicule", "Le radius", "La patella"],
      "Le sacrum, os triangulaire soudé, transmet les forces des lombaires vers les os coxaux.",
    ],
    [
      "Un pratiquant a du mal à garder le bas du dos « neutre » au squat. Quelle région osseuse est surtout concernée ?",
      "Les cinq lombaires et leur lordose",
      ["Les huit os du carpe", "L'atlas et l'axis seuls", "Les métatarsiens"],
      "C'est L1–L5 et leur courbure naturelle qu'on cherche à garder proche du neutre sous charge.",
    ],
    [
      "Quelle différence y a-t-il entre ilion et acétabulum ?",
      "L'ilion est l'aile du bassin ; l'acétabulum est la cavité de la tête fémorale",
      [
        "L'ilion est la cavité ; l'acétabulum est l'aile",
        "Les deux sont des os du pied",
        "L'acétabulum est une vertèbre lombaire",
      ],
      "Même os coxal, deux repères : crête iliaque d'un côté, emboîture de hanche de l'autre.",
    ],
    [
      "Pourquoi squat et soulevé de terre sollicitent-ils autant cette leçon ?",
      "Toute la force passe par la charnière entre le tronc et les jambes",
      [
        "Parce que le radius y pivote autour de l'ulna",
        "Parce que le carpe s'y articule avec le sternum",
        "Parce que l'omoplate y glisse sur le sacrum",
      ],
      "Lombaires, sacrum et bassin forment le passage obligatoire des charges du haut vers les membres inférieurs.",
    ],
    [
      "Quelle affirmation décrit le mieux l'os coxal ?",
      "Un os de hanche de chaque côté, fusion d'ilion, d'ischion et de pubis",
      [
        "Un os unique du bras",
        "Les cinq lombaires soudées",
        "Le sommet de la cheville",
      ],
      "Deux os coxaux encadrent le sacrum. Chacun résulte de trois pièces fusionnées.",
    ],
    [
      "Que se passe-t-il sous le sacrum ?",
      "On trouve le coccyx",
      ["On trouve L1", "On trouve l'atlas", "On trouve le sternum"],
      "Ordre : lombaires, sacrum, puis coccyx. L1 est tout en haut de la région lombaire.",
    ],
    [
      "Un pratiquant compare son squat à celui d'un partenaire plus à l'aise en profondeur. Quelle explication osseuse est la plus cohérente ?",
      "Des acétabulums de formes différentes autorisent des amplitudes différentes",
      [
        "L'un a sept lombaires et l'autre cinq selon la séance",
        "Le coccyx de l'un s'est transformé en ilion",
        "L'ischion a quitté l'os coxal chez l'un des deux",
      ],
      "La géométrie de l'emboîture de hanche varie. Ce n'est pas un défaut de « mental », c'est souvent de l'os.",
    ],
    [
      "Quelle affirmation sur la courbure lombaire est incorrecte ?",
      "La cyphose est la courbure naturelle des lombaires vers l'avant",
      [
        "L1 à L5 sont les lombaires",
        "Le sacrum transmet les forces vers le bassin",
        "L'ilion forme les ailes des hanches",
      ],
      "La courbure lombaire vers l'avant s'appelle lordose. La cyphose concerne surtout le thorax.",
    ],
    [
      "Pourquoi ménager les disques sous charge passe-t-il par le bassin et les lombaires ?",
      "Une lordose trop perdue ou trop forcée éloigne les lombaires d'un neutre protecteur",
      [
        "Parce que les disques du poignet portent le squat",
        "Parce que l'acétabulum est un disque intervertébral",
        "Parce que le coccyx s'articule avec les côtes",
      ],
      "Les lombaires portent le tronc. Leur courbure, proche du neutre, répartit mieux les contraintes sur les disques.",
    ],
  ] satisfies QcmItem[]),

  bank25([
    [
      "Quel est l'os le plus long du corps ?",
      "Le fémur",
      ["Le radius", "La clavicule", "Le tibia"],
      "Le fémur relie la hanche au genou et domine en longueur chez l'adulte.",
    ],
    [
      "Que relie le fémur ?",
      "La hanche au genou",
      ["L'épaule au coude", "Le poignet aux phalanges", "Le talon au tibia uniquement"],
      "Os de la cuisse : hanche d'un côté, genou de l'autre. L'humérus, lui, va de l'épaule au coude.",
    ],
    [
      "Où se trouve la patella ?",
      "Dans le tendon du quadriceps, au genou",
      ["Dans le tendon d'Achille", "Entre radius et ulna", "Sous le sacrum"],
      "La rotule « flotte » dans le tendon du quadriceps. Elle n'est pas un os de la jambe comme le tibia.",
    ],
    [
      "Quel os de la jambe porte surtout le poids jusqu'à la cheville ?",
      "Le tibia",
      ["La fibula", "Le radius", "L'ulna"],
      "Le tibia est l'os porteur. La fibula, plus fine, sert surtout d'ancrage et de stabilité latérale.",
    ],
    [
      "Quel est le rôle principal de la fibula ?",
      "Ancrage musculaire et stabilité latérale",
      [
        "Porter presque tout le poids du corps",
        "Former la rotule",
        "Recevoir la tête du fémur",
      ],
      "Plus fine, sur le côté externe, la fibula n'est pas l'os de charge. Le tibia assume ce rôle.",
    ],
    [
      "Que fait le LCA ?",
      "Il empêche le tibia de glisser vers l'avant",
      [
        "Il empêche le tibia de reculer",
        "Il relie le radius à l'ulna",
        "Il ancre le tendon d'Achille",
      ],
      "Ligament croisé antérieur : il bloque le glissement antérieur du tibia sous le fémur.",
    ],
    [
      "Que fait le LCP ?",
      "Il empêche le tibia de reculer",
      [
        "Il empêche le tibia de glisser vers l'avant",
        "Il forme la patella",
        "Il porte le poids à la place du tibia",
      ],
      "Ligament croisé postérieur : il s'oppose au recul du tibia. Le LCA gère le sens inverse.",
    ],
    [
      "Pourquoi la longueur du fémur change-t-elle l'allure d'un squat ?",
      "Un fémur plus long oblige souvent le buste à se pencher pour garder la barre au-dessus des appuis",
      [
        "Un fémur long raccourcit forcément le tibia",
        "La patella disparaît si le fémur est long",
        "Le LCA change de côté selon la longueur",
      ],
      "Deux squats corrects peuvent donc paraître très différents sans qu'il y ait d'erreur technique unique.",
    ],
    [
      "Quel est le rôle mécanique de la patella ?",
      "Éloigner le tendon du quadriceps de l'axe du genou pour augmenter le levier",
      [
        "Porter le poids à la place du tibia",
        "Empêcher le tibia de reculer comme le LCP",
        "Stabiliser la fibula sur le talus",
      ],
      "En déportant le tendon, la rotule donne plus de bras de levier au quadriceps quand il tend la jambe.",
    ],
    [
      "Quelle différence y a-t-il entre tibia et fibula ?",
      "Le tibia porte le poids ; la fibula, plus fine, ancre et stabilise sur le côté",
      [
        "La fibula porte le poids ; le tibia est un os du bras",
        "Les deux portent également tout le poids",
        "Le tibia est latéral et la fibula médiale comme l'ulna",
      ],
      "Même jambe, rôles distincts : charge versus ancrage latéral. Ne pas les inverser.",
    ],
    [
      "Quelle différence y a-t-il entre LCA et LCP ?",
      "Le LCA bloque le tibia vers l'avant ; le LCP le bloque vers l'arrière",
      [
        "Le LCA bloque le recul ; le LCP bloque l'avant",
        "Le LCA relie fémur et fibula uniquement",
        "Le LCP est un os, le LCA un muscle",
      ],
      "Les deux relient fémur et tibia, mais dans des sens opposés. Inverser avant et arrière est la confusion classique.",
    ],
    [
      "Un pratiquant au fémur long se penche plus qu'un autre au squat. Que se passe-t-il ?",
      "Il adapte son buste pour garder la barre au-dessus de la base de sustentation",
      [
        "Sa patella a quitté le tendon du quadriceps",
        "Son tibia a cessé de porter le poids",
        "Son LCP s'est transformé en LCA",
      ],
      "La géométrie du fémur change l'allure, pas forcément la validité du squat.",
    ],
    [
      "Pourquoi la rotule aide-t-elle à tendre la jambe plus efficacement ?",
      "Elle augmente le levier du quadriceps en éloignant son tendon de l'axe du genou",
      [
        "Elle remplace le fémur comme os le plus long",
        "Elle empêche la fibula de porter le poids",
        "Elle forme le LCA",
      ],
      "Sans ce déport, le quadriceps tirerait plus « à plat » sur l'articulation, avec moins de moment.",
    ],
    [
      "À quoi servent surtout les muscles de la cuisse vis-à-vis des croisés ?",
      "Ils assistent LCA et LCP à chaque réception et changement de direction",
      [
        "Ils remplacent entièrement le tibia",
        "Ils transforment la fibula en patella",
        "Ils empêchent le radius de pivoter",
      ],
      "Les ligaments limitent les glissements ; les muscles de la cuisse les épaulent dynamiquement.",
    ],
    [
      "Quelle affirmation sur la jambe est incorrecte ?",
      "La fibula porte la majeure partie du poids du corps jusqu'à la cheville",
      [
        "Le fémur est l'os le plus long",
        "Le LCA empêche le tibia de glisser vers l'avant",
        "La patella se trouve dans le tendon du quadriceps",
      ],
      "C'est le tibia l'os porteur. La fibula est plus fine, latérale, d'ancrage et de stabilité.",
    ],
    [
      "Que relient les ligaments croisés ?",
      "Le fémur et le tibia",
      ["Le radius et l'ulna", "L'omoplate et la clavicule", "Le talus et le calcanéum"],
      "LCA et LCP stabilisent l'articulation fémoro-tibiale, à l'intérieur du genou.",
    ],
    [
      "Un pratiquant sent une instabilité « vers l'avant » du tibia par rapport à la cuisse. Quel ligament est surtout censé s'y opposer ?",
      "Le LCA",
      ["Le LCP", "Le tendon d'Achille", "Le ligament de l'ulna"],
      "Glissement antérieur du tibia = rôle du croisé antérieur. Le LCP gère le recul.",
    ],
    [
      "Pourquoi certains descendent en squat « comme dans un fauteuil » et d'autres luttent davantage ?",
      "La longueur du fémur y est pour beaucoup",
      [
        "Le nombre de fibulas varie d'une personne à l'autre",
        "La patella n'existe que chez certains",
        "Le LCA est un os chez les uns, un ligament chez les autres",
      ],
      "Un fémur long change la géométrie : plus de flexion de hanche et souvent plus d'inclinaison de buste.",
    ],
    [
      "De quel côté de la jambe se trouve surtout la fibula ?",
      "Du côté externe",
      ["Du côté interne porteur", "Dans le tendon du quadriceps", "Entre les lombaires"],
      "Latérale et fine, elle complète le tibia sans en prendre le rôle de charge.",
    ],
    [
      "Que se passerait-il, mécaniquement, sans patella ?",
      "Le quadriceps perdrait une partie de son bras de levier pour tendre le genou",
      [
        "Le fémur cesserait d'être l'os le plus long",
        "Le tibia ne pourrait plus porter le poids",
        "Le LCP empêcherait le tibia d'avancer",
      ],
      "La rotule n'est pas décorative : elle déporte le tendon et améliore l'efficacité de l'extension.",
    ],
    [
      "Un pratiquant réceptionne un saut. Quels éléments osseux et ligamentaires travaillent ensemble au genou ?",
      "Fémur, tibia, patella, LCA et LCP, assistés par les muscles de la cuisse",
      [
        "Radius, ulna et atlas uniquement",
        "Calcanéum et clavicule",
        "Sacrum et métacarpiens",
      ],
      "Le genou est le carrefour de la cuisse et de la jambe : os longs, rotule et croisés.",
    ],
    [
      "Quelle affirmation décrit le mieux le fémur en musculation ?",
      "Sa longueur change l'allure du squat, pas forcément sa correction",
      [
        "Plus il est long, plus le tibia cesse d'exister",
        "Il remplace la fibula en stabilité latérale",
        "Il flotte dans le tendon du quadriceps",
      ],
      "Comparer deux squats sans tenir compte du fémur mène souvent à de faux diagnostics techniques.",
    ],
    [
      "Quelle différence y a-t-il entre la patella et le tibia ?",
      "La patella est un os sésamoïde dans un tendon ; le tibia est l'os porteur de la jambe",
      [
        "Le tibia flotte dans le quadriceps ; la patella porte tout le poids",
        "Les deux empêchent le tibia de reculer",
        "La patella relie fémur et fibula comme le LCA",
      ],
      "L'un améliore le levier d'extension, l'autre transmet la charge vers la cheville.",
    ],
    [
      "Quelle affirmation sur les ligaments croisés est incorrecte ?",
      "Le LCA empêche le tibia de reculer",
      [
        "Le LCP empêche le tibia de reculer",
        "Le fémur va de la hanche au genou",
        "La fibula est plus fine que le tibia",
      ],
      "C'est le LCP qui s'oppose au recul. Le LCA s'oppose au glissement vers l'avant.",
    ],
    [
      "Pourquoi fémur long et fémur court peuvent-ils donner deux squats « justes » visuellement très différents ?",
      "Pour garder la barre au-dessus des appuis, le buste s'incline davantage si le fémur est long",
      [
        "Parce que le LCA change de fonction selon la longueur",
        "Parce que la fibula porte alors tout le poids",
        "Parce que la patella passe sur le côté externe comme la fibula",
      ],
      "C'est une question de géométrie de leviers, pas d'une seule technique universelle figée.",
    ],
  ] satisfies QcmItem[]),
];

