import { bank25 } from "./qcm-bank";
import type { SeedQuestion } from "../anatomie-quiz-helpers";

export const THEME_1_QUIZZES: SeedQuestion[][] = [
  // 1. Les bras
  bank25([
    [
      "Pour de gros bras, où se trouve surtout la majorité du volume ?",
      "Derrière, du côté du triceps",
      [
        "Devant, uniquement dans le biceps",
        "Dans le deltoïde moyen",
        "Dans le grand pectoral",
      ],
      "On pense souvent biceps, mais le volume du bras vient surtout de l’arrière : le triceps occupe toute la face postérieure.",
    ],
    [
      "Combien de chefs compose le triceps ?",
      "Trois",
      ["Un seul", "Deux", "Quatre"],
      "Le triceps a trois chefs ; d’où son nom. Ils occupent ensemble la face arrière du bras.",
    ],
    [
      "Quelle est la fonction principale du triceps ?",
      "Tendre le coude",
      [
        "Fléchir le coude",
        "Tourner la paume vers le haut",
        "Rapprocher les omoplates",
      ],
      "Le triceps étend le coude. C’est le moteur des dips, du développé serré et des extensions.",
    ],
    [
      "Parmi ces exercices, lesquels ciblent surtout le triceps ?",
      "Dips, développé serré et extensions",
      [
        "Curl classique paume vers le haut",
        "Curl marteau uniquement",
        "Tractions et tirage vertical",
      ],
      "Dips, développé serré et extensions étendent le coude sous charge : c’est le triceps qui remplit la manche.",
    ],
    [
      "Quel muscle forme le galbe visible à l’avant du bras ?",
      "Le biceps",
      ["Le triceps", "Le brachial seul", "Le dentelé antérieur"],
      "Devant, le biceps dessine le galbe. Le triceps est derrière ; le brachial reste caché sous le biceps.",
    ],
    [
      "Outre la flexion du coude, que fait aussi le biceps ?",
      "Il tourne la paume vers le haut (supination)",
      [
        "Il tend uniquement le coude",
        "Il plaque l’omoplate contre les côtes",
        "Il élève l’épaule comme un shrug",
      ],
      "Le biceps plie le coude et oriente la paume vers le haut : la supination. D’où l’intérêt du curl paume haute.",
    ],
    [
      "Pourquoi le curl classique, paume vers le haut, sollicite-t-il autant le biceps ?",
      "Parce qu’il combine flexion du coude et supination",
      [
        "Parce qu’il tend le coude comme un dip",
        "Parce qu’il rétracte les omoplates",
        "Parce que le brachial ne peut plus travailler",
      ],
      "Paume vers le haut = supination + flexion. Le biceps, qui fait les deux, est alors pleinement sollicité.",
    ],
    [
      "Où se situe le brachial par rapport au biceps ?",
      "Sous le biceps",
      [
        "Derrière le triceps",
        "Sur la face externe de l’épaule",
        "Le long de la colonne",
      ],
      "Le brachial est caché sous le biceps. On le voit moins, mais il compte pour la flexion du coude.",
    ],
    [
      "Que fait le brachial, quelle que soit la prise ?",
      "Il fléchit uniquement le coude",
      [
        "Il tend le coude et tourne la paume vers le haut",
        "Il tourne seulement la paume",
        "Il tire le bras vers le bas comme un dorsal",
      ],
      "Contrairement au biceps, le brachial ne fait que fléchir le coude — prise pronation, supination ou neutre.",
    ],
    [
      "En curl marteau (prise neutre), quels muscles prennent une grande part du travail ?",
      "Le brachial et le brachio-radial",
      [
        "Le triceps et le grand pectoral",
        "Le deltoïde postérieur seul",
        "Les rhomboïdes",
      ],
      "Prise neutre : le brachial (sous le biceps) et le brachio-radial de l’avant-bras portent une grande part de la flexion.",
    ],
    [
      "Le brachio-radial appartient surtout à quelle région ?",
      "L’avant-bras",
      ["La face arrière du bras", "Le bas du dos", "Le cou"],
      "Le brachio-radial est un muscle de l’avant-bras. En curl marteau, il aide le brachial à fléchir le coude.",
    ],
    [
      "Un bras « complet » se construit sur quels fronts ?",
      "Triceps derrière, biceps devant, brachial et avant-bras en soutien",
      [
        "Uniquement le biceps en curls lourds",
        "Uniquement les dips, sans travail avant",
        "Pectoraux et trapèze seulement",
      ],
      "Volume arrière (triceps), galbe avant (biceps), puis brachial et avant-bras : les trois fronts comptent.",
    ],
    [
      "Si tu veux surtout remplir la manche à l’arrière, tu priorises…",
      "Le triceps (dips, développé serré, extensions)",
      [
        "Le biceps en curl paume haute uniquement",
        "Le brachial en isolation exclusive",
        "Les rhomboïdes au rowing",
      ],
      "C’est le triceps qui occupe la face arrière et apporte la majorité du volume. Les exercices d’extension le ciblent.",
    ],
    [
      "Quelle distinction est juste entre biceps et brachial ?",
      "Le biceps fléchit et fait la supination ; le brachial ne fait que fléchir",
      [
        "Le brachial tend le coude ; le biceps le fléchit",
        "Les deux tendent le coude",
        "Le biceps est derrière, le brachial devant",
      ],
      "Même articulation (coude), rôles différents : le biceps ajoute la supination ; le brachial reste un fléchisseur pur.",
    ],
    [
      "Pourquoi un curl paume haute n’est-il pas le meilleur choix si tu veux surtout le brachial ?",
      "Cette prise met le biceps (flexion + supination) en avant",
      [
        "Cette prise tend le coude et isole le triceps",
        "Le brachial ne peut pas fléchir en prise haute",
        "Le brachio-radial bloque alors le coude",
      ],
      "Paume haute = supination, donc biceps. Pour brachial et brachio-radial, la leçon pointe le curl marteau, prise neutre.",
    ],
    [
      "Tu sens surtout l’arrière du bras sur des dips. Quel muscle travaille principalement ?",
      "Le triceps, qui tend le coude",
      [
        "Le biceps, qui fléchit le coude",
        "Le brachial sous le biceps",
        "Le dentelé qui plaque l’omoplate",
      ],
      "Les dips sont un exercice d’extension du coude : c’est le rôle du triceps.",
    ],
    [
      "Quelle affirmation décrit le mieux le triceps ?",
      "Trois chefs, face arrière, tend le coude",
      [
        "Un chef, face avant, fléchit le coude",
        "Deux chefs, sous le biceps, oriente la paume",
        "Muscle de l’avant-bras qui serre les doigts",
      ],
      "Mémo de la leçon : trois chefs, toute la face arrière, fonction = tendre le coude.",
    ],
    [
      "Le curl classique sollicite le biceps « à fond » surtout grâce à…",
      "La paume tournée vers le haut",
      [
        "La prise neutre exclusive",
        "L’extension complète du coude sans charge",
        "La rétraction des omoplates",
      ],
      "Paume vers le haut = supination, que le biceps réalise en plus de la flexion. C’est pour ça que le curl classique le charge.",
    ],
    [
      "Quel muscle du bras est le plus discret visuellement parmi ceux cités ?",
      "Le brachial, caché sous le biceps",
      [
        "Le biceps, galbe avant",
        "Le triceps, toute la face arrière",
        "Le deltoïde moyen",
      ],
      "Le biceps se voit, le triceps aussi à l’arrière. Le brachial reste sous le biceps : discret, mais utile à la flexion.",
    ],
    [
      "Si la prise change et que le coude fléchit encore, quel muscle continue de faire le même travail ?",
      "Le brachial",
      [
        "Le biceps, plus marqué avec la supination",
        "Le triceps, qui tend le coude",
        "Le grand pectoral",
      ],
      "Le brachial fléchit le coude quelle que soit la prise. Le biceps, lui, est plus marqué quand il y a aussi supination.",
    ],
    [
      "Quelle paire exercice / cible correspond à la leçon ?",
      "Extensions de coude → triceps",
      [
        "Dips → biceps",
        "Curl paume haute → triceps",
        "Curl marteau → grand dorsal",
      ],
      "Extensions, dips et développé serré = triceps. Curl paume haute = biceps. Marteau = brachial et brachio-radial.",
    ],
    [
      "Pourquoi ne pas juger le volume du bras au seul biceps ?",
      "Parce que le triceps forme souvent la majeure partie du volume",
      [
        "Parce que le biceps n’a aucun rôle de flexion",
        "Parce que seul l’avant-bras donne le volume",
        "Parce que le deltoïde remplace le triceps",
      ],
      "Réflexe fréquent : « gros bras = biceps ». La leçon inverse : la majorité du volume est derrière, côté triceps.",
    ],
    [
      "Quel rôle de soutien jouent brachial et avant-bras dans un bras complet ?",
      "Ils complètent le couple biceps / triceps",
      [
        "Ils remplacent entièrement le triceps",
        "Ils tendent le coude à la place du biceps",
        "Ils plaquent l’omoplate comme le dentelé",
      ],
      "La leçon ferme sur trois fronts : triceps derrière, biceps devant, brachial et avant-bras en soutien.",
    ],
    [
      "Le développé serré est cité avec les dips et les extensions parce qu’il…",
      "Fait surtout tendre le coude, donc le triceps",
      [
        "Isole le biceps en supination",
        "Travaille surtout le brachial en prise neutre",
        "Rétracte les omoplates comme un rowing",
      ],
      "Même logique que dips et extensions : extension du coude sous charge = triceps.",
    ],
    [
      "Quelle phrase résume le mieux cette leçon ?",
      "Volume surtout triceps ; biceps pour le galbe et la supination ; marteau pour brachial et brachio-radial",
      [
        "Seul le biceps compte pour le volume et la flexion",
        "Le triceps fléchit le coude, le biceps le tend",
        "Le brachial se voit plus que le biceps",
      ],
      "Trois fronts : arrière (triceps, 3 chefs, extension), avant (biceps, flexion + supination), soutien (brachial + avant-bras, curl marteau).",
    ],
  ]),

  // 2. Pectoraux et épaules
  bank25([
    [
      "Lors d’un développé couché, qui travaille ?",
      "Toute une équipe de poussée, pas seulement le pectoral",
      [
        "Uniquement le grand pectoral",
        "Uniquement le biceps",
        "Uniquement les rhomboïdes",
      ],
      "Le pec n’est pas seul : deltoïdes, dentelé et stabilité des omoplates font partie de la poussée.",
    ],
    [
      "D’où part le grand pectoral, ce large éventail du torse ?",
      "Du sternum et de la clavicule",
      [
        "Du bas du dos uniquement",
        "De la mastoïde",
        "De l’épicondyle latéral",
      ],
      "Le grand pec s’ancre sur le sternum et la clavicule, puis se termine sur l’humérus.",
    ],
    [
      "Sur quel os le grand pectoral se termine-t-il ?",
      "L’humérus",
      ["Le fémur", "Le radius seul", "Le sacrum"],
      "En s’insérant sur l’humérus, le grand pec tire ce levier et ramène le bras devant le corps.",
    ],
    [
      "Quel mouvement le grand pectoral produit-il surtout ?",
      "Il ramène le bras devant le corps",
      [
        "Il tend le coude",
        "Il rétracte les omoplates",
        "Il fléchit le tronc comme un crunch",
      ],
      "Tirer sur l’humérus ramène le bras en avant : moteur de la poussée horizontale.",
    ],
    [
      "Le développé couché et les écartés illustrent surtout…",
      "La poussée horizontale du grand pectoral",
      [
        "Le tirage vertical du grand dorsal",
        "La flexion du coude du biceps",
        "L’élévation d’épaule des shrugs",
      ],
      "Couché et écartés = bras ramené devant, dans le plan horizontal : rôle du grand pec.",
    ],
    [
      "Combien de chefs a le deltoïde ?",
      "Trois : antérieur, moyen et postérieur",
      ["Un seul faisceau", "Deux chefs seulement", "Cinq chefs"],
      "Le deltoïde coiffe l’épaule avec trois chefs. Chacun oriente le bras dans une direction.",
    ],
    [
      "Que fait surtout le chef antérieur du deltoïde ?",
      "Il lève le bras devant",
      [
        "Il lève le bras sur le côté",
        "Il tire le bras vers l’arrière",
        "Il tend le coude",
      ],
      "Antérieur = devant. Moyen = côté. Postérieur = arrière.",
    ],
    [
      "Que fait surtout le chef moyen du deltoïde ?",
      "Il lève le bras sur le côté",
      [
        "Il ramène uniquement le bras contre le sternum",
        "Il plaque l’omoplate et l’avance",
        "Il fléchit le tronc",
      ],
      "Le chef moyen élève le bras latéralement. Les élévations latérales en exploitent le travail.",
    ],
    [
      "Que fait surtout le chef postérieur du deltoïde ?",
      "Il lève le bras vers l’arrière",
      [
        "Il pousse horizontalement comme le pec seul",
        "Il serre les doigts",
        "Il augmente la pression intra-abdominale",
      ],
      "Le postérieur oriente le bras en arrière. Il équilibre, avec les autres chefs, le travail d’épaule.",
    ],
    [
      "Quels exercices se partagent surtout le travail du deltoïde, selon la leçon ?",
      "Développé militaire et élévations latérales",
      [
        "Dips et curl marteau",
        "Crunchs et relevés de jambes",
        "Farmer walk uniquement",
      ],
      "Militaire (épaule, surtout antérieur) et latérales (chef moyen) couvrent une grande part du deltoïde.",
    ],
    [
      "Quel muscle plaque l’omoplate contre les côtes et l’avance autour du thorax ?",
      "Le dentelé antérieur",
      ["Le grand pectoral", "Le deltoïde postérieur", "Le transverse"],
      "Plus discret que pec et deltoïde, le dentelé plaque et avance l’omoplate. Sans lui, la poussée overhead est instable.",
    ],
    [
      "Sans dentelé antérieur efficace, que manque-t-il surtout ?",
      "Une poussée stable au-dessus de la tête",
      [
        "La flexion du coude en curl",
        "La largeur du dos en traction",
        "Le six-pack",
      ],
      "Le dentelé stabilise et avance l’omoplate : indispensable pour pousser au-dessus de la tête de façon stable.",
    ],
    [
      "Quelle est la consigne classique au développé couché, d’après la leçon ?",
      "Fixer d’abord les omoplates, puis laisser pectoraux et deltoïdes pousser",
      [
        "Arrondir le dos et pousser seulement avec les biceps",
        "Hausser les épaules dès le départ",
        "Laisser l’omoplate flotter sans la plaquer",
      ],
      "Stabilité scapulaire d’abord, descente contrôlée, puis pecs et deltoïdes poussent.",
    ],
    [
      "Au couché, après avoir fixé les omoplates, que fais-tu de la barre ?",
      "Tu la descends sous contrôle, puis pecs et deltoïdes poussent",
      [
        "Tu la laisses chuter pour rebondir",
        "Tu tires verticalement comme une traction",
        "Tu fléchis le tronc comme un crunch",
      ],
      "Ordre de la leçon : omoplates fixées → descente contrôlée → poussée pecs + deltoïdes.",
    ],
    [
      "Quelle distinction est juste entre grand pec et deltoïde ?",
      "Le pec ramène le bras devant (poussée horizontale) ; le deltoïde oriente le bras devant, côté ou arrière",
      [
        "Le pec a trois chefs ; le deltoïde n’en a qu’un",
        "Le deltoïde part du sternum ; le pec coiffe l’épaule",
        "Les deux ne servent qu’à tendre le coude",
      ],
      "Même équipe de poussée, rôles différents : pec = levier sur l’humérus vers le torse ; deltoïde = trois directions d’élévation.",
    ],
    [
      "Pourquoi parler d’« équipe de poussée » plutôt que de pec isolé ?",
      "Parce que deltoïdes et dentelé participent avec le grand pectoral",
      [
        "Parce que le biceps tend le coude à leur place",
        "Parce que les rhomboïdes poussent la barre",
        "Parce que le transverse ramène le bras",
      ],
      "Couché : pec moteur horizontal, deltoïdes pour l’épaule, dentelé pour l’omoplate. Ce n’est pas un seul muscle.",
    ],
    [
      "Le grand pectoral tire sur l’humérus. Quel effet concret ça produit ?",
      "Le bras est ramené devant le corps",
      [
        "L’omoplate se rétracte vers la colonne",
        "Le coude se tend uniquement",
        "La tête tourne vers le côté opposé",
      ],
      "Sternum + clavicule → humérus : en tirant ce levier, le pec amène le bras en avant.",
    ],
    [
      "Les élévations latérales ciblent surtout…",
      "Le chef moyen du deltoïde (bras sur le côté)",
      [
        "Le grand pectoral en poussée horizontale",
        "Le dentelé qui avance l’omoplate",
        "Le triceps qui tend le coude",
      ],
      "Lever le bras sur le côté = chef moyen. La leçon associe les latérales au travail du deltoïde.",
    ],
    [
      "Quelle insertion distingue le grand pec du dentelé ?",
      "Le pec se termine sur l’humérus ; le dentelé agit sur l’omoplate",
      [
        "Les deux s’insèrent sur la mastoïde",
        "Le dentelé se termine sur l’humérus, le pec sur les côtes seulement",
        "Aucun des deux ne touche l’épaule",
      ],
      "Pec = sternum/clavicule → humérus (bras). Dentelé = plaque et avance l’omoplate autour du thorax.",
    ],
    [
      "Tu démarres un couché sans fixer les omoplates. Que négliges-tu ?",
      "La base de stabilité avant que pecs et deltoïdes poussent",
      [
        "La supination du biceps",
        "La flexion du grand droit",
        "Le tennis elbow des extenseurs",
      ],
      "La consigne : fixer d’abord les omoplates. Sans ça, la poussée pecs + deltoïdes part d’une base instable.",
    ],
    [
      "Le développé militaire est cité avec les élévations latérales pour…",
      "Partager le travail des différents chefs du deltoïde",
      [
        "Isoler uniquement le grand pectoral au couché",
        "Remplacer le dentelé",
        "Tendre le coude comme des extensions",
      ],
      "Militaire et latérales se partagent le deltoïde : orientation du bras devant / côté, selon le chef.",
    ],
    [
      "Quel muscle est le plus discret de cette équipe de poussée ?",
      "Le dentelé antérieur",
      ["Le grand pectoral", "Le deltoïde", "Le biceps"],
      "Pec et deltoïde se voient. Le dentelé, plus discret, plaque et avance l’omoplate — crucial en overhead.",
    ],
    [
      "« Poussée horizontale » désigne surtout…",
      "Le développé couché et les écartés, moteur grand pectoral",
      [
        "Les tractions et le tirage vertical",
        "Les shrugs du trapèze supérieur",
        "Les crunchs du grand droit",
      ],
      "Horizontale = bras ramené devant, plan du couché et des écartés. Vertical overhead, c’est une autre logique (épaule + dentelé).",
    ],
    [
      "Quelle phrase relie correctement omoplate et poussée ?",
      "Omoplates fixées d’abord, puis pectoraux et deltoïdes poussent",
      [
        "Omoplates libres, seul le biceps pousse",
        "On avance l’omoplate avec le pec uniquement",
        "Le dentelé tend le coude pour pousser",
      ],
      "Stabilité scapulaire (fixation, rôle du dentelé en overhead) puis moteurs de poussée : pecs et deltoïdes.",
    ],
    [
      "Quelle synthèse est fidèle à la leçon ?",
      "Pec : sternum + clavicule → humérus, poussée horizontale ; deltoïde 3 chefs ; dentelé plaque et avance l’omoplate",
      [
        "Seul le pec pousse ; le deltoïde n’a qu’un chef ; le dentelé fléchit le coude",
        "Le pec part du bas du dos ; le deltoïde serre les doigts",
        "Couché : on pousse d’abord, on fixe les omoplates ensuite",
      ],
      "Équipe de poussée : pec (horizontal), deltoïde (devant/côté/arrière), dentelé (omoplate). Au couché : fixer, descendre, pousser.",
    ],
  ]),

  // 3. Tronc et abdominaux
  bank25([
    [
      "Sous une barre lourde, à quoi servent d’abord les abdos ?",
      "À empêcher le tronc de plier",
      [
        "Uniquement à dessiner un six-pack",
        "À tendre le coude",
        "À rétracter les omoplates",
      ],
      "Les abdos ne sont pas d’abord esthétiques : ils rigidifient le tronc pour qu’il ne s’effondre pas sous charge.",
    ],
    [
      "Quel muscle des « tablettes » fléchit le tronc ?",
      "Le grand droit",
      ["Le transverse", "Le deltoïde moyen", "Le triceps"],
      "Le grand droit rapproche les côtes du bassin : c’est la flexion du tronc, celle des crunchs et relevés de jambes.",
    ],
    [
      "Que fait concrètement le grand droit ?",
      "Il rapproche les côtes du bassin",
      [
        "Il plaque l’omoplate contre les côtes",
        "Il tend le coude",
        "Il élève l’épaule",
      ],
      "Rapprocher côtes et bassin = fléchir le tronc. C’est le muscle des tablettes, pas la ceinture profonde.",
    ],
    [
      "Quels exercices ciblent directement le grand droit ?",
      "Crunchs et relevés de jambes",
      [
        "Farmer walk unilatéral surtout",
        "Dips et développé serré",
        "Face pulls et oiseau",
      ],
      "Flexion de tronc : crunchs et relevés de jambes mettent le grand droit en avant.",
    ],
    [
      "Sur les côtés du tronc, quels muscles gèrent rotation et inclinaison ?",
      "L’oblique externe et l’oblique interne",
      [
        "Le grand droit uniquement",
        "Le transverse uniquement",
        "Les érecteurs uniquement",
      ],
      "Les deux obliques (externe et interne) orientent le buste en rotation et en inclinaison.",
    ],
    [
      "Les obliques résistent aussi quand…",
      "Une charge essaie de te faire pivoter",
      [
        "Tu tends seulement le coude",
        "Tu supines la main",
        "Tu hausses les épaules",
      ],
      "Anti-rotation : ils freinent la torsion. Le portage d’un haltère d’un seul côté en est l’exemple de la leçon.",
    ],
    [
      "Quel exercice illustre la résistance anti-rotation des obliques ?",
      "Le portage d’un haltère d’un seul côté (farmer unilatéral)",
      [
        "Le curl paume haute",
        "Les extensions de triceps",
        "Les élévations latérales",
      ],
      "Une charge d’un seul côté veut te faire pivoter. Les obliques résistent : c’est l’anti-rotation.",
    ],
    [
      "Quel muscle du tronc est décrit comme le plus important, tout en étant invisible ?",
      "Le transverse",
      ["Le grand droit", "L’oblique externe", "Le deltoïde antérieur"],
      "Le transverse est une ceinture profonde. On ne le voit pas comme un six-pack, mais il rigidifie le tronc.",
    ],
    [
      "Que fait le transverse quand tu inspires et gaines ?",
      "Il augmente la pression intra-abdominale",
      [
        "Il fléchit le tronc comme un crunch",
        "Il dessine les tablettes",
        "Il tire le bras vers le bas",
      ],
      "Ceinture autour du ventre : inspiration + gainage = plus de pression intra-abdominale, tronc plus rigide.",
    ],
    [
      "Le transverse dessine-t-il le six-pack ?",
      "Non : il rigidifie le tronc, il ne dessine pas le six-pack",
      [
        "Oui : c’est lui les tablettes",
        "Oui, uniquement s’il tourne le buste",
        "Oui, c’est le même muscle que le grand droit",
      ],
      "Six-pack = grand droit visible. Transverse = ceinture profonde, pression, stabilité — pas l’esthétique des tablettes.",
    ],
    [
      "Au squat ou au soulevé de terre, qu’est-ce qui soutient surtout la colonne ?",
      "La pression intra-abdominale, bien plus que des crunchs",
      [
        "Uniquement les crunchs de la veille",
        "La supination du biceps",
        "Les écartés pectoraux",
      ],
      "Sous barre, c’est la pression (transverse, gainage) qui tient. Les crunchs fléchissent ; ils ne remplacent pas cette tenue.",
    ],
    [
      "Comment se juge un tronc solide, selon la leçon ?",
      "À ce qu’il tient, pas à ce qu’il montre",
      [
        "Uniquement au relief des tablettes",
        "Au volume du triceps",
        "À la largeur du grand dorsal",
      ],
      "Esthétique ≠ fonction. Un tronc utile est celui qui ne plie pas sous charge.",
    ],
    [
      "Quelle distinction est juste entre grand droit et transverse ?",
      "Le grand droit fléchit (tablettes) ; le transverse ceinture et presse",
      [
        "Le transverse fléchit le tronc ; le grand droit est invisible",
        "Les deux dessinent le six-pack de la même façon",
        "Le grand droit augmente seul la pression, le transverse tourne",
      ],
      "Flexion visible vs ceinture profonde. On les confond souvent ; leurs rôles ne se recouvrent pas.",
    ],
    [
      "Quelle distinction est juste entre obliques et grand droit ?",
      "Obliques : rotation, inclinaison, anti-rotation ; grand droit : flexion (côtes-bassin)",
      [
        "Le grand droit tourne le buste ; les obliques font les tablettes",
        "Les deux ne font que la pression intra-abdominale",
        "Les obliques tendent le coude",
      ],
      "Même « bloc abdos », actions différentes : plier vers l’avant vs tourner, pencher, résister à la torsion.",
    ],
    [
      "Pourquoi des crunchs ne préparent-ils pas à eux seuls un squat lourd ?",
      "Parce que sous barre, c’est la pression qui soutient, pas la flexion répétée",
      [
        "Parce que le grand droit n’existe pas au squat",
        "Parce que les obliques fléchissent le coude",
        "Parce que le transverse dessine alors le six-pack",
      ],
      "Crunchs = fléchir. Squat/DL = ne pas plier. La leçon oppose clairement pression et crunchs.",
    ],
    [
      "Tu portes un haltère à droite seulement. Qui limite surtout la rotation du buste ?",
      "Les obliques, en anti-rotation",
      [
        "Le triceps droit",
        "Le biceps gauche",
        "Le dentelé seul",
      ],
      "Charge unilatérale = couple de rotation. Externe et interne résistent pour que tu restes face à ta direction.",
    ],
    [
      "« Inspire et gaine » sert surtout à…",
      "Mettre le transverse en action et monter la pression",
      [
        "Isoler le grand droit en flexion",
        "Supiner l’avant-bras",
        "Rétracter les rhomboïdes",
      ],
      "Le transverse entoure le ventre et augmente la pression intra-abdominale quand tu inspires et gaines.",
    ],
    [
      "Les tablettes correspondent visuellement à…",
      "Le grand droit",
      ["Le transverse", "Les seuls obliques", "Le trapèze inférieur"],
      "« Celui des tablettes » : le grand droit. Le transverse, plus important pour la tenue, reste invisible.",
    ],
    [
      "Incliner le buste sur le côté sollicite surtout…",
      "Les obliques",
      ["Le biceps", "Le brachio-radial", "Le grand pectoral"],
      "Rotation et inclinaison du buste = oblique externe et interne.",
    ],
    [
      "Quelle affirmation sur le transverse est juste ?",
      "C’est une ceinture profonde autour du ventre",
      [
        "C’est le muscle superficiel des tablettes",
        "Il part du sternum vers l’humérus",
        "Il a trois chefs comme le deltoïde",
      ],
      "Image de la leçon : ceinture qui entoure, presse, rigidifie — pas un muscle de galbe.",
    ],
    [
      "Au soulevé de terre, si le tronc « plie », que n’as-tu pas assez utilisé ?",
      "La rigidité du tronc via la pression intra-abdominale",
      [
        "Uniquement un curl biceps",
        "Les écartés pectoraux",
        "La supination",
      ],
      "Abdos sous barre = empêcher de plier. Pression (transverse, gainage) > enchaîner des crunchs.",
    ],
    [
      "Pourquoi le transverse est-il « le plus important » tout en ne se voyant pas ?",
      "Parce qu’il rigidifie le tronc par la pression, sans faire le six-pack",
      [
        "Parce qu’il remplace les obliques pour tourner",
        "Parce qu’il fléchit plus que le grand droit",
        "Parce qu’il tire l’humérus comme un pec",
      ],
      "Priorité fonctionnelle, pas esthétique : tenue sous charge plutôt que relief abdominal.",
    ],
    [
      "Crunchs et relevés de jambes ont en commun de…",
      "Cibler le grand droit en flexion de tronc",
      [
        "Augmenter surtout la pression comme un squat",
        "Résister à une charge unilatérale",
        "Plaquer l’omoplate",
      ],
      "Les deux rapprochent côtes et bassin (ou l’équivalent en relevant les jambes) : flexion, grand droit.",
    ],
    [
      "Quelle équipe de rôles est correcte ?",
      "Grand droit : fléchir ; obliques : tourner / résister ; transverse : presser",
      [
        "Grand droit : presser ; transverse : tablettes ; obliques : tendre le coude",
        "Tous les abdos ne font que le six-pack",
        "Seul le grand droit compte au squat",
      ],
      "Trois étages : flexion visible, rotation/anti-rotation, ceinture de pression.",
    ],
    [
      "Quelle phrase reprend l’idée finale de la leçon ?",
      "Un tronc solide se juge à ce qu’il tient, pas à ce qu’il montre",
      [
        "Un tronc solide se juge uniquement au six-pack",
        "Les crunchs remplacent la pression au squat",
        "Le transverse sert d’abord à faire joli",
      ],
      "Sous charge, pression et tenue > apparence. Crunchs utiles au grand droit, insuffisants pour juger le tronc.",
    ],
  ]),

  // 4. Le dos
  bank25([
    [
      "Pourquoi deux dos peuvent-ils sembler si différents — l’un large, l’autre épais ?",
      "Parce que les muscles du tirage n’ont pas tous le même rôle",
      [
        "Parce que seul le biceps change la forme du dos",
        "Parce que le grand pec fait la largeur du dos",
        "Parce que le transverse dessine le V",
      ],
      "Largeur et épaisseur ne viennent pas du même muscle : grand dorsal d’un côté, rhomboïdes de l’autre.",
    ],
    [
      "Quel muscle fait surtout la largeur du dos ?",
      "Le grand dorsal",
      ["Les rhomboïdes", "Le deltoïde postérieur seul", "Le transverse"],
      "Le grand dorsal est le muscle du V : largeur, pas l’épaisseur du milieu du dos.",
    ],
    [
      "D’où part le grand dorsal, et jusqu’où remonte-t-il ?",
      "Du bas du dos jusqu’à l’humérus, sous l’aisselle",
      [
        "De la clavicule jusqu’au sternum",
        "De la mastoïde jusqu’aux premières côtes",
        "De l’épicondyle médial jusqu’aux doigts",
      ],
      "Vaste trajet : bas du dos → humérus sous l’aisselle. Ce levier rapproche le bras et le tire vers le bas.",
    ],
    [
      "Que fait le grand dorsal sur le bras ?",
      "Il le rapproche du corps et le tire vers le bas",
      [
        "Il le pousse en avant comme un pec",
        "Il tend uniquement le coude",
        "Il fléchit le tronc en crunch",
      ],
      "Rapprocher + tirer vers le bas = logique des tractions et du tirage vertical.",
    ],
    [
      "Quels exercices exploitent le trajet du grand dorsal ?",
      "Tractions et tirages verticaux",
      [
        "Développé couché et écartés",
        "Crunchs et relevés de jambes",
        "Curl paume haute",
      ],
      "Tirer le bras vers le bas, le rapprocher du corps : exactement le trajet dorsal.",
    ],
    [
      "Quel rôle principal ont les rhomboïdes ?",
      "Ils font l’épaisseur du milieu du dos",
      [
        "Ils font surtout la largeur en V",
        "Ils tendent le coude",
        "Ils dessinent le six-pack",
      ],
      "Largeur = grand dorsal. Épaisseur du milieu = rhomboïdes, entre colonne et omoplate.",
    ],
    [
      "Où sont tendus les rhomboïdes ?",
      "Entre la colonne et le bord interne de l’omoplate",
      [
        "Entre le sternum et l’humérus",
        "Entre les cervicales et les premières côtes",
        "Entre le sacrum et le crâne uniquement",
      ],
      "Colonne ↔ bord interne de l’omoplate : en se contractant, ils rapprochent les omoplates.",
    ],
    [
      "Quel geste les rhomboïdes produisent-ils ?",
      "La rétraction des omoplates",
      [
        "L’avancée de l’omoplate autour du thorax",
        "La flexion du coude",
        "L’élévation d’épaule type shrug",
      ],
      "Rétraction = omoplates qui se rapprochent. C’est le départ d’un bon rowing.",
    ],
    [
      "Quel exercice lance surtout la rétraction des rhomboïdes ?",
      "Le rowing",
      ["Le développé couché", "Les dips", "Les crunchs"],
      "Un bon rowing commence par rapprocher les omoplates : travail d’épaisseur, rhomboïdes.",
    ],
    [
      "Comment surnomme-t-on le grand rond ?",
      "« Petit dorsal »",
      ["« Petit pec »", "« Tablette »", "« Ceinture profonde »"],
      "Le grand rond assiste le grand dorsal depuis le bord de l’omoplate : d’où « petit dorsal ».",
    ],
    [
      "D’où le grand rond assiste-t-il le grand dorsal ?",
      "Depuis le bord de l’omoplate",
      [
        "Depuis le sternum",
        "Depuis l’épicondyle latéral",
        "Depuis la mastoïde",
      ],
      "Même famille de tirage que le dorsal, ancré sur le bord de l’omoplate, pas sur tout le bas du dos.",
    ],
    [
      "Que fait le deltoïde postérieur ?",
      "Il tire le bras vers l’arrière",
      [
        "Il ramène le bras devant comme le pec",
        "Il plaque l’omoplate en overhead",
        "Il fléchit le tronc",
      ],
      "À l’arrière de l’épaule, il tire le bras en arrière et équilibre ce que tu pousses devant.",
    ],
    [
      "Quels exercices ciblent le deltoïde postérieur ?",
      "Face pulls et oiseau",
      [
        "Développé couché et écartés",
        "Crunchs et farmer unilatéral",
        "Dips et développé serré",
      ],
      "Tirer le bras en arrière : face pulls et oiseau. Pas la poussée horizontale du pec.",
    ],
    [
      "À quoi sert le deltoïde postérieur par rapport aux poussées avant ?",
      "Il équilibre tout ce que tu fais en poussée devant",
      [
        "Il remplace le grand pectoral au couché",
        "Il tend le coude à la place du triceps",
        "Il fait la largeur du V à lui seul",
      ],
      "Beaucoup de développé devant : le postérieur tire en arrière pour équilibrer l’épaule.",
    ],
    [
      "Quelle distinction est juste entre grand dorsal et rhomboïdes ?",
      "Dorsal = largeur, tire le bras vers le bas ; rhomboïdes = épaisseur, rétractent l’omoplate",
      [
        "Rhomboïdes = largeur en traction ; dorsal = épaisseur au rowing",
        "Les deux s’insèrent sur le sternum",
        "Le dorsal rétracte seulement, les rhomboïdes tirent l’humérus",
      ],
      "Deux visuels de dos, deux actions : V vertical vs milieu épais par les omoplates.",
    ],
    [
      "Tu veux un dos plus large, pas seulement plus épais. Tu priorises…",
      "Tractions et tirages verticaux (grand dorsal)",
      [
        "Rowing d’épaisseur uniquement",
        "Face pulls seulement",
        "Crunchs",
      ],
      "Largeur = trajet du dorsal, bras vers le bas. Le rowing épaissit surtout via les rhomboïdes.",
    ],
    [
      "Tu veux de l’épaisseur au milieu du dos. Tu priorises…",
      "Le rowing et la rétraction des omoplates (rhomboïdes)",
      [
        "Uniquement les tractions, sans rétraction",
        "Les écartés pectoraux",
        "Les curls biceps",
      ],
      "Épaisseur du milieu = rhomboïdes qui rapprochent omoplates et colonne. Le rowing lance ce geste.",
    ],
    [
      "En quoi le grand rond ressemble-t-il au grand dorsal ?",
      "Il l’assiste dans le tirage, d’où le surnom « petit dorsal »",
      [
        "Il fait l’épaisseur comme les rhomboïdes seuls",
        "Il plaque l’omoplate comme le dentelé",
        "Il fléchit le cou comme le SCM",
      ],
      "Même famille de rapprochement du bras, depuis le bord de l’omoplate plutôt que depuis tout le bas du dos.",
    ],
    [
      "Traction et rowing ne construisent pas le même « dessin » de dos parce que…",
      "L’une tire le bras vers le bas (largeur), l’autre rétracte (épaisseur)",
      [
        "Les deux isolent uniquement le biceps",
        "Le rowing fait la largeur, la traction l’épaisseur",
        "Aucun des deux n’utilise l’humérus ni l’omoplate",
      ],
      "Même « tirage », vecteurs différents : vertical (dorsal) vs rapprochement d’omoplates (rhomboïdes).",
    ],
    [
      "Le grand dorsal s’accroche à l’humérus sous l’aisselle. Pourquoi c’est important ?",
      "C’est ce levier qui permet de rapprocher le bras et de le tirer vers le bas",
      [
        "C’est ce qui fléchit le tronc",
        "C’est ce qui tend le poignet",
        "C’est ce qui tourne la tête",
      ],
      "Sans cette insertion sur l’humérus, pas de tirage vertical efficace. Le trajet bas du dos → aisselle explique les tractions.",
    ],
    [
      "Face pulls et oiseau sont du même côté de l’équilibre que…",
      "Le deltoïde postérieur, bras vers l’arrière",
      [
        "Le grand pectoral, bras vers l’avant",
        "Le grand droit, flexion de tronc",
        "Le triceps, extension de coude",
      ],
      "Poussée devant (pec, deltoïde antérieur) vs tirage arrière d’épaule : postérieur, face pulls, oiseau.",
    ],
    [
      "Les rhomboïdes rapprochent le bord interne de l’omoplate de…",
      "La colonne",
      ["Le sternum", "L’humérus distal", "La mastoïde"],
      "Tendus colonne–omoplate : la rétraction ferme cet espace et épaissit le milieu du dos.",
    ],
    [
      "Quel muscle n’est pas un moteur de largeur du V ?",
      "Les rhomboïdes (épaisseur du milieu)",
      [
        "Le grand dorsal",
        "Le grand rond, qui assiste le dorsal",
        "Le vaste muscle qui tire l’humérus vers le bas",
      ],
      "Le V vient du dorsal (et de son « petit » assistant). Les rhomboïdes épaississent entre les omoplates.",
    ],
    [
      "Quelle association est correcte ?",
      "Grand dorsal → tractions ; rhomboïdes → rowing ; deltoïde postérieur → face pulls / oiseau",
      [
        "Grand dorsal → crunchs ; rhomboïdes → dips ; postérieur → curls",
        "Tous ces muscles poussent horizontalement comme le pec",
        "Le grand rond rétracte seul, sans lien avec le dorsal",
      ],
      "Chaque muscle du tirage a son exercice « signature » dans la leçon.",
    ],
    [
      "Quelle synthèse est fidèle ?",
      "Largeur : grand dorsal (+ grand rond) ; épaisseur : rhomboïdes ; arrière d’épaule : deltoïde postérieur",
      [
        "Largeur : rhomboïdes ; épaisseur : pec ; arrière : transverse",
        "Un seul muscle de tirage explique largeur et épaisseur",
        "Le deltoïde postérieur fait le V, le dorsal fait l’oiseau",
      ],
      "C’est pour ça que deux dos se ressemblent peu : on n’a pas tous développé les mêmes muscles de tirage.",
    ],
  ]),

  // 5. Trapèze et érecteurs
  bank25([
    [
      "Pourquoi le trapèze ne se résume-t-il pas à hausser les épaules ?",
      "Hausser n’est que sa partie supérieure, souvent la moins intéressante",
      [
        "Parce qu’il n’élève jamais l’épaule",
        "Parce qu’il n’a qu’un seul rôle : fléchir le coude",
        "Parce que c’est uniquement un muscle du six-pack",
      ],
      "Les shrugs, c’est le supérieur. Le triangle a aussi un moyen qui rétracte et un inférieur qui abaisse — souvent négligés.",
    ],
    [
      "Quelle forme et quelle zone pour le trapèze ?",
      "Un grand triangle sur la nuque et le haut du dos",
      [
        "Une ceinture autour du ventre",
        "Un éventail du sternum vers l’humérus",
        "Deux piliers du sacrum au crâne seulement",
      ],
      "Triangle nuque + haut du dos, en trois parties (sup, moy, inf), chacune avec une action sur l’omoplate / l’épaule.",
    ],
    [
      "Que fait la partie supérieure du trapèze ?",
      "Elle élève l’épaule (les shrugs)",
      [
        "Elle abaisse surtout l’omoplate",
        "Elle fléchit le tronc",
        "Elle tend le coude",
      ],
      "Supérieur = élévation. Les shrugs isolent surtout cette portion.",
    ],
    [
      "Que fait la partie moyenne du trapèze ?",
      "Elle rapproche l’omoplate de la colonne",
      [
        "Elle élève uniquement l’épaule",
        "Elle dessine les tablettes",
        "Elle tourne la tête comme le SCM",
      ],
      "Moyen = rétraction de l’omoplate vers la colonne. Rowing et face pulls la travaillent, avec l’inférieur.",
    ],
    [
      "Que fait la partie inférieure du trapèze ?",
      "Elle abaisse l’omoplate",
      [
        "Elle hausse l’épaule (shrugs)",
        "Elle serre les doigts",
        "Elle fléchit le cou vers l’avant",
      ],
      "Inférieur = abaissement. Souvent négligé, alors que rowing et face pulls le sollicitent avec le moyen.",
    ],
    [
      "Rowing et face pulls travaillent surtout…",
      "Les parties moyenne et inférieure du trapèze",
      [
        "Uniquement le trapèze supérieur (shrugs)",
        "Uniquement le biceps",
        "Le grand droit",
      ],
      "Pas les shrugs : ces deux exercices ciblent surtout moyen (rétraction) et inférieur (abaissement), souvent oubliés.",
    ],
    [
      "Pourquoi moyen et inférieur du trapèze sont-ils souvent les plus négligés ?",
      "On réduit le trapèze aux shrugs, donc au supérieur",
      [
        "Ils n’existent pas anatomiquement",
        "Ils fléchissent le coude et on les isole trop",
        "Le rowing les interdit",
      ],
      "Le réflexe « trap = hausser les épaules » laisse de côté rétraction et abaissement, pourtant plus utiles au haut du dos.",
    ],
    [
      "Où se situe l’élévateur de la scapula par rapport au trapèze ?",
      "Sous le trapèze",
      [
        "Devant le grand pectoral",
        "Dans l’avant-bras",
        "Autour du ventre comme le transverse",
      ],
      "Plus profond / sous le trapèze, il relie les cervicales au coin supérieur de l’omoplate.",
    ],
    [
      "Que relie l’élévateur de la scapula ?",
      "Les cervicales au coin supérieur de l’omoplate",
      [
        "Le sternum à l’humérus",
        "Le sacrum au crâne en deux piliers",
        "L’épicondyle médial aux doigts",
      ],
      "Cervicales → angle supérieur de l’omoplate. S’il tire trop, la nuque raide après une grosse séance s’explique souvent ainsi.",
    ],
    [
      "Nuque raide après une grosse séance : quel muscle a souvent trop tiré ?",
      "L’élévateur de la scapula",
      ["Le grand droit", "Le soléaire", "Le brachial"],
      "Lien cervicales–omoplate : surcharge fréquente, sensation de nuque bloquée.",
    ],
    [
      "Quelle forme ont les érecteurs du rachis ?",
      "Deux piliers le long de la colonne, du sacrum jusqu’au crâne",
      [
        "Un triangle sur la nuque seulement",
        "Un éventail sternum–clavicule",
        "Une nappe uniquement sur l’omoplate",
      ],
      "Piliers sacrum–crâne : ils étendent le dos et le maintiennent droit.",
    ],
    [
      "Quel est le travail des érecteurs du rachis ?",
      "Étendre le dos et le maintenir droit",
      [
        "Fléchir le tronc comme un crunch",
        "Tendre le coude",
        "Serrer les doigts",
      ],
      "Extension et maintien. Au soulevé de terre, ils luttent contre la barre qui veut t’enrouler.",
    ],
    [
      "Au soulevé de terre, que font les érecteurs ?",
      "Ils luttent à chaque centimètre contre la barre qui cherche à t’enrouler",
      [
        "Ils isolent le biceps",
        "Ils dessinent le six-pack",
        "Ils avancent l’omoplate comme le dentelé",
      ],
      "La barre veut fléchir le dos. Les érecteurs étendent et maintiennent : un dos qui tient sous charge, c’est d’abord eux.",
    ],
    [
      "« Un dos qui tient sous charge, c’est d’abord… »",
      "Les érecteurs du rachis",
      ["Le biceps", "Le grand pectoral", "Les fléchisseurs de doigts seuls"],
      "Tenue et extension du rachis sous barre : priorité aux érecteurs, pas au galbe des bras.",
    ],
    [
      "Quelle distinction est juste entre trapèze supérieur et érecteurs ?",
      "Le supérieur hausse l’épaule ; les érecteurs étendent et tiennent le dos",
      [
        "Les érecteurs font les shrugs ; le trapèze fléchit le tronc",
        "Les deux naissent à l’épicondyle latéral",
        "Le trapèze va du sacrum au crâne en deux piliers",
      ],
      "Même « haut du dos / posture », actions différentes : élévation d’épaule vs piliers de colonne.",
    ],
    [
      "Quelle distinction est juste entre les trois parties du trapèze ?",
      "Sup : élève ; moy : rétracte ; inf : abaisse",
      [
        "Sup : abaisse ; moy : élève ; inf : fléchit le coude",
        "Les trois ne font que le shrug",
        "Seul l’inférieur hausse l’épaule",
      ],
      "Mémo en trois verbes : élever, rapprocher de la colonne, abaisser.",
    ],
    [
      "Tu ne fais que des shrugs pour « les trapèzes ». Que manques-tu ?",
      "Moyen et inférieur (rétraction et abaissement), travaillés en rowing / face pulls",
      [
        "Uniquement le biceps",
        "Le grand droit en flexion",
        "La pronation de l’avant-bras",
      ],
      "Shrugs = supérieur. La leçon insiste : les deux autres portions, souvent plus intéressantes, passent à la trappe.",
    ],
    [
      "Rowing : quel couple trapèze est le plus concerné ?",
      "Moyen (rapproche l’omoplate) et inférieur (l’abaisse)",
      [
        "Uniquement le supérieur en shrug",
        "Aucune partie du trapèze",
        "Seulement l’élévateur de la scapula",
      ],
      "Ramer, c’est surtout ramener et contrôler l’omoplate — pas la hausser. D’où moyen + inf.",
    ],
    [
      "Face pulls : même logique que le rowing pour le trapèze, c’est-à-dire…",
      "Surtout moyen et inférieur, pas le shrug",
      [
        "Surtout le supérieur uniquement",
        "Surtout le transverse",
        "Surtout le triceps long chef seul",
      ],
      "La leçon groupe rowing et face pulls : les deux dernières parties du triangle, souvent négligées.",
    ],
    [
      "L’élévateur de la scapula tire sur le coin supérieur de l’omoplate. Quel inconfort ça peut donner ?",
      "Une nuque raide",
      [
        "Un tennis elbow",
        "Un six-pack trop marqué",
        "Une faiblesse de prise uniquement",
      ],
      "Ancrage cervical : trop tirer = nuque qui bloque, classique après une séance chargée.",
    ],
    [
      "Sacrum → crâne décrit le trajet de…",
      "Les érecteurs du rachis",
      ["Le trapèze supérieur seul", "Le grand pectoral", "Le SCM"],
      "Deux piliers tout le long de la colonne, pas le triangle de la nuque ni l’éventail du pec.",
    ],
    [
      "Si la barre de deadlift t’enroule le dos, quels muscles luttent contre ça ?",
      "Les érecteurs, qui étendent et maintiennent",
      [
        "Le biceps en supination",
        "Le dentelé en avancée d’omoplate",
        "Les fléchisseurs du poignet",
      ],
      "Enrouler = perdre l’extension. Les érecteurs sont les piliers qui s’y opposent, centimètre par centimètre.",
    ],
    [
      "Trapèze moyen et rhomboïdes se ressemblent un peu parce que…",
      "Les deux rapprochent l’omoplate de la colonne",
      [
        "Les deux fléchissent le tronc",
        "Les deux tendent le coude",
        "Les deux vont du sternum à l’humérus",
      ],
      "Rétraction : moyen du trapèze (cette leçon) comme les rhomboïdes (leçon dos). Ici on reste sur le triangle du trapèze.",
    ],
    [
      "Quelle association exercice / portion est juste ?",
      "Shrugs → trapèze supérieur ; rowing / face pulls → moyen et inférieur",
      [
        "Shrugs → érecteurs uniquement ; rowing → biceps uniquement",
        "Face pulls → grand droit ; shrugs → transverse",
        "Tous ces mouvements n’utilisent que l’élévateur de la scapula",
      ],
      "Découpage clair de la leçon : haussement vs rétraction/abaissement.",
    ],
    [
      "Quelle synthèse est fidèle ?",
      "Trapèze en 3 actions ; élévateur = cervicales–omoplate (nuque) ; érecteurs = piliers, DL",
      [
        "Le trapèze n’élève que ; les érecteurs font les shrugs ; l’élévateur dessine le V",
        "Les érecteurs sont un triangle sur la nuque",
        "Le trapèze inférieur hausse l’épaule, le supérieur abaisse",
      ],
      "Triangle (sup/moy/inf), muscle sous le trap (élévateur, nuque raide), piliers sacrum–crâne qui tiennent le deadlift.",
    ],
  ])
];
