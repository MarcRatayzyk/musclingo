import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_1_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Vitamines",
    subtitle: "Petites molécules, grands rôles.",
    markdown: `Les **vitamines** sont des micronutriments indispensables en petites quantités. Le corps ne peut pas (ou pas suffisamment) les fabriquer : il faut les trouver dans l'alimentation.

---

Il existe deux grandes familles : les vitamines **hydrosolubles** (B, C), éliminées plus facilement par l'urine, et les vitamines **liposolubles** (A, D, E, K), stockées dans le corps et absorbées avec des graisses.

---

Chaque vitamine a un rôle précis : la **vitamine D** aide à fixer le calcium sur les os, la **vitamine C** participe à la réparation des tissus, les vitamines **B** interviennent dans la production d'énergie à partir des aliments.

---

En musculation, une carence en vitamine D ou en vitamines B peut réduire l'énergie disponible, la récupération ou la solidité osseuse sous charge. Ce ne sont pas des « boosters magiques », mais des cofacteurs essentiels.

---

Les fruits, légumes, produits animaux et exposition au soleil (pour la vitamine D) couvrent la plupart des besoins. Manger varié reste la base, plutôt que mémoriser chaque vitamine par cœur.

---

À retenir : les vitamines soutiennent l'énergie, la réparation et la santé osseuse. L'objectif est de comprendre pourquoi elles comptent, pas de tout apprendre d'un coup.`,
    durationSec: 90,
    difficulty: "BEGINNER",
    order: 4,
    xpReward: 25,
    tags: ["vitamines", "micronutriments"],
    sources: [
      "Institute of Medicine — Dietary Reference Intakes for vitamins (2000)",
    ],
    ...CP.micronutriments,
    questions: quiz6(
      qcm(
        "Les vitamines sont des nutriments…",
        "Nécessaires en petites quantités",
        ["Inutiles pour le sport", "Remplaçant les protéines", "Stockés uniquement dans le muscle"],
        "Micronutriments = besoins faibles mais essentiels.",
      ),
      qcm(
        "Les vitamines A, D, E et K sont…",
        "Liposolubles",
        ["Hydrosolubles", "Des protéines", "Des glucides"],
        "Elles s'absorbent avec des graisses alimentaires.",
      ),
      qcm(
        "La vitamine D aide surtout à…",
        "Fixer le calcium sur les os",
        ["Produire du glycogène", "Remplacer les protéines", "Stocker l'eau"],
        "Vitamine D + calcium = santé osseuse sous charge.",
      ),
      fillBlank(
        "Les vitamines B participent à la production d'___ à partir des aliments.",
        "énergie",
        ["gras", "cheveux", "sueur"],
        "Cofacteurs du métabolisme énergétique.",
      ),
      tf(
        "Une alimentation variée couvre généralement les besoins en vitamines.",
        true,
        "Vrai : fruits, légumes et produits animaux apportent l'essentiel.",
      ),
      tf(
        "Le corps fabrique toutes les vitamines dont il a besoin.",
        false,
        "Faux : la plupart doivent venir de l'alimentation (ou du soleil pour la D).",
      ),
    ),
  },
  {
    title: "Minéraux",
    subtitle: "Calcium, magnésium, sodium et plus.",
    markdown: `Les **minéraux** (calcium, magnésium, sodium, potassium…) sont des sels et métaux que le corps utilise pour des fonctions vitales : os solides, contraction musculaire, équilibre des fluides.

---

Le **calcium** structure les os et intervient dans la contraction musculaire. Sous barre lourde, des os solides et des muscles qui se contractent bien, c'est la base mécanique de la force.

---

Le **magnésium** participe à plus de 300 réactions dans le corps, dont la production d'énergie et la relaxation musculaire. Une carence peut se traduire par des crampes ou une fatigue accrue.

---

Le **sodium** et le **potassium** régulent l'équilibre hydrique et la transmission nerveuse. Tu perds du sodium en transpirant à la salle : une hydratation adaptée compte, surtout en séance longue ou par forte chaleur.

---

Les minéraux se trouvent dans les produits laitiers (calcium), les légumes verts (magnésium), les fruits (potassium), le sel (sodium). Une alimentation équilibrée couvre en général les besoins.

---

À retenir : les minéraux soutiennent os, muscles et nerfs. Ils ne remplacent pas l'entraînement, mais un manque peut limiter performance et récupération.`,
    durationSec: 90,
    difficulty: "BEGINNER",
    order: 5,
    xpReward: 25,
    tags: ["mineraux", "calcium", "magnesium"],
    ...CP.micronutriments,
    questions: quiz6(
      qcm(
        "Le calcium sert surtout à…",
        "Structurer les os et aider la contraction musculaire",
        ["Produire du glucose", "Remplacer les lipides", "Stocker les protéines"],
        "Os solides + contraction = base de la force.",
      ),
      qcm(
        "Le magnésium intervient notamment dans…",
        "La production d'énergie et la relaxation musculaire",
        ["La digestion des fibres seules", "Le stockage du gras uniquement", "La croissance des cheveux"],
        "Cofacteur clé pour muscles et métabolisme.",
      ),
      qcm(
        "En transpirant à la salle, on perd surtout…",
        "De l'eau et du sodium",
        ["Uniquement des protéines", "Uniquement des vitamines", "Rien du tout"],
        "Sueur = eau + sels minéraux.",
      ),
      fillBlank(
        "Le ___ et le potassium régulent l'équilibre hydrique du corps.",
        "sodium",
        ["calcium", "fer", "zinc"],
        "Électrolytes = fluides et transmission nerveuse.",
      ),
      tf(
        "Les minéraux participent à la contraction musculaire.",
        true,
        "Vrai : calcium, sodium et potassium sont essentiels au muscle.",
      ),
      tf(
        "Supprimer tout le sel de l'alimentation est toujours bénéfique pour le sportif.",
        false,
        "Faux : le sodium a un rôle ; l'excès comme la carence posent problème.",
      ),
    ),
  },
  {
    title: "Oligo-éléments",
    subtitle: "Fer, zinc, sélénium en traces.",
    markdown: `Les **oligo-éléments** (ou oligo-minéraux) sont des minéraux nécessaires en **très petites quantités** : fer, zinc, cuivre, sélénium, iode… Le préfixe « oligo » signifie « en traces ».

---

Le **fer** transporte l'oxygène dans le sang via l'hémoglobine. Sans fer suffisant, tu fatigues plus vite à l'entraînement, même si tes muscles sont forts.

---

Le **zinc** intervient dans la réparation des tissus, le système immunitaire et la production de certaines hormones. Il est présent dans la viande, les fruits de mer, les légumineuses.

---

Le **sélénium** et le **cuivre** participent à des réactions antioxydantes et au métabolisme. Le **iode** est indispensable à la thyroïde, qui régule le métabolisme de base.

---

Les carences en oligo-éléments sont rares avec une alimentation variée, mais possibles (régimes très restrictifs, grosses pertes de sang chez certaines personnes). L'excès de suppléments peut aussi être dangereux.

---

À retenir : en traces, les oligo-éléments soutiennent oxygénation, immunité et métabolisme. Manger varié suffit le plus souvent, sans viser des doses « sport » au hasard.`,
    durationSec: 85,
    difficulty: "BEGINNER",
    order: 6,
    xpReward: 25,
    tags: ["oligo-elements", "fer", "zinc"],
    ...CP.micronutriments,
    questions: quiz6(
      qcm(
        "Le fer sert surtout à…",
        "Transporter l'oxygène dans le sang",
        ["Stocker le glycogène", "Fabriquer les os", "Produire de l'eau"],
        "Fer = hémoglobine = oxygène vers les muscles.",
      ),
      qcm(
        "Le zinc intervient notamment dans…",
        "La réparation des tissus et l'immunité",
        ["La digestion des lipides seule", "Le stockage du calcium", "La production de sueur"],
        "Zinc = réparation + défenses immunitaires.",
      ),
      qcm(
        "« Oligo-élément » signifie qu'on en a besoin…",
        "En très petites quantités",
        ["En kilogrammes par jour", "Uniquement en complément", "Jamais"],
        "Oligo = traces, mais essentielles.",
      ),
      fillBlank(
        "L'___ est indispensable au bon fonctionnement de la thyroïde.",
        "iode",
        ["fer", "zinc", "calcium"],
        "Thyroïde = régulation du métabolisme de base.",
      ),
      tf(
        "Une carence en fer peut réduire l'endurance à l'entraînement.",
        true,
        "Vrai : moins d'oxygène transporté = fatigue plus rapide.",
      ),
      tf(
        "Plus on prend d'oligo-éléments en supplément, mieux c'est pour la performance.",
        false,
        "Faux : l'excès peut être toxique ; l'alimentation variée suffit souvent.",
      ),
    ),
  },
  {
    title: "Eau",
    subtitle: "Le micronutriment oublié.",
    markdown: `L'**eau** n'apporte pas de calories, mais c'est le composant majoritaire du corps (environ 60 % chez l'adulte). Sans eau suffisante, rien ne fonctionne correctement.

---

L'eau transporte les nutriments, élimine les déchets, régule la température corporelle et lubrifie les articulations. En séance, tu perds de l'eau par la sueur : la déshydratation baisse la force et la concentration.

---

Les besoins varient selon le poids, la chaleur et l'activité. Une règle simple : urine claire en journée = bon signe d'hydratation. Soif = signal tardif : boire régulièrement vaut mieux qu'attendre d'avoir soif.

---

Avant la salle, une hydratation correcte évite de partir « à sec ». Pendant l'effort (séance longue ou chaleur), de petites gorgées régulières aident. Après, reconstituer les pertes soutient la récupération.

---

L'eau seule suffit la plupart du temps. Les boissons sucrées ou très caféinées ne remplacent pas une hydratation de base, et ajoutent parfois des calories inutiles.

---

À retenir : l'eau est la base de toutes les fonctions corporelles. Bien s'hydrater, c'est un levier simple pour performer et récupérer à la salle.`,
    durationSec: 80,
    difficulty: "BEGINNER",
    order: 7,
    xpReward: 25,
    tags: ["eau", "hydratation"],
    sources: [
      "Sawka et al. — ACSM Position Stand on exercise and fluid replacement (2007)",
    ],
    ...CP.micronutriments,
    questions: quiz6(
      qcm(
        "L'eau sert notamment à…",
        "Transporter les nutriments et réguler la température",
        ["Remplacer les protéines", "Produire du muscle directement", "Stocker le glycogène"],
        "Eau = transport, thermorégulation, élimination.",
      ),
      qcm(
        "En séance de musculation, on perd surtout de l'eau par…",
        "La sueur",
        ["Les cheveux", "Les os", "Les ongles"],
        "Transpiration = perte hydrique à compenser.",
      ),
      qcm(
        "Un bon indicateur d'hydratation en journée est…",
        "Une urine claire",
        ["Une urine très foncée en permanence", "Ne jamais avoir soif", "Boire uniquement du soda"],
        "Couleur de l'urine = repère simple et accessible.",
      ),
      fillBlank(
        "La soif est un signal ___ : il vaut mieux boire régulièrement.",
        "tardif",
        ["précis", "inutile", "nocturne"],
        "Quand tu as soif, tu es déjà un peu déshydraté.",
      ),
      tf(
        "La déshydratation peut réduire la performance à l'entraînement.",
        true,
        "Vrai : moins de fluides = moins de force et de concentration.",
      ),
      tf(
        "L'eau apporte des calories comme les glucides.",
        false,
        "Faux : l'eau = 0 kcal, contrairement aux macronutriments.",
      ),
    ),
  },
];
