import type { RecuperationSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_4_LESSONS: RecuperationSeedLesson[] = [
  {
    title: "Hydratation et récupération",
    subtitle: "Un facteur souvent sous-estimé.",
    markdown: `Une **déshydratation**, même légère (autour de 2 % du poids de corps), peut réduire la performance et augmenter la sensation de fatigue à l'entraînement.

---

L'eau participe au transport des **nutriments** vers les muscles et à l'élimination de certains déchets métaboliques produits pendant l'effort.

---

Les besoins en eau varient selon la chaleur, la transpiration et la durée de séance : il n'existe pas de volume unique valable pour tout le monde.

---

Boire uniquement **pendant** l'entraînement ne suffit généralement pas : une hydratation répartie sur la journée est plus efficace qu'un rattrapage ponctuel.

---

À retenir : l'hydratation est un facteur simple mais souvent négligé du bilan global de récupération.`,
    durationSec: 80,
    difficulty: "BEGINNER",
    order: 0,
    xpReward: 25,
    tags: ["hydratation"],
    sources: ["Sawka et al. — Exercise and fluid replacement (2007)"],
    ...CP.outils,
    questions: quiz6(
      qcm(
        "Une déshydratation légère (environ 2 % du poids) peut…",
        "Réduire la performance et augmenter la fatigue",
        ["N'avoir aucun effet mesurable", "Toujours améliorer l'endurance", "Remplacer l'effet du sommeil"],
        "Même une perte hydrique modeste affecte la performance.",
      ),
      qcm(
        "L'eau participe notamment à…",
        "Transporter des nutriments et éliminer des déchets métaboliques",
        ["Construire directement le muscle", "Remplacer les protéines", "Produire des hormones de croissance"],
        "Rôle de transport et d'élimination, pas de construction directe.",
      ),
      qcm(
        "Pour une bonne hydratation, il est généralement préférable de…",
        "Répartir la boisson sur la journée",
        ["Boire uniquement pendant l'entraînement", "Ne boire qu'au réveil", "Éviter de boire les jours de repos"],
        "Une hydratation répartie est plus efficace qu'un rattrapage ponctuel.",
      ),
      fillBlank(
        "Les besoins en eau varient selon la chaleur, la transpiration et la ___ de séance.",
        "durée",
        ["couleur", "musique", "marque"],
        "Ces facteurs font varier les besoins individuels.",
      ),
      tf(
        "Il existe un volume d'eau unique valable pour tout le monde, sans variation.",
        false,
        "Faux : les besoins varient selon plusieurs facteurs individuels.",
      ),
      tf(
        "Boire uniquement pendant l'entraînement suffit généralement à couvrir les besoins.",
        false,
        "Faux : une hydratation répartie sur la journée est plus efficace.",
      ),
    ),
  },
  {
    title: "Récupération active",
    subtitle: "Marcher > canapé absolu.",
    markdown: `La **récupération active** consiste à bouger légèrement (marche, vélo léger, mobilité douce) lors d'un jour de repos, plutôt que de rester totalement immobile.

---

Un mouvement léger favorise la **circulation sanguine**, ce qui peut aider à évacuer certains déchets métaboliques plus vite qu'une immobilité complète.

---

Elle aide aussi à maintenir une **routine** et une sensation de « corps qui bouge », utile pour la motivation sur la durée d'un programme.

---

Ce n'est pas un remplacement du repos complet : la récupération active reste **légère**, sans ajouter de fatigue significative à gérer par-dessus l'entraînement.

---

À retenir : un jour off n'impose pas l'immobilité totale — un mouvement léger peut au contraire soutenir la récupération.`,
    durationSec: 75,
    difficulty: "INTERMEDIATE",
    order: 1,
    xpReward: 30,
    tags: ["recuperation-active"],
    sources: ["Dupuy et al. — Effect of recovery methods on performance (2018)"],
    ...CP.outils,
    questions: quiz6(
      qcm(
        "Une récupération active typique est…",
        "Une marche ou mobilité légère",
        ["Un entraînement intense supplémentaire", "Une immobilité stricte", "Un jeûne prolongé"],
        "L'objectif est un mouvement léger, pas un nouvel effort intense.",
      ),
      qcm(
        "Le mouvement léger d'un jour de repos favorise surtout…",
        "La circulation sanguine",
        ["La croissance osseuse directe", "La digestion des protéines uniquement", "Le sommeil profond immédiat"],
        "Une meilleure circulation peut aider à évacuer des déchets métaboliques.",
      ),
      qcm(
        "La récupération active doit rester…",
        "Légère, sans ajouter de fatigue significative",
        ["Aussi intense qu'une séance normale", "Plus dure que l'entraînement habituel", "Suffisamment dure pour créer des DOMS"],
        "Le but est de soutenir la récupération, pas de la compromettre.",
      ),
      fillBlank(
        "La récupération active aide à maintenir une ___ d'entraînement et la motivation sur la durée.",
        "routine",
        ["dette", "pénurie", "panne"],
        "Bouger légèrement entretient la routine et la motivation d'un programme.",
      ),
      tf(
        "Le jour off impose l'immobilité totale au lit.",
        false,
        "Faux : le mouvement léger aide souvent.",
      ),
      tf(
        "La récupération active peut aider à maintenir la routine d'entraînement.",
        true,
        "Vrai : elle soutient la motivation sur la durée.",
      ),
    ),
  },
  {
    title: "Auto-massage et foam rolling",
    subtitle: "Effet local, pas magique.",
    markdown: `Le **foam rolling** (rouleau de massage) applique une pression sur les muscles, ce qui peut réduire temporairement la sensation de raideur perçue après l'effort.

---

Son effet principal semble être surtout **sensoriel et neurologique** (perception de détente), plus qu'un changement structurel durable du tissu musculaire.

---

Utilisé avant une séance, il peut légèrement améliorer l'amplitude de mouvement à court terme, sans les inconvénients d'un étirement statique trop long.

---

Ses bénéfices sur les DOMS restent **modestes** : il ne remplace ni le sommeil, ni une gestion adaptée du volume d'entraînement.

---

À retenir : le foam rolling est un outil complémentaire pour le confort et l'amplitude à court terme, pas une solution miracle de récupération.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 2,
    xpReward: 30,
    tags: ["foam-rolling", "massage"],
    sources: ["Wiewelhove et al. — Effects of foam rolling (2019)"],
    ...CP.outils,
    questions: quiz6(
      qcm(
        "L'effet principal du foam rolling semble être…",
        "Surtout sensoriel et neurologique",
        ["Une transformation structurelle durable du muscle", "Une augmentation directe de la masse musculaire", "Un remplacement du sommeil"],
        "L'effet passe surtout par la perception, pas la structure tissulaire.",
      ),
      qcm(
        "Utilisé avant une séance, le foam rolling peut…",
        "Légèrement améliorer l'amplitude à court terme",
        ["Remplacer totalement l'échauffement", "Réduire durablement la force", "Éliminer les DOMS futures"],
        "Effet modéré et temporaire sur l'amplitude.",
      ),
      qcm(
        "Sur les DOMS, l'effet du foam rolling est…",
        "Modeste",
        ["Total : elles disparaissent complètement", "Nul, aucun effet mesuré", "Négatif, il aggrave toujours les DOMS"],
        "Un effet limité, pas une élimination complète.",
      ),
      fillBlank(
        "Le foam rolling est un outil ___, pas une solution miracle.",
        "complémentaire",
        ["indispensable", "inutile", "dangereux"],
        "Il s'ajoute à d'autres leviers de récupération, sans les remplacer.",
      ),
      tf(
        "Le foam rolling remplace le sommeil et la gestion du volume d'entraînement.",
        false,
        "Faux : ses bénéfices sur les DOMS restent modestes.",
      ),
      tf(
        "Le foam rolling peut réduire temporairement la sensation de raideur perçue.",
        true,
        "Vrai : c'est son effet le plus documenté.",
      ),
    ),
  },
  {
    title: "Froid et chaud",
    subtitle: "Cryothérapie, bain froid, sauna.",
    markdown: `L'exposition au **froid** (bain froid, cryothérapie) après l'effort peut réduire la sensation de douleur et l'inflammation perçue à court terme.

---

Utilisée trop systématiquement après **chaque** séance de musculation, elle peut cependant atténuer certains signaux nécessaires à l'adaptation musculaire sur le long terme.

---

La **chaleur** (sauna, bain chaud) favorise plutôt la détente musculaire et la circulation sanguine, avec un effet perçu sur le confort et la relaxation.

---

Ni le froid ni le chaud ne remplacent le sommeil, la nutrition ou une charge d'entraînement bien dosée : ce sont des outils d'appoint, pas des piliers.

---

À retenir : froid et chaud peuvent aider ponctuellement au confort, mais un usage systématique du froid mérite d'être réfléchi selon l'objectif (performance immédiate vs adaptation musculaire).`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 3,
    xpReward: 35,
    tags: ["froid", "chaud", "cryotherapie", "sauna"],
    sources: ["Roberts et al. — Cold water immersion and muscle adaptation (2015)"],
    ...CP.outils,
    questions: quiz6(
      qcm(
        "L'exposition au froid après l'effort peut…",
        "Réduire la douleur et l'inflammation perçues à court terme",
        ["Toujours améliorer la prise de muscle à long terme", "Remplacer le sommeil", "Éliminer totalement la fatigue"],
        "Effet perçu à court terme sur douleur et inflammation.",
      ),
      qcm(
        "Utilisé systématiquement après chaque séance de musculation, le froid peut…",
        "Atténuer certains signaux utiles à l'adaptation musculaire",
        ["Toujours accélérer la prise de masse", "N'avoir aucun effet sur l'adaptation", "Remplacer la nutrition"],
        "Un usage trop systématique peut nuire à l'adaptation sur le long terme.",
      ),
      qcm(
        "La chaleur (sauna, bain chaud) favorise surtout…",
        "La détente musculaire et la circulation",
        ["La construction directe de muscle", "La combustion immédiate de graisse", "Le remplacement du repas post-entraînement"],
        "Effet principalement sur le confort et la circulation.",
      ),
      fillBlank(
        "Le froid et le chaud sont des outils d'___, pas des piliers de récupération.",
        "appoint",
        ["obligation", "interdiction", "urgence"],
        "Ils complètent sommeil, nutrition et charge d'entraînement.",
      ),
      tf(
        "Le froid après l'effort remplace avantageusement le sommeil et la nutrition.",
        false,
        "Faux : ce sont des outils complémentaires, pas des remplacements.",
      ),
      tf(
        "Un usage systématique du froid après chaque séance de musculation mérite d'être réfléchi.",
        true,
        "Vrai : il peut atténuer certains signaux d'adaptation.",
      ),
    ),
  },
];
