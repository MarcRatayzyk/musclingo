import type { Difficulty } from "@prisma/client";
import {
  type SeedQuestion,
  qcm,
  fillBlank,
  tf,
  quiz6,
  legendTextQuestions,
} from "./anatomie-quiz-helpers";

export type AnatomieSeedLesson = {
  title: string;
  subtitle: string;
  markdown: string;
  durationSec: number;
  difficulty: Difficulty;
  order: number;
  xpReward: number;
  tags: string[];
  illustrationUrl?: string | null;
  checkpointKey: string;
  checkpointTitle: string;
  checkpointOrder: number;
  questions: SeedQuestion[];
};

const CP = {
  os: {
    checkpointKey: "os",
    checkpointTitle: "Os",
    checkpointOrder: 0,
  },
  musclesHaut: {
    checkpointKey: "muscles-haut",
    checkpointTitle: "Muscles du haut du corps",
    checkpointOrder: 1,
  },
  musclesBas: {
    checkpointKey: "muscles-bas",
    checkpointTitle: "Muscles du bas du corps",
    checkpointOrder: 2,
  },
  articulations: {
    checkpointKey: "articulations",
    checkpointTitle: "Articulations",
    checkpointOrder: 3,
  },
  tissus: {
    checkpointKey: "tissus",
    checkpointTitle: "Tissus et fonctionnement",
    checkpointOrder: 4,
  },
  organisation: {
    checkpointKey: "organisation-mvt",
    checkpointTitle: "Organisation du mouvement",
    checkpointOrder: 5,
  },
  applique: {
    checkpointKey: "anatomie-appliquee",
    checkpointTitle: "Anatomie appliquée",
    checkpointOrder: 6,
  },
} as const;

