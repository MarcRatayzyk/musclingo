import type { AnatomieSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_4_QUIZZES } from "./theme-4-muscles-haut-approfondi-questions";

export const THEME_4_LESSONS: AnatomieSeedLesson[] = [
  {
    title: "Biceps et brachial",
    subtitle: "Origines, insertions et actions des fléchisseurs.",
    markdown: `Deux muscles se partagent la flexion de ton coude, et la position de ta main décide lequel commande.

---

Le **biceps brachial** a deux chefs : le long naît au-dessus de la glène de l'omoplate, le court sur le processus **coracoïde**. Ils fusionnent et s'insèrent sur la **tubérosité du radius** — l'os qui pivote. Voilà pourquoi le biceps est aussi le grand supinateur : en tirant sur le radius, il tourne la paume vers le haut.

---

Le **brachial**, dessous, va de l'humérus à l'**ulna** — l'os qui ne tourne pas. Conséquence : il fléchit le coude avec la même efficacité quelle que soit la prise. C'est le fléchisseur pur.

---

Application directe : en curl supination, le biceps est avantagé. En curl marteau ou en prise inversée, il perd cet avantage — le brachial et le brachio-radial prennent une part plus grande du travail.

---

Deux insertions différentes, deux stratégies de curl.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 26,
    xpReward: 30,
    tags: ["biceps", "brachial", "origine-insertion"],
    ...CP.musclesHautApprofondi,
    questions: THEME_4_QUIZZES[0]
  },
  {
    title: "Triceps : les trois chefs",
    subtitle: "Long, latéral, médial — origines et extension.",
    markdown: `Trois chefs, un seul tendon : tout le triceps converge vers l'**olécrane**, la pointe de ton coude.

---

Le **chef latéral** et le **chef médial** naissent sur la face arrière de l'humérus. Leur travail est simple : étendre le coude, rien d'autre.

---

Le **chef long** est différent. Il naît sous la glène de l'omoplate, sur le tubercule **infra-glénoïdien**. Il croise donc deux articulations — le coude ET l'épaule — et participe à ramener le bras vers le corps.

---

Ce détail guide tes choix d'exercices. Bras au-dessus de la tête, comme aux extensions nuque, le chef long est mis en tension et travaille sur une grande amplitude. Bras le long du corps, comme aux pushdowns, il est raccourci et les deux autres chefs dominent.

---

Varier la position de l'épaule, c'est varier la répartition du travail dans le triceps. Deux exercices d'extension ne se valent donc jamais tout à fait.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 27,
    xpReward: 30,
    tags: ["triceps", "olecrane", "extension"],
    ...CP.musclesHautApprofondi,
    questions: THEME_4_QUIZZES[1]
  },
  {
    title: "Deltoïde et coiffe des rotateurs",
    subtitle: "Trois chefs du deltoïde et les quatre de la coiffe.",
    markdown: `L'épaule fonctionne à deux étages : un moteur en surface, une équipe de réglage en profondeur.

---

Le moteur, c'est le **deltoïde**. Trois chefs — antérieur, moyen, postérieur — qui convergent sur la tubérosité **deltoïdienne** de l'humérus et lèvent le bras dans toutes les directions.

---

En profondeur, quatre muscles forment la **coiffe des rotateurs** : le **supra-épineux**, qui lance l'élévation latérale ; l'**infra-épineux** et le **petit rond**, rotateurs externes ; le **subscapulaire**, rotateur interne. Leur mission commune : plaquer et centrer la tête de l'humérus dans la glène pendant que le deltoïde tire.

---

Sans ce centrage, le deltoïde ferait remonter la tête humérale, qui viendrait frotter sous l'acromion — le mécanisme du conflit d'épaule.

---

D'où l'intérêt du travail de rotation externe, face pulls ou rotations à l'élastique : entretenir l'équipe de réglage pour que le moteur puisse pousser lourd longtemps.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 28,
    xpReward: 30,
    tags: ["deltoide", "coiffe", "rotateurs"],
    ...CP.musclesHautApprofondi,
    questions: THEME_4_QUIZZES[2]
  },
  {
    title: "Grand et petit pectoral",
    subtitle: "Faisceaux, insertions et actions sur l'humérus.",
    markdown: `Il y a deux pectoraux, et ils ne tirent pas du tout sur le même os.

---

Le **grand pectoral**, le muscle visible, se termine sur l'humérus, dans le sillon **intertuberculaire**. Ses faisceaux — claviculaire en haut, sterno-costal au milieu, abdominal en bas — convergent en éventail. Tous ramènent le bras vers le corps (l'**adduction**) et le tournent en dedans ; l'inclinaison du banc change simplement quel faisceau tire le plus dans son axe.

---

Le **petit pectoral**, caché dessous, ne touche pas le bras : il va des côtes au processus **coracoïde** de l'omoplate. Son action : tirer l'omoplate en avant et en bas.

---

C'est ce qui le rend intéressant : raide ou trop tonique, il peut entretenir une épaule enroulée vers l'avant. Beaucoup de développé, peu de tirage, et il travaille toujours dans le même sens.

---

Grand pec pour pousser ; petit pec à surveiller pour la position de l'épaule.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 29,
    xpReward: 30,
    tags: ["pectoral", "coracoide", "thorax"],
    ...CP.musclesHautApprofondi,
    questions: THEME_4_QUIZZES[3]
  },
  {
    title: "Grand dorsal, grand rond, petit rond",
    subtitle: "Tirage, adduction et rotation de l'humérus.",
    markdown: `Trois muscles se côtoient autour de l'aisselle. Deux tirent dans le même sens ; le troisième fait exactement l'inverse.

---

Le **grand dorsal** part d'une origine immense — vertèbres, bassin, côtes basses — et tout converge vers le sillon **intertuberculaire** de l'humérus. Ses actions : extension, adduction et rotation interne du bras. Le trio du tirage.

---

Le **grand rond**, du bas de l'omoplate vers le même sillon, reproduit ces actions en plus petit. Son surnom de « petit dorsal » est mérité : tractions et tirages le nourrissent en même temps que son grand voisin.

---

Le **petit rond**, juste au-dessus, appartient à une autre équipe : la coiffe des rotateurs. Lui fait la rotation externe et stabilise la tête humérale.

---

Voisinage trompeur, donc : grand dorsal et grand rond enroulent le bras en dedans ; le petit rond retient dans l'autre sens. Cet équilibre rotatoire participe à la santé d'épaule des gros tireurs.`,
    durationSec: 65,
    difficulty: "INTERMEDIATE",
    order: 30,
    xpReward: 30,
    tags: ["grand-dorsal", "grand-rond", "petit-rond"],
    ...CP.musclesHautApprofondi,
    questions: THEME_4_QUIZZES[4]
  },
  {
    title: "Trapèze, rhomboïdes, élévateur",
    subtitle: "Positionnement fin de l'omoplate.",
    markdown: `Ton omoplate ne tient à la cage que par des muscles. Trois d'entre eux la pilotent comme des haubans.

---

Le **trapèze**, déjà croisé côté posture, mérite un zoom. Ses fibres supérieures élèvent l'omoplate, ses fibres moyennes la rétractent, ses fibres inférieures l'abaissent. Et supérieur plus inférieur, ensemble, la font tourner vers le haut — la rotation indispensable aux mouvements au-dessus de la tête.

---

Les **rhomboïdes**, tendus entre la colonne et le bord médial de l'omoplate, sont les spécialistes de la rétraction ; ils tirent aussi l'omoplate en rotation basse.

---

L'**élévateur de la scapula** descend des cervicales jusqu'à l'angle supérieur de l'omoplate : il l'élève et la bascule.

---

L'équilibre entre ces tractions détermine la position de repos de ton omoplate — et donc le confort de tes épaules. Un tirage varié, rowing, face pulls et shrugs, entretient tous les haubans, pas un seul.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 31,
    xpReward: 30,
    tags: ["trapeze", "rhomboïdes", "elevateur"],
    ...CP.musclesHautApprofondi,
    questions: THEME_4_QUIZZES[5]
  },
  {
    title: "Abdominaux profonds et obliques",
    subtitle: "Transverse, obliques et grand droit en détail.",
    markdown: `La paroi abdominale est un tissage en trois couches, chacune avec sa direction de fibres. C'est ce croisement qui la rend si solide.

---

En surface, le **grand droit** court verticalement, des côtes au **pubis**, entrecoupé d'intersections tendineuses — ce sont elles qui dessinent les « carrés ». Sa fonction : fléchir le tronc.

---

Au milieu, les obliques croisent leurs fibres : l'**oblique externe** descend vers l'avant (le sens des mains dans les poches), l'**oblique interne** remonte en sens inverse. Ce croisement en fait le couple rotateur du tronc : l'externe d'un côté travaille avec l'interne du côté opposé.

---

En profondeur, le **transverse** enroule ses fibres à l'horizontale, comme une ceinture de force naturelle. Il ne produit pas de mouvement : il comprime et augmente la pression **intra**-abdominale.

---

Trois couches, trois directions, trois métiers : fléchir, tourner, pressuriser. Un gainage complet entraîne les trois.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 32,
    xpReward: 30,
    tags: ["transverse", "obliques", "grand-droit"],
    ...CP.musclesHautApprofondi,
    questions: THEME_4_QUIZZES[6]
  },
  {
    title: "Serratus antérieur et stabilité scapulaire",
    subtitle: "Origine costale, bord médial et rotation haute.",
    markdown: `Un test simple : en position de pompe, si le bord interne d'une omoplate décolle comme une petite aile, ton dentelé antérieur dort.

---

Ce muscle en dents de scie naît sur les faces latérales des huit ou neuf premières **côtes** et s'accroche au **bord médial** de l'omoplate, par sa face profonde. Position idéale pour son métier : plaquer l'omoplate contre la cage et l'avancer autour du thorax — la **protraction**.

---

Avec le trapèze, il forme aussi le couple de forces qui fait tourner l'omoplate vers le haut, celle qui accompagne chaque développé militaire.

---

Sa faiblesse a un nom : le winging, l'omoplate « ailée », qui dégrade toute la mécanique d'épaule.

---

Pour le réveiller : des pompes avec une poussée supplémentaire des omoplates en fin de mouvement (push-up plus), ou n'importe quel travail au-dessus de la tête avec une omoplate qui suit librement le bras.`,
    durationSec: 62,
    difficulty: "INTERMEDIATE",
    order: 33,
    xpReward: 30,
    tags: ["serratus", "dentele", "scapula"],
    ...CP.musclesHautApprofondi,
    questions: THEME_4_QUIZZES[7]
  },
];
