import type { AnatomieSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_2_QUIZZES } from "./theme-2-muscles-bas-questions";

export const THEME_2_LESSONS: AnatomieSeedLesson[] = [
  {
    title: "Devant de cuisse",
    subtitle: "",
    markdown: `Leg extension, squat, presse à cuisses : à chaque fois que ton genou se tend contre une résistance, le quadriceps est aux commandes.

---

Quatre chefs — d'où son nom : vaste latéral, vaste médial, vaste intermédiaire et droit fémoral. Tous convergent vers la rotule, puis le tibia. Leur action commune : étendre le genou.

---

Le droit fémoral a une particularité : il croise aussi la hanche et aide à la fléchir. Un muscle, deux articulations.

---

La flexion de hanche a d'ailleurs son spécialiste : l'**ilio-psoas**. Ce muscle profond relie les lombaires et le bassin au fémur ; c'est lui qui remonte ton genou vers la poitrine dans les relevés de jambes.

---

Sur le côté, le **tenseur du fascia lata** (TFL) aide à stabiliser le bassin ; le **sartorius**, lui, traverse la cuisse en écharpe jusqu'au tibia.

---

Devant de cuisse, donc : un extenseur de genou dominant, le **quadriceps**, épaulé par des fléchisseurs de hanche.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 13,
    xpReward: 25,
    tags: ["quadriceps", "cuisse", "hanche"],
    illustrationUrl: "/uploads/devant-cuisse.png",
    ...CP.musclesBas,
    questions: THEME_2_QUIZZES[0]
  },
  {
    title: "Arrière de cuisse",
    subtitle: "",
    markdown: `Un leg curl et un soulevé de terre jambes tendues ciblent les mêmes muscles — par deux fonctions différentes.

---

Les ischio-jambiers, à l'arrière de la cuisse, sont trois : le **biceps fémoral** côté externe, le **semi-tendineux** et le **semi-membraneux** côté interne. Presque tous partent de l'ischion, l'os sur lequel tu t'assois, et descendent derrière le genou.

---

D'où leurs deux actions : plier le genou — c'est le leg curl — et étendre la hanche, c'est-à-dire ramener la cuisse en arrière — c'est le soulevé de terre roumain. Un programme complet nourrit les deux fonctions.

---

Sous eux, côté interne, le **grand adducteur** mérite sa place : ce muscle massif rapproche la cuisse de l'axe du corps et travaille fort dans les squats larges.

---

Cette sensation d'étirement intense derrière la cuisse en RDL ? Ce sont tes ischios qui s'allongent sur deux articulations à la fois — hanche qui plie, genou qui reste tendu.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 14,
    xpReward: 25,
    tags: ["ischios", "adducteurs"],
    illustrationUrl: "/uploads/arriere-cuisse.png",
    ...CP.musclesBas,
    questions: THEME_2_QUIZZES[1]
  },
  {
    title: "Les fessiers",
    subtitle: "",
    markdown: `Le **grand fessier** est l'un des muscles les plus puissants du corps — et il ne sert pas qu'à s'asseoir dessus.

---

Sa fonction phare : l'extension de hanche. Ramener la cuisse en arrière, redresser le bassin. Sortie de squat, verrouillage du soulevé de terre, hip thrust : chaque fois que tes hanches avancent contre une résistance, c'est lui qui pousse.

---

Le **moyen fessier**, plus haut sur le côté du bassin, écarte la cuisse — l'abduction — et surtout stabilise le bassin dès que tu es sur une jambe. Fentes, montées de marche : s'il est faible, le genou plonge vers l'intérieur.

---

Le **petit fessier**, caché sous le moyen, l'assiste dans ce rôle de gardien de la hanche. Tous deux rejoignent le grand trochanter, la bosse externe du fémur.

---

Puissance derrière, stabilité sur le côté : les fessiers sont autant des muscles de performance que d'esthétique.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 15,
    xpReward: 25,
    tags: ["fessiers", "hanche"],
    illustrationUrl: "/uploads/fessiers.png",
    ...CP.musclesBas,
    questions: THEME_2_QUIZZES[2]
  },
  {
    title: "Bas de jambes",
    subtitle: "",
    markdown: `Pourquoi faire des mollets assis ET debout ? Parce que ton mollet, ce sont deux muscles.

---

Le **gastrocnémien**, celui du galbe, part du fémur — il croise donc le genou — et rejoint le tendon d'Achille. Debout, jambes tendues, il travaille à plein.

---

Le **soléaire**, dessous, part du tibia et de la fibula : le genou ne le concerne pas. Assis, genou fléchi, le gastrocnémien est détendu et c'est lui qui fournit l'effort. Deux exercices, deux muscles, un même tendon d'Achille.

---

Devant, le **tibial antérieur** relève le pied — la dorsiflexion. C'est lui qui empêche ta pointe de traîner quand tu marches.

---

Sur le bord externe, le **long fibulaire** stabilise la cheville et la protège des entorses.

---

Petits muscles, gros enjeu : toute la force de tes squats et de tes sauts finit par passer par eux.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 16,
    xpReward: 25,
    tags: ["mollets", "jambes", "cheville"],
    illustrationUrl: "/uploads/bas-jambes.png",
    ...CP.musclesBas,
    questions: THEME_2_QUIZZES[3]
  },
  {
    title: "Adducteurs",
    subtitle: "Long, court, grand adducteur et pectiné.",
    markdown: `Adduction : rapprocher un membre de l'axe du corps. Toute la face interne de ta cuisse est construite pour ça.

---

Le groupe part du **pubis** et de l'ischion et descend vers le fémur : long adducteur, court adducteur, pectiné, et le **grand adducteur** — le plus massif, déjà croisé dans la leçon sur l'arrière de cuisse. Selon ses fibres, ce dernier aide aussi à étendre la hanche.

---

Le **gracile** fait bande à part : ce long ruban descend jusqu'au tibia, sur la patte d'oie, et participe un peu à la flexion du genou.

---

En pratique, les adducteurs font bien plus que serrer les cuisses. En squat, surtout avec une stance large, ils travaillent fort et aident à contrôler la trajectoire des genoux.

---

Des adducteurs raides ou faibles, et c'est souvent la profondeur du squat ou la stabilité du genou qui trinque.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 17,
    xpReward: 25,
    tags: ["adducteurs", "cuisse", "hanche"],
    ...CP.musclesBas,
    questions: THEME_2_QUIZZES[4]
  },
  {
    title: "Rotateurs profonds de hanche",
    subtitle: "Piriforme, obturateurs et jumeaux.",
    markdown: `Sous tes fessiers se cache un étage de petits muscles dont on ne parle jamais en salle — jusqu'au jour où ils se manifestent.

---

Le **piriforme** part du sacrum et rejoint le grand trochanter, la bosse externe du fémur. Autour de lui : les **obturateurs**, les **jumeaux** et le **carré fémoral**. Tous tournent la cuisse vers l'extérieur.

---

Leur vrai métier n'est pas la force visible : c'est le centrage. Ils maintiennent la tête du fémur bien placée dans sa cavité et freinent les rotations parasites — en fente, en appui sur une jambe, à chaque changement de direction.

---

Détail qui compte : le nerf sciatique passe juste à côté du piriforme. Quand ce muscle est trop tendu, il peut irriter le nerf — c'est le syndrome du piriforme. Mobilité et renforcement progressif y font souvent plus que des étirements agressifs.

---

Le volume de la fesse vient du grand fessier ; sa précision vient d'eux.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 18,
    xpReward: 25,
    tags: ["piriforme", "rotateurs", "hanche"],
    ...CP.musclesBas,
    questions: THEME_2_QUIZZES[5]
  },
];
