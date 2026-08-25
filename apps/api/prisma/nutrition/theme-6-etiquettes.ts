import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_6_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Étiquettes nutritionnelles",
    subtitle: "Lire le tableau en 30 secondes.",
    markdown: `L'**étiquette nutritionnelle** (souvent au dos du paquet) résume ce que contient un aliment : calories, protéines, glucides, lipides, par **100 g** ou **100 ml**, parfois par **portion**.

---

Regarde d'abord la **taille de la portion** indiquée. Un produit peut sembler « léger » pour 100 g mais tu en manges le double en réalité.

---

Les **calories** (kcal) te disent la densité énergétique. Les **protéines** comptent pour le muscle ; les **glucides** pour l'énergie ; les **lipides** pour les hormones et la satiété.

---

Le **Nutri-Score** (lettre A à E, couleur verte à rouge) est un résumé simplifié. Utile pour comparer rapidement, mais il ne remplace pas la lecture du tableau complet.

---

En musculation, l'étiquette aide à **compter les macros** (protéines surtout) et à repérer les produits très sucrés ou très gras sans le réaliser.

---

À retenir : étiquette = calories + macros + taille de portion. Toujours vérifier si les chiffres sont pour 100 g ou pour une portion réelle.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 35,
    xpReward: 35,
    tags: ["etiquette", "nutritionnel", "macros"],
    sources: [
      "ANSES — Étiquetage nutritionnel (2020)",
    ],
    ...CP.etiquettes,
    questions: quiz6(
      qcm(
        "L'étiquette nutritionnelle indique souvent les valeurs pour…",
        "100 g ou 100 ml et parfois par portion",
        ["Uniquement par bouchée", "Par heure", "Par année"],
        "Comparer à 100 g = référence standard.",
      ),
      qcm(
        "Avant de juger un produit « léger », il faut vérifier…",
        "La taille de la portion réelle",
        ["La couleur du packaging", "La date de péremption seule", "Le prix"],
        "Portion réelle vs portion indiquée.",
      ),
      qcm(
        "Le Nutri-Score sert surtout à…",
        "Comparer rapidement la qualité nutritionnelle",
        ["Mesurer le poids du muscle", "Remplacer les protéines", "Indiquer la date de péremption"],
        "Résumé A à E, pas détail complet.",
      ),
      fillBlank(
        "Pour le muscle, la ligne ___ de l'étiquette est particulièrement utile.",
        "protéines",
        ["eau", "sel seul", "additifs"],
        "Protéines = matériau musculaire.",
      ),
      tf(
        "Les chiffres pour 100 g correspondent toujours à ce que tu manges en une fois.",
        false,
        "Faux : ta portion peut être plus grande ou plus petite.",
      ),
      tf(
        "Lire l'étiquette aide à repérer les produits très sucrés ou gras.",
        true,
        "Vrai : sucre et lipides sont listés explicitement.",
      ),
    ),
  },
  {
    title: "Ingrédients",
    subtitle: "La liste qui dit la vérité.",
    markdown: `La **liste des ingrédients** est souvent plus révélatrice que le tableau nutritionnel. Les ingrédients sont classés par **ordre décroissant** de quantité : le premier est le plus présent.

---

Un produit « aux fruits » avec le sucre en **première** position contient surtout du sucre, pas du fruit.

---

Les **additifs** (colorants, émulsifiants, conservateurs) sont listés avec un **code E** (ex. E330 = acide citrique). Leur présence en grande quantité peut signaler un aliment très transformé.

---

Les **allergènes** (lait, gluten, œuf, fruits à coque…) doivent être **mis en évidence** (gras ou encadré). Important si tu as des intolérances.

---

Les mentions « **sans sucres ajoutés** », « **light** » ou « **0 % matière grasse ** » ne garantissent pas un produit sain : regarde ce qui remplace (édulcorants, sel, amidon).

---

