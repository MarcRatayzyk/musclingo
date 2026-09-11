export type ShopOfferKind = "coins" | "money";
export type AppLocale = "fr" | "en";

export type ShopOffer = {
  id: string;
  kind: ShopOfferKind;
  title: string;
  description: string;
  priceNeuroCoins?: number;
  priceEuro?: number;
  rewardBottles: number;
  badge?: string;
};

type LocalizedShopOffer = Omit<ShopOffer, "title" | "description" | "badge"> & {
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  badge?: { fr: string; en: string };
};

const SHOP_CATALOG_L10N: LocalizedShopOffer[] = [
  {
    id: "coins-pack-s",
    kind: "coins",
    title: { fr: "Gourde rapide", en: "Quick bottle" },
    description: {
      fr: "+4 pour tes leçons",
      en: "+4 bottles for your lessons",
    },
    priceNeuroCoins: 150,
    rewardBottles: 4,
  },
  {
    id: "coins-pack-m",
    kind: "coins",
    title: { fr: "Pack hydratation", en: "Hydration pack" },
    description: {
      fr: "+12 pour tes leçons",
      en: "+12 bottles for your lessons",
    },
    priceNeuroCoins: 300,
    rewardBottles: 12,
    badge: { fr: "Populaire", en: "Popular" },
  },
  {
    id: "coins-pack-l",
    kind: "coins",
    title: { fr: "Réserve complète", en: "Full reserve" },
    description: {
      fr: "+30 pour tes leçons",
      en: "+30 bottles for your lessons",
    },
    priceNeuroCoins: 450,
    rewardBottles: 30,
    badge: { fr: "Bonus", en: "Bonus" },
  },
  {
    id: "sub-genius",
    kind: "money",
    title: { fr: "Genius", en: "Genius" },
    description: {
      fr: "Plus jamais à court de leçons — progresse sans interruption",
      en: "Never run out of lessons — progress without interruption",
    },
    priceEuro: 5.99,
    rewardBottles: 0,
    badge: { fr: "Le plus rentable", en: "Best value" },
  },
  {
    id: "sub-boost",
    kind: "money",
    title: { fr: "Boost", en: "Boost" },
    description: {
      fr: "35 bouteilles / jour, recharge toutes les 30 min",
      en: "35 bottles / day, refill every 30 min",
    },
    priceEuro: 2.99,
    rewardBottles: 0,
  },
  {
    id: "money-pack-s",
    kind: "money",
    title: { fr: "Recharge jour", en: "Day refill" },
    description: {
      fr: "+20 pour tes leçons",
      en: "+20 bottles for your lessons",
    },
    priceEuro: 0.99,
    rewardBottles: 20,
  },
  {
    id: "money-pack-m",
    kind: "money",
    title: { fr: "Pack semaine", en: "Week pack" },
    description: {
      fr: "+100 pour tes leçons",
      en: "+100 bottles for your lessons",
    },
    priceEuro: 4.99,
    rewardBottles: 100,
    badge: { fr: "Populaire", en: "Popular" },
  },
  {
    id: "money-pack-l",
    kind: "money",
    title: { fr: "Pack premium", en: "Premium pack" },
    description: {
      fr: "+250 pour tes leçons",
      en: "+250 bottles for your lessons",
    },
    priceEuro: 9.99,
    rewardBottles: 250,
    badge: { fr: "Max", en: "Max" },
  },
];

function localizeOffer(
  offer: LocalizedShopOffer,
  locale: AppLocale = "fr",
): ShopOffer {
  return {
    id: offer.id,
    kind: offer.kind,
    title: offer.title[locale],
    description: offer.description[locale],
    priceNeuroCoins: offer.priceNeuroCoins,
    priceEuro: offer.priceEuro,
    rewardBottles: offer.rewardBottles,
    badge: offer.badge?.[locale],
  };
}

/** Default FR catalog (backward compatible). */
export const SHOP_CATALOG: ShopOffer[] = SHOP_CATALOG_L10N.map((o) =>
  localizeOffer(o, "fr"),
);

export function getShopCatalog(locale: AppLocale = "fr"): ShopOffer[] {
  return SHOP_CATALOG_L10N.map((o) => localizeOffer(o, locale));
}

export function getShopOffer(
  id: string,
  locale: AppLocale = "fr",
): ShopOffer | undefined {
  const found = SHOP_CATALOG_L10N.find((o) => o.id === id);
  return found ? localizeOffer(found, locale) : undefined;
}
