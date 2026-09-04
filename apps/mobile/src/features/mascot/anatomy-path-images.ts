import type { ImageSourcePropType } from "react-native";

export const ANATOMY_PATH_IMAGES = {
  bras: require("../../../assets/G_Bras.png"),
  dos: require("../../../assets/G_Dos.png"),
  epaule: require("../../../assets/G_epaule.png"),
  fessiers: require("../../../assets/G_Fessiers.png"),
  jambe: require("../../../assets/gorrile_jambe-removebg-preview.png"),
  lecture: require("../../../assets/G_lecture.png"),
  douteDos: require("../../../assets/G_doute_dos.png"),
  detente: require("../../../assets/G_detente.png"),
} as const satisfies Record<string, ImageSourcePropType>;

/**
 * Ancres gorille — ≥ 4 leçons entre chaque.
 * Positions parcours : 0, 5, 11, 19, 25, 31, 38, 43
 */
const ANATOMY_ILLUSTRATION_BY_TITLE: Array<{
  titles: string[];
  image: keyof typeof ANATOMY_PATH_IMAGES;
}> = [
  { titles: ["bras et avant-bras"], image: "bras" },
  { titles: ["pectoraux et épaules"], image: "lecture" },
  { titles: ["les fessiers"], image: "fessiers" },
  { titles: ["scapulo-thoracique"], image: "epaule" },
  {
    titles: ["trapèze, rhomboïdes, élévateur", "trapeze, rhomboïdes, elevateur", "trapeze, rhomboides, elevateur"],
    image: "dos",
  },
  {
    titles: ["mollets, tibial, fibulaires"],
    image: "jambe",
  },
  {
    titles: ["fascias et aponévroses", "fascias et aponevroses"],
    image: "detente",
  },
  {
    titles: [
      "longueur-tension et angles d'insertion",
      "longueur-tension et angles d'insertion",
    ],
    image: "douteDos",
  },
];

export function getAnatomyPathIllustrationAtLesson(
  _checkpointKey: string,
  _lessonOrder: number,
  lessonTitle?: string,
): ImageSourcePropType | null {
  if (!lessonTitle) return null;
  const t = lessonTitle.trim().toLowerCase();
  const anchor = ANATOMY_ILLUSTRATION_BY_TITLE.find((item) =>
    item.titles.includes(t),
  );
  return anchor ? ANATOMY_PATH_IMAGES[anchor.image] : null;
}