export const ANATOMIE_LESSONS: AnatomieSeedLesson[] = [
  // ── CHECKPOINT 0 : os (orders 0-3) ───────────────────────────────
  {
    title: "Bras et avant-bras",
    subtitle: "Humérus, radius et ulna.",
    markdown: `De l'épaule au poignet : trois zones osseuses distinctes (bras, avant-bras, main), et chacune conditionne curls, dips et prises.

---

L'**humérus** est l'os unique du bras (haut). Sa tête s'articule avec l'omoplate ; son bas forme les **épicondyles** médial et latéral d'où partent de nombreux muscles du coude et de l'avant-bras.

---

Le **radius** (latéral, côté pouce) et l'**ulna** ou cubitus (médial, côté petit doigt) composent l'avant-bras. L'ulna porte surtout l'articulation du **coude** ; le radius tourne autour de lui.

---

La **prono-supination** fait pivoter le radius pour orienter la paume vers le haut (supination) ou vers le bas (pronation). Curls paume haut vs marteau vs prise inversée : la mécanique du coude et de l'avant-bras change le recrutement.

---

Connaître **humérus / radius / ulna** aide à comprendre pourquoi la douleur au coude suit souvent une surcharge tendineuse (tennis elbow, golfer's elbow).

---

À retenir : épaule → **humérus** ; coude et rotation de main → **radius + ulna**. Base osseuse pour lire curls, extensions et dips.`,
    durationSec: 85,
    difficulty: "BEGINNER",
    order: 0,
    xpReward: 25,
    tags: ["humerus", "avant-bras"],
    illustrationUrl: "/uploads/bras-osseux.png",
    ...CP.os,
    questions: quiz6(
      qcm(
        "Quels os forment l'avant-bras ?",
        "Radius et ulna",
        ["Fémur et tibia", "Radius et fémur", "Clavicule et sternum"],
        "Le couple radius/ulna gère coude et prono-supination.",
      ),
      qcm(
        "L'humérus s'articule en haut avec…",
        "L'omoplate (glenohumérale)",
        ["Le bassin", "Le tibia", "Le sternum seul"],
        "La tête humérale s'insère dans la glène de l'omoplate.",
      ),
      qcm(
        "La supination oriente la paume…",
        "Vers le haut",
        ["Vers le bas", "Vers l'arrière", "Vers l'intérieur de la cuisse"],
        "Curl classique paume haut = supination.",
      ),
      fillBlank(
        "L'os du bras qui va de l'épaule au coude s'appelle l'___.",
        "humérus",
        ["fémur", "tibia", "sternum"],
        "L'humérus est l'os unique du segment bras.",
      ),
      tf(
        "L'humérus est l'os de la cuisse.",
        false,
        "Faux : l'humérus est l'os du bras ; le fémur est l'os de la cuisse.",
      ),
      tf(
        "La prono-supination implique surtout le radius qui tourne autour de l'ulna.",
        true,
        "Vrai : c'est le mécanisme du pivot radio-ulnaire.",
      ),
    ),
  },
  {
    title: "Cage thoracique et ceinture scapulaire",
    subtitle: "Clavicule, omoplate, côtes, sternum et rachis haut.",
    markdown: `Le haut du tronc unit **ceinture scapulaire** et **cage thoracique** : clavicule, omoplate, sternum, côtes et vertèbres cervicales/thoraciques forment le socle de l'épaule et de la posture.

---

Sur l'illustration : le **sternum** est en violet, les **omoplates** en vert, les **cervicales** en orange, les **vertèbres thoraciques** en rouge, les **côtes** et les **clavicules** en blanc.

---

La **clavicule** (os horizontal du cou) relie le sternum à l'**acromion** de l'omoplate. Elle absorbe et transmet les forces du bras vers le tronc. En musculation, une clavicule bien positionnée aide à garder la barre au-dessus des coudes en développé.

---

L'**omoplate** (scapula) est l'os plat du dos d'épaule. Elle **glisse** sur la cage thoracique ; elle n'est pas fixée comme un fémur dans l'acétabulum. C'est cette mobilité qui permet d'élever, rétracter ou faire tourner l'épaule.

---

Sans contrôle de la scapula, la **glenohumérale** compense : risque d'impingement et de douleur. **Rétraction** et **rotation** de l'omoplate sont le vocabulaire clé des rows et des face pulls.

---

Le **sternum** (os plat du milieu de la poitrine) et les **12 paires de côtes** forment la cage thoracique. Elles protègent cœur et poumons, et servent d'ancrage aux **pectoraux** et aux **abdominaux**.

---

Les **7 vertèbres cervicales** supportent la tête et permettent flexion, extension et rotation du cou. Un cou en extension forcée sous charge (développé militaire mal dosé) sollicite fortement cette région.

---

Les **12 vertèbres thoraciques** s'articulent avec les côtes et forment la **cyphose** naturelle (courbure vers l'avant). Cette courbure influence la posture en squat et la position du buste en développé couché.

---

La respiration et la posture passent par cette cage : expansion des côtes à l'inspiration, rigidité du tronc sous barre. Développés et poussées passent par une **omoplate stable** ; rows et tirages la **rétractent**.

---

À retenir : **clavicule + omoplate** sur la cage ; **sternum + côtes** = ancrage des pecs ; **cervicales** = tête ; **thoraciques** = posture du haut du dos.`,
    durationSec: 120,
    difficulty: "BEGINNER",
    order: 1,
    xpReward: 25,
    tags: ["cage", "rachis", "omoplate", "clavicule"],
    illustrationUrl: "/uploads/cage-thoracique.png",
    ...CP.os,
    questions: [
      ...legendTextQuestions("/uploads/cage-thoracique.png"),
      qcm(
        "L'omoplate fait partie de…",
        "La ceinture scapulaire",
        ["La ceinture pelvienne", "Le carpe", "Le tarse"],
        "Clavicule + omoplate = ceinture scapulaire.",
      ),
      tf(
        "La cage thoracique joue un rôle dans la respiration et la posture sous charge.",
        true,
        "Vrai : expansion des côtes et rigidité du tronc sont liées à cette structure.",
      ),
    ],
  },
  {
    title: "Bassin et rachis lombaire",
    subtitle: "Lombaires, sacrum, coccyx, os coxal, ilion et acétabulum.",
    markdown: `Le bas du tronc unit **rachis lombaire** et **bassin** : cinq vertèbres lombaires, sacrum, coccyx et os coxaux forment le pivot entre le haut du corps et les jambes, clé du squat, du hinge et de la posture sous charge.

---

Sur l'illustration : les **vertèbres lombaires** (L1–L5) en bleu foncé, les **vertèbres thoraciques** en orange, le **sacrum** en rouge bordeaux, le **coccyx** en dessous, l'**ilion** (aile du bassin) en jaune, l'**ischion** en rouge, et l'**acétabulum** (emboîture de la hanche) au niveau du fémur.

---

Les **5 vertèbres lombaires** (L1 à L5) portent la majeure partie du poids du tronc. Plus massives que les thoraciques, elles encaissent d'énormes contraintes en squat et deadlift. La **lordose** lombaire (courbure naturelle vers l'avant) doit rester neutre sous barre pour protéger les disques.

---

Le **sacrum** est l'os triangulaire et fusionné qui prolonge le rachis sous les lombaires. Il s'articule avec L5 au-dessus et avec les **os coxaux** sur les côtés ; c'est le maillon central qui transmet les forces entre colonne et hanches.

---

Le **coccyx** (queue osseuse) est la petite série de vertèbres fusionnées sous le sacrum. Moins sollicité en musculation que le sacrum, il sert surtout d'ancrage à des muscles du plancher pelvien et du fond du dos.

---

L'**os coxal** (os de la hanche) est l'os du bassin de chaque côté. Chez l'adulte, il résulte de la fusion de trois pièces : l'**ilion**, l'ischion et le pubis. C'est l'ancrage des fessiers, adducteurs et ischio-jambiers.

---

L'**ilion** forme l'aile du bassin : la grande surface que tu sens sur les côtés du bassin. En squat, sa forme et son orientation influencent la position du tronc et la profondeur atteignable.

---

L'**acétabulum** est la cavité en forme de cupule creusée dans l'os coxal. C'est l'emboîture de la hanche : la tête du **fémur** s'y articule. Sa profondeur et son angle conditionnent mobilité et stabilité en squat profond.

---

En **squat** et **soulevé de terre**, les lombaires agissent comme un levier que les **érecteurs** doivent stabiliser, tandis que sacrum, os coxaux et acétabulum orientent la hanche et la transmission de force vers les jambes.

---

À retenir : **L1–L5** sous charge ; **sacrum** au centre ; **coccyx** en dessous ; **ilion** = aile du bassin ; **acétabulum** = emboîture de la hanche.`,
    durationSec: 130,
    difficulty: "BEGINNER",
    order: 2,
    xpReward: 25,
    tags: ["lombaires", "sacrum", "coccyx", "coxal", "ilion", "acetabulum"],
    illustrationUrl: "/uploads/bassin-lombaire.png",
    ...CP.os,
    questions: quiz6(
      qcm(
        "Combien de vertèbres lombaires chez l'adulte typique ?",
        "Cinq",
        ["Sept", "Douze", "Trois"],
        "L1 à L5 forment la région lombaire.",
      ),
      qcm(
        "L'ilion correspond surtout à…",
        "L'aile du bassin",
        ["La rotule", "La clavicule", "Le radius"],
        "L'ilion est la grande partie supérieure et latérale de l'os coxal.",
      ),
      qcm(
        "Le sacrum se situe…",
        "Sous les lombaires, au-dessus du coccyx",
        ["Dans l'avant-bras", "Au-dessus du crâne", "Dans le genou"],
        "Le sacrum relie le rachis lombaire au bassin.",
      ),
      fillBlank(
        "L'emboîture de la hanche sur l'os coxal s'appelle l'___.",
        "acétabulum",
        ["ménisque", "rotule", "acromion"],
        "L'acétabulum reçoit la tête fémorale.",
      ),
      fillBlank(
        "La petite queue osseuse sous le sacrum s'appelle le ___.",
        "coccyx",
        ["sternum", "humérus", "fémur"],
        "Le coccyx est formé de vertèbres fusionnées.",
      ),
      tf(
        "L'os coxal comprend l'ilion, l'ischion et le pubis fusionnés.",
        true,
        "Vrai : ces trois pièces forment l'os de la hanche à l'âge adulte.",
      ),
    ),
  },
  {
    title: "Cuisse, genou et jambe",
    subtitle: "Fémur, patella, tibia, fibula et ligaments croisés.",
    markdown: `De la hanche à la cheville, la jambe forme une chaîne osseuse et ligamentaire décisive : **fémur**, **patella**, **tibia**, **fibula** et **ligaments croisés** structurent squat, fentes, course et sauts.

---

Sur l'illustration : le **fémur** en bleu, la **patella** en beige, le **tibia** en rouge et la **fibula** en violet.

---

Le **fémur** est l'os le plus long du corps. Il relie la hanche (tête fémorale dans l'acétabulum) au genou (condyles fémoraux). Sa longueur influence le levier en squat ; fémur long = plus de flexion de hanche.

---

La **patella** (rotule) est un os sésamoïde dans le tendon quadricipital. Elle augmente le **bras de levier** du quadriceps en éloignant le tendon de l'axe du genou ; sans elle, l'extension serait moins efficace.

---

Le **tibia** est l'os porteur principal de la jambe (médial). Il reçoit le fémur au genou via ses plateaux tibiaux et s'articule avec le talus à la cheville. C'est lui qui transmet le poids du corps vers le pied.

---

La **fibula** (péroné) est l'os latéral, plus fin et non porteur. Elle stabilise la cheville et sert d'ancrage aux muscles latéraux de la jambe. Fracture de fibula = souvent moins handicapante qu'un tibia.

---

À l'intérieur du genou, les **ligaments croisés** stabilisent l'articulation entre fémur et tibia. Le **ligament croisé antérieur** (LCA) limite le tibia qui glisse vers l'avant ; le **ligament croisé postérieur** (LCP) limite le recul du tibia. Ils sont essentiels en pivot, réception de saut et changements de direction.

---

Un genou stable combine surfaces osseuses (fémur, patella, tibia) et tension ligamentaire. Valgus, torsion ou chute peuvent solliciter fortement les croisés ; d'où l'importance du contrôle musculaire (quadriceps, ischios) en musculation.

---

À retenir : **fémur** = os le plus long ; **patella** = levier du quad ; **tibia** = porteur ; **fibula** = stabilité latérale ; **LCA/LCP** = stabilité du genou.`,
    durationSec: 120,
    difficulty: "BEGINNER",
    order: 3,
    xpReward: 25,
    tags: ["femur", "patella", "tibia", "fibula", "genou", "lca"],
    illustrationUrl: "/uploads/cuisse-genou-jambe.png",
    ...CP.os,
    questions: [
      ...legendTextQuestions("/uploads/cuisse-genou-jambe.png"),
      qcm(
        "Quel os est le plus long du corps ?",
        "Le fémur",
        ["Le radius", "La clavicule", "Le métatarse"],
        "Le fémur domine en longueur chez l'adulte.",
      ),
      tf(
        "Les ligaments croisés relient fémur et tibia au sein du genou.",
        true,
        "Vrai : LCA et LCP stabilisent l'articulation fémoro-tibiale.",
      ),
    ],
  },
  // ── CHECKPOINT 1 : muscles-haut (orders 6-10) ────────────────────
  {
    title: "Les bras",
    subtitle: "",
    markdown: `Le bras, ce n'est pas « juste le **biceps** ». Devant, derrière, et l'**avant-bras** : chacun joue un rôle pour le **volume** et le **galbe**.

---

Sur les illustrations : le **triceps** en bleu (vue arrière) ; en vue avant-bras, le **biceps** en rouge, le **brachio-radial** en bleu clair, et les **fléchisseurs** de l'avant-bras en vert et violet.

---

Le **biceps** est le muscle du galbe devant. Deux chefs qui se rejoignent ; il plie le coude et tourne la paume vers le haut (prise curl classique). C'est lui qui donne la « boule » quand tu poses le bras.

---

Sous le biceps, le **brachial** pousse le pic vers le haut : plus il est développé, plus le bras paraît haut. Très sollicité en prise **marteau**.

---

Derrière, le **triceps** (trois chefs) fait l'essentiel du volume. Il tend le coude. **Extensions**, **dips**, **développé serré** : c'est lui qui remplit la manche.

---

Sur le bord de l'avant-bras, le **brachio-radial** apporte l'épaisseur. Il aide à plier le coude et se recrute bien en curls marteau.

---

Plus à l'intérieur, le **pronateur** aide à tourner la paume vers le bas. Utile pour la **prise** et la silhouette de l'avant-bras.

---

À retenir : curls paume haut → **biceps**. Marteau → **brachial** + avant-bras. Extensions / dips / serré → **triceps**. Un bras complet = avant + arrière + avant-bras.`,
    durationSec: 120,
    difficulty: "BEGINNER",
    order: 4,
    xpReward: 25,
    tags: ["bras", "biceps", "triceps", "avant-bras"],
    illustrationUrl: "/uploads/bras-muscles.png",
    ...CP.musclesHaut,
    questions: [
      ...legendTextQuestions("/uploads/bras-triceps.png"),
      ...legendTextQuestions("/uploads/bras-muscles.png"),
      qcm(
        "Quel muscle apporte surtout le volume derrière le bras ?",
        "Le triceps",
        ["Le biceps seul", "Le deltoïde moyen", "Le transverse"],
        "Le triceps forme souvent la majeure partie du volume du bras.",
      ),
      tf(
        "Les dips sollicitent fortement le triceps.",
        true,
        "Vrai : extension du coude sous charge = travail majeur du triceps.",
      ),
    ],
  },
  {
    title: "Pectoraux et épaules",
    subtitle: "",
    markdown: `Au haut du corps, la **poussée** passe surtout par la poitrine et l'épaule. On retient les gros acteurs utiles en salle, sans les petits muscles respiratoires du thorax.

---

Sur l'illustration : le **grand pectoral** en rouge, le **deltoïde** en bleu et le **dentelé antérieur** en vert.

---

Le **grand pectoral** est le large muscle triangulaire du torse. Il s'insère côté sternum, clavicule et côtes basses, puis se termine sur l'**humérus**. Fonction : ramener le bras vers le corps / le baisser s'il est levé, et avancer l'épaule. En musculation, c'est la cible principale du **développé couché** et des écartés.

---

Le **petit pectoral** est plus profond, sous le grand. Il part des côtes 3–5 vers le **processus coracoïde** de l'omoplate. Fonction : abaisser l'omoplate et l'épaule ; il peut aussi aider à soulever les côtes. En salle, un petit pec trop tendu « enroule » souvent les épaules ; d'où l'intérêt d'équilibrer avec du tirage.

---

Le **deltoïde** coiffe l'épaule (trois chefs : antérieur, moyen, postérieur). Il s'accroche sur clavicule / omoplate et se termine sur l'**humérus**. Fonction : élever le bras et l'orienter devant, sur le côté ou derrière. En musculation, développé militaire, élévations latérales et **face pulls** / oiseau ciblent les différents chefs pour une épaule ronde et stable.

---

Le **dentelé antérieur** couvre le côté du thorax : faisceaux depuis les premières côtes jusqu'au bord interne de l'**omoplate**. Fonction : avancer l'omoplate et stabiliser l'épaule (muscle du « boxeur »). En musculation, il travaille beaucoup en **développé militaire** et mouvements de push overhead ; une omoplate stable = presse plus propre.

---

À retenir : développé / écartés → **grand pec**. Stabilité scapulaire → **petit pec** + **dentelé**. Rondeur d'épaule → les **trois chefs** du deltoïde.`,
    durationSec: 130,
    difficulty: "BEGINNER",
    order: 5,
    xpReward: 25,
    tags: ["pectoraux", "epaules", "deltoide"],
    illustrationUrl: "/uploads/pectoraux-epaules.png",
    ...CP.musclesHaut,
    questions: [
      ...legendTextQuestions("/uploads/pectoraux-epaules.png"),
      qcm(
        "Le deltoïde possède combien de chefs ?",
        "Trois",
        ["Un", "Deux", "Cinq"],
        "Antérieur, moyen et postérieur.",
      ),
      qcm(
        "Le grand pectoral se termine surtout sur quel os ?",
        "L'humérus",
        ["Le fémur", "Le tibia", "Le radius seul"],
        "Le grand pec tire l'humérus vers le torse.",
      ),
      tf(
        "Le dentelé antérieur aide à stabiliser l'omoplate.",
        true,
        "Vrai : il tire le bord interne de l'omoplate et stabilise l'épaule.",
      ),
    ],
  },
  {
    title: "Tronc et abdominaux",
    subtitle: "",
    markdown: `Le **core** n'est pas qu'un six-pack : c'est la ceinture qui rigidifie le tronc sous barre. Voici les gros muscles utiles, sans intercostaux.

---

Sur l'illustration : le **grand droit** en rouge et l'**oblique externe** en bleu.

---

Le **grand droit de l'abdomen** forme les « tablettes » de chaque côté de la ligne blanche. Il s'insère en haut sur les cartilages des côtes 5–7 et l'appendice **xiphoïde**, en bas sur le **pubis**. Fonction : fléchir le thorax vers le bassin (ou remonter le bassin). En musculation, crunchs et relevés de jambes le ciblent, mais un core utile sert surtout à **tenir** sous charge.

---

L'**oblique externe** est le grand muscle latéral superficiel. Il part des côtes basses vers la crête **iliaque**, l'os coxal et le pubis. Fonction : baisser les côtes, fléchir et pencher le thorax, compresser le ventre. En salle : twists, side planks, woodchops, silhouette en V et anti-rotation.

---

L'**oblique interne** est sous l'externe. Il s'accroche près de l'épine iliaque et du fascia thoraco-lombaire, puis vers les côtes basses et le pubis. Fonction proche : flexion / inclinaison / compression. Avec l'externe, il gère surtout la **rotation** du tronc, clé pour la stabilité en squats et portés.

---

Le **transverse** agit comme une ceinture profonde autour du ventre. Il ne « gonfle » pas le six-pack ; il augmente la **pression intra-abdominale**. En musculation, c'est lui (avec le souffle) qui aide à rigidifier le tronc sur squat, deadlift et développés lourds.

---

À retenir : crunchs → **grand droit**. Rotation / côtés → **obliques**. Tenir la barre lourde → **transverse** + respiration.`,
    durationSec: 125,
    difficulty: "BEGINNER",
    order: 6,
    xpReward: 25,
    tags: ["abdos", "core", "obliques"],
    illustrationUrl: "/uploads/tronc-abdominaux.png",
    ...CP.musclesHaut,
    questions: [
      ...legendTextQuestions("/uploads/tronc-abdominaux.png"),
      qcm(
        "Le transverse sert surtout à…",
        "Augmenter la pression intra-abdominale",
        ["Étendre le genou", "Supiner la main", "Plier uniquement le coude"],
        "Ceinture profonde = stabilité sous charge.",
      ),
      qcm(
        "Les obliques gèrent surtout…",
        "La rotation et l'inclinaison du tronc",
        [
          "L'extension du genou",
          "La dorsiflexion",
          "La rétraction scapulaire seule",
        ],
        "Externe + interne = rotation et flexion latérale.",
      ),
      tf(
        "Le transverse sert uniquement à faire apparaître un six-pack.",
        false,
        "Faux : son rôle clé est la pression et la stabilité du tronc.",
      ),
    ],
  },
  {
    title: "Le dos",
    subtitle: "",
    markdown: `Premier volet dos : les muscles de la **largeur** et du **tirage**, ceux qui construisent le V-taper et la rétraction d'omoplates.

---

Sur l'illustration (côté gauche coloré) : le **deltoïde postérieur** en violet, les **rhomboïdes** en vert, le **grand rond** en orange et le **grand dorsal** en bleu.

---

Le **grand dorsal** est le vaste muscle du bas/milieu du dos. Il s'accroche sur vertèbres lombaires et thoraciques basses, sacrum, crête iliaque et dernières côtes, puis rejoint l'**humérus** sous l'aisselle. Fonction : ramener le bras vers le bas et en dedans (surtout bras levé). En musculation, c'est le roi de la largeur : **tractions**, tirages verticaux, rows.

---

Les **rhomboïdes** (grand et petit) relient les apophyses épineuses des vertèbres thoraciques hautes au bord interne de l'**omoplate**. Fonction : tirer l'omoplate vers la colonne (rétraction) et l'orienter. En salle, chaque **rowing** bien initié par les omoplates les recrute ; dos épais au milieu.

---

Le **grand rond** part du bord bas de l'omoplate vers l'**humérus**. Fonction : ramener le bras en arrière et en dedans (proche du grand dorsal). On l'appelle parfois le « petit lat » ; il épaissit le haut du dos sur les tirages.

---

Le **deltoïde postérieur** est le chef arrière de l'épaule, bien visible sur les planches du thorax postérieur. Il s'insère depuis l'omoplate vers l'**humérus**. Fonction : porter le bras en arrière. En musculation, **face pulls**, oiseau, reverse pec-deck, indispensable pour équilibrer trop de développé couché.

---

À retenir : largeur → **grand dorsal**. Épaisseur milieu → **rhomboïdes**. Tirage + épaule arrière → **grand rond** + **deltoïde postérieur**.`,
    durationSec: 130,
    difficulty: "BEGINNER",
    order: 7,
    xpReward: 25,
    tags: ["dos", "tirage", "grand-dorsal"],
    illustrationUrl: "/uploads/dos-muscles.png",
    ...CP.musclesHaut,
    questions: [
      ...legendTextQuestions("/uploads/dos-muscles.png"),
      qcm(
        "Quel exercice cible surtout la largeur du dos ?",
        "Tractions / tirages verticaux",
        ["Leg curls", "Mollets debout", "Crunchs"],
        "Grand dorsal = muscle clé du V-taper.",
      ),
      tf(
        "Les face pulls ciblent le deltoïde postérieur.",
        true,
        "Vrai : extension horizontale et rotation externe sollicitent ce chef.",
      ),
    ],
  },
  {
    title: "Trapèze et érecteurs",
    subtitle: "",
    markdown: `Deuxième volet dos : **trapèze**, cou / omoplate haute, et **érecteurs** (posture et chaîne postérieure).

---

Sur l'illustration : le **trapèze** en bleu, les **érecteurs du rachis** en orange et l'**élévateur de la scapula** en vert (vue profonde).

---

Le **trapèze** est le grand triangle du haut du dos. Sa base suit la nuque jusqu'aux vertèbres thoraciques ; il s'accroche aussi sur l'acromion et l'épine de l'**omoplate**. Fonction : hausser, rétracter ou abaisser l'épaule selon la partie (supérieure / moyenne / inférieure), et incliner la tête. En salle : shruggs (haut), rows / face pulls (moyen-inf), pas seulement hausser les épaules.

---

L'**élévateur de la scapula** relie les dernières cervicales à l'angle supérieur de l'**omoplate**. Fonction : relever / basculer l'omoplate et incliner la tête. Il travaille avec le trapèze supérieur ; trop de tension ici = nuque « béton » après shruggs lourds mal dosés.

---

Les **érecteurs du rachis** forment la masse longitudinale le long de la colonne (depuis le sacrum / crête iliaque vers le haut). Fonction : **étendre** le rachis, le tenir droit, permettre une inclinaison latérale contrôlée. En musculation, ils stabilisent **soulevé de terre**, good mornings et hyperextensions, pilier de la chaîne postérieure.

---

À retenir : posture haute → **trapèze** + **élévateur**. Tenir le dos sous barre → **érecteurs**. Un dos complet = largeur (leçon précédente) + ces muscles de tenue.`,
    durationSec: 120,
    difficulty: "BEGINNER",
    order: 8,
    xpReward: 25,
    tags: ["trapeze", "erecteurs", "posture"],
    illustrationUrl: "/uploads/trapeze-erecteurs.png",
    ...CP.musclesHaut,
    questions: [
      ...legendTextQuestions("/uploads/trapeze-erecteurs.png"),
      qcm(
        "Les shruggs ciblent surtout…",
        "La partie supérieure du trapèze",
        ["Le quadriceps", "Le tibial antérieur", "Le petit pectoral"],
        "Haussement d'épaules = trapèze supérieur.",
      ),
      tf(
        "Les érecteurs sont sollicités en soulevé de terre.",
        true,
        "Vrai : ils stabilisent et étendent le rachis sous charge.",
      ),
    ],
  },
  // ── CHECKPOINT 2 : muscles-bas (orders 11-14) ────────────────────
  {
    title: "Devant de cuisse",
    subtitle: "",
    markdown: `Devant la cuisse : extension du genou, flexion de hanche et stabilité, les gros moteurs du squat.

---

Sur l'illustration : le **quadriceps** en rouge, l'**ilio-psoas** en vert et le **tenseur du fascia lata** (TFL) en orange.

---

Le **quadriceps** (quatre chefs : vaste latéral, médial, intermédiaire, droit fémoral) occupe le devant de la cuisse. Les chefs se réunissent sur la **rotule** puis le ligament patellaire jusqu'à la **tubérosité tibiale**. Fonction principale : **étendre le genou** ; le droit fémoral aide aussi à fléchir la hanche. Squats, presses, fentes, leg extensions = travail majeur.

---

Le **sartorius** est le long ruban qui croise la cuisse. Il part de l'épine iliaque antéro-supérieure vers le haut interne du **tibia** (patte d'oie). Fonction : fléchir genou et hanche, aider abduction / rotation externe. Il sculpte la ligne interne de la cuisse plus qu'il ne porte des charges énormes.

---

L'**ilio-psoas** (psoas + iliaque) est le grand fléchisseur de hanche. Il rejoint le **petit trochanter** du fémur. Fonction : ramener la cuisse vers le bassin et stabiliser le rachis en station. En salle, relevés de jambes et courses de genoux le sollicitent ; trop tendu, il tire souvent sur le bas du dos.

---

Le **tenseur du fascia lata** (TFL) est sur le côté de la hanche. Il part de la crête iliaque / épine iliaque et se prolonge dans le **tractus ilio-tibial**. Fonction : abduction de hanche et stabilité du bassin en appui. Utile en fentes latérales et pour éviter que le genou « tombe » en dedans.

---

À retenir : squats / presses → **quadriceps**. Flexion de hanche → **ilio-psoas**. Stabilité latérale → **TFL**. Le **sartorius** complète le devant.`,
    durationSec: 130,
    difficulty: "BEGINNER",
    order: 9,
    xpReward: 25,
    tags: ["quadriceps", "cuisse", "hanche"],
    illustrationUrl: "/uploads/devant-cuisse.png",
    ...CP.musclesBas,
    questions: [
      ...legendTextQuestions("/uploads/devant-cuisse.png"),
      qcm(
        "Combien de chefs possède le quadriceps ?",
        "Quatre",
        ["Deux", "Trois", "Six"],
        "Vaste latéral, médial, intermédiaire, droit fémoral.",
      ),
      tf(
        "L'ilio-psoas est un puissant fléchisseur de hanche.",
        true,
        "Vrai : il tire la cuisse vers le bassin via le petit trochanter.",
      ),
    ],
  },
  {
    title: "Arrière de cuisse",
    subtitle: "",
    markdown: `L'arrière de cuisse, c'est surtout les **ischio-jambiers** + le gros **adducteur** : flexion du genou et extension de hanche.

---

Sur l'illustration : le **biceps fémoral** en bleu (chef court en vert), le **semi-tendineux** et le **grand adducteur** en violet. Le **semi-membraneux** est sous les muscles (non coloré en surface).

---

Le **biceps fémoral** (chefs long et court) couvre la partie externe de l'arrière de cuisse. Le long part de l'**ischion**, le court de la ligne âpre du **fémur** ; le tendon commun va vers le haut de la **fibula**. Fonction : fléchir le genou (légère rotation externe) et étendre la cuisse sur le bassin. Leg curls et soulevés le recrutent fort.

---

Le **semi-tendineux** part de l'**ischion**, descend et se termine sur le tibia haut interne via la **patte d'oie**. Fonction : fléchir le genou, rotation interne, extension de hanche. Comme son voisin, c'est un pilier des **RDL** et leg curls.

---

Le **semi-membraneux** (partiellement sous le semi-tendineux) va aussi de l'**ischion** au haut du **tibia**. Même famille de fonctions : flexion / rotation interne du genou et extension de hanche. Les trois ischios forment la chaîne postérieure de la cuisse.

---

Le **grand adducteur** est massif, sous les ischios sur le plan interne. Il relie l'**ischion** / pubis à la face postérieure du **fémur**. Fonction : ramener la cuisse en dedans (adduction) et rotation externe. En salle, adductor machine et squats larges le sollicitent ; il stabilise aussi la trajectoire des genoux.

---

À retenir : leg curls / RDL → **ischios** (biceps fémoral, semi-tendineux, semi-membraneux). Serrer les cuisses / squat large → **grand adducteur**.`,
    durationSec: 130,
    difficulty: "BEGINNER",
    order: 10,
    xpReward: 25,
    tags: ["ischios", "adducteurs"],
    illustrationUrl: "/uploads/arriere-cuisse.png",
    ...CP.musclesBas,
    questions: [
      ...legendTextQuestions("/uploads/arriere-cuisse.png"),
      qcm(
        "Le grand adducteur sert surtout à…",
        "Ramener la cuisse en dedans",
        ["Étendre le coude", "Supiner la main", "Plier le cou"],
        "Adduction = rapprocher la cuisse de la ligne médiane.",
      ),
      tf(
        "Les leg curls ciblent les ischio-jambiers.",
        true,
        "Vrai : flexion du genou sous résistance = travail ischios.",
      ),
    ],
  },
  {
    title: "Les fessiers",
    subtitle: "",
    markdown: `Les **fessiers** : puissance d'extension et stabilité du bassin. On garde les trois principaux (grand, moyen, petit).

---

Sur l'illustration : le **grand fessier** en rouge, le **moyen fessier** en bleu et le **petit fessier** en jaune (**sous le moyen fessier**).

---

Le **grand fessier** forme le volume de la fesse. Il s'accroche sur crête iliaque, sacrum, coccyx et fascias, puis vers la tubérosité glutéale du **fémur** (et le fascia lata). Fonction : étendre la cuisse en arrière et rotation externe ; il fixe le bassin sur le fémur pour tenir debout. Squats, deadlifts, **hip thrusts** : muscle de puissance du bas du corps.

---

Le **moyen fessier** est sous le grand, plus haut sur l'aile iliaque. Ses fibres convergent vers le **grand trochanter** du fémur. Fonction : **abduction** de cuisse et rotations ; stabilité du bassin en appui unipodal. Fentes et travail unilatéral le révèlent ; un medius faible = souvent genou qui rentre.

---

Le **petit fessier** est plus profond, sous le moyen. Même logique : ilion → **grand trochanter**. Fonction proche du moyen : abduction et contrôle de hanche. Ensemble, moyen + petit gardent le bassin horizontal quand tu marches ou fentes sur une jambe.

---

À retenir : extension / puissance → **grand fessier**. Stabilité genou-bassin en unilatéral → **moyen** et **petit** fessiers.`,
    durationSec: 115,
    difficulty: "BEGINNER",
    order: 11,
    xpReward: 25,
    tags: ["fessiers", "hanche"],
    illustrationUrl: "/uploads/fessiers.png",
    ...CP.musclesBas,
    questions: [
      ...legendTextQuestions("/uploads/fessiers.png"),
      qcm(
        "Le hip thrust cible surtout…",
        "Le grand fessier",
        ["Le tibial antérieur", "Le biceps", "Le transverse"],
        "Extension de hanche contre résistance = grand fessier.",
      ),
      tf(
        "Le petit fessier est superficiel au moyen fessier.",
        false,
        "Faux : le petit est plus profond, sous le moyen.",
      ),
    ],
  },
  {
    title: "Bas de jambes",
    subtitle: "",
    markdown: `Mollets, tibial et fibulaires : poussée au sol, relevé de pied et stabilité de cheville.

---

Sur l'illustration : le **gastrocnémien** en rouge, le **soléaire** en orange (**sous les gastrocnémiens**), le **tibial antérieur** en bleu et le **long fibulaire** en jaune.

---

Le **gastrocnémien** (jumeaux médial et latéral) forme le galbe du mollet. Il naît près des épicondyles du **fémur**, puis rejoint le **tendon d'Achille** sur le **calcanéum**. Fonction : planter le pied (flexion plantaire) ; pied au sol, il soulève le talon et peut aider à fléchir le genou. Essentiel à la marche et aux **molets debout**.

---

Le **soléaire** est sous le gastroc, plus « plat ». Il s'insère sur **tibia** et **fibula**, puis fusionne dans le même **tendon d'Achille**. Fonction proche : extension du pied / lever le talon. Les **molets assis** (genou fléchi) le ciblent davantage ; mollet complet = debout + assis.

---

Le **tibial antérieur** couvre le devant de la jambe. Il part du haut du **tibia** et se termine vers le bord interne du pied (1er cunéiforme). Fonction : relever le pied (**dorsiflexion**) et le tourner en dedans. Équilibre les mollets ; utile pour la marche et pour ne pas « taper » du pied.

---

Le **long fibulaire** court sur le bord externe de la jambe (fibula), contourne la malléole latérale et croise sous le pied vers le 1er métatarsien. Fonction : planter le pied et l'éverser (vers l'extérieur). Il stabilise la cheville sur le côté, précieux en fentes, course et appui instable.

---

À retenir : molets debout → **gastroc**. Molets assis → **soléaire**. Relever le pied → **tibial antérieur**. Stabilité latérale → **long fibulaire**.`,
    durationSec: 125,
    difficulty: "BEGINNER",
    order: 12,
    xpReward: 25,
    tags: ["mollets", "jambes", "cheville"],
    illustrationUrl: "/uploads/bas-jambes.png",
    ...CP.musclesBas,
    questions: [
      ...legendTextQuestions("/uploads/bas-jambes.png"),
      qcm(
        "Les molets assis (genou fléchi) ciblent surtout…",
        "Le soléaire",
        ["Le gastrocnémien", "Le quadriceps", "Le grand dorsal"],
        "Genou fléchi = gastroc raccourci, soléaire dominant.",
      ),
      tf(
        "Le tibial antérieur relève surtout le pied (dorsiflexion).",
        true,
        "Vrai : c'est le grand releveur du pied sur le devant de la jambe.",
      ),
    ],
  },
  // ── CHECKPOINT 3 : articulations (orders 15-19) ─────────────────
  {
    title: "L'épaule",
    subtitle: "Glenohumérale et stabilité scapulaire.",
    markdown: `# Articulation de l'épaule

La **glenohumérale** : tête humérale + glène (peu profonde) → très mobile.
Stabilité = coiffe + contrôle de l'omoplate + ligaments.
Mobilité sans contrôle = risque.
En musculation : scapula stable avant de « presser » lourd.`,
    durationSec: 95,
    difficulty: "INTERMEDIATE",
    order: 13,
    xpReward: 30,
    tags: ["epaule", "articulation"],
    ...CP.articulations,
    questions: quiz6(
      qcm(
        "Pourquoi l'épaule est-elle très mobile ?",
        "La glène est peu profonde",
        [
          "Elle n'a aucun ligament",
          "Le fémur y s'articule",
          "Elle est une charnière pure",
        ],
        "Emboîture peu profonde = grande amplitude, moins de stabilité osseuse.",
      ),
      qcm(
        "La coiffe des rotateurs sert surtout à…",
        "Stabiliser la tête humérale dans la glène",
        ["Étendre le genou", "Produire de l'insuline", "Remplacer le trapèze"],
        "Coiffe = stabilisation dynamique de l'épaule.",
      ),
      qcm(
        "Avant un développé lourd, on cherche surtout…",
        "Une omoplate stable et rétractée",
        [
          "Une flexion lombaire maximale",
          "Une prono-supination forcée",
          "Un genou en valgus",
        ],
        "Scapula stable = meilleure transmission de force.",
      ),
      fillBlank(
        "L'articulation entre l'humérus et l'omoplate s'appelle l'articulation ___.",
        "glenohumérale",
        ["coxo-fémorale", "tibio-talienne", "radio-ulnaire"],
        "Gleno (glène) + humérale (humérus).",
      ),
      tf(
        "La stabilité de l'épaule dépend seulement de l'os, jamais des muscles.",
        false,
        "Faux : coiffe et scapula sont essentielles.",
      ),
      tf(
        "Une épaule très mobile nécessite un bon contrôle musculaire.",
        true,
        "Vrai : mobilité sans stabilité augmente le risque de blessure.",
      ),
    ),
  },
  {
    title: "Coude et poignet",
    subtitle: "Charnière et prono-supination.",
    markdown: `# Coude & poignet

Le **coude** : surtout charnière (flexion/extension) + pivot radio-ulnaire.
Le **poignet** : multi-axes, fine orientation de la main.
Prono-supination = tourner la paume.
Grips et douleur de coude : souvent sursollicitation tendineuse.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 14,
    xpReward: 30,
    tags: ["coude", "poignet"],
    ...CP.articulations,
    questions: quiz6(
      qcm(
        "La prono-supination se joue surtout au niveau…",
        "Du couple radius / ulna",
        ["Du genou", "De la cheville seule", "Des côtes"],
        "Pivot radio-ulnaire au coude et proche du poignet.",
      ),
      qcm(
        "Le coude est surtout une articulation de type…",
        "Charnière (flexion/extension)",
        ["Bille pure", "Pivot cervical", "Synarthrose fixe"],
        "Flexion/extension dominante + pivot pour la rotation.",
      ),
      qcm(
        "La douleur au coude en musculation est souvent…",
        "Tendineuse (sursollicitation)",
        [
          "Osseuse aiguë systématique",
          "Liée au sacrum",
          "Sans lien avec les grips",
        ],
        "Tennis/golfer's elbow = surcharge tendineuse.",
      ),
      fillBlank(
        "Tourner la paume vers le bas s'appelle la ___.",
        "pronation",
        ["supination", "dorsiflexion", "abduction"],
        "Pronation = paume vers le sol.",
      ),
      tf(
        "Le coude ne permet que la rotation comme une épaule.",
        false,
        "Faux : le coude est surtout une charnière + pivot limité.",
      ),
      tf(
        "Le poignet permet une orientation fine de la main.",
        true,
        "Vrai : articulation multi-axes utile pour les prises.",
      ),
    ),
  },
  {
    title: "La hanche",
    subtitle: "Emboîture profonde, mobilité et stabilité.",
    markdown: `# Hanche

**Coxo-fémorale** : tête fémorale dans l'acétabulum (profond).
Plus stable que l'épaule, moins « libre ».
Flexion, extension, abduction, rotation.
Squat / hinge demandent mobilité de hanche *et* contrôle pelvien.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 15,
    xpReward: 30,
    tags: ["hanche"],
    ...CP.articulations,
    questions: quiz6(
      qcm(
        "Par rapport à l'épaule, la hanche est en général…",
        "Plus stable (emboîture plus profonde)",
        ["Moins osseuse", "Une simple charnière de genou", "Sans ligaments"],
        "Acétabulum profond = plus de stabilité osseuse.",
      ),
      qcm(
        "L'articulation de la hanche est…",
        "Coxo-fémorale",
        ["Glenohumérale", "Tibio-talienne", "Radio-ulnaire"],
        "Coxal (bassin) + fémur.",
      ),
      qcm(
        "Un squat profond demande surtout…",
        "Mobilité de hanche et contrôle pelvien",
        [
          "Uniquement des mollets",
          "Une rotation cervicale",
          "Zéro flexion de genou",
        ],
        "Hanche + bassin conditionnent la profondeur et la posture.",
      ),
      fillBlank(
        "La tête du fémur s'articule dans l'___.",
        "acétabulum",
        ["glène", "ménisque seul", "rotule"],
        "Acétabulum = emboîture de la hanche.",
      ),
      tf(
        "La hanche n'autorise aucune rotation.",
        false,
        "Faux : rotations interne/externe existent.",
      ),
      tf(
        "La hanche est plus stable que l'épaule grâce à une emboîture plus profonde.",
        true,
        "Vrai : acétabulum vs glène peu profonde.",
      ),
    ),
  },
  {
    title: "Le genou",
    subtitle: "Ligaments croisés, collatéraux et ménisques.",
    markdown: `# Genou

Charnière modifiée : flexion / extension (+ légère rotation fléchi).
**LCA / LCP** : stabilité avant-arrière.
**Collatéraux** : stabilité latérale.
**Ménisques** : amortissent et congruence.
Alignement hanche-genou-pied protège cette articulation.`,
    durationSec: 100,
    difficulty: "INTERMEDIATE",
    order: 16,
    xpReward: 30,
    tags: ["genou"],
    ...CP.articulations,
    questions: quiz6(
      qcm(
        "Les ménisques servent surtout à…",
        "Amortir et améliorer le contact articulaire",
        [
          "Produire de l'insuline",
          "Remplacer le quadriceps",
          "Fixer l'omoplate",
        ],
        "Cushioning + congruence fémoro-tibiale.",
      ),
      qcm(
        "Le LCA stabilise surtout…",
        "L'avant-arrière du genou",
        ["La rotation du coude", "La prono-supination", "La mâchoire"],
        "Ligament croisé antérieur = anti-tiroir.",
      ),
      qcm(
        "Un alignement hanche-genou-pied correct protège…",
        "Le genou en squat et fentes",
        ["Uniquement le poignet", "Le sternum", "Les côtes"],
        "Valgus et rotation excessive stressent le genou.",
      ),
      fillBlank(
        "Les ligaments ___ stabilisent le genou latéralement.",
        "collatéraux",
        ["croisés uniquement", "patellaires seuls", "scapulaires"],
        "Collatéral médial et latéral = stabilité latérale.",
      ),
      tf(
        "Le genou est une rotule libre sans ligaments importants.",
        false,
        "Faux : ligaments et ménisques sont centraux.",
      ),
      tf(
        "Le genou autorise une légère rotation quand il est fléchi.",
        true,
        "Vrai : charnière modifiée avec rotation en flexion.",
      ),
    ),
  },
  {
    title: "La cheville",
    subtitle: "Tibio-talienne et rôle en appui.",
    markdown: `# Cheville

**Tibio-talienne** : dorsiflexion / plantiflexion principales.
Stabilité latérale : ligaments (souvent externe plus vulnérable).
Toute la force des squats et sauts passe ici.
Mobilité de cheville limite souvent la profondeur de squat.`,
    durationSec: 90,
    difficulty: "INTERMEDIATE",
    order: 17,
    xpReward: 30,
    tags: ["cheville"],
    ...CP.articulations,
    questions: quiz6(
      qcm(
        "Une dorsiflexion limitée peut freiner…",
        "La profondeur de squat",
        ["La couleur des haltères", "Le nom du muscle", "La digestion seule"],
        "Cheville bloquée = buste qui penche ou talons qui décollent.",
      ),
      qcm(
        "L'articulation principale de la cheville est…",
        "Tibio-talienne",
        ["Radio-ulnaire", "Glenohumérale", "Coxo-fémorale"],
        "Tibia + talus = dorsi/plantiflexion.",
      ),
      qcm(
        "Les ligaments latéraux de la cheville sont souvent…",
        "Plus vulnérables (entorses externes)",
        ["Absents", "Uniquement médiaux", "Liés au sternum"],
        "Entorse en inversion fréquente en sport.",
      ),
      fillBlank(
        "Relever le pied vers le tibia s'appelle la ___.",
        "dorsiflexion",
        ["plantiflexion", "pronation", "cyphose"],
        "Dorsiflexion = rapprocher le dos du pied du tibia.",
      ),
      tf(
        "La cheville ne joue aucun rôle dans la transmission de force au sol.",
        false,
        "Faux : c'est un maillon clé de la chaîne d'appui.",
      ),
      tf(
        "La mobilité de cheville influence la technique de squat.",
        true,
        "Vrai : dorsiflexion insuffisante limite souvent la profondeur.",
      ),
    ),
  },
  // ── CHECKPOINT 4 : tissus (orders 20-21) ─────────────────────────
  {
    title: "Fibre et sarcomère",
    subtitle: "Contraction, hypertrophie et recrutement.",
    markdown: `# Fibre & sarcomère

Muscle = fibres → myofibrilles → **sarcomères**.
Contraction = glissement actine / myosine.
Hypertrophie = tension mécanique + récupération + protéines.
Sans récupération, le stimulus reste incomplet.

---

# Unité motrice

Unité motrice = **motoneurone + fibres** qu'il innerve.
Plus la charge / intention monte, plus on recrute d'unités.
Fibres rapides : recrutées pour efforts intenses.
Technique claire = meilleur signal nerveux utile.`,
    durationSec: 95,
    difficulty: "ADVANCED",
    order: 18,
    xpReward: 35,
    tags: ["fibre", "sarcomere", "unite-motrice", "recrutement"],
    ...CP.tissus,
    questions: quiz6(
      qcm(
        "Quelle est l'unité contractile du muscle ?",
        "Le sarcomère",
        ["Le tendon", "Le ménisque", "La clavicule"],
        "Actine + myosine glissent au niveau du sarcomère.",
      ),
      qcm(
        "Une unité motrice comprend…",
        "Un motoneurone et les fibres qu'il innerve",
        ["Uniquement un tendon", "Seulement un os", "Un ménisque et une côte"],
        "Principe du recrutement progressif.",
      ),
      qcm(
        "L'hypertrophie nécessite surtout…",
        "Tension mécanique + récupération + protéines",
        ["Zéro sommeil", "Uniquement du cardio", "Aucun stimulus"],
        "Stimulus + récupération + matériau (protéines).",
      ),
      fillBlank(
        "La contraction musculaire repose sur le glissement de l'___ et de la myosine.",
        "actine",
        ["fibula", "sternum", "rotule"],
        "Filaments d'actine et de myosine dans le sarcomère.",
      ),
      tf(
        "L'hypertrophie n'a pas besoin de récupération.",
        false,
        "Faux : récupération et protéines consolident l'adaptation.",
      ),
      tf(
        "Toutes les fibres d'un muscle se contractent toujours à 100 % dès la première rep légère.",
        false,
        "Faux : le recrutement augmente avec la demande (principe de Henneman).",
      ),
    ),
  },
  {
    title: "Tendons et ligaments",
    subtitle: "Transmission de force vs stabilité.",
    markdown: `# Tendons & ligaments

**Tendon** : muscle → os (transmet la force).
**Ligament** : os → os (guide / stabilise l'articulation).
Ils s'adaptent plus lentement que le muscle.
Progresser trop vite charge ces tissus. Patience utile.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 19,
    xpReward: 35,
    tags: ["tendons", "ligaments"],
    ...CP.tissus,
    questions: quiz6(
      qcm(
        "Un tendon relie…",
        "Le muscle à l'os",
        [
          "Deux os seulement",
          "Deux muscles uniquement",
          "Le nerf au cartilage",
        ],
        "Transmission de la force musculaire vers l'os.",
      ),
      qcm(
        "Un ligament relie…",
        "Deux os entre eux",
        [
          "Un muscle à un nerf",
          "Un tendon à un muscle",
          "Un sarcomère à un autre",
        ],
        "Stabilisation et guidage articulaire.",
      ),
      qcm(
        "Progresser trop vite en charge peut surcharger surtout…",
        "Les tendons et ligaments",
        ["Les cheveux", "Les ongles", "Le sternum"],
        "Adaptation tendineuse plus lente que musculaire.",
      ),
      fillBlank(
        "Un ___ relie un muscle à un os et transmet la force.",
        "tendon",
        ["ligament", "ménisque", "sarcomère"],
        "Tendon = extrémité musculo-tendineuse.",
      ),
      tf(
        "Les tendons s'adaptent aussi vite que le muscle.",
        false,
        "Faux : adaptation tendineuse plus lente.",
      ),
      tf(
        "Les ligaments stabilisent les articulations.",
        true,
        "Vrai : os à os, ils guident et limitent les mouvements.",
      ),
    ),
  },
  // ── CHECKPOINT 5 : organisation-mvt (orders 22-23) ──────────────
  {
    title: "Agoniste, antagoniste, stabilisateur",
    subtitle: "Lire un mouvement musculaire.",
    markdown: `# Rôles musculaires

**Agoniste** : moteur principal du mouvement.
**Antagoniste** : oppose / contrôle (souvent l'autre face).
**Stabilisateur** : fixe un segment pour laisser travailler ailleurs.
Exemple curl : biceps agoniste, triceps antagoniste.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 20,
    xpReward: 35,
    tags: ["agoniste", "antagoniste"],
    ...CP.organisation,
    questions: quiz6(
      qcm(
        "Dans un curl biceps, le triceps agit surtout comme…",
        "Antagoniste",
        ["Agoniste principal", "Os de la jambe", "Ménisque"],
        "Il oppose la flexion du coude de façon contrôlée.",
      ),
      qcm(
        "L'agoniste est…",
        "Le moteur principal du mouvement",
        ["Un os du pied", "Un ligament", "Un disque intervertébral"],
        "Celui qui produit le mouvement visible.",
      ),
      qcm(
        "En développé couché, le transverse agit plutôt comme…",
        "Stabilisateur",
        [
          "Agoniste du mouvement de poussée",
          "Antagoniste du triceps",
          "Os du genou",
        ],
        "Core = stabilisation sous charge.",
      ),
      fillBlank(
        "Le muscle qui oppose le mouvement principal s'appelle l'___.",
        "antagoniste",
        ["agoniste", "sternum", "fémur"],
        "Antagoniste = côté opposé, souvent en étirement contrôlé.",
      ),
      tf(
        "Un stabilisateur produit toujours le mouvement visible principal.",
        false,
        "Faux : il fixe pour permettre le mouvement ailleurs.",
      ),
      tf(
        "Dans un curl, le biceps est l'agoniste.",
        true,
        "Vrai : il produit la flexion du coude.",
      ),
    ),
  },
  {
    title: "Chaînes et synergies",
    subtitle: "Chaîne postérieure, poussée et tirage.",
    markdown: `# Chaînes

Les muscles travaillent en **équipes** (synergies).
Chaîne postérieure : ischios, fessiers, érecteurs…
Poussée haut : pecs, deltoïde ant., triceps.
Tirage : dos, biceps, rétracteurs.
Équilibrer push/pull et ant/post réduit les déséquilibres.`,
    durationSec: 95,
    difficulty: "ADVANCED",
    order: 21,
    xpReward: 35,
    tags: ["chaines", "synergies"],
    ...CP.organisation,
    questions: quiz6(
      qcm(
        "Un mouvement de tirage sollicite surtout…",
        "Le dos et les biceps",
        [
          "Uniquement les mollets",
          "Les adducteurs seuls",
          "Le transverse seul",
        ],
        "Pattern pull = dorsaux + bras fléchisseurs.",
      ),
      qcm(
        "La chaîne postérieure comprend surtout…",
        "Ischios, fessiers, érecteurs",
        [
          "Pectoraux et deltoïde antérieur",
          "Tibial antérieur seul",
          "Intercostaux",
        ],
        "Chaîne arrière du corps = hinge et extension.",
      ),
      qcm(
        "Une synergie musculaire, c'est…",
        "Plusieurs muscles qui travaillent ensemble",
        ["Un muscle qui travaille seul", "Un os cassé", "Un ligament déchiré"],
        "Coordination pour produire un mouvement efficace.",
      ),
      fillBlank(
        "Ischios, fessiers et érecteurs font partie de la chaîne ___.",
        "postérieure",
        ["antérieure du bras", "respiratoire seule", "digestive"],
        "Chaîne postérieure = dos de la jambe + dos + fessiers.",
      ),
      tf(
        "Trop de développé couché sans tirage peut déséquilibrer l'épaule.",
        true,
        "Vrai : l'équilibre poussée/tirage compte.",
      ),
      tf(
        "Les muscles ne travaillent jamais en équipe.",
        false,
        "Faux : synergies et chaînes sont la norme en mouvement.",
      ),
    ),
  },
  // ── CHECKPOINT 6 : anatomie-appliquee (orders 24-29) ────────────
  {
    title: "Plans et axes",
    subtitle: "Sagittal, frontal, transverse.",
    markdown: `# Plans du mouvement

**Sagittal** : avant/arrière (squat, curl).
**Frontal** : latéral (élévations latérales).
**Transverse** : rotations (row rotation, woodchop).
Programmer dans plusieurs plans = athlète plus complet.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 22,
    xpReward: 35,
    tags: ["plans", "axes"],
    ...CP.applique,
    questions: quiz6(
      qcm(
        "Un squat évolue surtout dans le plan…",
        "Sagittal",
        ["Uniquement transverse", "Uniquement frontal", "Hors de tout plan"],
        "Flexion/extension hanche et genou = plan sagittal.",
      ),
      qcm(
        "Les élévations latérales travaillent surtout dans le plan…",
        "Frontal",
        ["Sagittal pur", "Transverse seul", "Aucun plan anatomique"],
        "Abduction de l'épaule = mouvement latéral.",
      ),
      qcm(
        "Un woodchop implique surtout le plan…",
        "Transverse (rotation)",
        ["Sagittal seul", "Frontal seul", "Vertical strict"],
        "Rotation du tronc = plan transverse.",
      ),
      fillBlank(
        "Le plan avant/arrière du corps s'appelle le plan ___.",
        "sagittal",
        ["frontal", "transverse", "oblique"],
        "Sagittal = flexion/extension.",
      ),
      tf(
        "Toutes les séances de musculation n'utilisent qu'un seul plan de mouvement.",
        false,
        "Faux : on combine souvent plusieurs plans.",
      ),
      tf(
        "Programmer dans plusieurs plans rend l'entraînement plus complet.",
        true,
        "Vrai : force et contrôle dans toutes les directions.",
      ),
    ),
  },
  {
    title: "Anatomie du push et du pull",
    subtitle: "Développé, row, tractions : qui tire ?",
    markdown: `# Push & pull

**Push** (développé, dips) : pecs, deltoïde ant., triceps.
**Pull** (row, tractions) : lats, rhomboïdes, biceps, érecteurs.
Varier angles (horizontal / vertical) couvre mieux le haut du corps.
Ratio pull ≥ push souvent recommandé pour l'épaule.`,
    durationSec: 95,
    difficulty: "ADVANCED",
    order: 23,
    xpReward: 35,
    tags: ["push", "pull"],
    ...CP.applique,
    questions: quiz6(
      qcm(
        "Les tractions sont typiquement un pattern…",
        "De tirage (pull)",
        ["De hinge pur", "De mollet seul", "De crunch"],
        "Tirage vertical = grand dorsal + biceps.",
      ),
      qcm(
        "Un développé couché est un pattern de…",
        "Poussée (push)",
        ["Tirage pur", "Hinge", "Mollet"],
        "Pecs + deltoïde ant. + triceps.",
      ),
      qcm(
        "Un ratio pull ≥ push est souvent recommandé pour…",
        "Protéger l'épaule",
        ["Fragiliser le genou", "Éviter le dos", "Supprimer les biceps"],
        "Équilibre ant/post du haut du corps.",
      ),
      fillBlank(
        "Le développé couché est un mouvement de ___ (push).",
        "poussée",
        ["tirage", "hinge", "crunch"],
        "Push horizontal = pecs + triceps.",
      ),
      tf(
        "Un développé couché est un pattern de tirage.",
        false,
        "Faux : c'est un pattern de poussée.",
      ),
      tf(
        "Varier les angles de tirage couvre mieux le haut du corps.",
        true,
        "Vrai : horizontal vs vertical sollicite différemment le dos.",
      ),
    ),
  },
  {
    title: "Anatomie du squat et du hinge",
    subtitle: "Qui travaille en squat vs soulevé.",
    markdown: `# Squat & hinge

**Squat** : genoux avancent + hanches, quads & fessiers dominants.
**Hinge** (deadlift, RDL) : hanches reculent, chaîne postérieure.
Les deux chargent le tronc comme stabilisateur.
Choisir le pattern selon l'objectif musculaire.`,
    durationSec: 95,
    difficulty: "ADVANCED",
    order: 24,
    xpReward: 35,
    tags: ["squat", "hinge"],
    ...CP.applique,
    questions: quiz6(
      qcm(
        "Un hip hinge cible surtout…",
        "La chaîne postérieure",
        ["Les avant-bras seuls", "Les trapèzes seuls", "Les mollets seuls"],
        "RDL/deadlift = ischios + fessiers + érecteurs.",
      ),
      qcm(
        "En squat, les muscles dominants sont surtout…",
        "Quadriceps et fessiers",
        ["Mollets seuls", "Biceps", "Pectoraux"],
        "Extension genou + extension hanche.",
      ),
      qcm(
        "Le tronc agit surtout comme…",
        "Stabilisateur dans squat et hinge",
        ["Agoniste du curl", "Antagoniste du mollet", "Os du pied"],
        "Core = transmission de force et rigidité.",
      ),
      fillBlank(
        "Un mouvement où les hanches reculent (RDL, deadlift) s'appelle un ___.",
        "hinge",
        ["curl", "push", "crunch"],
        "Hip hinge = flexion de hanche dominante.",
      ),
      tf(
        "Squat et hinge recrutent exactement les mêmes muscles aux mêmes ratios.",
        false,
        "Faux : le dosage quads vs chaîne postérieure change.",
      ),
      tf(
        "Le choix squat vs hinge peut cibler différemment le bas du corps.",
        true,
        "Vrai : pattern différent = recrutement différent.",
      ),
    ),
  },
  {
    title: "Core et respiration",
    subtitle: "Diaphragme et pression intra-abdominale.",
    markdown: `# Core & souffle

Le **diaphragme** est un muscle respiratoire clé.
Inspirer et « pousser » doucement contre la ceinture abdominale crée de la **pression** (stabilité).
Utile sur squats et pulls lourds, sans bloquer à l'excès si malaise.
Core ≠ seulement crunchs.`,
    durationSec: 95,
    difficulty: "ADVANCED",
    order: 25,
    xpReward: 35,
    tags: ["respiration", "core"],
    ...CP.applique,
    questions: quiz6(
      qcm(
        "Le diaphragme est surtout…",
        "Un muscle respiratoire majeur",
        ["Un os du pied", "Un ménisque", "Un ligament du genou"],
        "Muscle principal de l'inspiration.",
      ),
      qcm(
        "La pression intra-abdominale sert surtout à…",
        "Stabiliser le tronc sous charge",
        ["Étendre le coude", "Supiner la main", "Plier le genou"],
        "Ceinture pressurisée = rigidité du core.",
      ),
      qcm(
        "Sur un squat lourd, le core sert surtout à…",
        "Transmettre la force et protéger le rachis",
        ["Remplacer les quads", "Éviter toute respiration", "Cibler le biceps"],
        "Stabilité = meilleure efficacité et sécurité.",
      ),
      fillBlank(
        "Le muscle principal de l'inspiration s'appelle le ___.",
        "diaphragme",
        ["gastrocnémien", "deltoïde", "rhomboïde"],
        "Diaphragme = respiration + stabilité.",
      ),
      tf(
        "Le core sert uniquement à faire des crunchs esthétiques.",
        false,
        "Faux : il stabilise sous charge via la pression et les muscles profonds.",
      ),
      tf(
        "Le souffle et le gainage aident à stabiliser le tronc sous barre.",
        true,
        "Vrai : pression intra-abdominale = ceinture naturelle.",
      ),
    ),
  },
  {
    title: "Composés et isolation",
    subtitle: "Multi-articulaires vs mono-articulaires.",
    markdown: `# Composés & isolation

**Composés** (squat, développé, rowing) : plusieurs articulations, plusieurs groupes musculaires, forte charge globale.
**Isolation** (curl, leg extension, élévations latérales) : une articulation dominante, ciblage précis.
Les composés construisent la base ; l'isolation affine un muscle faible ou esthétique.

---

En programme, les composés en début de séance (fraîcheur nerveuse) et l'isolation en fin (épuisement local) est une stratégie classique.

---

Exemple : développé couché (composé push) + écartés (isolation pec) ; squat (composé bas) + leg extension (isolation quad).

---

À retenir : composés = efficacité globale ; isolation = précision. Les deux se complètent.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 26,
    xpReward: 35,
    tags: ["composes", "isolation"],
    ...CP.applique,
    questions: quiz6(
      qcm(
        "Un squat est un exercice…",
        "Composé (multi-articulaire)",
        ["D'isolation pure", "De mollet seul", "De poignet seul"],
        "Hanche + genou + cheville sollicités.",
      ),
      qcm(
        "Un leg extension est un exercice…",
        "D'isolation (genou)",
        ["Composé complet", "De tirage vertical", "De hinge"],
        "Une articulation dominante = isolation.",
      ),
      qcm(
        "Placer les composés en début de séance permet…",
        "D'utiliser sa fraîcheur nerveuse sur les mouvements lourds",
        [
          "D'éviter tout travail musculaire",
          "De ne jamais s'échauffer",
          "De supprimer le core",
        ],
        "Qualité technique et charge sur les gros mouvements.",
      ),
      fillBlank(
        "Un exercice qui mobilise plusieurs articulations s'appelle un exercice ___.",
        "composé",
        ["isolation", "passif", "statique seul"],
        "Squat, deadlift, développé = composés.",
      ),
      tf(
        "L'isolation n'a aucune utilité dans un programme de musculation.",
        false,
        "Faux : elle cible précisément un muscle faible ou esthétique.",
      ),
      tf(
        "Les composés permettent de charger plusieurs groupes musculaires simultanément.",
        true,
        "Vrai : efficacité globale et transfert fonctionnel.",
      ),
    ),
  },
  {
    title: "Carte mentale du corps",
    subtitle: "Os → muscles → articulations → mouvement.",
    markdown: `# Révision du parcours

1. **Os** du bras, tronc, bassin et jambes.
2. **Muscles** régionaux (haut / bas).
3. **Articulations** qui guident le mouvement.
4. **Tissus & recrutement** qui expliquent la force.
5. **Organisation** : agonistes, chaînes, plans.
6. **Patterns** push, pull, squat, hinge, composés/isolation.

Tu peux maintenant lire un exercice : qui tire, qui stabilise, quelle articulation.`,
    durationSec: 100,
    difficulty: "ADVANCED",
    order: 27,
    xpReward: 40,
    tags: ["revision", "carte"],
    ...CP.applique,
    questions: quiz6(
      qcm(
        "Dans ce parcours, on commence par étudier…",
        "Les os",
        ["Uniquement le cardio", "Seulement la nutrition", "Rien de structuré"],
        "Fondation osseuse avant muscles et mouvement.",
      ),
      qcm(
        "Après les muscles régionaux, on étudie surtout…",
        "Les articulations",
        ["Uniquement les mollets", "Seulement les ongles", "Rien d'autre"],
        "Os → muscles → articulations → tissus → organisation → appliqué.",
      ),
      qcm(
        "Comprendre l'anatomie aide à…",
        "Choisir ses exercices et protéger les articulations",
        [
          "Éviter tout entraînement",
          "Supprimer le repos",
          "Ignorer la technique",
        ],
        "Lire agonistes, stabilisateurs et contraintes articulaires.",
      ),
      fillBlank(
        "Le parcours commence par les ___ puis les muscles.",
        "os",
        ["tendons seuls", "vitamines", "haltères"],
        "Structure osseuse = fondation du parcours.",
      ),
      tf(
        "Comprendre l'anatomie n'aide pas à choisir ses exercices.",
        false,
        "Faux : ça aide à cibler agonistes et protéger les articulations.",
      ),
      tf(
        "Les patterns push, pull, squat et hinge résument une grande partie de la musculation.",
        true,
        "Vrai : la plupart des exercices se rattachent à ces mouvements fondamentaux.",
      ),
    ),
  },
];
