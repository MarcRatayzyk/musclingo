import i18n from "i18next";

/** Client FR→EN maps so path/lesson UI stays English even if API *En columns are empty. */

function isEnglishLocale(): boolean {
  return (i18n.language ?? "").toLowerCase().startsWith("en");
}

function norm(value: string): string {
  return value.normalize("NFC").trim().replace(/\s+/g, " ");
}

const CHECKPOINT_TITLE_EN: Record<string, string> = {
  Os: "Bones",
  "Haut du corps niveau 1": "Upper body level 1",
  "Bas du corps niveau 1": "Lower body level 1",
  Articulations: "Joints",
  "Haut du corps niveau 2": "Upper body level 2",
  "Bas du corps niveau 2": "Lower body level 2",
  "Tissus et fonctionnement": "Tissues and function",
  "Organisation du mouvement": "Movement organization",
  "Checkpoint Os": "Bones Checkpoint",
  "Checkpoint Haut du corps niveau 1": "Upper body level 1 Checkpoint",
  "Checkpoint Bas du corps niveau 1": "Lower body level 1 Checkpoint",
  "Checkpoint Articulations": "Joints Checkpoint",
  "Checkpoint Haut du corps niveau 2": "Upper body level 2 Checkpoint",
  "Checkpoint Bas du corps niveau 2": "Lower body level 2 Checkpoint",
  "Checkpoint Tissus et fonctionnement": "Tissues and function Checkpoint",
  "Checkpoint Organisation du mouvement": "Movement organization Checkpoint",
  Macronutriments: "Macronutrients",
  Micronutriments: "Micronutrients",
  "Alimentation équilibrée": "Balanced eating",
  "Besoins énergétiques": "Energy needs",
  "Digestion et métabolisme": "Digestion and metabolism",
  "Fibres et microbiote": "Fiber and microbiome",
  "Lire les aliments": "Reading food labels",
  "Nutrition et objectifs": "Nutrition and goals",
  Bases: "Basics",
  Intermédiaire: "Intermediate",
  Avancé: "Advanced",
};

const LESSON_TITLE_EN: Record<string, string> = {
  "Bras et avant-bras": "Arm and Forearm",
  "Cage thoracique et ceinture scapulaire": "Thoracic Cage and Shoulder Girdle",
  "Bassin et rachis lombaire": "Pelvis and Lumbar Spine",
  "Cuisse, genou et jambe": "Thigh, Knee, and Lower Leg",
  "Les bras": "Arms",
  "Pectoraux et épaules": "Chest and Shoulders",
  "Tronc et abdominaux": "Trunk and Abdominals",
  "Le dos": "Back",
  "Trapèze et érecteurs": "Trapezius and Erectors",
  "Devant de cuisse": "Front Thigh",
  "Arrière de cuisse": "Back Thigh",
  "Les fessiers": "Glutes",
  "Bas de jambes": "Lower Legs",
  "L'épaule": "Shoulder",
  "Coude et poignet": "Elbow and Wrist",
  "La hanche": "Hip",
  "Le genou": "Knee",
  "La cheville": "Ankle",
  "Colonne et disques": "Spine and Discs",
  "Scapulo-thoracique": "Scapulothoracic Joint",
  "Biceps et brachial": "Biceps and Brachialis",
  "Triceps : les trois chefs": "Triceps: The Three Heads",
  "Deltoïde et coiffe des rotateurs": "Deltoid and Rotator Cuff",
  "Grand et petit pectoral": "Pectoralis Major and Minor",
  "Grand dorsal, grand rond, petit rond":
    "Latissimus Dorsi, Teres Major, Teres Minor",
  "Trapèze, rhomboïdes, élévateur": "Trapezius, Rhomboids, Levator Scapulae",
  "Abdominaux profonds et obliques": "Deep Abdominals and Obliques",
  "Serratus antérieur et stabilité scapulaire":
    "Serratus Anterior and Scapular Stability",
  "Quadriceps : les quatre chefs": "Quadriceps: The Four Heads",
  "Ischio-jambiers en détail": "Hamstrings in Detail",
  "Grand, moyen, petit fessier et TFL": "Glute Max, Med, Min and TFL",
  "Mollets, tibial, fibulaires": "Calves, Tibialis, Fibularis",
  "Iliopsoas et fléchisseurs de hanche": "Iliopsoas and Hip Flexors",
  "Plancher pelvien et core anatomique": "Pelvic Floor and Anatomical Core",
  "Chaînes antérieure et postérieure": "Anterior and Posterior Chains",
  "Fibre et sarcomère": "Fiber and Sarcomere",
  "Tendons et ligaments": "Tendons and Ligaments",
  "Unités motrices et types de fibres": "Motor Units and Fiber Types",
  "Fascias et aponévroses": "Fascia and Aponeuroses",
  "Innervation et contrôle musculaire": "Innervation and Muscle Control",
  "Agoniste, antagoniste, stabilisateur": "Agonist, Antagonist, Stabilizer",
  "Chaînes et synergies": "Chains and Synergies",
  "Plans et axes": "Planes and Axes",
  "Longueur-tension et angles d'insertion":
    "Length-Tension and Insertion Angles",
};

