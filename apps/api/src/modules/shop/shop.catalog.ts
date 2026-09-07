export type ShopOfferKind = "coins" | "money";

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

export const SHOP_CATALOG: ShopOffer[] = [
  {
    id: "coins-pack-s",
    kind: "coins",
    title: "Gourde rapide",
    description: "",
    priceNeuroCoins: 150,
    rewardBottles: 4,
  },
  {
    id: "coins-pack-m",
    kind: "coins",
    title: "Pack hydratation",
    description: "",
    priceNeuroCoins: 300,
    rewardBottles: 12,
    badge: "Populaire",
  },
  {
    id: "coins-pack-l",
    kind: "coins",
    title: "Réserve complète",
    description: "",
    priceNeuroCoins: 450,
    rewardBottles: 30,
    badge: "Bonus",
  },
  {
    id: "sub-genius",
    kind: "money",
    title: "Genius",
    description: "",
    priceEuro: 5.99,
    rewardBottles: 0,
    badge: "Recommandé",
  },
  {
    id: "sub-boost",
    kind: "money",
    title: "Boost",
    description: "",
    priceEuro: 2.99,
    rewardBottles: 0,
  },
  {
    id: "money-pack-s",
    kind: "money",
    title: "Recharge jour",
    description: "",
    priceEuro: 0.99,
    rewardBottles: 20,
  },
  {
    id: "money-pack-m",
    kind: "money",
    title: "Pack semaine",
    description: "",
    priceEuro: 4.99,
    rewardBottles: 100,
  },
  {
    id: "money-pack-l",
    kind: "money",
    title: "Pack premium",
    description: "",
    priceEuro: 9.99,
    rewardBottles: 250,
  },
];

export function getShopOffer(id: string): ShopOffer | undefined {
  return SHOP_CATALOG.find((o) => o.id === id);
}
