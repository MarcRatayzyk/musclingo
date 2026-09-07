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
    description: "4 bouteilles pour reprendre une leçon.",
    priceNeuroCoins: 10,
    rewardBottles: 4,
  },
  {
    id: "coins-pack-m",
    kind: "coins",
    title: "Pack hydratation",
    description: "12 bouteilles pour enchaîner.",
    priceNeuroCoins: 25,
    rewardBottles: 12,
    badge: "Populaire",
  },
  {
    id: "coins-pack-l",
    kind: "coins",
    title: "Réserve complète",
    description: "30 bouteilles — meilleur ratio.",
    priceNeuroCoins: 50,
    rewardBottles: 30,
    badge: "Bonus",
  },
  {
    id: "money-pack-s",
    kind: "money",
    title: "Recharge jour",
    description: "Remplit ta réserve quotidienne.",
    priceEuro: 0.99,
    rewardBottles: 20,
    badge: "Démo",
  },
  {
    id: "money-pack-m",
    kind: "money",
    title: "Pack semaine",
    description: "100 bouteilles pour progresser sans frein.",
    priceEuro: 4.99,
    rewardBottles: 100,
    badge: "Démo",
  },
  {
    id: "money-pack-l",
    kind: "money",
    title: "Pack premium",
    description: "250 bouteilles — offre fictive sans paiement réel.",
    priceEuro: 9.99,
    rewardBottles: 250,
    badge: "Démo",
  },
];

export function getShopOffer(id: string): ShopOffer | undefined {
  return SHOP_CATALOG.find((o) => o.id === id);
}