const LESSON_SUBTITLE_EN: Record<string, string> = {
  "Humérus, radius et ulna.": "Humerus, radius, and ulna.",
  "Clavicule, omoplate, côtes, sternum et rachis haut.":
    "Clavicle, scapula, ribs, sternum, and upper spine.",
  "Bassin, sacrum et lombaires.": "Pelvis, sacrum, and lumbar spine.",
  "Lombaires, sacrum, coccyx, os coxal, ilion et acétabulum.":
    "Lumbar spine, sacrum, coccyx, hip bone, ilium, and acetabulum.",
  "Fémur, patella, tibia et fibula.": "Femur, patella, tibia, and fibula.",
  "Fémur, patella, tibia, fibula et ligaments croisés.":
    "Femur, patella, tibia, fibula, and cruciate ligaments.",
};

export function localizeCheckpointTitle(title: string): string {
  if (!isEnglishLocale()) return title;
  const key = norm(title);
  if (CHECKPOINT_TITLE_EN[key]) return CHECKPOINT_TITLE_EN[key]!;
  if (key.startsWith("Checkpoint ")) {
    const rest = key.slice("Checkpoint ".length);
    return `${CHECKPOINT_TITLE_EN[rest] ?? rest} Checkpoint`;
  }
  return title;
}

export function localizeLessonTitle(title: string): string {
  if (!isEnglishLocale()) return title;
  const key = norm(title);
  const mapped = LESSON_TITLE_EN[key];
  if (mapped) return mapped;
  // Already English from API
  for (const en of Object.values(LESSON_TITLE_EN)) {
    if (key === norm(en)) return en;
  }
  return title;
}

export function localizeLessonSubtitle(
  subtitle: string | null | undefined,
): string | null {
  if (!subtitle) return null;
  if (!isEnglishLocale()) return subtitle;
  const key = norm(subtitle);
  return LESSON_SUBTITLE_EN[key] ?? subtitle;
}

const LESSON_MARKDOWN_EN_BY_TITLE: Record<string, string> = {
  "Bras et avant-bras": `Three bones are enough to make your arm work, from shoulder to wrist.

---

The **humerus** is the single bone of the upper arm. Its head fits into the scapula, and its lower end forms the elbow with the two forearm bones.

---

The forearm: the **radius** on the thumb side, the **ulna** on the little-finger side. The ulna forms the elbow hinge; the radius pivots around the ulna. That rotation lets you turn the palm up (**supination**) or down (**pronation**).

---

In the gym, this pivot changes everything: palm-up curl, hammer curl in neutral grip, reverse curl palm-down. Same elbow flexion, different forearm position — and different muscles recruited.

---

Remember the chain: humerus in the upper arm, radius and ulna in the forearm. These three bones carry all your curls, extensions, and dips.`,
  "Cage thoracique et ceinture scapulaire": `Your shoulder does not sit in a classic joint socket: the **scapula** is not locked in a cavity — it glides freely over the rib cage.

---

With the **clavicle**, the scapula forms the **shoulder girdle**: the mobile base of the arm. The clavicle links the **sternum** to the shoulder and transfers arm forces into the trunk.

---

That mobility is an advantage: you can elevate, depress, or retract the scapulae. But it needs control. On the bench press, you set the scapulae back before pressing; on rows, you pull them toward the spine.

---

The cage itself — the sternum and twelve pairs of **ribs** — protects the heart and lungs and anchors the pecs and abs. It stiffens when you brace under a heavy bar. Higher up, the **cervicals** support the head; the **thoracic vertebrae** articulate with the ribs.

---

A mobile shoulder girdle on a stable cage: that is the mechanical base of every push and pull you do.`,
  "Bassin et rachis lombaire": `Squat, deadlift: all the force travels through the hinge zone between your trunk and your legs.

---

Five **lumbar vertebrae** (L1 to L5), the thickest in the spine, carry trunk weight. Their natural forward curve, **lordosis**, should stay near neutral under load to spare the discs.

---

Below them sits the **sacrum**: a fused triangular bone between the lumbar spine above and the **coccyx** below. It transfers spinal forces into the pelvis.

---

On each side, the hip bone — the fusion of the **ilium**, **ischium**, and pubis. The ilium forms the pelvic wing you feel when you put your hands on your hips. Cut into that bone is the **acetabulum**: the socket that holds the femoral head.

---

The shape and orientation of that socket vary from person to person. That is one reason a comfortable squat depth is not the same for everyone.`,
  "Cuisse, genou et jambe": `Why do some people drop into a squat like sitting into a chair while others struggle? Femur length has a lot to do with it.

---

The **femur** is the longest bone in the body. It links the hip to the knee. The longer it is, the more the torso must lean to keep the bar over the feet: two correct squats can look very different.

---

At the knee, the **patella** (kneecap) floats in the quadriceps tendon. Its job: move that tendon farther from the knee axis to give the quads more leverage when they straighten the leg.

---

Below, the **tibia** carries body weight down to the ankle. The thinner **fibula**, on the outer side, mainly anchors muscles and adds lateral stability.

---

Inside the knee, the **cruciate ligaments** link femur and tibia: the anterior (ACL) stops the tibia sliding forward, the posterior (PCL) stops it sliding back. Thigh muscles help them on every landing and change of direction.`,
};

/** Prefer curated EN body; otherwise trust API (pickLocalized / enOrTranslate). */
export function localizeLessonMarkdown(
  title: string,
  markdown: string,
): string {
  if (!isEnglishLocale()) return markdown;
  return LESSON_MARKDOWN_EN_BY_TITLE[norm(title)] ?? markdown;
}
