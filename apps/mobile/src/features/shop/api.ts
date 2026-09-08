import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/client";

export type ShopOffer = {
  id: string;
  kind: "coins" | "money";
  title: string;
  description: string;
  priceNeuroCoins?: number;
  priceEuro?: number;
  rewardBottles: number;
  badge?: string;
};

export type ShopPurchaseResult = {
  demo: boolean;
  offerId: string;
  rewardBottles: number;
  neuroCoinBalance: number;
  waterBottles: number;
  message?: string;
};

export function useShopCatalog() {
  return useQuery({
    queryKey: ["shop", "catalog"],
    queryFn: () =>
      apiFetch<{ offers: ShopOffer[] }>("/shop/catalog").then((r) => r.offers),
  });
}

export function useShopPurchase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (offerId: string) =>
      apiFetch<ShopPurchaseResult>("/shop/purchase", {
        method: "POST",
        body: JSON.stringify({ offerId }),
      }),
    onSuccess: (data) => {
      qc.setQueryData(["me"], (prev: unknown) => {
        if (!prev || typeof prev !== "object") return prev;
        return {
          ...prev,
          neuroCoinBalance: data.neuroCoinBalance,
          waterBottles: data.waterBottles,
        };
      });
      void qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
