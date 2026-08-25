import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_2_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Fruits et légumes",
    subtitle: "Couleurs, fibres et vitamines.",
    markdown: `Les **fruits et légumes** apportent vitamines, minéraux, fibres et composés antioxydants. Ils ne remplacent pas les protéines ou les glucides, mais complètent l'assiette du sportif.

---

Manger **plusieurs couleurs** (vert, orange, rouge, violet) augmente la diversité des micronutriments. Chaque famille de légumes apporte des profils différents : épinards (fer, magnésium), carottes (vitamine A), agrumes (vitamine C).

---

Les fruits contiennent des **glucides naturels** (fructose) et de l'eau. Ils peuvent servir de collation légère avant ou après la séance, sans remplacer un repas complet.

---

Les légumes **feuilles vertes** (salade, épinards, brocoli) sont peu caloriques mais riches en nutriments : utiles pour « remplir » l'assiette sans exploser les calories.

---

En musculation, fruits et légumes soutiennent la **récupération** (vitamines, antioxydants) et la **digestion** (fibres). Ce n'est pas un « super-aliment » unique : c'est la **variété** qui compte.

---

À retenir : vise plusieurs couleurs et formes (cru, cuit) dans la semaine. Fruits et légumes = complément essentiel, pas option décorative.`,
    durationSec: 85,
    difficulty: "BEGINNER",
    order: 8,
    xpReward: 25,
    tags: ["fruits", "legumes", "equilibre"],
    ...CP.equilibre,
    questions: quiz6(
      qcm(
        "Fruits et légumes apportent surtout…",
        "Vitamines, minéraux et fibres",
        ["Uniquement des protéines", "Uniquement du gras", "Aucun nutriment utile"],
        "Complément micronutriment + fibres.",
      ),
      qcm(
        "Manger plusieurs couleurs de légumes permet…",
        "D'augmenter la diversité des micronutriments",
        ["De supprimer le besoin de protéines", "De ne plus boire d'eau", "De remplacer l'entraînement"],
        "Chaque couleur = profil nutritionnel différent.",
      ),
      qcm(
        "Les légumes feuilles vertes sont…",
        "Peu caloriques mais riches en nutriments",
        ["Sans vitamines", "Identiques au sucre blanc", "Inutiles pour le sportif"],
        "Volume + nutriments sans trop de calories.",
      ),
      fillBlank(
        "Les fruits apportent des glucides sous forme de ___.",
        "fructose",
        ["collagène", "fer pur", "lipides"],
        "Sucre naturel du fruit + eau + fibres.",
      ),
      tf(
        "La variété de fruits et légumes compte plus qu'un seul « super-aliment ».",
        true,
        "Vrai : diversité = couverture plus large des besoins.",
      ),
      tf(
        "Les fruits et légumes remplacent totalement les protéines animales.",
        false,
        "Faux : ils complètent l'assiette, ils ne remplacent pas les protéines.",
      ),
    ),
  },
  {
    title: "Féculents",
    subtitle: "Pain, riz, pâtes, pommes de terre.",
    markdown: `Les **féculents** (pain, riz, pâtes, quinoa, pommes de terre, avoine…) sont la principale source de **glucides complexes** dans une alimentation équilibrée. Ils remplissent le glycogène musculaire.

---

Les féculents **complets** (pain complet, riz complet, avoine) contiennent plus de fibres et montent la glycémie plus lentement que les versions raffinées (pain blanc, riz blanc).

---

Pour la musculation, les féculents alimentent les **séries lourdes** et la récupération entre les séances. Un repas avec féculents + protéines + légumes couvre souvent les bases énergétiques.

---

La **portion** compte : un bol de riz n'a pas la même densité calorique qu'une assiette très chargée. Apprendre à estimer les portions aide sans obséder sur chaque gramme.

---

Les féculents ne sont pas « interdits » en période de sèche : c'est la **quantité totale** de calories et la répartition globale qui orientent le corps, pas un aliment isolé.

---

À retenir : féculents = carburant du muscle. Privilégie les versions complètes quand c'est possible, et associe-les à protéines et légumes.`,
    durationSec: 85,
    difficulty: "BEGINNER",
    order: 9,
    xpReward: 25,
    tags: ["feculents", "glucides", "equilibre"],
    ...CP.equilibre,
    questions: quiz6(
      qcm(
        "Les féculents apportent surtout…",
        "Des glucides complexes",
        ["Des protéines pures", "Des lipides uniquement", "De l'eau seule"],
        "Pain, riz, pâtes = source majeure de glucides.",
      ),
      qcm(
        "Les féculents complets par rapport aux raffinés…",
        "Contiennent plus de fibres et montent la glycémie plus lentement",
        ["N'ont aucun glucide", "Sont toujours sans calories", "Remplacent les protéines"],
        "Complet = fibres + énergie plus stable.",
      ),
      qcm(
        "Pour la musculation, les féculents servent surtout à…",
        "Remplir le glycogène musculaire",
        ["Remplacer l'eau", "Produire des hormones seules", "Supprimer le gras automatiquement"],
        "Glycogène = carburant des séries.",
      ),
      fillBlank(
        "Pain, riz, pâtes et pommes de terre sont des exemples de ___.",
        "féculents",
        ["lipides", "vitamines", "oligo-éléments"],
        "Famille glucidique de base de l'assiette.",
      ),
      tf(
        "Un féculent isolé ne fait pas grossir : c'est l'excès calorique global qui compte.",
        true,
        "Vrai : pas d'aliment « coupable » seul.",
      ),
      tf(
        "Les féculents complets et blancs ont exactement le même effet sur la glycémie.",
        false,
        "Faux : les complets montent la glycémie plus lentement grâce aux fibres.",
      ),
    ),
  },
  {
    title: "Sources de protéines",
    subtitle: "Animal, végétal et variété.",
    markdown: `Les **protéines** viennent d'aliments **animaux** (viande, poisson, œufs, produits laitiers) ou **végétaux** (légumineuses, tofu, tempeh, seitan). Chaque source apporte un profil d'acides aminés différent.

---

Les protéines animales sont en général **complètes** (tous les acides aminés essentiels). Les protéines végétales peuvent être combinées (légumineuses + céréales) pour couvrir les besoins.

---

En musculation, l'objectif est un **apport suffisant sur la journée**, pas une source unique. Poulet, œufs, poisson, fromage blanc, lentilles : la diversité évite la lassitude et couvre les micronutriments.

---

Les protéines maigres (blanc de poulet, poisson, tofu) facilitent un apport élevé sans trop de graisses. Les sources plus grasses (saumon, bœuf gras) apportent aussi des lipides utiles.

---

Les **œufs** et les **produits laitiers** sont des options pratiques et abordables. Les **légumineuses** ajoutent fibres et glucides en plus des protéines.

---

À retenir : choisis plusieurs sources de protéines dans la semaine. Animal ou végétal, ce qui compte d'abord, c'est la quantité totale adaptée à ton entraînement.`,
    durationSec: 90,
    difficulty: "BEGINNER",
    order: 10,
    xpReward: 25,
    tags: ["proteines", "sources", "equilibre"],
    ...CP.equilibre,
    questions: quiz6(
      qcm(
        "Des exemples de protéines animales sont…",
        "Viande, poisson et œufs",
        ["Riz et pain", "Huile d'olive seule", "Eau et sel"],
        "Sources animales = profil complet d'acides aminés.",
      ),
      qcm(
        "Des exemples de protéines végétales sont…",
        "Lentilles, tofu et tempeh",
        ["Beurre et crème seuls", "Sucre blanc", "Jus de pomme"],
        "Légumineuses et soy = protéines végétales.",
      ),
      qcm(
        "En musculation, pour les protéines, ce qui compte d'abord c'est…",
        "L'apport total sur la journée",
        ["Une seule source obligatoire", "Ne manger que le soir", "Supprimer les végétaux"],
        "Total journalier > source unique.",
      ),
      fillBlank(
        "Combiner légumineuses et céréales aide à couvrir les ___ essentiels en végétal.",
        "acides aminés",
        ["lipides", "vitamines C", "fibres seules"],
        "Complémentarité végétale classique.",
      ),
      tf(
        "Les protéines végétales peuvent suffire à un sportif avec une alimentation variée.",
        true,
        "Vrai : combinaisons et diversité couvrent les besoins.",
      ),
      tf(
        "Seule la viande rouge apporte des protéines utiles à la musculation.",
        false,
        "Faux : poisson, œufs, laitiers et végétaux conviennent aussi.",
      ),
    ),
  },
  {
    title: "Matières grasses",
    subtitle: "Huiles, oléagineux, poissons gras.",
    markdown: `Les **matières grasses** alimentaires ne se limitent pas au beurre ou à la friture. Huiles, avocat, noix, poissons gras et fromages apportent des lipides essentiels à l'équilibre de l'assiette.

---

Les graisses **insaturées** (huile d'olive, colza, poissons gras, noix) sont associées à une meilleure santé cardiovasculaire. Les graisses **saturées** (beurre, charcuterie) ne sont pas « interdites », mais une consommation excessive peut poser problème à long terme.

---

En musculation, les lipides soutiennent les **hormones** et l'**absorption des vitamines** A, D, E, K. Un apport trop bas pendant longtemps peut nuire à la récupération.

---

Une poignée d'**oléagineux** (amandes, noix) ou un filet d'**huile** sur la salade enrichit un repas sans le rendre lourd. Les **poissons gras** (saumon, sardines) apportent aussi des oméga-3.

---

Les fritures et plats très gras ralentissent la digestion et ajoutent beaucoup de calories rapidement. Ce n'est pas une question morale : c'est une question de **contexte** et de **quantité**.

---

À retenir : intègre des graisses de qualité dans tes repas. Elles complètent protéines et féculents, surtout pour les fonctions hormonales et la satiété.`,
    durationSec: 85,
    difficulty: "BEGINNER",
    order: 11,
    xpReward: 25,
    tags: ["lipides", "huiles", "equilibre"],
    ...CP.equilibre,
    questions: quiz6(
      qcm(
        "Des sources de bonnes graisses alimentaires sont…",
        "Huile d'olive, noix et poissons gras",
        ["Sucre blanc et soda", "Eau gazeuse seule", "Pain blanc sec"],
        "Insaturées + oméga-3 = sources de qualité.",
      ),
      qcm(
        "Les lipides alimentaires aident à absorber…",
        "Les vitamines A, D, E et K",
        ["Uniquement la vitamine C", "Uniquement l'eau", "Aucune vitamine"],
        "Vitamines liposolubles = besoin de graisses.",
      ),
      qcm(
        "En musculation, un apport lipidique trop bas peut…",
        "Nuire aux hormones et à la récupération",
        ["Doubler le muscle automatiquement", "Remplacer les protéines", "Supprimer le besoin de sommeil"],
        "Lipides = hormones + cellules + vitamines.",
      ),
      fillBlank(
        "Les poissons gras comme le saumon apportent des ___.",
        "oméga-3",
        ["protéines seules", "fibres insolubles", "vitamine C pure"],
        "Oméga-3 = inflammation et santé globale.",
      ),
      tf(
        "Toutes les graisses alimentaires doivent être éliminées pour progresser en musculation.",
        false,
        "Faux : le corps a besoin de lipides pour fonctionner.",
      ),
      tf(
        "Une poignée de noix peut enrichir un repas sans le surcharger.",
        true,
        "Vrai : graisses + satiété en petite quantité.",
      ),
    ),
  },
  {
    title: "Laitiers",
    subtitle: "Calcium, protéines et alternatives.",
    markdown: `Les **produits laitiers** (lait, yaourt, fromage, fromage blanc) apportent **calcium**, **protéines** et parfois des vitamines (B2, B12). Ce sont des aliments pratiques pour le sportif.

---

Le **fromage blanc** et le **yaourt grec** concentrent les protéines avec peu de lactose. Pratiques en collation ou au petit-déjeuner pour compléter l'apport protéique.

---

Le **calcium** des laitiers soutient la santé osseuse, importante sous charges lourdes (squat, soulevé de terre). Ce n'est pas réservé aux enfants : l'adulte qui s'entraîne en a aussi besoin.

---

Les **alternatives végétales** (boisson de soja, amande, avoine) existent pour ceux qui ne consomment pas de lait animal. Vérifie qu'elles sont **enrichies en calcium** si elles remplacent les laitiers.

---

Certaines personnes ne **digèrent pas** bien le lactose. Yaourts, fromages affinés ou alternatives végétales peuvent convenir mieux qu'un grand verre de lait.

---

À retenir : laitiers ou alternatives enrichies = protéines + calcium. Utiles mais pas obligatoires si tu couvres ces apports autrement.`,
    durationSec: 80,
    difficulty: "BEGINNER",
    order: 12,
    xpReward: 25,
    tags: ["laitiers", "calcium", "equilibre"],
    ...CP.equilibre,
    questions: quiz6(
      qcm(
        "Les produits laitiers apportent surtout…",
        "Calcium et protéines",
        ["Uniquement du sucre", "Uniquement des lipides", "Aucun nutriment"],
        "Laitiers = calcium + protéines pratiques.",
      ),
      qcm(
        "Le fromage blanc est intéressant pour le sportif car…",
        "Il concentre les protéines avec peu de lactose",
        ["Il n'a aucune protéine", "Il remplace l'eau", "Il supprime le gras"],
        "Option protéinée pratique et abordable.",
      ),
      qcm(
        "Une boisson végétale qui remplace le lait devrait idéalement…",
        "Être enrichie en calcium",
        ["Ne contenir que de l'eau", "Remplacer les légumes", "Ne jamais être consommée"],
        "Enrichissement = compenser le calcium du lait.",
      ),
      fillBlank(
        "Le calcium des laitiers soutient la santé ___.",
        "osseuse",
        ["capillaire", "uniquement dentaire chez l'enfant", "des ongles seule"],
        "Os solides = important sous charge.",
      ),
      tf(
        "Les laitiers sont la seule source de calcium possible.",
        false,
        "Faux : légumes verts, tofu, sardines et alternatives enrichies en apportent aussi.",
      ),
      tf(
        "Certaines personnes digèrent mal le lactose et peuvent préférer des alternatives.",
        true,
        "Vrai : intolérance au lactose = adapter les sources.",
      ),
    ),
  },
  {
    title: "Fibres",
    subtitle: "Introduction aux fibres alimentaires.",
    markdown: `Les **fibres** sont des glucides que le corps ne digère pas complètement. Elles se trouvent surtout dans les légumes, fruits, légumineuses, céréales complètes et oléagineux.

---

Il existe deux grandes familles : fibres **solubles** (avoine, pommes, légumineuses) et **insolubles** (blé complet, légumes crus). Les deux contribuent à une digestion saine.

---

Les fibres **ralentissent** l'absorption du glucose et prolongent la **satiété**. Utile quand tu veux tenir plusieurs heures sans fringale entre deux repas.

---

Un apport suffisant en fibres soutient le **transit intestinal** régulier. Un ventre qui fonctionne bien, c'est aussi une meilleure récupération et moins d'inconfort à la salle.

---

Augmente les fibres **progressivement** et bois suffisamment : un bond brutal (beaucoup de légumineuses d'un coup) peut provoquer des ballonnements.

---

À retenir : fibres = légumes, fruits, complets, légumineuses. Introduction douce, eau suffisante, et tu poseras les bases avant d'aller plus loin sur le microbiote.`,
    durationSec: 85,
    difficulty: "BEGINNER",
    order: 13,
    xpReward: 25,
    tags: ["fibres", "digestion", "equilibre"],
    ...CP.equilibre,
    questions: quiz6(
      qcm(
        "Les fibres alimentaires se trouvent surtout dans…",
        "Légumes, fruits et céréales complètes",
        ["Huile pure", "Eau", "Viande seule"],
        "Végétaux = source principale de fibres.",
      ),
      qcm(
        "Les fibres solubles se trouvent par exemple dans…",
        "L'avoine et les légumineuses",
        ["Sucre blanc", "Beurre", "Eau minérale"],
        "Solubles = avoine, pommes, lentilles…",
      ),
      qcm(
        "Les fibres aident notamment à…",
        "Prolonger la satiété et soutenir le transit",
        ["Remplacer les protéines", "Produire du muscle directement", "Supprimer le besoin d'eau"],
        "Satiété + digestion = rôles clés des fibres.",
      ),
      fillBlank(
        "Le corps ne digère pas complètement les ___.",
        "fibres",
        ["lipides", "protéines", "vitamines"],
        "Fibres = glucides non entièrement absorbés.",
      ),
      tf(
        "Augmenter les fibres d'un coup en grande quantité peut causer des ballonnements.",
        true,
        "Vrai : progression douce + eau = meilleure tolérance.",
      ),
      tf(
        "Les fibres apportent des calories comme les glucides digestibles.",
        false,
        "Faux : la majeure partie n'est pas absorbée comme énergie.",
      ),
    ),
  },
  {
    title: "Hydratation",
    subtitle: "Boire au quotidien.",
    markdown: `L'**hydratation** ne se résume pas à boire pendant la séance. C'est un réflexe **quotidien** : le corps fonctionne mieux quand il est hydraté en continu.

---

Une estimation courante : environ **30 à 40 ml par kg** de poids de corps par jour, plus en cas de chaleur ou de séance intense. Ce n'est pas une règle rigide : adapte selon ta soif, ta sueur et la couleur de tes urines.

---

Répartis les boissons sur la journée : verre au réveil, avec les repas, avant et après la salle. Attendre d'avoir soif en séance, c'est souvent déjà un peu tard.

---

L'**eau** reste la base. Thé, café (avec modération), eaux aromatisées sans sucre conviennent aussi. Sodas, jus industriels et alcool ajoutent des calories sans toujours hydrater efficacement.

---

En séance courte de musculation (< 90 min), l'eau suffit en général. Séance longue ou chaleur : petites gorgées régulières, parfois une boisson avec un peu de sodium.

---

À retenir : hydratation = habitude quotidienne, pas seulement bidon à la salle. Urine claire, boire régulièrement, adapter à la chaleur et à l'effort.`,
    durationSec: 80,
    difficulty: "BEGINNER",
    order: 14,
    xpReward: 25,
    tags: ["hydratation", "eau", "equilibre"],
    ...CP.equilibre,
    questions: quiz6(
      qcm(
        "Une bonne hydratation au quotidien, c'est…",
        "Boire régulièrement sur toute la journée",
        ["Boire uniquement à la salle", "Ne boire que quand on a très soif", "Remplacer l'eau par du soda"],
        "Hydratation = habitude continue.",
      ),
      qcm(
        "Un indicateur simple d'hydratation correcte est…",
        "Une urine claire en journée",
        ["Ne jamais uriner", "Une urine toujours foncée", "Boire 10 L d'un coup"],
        "Couleur de l'urine = repère accessible.",
      ),
      qcm(
        "Pour une séance de musculation classique (< 90 min)…",
        "L'eau suffit en général",
        ["Il faut toujours une boisson sucrée", "Il ne faut jamais boire", "Seul l'alcool hydrate"],
        "Séance standard = eau adaptée.",
      ),
      fillBlank(
        "En cas de chaleur ou de séance intense, les besoins en ___ augmentent.",
        "eau",
        ["protéines", "sel seul", "fibres"],
        "Transpiration = pertes hydriques accrues.",
      ),
      tf(
        "Le café compte dans l'apport liquidien, avec modération.",
        true,
        "Vrai : café = eau + caféine ; modération conseillée.",
      ),
      tf(
        "L'hydratation ne concerne que les minutes passées à la salle.",
        false,
        "Faux : c'est un réflexe sur toute la journée.",
      ),
    ),
  },
  {
    title: "Journée équilibrée",
    subtitle: "À quoi ressemble une assiette type.",
    markdown: `Une **journée alimentaire équilibrée** combine protéines, féculents, légumes, fruits, lipides de qualité et eau. Ce n'est pas un régime strict : c'est un **modèle** adaptable.

---

Au **petit-déjeuner** : protéines (œufs, yaourt) + féculent ou fruit (pain complet, flocons) + un peu de lipides (noix, avocat). Énergie stable pour la matinée ou la séance tôt.

---

Au **déjeuner et dîner** : une **demi-assiette de légumes**, un **quart de protéines** (poulet, poisson, tofu), un **quart de féculents** (riz, pâtes, patate). Modèle simple, pas une règle absolue.

---

Les **collations** (fruit, yaourt, poignée d'amandes) comblent les troues sans attendre le repas suivant en affamé. Utile si tu t'entraînes entre deux repas.

---

L'**eau** accompagne chaque repas. Les **fibres** viennent des légumes, fruits et complets. Les **lipides** : huile sur la salade, poisson gras une à deux fois par semaine.

---

En musculation, ce modèle laisse de la place pour ajuster les **quantités** selon tes objectifs plus tard (maintien, surplus, déficit). D'abord, la **structure** de l'assiette.

---

À retenir : demi-assiette légumes, quart protéines, quart féculents, eau régulière. Un repère concret pour passer de la théorie à l'assiette.`,
    durationSec: 95,
    difficulty: "BEGINNER",
    order: 15,
    xpReward: 25,
    tags: ["equilibre", "assiette", "quotidien"],
    ...CP.equilibre,
    questions: quiz6(
      qcm(
        "Un repas équilibré type combine…",
        "Protéines, féculents, légumes et lipides de qualité",
        ["Uniquement de la viande", "Uniquement du pain", "Uniquement de l'eau"],
        "Structure = macros + légumes + eau.",
      ),
      qcm(
        "Le modèle « demi-assiette légumes » signifie…",
        "Environ la moitié de l'assiette en légumes",
        ["Aucun légume", "Uniquement de la viande", "Supprimer les féculents"],
        "Repère visuel simple pour équilibrer.",
      ),
      qcm(
        "Une collation utile entre deux repas peut être…",
        "Un fruit ou un yaourt",
        ["Uniquement un soda", "Rien du tout systématiquement", "Uniquement de l'alcool"],
        "Collation légère = énergie sans repas lourd.",
      ),
      fillBlank(
        "Avant d'ajuster surplus ou déficit, il faut d'abord maîtriser la ___ de l'assiette.",
        "structure",
        ["couleur", "marque", "publicité"],
        "Structure d'abord, quantités ensuite.",
      ),
      tf(
        "Une journée équilibrée inclut de l'eau répartie sur la journée.",
        true,
        "Vrai : hydratation = partie intégrante du quotidien.",
      ),
      tf(
        "Un repas équilibré exclut totalement les féculents.",
        false,
        "Faux : féculents = part importante du carburant musculaire.",
      ),
    ),
  },
];
