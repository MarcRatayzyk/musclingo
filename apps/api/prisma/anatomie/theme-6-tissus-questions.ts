import { bank25 } from "./qcm-bank";
import type { SeedQuestion } from "../anatomie-quiz-helpers";

export const THEME_6_QUIZZES: SeedQuestion[][] = [
  // 1. Fibre et sarcomère
  bank25([
    [
      "Quelle est l'unité contractile du muscle ?",
      "Le sarcomère",
      ["Le tendon", "Le ligament", "L'unité motrice entière"],
      "Le sarcomère est le plus petit étage où actine et myosine glissent. L'unité motrice, elle, est un motoneurone plus ses fibres.",
    ],
    [
      "Dans un sarcomère, que font l'actine et la myosine pendant la contraction ?",
      "Elles glissent l'une sur l'autre",
      [
        "Elles se raccourcissent chacune en se repliant",
        "Elles se transforment en collagène",
        "Elles tirent directement sur le ligament",
      ],
      "Les filaments ne se contractent pas en eux-mêmes : ils glissent. Des millions de glissements bout à bout produisent le mouvement.",
    ],
    [
      "Une unité motrice, c'est…",
      "Un motoneurone et toutes les fibres qu'il innerve",
      [
        "Un sarcomère isolé",
        "Un tendon et l'os qu'il accroche",
        "Un fascia et son aponévrose",
      ],
      "Le système nerveux groupe les fibres : un motoneurone commande un paquet de fibres, pas un sarcomère unique.",
    ],
    [
      "Quand recrute-t-on davantage d'unités motrices ?",
      "Quand la charge ou l'intention monte",
      [
        "Dès la première répétition légère, toujours à 100 %",
        "Uniquement pendant le sommeil",
        "Seulement si le tendon est déjà hypertrophié",
      ],
      "Effort léger : peu d'unités. Charge plus lourde ou intention plus forte : le recrutement s'étend.",
    ],
    [
      "L'hypertrophie naît surtout de…",
      "Une tension mécanique répétée, puis récupération et protéines",
      [
        "Un stimulus unique sans reconstruction",
        "Du cardio seul, sans tension musculaire",
        "Un étirement passif des ligaments",
      ],
      "Les sarcomères doivent être mis sous tension assez souvent, puis reconstruits : sommeil, récupération et protéines.",
    ],
    [
      "Sans récupération ni protéines, que devient un stimulus d'entraînement ?",
      "Un stress incomplet",
      [
        "Une hypertrophie garantie",
        "Une adaptation tendineuse immédiate",
        "Un recrutement maximal des fibres II",
      ],
      "Le stimulus sans reconstruction reste un stress. L'hypertrophie demande les deux volets.",
    ],
    [
      "Où se trouvent les sarcomères ?",
      "Le long des myofibrilles, dans chaque fibre",
      [
        "Uniquement dans le tendon d'Achille",
        "Entre deux os, comme un ligament",
        "Dans le motoneurone seulement",
      ],
      "Faisceaux → fibres → myofibrilles → millions de sarcomères alignés.",
    ],
    [
      "Que relie surtout un tendon, contrairement au sarcomère ?",
      "Le muscle à l'os",
      [
        "Deux filaments d'actine entre eux",
        "Un motoneurone à une fibre",
        "Deux os pour limiter l'amplitude",
      ],
      "Le sarcomère contracte. Le tendon transmet la force vers l'os. Ce n'est pas la même étage.",
    ],
    [
      "Toutes les fibres d'un muscle se contractent-elles à 100 % dès une répétition légère ?",
      "Non : le recrutement augmente avec la demande",
      [
        "Oui : tout le muscle part à fond dès la première rep",
        "Oui, mais seulement les fibres de type II",
        "Non : seules les fibres du tendon s'activent",
      ],
      "Peu d'unités au début. Plus la charge ou l'intention monte, plus d'unités s'ajoutent.",
    ],
    [
      "Le motoneurone d'une unité motrice innerve…",
      "Toutes les fibres de son unité",
      [
        "Uniquement un sarcomère",
        "Le ligament de l'articulation voisine",
        "Toutes les fibres de tous les muscles du corps",
      ],
      "Une unité = un motoneurone + le paquet de fibres qu'il pilote, pas le muscle entier ni un filament isolé.",
    ],
    [
      "Quelle paire de filaments assure le glissement contractile ?",
      "Actine et myosine",
      ["Collagène et eau", "Tendon et ligament", "Fuseau et Golgi"],
      "Actine + myosine dans le sarcomère. Collagène + eau, c'est plutôt le fascia.",
    ],
    [
      "À quelle échelle se joue surtout une série d'hypertrophie ?",
      "Des filaments qui glissent sous tension, assez souvent",
      [
        "Des ligaments qui se contractent",
        "Des os qui s'allongent pendant la série",
        "Des aponévroses qui produisent la force",
      ],
      "La leçon ramène la série à cette échelle : sarcomères sous tension répétée, puis reconstruction.",
    ],
    [
      "Un muscle vu de près, c'est d'abord…",
      "Des faisceaux de fibres, puis des myofibrilles",
      [
        "Un seul tendon qui se contracte",
        "Un ligament os-à-os",
        "Une nappe d'aponévrose sans fibres",
      ],
      "Faisceaux, fibres, myofibrilles, sarcomères : c'est l'architecture interne du muscle.",
    ],
    [
      "Pourquoi parler d'« intention » en plus de la charge ?",
      "Elle fait aussi monter le recrutement",
      [
        "Elle raccourcit les tendons",
        "Elle transforme le type I en type II",
        "Elle vascularise instantanément le ligament",
      ],
      "Charge et intention : deux leviers pour recruter davantage d'unités motrices.",
    ],
    [
      "Le sarcomère est plus petit que…",
      "La fibre musculaire",
      [
        "Le filament d'actine isolé",
        "Une tête de myosine seule",
        "Un pont actine-myosine unique",
      ],
      "Le sarcomère contient les filaments. La fibre en contient des millions, via les myofibrilles.",
    ],
    [
      "L'hypertrophie cible surtout l'adaptation de…",
      "La fibre musculaire et ses sarcomères",
      [
        "Le ligament, qui se contracte",
        "Le cartilage articulaire en priorité",
        "Le nerf, qui s'épaissit comme un muscle",
      ],
      "Tension mécanique sur les sarcomères, puis reconstruction. Ligaments et nerfs ne « gonflent » pas comme la fibre.",
    ],
    [
      "Que manque-t-il si tu entraînes dur mais dors très peu et manges trop peu de protéines ?",
      "La reconstruction après le stimulus",
      [
        "Le glissement d'actine-myosine",
        "Le motoneurone lui-même",
        "La formation des ligaments",
      ],
      "Le stimulus est là ; sans récupération ni protéines, l'hypertrophie reste incomplète.",
    ],
    [
      "Une contraction visible, c'est surtout…",
      "Des millions de sarcomères qui glissent ensemble",
      [
        "Un seul sarcomère qui tire tout le bras",
        "Le tendon qui se raccourcit comme un muscle",
        "Le ligament qui se contracte",
      ],
      "Un sarcomère est microscopique. C'est leur addition massive qui produit le mouvement.",
    ],
    [
      "Le recrutement progressif signifie que…",
      "On n'active pas toutes les unités d'un coup sur un effort léger",
      [
        "Toutes les fibres partent toujours à 100 %",
        "Seuls les tendons sont recrutés d'abord",
        "Les sarcomères se recrutent un par un dans le ligament",
      ],
      "Peu d'unités si l'effort est léger ; davantage si la demande monte.",
    ],
    [
      "Où se produit le glissement actine-myosine ?",
      "Dans le sarcomère",
      [
        "Dans le tendon d'insertion",
        "Dans le ligament collatéral",
        "Dans le fascia lata",
      ],
      "C'est l'étage contractile. Tendon, ligament et fascia transmettent ou guident, ils ne glissent pas comme des filaments.",
    ],
    [
      "Le motoneurone appartient à…",
      "L'unité motrice",
      ["Le sarcomère", "Le ménisque", "L'aponévrose du grand droit"],
      "Unité motrice = motoneurone + fibres. Le sarcomère est en aval, dans la fibre.",
    ],
    [
      "Pourquoi une tension mécanique unique, même très forte, ne suffit pas à l'hypertrophie ?",
      "Il faut la répéter, puis reconstruire",
      [
        "Parce que seuls les ligaments hypertrophient",
        "Parce que l'actine ne glisse qu'une fois dans la vie",
        "Parce que le recrutement est toujours maximal",
      ],
      "Stimulus répété + récupération + protéines : les trois piliers de la leçon.",
    ],
    [
      "Les fibres d'une même unité motrice…",
      "Sont commandées ensemble par le même motoneurone",
      [
        "Se contractent chacune à un rythme indépendant",
        "Relient deux os comme un ligament",
        "Sont toujours des fibres de type I et II mélangées dans l'unité",
      ],
      "Le motoneurone pilote tout son paquet. Le mix I/II se joue surtout entre unités et dans le muscle entier.",
    ],
    [
      "Zoomer dans un muscle, c'est voir…",
      "Faisceaux, fibres, myofibrilles, sarcomères",
      [
        "Os, ligament, ménisque, disque",
        "Uniquement du collagène tendineux",
        "Un motoneurone sans fibres",
      ],
      "C'est l'échelle présentée en ouverture de leçon.",
    ],
    [
      "Quel rôle n'a pas le sarcomère ?",
      "Relier deux os et limiter l'amplitude",
      [
        "Permettre le glissement actine-myosine",
        "Servir d'unité contractile",
        "Produire la tension mécanique de la fibre",
      ],
      "Relier os à os, c'est le ligament. Le sarcomère contracte.",
    ],
  ]),

  // 2. Tendons et ligaments
  bank25([
    [
      "Un tendon relie…",
      "Le muscle à l'os",
      [
        "Deux os entre eux",
        "Deux muscles sans passer par l'os",
        "Un nerf à un fascia",
      ],
      "Tendon = muscle → os, pour transmettre la force. Ligament = os → os.",
    ],
    [
      "Un ligament relie…",
      "Deux os entre eux",
      [
        "Le muscle à l'os",
        "Le sarcomère à la myosine",
        "Le motoneurone à la fibre",
      ],
      "Os à os : il guide l'articulation et limite les amplitudes extrêmes.",
    ],
    [
      "Quel tissu transmet surtout la force musculaire à l'os ?",
      "Le tendon",
      ["Le ligament", "Le ménisque", "Le fuseau neuromusculaire"],
      "Sans tendon, la contraction resterait dans le muscle. Le ligament ne transmet pas cette force contractile.",
    ],
    [
      "Quel tissu guide et limite surtout le mouvement articulaire ?",
      "Le ligament",
      ["Le tendon", "La fibre de type II", "Le sarcomère"],
      "Le ligament stabilise os contre os. Le tendon, lui, sert le muscle.",
    ],
    [
      "Le muscle s'adapte surtout en…",
      "Quelques semaines",
      ["Quelques mois, comme le tendon", "Quelques années seulement", "Une seule séance"],
      "Très irrigué, le muscle progresse vite. Le tendon, peu vascularisé, prend des mois.",
    ],
    [
      "Le tendon se remodèle surtout sur…",
      "Des mois",
      ["Des jours", "La même vitesse que le muscle", "Une unique répétition lourde"],
      "Peu de vaisseaux : le tendon suit avec retard. D'où le décalage force / solidité tendineuse.",
    ],
    [
      "Pourquoi le tendon s'adapte-t-il plus lentement que le muscle ?",
      "Il est peu vascularisé",
      [
        "Il se contracte plus fort que le muscle",
        "Il contient plus de sarcomères",
        "Il est innervé par plus de motoneurones alpha",
      ],
      "Moins de sang, remodelage plus lent. Ce n'est pas un tissu contractile.",
    ],
    [
      "Quand les charges grimpent trop vite, qui encaisse souvent la différence ?",
      "Le tendon",
      [
        "Le muscle, déjà trop adapté",
        "Le ligament, qui se contracte trop",
        "Le sarcomère, trop vascularisé",
      ],
      "La force musculaire prend de l'avance. Le tendon, plus lent, encaisse le surplus.",
    ],
    [
      "Les douleurs chroniques du pratiquant (coude, épaule, genou) sont souvent…",
      "Tendineuses",
      ["Ligamentaires pures dès la première séance", "Osseuses d'hypertrophie", "Uniquement fasciales"],
      "Coude, épaule, genou : la leçon insiste sur les tendinopathies du quotidien musclé.",
    ],
    [
      "Les ligaments se contractent-ils ?",
      "Non : ils comptent sur les muscles pour être protégés",
      [
        "Oui, comme des fibres de type II",
        "Oui, via des sarcomères propres",
        "Oui, plus vite que le tendon",
      ],
      "Pas de contraction ligamentaire. Les muscles évitent de les mettre en danger.",
    ],
    [
      "Ta force progresse souvent plus vite que…",
      "Tes tendons",
      ["Tes motoneurones", "Tes fibres de type I", "Tes sarcomères"],
      "C'est une des raisons pour lesquelles les blessures arrivent quand « tout va bien ».",
    ],
    [
      "Relier muscle à os, c'est le rôle du…",
      "Tendon",
      ["Ligament", "Fascia lata uniquement", "Organe de Golgi seul"],
      "Transmission de force. Le Golgi mesure la tension dans ce tendon, mais n'est pas le lien mécanique.",
    ],
    [
      "Relier os à os, c'est le rôle du…",
      "Ligament",
      ["Tendon", "Sarcomère", "Motoneurone alpha"],
      "Guidage et limitation. Pas de transmission de la contraction musculaire.",
    ],
    [
      "Progresser trop vite en charge surcharge surtout…",
      "Tendons (et ligaments mis en danger)",
      [
        "Uniquement les fibres de type I",
        "Le plan sagittal",
        "L'hypertrophie des sarcomères trop rapide",
      ],
      "Tissus conjonctifs plus lents. Les ligaments, eux, dépendent des muscles pour ne pas être trop sollicités.",
    ],
    [
      "La progression raisonnable, ici, c'est surtout…",
      "Le rythme des tissus les plus lents",
      [
        "Ne plus jamais augmenter les charges",
        "Adapter le muscle en mois et le tendon en semaines",
        "Ignorer les douleurs tendineuses",
      ],
      "Pas de prudence excessive : simplement coller au tendon, plus lent que le muscle.",
    ],
    [
      "Le muscle est, par rapport au tendon…",
      "Très irrigué",
      ["Aussi pauvre en vaisseaux", "Moins contractile", "Plus lent à s'adapter"],
      "Bonne vascularisation → adaptation en semaines. Tendon pauvre en vaisseaux → mois.",
    ],
    [
      "Si tu gagnes 10 kg au développé en six semaines, le risque classique vient…",
      "Du décalage tendon / muscle",
      [
        "D'un ligament trop contractile",
        "D'un sarcomère trop vascularisé",
        "D'un fascia qui se contracte trop vite",
      ],
      "Le muscle a suivi ; le tendon n'a pas encore rattrapé.",
    ],
    [
      "Un ligament mis en danger, on le protège surtout par…",
      "Les muscles autour de l'articulation",
      [
        "Sa propre contraction",
        "Un recrutement de fibres II dans le ligament",
        "Un glissement actine-myosine ligamentaire",
      ],
      "Les ligaments ne se contractent pas. Les muscles évitent les amplitudes et forces dangereuses.",
    ],
    [
      "Quelle phrase est juste ?",
      "Tendon = transmission ; ligament = guidage / limitation",
      [
        "Tendon = os à os ; ligament = muscle à os",
        "Les deux se contractent comme le muscle",
        "Le ligament s'adapte en semaines, le muscle en mois",
      ],
      "C'est la distinction de base de la leçon.",
    ],
    [
      "Pourquoi « tout va bien » n'empêche pas une tendinopathie ?",
      "Parce que la force a pu précéder la solidité du tendon",
      [
        "Parce que le ligament s'est hypertrophié trop vite",
        "Parce que les fibres I se transforment en tendons",
        "Parce que le motoneurone tire sur l'os",
      ],
      "Sensation de force ≠ tissu tendineux déjà adapté.",
    ],
    [
      "Le tendon d'Achille, le tendon rotulien, le tendon du supra-épineux : ce sont des…",
      "Liens muscle-os",
      ["Liens os-os", "Unités motrices", "Aponévroses abdominales"],
      "Sites classiques de surcharge tendineuse chez le pratiquant.",
    ],
    [
      "Un LCA relie…",
      "Deux os (fémur et tibia)",
      ["Le quadriceps à la patella uniquement", "Deux sarcomères", "Le TFL au fascia lata"],
      "C'est un ligament. Le tendon quadricipital, lui, transmet la force du muscle.",
    ],
    [
      "Augmenter les charges chaque semaine comme le muscle le permet…",
      "Peut laisser le tendon en retard",
      [
        "Aligne automatiquement tendon et muscle",
        "Hypertrophie d'abord le ligament",
        "N'a aucun effet sur les tissus conjonctifs",
      ],
      "Le muscle « dit oui » plus tôt que le tendon.",
    ],
    [
      "Quelle affirmation sur le ligament est fausse ?",
      "Il se contracte pour freiner le mouvement",
      [
        "Il relie deux os",
        "Il guide l'articulation",
        "Il limite les amplitudes extrêmes",
      ],
      "Pas de contraction. Le « frein » actif, c'est le muscle (souvent l'antagoniste).",
    ],
    [
      "La leçon compare muscle et tendon surtout sur…",
      "La vitesse d'adaptation et la vascularisation",
      [
        "Le type de fibres I versus II",
        "Le plan sagittal versus frontal",
        "L'agoniste versus le stabilisateur",
      ],
      "Semaines vs mois, beaucoup de sang vs peu : voilà le décalage utile en salle.",
    ],
  ]),

  // 3. Unités motrices et types de fibres
  bank25([
    [
      "Les fibres de type I sont surtout…",
      "Lentes, oxydatives, endurantes",
      [
        "Rapides, très fatigables, explosives",
        "Absentes des muscles posturaux",
        "Réservées aux tendons",
      ],
      "Type I = oxygène, force modérée, endurance. Type II = force/vitesse, fatigue rapide.",
    ],
    [
      "Les fibres de type II sont plutôt…",
      "Rapides, fortes, plus fatigables",
      [
        "Lentes et posturales",
        "Uniquement oxydatives de longue durée",
        "Des ligaments contractiles",
      ],
      "Force et vitesse, mais elles se fatiguent vite — l'inverse du type I.",
    ],
    [
      "Qui tient surtout la posture toute la journée ?",
      "Les fibres de type I",
      ["Les fibres de type II", "Les tendons seuls", "Les organes de Golgi"],
      "Endurance oxydative : métier du type I, pas des fibres rapides fatigables.",
    ],
    [
      "Le principe de Henneman (principe de taille) dit que…",
      "Les petites unités s'activent d'abord, les grandes si la demande monte",
      [
        "Les grandes unités partent toujours en premier",
        "Type II d'abord, type I ensuite",
        "Toutes les unités partent ensemble, toujours",
      ],
      "Petites unités (souvent fibres lentes) d'abord. Grandes unités ensuite, si besoin.",
    ],
    [
      "Les grandes unités motrices, souvent plus rapides, s'ajoutent si…",
      "Charge lourde, explosivité ou proximité de l'échec",
      [
        "Série légère arrêtée très loin de l'échec",
        "Simple maintien postural de bureau",
        "Étirement passif d'un ligament",
      ],
      "Trois façons d'aller chercher les fibres rapides : lourd, explosif, ou fin de série difficile.",
    ],
    [
      "Une série légère stoppée très loin de l'échec…",
      "Ne stimule qu'une partie du muscle",
      [
        "Recrute forcément toutes les fibres II",
        "Inverse le profil génétique I/II",
        "Égale un effort proche de l'échec",
      ],
      "Peu de demande → peu d'unités, surtout les petites. Les grandes restent en réserve.",
    ],
    [
      "La plupart des muscles…",
      "Mélangent type I et type II",
      [
        "Sont 100 % type I ou 100 % type II",
        "N'ont que des tendons, pas de fibres",
        "Changent entièrement de type en une semaine",
      ],
      "Muscles mixtes. Les proportions sont largement génétiques.",
    ],
    [
      "L'entraînement transforme-t-il le profil de fibres du tout au tout ?",
      "Non : il apprend surtout à mieux l'exploiter",
      [
        "Oui : tout le monde devient 100 % type II",
        "Oui : les type I disparaissent",
        "Oui, dès les premières séances nerveuses",
      ],
      "La génétique pose le mix. L'entraînement affine le recrutement, pas une inversion totale.",
    ],
    [
      "Les fibres lentes fonctionnent surtout…",
      "À l'oxygène (oxydatives)",
      ["Sans aucune endurance", "Uniquement en anaérobie explosif", "Comme des ligaments"],
      "Type I oxydatif. Type II : davantage force/vitesse, moins d'endurance.",
    ],
    [
      "Pour recruter davantage de fibres rapides, une option est…",
      "S'approcher de l'échec sur la série",
      [
        "S'arrêter à 15 reps de réserve sur du léger",
        "Ne faire que de la posture statique très facile",
        "Étirer passivement le tendon d'Achille",
      ],
      "Proche de l'échec = demande qui monte = grandes unités. Loin de l'échec sur du léger = peu de fibres.",
    ],
    [
      "Un mouvement explosif va chercher surtout…",
      "Les grandes unités, souvent type II",
      [
        "Uniquement les fibres posturales lentes",
        "Les ligaments du genou",
        "Le fascia lata au repos",
      ],
      "Explosif = une des trois portes d'entrée vers les fibres rapides, avec le lourd et l'échec.",
    ],
    [
      "Les petites unités motrices sont surtout faites…",
      "De fibres lentes",
      ["De fibres II exclusivement", "De collagène tendineux", "De motoneurones Golgi"],
      "Henneman : petites d'abord, souvent type I. Grandes ensuite.",
    ],
    [
      "Type I versus type II, le contraste principal est…",
      "Endurance / posture contre force-vitesse fatigable",
      [
        "Tendon contre ligament",
        "Fuseau contre Golgi",
        "Agoniste contre stabilisateur",
      ],
      "Deux métiers dans le même muscle, pas deux tissus conjonctifs différents.",
    ],
    [
      "Pourquoi deux personnes progressent-elles différemment sur l'endurance vs l'explosivité ?",
      "Le mix de fibres est largement génétique",
      [
        "L'une n'a que des tendons, l'autre que des ligaments",
        "Henneman ne s'applique qu'aux type II",
        "L'entraînement inverse toujours le profil en 4 semaines",
      ],
      "Proportions I/II largement innées. On exploite le profil, on ne le réécrit pas entièrement.",
    ],
    [
      "« Toutes tes fibres ne sont pas embauchées pour le même métier » signifie…",
      "Type I et type II ont des rôles différents",
      [
        "Tendon et ligament se contractent ensemble",
        "Chaque sarcomère choisit son plan de l'espace",
        "Les fuseaux produisent la force, les Golgi la vitesse",
      ],
      "Lentes endurantes vs rapides fatigables : deux métiers.",
    ],
    [
      "Une charge lourde recrute…",
      "Jusqu'aux grandes unités si la demande l'exige",
      [
        "Seulement les type I, jamais les type II",
        "Uniquement les ligaments",
        "Moins d'unités qu'une série légère facile",
      ],
      "Plus la demande monte, plus on ajoute des unités — y compris les grandes.",
    ],
    [
      "Les fibres de type I produisent…",
      "Une force modérée, longtemps",
      [
        "Le pic de vitesse le plus élevé, très brièvement",
        "Aucune force, seulement du collagène",
        "La même explosivité que les type II",
      ],
      "Force modérée + endurance. Le pic force/vitesse, c'est plutôt le type II.",
    ],
    [
      "Les fibres de type II se fatiguent…",
      "Vite",
      ["Moins que les type I", "Jamais", "Uniquement si le tendon est froid"],
      "Rapides et fatigables. Les type I tiennent la journée.",
    ],
    [
      "Henneman n'est pas…",
      "L'idée que les type II partent toujours avant les type I",
      [
        "Un ordre de recrutement selon la taille des unités",
        "Petites unités d'abord",
        "Grandes unités si la demande monte",
      ],
      "C'est l'inverse du « tout explosif d'abord ». Les petites (souvent lentes) ouvrent le bal.",
    ],
    [
      "Pour stimuler une plus grande part du muscle en série légère, il faudrait…",
      "Aller plus près de l'échec (ou viser explosif / plus lourd)",
      [
        "S'arrêter très loin de l'échec",
        "Remplacer les fibres par des tendons",
        "Ne recruter que le fascia",
      ],
      "Loin de l'échec + léger = peu d'unités. La demande doit monter.",
    ],
    [
      "Un muscle « mixte » signifie…",
      "Il contient les deux types de fibres, en proportions variables",
      [
        "Il est à la fois tendon et ligament",
        "Il n'a que des unités géantes",
        "Il n'obéit pas à Henneman",
      ],
      "La plupart des muscles squelettiques sont mixtes.",
    ],
    [
      "Mieux exploiter son profil de fibres, c'est surtout…",
      "Recruter au bon moment (lourd, explosif, proche de l'échec) selon l'objectif",
      [
        "Forcer toutes les fibres I à devenir II",
        "Ignorer Henneman",
        "Entraîner uniquement les ligaments",
      ],
      "L'entraînement n'inverse pas tout ; il enseigne à utiliser ce qu'on a.",
    ],
    [
      "Les unités « grandes » s'ajoutent…",
      "Si la demande monte",
      ["Dès le moindre maintien postural", "Avant les petites, toujours", "Uniquement pendant le sommeil"],
      "Principe de taille : on n'envoie pas les grosses d'abord.",
    ],
    [
      "Confondre type I et type II, l'erreur typique serait de dire…",
      "Que les type I sont les plus explosives et les plus fatigables",
      [
        "Que les type I sont lentes et endurantes",
        "Que les type II sont rapides et fatigables",
        "Que le mix est en partie génétique",
      ],
      "C'est exactement l'inverse : explosif/fatigable = plutôt type II.",
    ],
    [
      "Le recrutement suit…",
      "La taille des unités (Henneman)",
      [
        "L'ordre tendon puis ligament",
        "Le plan frontal uniquement",
        "La longueur-tension du fascia lata",
      ],
      "Petites d'abord, grandes si besoin — pas un ordre de tissus conjonctifs.",
    ],
  ]),

  // 4. Fascias et aponévroses
  bank25([
    [
      "Un fascia est surtout…",
      "Une enveloppe de collagène et d'eau",
      [
        "Un os long",
        "Un motoneurone alpha",
        "Un sarcomère contractile",
      ],
      "Tissu conjonctif autour des fibres, muscles et groupes. Pas un moteur contractile.",
    ],
    [
      "Une aponévrose, c'est…",
      "Une nappe fasciale large et plate servant d'attache",
      [
        "Un tendon fin et rond uniquement",
        "Un ligament os-à-os",
        "Un fuseau neuromusculaire",
      ],
      "Quand le fascia s'épaissit en nappe d'insertion, on parle d'aponévrose.",
    ],
    [
      "Le glissement des plans fasciaux participe surtout à…",
      "La sensation de mobilité (ou de raideur)",
      [
        "La production de force des type II",
        "Le recrutement selon Henneman",
        "La contraction du ligament",
      ],
      "Collagène + eau qui glissent — ou pas. Ce n'est pas le sarcomère qui « glisse » ici.",
    ],
    [
      "Les abdominaux se terminent notamment sur…",
      "L'aponévrose du grand droit",
      [
        "Le fascia lata de la cuisse",
        "Le tractus ilio-tibial seul",
        "Le tendon d'Achille",
      ],
      "Nappe large d'attache antérieure. Le fascia lata, lui, gaine la cuisse.",
    ],
    [
      "Le fascia lata gaine surtout…",
      "La cuisse",
      ["Le grand droit abdominal", "Le poignet", "Le tendon du biceps"],
      "Cuisse gainée par le fascia lata, prolongé latéralement par le tractus ilio-tibial.",
    ],
    [
      "Qui tire notamment sur le tractus ilio-tibial ?",
      "Le TFL et le grand fessier",
      [
        "Le grand droit et le transverse seuls",
        "Le biceps et le triceps",
        "Les érecteurs uniquement",
      ],
      "TFL + grand fessier sur le tractus, côté de la cuisse — pas les abdos.",
    ],
    [
      "Les fascias transmettent surtout…",
      "De la tension au-delà du muscle qui se contracte",
      [
        "L'influx du motoneurone alpha",
        "La force comme un tendon unique vers un seul os",
        "Un ordre de recrutement Henneman",
      ],
      "Base des chaînes myofasciales : la tension circule dans le réseau, ce n'est pas un emballage mort.",
    ],
    [
      "Le fascia est-il un emballage passif ?",
      "Non : c'est la trame qui relie les muscles entre eux",
      [
        "Oui : il ne transmet aucune tension",
        "Oui : il se contracte comme un type II",
        "Oui : il remplace les ligaments",
      ],
      "Pas passif. Pas non plus un muscle : il transmet et relie.",
    ],
    [
      "Autour de chaque fibre, chaque muscle, chaque groupe, on trouve…",
      "Du fascia",
      ["Un ligament os-os", "Un motoneurone Golgi", "Une patella"],
      "Même matériau blanc nacré à plusieurs échelles d'enveloppe.",
    ],
    [
      "Aponévrose versus tendon classique : la différence utile ici…",
      "Nappe large et plate d'attache versus corde plus localisée",
      [
        "L'aponévrose relie deux os, le tendon non",
        "Le tendon est du collagène, l'aponévrose de l'actine",
        "L'aponévrose se contracte, le tendon non",
      ],
      "Les deux sont conjonctifs d'insertion. L'aponévrose est une nappe ; le tendon, souvent une corde.",
    ],
    [
      "Le tractus ilio-tibial est le prolongement latéral…",
      "Du fascia lata",
      ["De l'aponévrose du grand droit", "Du ligament croisé", "Du sarcomère du TFL"],
      "Fascia lata → tractus, tiré par TFL et grand fessier.",
    ],
    [
      "Les chaînes myofasciales reposent sur l'idée que…",
      "La tension passe d'un segment à l'autre via le fascia",
      [
        "Chaque muscle travaille dans une boîte étanche",
        "Seuls les ligaments relient les chaînes",
        "Le type I n'a pas de fascia",
      ],
      "Réseau, pas isolation. D'où « pas un emballage passif ».",
    ],
    [
      "Collagène + eau, c'est surtout la recette du…",
      "Fascia",
      ["Sarcomère", "Motoneurone alpha", "Type II pur"],
      "Enveloppe conjonctive hydratée, capable de glisser.",
    ],
    [
      "Si les plans glissent mal, tu peux ressentir…",
      "De la raideur",
      ["Un recrutement Henneman inversé", "Une hypertrophie instantanée", "Un ligament qui se contracte"],
      "Mobilité liée au glissement fascial, pas au type de fibre.",
    ],
    [
      "Le grand droit a une large surface d'attache via…",
      "Son aponévrose",
      ["Le fascia lata", "Le tendon d'Achille", "Le tractus seul"],
      "Les abdos se terminent sur cette nappe — pas sur le fascia de la cuisse.",
    ],
    [
      "TFL signifie, dans cette leçon, un muscle qui…",
      "Tire sur le tractus avec le grand fessier",
      [
        "Forme l'aponévrose du grand droit",
        "Relie deux os comme un ligament",
        "Mesure l'étirement comme un fuseau",
      ],
      "Tensor fascia lata : il tensionne le fascia lata / tractus, avec le grand fessier.",
    ],
    [
      "Disséquer un muscle révèle partout un matériau…",
      "Blanc nacré : le fascia",
      ["Rouge contractile uniquement, sans conjonctif", "Os compact", "Cartilage hyalin"],
      "Le conjonctif est partout, pas seulement au tendon terminal.",
    ],
    [
      "Transmettre la tension « au-delà du muscle qui se contracte », ce n'est pas le rôle principal…",
      "D'un sarcomère isolé dans une fibre",
      [
        "Du réseau fascial",
        "Des chaînes myofasciales",
        "D'une aponévrose d'attache",
      ],
      "Le sarcomère produit localement. Le fascia peut propager la tension plus loin.",
    ],
    [
      "Fascia versus ligament : le ligament…",
      "Relie surtout deux os et limite l'articulation",
      [
        "Enveloppe fibres et groupes musculaires",
        "Est une nappe d'attache des abdos",
        "Gaine la cuisse comme le fascia lata",
      ],
      "Même famille conjonctive, rôles différents : enveloppe/chaînes vs os-os.",
    ],
    [
      "Fascia versus tendon : le tendon…",
      "Transmet la force d'un muscle vers un os, de façon plus localisée",
      [
        "Enveloppe chaque fibre et chaque groupe",
        "Coupe le corps en plans sagittal/frontal",
        "Recrute les unités selon Henneman",
      ],
      "Le fascia est un réseau d'enveloppes ; le tendon, un câble d'insertion.",
    ],
    [
      "Pourquoi dire que le fascia n'est pas passif ?",
      "Il transmet la tension et relie les muscles",
      [
        "Il se contracte avec de l'actine et de la myosine",
        "Il innerve les fibres extrafusales",
        "Il inverse les types de fibres",
      ],
      "Actif au sens mécanique du réseau — pas au sens d'un sarcomère.",
    ],
    [
      "L'aponévrose du grand droit n'est pas…",
      "Le fascia lata de la cuisse",
      [
        "Une nappe d'attache abdominale",
        "Un fascia épaissi et plat",
        "Une surface d'insertion",
      ],
      "Deux nappes, deux régions : abdomen vs cuisse latérale.",
    ],
    [
      "Le grand fessier, dans cette leçon, est cité pour…",
      "Tirer sur le tractus ilio-tibial",
      [
        "Former l'aponévrose du grand droit",
        "Être un ligament de hanche",
        "Mesurer la tension comme un Golgi",
      ],
      "Avec le TFL, il charge le tractus — continuité myofasciale de hanche/cuisse.",
    ],
    [
      "La mobilité dont parle la leçon dépend aussi…",
      "Du glissement entre plans fasciaux",
      [
        "Uniquement du nombre de fibres II",
        "Uniquement du principe de Henneman",
        "De la contraction des ligaments",
      ],
      "Raideur vs glisse : collagène et eau entre les plans.",
    ],
    [
      "Quelle phrase est la plus juste ?",
      "Fascia = enveloppe et réseau ; aponévrose = nappe d'attache",
      [
        "Fascia = os à os ; aponévrose = muscle à os uniquement",
        "Les deux se contractent comme le type II",
        "L'aponévrose est un motoneurone",
      ],
      "Même tissu, formes différentes, rôles d'enveloppe vs d'insertion large.",
    ],
  ]),

  // 5. Innervation
  bank25([
    [
      "Qui porte l'ordre de contraction volontaire jusqu'aux fibres ?",
      "Le motoneurone alpha",
      [
        "Le fuseau neuromusculaire",
        "L'organe tendineux de Golgi",
        "Le ligament collatéral",
      ],
      "Alpha = commande. Fuseau = étirement. Golgi = tension du tendon.",
    ],
    [
      "Les fuseaux neuromusculaires détectent surtout…",
      "L'étirement du muscle",
      [
        "La tension dans le tendon",
        "La charge sur le ligament",
        "Le glissement du fascia lata",
      ],
      "Nichés dans le muscle, ils mesurent la longueur / l'étirement — pas la tension tendineuse.",
    ],
    [
      "Les organes tendineux de Golgi sont sensibles surtout à…",
      "La tension dans le tendon",
      [
        "L'étirement du ventre musculaire",
        "La vitesse d'un squat sans charge",
        "Le type de fibre I ou II",
      ],
      "Golgi dans le tendon = tension. Fuseau dans le muscle = étirement.",
    ],
    [
      "Le réflexe quand tu descends trop vite dans un squat vient surtout des…",
      "Fuseaux (étirement rapide)",
      [
        "Organes de Golgi seuls",
        "Ligaments du genou qui se contractent",
        "Aponévroses du grand droit",
      ],
      "Étirement brusque → fuseaux. Les Golgi, eux, parlent de tension tendineuse.",
    ],
    [
      "Sans influx nerveux…",
      "Pas de contraction volontaire",
      [
        "Le sarcomère glisse tout seul",
        "Le tendon se contracte à la place",
        "Les ligaments prennent le relais",
      ],
      "La technique est dans les câbles : pas d'ordre, pas de glissement volontaire.",
    ],
    [
      "Les premières semaines sur un nouvel exercice sont surtout…",
      "Nerveuses",
      [
        "Une hypertrophie massive des sarcomères",
        "Un remodelage tendineux déjà fini",
        "Un changement total type I → type II",
      ],
      "On recâble la commande avant de vraiment grossir le muscle.",
    ],
    [
      "Le nerf, sur un effort répété…",
      "Fatigue aussi, pas seulement le muscle",
      [
        "Ne se fatigue jamais",
        "Se fatigue uniquement si le tendon est froid",
        "Se fatigue à la place du Golgi seulement",
      ],
      "Système sollicité = fatigue possible du câble, pas seulement de la fibre.",
    ],
    [
      "Le dialogue fuseaux / Golgi règle notamment…",
      "Le tonus et la coordination agoniste / antagoniste",
      [
        "Le plan sagittal versus frontal",
        "La vascularisation du tendon",
        "Le mix génétique des fibres",
      ],
      "Feedback continu : longueur d'un côté, tension de l'autre, pour affiner le geste.",
    ],
    [
      "Le motoneurone alpha module la force…",
      "Unité motrice par unité motrice",
      [
        "En contractant le ligament",
        "En étirant le fascia lata",
        "En changeant l'angle d'insertion de la patella",
      ],
      "Plus d'unités, plus de force. C'est la commande, pas la géométrie osseuse.",
    ],
    [
      "Fuseau versus Golgi : le fuseau est dans…",
      "Le muscle",
      ["Le tendon", "Le ligament croisé", "L'os"],
      "Fuseau intramusculaire. Golgi tendineux.",
    ],
    [
      "Fuseau versus Golgi : le Golgi est dans…",
      "Le tendon",
      ["Le ventre musculaire comme un fuseau", "La moelle uniquement", "L'aponévrose du grand droit"],
      "Tension mesurée là où la force passe vers l'os.",
    ],
    [
      "Apprendre un mouvement, d'après la leçon, c'est surtout…",
      "Recâbler la commande nerveuse",
      [
        "Ajouter des sarcomères dès la première séance",
        "Épaissir les ligaments en 48 h",
        "Inverser Henneman",
      ],
      "Progression précoce = nerf. Le muscle suit ensuite.",
    ],
    [
      "Si tu « n'as plus de jus » alors que le muscle semble encore capable, une piste de la leçon est…",
      "La fatigue nerveuse",
      [
        "L'absence totale de fuseaux",
        "Un Golgi qui s'est transformé en type II",
        "Un fascia devenu ligament",
      ],
      "Le câble fatigue aussi. Ce n'est pas toujours la fibre qui lâche en premier.",
    ],
    [
      "Coordonner agoniste et antagoniste dépend…",
      "Du système nerveux (dont le feedback fuseaux/Golgi)",
      [
        "Uniquement de la longueur du tendon d'Achille",
        "Du plan transverse seul",
        "D'une contraction du ligament",
      ],
      "Dialogue de tonus : pas un rôle figé du tissu conjonctif.",
    ],
    [
      "Les fibres extrafusales, commandées par l'alpha, sont celles qui…",
      "Produisent surtout la force volontaire",
      [
        "Mesurent uniquement l'étirement",
        "Mesurent uniquement la tension tendineuse",
        "Relient deux os",
      ],
      "Alpha → fibres de force. Les fuseaux sont un autre capteur, dans le muscle.",
    ],
    [
      "Un squat descendu tranquillement sollicite les fuseaux…",
      "Moins brutalement qu'une descente très rapide",
      [
        "Exactement comme un Golgi à chaque millimètre",
        "Uniquement si le tendon d'Achille est coupé",
        "Plus que n'importe quelle descente explosive, toujours",
      ],
      "La leçon lie le réflexe à la descente rapide : étirement vite détecté.",
    ],
    [
      "Mesurer la tension, ce n'est pas le job principal…",
      "Du fuseau neuromusculaire",
      [
        "De l'organe tendineux de Golgi",
        "D'un capteur dans le tendon",
        "Du Golgi",
      ],
      "Étirement = fuseau. Tension = Golgi. Facile à inverser, donc à coller.",
    ],
    [
      "Mesurer l'étirement, ce n'est pas le job principal…",
      "De l'organe de Golgi",
      [
        "Du fuseau",
        "Des capteurs intramusculaires de longueur",
        "Du réflexe d'étirement",
      ],
      "Golgi = tension tendineuse, même si les deux dialogueent pour le tonus.",
    ],
    [
      "La technique « n'est pas dans les muscles » au sens de la leçon parce que…",
      "Elle est dans les câbles qui commandent",
      [
        "Les muscles n'ont pas de sarcomères",
        "Seuls les tendons produisent le geste",
        "Les fuseaux remplacent les motoneurones",
      ],
      "Sans influx, pas de geste volontaire propre.",
    ],
    [
      "Le motoneurone alpha part surtout…",
      "De la moelle vers les fibres",
      [
        "Du tendon vers le fuseau",
        "Du ligament vers l'os",
        "Du fascia lata vers le TFL",
      ],
      "Ordre descendant. Le retour d'info, c'est fuseaux et Golgi.",
    ],
    [
      "Affiner le geste, c'est le rôle du…",
      "Feedback (fuseaux, Golgi) plus la commande alpha",
      [
        "Seul collagène du fascia, sans nerf",
        "Seul type de fibre génétique",
        "Seul angle d'insertion de la patella",
      ],
      "Dialogue permanent. La géométrie et les fibres comptent ailleurs.",
    ],
    [
      "Confondre fuseau et Golgi, l'erreur type serait…",
      "De dire que le Golgi mesure l'étirement du muscle et le fuseau la tension du tendon",
      [
        "De placer le fuseau dans le muscle",
        "De placer le Golgi dans le tendon",
        "De lier le squat rapide aux fuseaux",
      ],
      "C'est l'inversion classique des deux capteurs.",
    ],
    [
      "Après un mois d'un mouvement nouveau, une part de tes gains précoces venait…",
      "Du recâblage nerveux",
      [
        "D'un tendon déjà pleinement remodelé",
        "D'une inversion totale I/II",
        "D'une hypertrophie ligamentaire",
      ],
      "Semaines 1–n : surtout nerf. Tendon = mois. Fibres = mix génétique stable.",
    ],
    [
      "Le tonus musculaire dépend notamment…",
      "Du dialogue nerveux (étirement vs tension)",
      [
        "Uniquement du plan frontal",
        "Uniquement de l'aponévrose du grand droit",
        "D'une contraction autonome des ligaments",
      ],
      "Fuseaux et Golgi informent ; l'alpha commande ; agoniste et antagoniste s'accordent.",
    ],
    [
      "Quelle affirmation est juste ?",
      "Alpha commande ; fuseau étire ; Golgi tensionne (mesure)",
      [
        "Alpha mesure l'étirement ; fuseau commande la fibre",
        "Golgi innerve les fibres extrafusales",
        "Le fuseau transmet la force à l'os",
      ],
      "Trois rôles distincts, trop souvent mélangés.",
    ],
  ]),
];
