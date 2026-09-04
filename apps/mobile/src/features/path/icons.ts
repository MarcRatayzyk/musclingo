import type { ImageSourcePropType } from "react-native";

/** Category slug → path icon asset */
export const PATH_ICONS: Record<string, ImageSourcePropType> = {
  anatomie: require("../../../assets/path-icons/corps.png"),
  nutrition: require("../../../assets/path-icons/alimentation.png"),
  biomecanique: require("../../../assets/path-icons/articulation.png"),
  programmation: require("../../../assets/path-icons/haltere.png"),
  recuperation: require("../../../assets/path-icons/sommeil.png"),
};

const ANATOMIE_LESSON_ICONS = {
  bras: require("../../../assets/path-icons/anatomie-bras.png"),
  torse: require("../../../assets/path-icons/anatomie-torse.png"),
  lombaire: require("../../../assets/path-icons/anatomie-lombaire.png"),
  jambe: require("../../../assets/path-icons/anatomie-jambe.png"),
} as const;

export function getPathIcon(slug: string): ImageSourcePropType {
  return PATH_ICONS[slug] ?? PATH_ICONS.anatomie!;
}

/** Icône de nœud de leçon (spécifique Anatomie quand pertinent). */
export function getLessonPathIcon(
  categorySlug: string,
  lessonTitle: string,
): ImageSourcePropType {
  if (categorySlug !== "anatomie") {
    return getPathIcon(categorySlug);
  }

  const t = lessonTitle.toLowerCase();

  if (
    t.includes("bras") ||
    t.includes("biceps") ||
    t.includes("triceps") ||
    t.includes("avant-bras") ||
    t.includes("coude") ||
    t.includes("poignet")
  ) {
    return ANATOMIE_LESSON_ICONS.bras;
  }

  if (
    t.includes("jambe") ||
    t.includes("cuisse") ||
    t.includes("genou") ||
    t.includes("mollet") ||
    t.includes("fessier") ||
    t.includes("cheville") ||
    t.includes("quadriceps") ||
    t.includes("ischio") ||
    t.includes("adducteur")
  ) {
    return ANATOMIE_LESSON_ICONS.jambe;
  }

  if (
    t.includes("lombaire") ||
    t.includes("bassin") ||
    t.includes("dos") ||
    t.includes("colonne") ||
    t.includes("sacrum") ||
    t.includes("vertèbr") ||
    t.includes("vertebr") ||
    t.includes("érecteur") ||
    t.includes("erecteur")
  ) {
    return ANATOMIE_LESSON_ICONS.lombaire;
  }

  if (
    t.includes("cage") ||
    t.includes("torse") ||
    t.includes("tronc") ||
    t.includes("pectoral") ||
    t.includes("abdomin") ||
    t.includes("épaule") ||
    t.includes("epaule") ||
    t.includes("omoplate") ||
    t.includes("scapul") ||
    t.includes("clavicule") ||
    t.includes("deltoïde") ||
    t.includes("deltoide") ||
    t.includes("trapèze") ||
    t.includes("trapeze")
  ) {
    return ANATOMIE_LESSON_ICONS.torse;
  }

  return getPathIcon("anatomie");
}
