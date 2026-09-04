import { bank25 } from "./qcm-bank";
import type { SeedQuestion } from "../anatomie-quiz-helpers";

export const THEME_4_QUIZZES: SeedQuestion[][] = [
  // 1. Biceps et brachial
  bank25([
    [
      "Combien de chefs a le biceps brachial ?",
      "Deux : long et court",
      [
        "Trois : long, latéral et médial",
        "Un seul chef, comme le brachial",
        "Quatre, comme la coiffe",
      ],
      "Biceps = deux chefs. Les trois chefs, c’est le triceps.",
    ],
    [
      "Où naît le chef long du biceps ?",
      "Au-dessus de la glène de l’omoplate",
      [
        "Sur le processus coracoïde",
        "Sur le tubercule infra-glénoïdien",
        "Sur la face antérieure de l’humérus",
      ],
      "Le long naît au-dessus de la glène. Le court naît sur le coracoïde ; l’infra-glénoïdien, c’est le chef long du triceps.",
    ],
    [
      "Où naît le chef court du biceps ?",
      "Sur le processus coracoïde",
      [
        "Au-dessus de la glène",
        "Sur l’olécrane",
        "Sur la tubérosité du radius",
      ],
      "Chef court → coracoïde. Au-dessus de la glène, c’est le chef long.",
    ],
    [
      "Où s’insèrent surtout les deux chefs du biceps, une fois fusionnés ?",
      "Sur la tubérosité du radius",
      [
        "Sur l’ulna, comme le brachial",
        "Sur l’olécrane",
        "Dans le sillon intertuberculaire",
      ],
      "Tendon distal bicipital → tubérosité du radius. L’ulna, c’est l’insertion du brachial.",
    ],
    [
      "Pourquoi le biceps est-il aussi un grand supinateur ?",
      "Parce qu’il tire sur le radius, l’os qui pivote",
      [
        "Parce qu’il s’insère sur l’ulna, qui ne tourne pas",
        "Parce qu’il naît uniquement sur l’humérus",
        "Parce qu’il étend le coude",
      ],
      "Tirer sur le radius oriente la paume vers le haut. Le brachial, sur l’ulna, ne peut pas supiner.",
    ],
    [
      "Quelle est la trajectoire du brachial ?",
      "De l’humérus à l’ulna",
      [
        "De l’omoplate à la tubérosité du radius",
        "De l’humérus à l’olécrane",
        "Du coracoïde au radius",
      ],
      "Brachial = humérus → ulna. Omoplate → radius, c’est le biceps.",
    ],
    [
      "Pourquoi le brachial fléchit-il aussi bien quelle que soit la prise ?",
      "Parce que l’ulna ne tourne pas : c’est un fléchisseur pur",
      [
        "Parce qu’il s’insère sur le radius et supine toujours",
        "Parce qu’il a deux chefs, long et court",
        "Parce qu’il croise aussi l’épaule",
      ],
      "Ulna fixe = même efficacité en supination, pronation ou prise neutre. Le biceps, lui, dépend de la paume.",
    ],
    [
      "Quelle action distingue surtout le biceps du brachial ?",
      "La supination",
      [
        "La flexion du coude",
        "L’extension du coude",
        "L’adduction du bras",
      ],
      "Les deux fléchissent le coude. Seul le biceps, via le radius, ajoute la supination.",
    ],
    [
      "En curl en supination (paume vers le haut), quel muscle est avantagé ?",
      "Le biceps",
      [
        "Le brachial seul, le biceps se tait",
        "Le triceps, chef long",
        "Le brachio-radial exclusivement",
      ],
      "Paume haute = flexion + supination. Le biceps, qui fait les deux, est pleinement sollicité.",
    ],
    [
      "En curl marteau ou en prise inversée, qui prend une plus grande part du travail ?",
      "Le brachial et le brachio-radial",
      [
        "Le biceps uniquement, car il reste le seul fléchisseur",
        "Le chef long du triceps",
        "Le petit rond et le subscapulaire",
      ],
      "Sans l’avantage de la supination, le biceps recule ; brachial et brachio-radial portent davantage la flexion.",
    ],
    [
      "Le brachio-radial intervient surtout dans quels curls ?",
      "Marteau et prise inversée",
      [
        "Uniquement le curl paume haute, avec le biceps",
        "Les extensions nuque",
        "Les face pulls",
      ],
      "Prise neutre ou pronation : le brachio-radial de l’avant-bras aide le brachial.",
    ],
    [
      "Quel muscle est caché sous le biceps ?",
      "Le brachial",
      [
        "Le chef latéral du triceps",
        "Le petit pectoral",
        "Le serratus antérieur",
      ],
      "Le brachial est profond, sous le biceps. Il ne dessine pas le galbe, mais il fléchit le coude.",
    ],
    [
      "Si tu veux cibler le biceps plutôt que le brachial, tu privilégies…",
      "Le curl en supination",
      [
        "Le curl marteau exclusivement",
        "Le curl inversé paume vers le bas",
        "Les pushdowns coude collé",
      ],
      "Supination = avantage biceps. Marteau et inversé basculent vers brachial et brachio-radial.",
    ],
    [
      "Le biceps croise-t-il l’épaule ?",
      "Oui : ses deux chefs naissent sur l’omoplate",
      [
        "Non : comme le brachial, il naît seulement sur l’humérus",
        "Seulement le chef court, depuis l’humérus",
        "Seulement via l’olécrane",
      ],
      "Long au-dessus de la glène, court sur le coracoïde : les deux chefs partent de l’omoplate.",
    ],
    [
      "Le brachial croise-t-il l’épaule ?",
      "Non : il va de l’humérus à l’ulna",
      [
        "Oui : il naît au-dessus de la glène",
        "Oui : il naît sur le coracoïde",
        "Oui : il s’insère sur le radius et l’omoplate",
      ],
      "Mono-articulaire au coude. L’épaule, c’est l’affaire des chefs du biceps.",
    ],
    [
      "Pourquoi l’insertion sur le radius permet-elle la supination, contrairement à l’ulna ?",
      "Le radius pivote ; l’ulna, lui, ne tourne pas",
      [
        "L’ulna pivote et le radius reste fixe",
        "Les deux os tournent de la même façon",
        "Seul l’humérus pivote au coude",
      ],
      "C’est pour ça que biceps (radius) supinent et que brachial (ulna) fléchit sans tourner la paume.",
    ],
    [
      "« Fléchisseur pur » désigne surtout…",
      "Le brachial",
      [
        "Le biceps, car il ne fait que fléchir",
        "Le chef long du triceps",
        "Le brachio-radial, car il s’insère sur le radius",
      ],
      "Pur = flexion de coude seulement, indépendante de la prise. Le biceps ajoute la supination.",
    ],
    [
      "Les deux chefs du biceps fusionnent avant de s’insérer…",
      "Sur la tubérosité du radius",
      [
        "Chacun de son côté : long sur l’ulna, court sur le radius",
        "Sur l’olécrane, avec le triceps",
        "Sur le processus coracoïde",
      ],
      "Chefs distincts à l’origine, tendon commun distal vers le radius.",
    ],
    [
      "Un curl inversé (paume vers le bas) désavantage surtout…",
      "Le biceps, qui perd l’avantage de la supination",
      [
        "Le brachial, qui ne peut plus fléchir",
        "Le brachio-radial, inactif en pronation",
        "Le triceps, qui doit alors fléchir",
      ],
      "En pronation, le biceps n’exploite plus sa double action. Brachial et brachio-radial restent efficaces.",
    ],
    [
      "Quelle distinction entre biceps et brachial est vraie ?",
      "Biceps : radius et supination ; brachial : ulna et flexion seule",
      [
        "Biceps : ulna et flexion seule ; brachial : radius et supination",
        "Les deux s’insèrent sur le radius et supinent",
        "Les deux s’insèrent sur l’ulna et ignorent la prise",
      ],
      "Deux insertions, deux stratégies : radius/supination contre ulna/fléchisseur pur.",
    ],
    [
      "Le processus coracoïde sert d’origine au…",
      "Chef court du biceps",
      [
        "Chef long du biceps",
        "Chef long du triceps",
        "Brachial",
      ],
      "Coracoïde = chef court (et aussi petit pectoral, autre leçon). Le long part au-dessus de la glène.",
    ],
    [
      "Le tubercule au-dessus de la glène (supra-glénoïdien) concerne…",
      "Le chef long du biceps",
      [
        "Le chef long du triceps (infra-glénoïdien)",
        "Le brachial",
        "Le chef court du biceps",
      ],
      "Au-dessus de la glène = long du biceps. Sous la glène = long du triceps. Ne pas inverser.",
    ],
    [
      "Pour un même poids, pourquoi marteau et curl classique ne recrutent-ils pas pareil ?",
      "La position de la main change qui commande entre biceps et brachial",
      [
        "Le coude ne fléchit plus en marteau",
        "Seul l’épaule travaille en curl classique",
        "Le brachial disparaît dès que la paume est haute",
      ],
      "Même flexion de coude ; c’est la prono-supination qui bascule le travail.",
    ],
    [
      "Le brachial s’insère-t-il sur le radius ?",
      "Non : il va à l’ulna",
      [
        "Oui : comme le biceps, d’où sa supination",
        "Oui, mais seulement le chef court",
        "Oui, sur la tubérosité radiale exclusive",
      ],
      "Radius = biceps. Ulna = brachial. C’est toute la différence mécanique.",
    ],
    [
      "Quelle paire d’exercices illustre le mieux le partage biceps / brachial ?",
      "Curl supination versus curl marteau ou inversé",
      [
        "Extensions nuque versus pushdowns",
        "Face pulls versus rotations internes",
        "Développé incliné versus développé décliné",
      ],
      "Supination → biceps ; marteau/inversé → brachial et brachio-radial. Les autres paires concernent triceps, coiffe ou pecs.",
    ],
  ]),

  // 2. Triceps : les trois chefs
  bank25([
    [
      "Combien de chefs a le triceps ?",
      "Trois",
      ["Deux, comme le biceps", "Quatre, comme la coiffe", "Un tendon, donc un seul chef"],
      "Trois chefs, un tendon commun vers l’olécrane.",
    ],
    [
      "Où convergent les trois chefs du triceps ?",
      "Sur l’olécrane de l’ulna",
      [
        "Sur la tubérosité du radius",
        "Sur la tubérosité deltoïdienne",
        "Dans le sillon intertuberculaire",
      ],
      "Tendon tricipital → olécrane, la pointe du coude. Le radius, c’est le biceps.",
    ],
    [
      "Où naissent le chef latéral et le chef médial du triceps ?",
      "Sur la face arrière de l’humérus",
      [
        "Sur le tubercule infra-glénoïdien",
        "Au-dessus de la glène",
        "Sur le processus coracoïde",
      ],
      "Latéral et médial = humérus. L’omoplate, c’est seulement le chef long.",
    ],
    [
      "Quelle est la seule action des chefs latéral et médial ?",
      "L’extension du coude",
      [
        "L’adduction du bras et l’extension du coude",
        "La flexion du coude",
        "La supination",
      ],
      "Ils ne croisent que le coude. L’épaule, c’est l’affaire du chef long.",
    ],
    [
      "Quel chef du triceps est bi-articulaire ?",
      "Le chef long",
      [
        "Le chef latéral",
        "Le chef médial",
        "Aucun : les trois naissent sur l’humérus",
      ],
      "Chef long : omoplate → olécrane. Il croise épaule et coude.",
    ],
    [
      "Où naît le chef long du triceps ?",
      "Sur le tubercule infra-glénoïdien",
      [
        "Au-dessus de la glène, comme le biceps",
        "Sur le coracoïde",
        "Sur la face antérieure de l’humérus",
      ],
      "Sous la glène = long du triceps. Au-dessus = long du biceps. Ne pas confondre.",
    ],
    [
      "Outre l’extension du coude, le chef long participe à…",
      "Ramener le bras vers le corps (adduction)",
      [
        "La supination de l’avant-bras",
        "L’élévation latérale comme le supra-épineux",
        "La rotation externe de la coiffe",
      ],
      "Bi-articulaire : il aide aussi à l’adduction du bras.",
    ],
    [
      "Aux extensions nuque (bras au-dessus de la tête), le chef long est…",
      "Mis en tension, sur une grande amplitude",
      [
        "Raccourci, donc les autres chefs dominent",
        "Inactif, car il ne croise pas l’épaule",
        "Remplacé par le biceps",
      ],
      "Épaule en flexion : le chef long est étiré. C’est le gros levier des extensions nuque.",
    ],
    [
      "Aux pushdowns (bras le long du corps), que se passe-t-il pour le chef long ?",
      "Il est raccourci ; latéral et médial dominent",
      [
        "Il est mis en tension maximale, comme aux extensions nuque",
        "Lui seul travaille, les autres se taisent",
        "Il fléchit le coude à la place du biceps",
      ],
      "Épaule en extension relative : le long est déjà raccourci. Les chefs huméraux portent davantage.",
    ],
    [
      "Pourquoi deux exercices d’extension de coude ne se valent jamais tout à fait ?",
      "La position de l’épaule change la part du chef long",
      [
        "L’olécrane n’est plus le même selon l’exercice",
        "Le biceps s’insère aussi sur l’olécrane",
        "Le chef médial disparaît dès que le bras monte",
      ],
      "Même insertion distale, origines différentes : varier l’épaule, c’est varier le recrutement.",
    ],
    [
      "Quel chef naît sous la glène, pas sur l’humérus ?",
      "Le chef long",
      ["Le chef latéral", "Le chef médial", "Les trois, tous infra-glénoïdiens"],
      "Seul le long part de l’omoplate. Latéral et médial restent sur l’humérus.",
    ],
    [
      "L’action principale commune aux trois chefs est…",
      "L’extension du coude",
      [
        "La flexion du coude",
        "L’adduction du bras seulement",
        "La rotation externe de l’humérus",
      ],
      "Tous étendent le coude vers l’olécrane. Seul le long ajoute un rôle à l’épaule.",
    ],
    [
      "Le chef latéral naît-il sur l’omoplate ?",
      "Non : sur l’humérus, comme le médial",
      [
        "Oui : tubercule infra-glénoïdien",
        "Oui : au-dessus de la glène",
        "Oui : processus coracoïde",
      ],
      "Omoplate = chef long uniquement.",
    ],
    [
      "Pour insister sur le chef long, tu choisis plutôt…",
      "Des extensions nuque, bras au-dessus de la tête",
      [
        "Des pushdowns, bras le long du corps",
        "Des curls en supination",
        "Des face pulls",
      ],
      "Tension du long = épaule fléchie. Pushdowns raccourcissent ce chef.",
    ],
    [
      "Pour laisser davantage latéral et médial dominer, tu choisis plutôt…",
      "Des pushdowns, bras le long du corps",
      [
        "Des extensions nuque",
        "Des curls marteau",
        "Des développé militaires stricts sans extension de coude",
      ],
      "Chef long raccourci → les deux chefs huméraux portent l’extension.",
    ],
    [
      "Le triceps n’a-t-il aucun rôle à l’épaule ?",
      "Faux : le chef long croise aussi l’épaule",
      [
        "Vrai : les trois naissent sur l’humérus",
        "Vrai : l’olécrane annule tout rôle proximal",
        "Faux : ce sont le latéral et le médial qui adductent le bras",
      ],
      "Seul le long est bi-articulaire. Les deux autres sont de purs extenseurs de coude.",
    ],
    [
      "Infra-glénoïdien signifie…",
      "Sous la glène de l’omoplate",
      [
        "Au-dessus de la glène",
        "Sur l’olécrane",
        "Sur la face antérieure de l’humérus",
      ],
      "Infra = sous. C’est l’origine du chef long du triceps, pas du biceps.",
    ],
    [
      "Le biceps et le chef long du triceps naissent tous deux près de la glène. Quelle différence ?",
      "Biceps au-dessus (supra), triceps en dessous (infra)",
      [
        "Les deux naissent sous la glène",
        "Les deux naissent au-dessus de la glène",
        "Le triceps naît sur le coracoïde, le biceps sous la glène",
      ],
      "Même région, étages opposés : supra-glénoïdien vs infra-glénoïdien.",
    ],
    [
      "Les chefs latéral et médial peuvent-ils adducter le bras ?",
      "Non : ils n’agissent qu’au coude",
      [
        "Oui, autant que le chef long",
        "Oui, c’est même leur action principale",
        "Seulement le médial, depuis l’omoplate",
      ],
      "Naissance humérale = pas d’action d’épaule. L’adduction, c’est le long.",
    ],
    [
      "Un seul tendon tricipital signifie…",
      "Les trois chefs partagent l’insertion olécranienne",
      [
        "Il n’y a qu’un chef fonctionnel",
        "Les origines sont forcément identiques",
        "Le biceps s’y accroche aussi",
      ],
      "Origines différentes, insertion commune. D’où l’intérêt de varier l’épaule.",
    ],
    [
      "Le chef médial du triceps naît…",
      "Sur l’humérus, comme le latéral",
      [
        "Sur le tubercule infra-glénoïdien",
        "Sur le coracoïde",
        "Sur la tubérosité du radius",
      ],
      "Médial et latéral = face postérieure de l’humérus.",
    ],
    [
      "Concernant le chef long du triceps, quelle affirmation est fausse ?",
      "Le chef long naît sur l’humérus et n’agit qu’au coude",
      [
        "Les trois chefs s’insèrent sur l’olécrane",
        "Latéral et médial naissent sur l’humérus",
        "Le chef long est bi-articulaire",
      ],
      "Le long naît sous la glène et agit aussi à l’épaule.",
    ],
    [
      "Varier la position de l’épaule pendant l’extension, c’est surtout varier…",
      "La répartition du travail dans les trois chefs",
      [
        "L’os d’insertion, radius ou ulna",
        "Le passage du biceps en fléchisseur",
        "L’appartenance du long à la coiffe",
      ],
      "Olécrane inchangé ; c’est l’origine scapulaire du long qui change de tension.",
    ],
    [
      "Le surnom « pointe du coude » désigne l’insertion du triceps sur…",
      "L’olécrane",
      [
        "La tubérosité du radius",
        "Le processus coracoïde",
        "La tubérosité deltoïdienne",
      ],
      "Olécrane = ulna proximal, cible unique des trois chefs.",
    ],
    [
      "Pushdowns versus extensions nuque : le mouvement de coude est le même, mais…",
      "Le chef long est raccourci d’un côté, étiré de l’autre",
      [
        "L’olécrane n’est recruté qu’aux pushdowns",
        "Le chef médial disparaît aux extensions nuque",
        "Le biceps devient extenseur aux extensions nuque",
      ],
      "Même extension distale, tension proximale du long inversée.",
    ],
  ]),

  // 3. Deltoïde et coiffe des rotateurs
  bank25([
    [
      "Le deltoïde est composé de combien de faisceaux distincts ?",
      "Trois : antérieur, moyen, postérieur",
      [
        "Quatre, comme la coiffe",
        "Deux : long et court",
        "Un seul, vers l’acromion",
      ],
      "Trois chefs de surface, un tendon vers la tubérosité deltoïdienne.",
    ],
    [
      "Où s’insère le deltoïde ?",
      "Sur la tubérosité deltoïdienne de l’humérus",
      [
        "Sur l’olécrane",
        "Sur le processus coracoïde",
        "Dans le sillon intertuberculaire",
      ],
      "Les trois chefs convergent sur la tubérosité deltoïdienne.",
    ],
    [
      "Combien de muscles forment la coiffe des rotateurs ?",
      "Quatre",
      ["Trois, comme le deltoïde", "Deux : infra et supra", "Six, tout le thorax"],
      "Supra-épineux, infra-épineux, petit rond, subscapulaire.",
    ],
    [
      "Quel muscle de la coiffe initie surtout l’élévation latérale ?",
      "Le supra-épineux",
      [
        "Le subscapulaire",
        "L’infra-épineux",
        "Le deltoïde antérieur seul",
      ],
      "Le supra-épineux lance l’abduction ; le deltoïde prend ensuite le relais.",
    ],
    [
      "Quels muscles de la coiffe font surtout la rotation externe ?",
      "L’infra-épineux et le petit rond",
      [
        "Le subscapulaire et le grand rond",
        "Le supra-épineux et le biceps",
        "Le deltoïde moyen et le trapèze",
      ],
      "Infra + petit rond = rotateurs externes. Le subscapulaire fait l’inverse : rotation interne.",
    ],
    [
      "Quelle est l’action rotatoire principale du subscapulaire ?",
      "La rotation interne de l’humérus",
      [
        "La rotation externe, comme le petit rond",
        "L’initiation de l’élévation latérale",
        "L’extension du coude",
      ],
      "Subscapulaire = unique rotateur interne de la coiffe. Ne pas le confondre avec l’infra-épineux.",
    ],
    [
      "Quelle est la mission commune des quatre muscles de la coiffe ?",
      "Plaquer et centrer la tête de l’humérus dans la glène",
      [
        "Grossir l’épaule en surface comme le deltoïde",
        "Étendre le coude vers l’olécrane",
        "Tirer l’omoplate en avant comme le petit pec",
      ],
      "Équipe de réglage : centrage. Le deltoïde est le moteur de surface.",
    ],
    [
      "Sans la coiffe, que ferait surtout le deltoïde à la tête humérale ?",
      "La remonter, jusqu’au conflit sous l’acromion",
      [
        "La plaquer encore mieux dans la glène",
        "La tourner uniquement en rotation externe",
        "Rien : le deltoïde n’agit pas sur la tête",
      ],
      "Deltoïde qui tire vers le haut sans centrage = frottement sous-acromial.",
    ],
    [
      "Le conflit d’épaule évoqué ici naît surtout quand…",
      "La tête humérale remonte et frotte sous l’acromion",
      [
        "Le biceps s’insère sur l’ulna",
        "Le transverse fléchit trop le tronc",
        "Le serratus plaque trop l’omoplate",
      ],
      "Mécanisme classique : décentrage supérieur → conflit sous-acromial.",
    ],
    [
      "Face pulls et rotations externes à l’élastique visent surtout…",
      "L’équipe de réglage de la coiffe (rotateurs externes)",
      [
        "Le volume du deltoïde moyen uniquement",
        "Le chef long du triceps",
        "Le grand pectoral claviculaire",
      ],
      "Entretenir infra-épineux et petit rond pour que le deltoïde puisse pousser lourd longtemps.",
    ],
    [
      "Quel muscle n’appartient pas à la coiffe ?",
      "Le deltoïde",
      [
        "Le supra-épineux",
        "Le petit rond",
        "Le subscapulaire",
      ],
      "Le deltoïde est le moteur superficiel. La coiffe, c’est les quatre profonds.",
    ],
    [
      "Le petit rond, dans cette leçon, est…",
      "Un rotateur externe de la coiffe",
      [
        "Un « petit dorsal » qui adducte comme le grand rond",
        "Un chef du deltoïde",
        "Un fléchisseur de coude",
      ],
      "Petit rond = coiffe, rotation externe. Le grand rond, lui, copie le dorsal (leçon suivante).",
    ],
    [
      "L’infra-épineux produit surtout…",
      "La rotation externe",
      [
        "La rotation interne, comme le subscapulaire",
        "L’initiation de l’abduction seule",
        "La flexion du coude",
      ],
      "Infra-épineux et petit rond : même camp rotatoire externe.",
    ],
    [
      "Le supra-épineux sert-il surtout à la rotation interne ?",
      "Non : il initie l’élévation latérale",
      [
        "Oui : c’est le jumeau du subscapulaire",
        "Oui, avec l’infra-épineux",
        "Oui, c’est sa seule action",
      ],
      "Supra = début d’abduction. Rotation interne = subscapulaire.",
    ],
    [
      "Les trois chefs du deltoïde lèvent le bras…",
      "Dans toutes les directions (avant, côté, arrière)",
      [
        "Uniquement en rotation externe",
        "Uniquement en adduction, comme le grand pec",
        "Uniquement en extension de coude",
      ],
      "Antérieur, moyen, postérieur : éventail d’élévation. La coiffe centre pendant ce tirage.",
    ],
    [
      "Pourquoi travailler la rotation externe même si tu « pousses » surtout avec le deltoïde ?",
      "Sans centrage de la coiffe, le deltoïde remonte la tête",
      [
        "Parce que la coiffe remplace le deltoïde en hypertrophie",
        "Parce que le subscapulaire est le seul abducteur",
        "Parce que l’olécrane dépend de l’infra-épineux",
      ],
      "Moteur (deltoïde) + réglage (coiffe) : les deux étages sont indispensables.",
    ],
    [
      "Le subscapulaire est-il un rotateur externe ?",
      "Non : c’est le rotateur interne de la coiffe",
      [
        "Oui, avec le petit rond",
        "Oui, c’est sa mission unique avec l’infra-épineux",
        "Oui, et il initie aussi l’abduction",
      ],
      "Seul de la coiffe en rotation interne. Infra + petit rond font l’externe.",
    ],
    [
      "Plaquer la tête humérale, c’est le rôle…",
      "Des quatre muscles de la coiffe",
      [
        "Du seul deltoïde moyen",
        "Du biceps via le radius",
        "Du transverse abdominal",
      ],
      "Centrage gléno-huméral = coiffe. Le deltoïde tire ; la coiffe maintient.",
    ],
    [
      "Le deltoïde et la coiffe se distinguent surtout par…",
      "Moteur de surface versus équipe de centrage en profondeur",
      [
        "La coiffe s’insère sur la tubérosité deltoïdienne, pas le deltoïde",
        "Le deltoïde a quatre chefs, la coiffe trois",
        "La coiffe étend le coude, le deltoïde le fléchit",
      ],
      "Deux étages : volume et direction d’un côté, stabilité de la tête de l’autre.",
    ],
    [
      "Parmi ces muscles, lequel initie l’élévation latérale avant que le deltoïde ne prenne le relais ?",
      "Le supra-épineux",
      [
        "Le subscapulaire",
        "Le petit pectoral",
        "Le chef long du triceps",
      ],
      "Supra-épineux = démarreur de l’abduction.",
    ],
    [
      "Le conflit sous-acromial décrit ici n’est pas un problème de « trop de deltoïde », mais de…",
      "Tête humérale non centrée qui remonte sous l’acromion",
      [
        "Olécrane trop saillant",
        "Transverse trop faible uniquement",
        "Radius qui ne pivote plus",
      ],
      "Sans coiffe efficace, le vecteur du deltoïde décentre vers le haut.",
    ],
    [
      "Le petit rond et l’infra-épineux sont souvent entraînés ensemble parce qu’ils…",
      "Font tous deux la rotation externe",
      [
        "Font tous deux la rotation interne",
        "S’insèrent tous deux sur l’olécrane",
        "Remplacent le deltoïde moyen",
      ],
      "Même camp. Le grand rond, malgré le nom, n’est pas dans cette paire.",
    ],
    [
      "Quelle combinaison décrit correctement la coiffe ?",
      "Supra (élévation), infra + petit rond (rot. ext.), subscapulaire (rot. int.)",
      [
        "Supra (rot. int.), infra + subscapulaire (rot. ext.), petit rond (abduction)",
        "Les quatre ne font que l’abduction, comme le deltoïde",
        "Petit rond et grand rond : même rotation interne",
      ],
      "Quatre rôles complémentaires autour d’une mission : centrer la tête.",
    ],
    [
      "Le deltoïde s’insère-t-il sur le coracoïde ?",
      "Non : sur la tubérosité deltoïdienne de l’humérus",
      [
        "Oui, comme le petit pectoral",
        "Oui, comme le chef court du biceps",
        "Oui, c’est l’insertion des trois chefs",
      ],
      "Coracoïde = petit pec, chef court du biceps, etc. Deltoïde → humérus.",
    ],
    [
      "Un programme d’épaule « complet » selon cette leçon combine…",
      "Travail des trois chefs du deltoïde et entretien de la coiffe (face pulls, rot. ext.)",
      [
        "Uniquement des élévations latérales lourdes, sans rotateurs",
        "Uniquement le subscapulaire, sans deltoïde",
        "Uniquement des curls, puisque le biceps centre la tête",
      ],
      "Moteur + réglage. Omettre la coiffe, c’est pousser un deltoïde qui remonte la tête.",
    ],
  ]),

  // 4. Grand et petit pectoral
  bank25([
    [
      "Où se termine le grand pectoral ?",
      "Dans le sillon intertuberculaire de l’humérus",
      [
        "Sur le processus coracoïde",
        "Sur l’olécrane",
        "Sur le bord médial de l’omoplate",
      ],
      "Grand pec → humérus (sillon). Le coracoïde, c’est le petit pec.",
    ],
    [
      "Où s’insère le petit pectoral ?",
      "Sur le processus coracoïde",
      [
        "Dans le sillon intertuberculaire, comme le grand",
        "Sur la tubérosité deltoïdienne",
        "Sur l’olécrane",
      ],
      "Petit pec : côtes → coracoïde. Il ne touche pas le bras.",
    ],
    [
      "Le petit pectoral touche-t-il l’humérus ?",
      "Non : il va des côtes au coracoïde",
      [
        "Oui : même sillon que le grand pec",
        "Oui : il adducte le bras",
        "Oui : insertion deltoïdienne",
      ],
      "Deux pectoraux, deux os cibles : humérus versus omoplate.",
    ],
    [
      "Quels sont les faisceaux du grand pectoral cités dans la leçon ?",
      "Claviculaire, sterno-costal et abdominal",
      [
        "Long, latéral et médial",
        "Antérieur, moyen et postérieur",
        "Supérieur, moyen et inférieur du trapèze",
      ],
      "Éventail du grand pec. Les trois chefs, c’est deltoïde ou triceps.",
    ],
    [
      "Quelles actions principales le grand pectoral produit-il sur le bras ?",
      "Adduction et rotation interne",
      [
        "Abduction et rotation externe",
        "Extension du coude",
        "Rétraction de l’omoplate",
      ],
      "Ramener le bras vers le corps et le tourner en dedans. La rotation externe, c’est plutôt la coiffe (infra, petit rond).",
    ],
    [
      "Pourquoi l’inclinaison du banc change-t-elle le travail du grand pec ?",
      "Elle aligne davantage tel ou tel faisceau dans son axe",
      [
        "Elle fait s’insérer le grand pec sur le coracoïde",
        "Elle transforme le petit pec en adducteur du bras",
        "Elle désactive toujours le faisceau claviculaire",
      ],
      "Même muscle, axes différents : inclinaison = faisceau claviculaire plus sollicité, etc.",
    ],
    [
      "Quelle est l’action du petit pectoral sur l’omoplate ?",
      "La tirer en avant et en bas",
      [
        "L’adducter comme le grand pec adducte le bras",
        "La rétracter vers la colonne",
        "La plaquer en rotation haute avec le trapèze",
      ],
      "Avant + bas. Trop tonique, il participe à l’épaule enroulée.",
    ],
    [
      "Un petit pec trop tonique peut entretenir…",
      "Une épaule enroulée vers l’avant",
      [
        "Une omoplate ailée (winging) par excès de serratus",
        "Une rotation externe excessive de la coiffe",
        "Une hyperextension du coude",
      ],
      "Tirer omoplate avant et bas = posture enroulée, surtout si le tirage manque.",
    ],
    [
      "Beaucoup de développé et peu de tirage, c’est risquer de…",
      "Laisser le petit pec toujours tirer dans le même sens",
      [
        "Transformer le grand pec en rotateur externe",
        "Insérer le petit pec sur l’humérus",
        "Annuler le faisceau sterno-costal",
      ],
      "Déséquilibre poussée / tirage : le petit pec n’est plus contesté.",
    ],
    [
      "Le muscle visible de la poitrine, qui agit sur le bras, est…",
      "Le grand pectoral",
      [
        "Le petit pectoral",
        "Le serratus antérieur",
        "Le subscapulaire",
      ],
      "Grand pec = volume et adduction du bras. Petit pec = caché, sur l’omoplate.",
    ],
    [
      "Le faisceau claviculaire du grand pec se situe…",
      "En haut, vers la clavicule",
      [
        "En bas, vers l’abdomen",
        "Uniquement sur le coracoïde",
        "Sur l’olécrane",
      ],
      "Claviculaire haut, sterno-costal au milieu, abdominal en bas.",
    ],
    [
      "Le faisceau abdominal du grand pec se situe…",
      "En bas de l’éventail",
      [
        "Sous la clavicule exclusivement",
        "Sur le petit pec uniquement",
        "Au bord médial de l’omoplate",
      ],
      "Les trois faisceaux convergent vers le même sillon huméral.",
    ],
    [
      "Pourquoi dit-on que grand et petit pec « ne tirent pas sur le même os » ?",
      "Grand pec → humérus ; petit pec → coracoïde (omoplate)",
      [
        "Grand pec → coracoïde ; petit pec → humérus",
        "Les deux vont à l’olécrane",
        "Les deux vont au radius",
      ],
      "C’est la clé pour ne pas leur attribuer les mêmes actions.",
    ],
    [
      "Le petit pectoral peut-il adducter le bras ?",
      "Non : il ne s’insère pas sur l’humérus",
      [
        "Oui : même tendon que le grand pec",
        "Oui, c’est son action principale",
        "Oui, via le sillon intertuberculaire",
      ],
      "Pas de bras, pas d’adduction humérale. Il oriente l’omoplate.",
    ],
    [
      "Le sillon intertuberculaire reçoit notamment le tendon du…",
      "Grand pectoral",
      [
        "Petit pectoral",
        "Deltoïde",
        "Brachial",
      ],
      "Grand pec (et plus tard grand dorsal / grand rond) dans ce sillon. Pas le petit pec.",
    ],
    [
      "Un développé incliné sollicite davantage, dans l’axe…",
      "Le faisceau claviculaire du grand pec",
      [
        "Le petit pectoral comme adducteur du bras",
        "Uniquement le faisceau abdominal",
        "Le chef long du triceps à la place du pec",
      ],
      "Inclinaison du banc = changement de faisceau, pas changement d’insertion.",
    ],
    [
      "Le processus coracoïde, pour le petit pec, est…",
      "Son insertion scapulaire",
      [
        "Son origine costale",
        "L’insertion du grand pec",
        "L’insertion du deltoïde",
      ],
      "Origine : côtes. Insertion : coracoïde. Le grand pec, lui, finit sur l’humérus.",
    ],
    [
      "Quelle distinction entre grand pectoral et petit pectoral est vraie ?",
      "Le grand pec adducte le bras ; le petit pec oriente l’omoplate",
      [
        "Le petit pec adducte le bras ; le grand pec n’agit que sur l’omoplate",
        "Les deux adductent uniquement l’omoplate",
        "Les deux s’insèrent sur le coracoïde",
      ],
      "Grand = moteur du développé sur l’humérus. Petit = hauban scapulaire à surveiller.",
    ],
    [
      "L’épaule enroulée n’est pas « trop de grand pec qui tire l’omoplate », mais plutôt…",
      "Un petit pec qui tire omoplate en avant et en bas",
      [
        "Un supra-épineux trop fort",
        "Un trapèze inférieur trop actif uniquement",
        "Un transverse qui fléchit l’épaule",
      ],
      "Le grand pec tire le bras. Le petit pec, lui, enroule la ceinture scapulaire.",
    ],
    [
      "Le grand pectoral produit-il de la rotation externe du bras ?",
      "Non : surtout de la rotation interne (avec l’adduction)",
      [
        "Oui : c’est sa signature, comme le petit rond",
        "Oui, via le coracoïde",
        "Oui, uniquement le faisceau abdominal",
      ],
      "Rotation interne. La rotation externe de l’humérus, c’est infra-épineux et petit rond.",
    ],
    [
      "Le petit pec est « intéressant » cliniquement surtout parce que…",
      "Raide, il peut figer une omoplate trop antérieure et basse",
      [
        "Il remplace le grand pec au développé lourd",
        "Il s’insère sur l’humérus et hypertrophie la poitrine",
        "Il fait la rotation haute avec le trapèze",
      ],
      "Surveillance posturale, pas muscle de volume de poitrine.",
    ],
    [
      "Les faisceaux du grand pec convergent…",
      "En éventail vers le sillon intertuberculaire",
      [
        "Chacun vers le coracoïde",
        "Vers l’olécrane",
        "Vers le bord médial de l’omoplate",
      ],
      "Un tendon distal, plusieurs axes proximaux — d’où l’effet de l’inclinaison du banc.",
    ],
    [
      "Qui naît sur les côtes et finit sur le coracoïde ?",
      "Le petit pectoral",
      [
        "Le grand pectoral",
        "Le serratus, qui finit sur l’humérus",
        "Le subscapulaire",
      ],
      "Petit pec = côtes → coracoïde. Le serratus va au bord médial, pas au coracoïde.",
    ],
    [
      "« Grand pec pour pousser ; petit pec à surveiller pour la position de l’épaule » signifie…",
      "L’un meut le bras, l’autre oriente l’omoplate",
      [
        "Les deux meuvent le bras de la même façon",
        "Le petit pec est le moteur du développé décliné",
        "Le grand pec n’a pas d’insertion humérale",
      ],
      "Deux métiers, deux os, deux raisons de les entraîner (ou de les relâcher) différemment.",
    ],
    [
      "Confondre petit et grand pectoral, c’est surtout confondre…",
      "Action sur l’humérus versus action sur l’omoplate",
      [
        "Rotation externe versus flexion de coude",
        "Chef long versus chef latéral du triceps",
        "Transverse versus grand droit",
      ],
      "Même région, os d’arrivée différents : toute la leçon tient là.",
    ],
  ]),

  // 5. Grand dorsal, grand rond, petit rond
  bank25([
    [
      "Où s’insère le grand dorsal sur le bras ?",
      "Dans le sillon intertuberculaire de l’humérus",
      [
        "Sur l’olécrane",
        "Sur le processus coracoïde",
        "Sur la tubérosité deltoïdienne",
      ],
      "Large origine, insertion étroite dans le sillon — comme le grand pec, d’ailleurs.",
    ],
    [
      "Quelles sont les trois actions classiques du grand dorsal sur le bras ?",
      "Extension, adduction et rotation interne",
      [
        "Flexion, abduction et rotation externe",
        "Uniquement la rotation externe, comme le petit rond",
        "Protraction et winging de l’omoplate",
      ],
      "Le trio du tirage. La rotation externe, c’est le petit rond, pas le dorsal.",
    ],
    [
      "Le grand rond reproduit surtout les actions…",
      "Du grand dorsal, depuis l’omoplate",
      [
        "Du petit rond et de la coiffe",
        "Du deltoïde moyen",
        "Du brachial",
      ],
      "Surnom « petit dorsal » : mêmes actions, origine scapulaire plus courte.",
    ],
    [
      "Pourquoi appelle-t-on parfois le grand rond « petit dorsal » ?",
      "Il copie extension, adduction et rotation interne du latissimus",
      [
        "Il appartient à la coiffe, comme un mini-supra-épineux",
        "Il fait la rotation externe du petit rond",
        "Il s’insère sur le coracoïde",
      ],
      "Même sens de tirage, plus petit, depuis le bas de l’omoplate.",
    ],
    [
      "Le petit rond appartient à…",
      "La coiffe des rotateurs",
      [
        "La même équipe fonctionnelle que le grand dorsal",
        "Les fléchisseurs du coude",
        "La paroi abdominale",
      ],
      "Petit rond = coiffe. Grand rond = « petit lat ». Voisinage trompeur.",
    ],
    [
      "Quelle rotation produit le petit rond ?",
      "La rotation externe",
      [
        "La rotation interne, comme le grand rond",
        "Aucune : il n’agit pas sur l’humérus",
        "Uniquement l’extension du coude",
      ],
      "Inverse du grand rond et du grand dorsal, qui enroulent le bras en dedans.",
    ],
    [
      "Quelle rotation produisent grand dorsal et grand rond ?",
      "La rotation interne",
      [
        "La rotation externe, comme le petit rond",
        "Aucune rotation, seulement la protraction",
        "La supination du radius",
      ],
      "Les deux « dorsaux » enroulent en dedans ; le petit rond retient en dehors.",
    ],
    [
      "Le piège de voisinage autour de l’aisselle, c’est…",
      "Deux muscles en rotation interne, un voisin en rotation externe",
      [
        "Les trois font exactement la même rotation externe",
        "Le petit rond adducte plus que le grand dorsal",
        "Le grand rond est un muscle de la coiffe",
      ],
      "Noms proches, camps opposés. L’équilibre rotatoire protège l’épaule du tireur.",
    ],
    [
      "D’où part surtout le grand rond ?",
      "Du bas de l’omoplate vers le sillon intertuberculaire",
      [
        "D’une origine thoraco-lombaire immense, comme le dorsal",
        "Du tubercule infra-glénoïdien, comme le chef long du triceps uniquement",
        "Des côtes vers le coracoïde",
      ],
      "Omoplate → sillon. Le dorsal a une origine beaucoup plus large.",
    ],
    [
      "L’origine du grand dorsal est…",
      "Très large : vertèbres, bassin, côtes basses…",
      [
        "Uniquement le bas de l’omoplate",
        "Uniquement le coracoïde",
        "Uniquement l’olécrane",
      ],
      "Origine immense, insertion unique au sillon. Le grand rond est plus « local » scapulaire.",
    ],
    [
      "Tractions et tirages nourrissent ensemble…",
      "Le grand dorsal et le grand rond",
      [
        "Le petit rond à la place du dorsal",
        "Uniquement le supra-épineux",
        "Le brachial",
      ],
      "Même trio d’actions : les deux profitent du tirage. Le petit rond, lui, a besoin de rotation externe.",
    ],
    [
      "Confondre petit rond et grand rond, c’est confondre…",
      "Coiffe / rotation externe versus « petit lat » / rotation interne",
      [
        "Deux chefs du biceps",
        "Transverse et grand droit",
        "Petit pec et grand pec uniquement",
      ],
      "Le mot « rond » est le piège. Les actions s’opposent.",
    ],
    [
      "Le petit rond stabilise surtout…",
      "La tête humérale, comme le reste de la coiffe",
      [
        "L’olécrane pendant l’extension",
        "Le pubis pendant le crunch",
        "Le radius pendant la supination",
      ],
      "En plus de la rotation externe, il plaque la tête — métier de coiffe, pas de dorsal.",
    ],
    [
      "Le grand dorsal naît-il uniquement sur l’humérus ?",
      "Non : large origine proximale, insertion humérale distale",
      [
        "Oui : il naît et s’insère sur l’humérus",
        "Oui : comme le brachial",
        "Oui : uniquement au sillon, sans origine axiale",
      ],
      "Il part du tronc (et plus) pour finir au sillon. Pas un muscle « d’humérus à humérus ».",
    ],
    [
      "Parmi ces trois, lequel NE fait PAS partie du trio d’adduction / extension / rot. interne ?",
      "Le petit rond",
      ["Le grand dorsal", "Le grand rond", "Les deux « grands » ensemble"],
      "Petit rond = l’intrus fonctionnel du voisinage.",
    ],
    [
      "Le grand pec et le grand dorsal se retrouvent tous deux…",
      "Au sillon intertuberculaire, avec une rotation interne du bras",
      [
        "Au coracoïde",
        "À l’olécrane",
        "Au bord médial profond de l’omoplate",
      ],
      "Pousseur et tireur partagent une logique d’insertion humérale — d’où l’enroulement interne possible.",
    ],
    [
      "Pour équilibrer un gros volume de tirage (dorsal + grand rond), il faut aussi…",
      "De la rotation externe (petit rond / infra-épineux)",
      [
        "Encore plus de rotation interne isolée",
        "Supprimer tout travail de coiffe",
        "Transformer le petit rond en adducteur",
      ],
      "L’équilibre rotatoire de l’épaule du tireur : ne pas laisser les « grands » sans antagoniste.",
    ],
    [
      "Le grand rond s’insère-t-il sur le coracoïde ?",
      "Non : vers le sillon intertuberculaire, comme le dorsal",
      [
        "Oui, comme le petit pectoral",
        "Oui, comme le chef court du biceps",
        "Oui, c’est ce qui en fait un muscle de coiffe",
      ],
      "Sillon = grand pec, grand dorsal, grand rond. Coracoïde = autre club.",
    ],
    [
      "Concernant le petit rond, quelle affirmation est fausse ?",
      "Le petit rond est un « petit dorsal » qui adducte et tourne en dedans",
      [
        "Le grand rond copie le grand dorsal",
        "Le petit rond fait la rotation externe",
        "Le grand dorsal s’insère dans le sillon intertuberculaire",
      ],
      "« Petit dorsal » = grand rond, pas petit rond.",
    ],
    [
      "Extension du bras (le ramener en arrière) est une action du…",
      "Grand dorsal (et du grand rond)",
      [
        "Petit rond exclusivement",
        "Brachial",
        "Transverse",
      ],
      "Extension + adduction + rot. interne = latissimus / grand rond.",
    ],
    [
      "Adduction du bras vers le tronc, dans ce trio, c’est surtout…",
      "Grand dorsal et grand rond, pas le petit rond",
      [
        "Le petit rond seul",
        "Le supra-épineux",
        "Le deltoïde moyen",
      ],
      "Ramener le bras = tirage. Le petit rond ne copie pas cette fiche.",
    ],
    [
      "Le petit rond se situe « juste au-dessus » du grand rond, mais…",
      "Il joue dans l’autre camp rotatoire",
      [
        "Il a exactement les mêmes insertions et actions",
        "Il naît sur le bassin comme le dorsal",
        "Il fléchit le coude",
      ],
      "Anatomie de voisinage ≠ anatomie de fonction.",
    ],
    [
      "Le sillon intertuberculaire, pour le grand dorsal, est…",
      "L’arrivée du tendon, pas l’origine",
      [
        "Toute l’origine thoraco-lombaire",
        "L’équivalent du coracoïde",
        "L’insertion du petit rond",
      ],
      "On part large, on finit étroit au sillon.",
    ],
    [
      "Si un QCM dit « le petit rond adducte comme le dorsal », tu réponds…",
      "Faux : c’est le grand rond ; le petit rond est rotateur externe de coiffe",
      [
        "Vrai : petit et grand rond sont synonymes",
        "Vrai : toute la coiffe adducte",
        "Vrai : le petit rond est le vrai « petit lat »",
      ],
      "Le piège pédagogique central de la leçon.",
    ],
    [
      "Santé d’épaule des « gros tireurs » : l’enjeu local, ici, est…",
      "L’équilibre entre rotation interne (dorsal, grand rond) et externe (petit rond)",
      [
        "D’éliminer le petit rond pour adducter plus fort",
        "De n’entraîner que le petit rond en tirage lourd",
        "De remplacer le dorsal par le brachial",
      ],
      "Deux camps autour de l’aisselle. Les deux doivent rester dans le match.",
    ],
  ]),

  // 6. Trapèze, rhomboïdes, élévateur
  bank25([
    [
      "Que font surtout les fibres supérieures du trapèze ?",
      "Élever l’omoplate",
      [
        "L’abaisser",
        "Uniquement la rotation basse, comme les rhomboïdes",
        "Fléchir le coude",
      ],
      "Supérieur = élévation. L’abaissement, c’est l’inférieur.",
    ],
    [
      "Que font surtout les fibres moyennes du trapèze ?",
      "Rétracter l’omoplate",
      [
        "L’élever comme un shrug exclusif",
        "L’abaisser uniquement",
        "Protracter, comme le serratus",
      ],
      "Moyen = tirer vers la ligne médiane. La protraction, c’est l’inverse (serratus).",
    ],
    [
      "Que font surtout les fibres inférieures du trapèze ?",
      "Abaisser l’omoplate",
      [
        "L’élever",
        "Tourner uniquement en rotation basse",
        "Adducter l’humérus comme le dorsal",
      ],
      "Inférieur = abaissement. Avec le supérieur, elles ajoutent la rotation haute.",
    ],
    [
      "Quelles fibres du trapèze, ensemble, font la rotation haute (overhead) ?",
      "Supérieures et inférieures",
      [
        "Moyennes seules",
        "Uniquement les rhomboïdes",
        "L’élévateur seul",
      ],
      "Couple sup + inf = rotation vers le haut, indispensable au-dessus de la tête. Les rhomboïdes tirent plutôt en rotation basse.",
    ],
    [
      "Où s’insèrent les rhomboïdes ?",
      "Sur le bord médial de l’omoplate",
      [
        "Sur l’angle supérieur seulement, comme l’élévateur",
        "Sur l’humérus, sillon intertuberculaire",
        "Sur le coracoïde",
      ],
      "Colonne → bord médial. Spécialistes de la rétraction.",
    ],
    [
      "Les rhomboïdes font surtout…",
      "Rétraction et rotation basse de l’omoplate",
      [
        "Protraction et rotation haute",
        "Élévation pure sans rétraction",
        "Extension du coude",
      ],
      "Tire vers les épineuses + rotation basse. Rotation haute = trapèze (sup+inf) et serratus.",
    ],
    [
      "L’élévateur de la scapula relie…",
      "Les cervicales à l’angle supérieur de l’omoplate",
      [
        "La colonne thoracique au bord médial, comme les rhomboïdes",
        "Les côtes au coracoïde",
        "L’humérus à l’olécrane",
      ],
      "C’est un hauban haut et médial, pas un rhomboïde.",
    ],
    [
      "Que fait l’élévateur de la scapula ?",
      "Il élève l’omoplate et la bascule",
      [
        "Il la rétracte surtout, comme le trapèze moyen",
        "Il l’abaisse, comme le trapèze inférieur",
        "Il la protracie, comme le serratus",
      ],
      "Élévation + bascule depuis l’angle supérieur. Ce n’est pas le muscle de la rétraction.",
    ],
    [
      "Pourquoi un tirage varié (rowing, face pulls, shrugs) est-il recommandé ici ?",
      "Pour entretenir tous les haubans, pas un seul",
      [
        "Parce que seul le trapèze supérieur compte",
        "Parce que les rhomboïdes ne travaillent jamais au rowing",
        "Parce que l’élévateur remplace le serratus",
      ],
      "Trois muscles, trois vecteurs. Un seul exercice fige l’omoplate dans un seul schéma.",
    ],
    [
      "La rotation haute de l’omoplate sert surtout…",
      "Les mouvements au-dessus de la tête",
      [
        "À enrouler l’épaule vers l’avant comme le petit pec",
        "À fléchir le tronc",
        "À étendre le coude",
      ],
      "Sans rotation haute (trap sup+inf, et plus tard serratus), l’overhead frotte.",
    ],
    [
      "Rétracter, c’est…",
      "Rapprocher l’omoplate de la colonne",
      [
        "L’avancer autour du thorax (protraction)",
        "L’élever en shrug uniquement",
        "La décoller en winging",
      ],
      "Trapèze moyen et rhomboïdes. La protraction, c’est le serratus.",
    ],
    [
      "Les rhomboïdes favorisent-ils la rotation haute ?",
      "Non : plutôt la rotation basse, avec la rétraction",
      [
        "Oui : c’est leur rôle overhead avec le trapèze inférieur",
        "Oui, exclusivement, sans rétraction",
        "Oui, ils remplacent le couple sup+inf du trapèze",
      ],
      "Rotation basse vs rotation haute : camps opposés sur l’omoplate.",
    ],
    [
      "Le trapèze n’a-t-il qu’une fonction unique ?",
      "Non : supérieur, moyen et inférieur diffèrent",
      [
        "Oui : seulement l’élévation",
        "Oui : seulement la rétraction",
        "Oui : seulement l’abaissement",
      ],
      "Trois directions de fibres, trois métiers — plus le couple de rotation haute.",
    ],
    [
      "Un shrug cible surtout…",
      "Les fibres supérieures du trapèze (élévation)",
      [
        "Les rhomboïdes en rotation haute",
        "Le trapèze inférieur exclusivement",
        "L’élévateur en protraction",
      ],
      "Élévation = trap sup (et un peu élévateur). Ce n’est pas tout le trapèze.",
    ],
    [
      "Un rowing bien exécuté nourrit surtout, côté omoplate…",
      "La rétraction : trapèze moyen et rhomboïdes",
      [
        "Uniquement l’élévation du trapèze supérieur",
        "La protraction du serratus à la place de la rétraction",
        "L’abaissement exclusif sans rapprochement",
      ],
      "Tirer les omoplates vers la ligne médiane = haubans postérieurs.",
    ],
    [
      "L’angle supérieur de l’omoplate est le point d’arrivée de…",
      "L’élévateur de la scapula",
      [
        "Des rhomboïdes, qui tapissent tout le bord médial",
        "Du petit pectoral",
        "Du grand dorsal au sillon",
      ],
      "Cervicales → angle supérieur. Les rhomboïdes tapissent le bord médial.",
    ],
    [
      "Trapèze inférieur versus rhomboïdes : opposition typique…",
      "Abaissement / rotation haute versus rétraction / rotation basse",
      [
        "Les deux ne font que l’élévation",
        "Les deux protracent l’omoplate",
        "Les deux s’insèrent sur l’humérus",
      ],
      "C’est l’équilibre de repos de l’omoplate — et le confort d’épaule.",
    ],
    [
      "Les rhomboïdes naissent vers la colonne et tirent…",
      "Le bord médial de l’omoplate vers les épineuses",
      [
        "L’humérus dans le sillon",
        "Les côtes vers le coracoïde",
        "L’olécrane en extension",
      ],
      "Hauban médial. Pas un muscle du bras.",
    ],
    [
      "Face pulls, dans cette leçon, servent à…",
      "Varier les tractions sur les haubans scapulaires (dont trapèze)",
      [
        "Remplacer tout travail de rhomboïdes par du curl",
        "Isoler uniquement le brachial",
        "Étendre le genou",
      ],
      "Un des exercices cités pour ne pas n’entraîner qu’un vecteur.",
    ],
    [
      "Si seul le trapèze supérieur travaille (shrugs à répétition), tu négliges surtout…",
      "Rétraction (moyen, rhomboïdes) et abaissement (inférieur)",
      [
        "L’élévation, déjà saturée",
        "Le biceps",
        "Le transverse abdominal exclusivement",
      ],
      "Un hauban hypertrophié, deux autres en sommeil : omoplate mal positionnée.",
    ],
    [
      "La position de repos de l’omoplate dépend de…",
      "L’équilibre entre trapèze, rhomboïdes et élévateur",
      [
        "Uniquement du biceps",
        "Uniquement de l’olécrane",
        "Uniquement du grand droit",
      ],
      "Trois tractions, un compromis. D’où le tirage varié.",
    ],
    [
      "L’élévateur bascule l’omoplate ; les rhomboïdes, eux…",
      "La rétractent et la tournent en bas",
      [
        "Font la même bascule depuis les côtes",
        "L’abaissent comme le trapèze inférieur uniquement",
        "Protractent avec le petit pec",
      ],
      "Vecteurs distincts : angle supérieur versus bord médial.",
    ],
    [
      "Pour l’overhead, le trapèze compte surtout par…",
      "Le couple supérieur + inférieur (rotation haute)",
      [
        "Les fibres moyennes seules",
        "L’élévateur, qui remplace ce couple",
        "Les rhomboïdes en rotation basse forcée",
      ],
      "Rotation haute = bras au-dessus de la tête. Rotation basse des rhomboïdes va à l’encontre.",
    ],
    [
      "Le trapèze moyen et les rhomboïdes se rejoignent sur…",
      "La rétraction de l’omoplate",
      [
        "L’élévation exclusive",
        "L’abaissement exclusif",
        "La protraction",
      ],
      "Deux chemins vers le rapprochement médial. L’élévateur, lui, élève et bascule.",
    ],
    [
      "« Pilotage par haubans » signifie que l’omoplate…",
      "Ne tient à la cage que par des muscles, aux vecteurs opposés",
      [
        "Est soudée au thorax par un os unique",
        "Est mue par le seul deltoïde",
        "S’insère sur l’ulna",
      ],
      "Pas d’emboîture osseuse cage-omoplate : tout est musculaire. D’où l’importance d’équilibrer les trois.",
    ],
  ]),

  // 7. Abdominaux profonds et obliques
  bank25([
    [
      "Dans quel sens courent les fibres du grand droit ?",
      "Verticalement, des côtes au pubis",
      [
        "Horizontalement, comme le transverse",
        "En « mains dans les poches », comme l’oblique externe",
        "En sens inverse des poches, comme l’oblique interne",
      ],
      "Vertical = flexion. Horizontal = transverse. Obliques = diagonales.",
    ],
    [
      "Où s’insère en bas le grand droit ?",
      "Sur le pubis",
      [
        "Sur l’olécrane",
        "Sur le coracoïde",
        "Sur le calcanéum",
      ],
      "Thorax / côtes → pubis. Les intersections tendineuses segmentent le ventre.",
    ],
    [
      "Que dessinent les intersections tendineuses du grand droit ?",
      "Les « carrés » ou tablettes",
      [
        "Le crease de l’aine uniquement",
        "La ligne du trapèze inférieur",
        "Le sillon intertuberculaire",
      ],
      "Ce sont elles qui segmentent le muscle, pas le transverse.",
    ],
    [
      "Quelle est la fonction principale du grand droit ?",
      "Fléchir le tronc",
      [
        "Comprimer sans mouvement, comme le transverse",
        "Tourner le tronc seul, sans les obliques",
        "Rétracter l’omoplate",
      ],
      "Crunch / flexion. La pression sans bouger, c’est le transverse ; la rotation, les obliques.",
    ],
    [
      "Les fibres de l’oblique externe descendent…",
      "Vers l’avant, dans le sens des mains dans les poches",
      [
        "En sens inverse des poches, comme l’interne",
        "À l’horizontale, comme le transverse",
        "À la verticale, comme le grand droit",
      ],
      "Externe = poches. Interne = inverse. C’est le croisement du couple rotateur.",
    ],
    [
      "Les fibres de l’oblique interne, par rapport à l’externe…",
      "Remontent en sens inverse",
      [
        "Sont identiques, « mains dans les poches »",
        "Sont strictement horizontales",
        "Sont strictement verticales",
      ],
      "Croisement en X : la paroi devient solide, et le couple peut tourner le tronc.",
    ],
    [
      "Le couple rotateur du tronc, c’est…",
      "L’oblique externe d’un côté + l’interne du côté opposé",
      [
        "Les deux externes du même côté seulement",
        "Le transverse seul",
        "Le grand droit des deux côtés, sans obliques",
      ],
      "Externe un côté, interne opposé. Pas le transverse, qui ne produit pas de mouvement.",
    ],
    [
      "Dans quel sens courent les fibres du transverse ?",
      "À l’horizontale, comme une ceinture",
      [
        "À la verticale, des côtes au pubis",
        "En diagonale « poches »",
        "En diagonale inverse, comme l’interne",
      ],
      "Horizontal = compression. Pas de flexion, pas de rotation.",
    ],
    [
      "Le transverse produit-il un mouvement de tronc ?",
      "Non : il comprime et augmente la pression intra-abdominale",
      [
        "Oui : il fléchit comme le grand droit",
        "Oui : il tourne comme les obliques",
        "Oui : il étend le rachis comme les spinaux",
      ],
      "Pas de mouvement. Métier : pressuriser (PIA).",
    ],
    [
      "Que signifie PIA ici ?",
      "Pression intra-abdominale",
      [
        "Pression intra-acromiale",
        "Pli ischio-abducteur",
        "Plan d’insertion de l’aponévrose seule",
      ],
      "Le transverse augmente cette pression : stabilité, pas crunch.",
    ],
    [
      "Le muscle le plus profond de cette paroi est…",
      "Le transverse",
      [
        "Le grand droit, car il est le plus visible",
        "L’oblique externe, en surface latérale",
        "L’oblique interne, plus superficiel que le transverse",
      ],
      "Trois couches : grand droit en surface médiane, obliques au milieu, transverse au fond.",
    ],
    [
      "Confondre transverse et grand droit, c’est confondre…",
      "Compression sans mouvement versus flexion du tronc",
      [
        "Rotation externe versus rotation interne d’épaule",
        "Deux insertions sur l’olécrane",
        "Petit rond et grand rond",
      ],
      "Même « abdos », métiers opposés. Les tablettes ne sont pas le transverse.",
    ],
    [
      "Un crunch cible surtout…",
      "Le grand droit (flexion)",
      [
        "Le transverse, qui fléchit encore plus",
        "Uniquement l’oblique externe des deux côtés sans flexion",
        "Le serratus",
      ],
      "Flexion = grand droit. Gainage de pression = transverse.",
    ],
    [
      "Un exercice de rotation de tronc implique surtout…",
      "Les obliques (couple externe / interne opposé)",
      [
        "Le transverse, moteur de la rotation",
        "Le grand droit uniquement, vertical",
        "Le trapèze inférieur",
      ],
      "Tourner = obliques. Le transverse stabilise, il ne tourne pas.",
    ],
    [
      "Pourquoi la paroi est-elle si solide ?",
      "Trois couches, trois directions de fibres qui se croisent",
      [
        "Une seule couche verticale, le grand droit",
        "Parce que le transverse fléchit plus fort que le grand droit",
        "Parce que les obliques s’insèrent sur l’humérus",
      ],
      "Tissage : vertical, diagonales opposées, horizontal.",
    ],
    [
      "Le grand droit est-il le muscle de la pression intra-abdominale « sans bouger » ?",
      "Non : ce rôle est celui du transverse",
      [
        "Oui : les intersections tendineuses pressurisent sans fléchir",
        "Oui : c’est sa seule fonction",
        "Oui, et les obliques ne tournent jamais",
      ],
      "Grand droit = fléchir. Transverse = ceinture de force.",
    ],
    [
      "L’oblique externe d’un côté travaille en rotation avec…",
      "L’oblique interne du côté opposé",
      [
        "L’oblique externe du même côté seulement, en isolation exclusive",
        "Le transverse du même bord uniquement, qui tourne",
        "Le grand droit opposé, qui est le vrai rotateur",
      ],
      "Couple croisé. Retenir la formule de la leçon.",
    ],
    [
      "Les « mains dans les poches » décrivent…",
      "La direction des fibres de l’oblique externe",
      [
        "Les fibres du transverse",
        "Les fibres du grand droit",
        "Les fibres de l’oblique interne",
      ],
      "Image mentale de l’externe. L’interne croise en sens inverse.",
    ],
    [
      "Un gainage complet, selon la leçon, entraîne…",
      "Les trois métiers : fléchir, tourner, pressuriser",
      [
        "Uniquement les tablettes du grand droit",
        "Uniquement le transverse, en oubliant les obliques",
        "Uniquement la rotation, sans pression",
      ],
      "Trois couches, trois directions, trois métiers.",
    ],
    [
      "Le transverse s’enroule…",
      "Comme une ceinture de force naturelle",
      [
        "Comme les intersections tendineuses du grand droit",
        "Comme les mains dans les poches",
        "Comme un chef du deltoïde",
      ],
      "Ceinture horizontale. Pas de carrés, pas de diagonale.",
    ],
    [
      "Concernant le transverse de l'abdomen, quelle affirmation est fausse ?",
      "Le transverse fléchit le tronc comme un crunch",
      [
        "Le grand droit fléchit le tronc",
        "Les obliques tournent le tronc",
        "Le transverse augmente la PIA",
      ],
      "C’est le piège classique : « abdos » ≠ seulement crunch.",
    ],
    [
      "Les intersections tendineuses appartiennent au…",
      "Grand droit",
      [
        "Transverse",
        "Oblique externe uniquement",
        "Serratus",
      ],
      "Tablettes = grand droit segmenté, pas le muscle profond horizontal.",
    ],
    [
      "L’oblique interne n’est pas « l’inverse du transverse », mais…",
      "L’inverse de l’oblique externe (diagonale opposée)",
      [
        "L’inverse du grand droit (il étend le tronc)",
        "Un synonyme du transverse",
        "Un chef du grand pec",
      ],
      "Deux obliques, deux diagonales. Le transverse n’est pas une diagonale.",
    ],
    [
      "Pressuriser sans produire de flexion ni de rotation, c’est le cahier des charges…",
      "Du transverse",
      [
        "Du grand droit",
        "De l’oblique externe",
        "De l’oblique interne",
      ],
      "Le plus profond, le moins « mouvement ».",
    ],
    [
      "Si tu ne fais que des crunchs, tu entraînes surtout…",
      "Le grand droit, pas le transverse ni le couple rotateur",
      [
        "Automatiquement les trois couches à parts égales",
        "Le transverse plus que le grand droit",
        "Uniquement les obliques, car le grand droit ne fléchit pas",
      ],
      "Un métier sur trois. La leçon demande les trois.",
    ],
  ]),

  // 8. Serratus antérieur et stabilité scapulaire
  bank25([
    [
      "D’où naît le serratus (dentelé) antérieur ?",
      "Sur les faces latérales des huit ou neuf premières côtes",
      [
        "Sur le processus coracoïde",
        "Sur l’olécrane",
        "Sur les cervicales, comme l’élévateur",
      ],
      "Origine costale en dents de scie. Pas le coracoïde (petit pec).",
    ],
    [
      "Où s’accroche le serratus sur l’omoplate ?",
      "Au bord médial, par sa face profonde",
      [
        "À la tubérosité deltoïdienne",
        "Au sillon intertuberculaire",
        "À l’angle supérieur seulement, comme l’élévateur",
      ],
      "Face profonde du bord médial : position idéale pour plaquer l’omoplate.",
    ],
    [
      "Plaquer l’omoplate contre la cage, c’est le métier du…",
      "Serratus antérieur",
      [
        "Petit pectoral, qui plaque aussi vers l’arrière",
        "Grand dorsal via le sillon",
        "Brachial",
      ],
      "Serratus = coller la scapula. Le petit pec, lui, tire plutôt avant et bas.",
    ],
    [
      "Quelle action scapulaire principale le serratus produit-il, outre le plaquage ?",
      "La protraction (avancer l’omoplate autour du thorax)",
      [
        "La rétraction, comme les rhomboïdes",
        "L’élévation exclusive, comme le trapèze supérieur",
        "La rotation basse exclusive, comme les rhomboïdes",
      ],
      "Protraction ≠ rétraction. Les rhomboïdes font l’inverse.",
    ],
    [
      "Avec le trapèze, le serratus forme le couple de…",
      "Rotation haute de l’omoplate",
      [
        "Rotation basse seulement",
        "Flexion de coude",
        "Rotation interne de l’humérus",
      ],
      "Couple indispensable au développé militaire et à tout overhead.",
    ],
    [
      "Une faiblesse du serratus se manifeste souvent par…",
      "Un winging : omoplate ailée qui décolle",
      [
        "Une hypertrophie obligatoire du deltoïde",
        "Une insertion nouvelle sur l’humérus",
        "Une impossibilité de fléchir le coude",
      ],
      "Bord interne qui se lève comme une aile = dentelé qui dort.",
    ],
    [
      "Le test simple de la leçon : en pompe, si le bord interne décolle…",
      "Le dentelé antérieur est trop faible",
      [
        "Les rhomboïdes sont trop forts en protraction",
        "Le biceps a pris le relais scapulaire",
        "Le transverse a lâché l’omoplate",
      ],
      "Winging = serratus. Pas un problème de fléchisseurs de coude.",
    ],
    [
      "Un push-up plus, c’est…",
      "Une pompe avec une poussée supplémentaire des omoplates en fin de mouvement",
      [
        "Une pompe où l’on rétracte au maximum, comme un rowing",
        "Une extension nuque pour le chef long",
        "Un curl marteau",
      ],
      "Aller plus loin que les bras tendus : protraction active = réveil du serratus.",
    ],
    [
      "Pour réveiller le serratus au-dessus de la tête, la leçon insiste sur…",
      "Une omoplate qui suit librement le bras",
      [
        "Bloquer l’omoplate en rétraction maximale pendant tout le militaire",
        "Éliminer toute rotation haute",
        "Remplacer le mouvement par un curl",
      ],
      "Overhead + scapula libre = le couple serratus / trapèze peut tourner l’omoplate.",
    ],
    [
      "Le serratus s’insère-t-il sur l’humérus, comme le deltoïde ?",
      "Non : insertion sur l’omoplate (bord médial profond)",
      [
        "Oui : tubérosité deltoïdienne",
        "Oui : sillon intertuberculaire",
        "Oui : olécrane",
      ],
      "Muscle de l’omoplate, pas du bras. D’où son effet sur le winging, pas sur le coude.",
    ],
    [
      "Protraction, c’est l’inverse de…",
      "La rétraction des rhomboïdes / trapèze moyen",
      [
        "L’élévation du trapèze supérieur uniquement",
        "La flexion du grand droit",
        "L’extension du triceps",
      ],
      "Avancer autour du thorax versus ramener vers la colonne.",
    ],
    [
      "Pourquoi le bord médial, en face profonde, est-il une insertion « idéale » ?",
      "Pour plaquer l’omoplate et l’enrouler autour des côtes",
      [
        "Pour adducter l’humérus comme le dorsal",
        "Pour fléchir le coude",
        "Pour tendre l’olécrane",
      ],
      "Le muscle tire l’omoplate contre la cage depuis le dessous du bord spinal.",
    ],
    [
      "Le winging dégrade surtout…",
      "Toute la mécanique d’épaule (scapula instable)",
      [
        "Uniquement la supination du biceps",
        "Uniquement la PIA",
        "Uniquement l’extension des orteils",
      ],
      "Sans omoplate collée et qui tourne, deltoïde et développé trinquent.",
    ],
    [
      "Serratus + trapèze (sup+inf) : le point commun overhead, c’est…",
      "La rotation haute",
      [
        "La rotation basse des rhomboïdes",
        "L’enroulement avant du petit pec",
        "L’adduction du grand rond",
      ],
      "Deux leçons, un couple : dentelé et trapèze font monter la glène.",
    ],
    [
      "Le petit pectoral tire l’omoplate en avant et en bas ; le serratus, lui…",
      "Plaque et protracie, et aide la rotation haute avec le trapèze",
      [
        "Fait exactement la même chose, ce sont synonymes",
        "Rétracte et tourne en bas, comme les rhomboïdes",
        "S’insère sur l’humérus pour adducter",
      ],
      "Tous deux « vers l’avant », mais pas le même métier : enroulement bas versus plaquage / rotation haute.",
    ],
    [
      "Les rhomboïdes et le serratus s’attachent tous deux près du bord médial, mais…",
      "L’un rétracte, l’autre protracie et plaque",
      [
        "Ils ont la même action de rétraction",
        "Ils s’insèrent tous deux sur l’humérus",
        "Ils fléchissent tous deux le tronc",
      ],
      "Même frontière osseuse, vecteurs opposés.",
    ],
    [
      "Huit ou neuf premières côtes : cela décrit…",
      "L’origine du serratus",
      [
        "L’origine du petit pec exclusivement, qui va au bord médial",
        "L’insertion du grand droit sur le pubis",
        "L’origine du chef long du triceps",
      ],
      "Dentelé = côtes latérales. Petit pec = aussi des côtes, mais vers le coracoïde.",
    ],
    [
      "Quelle affirmation est fausse ?",
      "Le serratus s’insère sur l’humérus et adducte le bras",
      [
        "Le serratus plaque l’omoplate",
        "Sa faiblesse donne un winging",
        "Il contribue à la protraction et à la rotation haute",
      ],
      "Pas un muscle du bras. C’est un muscle de la scapula.",
    ],
    [
      "En développé militaire, si l’omoplate ne tourne pas vers le haut…",
      "Le couple serratus / trapèze ne fait pas son travail",
      [
        "Le brachial compensera en supinant",
        "Le transverse tournera l’omoplate",
        "Le petit rond adductera la scapula",
      ],
      "Rotation haute = dentelé + trapèze, pas les fléchisseurs de coude.",
    ],
    [
      "Le nom « dentelé » vient…",
      "De naissances en dents de scie sur les côtes",
      [
        "De son insertion en dents sur l’olécrane",
        "Des intersections tendineuses du grand droit",
        "Des trois chefs du deltoïde",
      ],
      "Aspect costal dentelé, pas un muscle abdominal.",
    ],
    [
      "Coller l’omoplate n’est pas le rôle du grand dorsal au sillon, mais du…",
      "Serratus sur la face profonde du bord médial",
      [
        "Biceps sur le radius",
        "Chef médial du triceps",
        "Grand droit sur le pubis",
      ],
      "Stabilité scapulo-thoracique = dentelé (entre autres haubans).",
    ],
    [
      "Un rowing (rétraction) ne remplace pas le push-up plus, parce que…",
      "Rétraction et protraction sont des vecteurs opposés",
      [
        "Les deux ne font que de la protraction",
        "Le serratus est le muscle principal du rowing",
        "Les rhomboïdes font le winging",
      ],
      "Il faut aussi pousser l’omoplate autour du thorax, pas seulement la ramener.",
    ],
    [
      "Si tu bloques l’omoplate pendant tout un overhead, tu prives surtout…",
      "Le serratus (et le trapèze) de la rotation haute",
      [
        "Le brachial de la flexion",
        "Le transverse de la PIA uniquement",
        "Le biceps de la tubérosité radiale",
      ],
      "La leçon : omoplate qui suit librement le bras.",
    ],
    [
      "Le winging se voit surtout par…",
      "Le bord interne de l’omoplate qui se soulève",
      [
        "Un olécrane trop saillant au repos",
        "Des tablettes abdominales trop marquées",
        "Une supination impossible",
      ],
      "Petite aile = bord médial qui décolle. Diagnostic visuel du dentelé faible.",
    ],
    [
      "En une phrase, le serratus…",
      "Naît des côtes, plaque et protracie l’omoplate, tourne vers le haut avec le trapèze",
      [
        "Naît de l’omoplate, s’insère sur l’humérus et adducte comme le dorsal",
        "Fléchit le tronc et augmente seulement la PIA",
        "Est un rotateur externe de la coiffe, comme le petit rond",
      ],
      "Côtes → bord médial profond : plaquage, protraction, rotation haute. Pas un muscle du bras ni un abdominal.",
    ],
  ]),
];
