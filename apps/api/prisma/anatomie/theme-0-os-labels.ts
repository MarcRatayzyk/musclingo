import { match, type SeedQuestion } from "../anatomie-quiz-helpers";

export const THEME_0_OS_LABEL_BRAS = match(
  "Place chaque nom devant le numéro (bras et avant-bras).",
  [
    ["1", "Radius"],
    ["2", "Ulna (cubitus)"],
    ["3", "Omoplate"],
    ["4", "Humérus"],
  ],
  "1 radius (côté pouce), 2 ulna, 3 omoplate, 4 humérus.",
  "/uploads/os-label-bras.png",
);

export const THEME_0_OS_LABEL_CAGE = match(
  "Place chaque nom devant le numéro (cage thoracique).",
  [
    ["1", "Côte"],
    ["2", "Sternum"],
    ["3", "Cartilage costal"],
    ["4", "Vertèbres cervicales"],
    ["5", "Clavicule"],
  ],
  "1 côte, 2 sternum, 3 cartilage costal, 4 cervicales, 5 clavicule.",
  "/uploads/os-label-cage.png",
);

export const THEME_0_OS_LABEL_BASSIN = match(
  "Place chaque nom devant le numéro (bassin).",
  [
    ["1", "Ilion"],
    ["2", "Sacrum"],
    ["3", "Coccyx"],
    ["4", "Articulation de la hanche"],
    ["5", "Symphyse pubienne"],
  ],
  "1 ilion, 2 sacrum, 3 coccyx, 4 articulation de la hanche, 5 symphyse pubienne.",
  "/uploads/os-label-bassin.png",
);

export const THEME_0_OS_LABEL_JAMBE = match(
  "Place chaque nom devant le numéro (cuisse, genou et jambe).",
  [
    ["1", "Fibula (péroné)"],
    ["2", "Tibia"],
    ["3", "Fémur"],
    ["4", "Patella (rotule)"],
  ],
  "1 fibula, 2 tibia, 3 fémur, 4 patella.",
  "/uploads/os-label-jambe.png",
);

export const THEME_0_OS_LABELS: SeedQuestion[] = [
  THEME_0_OS_LABEL_BRAS,
  THEME_0_OS_LABEL_CAGE,
  THEME_0_OS_LABEL_BASSIN,
  THEME_0_OS_LABEL_JAMBE,
];
