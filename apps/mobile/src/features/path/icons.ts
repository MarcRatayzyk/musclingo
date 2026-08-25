import type { ImageSourcePropType } from "react-native";

/** Category slug → path icon asset */
export const PATH_ICONS: Record<string, ImageSourcePropType> = {
  anatomie: require("../../../assets/path-icons/corps.png"),
  nutrition: require("../../../assets/path-icons/alimentation.png"),
  biomecanique: require("../../../assets/path-icons/articulation.png"),
  programmation: require("../../../assets/path-icons/haltere.png"),
  recuperation: require("../../../assets/path-icons/sommeil.png"),
};

export function getPathIcon(slug: string): ImageSourcePropType {
  return PATH_ICONS[slug] ?? PATH_ICONS.anatomie!;
}
