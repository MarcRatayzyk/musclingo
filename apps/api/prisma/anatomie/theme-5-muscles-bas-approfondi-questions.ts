import { bank25 } from "./qcm-bank";
import type { SeedQuestion } from "../anatomie-quiz-helpers";

export const THEME_5_QUIZZES: SeedQuestion[][] = [
  // 1. Quadriceps : les quatre chefs
  bank25([
    [
      "Les trois vastes du quadriceps naissent surtout sur…",
      "Le fémur",
      ["Le bassin (EIAI)", "L'ischion", "La tubérosité tibiale"],
      "Vaste latéral, médial et intermédiaire : origine fémorale. Seul le droit fémoral naît sur le bassin.",
    ],
    [
      "Les vastes sont principalement…",
      "Mono-articulaires, au genou",
      [
        "Bi-articulaires hanche et genou",
        "Mono-articulaires à la hanche seule",
        "Tri-articulaires jusqu'à la cheville",
      ],
      "Ils ne croisent que le genou : étendre le genou, quelle que soit la hanche.",
    ],
    [
      "Le droit fémoral naît notamment sur…",
      "L'épine iliaque antéro-inférieure",
      [
        "L'épine iliaque antéro-supérieure",
        "Le grand trochanter",
        "L'ischion",
      ],
      "EIAI du bassin, pas l'EIAS (sartorius) ni l'ischion (ischios).",
    ],
    [
      "Parce qu'il naît sur le bassin, le droit fémoral est…",
      "Bi-articulaire : étend le genou et fléchit la hanche",
      [
        "Mono-articulaire : genou seulement",
        "Bi-articulaire : étend hanche et fléchit le genou",
        "Uniquement fléchisseur du genou",
      ],
      "Hanche + genou : flexion de hanche et extension de genou.",
    ],
    [
      "En squat, hanche et genou plient ensemble : la longueur du droit fémoral…",
      "Change peu, sa contribution est donc modeste",
      [
        "S'allonge fortement, il domine le squat",
        "Se raccourcit aux deux bouts, il explose",
        "Ne change jamais car il est mono-articulaire",
      ],
      "Raccourcissement à la hanche et allongement au genou se compensent : peu de variation de longueur.",
    ],
    [
      "Au leg extension, où seul le genou bouge, le droit fémoral…",
      "Travaille davantage qu'en squat",
      [
        "Est quasi silencieux comme en squat",
        "Ne peut pas travailler car la hanche est fixe",
        "Est remplacé par le chef court du biceps",
      ],
      "Hanche fixe, genou qui s'étend : le droit fémoral se raccourcit vraiment au genou.",
    ],
    [
      "L'action commune des quatre chefs du quadriceps est…",
      "L'extension du genou",
      [
        "La flexion du genou",
        "L'extension de hanche",
        "La flexion plantaire",
      ],
      "Tous les chefs étendent le genou. Seul le droit fémoral ajoute la flexion de hanche.",
    ],
    [
      "Tous les chefs du quadriceps convergent vers…",
      "La patella, puis la tubérosité du tibia",
      [
        "La tête de la fibula",
        "Le tendon d'Achille",
        "Le grand trochanter",
      ],
      "Tendon quadricipital → rotule → ligament patellaire → tubérosité tibiale.",
    ],
    [
      "Le VMO désigne surtout…",
      "Le vaste médial, en goutte au-dessus du genou",
      [
        "Le vaste latéral",
        "Le vaste intermédiaire",
        "Le droit fémoral",
      ],
      "Vastus medialis obliquus : portion distale interne, guidage de rotule.",
    ],
    [
      "Le vaste médial (VMO) aide notamment à…",
      "Guider la rotule dans son rail",
      [
        "Pointer le pied en flexion plantaire",
        "Étendre la hanche comme le grand fessier",
        "Éverser la cheville",
      ],
      "Il participe au tracking patellaire, pas à la cheville ni à l'extension de hanche.",
    ],
    [
      "Quel chef n'est pas un vaste ?",
      "Le droit fémoral",
      ["Le vaste latéral", "Le vaste médial", "Le vaste intermédiaire"],
      "Les vastes sont trois ; le droit fémoral est le quatrième chef, bi-articulaire.",
    ],
    [
      "Si tu veux davantage charger le droit fémoral que les vastes, tu privilégies plutôt…",
      "Le leg extension",
      ["Le squat profond", "Le RDL", "Le leg curl"],
      "Extension isolée du genou = plus de travail du droit. Squat : contribution plus modeste.",
    ],
    [
      "Les vastes étendent le genou…",
      "Quelle que soit la position de la hanche",
      [
        "Uniquement hanche en flexion maximale",
        "Uniquement hanche en extension",
        "Seulement si la cheville est en inversion",
      ],
      "Mono-articulaires : la hanche ne change pas leur levier au genou.",
    ],
    [
      "Un programme quadriceps « complet » mélange surtout…",
      "Squats lourds et travail d'extension isolé",
      [
        "Uniquement des RDL",
        "Uniquement des relevés de mollets",
        "Uniquement des abductions de hanche",
      ],
      "Squat (pattern global) + leg extension (droit fémoral davantage sollicité).",
    ],
    [
      "Le ligament / tendon patellaire relie surtout…",
      "La patella à la tubérosité tibiale",
      [
        "La patella à la tête de la fibula",
        "Les vastes à l'EIAI",
        "Le VMO au grand trochanter",
      ],
      "Après la rotule, la chaîne d'insertion du quad aboutit sur le tibia, pas la fibula.",
    ],
    [
      "Le vaste intermédiaire se situe plutôt…",
      "Sous le droit fémoral, contre le fémur",
      [
        "Sur le bassin à l'EIAI",
        "En goutte interne au-dessus de la rotule seulement",
        "Sur la face postérieure de cuisse",
      ],
      "Il est profond, fémoral. La goutte interne, c'est plutôt le VMO.",
    ],
    [
      "Le vaste latéral naît sur le fémur et s'insère via…",
      "La même chaîne patellaire que les autres chefs",
      [
        "Le tractus ilio-tibial uniquement, sans rotule",
        "La patte d'oie",
        "Le tendon d'Achille",
      ],
      "Insertion commune des quatre chefs : patella puis tibia.",
    ],
    [
      "Pourquoi squat et leg extension ne sollicitent-ils pas le quadriceps exactement pareil ?",
      "À cause du droit fémoral, bi-articulaire",
      [
        "Parce que les vastes naissent sur le bassin",
        "Parce que le VMO n'existe qu'au squat",
        "Parce que le soléaire étend aussi le genou",
      ],
      "Les vastes travaillent dans les deux ; le droit change selon que la hanche bouge ou non.",
    ],
    [
      "En squat, le droit fémoral contribue modestement car…",
      "Hanche et genou plient ensemble",
      [
        "Il naît sur le fémur comme les vastes",
        "Il n'étend pas le genou",
        "La rotule n'est pas dans la chaîne d'insertion",
      ],
      "Double mouvement : sa longueur globale varie peu.",
    ],
    [
      "Lequel de ces muscles n'est pas un chef du quadriceps ?",
      "Le sartorius",
      ["Le vaste médial", "Le droit fémoral", "Le vaste latéral"],
      "Le sartorius est un fléchisseur de hanche en écharpe, pas un chef du quad.",
    ],
    [
      "L'origine du droit fémoral, par rapport aux vastes, est…",
      "Plus proximale : sur le bassin",
      [
        "Identique : tous sur le fémur",
        "Plus distale : sur le calcanéum",
        "Sur la tête de la fibula",
      ],
      "Bassin (EIAI) vs fémur pour les vastes.",
    ],
    [
      "Si la hanche est maintenue fixe et que tu tends le genou, tu charges surtout…",
      "Les vastes et davantage le droit fémoral",
      [
        "Uniquement le chef court du biceps fémoral",
        "Uniquement le soléaire",
        "Uniquement le grand fessier",
      ],
      "C'est le scénario du leg extension.",
    ],
    [
      "La « goutte » visible au-dessus et en dedans du genou correspond surtout au…",
      "Vaste médial (VMO)",
      ["Vaste latéral", "Droit fémoral proximal", "Semi-tendineux"],
      "Galbe distal interne du quadriceps.",
    ],
    [
      "Sans patella, la chaîne d'insertion du quadriceps…",
      "Perdrait son relais vers la tubérosité tibiale",
      [
        "Se terminerait sur l'Achille",
        "Naîtrait encore sur l'ischion",
        "N'étendrait plus que la hanche",
      ],
      "Rotule = poulie / relais des quatre chefs vers le tibia.",
    ],
    [
      "Les vastes ne fléchissent pas la hanche parce qu'ils…",
      "Ne croisent pas l'articulation de hanche",
      [
        "S'insèrent sur l'EIAI",
        "Sont bi-articulaires comme le droit",
        "Passent derrière la malléole",
      ],
      "Origine fémorale = pas de levier sur la hanche.",
    ],
  ]),

  // 2. Ischio-jambiers en détail
  bank25([
    [
      "Le biceps fémoral s'insère surtout sur…",
      "La tête de la fibula",
      [
        "La patte d'oie sur le tibia",
        "La tubérosité tibiale comme le quad",
        "Le calcanéum",
      ],
      "Tendon latéral du biceps → tête fibulaire, pas le tibia médial.",
    ],
    [
      "Semi-tendineux et semi-membraneux s'insèrent surtout…",
      "Côté interne, sur le tibia",
      [
        "Sur la tête de la fibula comme le biceps",
        "Sur le grand trochanter",
        "Sur l'EIAI",
      ],
      "Face médiale du genou ; le semi-tendineux via la patte d'oie.",
    ],
    [
      "Le semi-tendineux rejoint le tibia notamment via…",
      "La patte d'oie",
      ["Le tendon d'Achille", "Le tractus ilio-tibial", "Le ligament patellaire"],
      "Patte d'oie = insertion pes anserinus, côté médial.",
    ],
    [
      "Genou fléchi, le biceps fémoral favorise surtout…",
      "La rotation externe du tibia",
      [
        "La rotation interne du tibia",
        "La dorsiflexion",
        "L'inversion du pied",
      ],
      "Insertion latérale (fibula) = rotation externe. Les semi font l'interne.",
    ],
    [
      "Genou fléchi, semi-tendineux et semi-membraneux favorisent surtout…",
      "La rotation interne du tibia",
      [
        "La rotation externe du tibia",
        "L'éversion du pied",
        "L'extension du genou",
      ],
      "Côté médial = rotation interne, pas l'externe du biceps.",
    ],
    [
      "Le chef long du biceps fémoral naît surtout sur…",
      "L'ischion",
      ["Le fémur", "La fibula", "L'EIAI"],
      "Comme les deux semi : tubérosité ischiatique. Le court naît sur le fémur.",
    ],
    [
      "Le chef court du biceps fémoral naît surtout sur…",
      "Le fémur",
      ["L'ischion", "Le bassin à l'EIAS", "Le calcanéum"],
      "Seul ischio d'origine fémorale, donc sans levier d'extension de hanche.",
    ],
    [
      "Quel chef d'ischio est le seul mono-articulaire ?",
      "Le chef court du biceps fémoral",
      [
        "Le chef long du biceps fémoral",
        "Le semi-tendineux",
        "Le semi-membraneux",
      ],
      "Fémur → fibula : genou seulement, pas d'extension de hanche.",
    ],
    [
      "Le chef court du biceps fémoral…",
      "Fléchit le genou mais n'étend pas la hanche",
      [
        "Étend la hanche sans fléchir le genou",
        "Est bi-articulaire comme les semi",
        "S'insère sur la patte d'oie",
      ],
      "Mono-articulaire : flexion de genou uniquement.",
    ],
    [
      "Le leg curl sollicite…",
      "Tous les ischios, chef court compris",
      [
        "Seulement les bi-articulaires",
        "Seulement le chef court",
        "Seulement le semi-tendineux",
      ],
      "Flexion de genou isolée : tout le monde travaille, y compris le court.",
    ],
    [
      "Les RDL et le soulevé jambes tendues chargent surtout…",
      "Les ischios bi-articulaires, par la hanche",
      [
        "Le chef court du biceps autant que les autres",
        "Uniquement le vaste intermédiaire",
        "Uniquement les fibulaires",
      ],
      "Hinge / hanche : le court, qui ne croise pas la hanche, est largement épargné.",
    ],
    [
      "Leg curl et RDL sont…",
      "Complémentaires, pas interchangeables",
      [
        "Identiques pour tous les chefs",
        "Inutiles dès qu'on squat",
        "Réservés au seul semi-membraneux",
      ],
      "L'un charge le genou (court inclus), l'autre la hanche (bi-articulaires).",
    ],
    [
      "Combien de chefs a le biceps fémoral ?",
      "Deux : long (ischion) et court (fémur)",
      [
        "Un seul, comme le semi-tendineux",
        "Quatre, comme le quadriceps",
        "Trois, comme le triceps sural",
      ],
      "Long + court ; les semi n'ont qu'un ventre chacun.",
    ],
    [
      "La plupart des ischio-jambiers naissent sur…",
      "L'ischion",
      ["Le grand trochanter", "L'EIAI", "La tête de la fibula"],
      "Tubérosité ischiatique — sauf le chef court, fémoral.",
    ],
    [
      "Le semi-membraneux, par rapport au semi-tendineux, s'insère aussi…",
      "Côté tibial / médial, pas sur la fibula",
      [
        "Sur la tête de la fibula comme le biceps",
        "Sur l'Achille",
        "Sur le petit trochanter",
      ],
      "Les deux « semi » sont médiaux ; le biceps est latéral.",
    ],
    [
      "Si tu ne fais que des RDL, tu sous-charges surtout…",
      "Le chef court du biceps fémoral",
      [
        "Le chef long du biceps",
        "Le semi-tendineux",
        "Le semi-membraneux",
      ],
      "Les trois bi-articulaires travaillent à la hanche ; le court non.",
    ],
    [
      "La rotation du genou par les ischios est surtout nette…",
      "Genou fléchi",
      [
        "Genou verrouillé en extension complète seulement",
        "Cheville en dorsiflexion maximale seulement",
        "Hanche en abduction maximale seulement",
      ],
      "Tibia mobile sous le fémur quand le genou n'est plus coincé en extension.",
    ],
    [
      "Insertion latérale vs médiale des ischios explique surtout…",
      "Rotation externe (biceps) vs interne (semi)",
      [
        "Flexion plantaire vs dorsiflexion",
        "Abduction vs adduction d'épaule",
        "Lequel naît sur l'EIAI",
      ],
      "Fibula dehors / tibia dedans = sens de rotation du tibia.",
    ],
    [
      "Les ischios bi-articulaires font aussi…",
      "L'extension de hanche",
      [
        "L'extension du genou comme le quad",
        "La flexion plantaire via l'Achille",
        "L'antéversion du bassin via le psoas",
      ],
      "Ischion → jambe : ils étendent la hanche et fléchissent le genou.",
    ],
    [
      "Lequel de ces muscles n'est pas un ischio-jambier ?",
      "Le droit fémoral",
      [
        "Le biceps fémoral",
        "Le semi-tendineux",
        "Le semi-membraneux",
      ],
      "Le droit fémoral est un chef du quadriceps, face antérieure.",
    ],
    [
      "Le biceps fémoral ne s'insère pas sur le tibia médial ; donc il ne…",
      "Ne favorise pas la rotation interne du genou fléchi",
      [
        "Ne peut pas fléchir le genou",
        "N'a pas de chef long",
        "Naît forcément sur l'EIAI",
      ],
      "Latéral = rotation externe. La flexion de genou, lui, la fait bien.",
    ],
    [
      "Un soulevé jambes tendues épargne relativement le chef court car…",
      "Le genou reste quasi tendu : le travail passe par la hanche",
      [
        "Le chef court s'insère sur l'ischion",
        "Le chef court est bi-articulaire",
        "Le chef court s'attache à la patte d'oie",
      ],
      "Sans flexion de genou marquante, le mono-articulaire du genou est peu demandé.",
    ],
    [
      "Le chef long du biceps, contrairement au court…",
      "Croise aussi la hanche depuis l'ischion",
      [
        "S'insère sur la patte d'oie",
        "Est le seul mono-articulaire",
        "Naît uniquement sur le fémur",
      ],
      "Long = ischion + genou (fibula). Court = fémur + fibula.",
    ],
    [
      "La patte d'oie n'est pas l'insertion du…",
      "Biceps fémoral",
      ["Semi-tendineux", "Gracile (parmi d'autres)", "Sartorius (parmi d'autres)"],
      "Biceps → fibula. Semi-tendineux → patte d'oie tibiale.",
    ],
    [
      "Pour un ischio « complet » (hanche + genou, court inclus), tu combines surtout…",
      "Leg curl et RDL / soulevé jambes tendues",
      [
        "Leg extension et squat seulement",
        "Mollets assis et relevés de pointe seulement",
        "Abductions de hanche seulement",
      ],
      "Les deux formats ne recrutent pas les mêmes chefs de la même façon.",
    ],
  ]),

  // 3. Grand, moyen, petit fessier et TFL
  bank25([
    [
      "Le moyen et le petit fessier s'insèrent surtout sur…",
      "Le grand trochanter",
      [
        "Le petit trochanter",
        "La tubérosité tibiale",
        "La tête de la fibula",
      ],
      "Aile du bassin → grand trochanter. Le petit trochanter, c'est l'iliopsoas.",
    ],
    [
      "Les fibres antérieures du moyen fessier aident surtout…",
      "La rotation interne de hanche",
      [
        "La rotation externe de hanche",
        "La flexion plantaire",
        "L'extension du genou",
      ],
      "Antérieures = rot. interne ; postérieures = rot. externe.",
    ],
    [
      "Les fibres postérieures du moyen fessier aident surtout…",
      "La rotation externe de hanche",
      [
        "La rotation interne de hanche",
        "La dorsiflexion",
        "L'inversion du pied",
      ],
      "Même muscle, faisceaux opposés : post = rot. externe.",
    ],
    [
      "Ensemble, moyen et petit fessier écartent surtout la cuisse : c'est…",
      "L'abduction de hanche",
      [
        "L'adduction de hanche",
        "La flexion plantaire",
        "L'extension du genou",
      ],
      "Abducteurs latéraux, pas adducteurs médiaux.",
    ],
    [
      "En appui unipodal, moyen et petit fessier servent surtout à…",
      "Tenir le bassin horizontal",
      [
        "Pointer le pied",
        "Fléchir le coude",
        "Étendre uniquement les orteils",
      ],
      "Sans eux, le bassin bascule du côté jambe libre.",
    ],
    [
      "Le TFL (tenseur du fascia lata) ne s'attache pas directement…",
      "Au fémur",
      [
        "Au tractus ilio-tibial",
        "Au bassin / hanche en tant que fléchisseur-abducteur",
        "À la continuité vers le genou via le tractus",
      ],
      "Il se jette dans le tractus, sans insertion fémorale directe comme les moyens.",
    ],
    [
      "Le TFL se prolonge dans…",
      "Le tractus ilio-tibial, jusqu'au genou",
      [
        "Le tendon d'Achille",
        "La patte d'oie seulement",
        "Le ligament patellaire du quadriceps",
      ],
      "Longue bande fibreuse latérale, bassin → genou.",
    ],
    [
      "Le TFL est surtout…",
      "Fléchisseur et abducteur de hanche",
      [
        "Extenseur et rotateur externe puissant comme le grand fessier",
        "Fléchisseur plantaire",
        "Extenseur du genou via la rotule",
      ],
      "Flex + abd. L'extension / rot. ext. puissante, c'est le grand fessier.",
    ],
    [
      "Si le moyen fessier est faible, le TFL a tendance à…",
      "Prendre le dessus",
      [
        "S'atrophier complètement",
        "S'insérer alors sur le petit trochanter",
        "Devenir un ischio",
      ],
      "Compensation classique : TFL hyperactif, moyen silencieux.",
    ],
    [
      "Le grand fessier envoie une partie de ses fibres…",
      "Dans le tractus ilio-tibial, en plus du fémur",
      [
        "Uniquement dans l'Achille",
        "Uniquement sur l'EIAI",
        "Uniquement sur la tête de la fibula",
      ],
      "Double destination : fémur et tractus, comme un pont vers le genou.",
    ],
    [
      "Le grand fessier produit surtout…",
      "L'extension et la rotation externe de hanche",
      [
        "La flexion de hanche et la rotation interne",
        "La dorsiflexion et l'inversion",
        "L'extension du genou via la patella",
      ],
      "Puissance postérieure. Flexion / rot. interne, c'est plutôt le TFL / fibres ant. du moyen.",
    ],
    [
      "Abductions de hanche et marches latérales avec élastique ciblent surtout…",
      "Le trio latéral : moyen, petit fessier et TFL",
      [
        "Le triceps sural seulement",
        "Le plancher pelvien seulement",
        "Le chef court du biceps seulement",
      ],
      "Travail du côté de la hanche, pas des mollets ni des ischios.",
    ],
    [
      "Le petit fessier, par rapport au moyen, est…",
      "Plus profond, empilé sous le moyen",
      [
        "Plus superficiel que le TFL et le grand",
        "Un muscle de jambe inséré sur l'Achille",
        "Un chef du quadriceps",
      ],
      "Moyen au-dessus, petit en dessous, tous deux vers le grand trochanter.",
    ],
    [
      "Lequel s'insère sur le grand trochanter ?",
      "Le moyen fessier",
      ["Le TFL (il va au tractus)", "Le soléaire", "Le tibial antérieur"],
      "Moyen et petit → grand trochanter. TFL → tractus, pas le fémur.",
    ],
    [
      "Le tractus ilio-tibial descend jusqu'au…",
      "Genou",
      ["Calcanéum", "Petit trochanter", "Ischion"],
      "Bande latérale de hanche jusqu'au genou (tubercule de Gerdy / condyle latéral).",
    ],
    [
      "Stabiliser le bassin en unipodal, ce n'est pas le rôle principal du…",
      "Grand fessier (plutôt extension / rot. ext.)",
      [
        "Moyen fessier",
        "Petit fessier",
        "Couple moyen + petit",
      ],
      "L'horizontalité du bassin = moyen/petit. Le grand est le gros extenseur.",
    ],
    [
      "Le TFL et le grand fessier se retrouvent tous deux en partie dans…",
      "Le tractus ilio-tibial",
      ["Le tendon d'Achille", "La patte d'oie", "Le ligament jaune"],
      "Le grand y envoie des fibres ; le TFL s'y jette entièrement.",
    ],
    [
      "Rotation interne de hanche : tu sollicites plutôt…",
      "Les fibres antérieures du moyen (et le TFL)",
      [
        "Les fibres postérieures du moyen seules",
        "Le grand fessier en priorité",
        "Les fibulaires",
      ],
      "Antérieur du moyen + TFL vs postérieur du moyen / grand fessier en rot. ext.",
    ],
    [
      "Le moyen fessier naît surtout sur…",
      "L'aile du bassin (ilium)",
      ["La tête de la fibula", "La diaphyse tibiale", "Le calcanéum"],
      "Face externe de l'ilium → grand trochanter.",
    ],
    [
      "Un TFL qui « prend le dessus » se voit souvent quand…",
      "Le moyen fessier est trop faible",
      [
        "Le soléaire est trop fort",
        "Le VMO guide trop la rotule",
        "Le chef court du biceps est hypertrophié",
      ],
      "Même région latérale, rôles proches en abduction : le plus fort gagne.",
    ],
    [
      "Le grand fessier n'est pas qu'un muscle de fémur : une partie de sa force passe aussi…",
      "Par le tractus jusqu'au genou",
      [
        "Par l'Achille jusqu'au calcanéum",
        "Par le ligament patellaire",
        "Par le psoas jusqu'aux lombaires",
      ],
      "Continuité tractus = influence latérale distale, pas Achille.",
    ],
    [
      "Abduction de hanche ≠ adduction : le TFL et le moyen…",
      "Écartent la cuisse (abduction)",
      [
        "Rapprochent la cuisse (adduction)",
        "Pointent uniquement le pied",
        "Fléchissent uniquement le genou",
      ],
      "Côté hanche = abduction. L'adduction, c'est plutôt adducteurs / gracile.",
    ],
    [
      "Le petit fessier partage avec le moyen…",
      "L'insertion sur le grand trochanter et un rôle d'abducteur",
      [
        "L'insertion sur le petit trochanter",
        "La fusion dans l'Achille",
        "L'origine sur l'ischion comme les ischios",
      ],
      "Même « famille » latérale profonde.",
    ],
    [
      "Le TFL fléchit la hanche : il n'est donc pas un…",
      "Extenseur puissant comme le grand fessier",
      [
        "Abducteur de hanche",
        "Muscle se jetant dans le tractus",
        "Compensateur possible du moyen faible",
      ],
      "Flex + abd, pas l'extension massive du grand.",
    ],
    [
      "Pour affûter le trio latéral de hanche, un exercice cohérent est…",
      "La marche latérale avec élastique",
      ["Le leg curl allongé seulement", "Le mollet assis seulement", "Le curl biceps"],
      "Déplacement en abduction / stabilité unipodale latérale.",
    ],
  ]),

  // 4. Mollets, tibial, fibulaires
  bank25([
    [
      "Le triceps sural fusionne surtout dans…",
      "Le tendon d'Achille",
      [
        "Le ligament patellaire",
        "Le tractus ilio-tibial",
        "La patte d'oie",
      ],
      "Gastrocnémien + soléaire → Achille → calcanéum.",
    ],
    [
      "Le gastrocnémien naît surtout sur…",
      "Le fémur",
      ["Le tibia et la fibula seulement", "Le calcanéum", "L'ilium"],
      "Origine fémorale : il croise aussi le genou. Le soléaire, lui, est sous le genou.",
    ],
    [
      "Le soléaire naît surtout sur…",
      "Le tibia et la fibula",
      ["Le fémur", "L'EIAI", "L'ischion"],
      "Origine tibio-fibulaire, mono-articulaire à la cheville.",
    ],
    [
      "L'action principale du triceps sural est…",
      "La flexion plantaire (poussée)",
      [
        "La dorsiflexion",
        "L'inversion pure sans plantaire",
        "L'extension du genou",
      ],
      "Pointer / pousser le pied. Relever le pied = tibial antérieur.",
    ],
    [
      "Le tibial antérieur produit surtout…",
      "Dorsiflexion et inversion",
      [
        "Flexion plantaire et éversion",
        "Flexion plantaire et inversion",
        "Dorsiflexion et éversion",
      ],
      "Releveur médial : pied vers le haut et en dedans.",
    ],
    [
      "Les fibulaires long et court passent…",
      "Derrière la malléole latérale",
      [
        "Devant la malléole médiale comme le tibial antérieur",
        "Dans le tendon d'Achille",
        "Sur la patte d'oie",
      ],
      "Coulisse rétro-malléolaire externe → plantaire + éversion.",
    ],
    [
      "Les fibulaires produisent surtout…",
      "Flexion plantaire et éversion",
      [
        "Dorsiflexion et inversion",
        "Dorsiflexion et éversion",
        "Flexion plantaire et inversion",
      ],
      "Bord externe du pied vers le bas / dehors. L'inversion, c'est plutôt tibial (ant. / post.).",
    ],
    [
      "Lors d'une cheville qui part en inversion (mécanisme classique d'entorse), qui rattrape surtout ?",
      "Les fibulaires",
      ["Le tibial antérieur seul", "Le VMO", "Le psoas"],
      "Éverseurs latéraux : ils s'opposent à l'inversion excessive.",
    ],
    [
      "Sur une presse à mollets, tu entraînes surtout…",
      "La poussée (triceps sural)",
      [
        "L'équilibre de toutes les cordes de la cheville",
        "Uniquement le tibial antérieur",
        "Uniquement les fibulaires en éversion",
      ],
      "Poussée isolée ≠ fentes / unipodal / appui instable.",
    ],
    [
      "Fentes, travail sur une jambe ou appui instable sollicitent…",
      "Toutes les « cordes » de la cheville en continu",
      [
        "Uniquement le soléaire, jamais le gastroc",
        "Uniquement le quadriceps",
        "Uniquement le plancher pelvien",
      ],
      "Ajustements plantaire / dorsal / inversion / éversion.",
    ],
    [
      "Le gastrocnémien croise le genou : contrairement au soléaire, il est…",
      "Bi-articulaire",
      [
        "Mono-articulaire à la cheville seulement",
        "Un muscle de la hanche",
        "Un releveur du pied",
      ],
      "Fémur → Achille. Soléaire : tibia/fibula → Achille.",
    ],
    [
      "Le tibial antérieur n'est pas un…",
      "Fléchisseur plantaire via l'Achille",
      [
        "Dorsiflexeur",
        "Inverseur du pied",
        "Releveur antérieur",
      ],
      "Il est devant, releveur. L'Achille est derrière.",
    ],
    [
      "Éversion = surtout…",
      "Tourner le pied en dehors (bord externe vers le bas)",
      [
        "Tourner le pied en dedans (inversion)",
        "Relever uniquement le pied sans le tourner",
        "Tendre le genou",
      ],
      "Fibulaires. Inversion = tibial antérieur (entre autres).",
    ],
    [
      "Le tendon d'Achille n'appartient pas au…",
      "Tibial antérieur",
      ["Gastrocnémien", "Soléaire", "Triceps sural"],
      "Achille = chaîne postérieure de poussée, pas le releveur antérieur.",
    ],
    [
      "Une cheville solide, d'après la leçon, c'est surtout…",
      "L'équilibre entre poussée, releveurs et éverseurs",
      [
        "Le triceps sural uniquement",
        "Le VMO uniquement",
        "Le grand fessier uniquement",
      ],
      "Presse à mollets ≠ stabilité complète.",
    ],
    [
      "Le fibulaire court, comme le long, longe surtout…",
      "La fibula, côté externe",
      [
        "Le tibia, face médiale",
        "Le tendon rotulien",
        "Le psoas",
      ],
      "Nom : fibulaires = péroniers, latéraux.",
    ],
    [
      "Inversion du pied (dedans) : tu es plutôt du côté du…",
      "Tibial antérieur",
      ["Fibulaire long", "Fibulaire court", "Triceps sural pur"],
      "Tibial = médial / inversion. Fibulaires = éversion.",
    ],
    [
      "Le soléaire ne croise pas le genou, donc un mollet genou fléchi charge davantage…",
      "Le soléaire que le gastrocnémien",
      [
        "Le gastrocnémien que le soléaire",
        "Le tibial antérieur",
        "Les fibulaires uniquement",
      ],
      "Gastroc détendu genou fléchi ; soléaire reste le moteur plantaire.",
    ],
    [
      "Le mécanisme classique d'entorse de cheville cité est…",
      "L'inversion",
      ["L'éversion pure isolée", "La rotation interne du tibia au genou", "L'antéversion du bassin"],
      "Pied qui part en dedans ; fibulaires pour rattraper.",
    ],
    [
      "Dorsiflexion = relever le pied : muscle clé…",
      "Le tibial antérieur",
      ["Le gastrocnémien", "Le soléaire", "Les deux chefs du biceps fémoral"],
      "Face antérieure de jambe, pas le triceps sural.",
    ],
    [
      "Les fibulaires ne font pas surtout…",
      "L'inversion",
      ["L'éversion", "Un peu de flexion plantaire", "La stabilité latérale de cheville"],
      "Inversion serait l'opposé de leur rôle principal.",
    ],
    [
      "Triceps sural = …",
      "Gastrocnémien (2 chefs) + soléaire",
      [
        "Tibial antérieur + deux fibulaires",
        "Trois vastes seulement",
        "Moyen, petit et grand fessier",
      ],
      "Trois chefs postérieurs de jambe vers l'Achille.",
    ],
    [
      "Passer derrière la malléole change le levier des fibulaires : ils…",
      "Plantent le pied (composante plantaire) en plus d'éverser",
      [
        "Deviennent des dorsiflexeurs purs",
        "S'insèrent sur l'EIAI",
        "Guident la rotule comme le VMO",
      ],
      "Trajet rétro-malléolaire = plantaire + éversion.",
    ],
    [
      "Le tibial antérieur tourne le pied en dedans : ce n'est pas…",
      "L'éversion",
      ["L'inversion", "La dorsiflexion associée", "Un rôle de releveur"],
      "Dedans = inversion.",
    ],
    [
      "La presse à mollets ne suffit pas à « toutes les cordes » car elle néglige surtout…",
      "Releveurs et éverseurs / stabilité multi-directionnelle",
      [
        "Toute flexion plantaire",
        "Le tendon d'Achille",
        "Le soléaire et le gastroc",
      ],
      "Poussée oui ; tibial ant. et fibulaires peu concernés.",
    ],
  ]),

  // 5. Iliopsoas et fléchisseurs de hanche
  bank25([
    [
      "L'iliopsoas est en fait…",
      "Un duo : psoas + iliaque",
      [
        "Un seul ventre né sur le fémur",
        "Un chef du quadriceps",
        "Un fibulaire",
      ],
      "Deux origines, un tendon commun.",
    ],
    [
      "Le psoas naît surtout sur…",
      "Les vertèbres lombaires",
      [
        "La fosse iliaque seulement",
        "Le petit trochanter (origine)",
        "La tête de la fibula",
      ],
      "Lombaires → fémur. La fosse iliaque, c'est l'iliaque.",
    ],
    [
      "L'iliaque tapisse surtout…",
      "La fosse iliaque du bassin",
      [
        "Les transverses lombaires seulement",
        "La face postérieure du fémur",
        "Le calcanéum",
      ],
      "Fosse iliaque → tendon commun avec le psoas.",
    ],
    [
      "Psoas et iliaque fusionnent sur…",
      "Le petit trochanter",
      [
        "Le grand trochanter",
        "La patella",
        "L'EIAI",
      ],
      "Face interne du haut du fémur. Le grand trochanter, c'est moyen/petit fessier.",
    ],
    [
      "L'iliopsoas est surtout…",
      "Le grand fléchisseur de hanche",
      [
        "Le grand extenseur de hanche",
        "Le principal éverseur du pied",
        "L'extenseur du genou via la rotule",
      ],
      "Remonter le genou. L'extension, c'est grand fessier / ischios.",
    ],
    [
      "Parmi les synergistes de flexion de hanche cités, on trouve…",
      "Droit fémoral, sartorius et TFL",
      [
        "Grand fessier, ischios et érecteurs",
        "Soléaire et gastrocnémien",
        "Fibulaires long et court",
      ],
      "Chaîne antérieure de hanche, pas la chaîne postérieure.",
    ],
    [
      "Un psoas raide ou hyperactif tire souvent le bassin en…",
      "Antéversion",
      [
        "Rétroversion",
        "Inclinaison uniquement thoracique",
        "Rotation scapulaire",
      ],
      "Tirage lombaire / bassin vers l'avant : bassin qui bascule, lombaires creusées.",
    ],
    [
      "Cette antéversion liée au psoas a tendance à…",
      "Creuser les lombaires",
      [
        "Aplatir totalement la lordose",
        "Étendre le genou comme le VMO",
        "Éverser la cheville",
      ],
      "Hyperlordose lombaire fréquente si psoas court.",
    ],
    [
      "Traiter un psoas problématique, ce n'est pas seulement…",
      "L'étirer",
      [
        "Renforcer aussi la flexion en amplitude complète",
        "Lui apprendre à travailler sans crisper le lombaire",
        "Garder de la force en flexion",
      ],
      "Étirement + renforcement en grande amplitude, pas l'étirement seul.",
    ],
    [
      "Renforcer la flexion de hanche en amplitude complète vise à…",
      "Travailler sans crisper la zone lombaire",
      [
        "Remplacer l'iliopsoas par le soléaire",
        "Transformer le psoas en extenseur",
        "Insérer le psoas sur le grand trochanter",
      ],
      "Contrôle : flexer la hanche sans compenser du dos.",
    ],
    [
      "Le petit trochanter n'est pas l'insertion du…",
      "Moyen fessier",
      ["Psoas", "Iliaque", "Tendon commun de l'iliopsoas"],
      "Moyen → grand trochanter. Iliopsoas → petit.",
    ],
    [
      "Chaque montée de genou / relevé de jambes suspendu passe surtout par…",
      "L'iliopsoas",
      ["Le triceps sural", "Le chef court du biceps fémoral", "Les fibulaires"],
      "Flexion de hanche profonde.",
    ],
    [
      "Le lien psoas–lombaires est à double tranchant car…",
      "Il relie directement vertèbres et fémur",
      [
        "Il s'insère sur l'Achille",
        "Il naît sur la fibula",
        "Il ne touche jamais le rachis",
      ],
      "Un muscle court entre rachis et cuisse influence dos et bassin.",
    ],
    [
      "Certaines gênes lombaires en station debout prolongée peuvent venir…",
      "D'un psoas hyperactif / raide",
      [
        "D'un tibial antérieur trop fort",
        "D'un VMO trop guideur",
        "D'un fibulaire court trop éverseur",
      ],
      "Tirage antérieur du bassin, lordose.",
    ],
    [
      "Le droit fémoral aide l'iliopsoas car il…",
      "Fléchit aussi la hanche (en plus d'étendre le genou)",
      [
        "Étend la hanche depuis l'ischion",
        "S'insère sur le petit trochanter",
        "Naît sur les lombaires",
      ],
      "Synergiste bi-articulaire antérieur, origine EIAI — pas petit trochanter.",
    ],
    [
      "Le sartorius, cité avec le TFL, est un…",
      "Synergiste de flexion de hanche",
      [
        "Chef du triceps sural",
        "Insert sur la tête de la fibula comme le biceps",
        "Plancher pelvien",
      ],
      "Écharpe antérieure de cuisse, pas un mollet ni un ischio latéral.",
    ],
    [
      "Rétroversion du bassin n'est pas l'effet typique d'un…",
      "Psoas court / hyperactif",
      [
        "Grand fessier et ischios qui postérisent le bassin",
        "Chaîne postérieure qui « referme » le bassin",
        "Étirement / relâchement du psoas (plutôt moins d'antéversion)",
      ],
      "Psoas court → antéversion, l'inverse de la rétroversion.",
    ],
    [
      "L'iliaque ne naît pas sur les lombaires : donc, contrairement au psoas, il…",
      "N'a pas d'attache vertébrale directe",
      [
        "Ne fléchit pas la hanche",
        "S'insère sur le grand trochanter",
        "Fusionne dans l'Achille",
      ],
      "Fosse iliaque seulement, puis tendon commun au petit trochanter.",
    ],
    [
      "Le TFL aide la flexion de hanche mais s'insère via…",
      "Le tractus ilio-tibial, pas le petit trochanter",
      [
        "Le petit trochanter comme l'iliopsoas",
        "L'Achille",
        "Les vertèbres lombaires",
      ],
      "Même action globale (flex), insertions différentes.",
    ],
    [
      "« Grand fléchisseur de hanche » désigne surtout…",
      "L'iliopsoas, aidé (pas remplacé) par droit fémoral, sartorius, TFL",
      [
        "Le grand fessier seul",
        "Le soléaire seul",
        "Le semi-membraneux seul",
      ],
      "Iliopsoas = moteur principal ; les autres sont synergistes.",
    ],
    [
      "Creuser les lombaires n'est pas le but du renforcement de l'iliopsoas : on cherche…",
      "La flexion de hanche sans compensation lombaire",
      [
        "Une antéversion maximale permanente",
        "À raccourcir encore le psoas en statique",
        "À étendre le genou via la rotule",
      ],
      "Amplitude complète contrôlée, pas lordose en plus.",
    ],
    [
      "Le petit trochanter est à la face…",
      "Interne du haut du fémur",
      [
        "Latérale comme le grand trochanter",
        "Postérieure du calcanéum",
        "Antérieure de la rotule",
      ],
      "Dedans / haut de fémur, pas le relief latéral du grand trochanter.",
    ],
    [
      "Un étirement seul du psoas, sans force en flexion, peut laisser le muscle…",
      "Souple mais incapable de travailler proprement en grande amplitude",
      [
        "Automatiquement fort en extension de hanche",
        "Inséré sur le grand trochanter",
        "Devenu un éverseur",
      ],
      "D'où l'intérêt de renforcer, pas seulement d'étirer.",
    ],
    [
      "Les vertèbres lombaires ne sont pas l'origine de…",
      "L'iliaque",
      ["Le psoas", "Une partie de l'iliopsoas (le psoas)", "Le lien rachis–fémur du psoas"],
      "Iliaque = fosse iliaque. Psoas = lombaires.",
    ],
    [
      "Flexion de hanche ≠ flexion de genou : l'iliopsoas…",
      "Remonte la cuisse / le genou vers le tronc, sans être un ischio",
      [
        "Fléchit le genou depuis l'ischion",
        "Étend le genou via la patella",
        "Pointe le pied",
      ],
      "Hanche, pas genou ni cheville.",
    ],
  ]),

  // 6. Plancher pelvien et core anatomique
  bank25([
    [
      "Dans la métaphore de la canette, le couvercle du tronc est surtout…",
      "Le diaphragme",
      ["Le plancher pelvien", "Le transverse seul", "Le soléaire"],
      "Diaphragme = toit respiratoire. Le plancher, c'est le fond.",
    ],
    [
      "Les parois de la canette correspondent surtout à…",
      "Le transverse et les obliques",
      [
        "Le diaphragme seulement",
        "Le plancher pelvien seulement",
        "Le triceps sural",
      ],
      "Ceinture abdominale profonde / latérale.",
    ],
    [
      "Le fond de la canette, c'est…",
      "Le plancher pelvien",
      ["Le diaphragme", "Les pectoraux", "Le VMO"],
      "Nappe qui ferme le bas du bassin.",
    ],
    [
      "Le plancher pelvien sert notamment à…",
      "Soutenir les organes et participer à la continence",
      [
        "Étendre le genou via la rotule",
        "Fusionner dans l'Achille",
        "Éverser la cheville",
      ],
      "Fond du bassin : soutien + continence, pas un muscle de jambe.",
    ],
    [
      "Quand tu inspires et gaines avant un squat lourd, les trois étages…",
      "Se contractent ensemble et montent la pression intra-abdominale",
      [
        "Se relâchent pour vider la canette",
        "N'agissent que sur la cheville",
        "Remplacent le quadriceps",
      ],
      "Diaphragme + parois + plancher = IAP.",
    ],
    [
      "La pression intra-abdominale (IAP) rigidifie surtout…",
      "La « canette » : la colonne est étayée de l'intérieur",
      [
        "Uniquement le tendon d'Achille",
        "Uniquement la rotule",
        "Uniquement les fibulaires",
      ],
      "Cylindre incompressible autour du rachis.",
    ],
    [
      "La pression pousse dans toutes les directions, y compris…",
      "Vers le bas, sur le plancher pelvien",
      [
        "Uniquement vers le haut, jamais vers le bas",
        "Uniquement dans les mollets",
        "Uniquement dans les vastes",
      ],
      "IAP ≠ seulement « tenir le dos » : le fond reçoit aussi la charge.",
    ],
    [
      "Si le plancher pelvien ne suit pas des blocages respiratoires maximaux répétés, risque…",
      "Fuites ou pesanteurs",
      [
        "Uniquement une hypertrophie du VMO",
        "Une éversion permanente",
        "Une insertion du psoas sur le grand trochanter",
      ],
      "Pression vers le bas sans contre-appui musculaire du fond.",
    ],
    [
      "Ces fuites / pesanteurs concernent…",
      "Les femmes et les hommes",
      [
        "Uniquement les femmes",
        "Uniquement les hommes",
        "Uniquement les enfants avant la marche",
      ],
      "Plancher pelvien des deux sexes.",
    ],
    [
      "Sur l'effort, la leçon recommande surtout de…",
      "Expirer quand c'est possible",
      [
        "Bloquer en apnée maximale à chaque répétition légère",
        "Relâcher complètement le transverse",
        "Ignorer le plancher",
      ],
      "Expire sur l'effort + charges progressives.",
    ],
    [
      "Les charges sur le core / plancher doivent être…",
      "Progressives",
      [
        "Maximales d'emblée en apnée forcée",
        "Réservées au curl biceps",
        "Évitées chez les hommes",
      ],
      "Le fond de canette s'adapte ; on ne le bombarde pas du jour au lendemain.",
    ],
    [
      "Le muscle profond en ceinture autour du ventre est surtout…",
      "Le transverse",
      ["Le deltoïde", "Le gastrocnémien", "Le supra-épineux"],
      "Paroi de la canette, pas un muscle d'épaule ou de mollet.",
    ],
    [
      "Le core anatomique de la leçon n'est pas limité au…",
      "Grand droit visible (« tablette »)",
      [
        "Cylindre diaphragme–parois–plancher",
        "Transverse et obliques",
        "Plancher pelvien",
      ],
      "Le grand droit n'est qu'une face ; le cylindre profond compte davantage pour l'IAP.",
    ],
    [
      "Diaphragme = muscle…",
      "Respiratoire principal, toit du cylindre",
      [
        "Du plancher pelvien uniquement",
        "D'éversion du pied",
        "D'extension du genou",
      ],
      "Respiration + pressurisation du tronc.",
    ],
    [
      "Gainer sans le plancher, c'est comme une canette…",
      "Sans fond : la pression fuit vers le bas",
      [
        "Plus solide que complète",
        "Qui n'a plus besoin de diaphragme",
        "Qui n'a plus de parois",
      ],
      "Les trois étages ensemble, pas deux sur trois.",
    ],
    [
      "Les obliques, avec le transverse, forment surtout…",
      "Les parois",
      ["Le couvercle", "Le fond pelvien", "Le tendon d'Achille"],
      "Couvercle = diaphragme ; fond = plancher.",
    ],
    [
      "Une IAP utile au squat lourd n'autorise pas d'ignorer…",
      "La contre-pression du plancher pelvien",
      [
        "Le rôle du diaphragme",
        "Les parois (transverse / obliques)",
        "Le fait que la pression va aussi vers le bas",
      ],
      "Tout le cylindre, y compris le fond.",
    ],
    [
      "« Expire sur l'effort » vise notamment à…",
      "Mieux gérer la pression plutôt que tout bloquer en apnée",
      [
        "Supprimer le diaphragme",
        "Remplacer le transverse par le TFL",
        "Pointer le pied",
      ],
      "Stratégie respiratoire pour le cylindre, pas un exercice de mollet.",
    ],
    [
      "Le plancher pelvien n'est pas…",
      "Le tendon d'Achille ni la coiffe de l'épaule",
      [
        "Une nappe musculaire sous le bassin",
        "Un acteur de la continence",
        "Le fond du cylindre de stabilité",
      ],
      "Anatomie du petit bassin, pas de la jambe ni de l'épaule.",
    ],
    [
      "Inspirer et gainer avant de soulever sert à…",
      "Fermer les trois étages et pressuriser le tronc",
      [
        "Relâcher le plancher volontairement",
        "Isoler le VMO",
        "Étirer uniquement le psoas",
      ],
      "Préparation de la canette, pas un stretch de hanche.",
    ],
    [
      "Pesanteurs pelviennes sous charges répétées suggèrent souvent que…",
      "Le fond (plancher) n'a pas suivi la pression",
      [
        "Le tibial antérieur est trop fort",
        "Le chef court du biceps est trop faible",
        "Le tractus ilio-tibial s'est inséré sur l'Achille",
      ],
      "Pression vers le bas vs nappe pelvienne.",
    ],
    [
      "Hommes : le plancher pelvien…",
      "Compte aussi dans le cylindre et la continence",
      [
        "N'existe pas",
        "N'est utile qu'aux squats d'esthétique abdominale",
        "Remplace les fibulaires",
      ],
      "Anatomie partagée, pas un sujet « femmes seulement ».",
    ],
    [
      "Le transverse n'est pas le fond : si tu ne contractes que lui…",
      "Il manque encore diaphragme et/ou plancher pour la canette complète",
      [
        "L'IAP est forcément maximale et sûre",
        "Le plancher est automatiquement fort",
        "Le diaphragme devient inutile",
      ],
      "Trois étages, pas une sangle isolée.",
    ],
    [
      "Monter les charges progressivement protège surtout…",
      "Le plancher (et tout le cylindre) d'une pression brutale répétée",
      [
        "Uniquement le vaste intermédiaire",
        "Uniquement les fibulaires",
        "Uniquement l'insertion EIAI",
      ],
      "Adaptation du fond de canette.",
    ],
    [
      "La rigidité de la canette vient de…",
      "La pression intérieure (IAP) entre couvercle, parois et fond",
      [
        "La seule hypertrophie du grand droit",
        "Le tendon patellaire",
        "L'éversion du pied",
      ],
      "Incompressibilité par pression, pas par un muscle cosmétique isolé.",
    ],
  ]),

  // 7. Chaînes antérieure et postérieure
  bank25([
    [
      "La chaîne postérieure comprend surtout…",
      "Mollets, ischios, fessiers, érecteurs, trapèzes",
      [
        "Tibial antérieur, quads, fléchisseurs de hanche, abdos, pecs",
        "Uniquement le plancher pelvien",
        "Uniquement le VMO",
      ],
      "Ligne arrière : extension / propulsion.",
    ],
    [
      "La spécialité de la chaîne postérieure est surtout…",
      "L'extension et la propulsion (hinge, sprint, saut)",
      [
        "La flexion et le frein de l'extension",
        "L'éversion isolée de cheville",
        "Le guidage de rotule seul",
      ],
      "Hinge / sprint. Flexion-frein = plutôt chaîne antérieure.",
    ],
    [
      "La chaîne antérieure regroupe surtout…",
      "Tibial antérieur, quadriceps, fléchisseurs de hanche, abdos, pectoraux",
      [
        "Mollets, ischios, fessiers, érecteurs, trapèzes",
        "Uniquement le biceps fémoral",
        "Uniquement les fibulaires",
      ],
      "Ligne avant du corps.",
    ],
    [
      "La chaîne antérieure sert surtout à…",
      "Fléchir — et freiner l'extension quand il faut contrôler",
      [
        "Propulser uniquement en hinge",
        "Remplacer les érecteurs en soulevé",
        "Éverser le pied",
      ],
      "Flexion + frein, pas la propulsion postérieure.",
    ],
    [
      "Ce qui relie concrètement ces muscles, ce n'est pas qu'une image : ce sont surtout…",
      "Fascias et aponévroses",
      [
        "Uniquement les ongles",
        "Uniquement les dents",
        "L'absence totale de tissu conjonctif",
      ],
      "Continuité mécanique réelle le long de la ligne.",
    ],
    [
      "La tension se transmet le long de la ligne : un maillon raide ou faible…",
      "Modifie le comportement des voisins",
      [
        "N'affecte jamais le reste de la chaîne",
        "N'existe que pour le tibial antérieur",
        "Ne concerne que les pecs isolés",
      ],
      "Compensation le long de la continuité myofasciale.",
    ],
    [
      "Exemple courant cité : des ischios raides…",
      "Changent la posture lombaire en penché en avant",
      [
        "N'ont aucun effet sur le dos",
        "Éversent la cheville",
        "Guident la rotule comme le VMO",
      ],
      "Maillon postérieur → voisin lombaire / érecteurs.",
    ],
    [
      "Pour équilibrer les deux chaînes, un programme charge…",
      "Squat et développés d'un côté, hinge et tirages de l'autre",
      [
        "Uniquement le squat",
        "Uniquement le développé",
        "Uniquement le hinge",
      ],
      "Antérieur (squat / presses) vs postérieur (hinge / pulls).",
    ],
    [
      "Un soulevé de terre allume surtout…",
      "Une ligne entière, des talons à la nuque (chaîne postérieure)",
      [
        "Uniquement le tibial antérieur",
        "Uniquement les pectoraux",
        "Uniquement le droit fémoral en isolation",
      ],
      "Mollets → ischios → fessiers → érecteurs → trapèzes.",
    ],
    [
      "Les trapèzes, dans cette leçon, appartiennent surtout à…",
      "La chaîne postérieure",
      [
        "La chaîne antérieure avec les pecs",
        "Le plancher pelvien",
        "Les fibulaires",
      ],
      "Haut de la ligne arrière, avec les érecteurs.",
    ],
    [
      "Le tibial antérieur, dans ce thème, est classé dans…",
      "La chaîne antérieure",
      [
        "La chaîne postérieure avec les mollets",
        "Les érecteurs",
        "Les trapèzes",
      ],
      "Releveur avant vs mollets (triceps sural) derrière.",
    ],
    [
      "Les quadriceps appartiennent surtout à…",
      "La chaîne antérieure",
      [
        "La chaîne postérieure avec les ischios",
        "Le tractus seulement",
        "L'Achille seulement",
      ],
      "Face avant de cuisse, flexion/frein du genou en charge.",
    ],
    [
      "Hinge et sprint recrutent surtout…",
      "La chaîne postérieure",
      [
        "Uniquement les pecs",
        "Uniquement le tibial antérieur",
        "Uniquement le grand droit isolé",
      ],
      "Extension / propulsion.",
    ],
    [
      "Squat et développés chargent davantage…",
      "La face antérieure (quads, etc. / poussées avant)",
      [
        "Uniquement les ischios en RDL",
        "Uniquement les trapèzes en hinge",
        "Uniquement les érecteurs en soulevé",
      ],
      "Équilibre : antérieur vs hinge/tirages.",
    ],
    [
      "Tirages et hinge entretiennent surtout…",
      "La chaîne postérieure",
      [
        "Uniquement les pecs",
        "Uniquement le TFL",
        "Uniquement le VMO",
      ],
      "Paires squat/développés vs hinge/tirages.",
    ],
    [
      "Les fléchisseurs de hanche (dont iliopsoas) sont plutôt…",
      "Chaîne antérieure",
      [
        "Chaîne postérieure avec le grand fessier",
        "Triceps sural",
        "Érecteurs seuls",
      ],
      "Flexion de hanche = avant. Grand fessier = arrière.",
    ],
    [
      "Abdominaux et pectoraux, dans ce découpage, sont…",
      "Antérieurs",
      ["Postérieurs avec les érecteurs", "Des fibulaires", "Le fond de canette seulement"],
      "Face avant du tronc ; érecteurs = arrière.",
    ],
    [
      "Les mollets (triceps sural) sont classés ici dans…",
      "La chaîne postérieure",
      [
        "La chaîne antérieure avec le tibial antérieur",
        "Le plancher pelvien",
        "Les pecs",
      ],
      "Poussée arrière de jambe, pas le releveur antérieur.",
    ],
    [
      "Freiner une descente / une extension, c'est souvent le rôle de…",
      "La chaîne antérieure",
      [
        "La seule propulsion des érecteurs",
        "Le sprint uniquement",
        "Le hinge explosif uniquement",
      ],
      "Les antérieurs contrôlent ce que les postérieurs ont étendu.",
    ],
    [
      "Un maillon faible n'est pas anodin car…",
      "Toute la chaîne peut s'en trouver altérée",
      [
        "Les fascias bloquent toute transmission",
        "Les voisins ignorent toujours la tension",
        "Seuls les ongles transmettent la force",
      ],
      "Continuité : un maillon change les autres.",
    ],
    [
      "Les deux chaînes…",
      "S'équilibrent en posture et en mouvement",
      [
        "N'ont aucun lien fonctionnel",
        "Ne peuvent pas être entraînées le même programme",
        "Se limitent au plancher pelvien",
      ],
      "Pas deux univers séparés : équilibre squat/press vs hinge/pull.",
    ],
    [
      "Les ischios et les fessiers, dans la ligne postérieure, sont surtout des…",
      "Extenseurs (hanche) / propulseurs",
      [
        "Fléchisseurs de hanche comme le psoas",
        "Dorsiflexeurs comme le tibial antérieur",
        "Pecs",
      ],
      "Arrière de cuisse / fesse, pas la flexion antérieure.",
    ],
    [
      "Les érecteurs du rachis appartiennent surtout à…",
      "La chaîne postérieure",
      [
        "La chaîne antérieure avec les abdos seulement",
        "Le VMO",
        "Les fibulaires",
      ],
      "Dos / extension du tronc, avec fessiers et ischios.",
    ],
    [
      "Un programme « une seule chaîne » (rien que du squat, par exemple)…",
      "Déséquilibre l'autre ligne (hinge / tirages manquants)",
      [
        "Équilibre automatiquement trapèzes et érecteurs",
        "Remplace les fascias",
        "Supprime le besoin de mollets postérieurs",
      ],
      "Il faut les deux familles d'exercices.",
    ],
    [
      "Fascias transmettent la tension : donc isoler un muscle en pensée…",
      "Ignore souvent la continuité réelle de la ligne",
      [
        "Est toujours plus vrai que la chaîne",
        "Empêche toute compensation",
        "N'existe que pour le sprint",
      ],
      "Le soulevé n'allume pas « un » muscle : une ligne entière.",
    ],
  ]),
];
