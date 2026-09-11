import type { AnatomieSeedLesson } from "./types";
import { CP } from "./checkpoints";
import {
  THEME_0_OS_LABEL_BASSIN,
  THEME_0_OS_LABEL_BRAS,
  THEME_0_OS_LABEL_CAGE,
  THEME_0_OS_LABEL_JAMBE,
} from "./theme-0-os-labels";
import { THEME_0_QUIZZES } from "./theme-0-os-questions";

export const THEME_0_LESSONS: AnatomieSeedLesson[] = [
  {
    title: "Bras et avant-bras",
    subtitle: "Humérus, radius et ulna.",
    markdown: `Trois os suffisent à faire fonctionner ton bras, de l'épaule au poignet.

---

L'**humérus** est l'os unique du bras. Sa tête s'emboîte dans l'omoplate, et son extrémité basse forme le coude avec les deux os de l'avant-bras.

---

L'avant-bras, justement : le **radius** côté pouce, l'**ulna** côté petit doigt. L'ulna forme la charnière du coude ; le radius, lui, pivote autour de l'ulna. C'est cette rotation qui te permet d'orienter la paume vers le haut (**supination**) ou vers le bas (**pronation**).

---

En salle, ce pivot change tout : curl paume vers le haut, curl marteau en prise neutre, curl inversé paume vers le bas. Même flexion de coude, mais une position d'avant-bras différente — et des muscles recrutés différemment.

---

Retiens la chaîne : humérus dans le bras, radius et ulna dans l'avant-bras. Ces trois os portent tous tes curls, tes extensions et tes dips.`,
    markdownEn: `Three bones are enough to make your arm work, from shoulder to wrist.

---

The **humerus** is the single bone of the upper arm. Its head fits into the scapula, and its lower end forms the elbow with the two forearm bones.

---

The forearm: the **radius** on the thumb side, the **ulna** on the little-finger side. The ulna forms the elbow hinge; the radius pivots around the ulna. That rotation lets you turn the palm up (**supination**) or down (**pronation**).

---

In the gym, this pivot changes everything: palm-up curl, hammer curl in neutral grip, reverse curl palm-down. Same elbow flexion, different forearm position — and different muscles recruited.

---

Remember the chain: humerus in the upper arm, radius and ulna in the forearm. These three bones carry all your curls, extensions, and dips.`,
    durationSec: 60,
    difficulty: "BEGINNER",
    order: 0,
    xpReward: 25,
    tags: ["humerus", "avant-bras"],
    illustrationUrl: "/uploads/bras-osseux.png",
    ...CP.os,
    questions: [...THEME_0_QUIZZES[0], THEME_0_OS_LABEL_BRAS],
  },
  {
    title: "Cage thoracique et ceinture scapulaire",
    subtitle: "Clavicule, omoplate, côtes, sternum et rachis haut.",
    markdown: `Ton épaule ne repose pas sur une articulation classique : l'**omoplate** n'est pas verrouillée dans une cavité, elle glisse librement sur la cage thoracique.

---

Avec la **clavicule**, l'omoplate forme la **ceinture scapulaire** : le socle mobile du bras. La clavicule relie le **sternum** à l'épaule et transmet les forces du bras vers le tronc.

---

Cette mobilité est une chance : elle permet de hausser, d'abaisser ou de rapprocher les omoplates. Mais elle demande du contrôle. Au développé couché, on fixe les omoplates en arrière avant de pousser ; au rowing, on les rapproche de la colonne.

---

La cage elle-même — le sternum et douze paires de **côtes** — protège le cœur et les poumons, et sert d'ancrage aux pectoraux et aux abdominaux. Elle se rigidifie quand tu bloques ta respiration sous une barre lourde. En haut, les **cervicales** portent la tête ; les **vertèbres thoraciques** s'articulent avec les côtes.

---

Ceinture scapulaire mobile sur une cage stable : c'est la base mécanique de toutes tes poussées et de tous tes tirages.`,
    markdownEn: `Your shoulder does not sit in a classic joint socket: the **scapula** is not locked in a cavity — it glides freely over the rib cage.

---

With the **clavicle**, the scapula forms the **shoulder girdle**: the mobile base of the arm. The clavicle links the **sternum** to the shoulder and transfers arm forces into the trunk.

---

That mobility is an advantage: you can elevate, depress, or retract the scapulae. But it needs control. On the bench press, you set the scapulae back before pressing; on rows, you pull them toward the spine.

---

The cage itself — the sternum and twelve pairs of **ribs** — protects the heart and lungs and anchors the pecs and abs. It stiffens when you brace under a heavy bar. Higher up, the **cervicals** support the head; the **thoracic vertebrae** articulate with the ribs.

---

A mobile shoulder girdle on a stable cage: that is the mechanical base of every push and pull you do.`,
    durationSec: 65,
    difficulty: "BEGINNER",
    order: 1,
    xpReward: 25,
    tags: ["cage", "rachis", "omoplate", "clavicule"],
    illustrationUrl: "/uploads/cage-thoracique.png",
    ...CP.os,
    questions: [...THEME_0_QUIZZES[1], THEME_0_OS_LABEL_CAGE],
  },
  {
    title: "Bassin et rachis lombaire",
    subtitle: "Lombaires, sacrum, coccyx, os coxal, ilion et acétabulum.",
    markdown: `Squat, soulevé de terre : toute la force passe par la zone charnière entre ton tronc et tes jambes.

---

Cinq **vertèbres lombaires** (L1 à L5), les plus massives de la colonne, portent le poids du tronc. Leur courbure naturelle vers l'avant, la **lordose**, doit rester proche du neutre sous charge pour ménager les disques.

---

En dessous, le **sacrum** : un os triangulaire soudé, placé entre les lombaires au-dessus et le **coccyx** en dessous. C'est lui qui transmet les forces de la colonne vers le bassin.

---

De chaque côté, l'os coxal — la fusion de l'**ilion**, de l'**ischion** et du pubis. L'ilion forme l'aile du bassin, celle que tu sens quand tu poses les mains sur les hanches. Creusée dans cet os, l'**acétabulum** : la cavité où s'emboîte la tête du fémur.

---

La forme et l'orientation de cette emboîture varient d'une personne à l'autre. C'est une des raisons pour lesquelles la profondeur de squat confortable n'est pas la même pour tout le monde.`,
    markdownEn: `Squat, deadlift: all the force travels through the hinge zone between your trunk and your legs.

---

Five **lumbar vertebrae** (L1 to L5), the thickest in the spine, carry trunk weight. Their natural forward curve, **lordosis**, should stay near neutral under load to spare the discs.

---

Below them sits the **sacrum**: a fused triangular bone between the lumbar spine above and the **coccyx** below. It transfers spinal forces into the pelvis.

---

On each side, the hip bone — the fusion of the **ilium**, **ischium**, and pubis. The ilium forms the pelvic wing you feel when you put your hands on your hips. Cut into that bone is the **acetabulum**: the socket that holds the femoral head.

---

The shape and orientation of that socket vary from person to person. That is one reason a comfortable squat depth is not the same for everyone.`,
    durationSec: 65,
    difficulty: "BEGINNER",
    order: 2,
    xpReward: 25,
    tags: ["lombaires", "sacrum", "coccyx", "coxal", "ilion", "acetabulum"],
    illustrationUrl: "/uploads/bassin-lombaire.png",
    ...CP.os,
    questions: [...THEME_0_QUIZZES[2], THEME_0_OS_LABEL_BASSIN],
  },
  {
    title: "Cuisse, genou et jambe",
    subtitle: "Fémur, patella, tibia, fibula et ligaments croisés.",
    markdown: `Pourquoi certains descendent en squat comme dans un fauteuil pendant que d'autres luttent ? La longueur du fémur y est pour beaucoup.

---

Le **fémur** est l'os le plus long du corps. Il relie la hanche au genou. Plus il est long, plus le buste doit se pencher pour garder la barre au-dessus des appuis : deux squats corrects peuvent avoir des allures très différentes.

---

Au genou, la **patella** (rotule) flotte dans le tendon du quadriceps. Son rôle : éloigner ce tendon de l'axe du genou pour donner plus de levier au quadriceps quand il tend la jambe.

---

En dessous, le **tibia** porte le poids du corps jusqu'à la cheville. La **fibula**, plus fine, sur le côté externe, sert surtout d'ancrage aux muscles et de stabilité latérale.

---

À l'intérieur du genou, les **ligaments croisés** relient fémur et tibia : l'antérieur (LCA) empêche le tibia de glisser vers l'avant, le postérieur (LCP) l'empêche de reculer. Les muscles de la cuisse les assistent à chaque réception et changement de direction.`,
    markdownEn: `Why do some people drop into a squat like sitting into a chair while others struggle? Femur length has a lot to do with it.

---

The **femur** is the longest bone in the body. It links the hip to the knee. The longer it is, the more the torso must lean to keep the bar over the feet: two correct squats can look very different.

---

At the knee, the **patella** (kneecap) floats in the quadriceps tendon. Its job: move that tendon farther from the knee axis to give the quads more leverage when they straighten the leg.

---

Below, the **tibia** carries body weight down to the ankle. The thinner **fibula**, on the outer side, mainly anchors muscles and adds lateral stability.

---

Inside the knee, the **cruciate ligaments** link femur and tibia: the anterior (ACL) stops the tibia sliding forward, the posterior (PCL) stops it sliding back. Thigh muscles help them on every landing and change of direction.`,
    durationSec: 65,
    difficulty: "BEGINNER",
    order: 3,
    xpReward: 25,
    tags: ["femur", "patella", "tibia", "fibula", "genou", "lca"],
    illustrationUrl: "/uploads/cuisse-genou-jambe.png",
    ...CP.os,
    questions: [...THEME_0_QUIZZES[3], THEME_0_OS_LABEL_JAMBE],
  },
];
