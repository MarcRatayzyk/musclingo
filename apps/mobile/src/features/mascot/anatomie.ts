import type { LessonMascotHooks, MascotLine } from "./types";

export const ONBOARDING_STEPS: MascotLine[] = [
  {
    text: "Salut ! Moi c'est ton guide pour l'anatomie. On va explorer le corps ensemble.",
    pose: "default",
  },
  {
    text: "Ici tu vas apprendre os, muscles et articulations — pas à pas, sans te noyer.",
    pose: "present",
  },
  {
    text: "À chaque leçon je t'explique. Ensuite tu valides avec un petit quiz.",
    pose: "present",
  },
  {
    text: "Prêt ? Commence par la première leçon sur le chemin. Je suis avec toi.",
    pose: "default",
  },
];

const GENERIC_INTROS: MascotLine[] = [
  { text: "Aujourd'hui on regarde ça de plus près — suis-moi.", pose: "present" },
  { text: "Nouvelle leçon : je t'accompagne étape par étape.", pose: "present" },
  { text: "On attaque un nouveau sujet. Prends ton temps.", pose: "default" },
];

const GENERIC_OUTROS: MascotLine[] = [
  { text: "Bien joué — tu as les bases. On passe au quiz ?", pose: "present" },
  { text: "C'est noté. Valide avec le quiz quand tu es prêt.", pose: "present" },
  { text: "Tu progresses bien. Le quiz t'attend !", pose: "default" },
];

const GENERIC_ASIDES: MascotLine[] = [
  { text: "Astuce : retiens surtout les noms en gras.", pose: "doubt" },
  { text: "Si tu bloques, relis le passage précédent — c'est normal.", pose: "doubt" },
  { text: "L'illustration aide beaucoup ici. Regarde bien les couleurs.", pose: "doubt" },
];

/** Hooks personnalisés par order de leçon (parcours anatomie). */
export const LESSON_HOOKS: Record<number, LessonMascotHooks> = {
  0: {
    intro: {
      text: "On commence par le bras : humérus, radius, ulna. C'est la base pour comprendre curls et dips.",
      pose: "present",
    },
    interjections: {
      1: {
        text: "Radius et ulna — c'est eux qui gèrent la rotation de la main.",
        pose: "doubt",
      },
    },
    outro: { text: "Tu connais maintenant les os du bras. Quiz time !", pose: "present" },
  },
  1: {
    intro: {
      text: "La cage thoracique et les omoplates : le socle de toute poussée et tirage.",
      pose: "present",
    },
    interjections: {
      2: {
        text: "L'omoplate bouge beaucoup — ce n'est pas un os fixe.",
        pose: "doubt",
      },
    },
  },
  2: {
    intro: {
      text: "Bassin et lombaires : la charnière entre haut et bas du corps.",
      pose: "present",
    },
    outro: { text: "Os du tronc maîtrisés. On enchaîne sur les jambes.", pose: "present" },
  },
  3: {
    intro: {
      text: "Fémur, genou, tibia… les os qui portent tout ton poids en squat.",
      pose: "present",
    },
    interjections: {
      1: {
        text: "La patella protège le genou — important en musculation.",
        pose: "doubt",
      },
    },
  },
  6: {
    intro: {
      text: "Nouvelle section : les muscles du haut du corps. Les bras d'abord.",
      pose: "default",
    },
  },
  7: {
    intro: {
      text: "Pectoraux et épaules : tout ce qui pousse devant toi.",
      pose: "present",
    },
  },
  8: {
    intro: {
      text: "Tronc et abdos : la ceinture qui stabilise tes mouvements.",
      pose: "present",
    },
  },
  9: {
    intro: {
      text: "Le dos — énorme zone de travail en tirage et en posture.",
      pose: "present",
    },
  },
  13: {
    intro: {
      text: "On descend : muscles du bas du corps. Quadriceps et avant de cuisse.",
      pose: "default",
    },
  },
  14: {
    intro: {
      text: "Ischio-jambiers : la chaîne postérieure de la cuisse.",
      pose: "present",
    },
  },
  15: {
    intro: {
      text: "Les fessiers — plus qu'un muscle « esthétique », un vrai moteur de hanche.",
      pose: "present",
    },
  },
  19: {
    intro: {
      text: "Section articulations : l'épaule est la plus mobile du corps.",
      pose: "default",
    },
    interjections: {
      1: {
        text: "Stabilité scapulaire = épaule saine. Retiens ça.",
        pose: "doubt",
      },
    },
  },
  20: {
    intro: {
      text: "Coude et poignet : là où se jouent curls et prises.",
      pose: "present",
    },
  },
  21: {
    intro: {
      text: "La hanche : profonde, stable, et centrale pour squat et deadlift.",
      pose: "present",
    },
  },
  22: {
    intro: {
      text: "Le genou : ligaments et ménisques — à comprendre avant de charger lourd.",
      pose: "doubt",
    },
  },
  26: {
    intro: {
      text: "On passe en profondeur sur le haut du corps : origines, insertions, actions.",
      pose: "default",
    },
  },
  34: {
    intro: {
      text: "Même logique pour le bas : on détaille chefs et insertions.",
      pose: "default",
    },
  },
  41: {
    intro: {
      text: "On passe au fonctionnement : fibres, sarcomères, contraction.",
      pose: "default",
    },
    interjections: {
      2: {
        text: "L'hypertrophie, c'est surtout plus de protéines dans les fibres.",
        pose: "doubt",
      },
    },
  },
  42: {
    intro: {
      text: "Tendons vs ligaments : l'un tire, l'autre stabilise.",
      pose: "present",
    },
  },
  46: {
    intro: {
      text: "Dernière ligne : organisation du mouvement — agonistes, plans, leviers.",
      pose: "default",
    },
  },
  49: {
    intro: {
      text: "Dernière leçon : longueur-tension et angles d'insertion.",
      pose: "present",
    },
    outro: {
      text: "Tu as parcouru tout le parcours anatomie. Respect — valide ce quiz !",
      pose: "present",
    },
  },
};

function pickFromPool<T>(pool: T[], seed: number): T {
  return pool[Math.abs(seed) % pool.length]!;
}

export function getLessonHooks(lessonOrder: number): LessonMascotHooks {
  const custom = LESSON_HOOKS[lessonOrder];
  const intro =
    custom?.intro ?? pickFromPool(GENERIC_INTROS, lessonOrder);
  const outro =
    custom?.outro ?? pickFromPool(GENERIC_OUTROS, lessonOrder + 7);
  return {
    intro,
    outro,
    interjections: custom?.interjections,
  };
}

export function getInterjectionAfterChunk(
  hooks: LessonMascotHooks,
  completedChunkIndex: number,
): MascotLine | null {
  if (hooks.interjections?.[completedChunkIndex]) {
    return hooks.interjections[completedChunkIndex]!;
  }
  if (completedChunkIndex > 0 && completedChunkIndex % 3 === 0) {
    return pickFromPool(GENERIC_ASIDES, completedChunkIndex + completedChunkIndex);
  }
  return null;
}

export function useAnatomyMascotEnabled(categorySlug: string | undefined): boolean {
  return categorySlug === "anatomie";
}
