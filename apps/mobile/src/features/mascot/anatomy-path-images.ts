import type { ImageSourcePropType } from "react-native";

export const ANATOMY_PATH_IMAGES = {
  bras: require("../../../assets/G_Bras.png"),
  dos: require("../../../assets/G_Dos.png"),
  epaule: require("../../../assets/G_epaule.png"),
  fessiers: require("../../../assets/G_Fessiers.png"),
  jambe: require("../../../assets/gorrile_jambe-removebg-preview.png"),
} as const satisfies Record<string, ImageSourcePropType>;

/** Leçons où l'illustration est ancrée (défile avec le parcours). */
const ANATOMY_ILLUSTRATION_ANCHORS: Array<{
  checkpointKey: string;
  lessonOrder: number;
  image: keyof typeof ANATOMY_PATH_IMAGES;
}> = [
  { checkpointKey: "os", lessonOrder: 0, image: "bras" },
  { checkpointKey: "muscles-haut", lessonOrder: 7, image: "dos" },
  { checkpointKey: "muscles-bas", lessonOrder: 9, image: "jambe" },
  { checkpointKey: "muscles-bas", lessonOrder: 11, image: "fessiers" },
  { checkpointKey: "articulations", lessonOrder: 13, image: "epaule" },
];

export function getAnatomyPathIllustrationAtLesson(
  checkpointKey: string,
  lessonOrder: number,
): ImageSourcePropType | null {
  const anchor = ANATOMY_ILLUSTRATION_ANCHORS.find(
    (item) =>
      item.checkpointKey === checkpointKey && item.lessonOrder === lessonOrder,
  );
  return anchor ? ANATOMY_PATH_IMAGES[anchor.image] : null;
}