À retenir : ingrédients = ordre de quantité + additifs + allergènes. C'est la première chose à lire avant d'acheter un produit emballé.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 36,
    xpReward: 35,
    tags: ["ingredients", "additifs", "allergenes"],
    sources: [
      "ANSES — Étiquetage nutritionnel (2020)",
    ],
    ...CP.etiquettes,
    questions: quiz6(
      qcm(
        "Dans la liste des ingrédients, le premier est…",
        "Le plus présent en quantité",
        ["Le moins présent", "Un additif obligatoire", "Toujours de l'eau"],
        "Ordre décroissant = plus gros composant en tête.",
      ),
      qcm(
        "Un produit « aux fruits » avec le sucre en premier contient surtout…",
        "Du sucre",
        ["Du fruit frais", "Des protéines", "Des fibres seules"],
        "Ordre de la liste = vérité sur la composition.",
      ),
      qcm(
        "Les allergènes sur l'étiquette doivent être…",
        "Mis en évidence (gras ou encadré)",
        ["Cachés", "Absents", "En fin de liste invisible"],
        "Obligation légale pour protéger les allergiques.",
      ),
      fillBlank(
        "Les additifs alimentaires sont souvent identifiés par un code ___.",
        "E",
        ["A", "Z", "M"],
        "E330, E621… = additifs européens.",
      ),
      tf(
        "« Light » ou « 0 % matière grasse » garantit toujours un produit sain.",
        false,
        "Faux : le produit peut être riche en sucre ou en sel.",
      ),
      tf(
        "La liste des ingrédients est classée par quantité décroissante.",
        true,
        "Vrai : le premier ingrédient domine le produit.",
      ),
    ),
  },
  {
    title: "Densité énergétique",
    subtitle: "Beaucoup de calories en peu de volume.",
    markdown: `La **densité énergétique** mesure combien de calories un aliment apporte pour un volume ou un poids donné. Plus elle est haute, plus tu peux manger « peu » en volume mais « beaucoup » en calories.

---

Les **lipides** (9 kcal/g) et l'**alcool** (7 kcal/g) rendent certains aliments très denses : huiles, beurre, fromages gras, pâtisseries, chips.

---

Les **légumes** et fruits ont une densité **basse** : beaucoup de volume, peu de calories. Idéal pour la satiété en période de déficit.

---

Les aliments **ultra-transformés** combinent souvent gras + sucre + sel dans un petit volume : très caloriques, peu rassasiantes au gramme près.

---

En **prise de masse**, des aliments denses (oléagineux, avoine, huile d'olive) aident à atteindre les calories sans manger des montagnes. En **sèche**, privilégier les aliments peu denses.

---

À retenir : densité énergétique = calories par volume. Même assiette, des choix différents peuvent doubler ou diviser par deux les calories.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 37,
    xpReward: 35,
    tags: ["densite-energetique", "calories", "volume"],
    sources: [
      "Rolls — The relationship between dietary energy density and body weight (2000)",
    ],
    ...CP.etiquettes,
    questions: quiz6(
      qcm(
        "La densité énergétique mesure…",
        "Les calories pour un volume ou poids donné",
        ["La couleur de l'aliment", "Le temps de cuisson", "La quantité d'eau bue"],
        "Plus dense = plus de kcal pour la même quantité.",
      ),
      qcm(
        "Les aliments les plus denses en calories incluent…",
        "Huiles, beurre, pâtisseries",
        ["Concombre, salade", "Eau", "Champignons seuls"],
        "Lipides = 9 kcal/g.",
      ),
      qcm(
        "En période de déficit, il est utile de privilégier…",
        "Des aliments peu denses (légumes, fruits)",
        ["Uniquement les huiles", "Les boissons sucrées", "L'alcool"],
        "Volume sans excès calorique = satiété.",
      ),
      fillBlank(
        "1 g de lipide apporte ___ kcal, plus que protéines et glucides.",
        "9",
        ["4", "1", "0"],
        "Lipides = macronutriment le plus calorique.",
      ),
      tf(
        "Deux assiettes de même taille ont toujours le même nombre de calories.",
        false,
        "Faux : la composition change tout.",
      ),
      tf(
        "En prise de masse, les aliments denses aident à atteindre les calories.",
        true,
        "Vrai : oléagineux, avoine, huiles = calories concentrées.",
      ),
    ),
  },
  {
    title: "Portions",
    subtitle: "Ce que tu manges vraiment.",
    markdown: `Une **portion**, c'est la quantité que tu consommes en une fois. L'étiquette peut indiquer une portion « officielle » différente de ton habitude réelle.

---

Exemple : des céréales indiquent 30 g par portion, mais tu en sers souvent 60 g. Les calories et sucres affichés sont alors **doublés** par rapport à l'étiquette.

---

Pour les **protéines** (viande, poisson, tofu), une portion utile en musculation tourne souvent autour de **120 à 200 g** selon ton poids et tes objectifs, pas la « demi-palmée » marketing.

---

Peser ses aliments au début (**balance de cuisine**) aide à calibrer l'œil. Avec l'expérience, tu estimes mieux sans peser à chaque repas.

---

Les restaurants et plats préparés servent souvent des portions **plus grandes** que les recommandations. Manger la moitié ou partager peut éviter un excès involontaire.

---

À retenir : portion réelle > portion indiquée sur le paquet. Calibrer tes portions évite de sous-estimer ou sur-estimer tes apports.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 38,
    xpReward: 35,
    tags: ["portions", "quantites", "balance"],
    sources: [
      "ANSES — Portions et apports de référence (2017)",
    ],
    ...CP.etiquettes,
    questions: quiz6(
      qcm(
        "Une portion sur l'étiquette…",
        "Peut différer de ce que tu manges réellement",
        ["Est toujours exacte pour tout le monde", "Est interdite en France", "Remplace les calories"],
        "Portion marketing vs portion réelle.",
      ),
      qcm(
        "Si tu doubles la quantité de céréales, tu doubles aussi…",
        "Les calories et sucres",
        ["Uniquement la couleur", "La date de péremption", "Les vitamines automatiquement"],
        "Proportionnel à la quantité consommée.",
      ),
      qcm(
        "Peser ses aliments au début sert surtout à…",
        "Calibrer l'œil pour estimer les portions",
        ["Remplacer l'entraînement", "Supprimer les protéines", "Mesurer la force"],
        "Apprentissage visuel des quantités.",
      ),
      fillBlank(
        "En musculation, une portion de protéines tourne souvent autour de 120 à ___ g.",
        "200",
        ["10", "500", "1000"],
        "Fourchette courante selon poids et objectifs.",
      ),
      tf(
        "Les restaurants servent souvent des portions plus grandes que les recommandations.",
        true,
        "Vrai : excès involontaire fréquent à l'extérieur.",
      ),
      tf(
        "La portion indiquée sur le paquet correspond toujours à ton habitude.",
        false,
        "Faux : chacun sert des quantités différentes.",
      ),
    ),
  },
  {
    title: "Sucres ajoutés",
    subtitle: "Repérer le sucre caché.",
    markdown: `Les **sucres ajoutés** sont ceux incorporés lors de la fabrication (sirop de glucose, sucre blanc, miel ajouté…), distincts des sucres **naturels** du fruit entier ou du lait.

---

Sur l'étiquette européenne, la ligne **« dont sucres »** inclut sucres naturels **et** ajoutés. Pour distinguer, il faut lire la **liste des ingrédients**.

---

Le sucre peut se cacher sous des noms variés : sirop de glucose-fructose, dextrose, maltodextrine, miel, jus concentré. Tous comptent comme sucres ajoutés.

---

Les **boissons sucrées** (sodas, jus industriels) apportent beaucoup de sucres sans satiété. Un verre peut contenir **20 à 30 g** de sucre, parfois plus.

---

En musculation, un peu de sucre autour de l'entraînement n'est pas catastrophique, mais un excès quotidien nuit à la **santé métabolique** et peut faciliter la prise de gras en surplus.

---

À retenir : « dont sucres » sur l'étiquette + liste des ingrédients = repérer les sucres ajoutés. Le fruit entier reste préférable au jus sucré industriel.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 39,
    xpReward: 35,
    tags: ["sucre", "sucres-ajoutes", "etiquette"],
    sources: [
      "OMS — Guideline: sugars intake (2015)",
    ],
    ...CP.etiquettes,
    questions: quiz6(
      qcm(
        "Les sucres ajoutés sont…",
        "Incorporés lors de la fabrication",
        ["Uniquement dans les fruits entiers", "Absents des produits industriels", "Identiques à l'eau"],
        "Distincts des sucres naturels du fruit non transformé.",
      ),
      qcm(
        "Sur l'étiquette, « dont sucres » inclut…",
        "Sucres naturels et ajoutés",
        ["Uniquement le sel", "Uniquement les lipides", "Rien du tout"],
        "Pour distinguer, lire la liste des ingrédients.",
      ),
      qcm(
        "Le sirop de glucose-fructose sur l'étiquette est…",
        "Un sucre ajouté",
        ["Une protéine", "Une fibre", "Un minéral"],
        "Nom alternatif courant pour le sucre industriel.",
      ),
      fillBlank(
        "Un soda peut contenir ___ à 30 g de sucre par verre.",
        "20",
        ["0", "100", "500"],
        "Boisson sucrée = apport rapide sans satiété.",
      ),
      tf(
        "Le jus de fruit industriel est équivalent au fruit entier pour les sucres.",
        false,
        "Faux : jus = sucres concentrés, peu de fibres.",
      ),
      tf(
        "Lire la liste des ingrédients aide à repérer les sucres cachés.",
        true,
        "Vrai : noms variés pour le même sucre ajouté.",
      ),
    ),
  },
  {
    title: "Sel",
    subtitle: "Sodium, eau et tension.",
    markdown: `Le **sel** (chlorure de sodium) est présent naturellement dans les aliments et ajouté massivement dans les produits transformés (charcuterie, plats préparés, chips, sauces).

---

Sur l'étiquette, cherche **« sel »** ou **« sodium »** (1 g de sel ≈ 400 mg de sodium). L'OMS recommande de limiter le sel à environ **5 g par jour** (2 g de sodium).

---

Un excès de sel peut retenir l'**eau** et faire monter la **tension artérielle** chez les personnes sensibles. En musculation, un peu de sel autour de l'effort peut aider à l'hydratation, mais l'excès chronique reste problématique.

---

Les produits « **sans sel ajouté** » peuvent quand même contenir du sodium naturel (fromage, pain). Toujours lire le tableau.

---

Cuisiner **maison** avec peu de sel ajouté et épices (herbes, poivre, citron) réduit l'apport sans sacrifier le goût.

---

À retenir : sel = sodium sur l'étiquette. Produits transformés = principale source d'excès. Modérer le sel protège la santé cardio sur le long terme.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 40,
    xpReward: 35,
    tags: ["sel", "sodium", "tension"],
    sources: [
      "OMS — Reducing salt intake (2016)",
    ],
    ...CP.etiquettes,
    questions: quiz6(
      qcm(
        "Sur l'étiquette, le sodium correspond au…",
        "Sel (chlorure de sodium)",
        ["Sucre", "Gras", "Fer seul"],
        "1 g sel ≈ 400 mg sodium.",
      ),
      qcm(
        "Les principales sources de sel en excès sont…",
        "Produits transformés (charcuterie, plats préparés)",
        ["Fruits frais", "Eau pure", "Légumes non salés"],
        "Sel ajouté en industrie.",
      ),
      qcm(
        "Un excès chronique de sel peut…",
        "Favoriser la rétention d'eau et la tension élevée",
        ["Augmenter le muscle directement", "Remplacer les protéines", "Supprimer la soif"],
        "Sensible chez personnes hypertendues.",
      ),
      fillBlank(
        "L'OMS recommande de limiter le sel à environ ___ g par jour.",
        "5",
        ["50", "0", "100"],
        "Objectif santé publique.",
      ),
      tf(
        "« Sans sel ajouté » signifie zéro sodium dans le produit.",
        false,
        "Faux : sodium naturel peut rester (fromage, pain).",
      ),
      tf(
        "Cuisiner maison avec épices permet de réduire le sel ajouté.",
        true,
        "Vrai : herbes, citron, poivre = goût sans excès.",
      ),
    ),
  },
  {
    title: "Qualité des graisses",
    subtitle: "Saturées, insaturées, oméga-3.",
    markdown: `Toutes les graisses alimentaires ne se valent pas. On distingue surtout les **saturées**, **mono-insaturées** et **poly-insaturées** (dont les **oméga-3**).

---

Les graisses **saturées** (beurre, charcuterie, fromages gras, huile de palme) en excès sont associées à un risque cardio accru. L'étiquette les liste souvent à part.

---

Les graisses **insaturées** (huile d'olive, avocat, oléagineux, poissons gras) sont favorables à la santé cardiovasculaire quand elles remplacent les saturées.

---

Les **oméga-3** (saumon, sardines, lin, noix) aident à moduler l'**inflammation**, utile aussi après l'entraînement intense.

---

Les graisses **trans** (huiles partiellement hydrogénées) sont à éviter : elles figurent parmi les plus nocives. Rare en Europe aujourd'hui, mais vérifie les ingrédients sur produits importés.

---

À retenir : privilégier insaturées et oméga-3, limiter saturées et trans. L'étiquette « matières grasses dont acides gras saturés » te guide.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 41,
    xpReward: 35,
    tags: ["graisses", "omega-3", "saturees"],
    sources: [
      "ANSES — Lipides et santé (2011)",
    ],
    ...CP.etiquettes,
    questions: quiz6(
      qcm(
        "Les graisses insaturées (olive, avocat, oléagineux)…",
        "Sont favorables quand elles remplacent les saturées",
        ["Doivent être évitées totalement", "Remplacent les protéines", "N'existent pas dans la nature"],
        "Qualité des graisses > quantité seule.",
      ),
      qcm(
        "Les oméga-3 se trouvent surtout dans…",
        "Poissons gras, lin, noix",
        ["Sucre blanc", "Pain blanc", "Sodas"],
        "EPA/DHA dans poissons gras.",
      ),
      qcm(
        "Les graisses trans sont…",
        "À éviter autant que possible",
        ["Essentielles en grande quantité", "Identiques aux oméga-3", "Sans effet sur la santé"],
        "Huiles hydrogénées = nocives.",
      ),
      fillBlank(
        "L'étiquette indique souvent « matières grasses dont acides gras ___ ».",
        "saturés",
        ["liquides", "invisibles", "musculaires"],
        "Ligne clé pour juger la qualité lipidique.",
      ),
      tf(
        "Toutes les graisses alimentaires ont le même effet sur la santé.",
        false,
        "Faux : saturées vs insaturées vs trans diffèrent.",
      ),
      tf(
        "Les oméga-3 peuvent aider à moduler l'inflammation après l'effort.",
        true,
        "Vrai : intérêt pour récupération et santé cardio.",
      ),
    ),
  },
  {
    title: "Marketing alimentaire",
    subtitle: "Déjouer les pièges du packaging.",
    markdown: `Le **marketing alimentaire** utilise des mots et images pour te faire croire qu'un produit est sain, naturel ou sportif, même quand l'étiquette dit autre chose.

---

Méfie-toi de : « **light** », « **0 %** », « **sport** », « **protéiné** », « **sans ** ». Ces mentions mettent en avant un point et cachent souvent le reste (sucre, sel, additifs).

---

Une barre « protéinée » peut contenir **autant de sucre** qu'une barre chocolatée classique. Vérifie toujours le tableau nutritionnel, pas seulement la grosse mention sur le devant.

---

Les images de **fruits**, **grains** ou **athlètes** sur le packaging ne garantissent pas la composition réelle. C'est de la communication, pas une preuve.

---

Les **allégations santé** (« riche en fibres », « source de protéines ») doivent respecter des seuils légaux, mais un produit « source de protéines » peut rester très sucré.

---

À retenir : le devant du paquet vend, l'arrière (ingrédients + tableau) informe. En musculation, ne te fie pas au packaging « fitness » : lis les chiffres.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 42,
    xpReward: 35,
    tags: ["marketing", "packaging", "pieges"],
    sources: [
      "ANSES — Étiquetage nutritionnel (2020)",
    ],
    ...CP.etiquettes,
    questions: quiz6(
      qcm(
        "Une barre « protéinée » peut…",
        "Contenir autant de sucre qu'une barre classique",
        ["Ne jamais contenir de sucre", "Remplacer un repas complet seul", "Augmenter le muscle sans entraînement"],
        "Mention protéine ≠ produit sain automatiquement.",
      ),
      qcm(
        "Les images de fruits sur le packaging…",
        "Ne garantissent pas la composition réelle",
        ["Prouvent 100 % fruit", "Remplacent l'étiquette", "Indiquent les calories exactes"],
        "Communication visuelle ≠ preuve.",
      ),
      qcm(
        "Pour juger un produit, il vaut mieux lire…",
        "Ingrédients et tableau nutritionnel (dos du paquet)",
        ["Uniquement le Nutri-Score", "La couleur du logo", "Le prix seul"],
        "Arrière du paquet = information fiable.",
      ),
      fillBlank(
        "Les mentions « light » ou « 0 % » mettent en avant un point et ___ souvent le reste.",
        "cachent",
        ["doublent", "suppriment", "remplacent"],
        "Marketing sélectif.",
      ),
      tf(
        "Un produit « sport » ou « fitness » est toujours adapté à la musculation.",
        false,
        "Faux : vérifier sucres, sel et macros réels.",
      ),
      tf(
        "Les allégations « source de protéines » respectent des seuils légaux minimaux.",
        true,
        "Vrai : mais le produit peut rester riche en sucre.",
      ),
    ),
  },
];
