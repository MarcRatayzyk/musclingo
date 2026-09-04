import type { AnatomieSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_3_QUIZZES } from "./theme-3-articulations-questions";

export const THEME_3_LESSONS: AnatomieSeedLesson[] = [
  {
    title: "L'épaule",
    subtitle: "Glenohumérale et stabilité scapulaire.",
    markdown: `L'épaule est l'articulation la plus mobile du corps. C'est sa force — et son point faible.

---

L'articulation **glenohumérale** emboîte la tête de l'humérus dans la glène de l'omoplate. Le mot « emboîter » est généreux : la glène est une cuvette très peu profonde, comme une balle de golf posée sur un tee. D'où cette amplitude énorme dans toutes les directions.

---

La contrepartie : presque rien ne tient l'épaule par l'os. Sa stabilité vient des tissus — les ligaments, la **coiffe des rotateurs** qui plaque la tête humérale dans la glène, et le contrôle de l'omoplate, qui oriente la cuvette au bon endroit.

---

Concrètement : avant un développé lourd, fixe tes omoplates, abaissées et rapprochées. Tu offres à la tête de l'humérus un socle stable au lieu de la laisser flotter.

---

Une épaule très mobile sans contrôle, c'est une amplitude qui finit par se payer.`,
    durationSec: 60,
    difficulty: "INTERMEDIATE",
    order: 19,
    xpReward: 30,
    tags: ["epaule", "articulation"],
    illustrationUrl: "/uploads/articulation-epaule.png",
    ...CP.articulations,
    questions: THEME_3_QUIZZES[0]
  },
  {
    title: "Coude et poignet",
    subtitle: "Charnière et prono-supination.",
    markdown: `Le coude est une charnière : il plie, il tend, c'est à peu près tout. Et cette simplicité en fait une articulation stable et fiable.

---

La rotation que tu crois venir du coude — paume vers le haut (**supination**) ou vers le bas (**pronation**) — vient en réalité du pivot radio-ulnaire : le radius tourne autour de l'ulna, sur toute la longueur de l'avant-bras.

---

Le **poignet**, lui, raffine. Ses petits os du carpe lui permettent d'orienter finement la main dans tous les plans. Une prise confortable en curl ou en développé dépend souvent d'un poignet bien aligné, ni cassé en arrière ni verrouillé.

---

Quand le coude fait mal en musculation, c'est rarement l'articulation elle-même : ce sont presque toujours les tendons qui s'y accrochent, surmenés par le volume de prise ou une progression trop rapide.

---

Réduire temporairement la charge, varier les prises, laisser le tendon s'adapter : la routine anti-douleur du coude tient en trois gestes.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 20,
    xpReward: 30,
    tags: ["coude", "poignet"],
    ...CP.articulations,
    questions: THEME_3_QUIZZES[1]
  },
  {
    title: "La hanche",
    subtitle: "Emboîture profonde, mobilité et stabilité.",
    illustrationUrl: "/uploads/articulation-hanche.png",
    markdown: `Épaule et hanche sont toutes deux des articulations « en boule ». Mais la hanche a fait le choix inverse.

---

L'articulation **coxo-fémorale** loge la tête du fémur dans l'**acétabulum**, cette cavité profonde du bassin croisée dans les leçons sur les os. Emboîture profonde = grande stabilité osseuse, au prix d'une mobilité moindre que l'épaule.

---

Elle bouge quand même dans tous les plans : flexion et extension, abduction, et des rotations interne et externe souvent oubliées à l'entraînement.

---

Pour le squat, cette architecture explique beaucoup. Descendre profond exige assez de flexion de hanche ET un bassin contrôlé : si la hanche arrive en butée, c'est le bas du dos qui s'enroule pour compenser.

---

Et comme la forme de l'acétabulum varie selon les individus, la position idéale — largeur d'appuis, orientation des pieds — se cherche : c'est celle où tes hanches descendent sans forcer ton dos à plier.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 21,
    xpReward: 30,
    tags: ["hanche"],
    ...CP.articulations,
    questions: THEME_3_QUIZZES[2]
  },
  {
    title: "Le genou",
    subtitle: "Ligaments croisés, collatéraux et ménisques.",
    illustrationUrl: "/uploads/articulation-genou.png",
    markdown: `Le genou vit entre deux géants — la hanche et la cheville — et encaisse ce que les deux lui imposent.

---

C'est une charnière modifiée : flexion, extension, plus une légère rotation quand il est fléchi. Entre fémur et tibia, les **ménisques**, deux coussinets de cartilage, amortissent et améliorent le contact entre des surfaces qui s'emboîtent mal naturellement.

---

Quatre ligaments verrouillent l'ensemble : les croisés — **LCA** devant, **LCP** derrière — contrôlent le glissement avant-arrière du tibia ; les **collatéraux** tiennent les côtés.

---

En musculation, le genou souffre rarement de la flexion elle-même. Il souffre du désalignement : un genou qui plonge vers l'intérieur en squat ou en fente combine appui, torsion et valgus — le cocktail que ses ligaments n'aiment pas.

---

La règle simple : hanche, genou et pied alignés. Et des quadriceps et ischios forts, qui restent la meilleure assurance du genou.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 22,
    xpReward: 30,
    tags: ["genou"],
    ...CP.articulations,
    questions: THEME_3_QUIZZES[3]
  },
  {
    title: "La cheville",
    subtitle: "Tibio-talienne et rôle en appui.",
    markdown: `Talons qui décollent au fond du squat, buste qui plonge ? Le coupable est souvent tout en bas : la cheville.

---

L'articulation **tibio-talienne** — le tibia posé sur le talus — gère deux mouvements principaux : pointer le pied (flexion plantaire) et le relever vers le tibia (**dorsiflexion**).

---

C'est la dorsiflexion qui compte au squat : plus tu descends, plus ton tibia doit avancer par-dessus le pied. Si la cheville bloque, quelque chose compense — talons levés, dos penché, genoux qui fuient. Les chaussures à talon surélevé contournent exactement ce problème.

---

Côté stabilité, les ligaments externes sont les plus vulnérables : l'entorse classique arrive pied tourné vers l'intérieur, à la réception d'un saut ou sur un appui raté.

---

Dernier point : chaque kilo de tes squats transite par cette petite articulation. La mobiliser et renforcer les muscles qui l'entourent, c'est de l'entretien de base.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 23,
    xpReward: 30,
    tags: ["cheville"],
    ...CP.articulations,
    questions: THEME_3_QUIZZES[4]
  },
  {
    title: "Colonne et disques",
    subtitle: "Unités fonctionnelles et disques intervertébraux.",
    illustrationUrl: "/uploads/articulation-colonne.png",
    markdown: `Entre deux vertèbres se trouve un amortisseur remarquable : le disque intervertébral.

---

Sa structure : un gel central, le **nucleus pulposus**, entouré d'anneaux fibreux, l'**annulus fibrosus**. Sous compression, le gel répartit la pression sur l'anneau — c'est ce qui permet à ta colonne d'encaisser un soulevé de terre lourd.

---

Le scénario que l'anneau n'aime pas : flexion, charge et torsion combinées. Un dos arrondi qui pivote sous une barre pousse le nucleus contre l'anneau là où il est le plus sollicité. C'est le sens de la consigne « dos neutre » : elle ne dit pas que la flexion est dangereuse en soi, elle limite les contraintes extrêmes sous charge maximale.

---

Derrière chaque disque, deux petites **facettes articulaires** guident et limitent le mouvement de l'étage.

---

Vertèbres, disque, facettes, ligaments : chaque étage bouge un peu. C'est leur somme qui fait la souplesse de ta colonne — et les érecteurs qui en font la solidité.`,
    durationSec: 65,
    difficulty: "INTERMEDIATE",
    order: 24,
    xpReward: 30,
    tags: ["colonne", "disques", "rachis"],
    ...CP.articulations,
    questions: THEME_3_QUIZZES[5]
  },
  {
    title: "Scapulo-thoracique",
    subtitle: "Glissement de l'omoplate sur la cage.",
    markdown: `Lève le bras au-dessus de ta tête. Tu crois n'avoir bougé que l'épaule ? Ton omoplate a fait un tiers du chemin.

---

La **scapulo-thoracique** n'est pas une vraie articulation : pas de capsule, pas de cartilage. Juste l'omoplate qui glisse sur la cage thoracique, pilotée par ses muscles. Et pourtant, sans ce glissement, impossible de lever le bras complètement : la glenohumérale seule s'arrête bien avant la verticale.

---

Cette coordination porte un nom : le **rythme scapulo-huméral** — environ deux degrés d'humérus pour un degré d'omoplate en élévation.

---

Les moteurs : le **trapèze** et le **dentelé antérieur** font tourner l'omoplate vers le haut ; les **rhomboïdes** la rapprochent de la colonne (la rétraction) ; le **petit pectoral** la bascule en avant.

---

En développé militaire, laisse donc tes omoplates tourner avec le mouvement. Les bloquer en bas, c'est demander à l'épaule une amplitude qu'elle n'a pas.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 25,
    xpReward: 30,
    tags: ["scapula", "omoplate", "rythme"],
    ...CP.articulations,
    questions: THEME_3_QUIZZES[6]
  },
];
