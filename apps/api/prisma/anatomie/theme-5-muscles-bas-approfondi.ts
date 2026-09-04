import type { AnatomieSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_5_QUIZZES } from "./theme-5-muscles-bas-approfondi-questions";

export const THEME_5_LESSONS: AnatomieSeedLesson[] = [
  {
    title: "Quadriceps : les quatre chefs",
    subtitle: "Vastes, droit fémoral et tendon patellaire.",
    markdown: `Pourquoi le squat et le leg extension ne sollicitent-ils pas ton quadriceps exactement pareil ? À cause d'un seul chef : le droit fémoral.

---

Les trois vastes — **vaste latéral**, **vaste médial**, **vaste intermédiaire** — naissent sur le fémur et ne croisent que le genou. Leur travail est constant : étendre le genou, quelle que soit la position de la hanche.

---

Le **droit fémoral**, lui, naît sur le bassin, à l'épine iliaque antéro-**inférieure**. Bi-articulaire, il étend le genou et fléchit la hanche. En squat, hanche et genou plient ensemble : sa longueur change peu et il contribue modestement. En leg extension, où seul le genou bouge, il travaille bien davantage.

---

Tous les chefs convergent vers la **patella**, puis la tubérosité du tibia. Le vaste médial — le VMO, en goutte au-dessus du genou — aide au guidage de la rotule dans son rail.

---

Un quadriceps complet mélange donc squats lourds et travail d'extension isolé.`,
    durationSec: 65,
    difficulty: "INTERMEDIATE",
    order: 34,
    xpReward: 30,
    tags: ["quadriceps", "droit-femoral", "vastes"],
    illustrationUrl: "/uploads/quadriceps.jpg",
    ...CP.musclesBasApprofondi,
    questions: THEME_5_QUIZZES[0]
  },
  {
    title: "Ischio-jambiers en détail",
    subtitle: "Biceps fémoral, semi-tendineux, semi-membraneux.",
    markdown: `Sur les trois ischio-jambiers, un détail change beaucoup de choses : le côté du genou où chacun s'attache.

---

Le **biceps fémoral** file vers l'extérieur, sur la tête de la **fibula**. Le **semi-tendineux** et le **semi-membraneux** descendent côté interne, sur le tibia — le semi-tendineux via la patte d'oie. Genou fléchi, les premiers tournent légèrement le tibia en dehors, les seconds en dedans.

---

Autre subtilité : le biceps fémoral a deux chefs. Le long part de l'**ischion**, comme les deux semi ; le court naît directement sur le fémur. Ce chef court est le seul ischio mono-articulaire : il fléchit le genou mais ne participe pas à l'extension de hanche.

---

Conséquence pratique : le leg curl fait travailler tout le monde, chef court compris. Les RDL et le soulevé jambes tendues ne chargent que les bi-articulaires, par la hanche.

---

Les deux formats sont complémentaires — pas interchangeables.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 35,
    xpReward: 30,
    tags: ["ischios", "biceps-femoral", "semi-tendineux"],
    ...CP.musclesBasApprofondi,
    questions: THEME_5_QUIZZES[1]
  },
  {
    title: "Grand, moyen, petit fessier et TFL",
    subtitle: "Extension, abduction et tractus ilio-tibial.",
    markdown: `Sur le côté de ta hanche, plusieurs muscles tirent sur la même sangle — pas toujours dans le même but.

---

Le **moyen fessier** et le **petit fessier**, empilés sur l'aile du bassin, plongent vers le **grand trochanter**. Leurs fibres antérieures aident la rotation interne, les postérieures la rotation externe ; ensemble, ils écartent la cuisse et tiennent le bassin horizontal dès que tu es en appui sur un pied.

---

Devant eux, le **TFL** (tenseur du fascia lata) ne touche pas le fémur : il se jette dans le **tractus ilio-tibial**, cette longue bande fibreuse qui descend jusqu'au genou. Fléchisseur et abducteur de hanche, il a tendance à prendre le dessus quand le moyen fessier est faible.

---

Le **grand fessier** envoie lui aussi une partie de ses fibres dans ce tractus, en plus du fémur. Extension et rotation externe puissantes.

---

Abductions de hanche, marches latérales avec élastique : c'est tout ce trio latéral que tu affûtes.`,
    durationSec: 65,
    difficulty: "INTERMEDIATE",
    order: 36,
    xpReward: 30,
    tags: ["fessiers", "tfl", "abduction"],
    ...CP.musclesBasApprofondi,
    questions: THEME_5_QUIZZES[2]
  },
  {
    title: "Mollets, tibial, fibulaires",
    subtitle: "Triceps sural, releveurs et éverseurs.",
    markdown: `Ton pied est piloté par des cordes de rappel — une pour chaque direction.

---

Derrière, le **triceps sural** : le gastrocnémien, né sur le fémur, et le soléaire, né sur le tibia et la **fibula**, fusionnent dans le tendon d'Achille. C'est la flexion plantaire — la poussée.

---

Devant, le **tibial antérieur** relève le pied et le tourne en dedans : dorsiflexion et inversion.

---

Sur le côté externe, les **fibulaires** (long et court) longent la fibula et passent derrière la malléole : ils plantent le pied et le tournent en dehors — l'**éversion**. Ce sont eux qui rattrapent une cheville qui part en inversion, le mécanisme classique de l'entorse.

---

Sur une presse à mollets, tu n'entraînes que la poussée. En travail sur une jambe, en fentes ou sur appui instable, toutes ces cordes s'ajustent en continu. Une cheville solide, c'est cet équilibre-là.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 37,
    xpReward: 30,
    tags: ["mollets", "tibial", "fibulaires"],
    ...CP.musclesBasApprofondi,
    questions: THEME_5_QUIZZES[3]
  },
  {
    title: "Iliopsoas et fléchisseurs de hanche",
    subtitle: "Psoas, iliaque et synergicités antérieures.",
    markdown: `Un muscle relie directement tes vertèbres lombaires à ton fémur. Prends une seconde pour mesurer ce que ça implique.

---

L'**iliopsoas** est en fait un duo : le **psoas** naît sur les vertèbres lombaires, l'**iliaque** tapisse la fosse **iliaque** du bassin. Les deux fusionnent en un tendon commun sur le **petit trochanter**, à la face interne du haut du fémur.

---

C'est le grand fléchisseur de hanche, aidé par le droit fémoral, le sartorius et le TFL. Chaque montée de genou, chaque relevé de jambes suspendu passe par lui.

---

Son lien avec les lombaires est à double tranchant : un psoas raide ou hyperactif tire le bassin en **antéversion** et creuse le bas du dos. Certaines gênes lombaires en position debout prolongée viennent de là.

---

Le traiter ne se limite pas aux étirements : renforcer la flexion de hanche en amplitude complète lui apprend aussi à travailler sans crisper la zone lombaire.`,
    durationSec: 65,
    difficulty: "ADVANCED",
    order: 38,
    xpReward: 35,
    tags: ["iliopsoas", "psoas", "flexion-hanche"],
    illustrationUrl: "/uploads/iliopsoas.jpg",
    ...CP.musclesBasApprofondi,
    questions: THEME_5_QUIZZES[4]
  },
  {
    title: "Plancher pelvien et core anatomique",
    subtitle: "Diaphragme pelvien, transverse et continence.",
    markdown: `Imagine ton tronc comme une canette : un couvercle, des parois, un fond. C'est la pression à l'intérieur qui fait sa rigidité.

---

Le couvercle, c'est le **diaphragme**, ton muscle respiratoire principal. Les parois : le **transverse** et les obliques. Le fond : le **plancher pelvien**, cette nappe musculaire qui ferme le bas du bassin, soutient les organes et participe à la continence.

---

Quand tu inspires et gaines avant un squat lourd, ces trois étages se contractent ensemble et la pression intra-abdominale monte : la canette devient incompressible, ta colonne est étayée de l'intérieur.

---

Mais la pression pousse dans toutes les directions — vers le bas aussi. Des blocages respiratoires maximaux répétés avec un plancher pelvien qui ne suit pas peuvent créer fuites ou pesanteurs, chez les femmes comme chez les hommes.

---

Le gainage complet inclut donc ce fond de canette : expire sur l'effort quand c'est possible, et monte les charges progressivement.`,
    durationSec: 65,
    difficulty: "ADVANCED",
    order: 39,
    xpReward: 35,
    tags: ["plancher-pelvien", "core", "diaphragme"],
    ...CP.musclesBasApprofondi,
    questions: THEME_5_QUIZZES[5]
  },
  {
    title: "Chaînes antérieure et postérieure",
    subtitle: "Continuité myofasciale du tronc aux membres.",
    markdown: `Un soulevé de terre ne recrute pas des muscles isolés : il allume une ligne entière, des talons à la nuque.

---

Cette ligne, c'est la **chaîne postérieure** : mollets, **ischios**, **fessiers**, **érecteurs** du rachis, jusqu'aux trapèzes. Sa spécialité : l'extension et la propulsion — hinge, sprint, saut.

---

En face, la **chaîne antérieure** regroupe tibial antérieur, quadriceps, fléchisseurs de hanche, abdominaux, pectoraux. Elle fléchit — et freine l'extension quand il faut contrôler.

---

Ce qui relie ces muscles n'est pas qu'une image : fascias et aponévroses assurent une continuité mécanique réelle. La tension se transmet le long de la ligne, et un maillon raide ou faible modifie le comportement des voisins. Des ischios raides qui changent ta posture lombaire en penché en avant : exemple courant.

---

Les deux chaînes s'équilibrent. Squat et développés d'un côté, hinge et tirages de l'autre : un programme qui charge les deux entretient cet équilibre.`,
    durationSec: 65,
    difficulty: "ADVANCED",
    order: 40,
    xpReward: 35,
    tags: ["chaines", "anterieure", "posterieure"],
    ...CP.musclesBasApprofondi,
    questions: THEME_5_QUIZZES[6]
  },
];
