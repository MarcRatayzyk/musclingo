import type { AnatomieSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_1_QUIZZES } from "./theme-1-muscles-haut-questions";

export const THEME_1_LESSONS: AnatomieSeedLesson[] = [
  {
    title: "Les bras",
    subtitle: "",
    markdown: `Pour de gros bras, on pense biceps. Pourtant, la majorité du volume du bras se trouve… derrière.

---

Le **triceps** occupe toute la face arrière avec ses trois chefs. Sa fonction : tendre le coude. Dips, développé serré, extensions : c'est lui qui remplit la manche.

---

Devant, le **biceps** forme le galbe visible. Il plie le coude et tourne la paume vers le haut — la supination vue avec les os de l'avant-bras. C'est pour ça que le curl classique, paume vers le haut, le sollicite à fond.

---

Sous le biceps se cache le **brachial**. Lui ne fait que fléchir le coude, quelle que soit la prise. En curl marteau, prise neutre, il prend une grande part du travail, aidé par le **brachio-radial** de l'avant-bras.

---

Un bras complet se construit donc sur trois fronts : le triceps derrière, le biceps devant, le brachial et l'avant-bras en soutien.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 6,
    xpReward: 25,
    tags: ["bras", "biceps", "triceps", "avant-bras"],
    illustrationUrl: "/uploads/bras-muscles.png",
    ...CP.musclesHaut,
    questions: THEME_1_QUIZZES[0]
  },
  {
    title: "Pectoraux et épaules",
    subtitle: "",
    markdown: `Quand tu fais un développé couché, ton pectoral n'est pas le seul à travailler. Toute une équipe de poussée se met en route.

---

Le **grand pectoral**, ce large éventail du torse, part du sternum et de la clavicule pour se terminer sur l'humérus. En tirant sur ce levier, il ramène le bras devant le corps : c'est le moteur de la poussée horizontale, celle du développé couché et des écartés.

---

Le **deltoïde** coiffe l'épaule avec trois chefs — antérieur, moyen, postérieur. Selon le chef, il lève le bras devant, sur le côté ou vers l'arrière. Développé militaire et élévations latérales se partagent son travail.

---

Plus discret, le **dentelé antérieur** plaque l'omoplate contre les côtes et l'avance autour du thorax. Sans lui, pas de poussée stable au-dessus de la tête.

---

D'où la consigne classique au couché : fixe d'abord tes omoplates, descends la barre sous contrôle, puis laisse pectoraux et deltoïdes pousser.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 7,
    xpReward: 25,
    tags: ["pectoraux", "epaules", "deltoide"],
    illustrationUrl: "/uploads/pectoraux-epaules.png",
    ...CP.musclesHaut,
    questions: THEME_1_QUIZZES[1]
  },
  {
    title: "Tronc et abdominaux",
    subtitle: "",
    markdown: `Les abdos ne servent pas d'abord à faire joli : sous une barre lourde, ce sont eux qui empêchent ton tronc de plier.

---

Le **grand droit**, celui des « tablettes », fléchit le tronc : il rapproche les côtes du bassin. Crunchs et relevés de jambes le ciblent directement.

---

Sur les côtés, l'**oblique externe** et l'oblique interne gèrent la rotation et l'inclinaison du buste. Ce sont aussi eux qui résistent quand une charge essaie de te faire pivoter — pense au portage d'un haltère d'un seul côté.

---

Le plus important est invisible : le **transverse**. Cette ceinture profonde entoure le ventre et augmente la pression intra-abdominale quand tu inspires et gaines. Il ne dessine pas le six-pack ; il rigidifie le tronc.

---

Au squat ou au soulevé de terre, c'est cette pression, bien plus que des crunchs, qui soutient ta colonne. Un tronc solide se juge à ce qu'il tient, pas à ce qu'il montre.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 8,
    xpReward: 25,
    tags: ["abdos", "core", "obliques"],
    illustrationUrl: "/uploads/tronc-abdominaux.png",
    ...CP.musclesHaut,
    questions: THEME_1_QUIZZES[2]
  },
  {
    title: "Le dos",
    subtitle: "",
    markdown: `Pourquoi deux dos peuvent-ils sembler si différents — l'un large, l'autre épais ? Parce que les muscles du tirage n'ont pas tous le même rôle.

---

Le **grand dorsal** fait la largeur. Ce vaste muscle part du bas du dos et remonte jusqu'à l'humérus, sous l'aisselle : il rapproche le bras du corps et le tire vers le bas. Tractions et tirages verticaux exploitent exactement ce trajet.

---

Les **rhomboïdes** font l'épaisseur du milieu. Tendus entre la colonne et le bord interne de l'omoplate, ils rapprochent les omoplates — la rétraction qui lance un bon rowing.

---

Le **grand rond**, surnommé « petit dorsal », assiste le grand dorsal depuis le bord de l'omoplate.

---

Et le **deltoïde postérieur**, à l'arrière de l'épaule, tire le bras vers l'arrière : face pulls et oiseau le ciblent. C'est lui qui équilibre tout ce que tu fais en poussée devant.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 9,
    xpReward: 25,
    tags: ["dos", "tirage", "grand-dorsal"],
    illustrationUrl: "/uploads/dos-muscles.png",
    ...CP.musclesHaut,
    questions: THEME_1_QUIZZES[3]
  },
  {
    title: "Trapèze et érecteurs",
    subtitle: "",
    markdown: `Le trapèze ne sert pas qu'à hausser les épaules — c'est même sa partie la moins intéressante.

---

Ce grand triangle couvre la nuque et le haut du dos. Sa partie supérieure élève l'épaule (les shrugs, c'est elle), sa partie moyenne rapproche l'omoplate de la colonne, sa partie inférieure l'abaisse. Rowing et face pulls travaillent surtout les deux dernières — souvent les plus négligées.

---

Sous le **trapèze**, l'**élévateur de la scapula** relie les cervicales au coin supérieur de l'omoplate. Nuque raide après une grosse séance ? C'est souvent lui qui a trop tiré.

---

Le long de la colonne, les **érecteurs du rachis** forment deux piliers, du sacrum jusqu'au crâne. Leur travail : étendre le dos et le maintenir droit. Au soulevé de terre, ils luttent à chaque centimètre contre la barre qui cherche à t'enrouler.

---

Un dos qui tient sous charge, c'est d'abord eux.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 10,
    xpReward: 25,
    tags: ["trapeze", "erecteurs", "posture"],
    illustrationUrl: "/uploads/trapeze-erecteurs.png",
    ...CP.musclesHaut,
    questions: THEME_1_QUIZZES[4]
  },
  {
    title: "Avant-bras et prise",
    subtitle: "Fléchisseurs, extenseurs et force de grip.",
    markdown: `Ton dos peut avoir de la réserve : si tes mains lâchent la barre, la série s'arrête. Le maillon faible d'un tirage, c'est souvent la prise.

---

La prise, c'est l'avant-bras. Sur sa face interne, les **fléchisseurs** serrent les doigts et plient le poignet. La plupart naissent près de l'**épicondyle médial**, la bosse interne du coude.

---

Sur la face externe, les **extenseurs** ouvrent la main et redressent le poignet. Ils partent de l'**épicondyle latéral** — et quand ils sont surmenés, c'est le fameux tennis elbow.

---

Souviens-toi de la prono-supination du début du parcours : ce sont aussi des muscles de l'avant-bras qui orientent ta paume, avec le **brachio-radial** en renfort de la flexion du coude.

---

Rowings, soulevés, tractions : chaque tirage entraîne déjà ta prise. Si elle limite tes séries malgré tout, du travail dédié — tenues lourdes, farmer walk — paie vite.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 11,
    xpReward: 25,
    tags: ["avant-bras", "prise", "grip"],
    ...CP.musclesHaut,
    questions: THEME_1_QUIZZES[5]
  },
  {
    title: "Cou et muscles cervicaux",
    subtitle: "Sterno-cléido-mastoïdien, scalènes et stabilisateurs.",
    markdown: `Tourne la tête vers la gauche : le muscle qui ressort à droite de ton cou, c'est le **sterno-cléido-mastoïdien**.

---

Ce SCM va du sternum et de la clavicule jusqu'à la mastoïde, l'os derrière l'oreille. Contracté d'un seul côté, il tourne et incline la tête ; les deux ensemble fléchissent le cou vers l'avant.

---

Plus profonds, les **scalènes** relient les vertèbres cervicales aux premières côtes. Ils inclinent le cou et aident à soulever les côtes lors des grandes inspirations.

---

À l'arrière, une nappe de muscles profonds maintient la tête droite — un travail permanent, car ta tête pèse plusieurs kilos, et davantage dès qu'elle part en avant.

---

En musculation, le cou travaille plus qu'on ne croit : il se gaine à chaque soulevé de terre, chaque shrug, chaque gainage. La consigne utile tient en une ligne : garde-le dans le prolongement du dos, ni écrasé contre la poitrine, ni cassé vers l'arrière.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 12,
    xpReward: 25,
    tags: ["cou", "cervicaux", "scm"],
    ...CP.musclesHaut,
    questions: THEME_1_QUIZZES[6]
  },
];
