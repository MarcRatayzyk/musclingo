import type { AnatomieSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { THEME_6_QUIZZES } from "./theme-6-tissus-questions";

export const THEME_6_LESSONS: AnatomieSeedLesson[] = [
  {
    title: "Fibre et sarcomère",
    subtitle: "Contraction, hypertrophie et recrutement.",
    markdown: `Zoome dans un muscle : des faisceaux de fibres, dans chaque fibre des myofibrilles, et le long de chaque myofibrille, des millions de **sarcomères**.

---

Le sarcomère est l'unité contractile. À l'intérieur, deux filaments — l'**actine** et la **myosine** — glissent l'un sur l'autre. Des millions de glissements microscopiques mis bout à bout : voilà une contraction.

---

Pour commander tout ça, le système nerveux groupe les fibres en **unités motrices** : un motoneurone et toutes les fibres qu'il pilote. Effort léger, peu d'unités actives ; plus la charge ou l'intention monte, plus il en recrute.

---

Et l'hypertrophie ? Elle naît quand ces sarcomères subissent une **tension mécanique** suffisante, répétée — puis que le corps a de quoi reconstruire : récupération et protéines. Le stimulus sans la reconstruction reste un stress incomplet.

---

Chaque série se joue donc à cette échelle : des filaments qui glissent, sous tension, assez souvent pour forcer l'adaptation.`,
    durationSec: 65,
    difficulty: "ADVANCED",
    order: 41,
    xpReward: 35,
    tags: ["fibre", "sarcomere", "unite-motrice", "recrutement"],
    ...CP.tissus,
    questions: THEME_6_QUIZZES[0]
  },
  {
    title: "Tendons et ligaments",
    subtitle: "Transmission de force vs stabilité.",
    markdown: `Ta force progresse plus vite que tes tendons. C'est une des raisons pour lesquelles les blessures arrivent souvent quand tout va bien.

---

La distinction de base : le **tendon** relie le muscle à l'os et lui transmet sa force ; le **ligament** relie deux os et guide l'articulation en limitant les mouvements extrêmes.

---

Le muscle, très irrigué, s'adapte en quelques semaines. Le tendon, pauvre en vaisseaux, se remodèle sur des mois. Quand les charges grimpent vite, la force musculaire prend de l'avance sur la solidité tendineuse — et c'est le tendon qui encaisse la différence. Coude, épaule, genou : la plupart des douleurs chroniques du pratiquant sont tendineuses.

---

Les ligaments, eux, ne se contractent pas : ils comptent sur les muscles pour éviter d'être mis en danger.

---

La progression raisonnable n'est pas de la prudence excessive. C'est simplement le rythme d'adaptation de tes tissus les plus lents.`,
    durationSec: 62,
    difficulty: "ADVANCED",
    order: 42,
    xpReward: 35,
    tags: ["tendons", "ligaments"],
    ...CP.tissus,
    questions: THEME_6_QUIZZES[1]
  },
  {
    title: "Unités motrices et types de fibres",
    subtitle: "Recrutement, fibres I et II.",
    markdown: `Toutes tes fibres musculaires ne sont pas embauchées pour le même métier.

---

Les fibres de **type I**, lentes, fonctionnent à l'oxygène : force modérée, mais une endurance remarquable. Ce sont elles qui tiennent ta posture toute la journée. Les fibres de **type II**, rapides, produisent beaucoup de force et de vitesse — et se fatiguent vite.

---

Le recrutement suit le principe de **Henneman**, dit principe de taille : les petites unités motrices, faites de fibres lentes, s'activent d'abord ; les grandes ne s'ajoutent que si la demande monte. Charge lourde, mouvement explosif ou fin de série proche de l'échec : trois façons d'aller chercher les fibres rapides.

---

C'est pour ça qu'une série légère arrêtée très loin de l'échec ne stimule qu'une partie du muscle.

---

La plupart des muscles mélangent les deux types, dans des proportions largement génétiques. L'entraînement ne transforme pas ce profil du tout au tout — il apprend surtout à mieux l'exploiter.`,
    durationSec: 65,
    difficulty: "ADVANCED",
    order: 43,
    xpReward: 35,
    tags: ["unites-motrices", "fibres", "henneman"],
    ...CP.tissus,
    questions: THEME_6_QUIZZES[2]
  },
  {
    title: "Fascias et aponévroses",
    subtitle: "Tissus conjonctifs et transmission de tension.",
    markdown: `Dissèque un muscle et tu trouveras partout le même matériau blanc nacré : le fascia.

---

Ce tissu conjonctif enveloppe chaque fibre, chaque muscle, chaque groupe musculaire. Fait de collagène et d'eau, il glisse entre les plans — et cette capacité de glissement participe à ta sensation de mobilité ou de raideur.

---

Quand le fascia s'épaissit en une nappe large et plate qui sert d'attache, on parle d'**aponévrose**. Tes abdominaux se terminent sur celle du grand droit ; ta cuisse est gainée par le **fascia lata**, prolongé sur le côté par le tractus ilio-tibial que tirent le TFL et le grand fessier.

---

Ce réseau transmet la **tension** au-delà du muscle qui se contracte : c'est la base des chaînes myofasciales croisées plus tôt dans le parcours.

---

Le fascia n'est donc pas de l'emballage passif. C'est la trame qui relie tes muscles entre eux.`,
    durationSec: 62,
    difficulty: "ADVANCED",
    order: 44,
    xpReward: 35,
    tags: ["fascias", "aponevroses", "conjonctif"],
    ...CP.tissus,
    questions: THEME_6_QUIZZES[3]
  },
  {
    title: "Innervation et contrôle musculaire",
    subtitle: "Motoneurones, fuseaux et feedback.",
    markdown: `La technique n'est pas « dans les muscles » : elle est dans les câbles qui les commandent.

---

Sans **influx** nerveux, aucune contraction volontaire. Le **motoneurone alpha** porte l'ordre de la moelle épinière jusqu'aux fibres musculaires ; c'est lui qui module la force produite, unité motrice par unité motrice.

---

Dans l'autre sens, le muscle renseigne en permanence. Les **fuseaux neuromusculaires**, nichés dans le muscle, mesurent son étirement — ce sont eux qui déclenchent le réflexe quand tu descends vite dans un squat. Les **organes tendineux de Golgi**, dans les tendons, mesurent la tension.

---

Ce dialogue règle le tonus, coordonne agonistes et antagonistes, et affine le geste. Apprendre un mouvement, c'est littéralement recâbler cette commande : les premières semaines de progression sur un nouvel exercice sont surtout nerveuses, avant d'être musculaires.

---

Et comme tout système sollicité, le nerf fatigue aussi — pas seulement le muscle.`,
    durationSec: 65,
    difficulty: "ADVANCED",
    order: 45,
    xpReward: 35,
    tags: ["innervation", "fuseaux", "controle"],
    ...CP.tissus,
    questions: THEME_6_QUIZZES[4]
  },
];
