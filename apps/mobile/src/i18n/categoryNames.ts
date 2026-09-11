import i18n from "i18next";

const BY_SLUG_EN: Record<string, string> = {
  anatomie: "Anatomy",
  nutrition: "Nutrition",
  biomecanique: "Biomechanics",
  programmation: "Programming",
  recuperation: "Recovery",
};

const BY_NAME_EN: Record<string, string> = {
  Anatomie: "Anatomy",
  Nutrition: "Nutrition",
  Biomécanique: "Biomechanics",
  Programmation: "Programming",
  Récupération: "Recovery",
};

/** Client fallback when API still returns FR names (empty nameEn / stale cache). */
export function localizeCategoryName(
  name: string,
  slug?: string | null,
): string {
  const en = (i18n.language ?? "").toLowerCase().startsWith("en");
  if (!en) return name;
  if (slug && BY_SLUG_EN[slug]) return BY_SLUG_EN[slug];
  return BY_NAME_EN[name] ?? name;
}
