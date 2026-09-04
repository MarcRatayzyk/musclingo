import type { AnatomieSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_7_QUIZZES } from "./theme-7-organisation-questions";

export const THEME_7_LESSONS: AnatomieSeedLesson[] = [
  {
    title: "Agoniste, antagoniste, stabilisateur",
    subtitle: "Lire un mouvement musculaire.",
    markdown: `À chaque mouvement, trois rôles se distribuent — et un même muscle change de casquette selon l'exercice.

---

L'**agoniste** est le moteur principal : celui qui produit le mouvement. Dans un curl, c'est le biceps.

---

L'**antagoniste** est le muscle du côté opposé, qui s'allonge tout en gardant du contrôle : le triceps, dans ce même curl. Il ne « freine » pas ta série — il garantit la précision du geste et protège l'articulation en fin d'amplitude.

---

Le **stabilisateur**, lui, ne bouge rien de visible : il fixe un segment pour que le mouvement se fasse ailleurs. Au développé couché, tes abdominaux — dont le transverse — et les muscles de tes omoplates jouent ce rôle.

---

Maintenant, change d'exercice : dans une extension triceps, le triceps devient agoniste et le biceps antagoniste. Le rôle n'appartient pas au muscle, il appartient au mouvement. C'est cette grille qui permet d'analyser n'importe quel exercice.`,
    durationSec: 65,
    difficulty: "ADVANCED",
    order: 46,
    xpReward: 35,
    tags: ["agoniste", "antagoniste"],
    illustrationUrl: "/uploads/agoniste-antagoniste.jpg",
    ...CP.organisation,
    questions: THEME_7_QUIZZES[0]
  },
  {
    title: "Chaînes et synergies",
    subtitle: "Chaîne postérieure, poussée et tirage.",
    markdown: `Aucun exercice ne travaille « un » muscle : tous travaillent des équipes. Une **synergie**, c'est ça — plusieurs muscles coordonnés pour un même geste.

---

Les grandes familles reviennent toujours. La poussée : pectoraux, deltoïdes antérieurs, triceps. Le tirage : grand dorsal, rhomboïdes, trapèzes, biceps. L'extension de hanche : la **chaîne postérieure** — ischios, fessiers, érecteurs.

---

Cette lecture simplifie ta programmation : plutôt que de compter les muscles un par un, équilibre les familles. Autant de tirage que de poussée sur la semaine, du travail postérieur en face du travail de quadriceps.

---

L'enjeu est concret : des années de développé couché sans rowing tirent l'épaule vers l'avant et laissent l'arrière du corps en retard — le déséquilibre classique du pratiquant.

---

Quand tu analyses ton programme, ne demande pas « quels muscles ? » mais « quelles équipes — et sont-elles à égalité ? ».`,
    durationSec: 62,
    difficulty: "ADVANCED",
    order: 47,
    xpReward: 35,
    tags: ["chaines", "synergies"],
    ...CP.organisation,
    questions: THEME_7_QUIZZES[1]
  },
  {
    title: "Plans et axes",
    subtitle: "Sagittal, frontal, transverse.",
    markdown: `Curl, élévation latérale, rotation à la poulie : trois exercices, trois plans de l'espace.

---

Le plan **sagittal** sépare ton corps en gauche et droite. Tout ce qui va vers l'avant ou l'arrière s'y déroule : flexions et extensions — curls, squats, crunchs.

---

Le plan **frontal** sépare l'avant de l'arrière. On y trouve les mouvements d'écartement et de rapprochement, abduction et adduction : élévations latérales, abductions de hanche.

---

Le plan **transverse** coupe horizontalement : c'est celui des rotations — rotations du tronc, rotations d'épaule, et même les écartés, où le bras balaye l'horizontale.

---

L'intérêt pratique : la plupart des programmes vivent presque exclusivement dans le plan sagittal. Repérer les plans révèle vite ce qui manque — souvent le frontal (stabilité latérale de hanche) et le transverse (rotations contrôlées, anti-rotation).

---

Un geste réel combine souvent plusieurs plans ; nommer le plan dominant suffit pour analyser l'exercice.`,
    durationSec: 65,
    difficulty: "ADVANCED",
    order: 48,
    xpReward: 35,
    tags: ["plans", "axes"],
    illustrationUrl: "/uploads/plans-anatomiques.jpg",
    ...CP.organisation,
    questions: THEME_7_QUIZZES[2]
  },
  {
    title: "Longueur-tension et angles d'insertion",
    subtitle: "Bras de levier et force selon l'angle.",
    markdown: `Tu es plus fort à certains angles qu'à d'autres — et ce n'est pas un défaut de technique. Deux mécanismes l'expliquent.

---

Premier mécanisme : la relation **longueur-tension**. Trop raccourci, un muscle a ses filaments d'actine et de myosine trop chevauchés pour bien tirer ; trop étiré, ils ne se chevauchent plus assez. Entre les deux, une zone où la tension produite est maximale.

---

Deuxième mécanisme : l'angle d'**insertion**. Selon la position de l'articulation, le tendon tire plus ou moins perpendiculairement à l'os. Meilleur angle, meilleur **bras de levier** — donc plus de couple pour la même force musculaire. La patella existe pour ça : elle écarte le tendon du quadriceps de l'axe du genou.

---

C'est pourquoi un curl est dur à mi-parcours et facile en haut, et pourquoi certaines machines à came cherchent à épouser ta courbe de force.

---

Ta force n'est pas un chiffre : c'est une courbe.`,
    durationSec: 65,
    difficulty: "ADVANCED",
    order: 49,
    xpReward: 35,
    tags: ["longueur-tension", "bras-de-levier", "insertion"],
    illustrationUrl: "/uploads/longueur-tension.jpg",
    ...CP.organisation,
    questions: THEME_7_QUIZZES[3]
  },
];
