import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useMe } from "@/features/auth/api";
import { useShopCatalog, useShopPurchase, type ShopOffer } from "@/features/shop/api";
import { ApiError } from "@/shared/api/client";
import { Screen } from "@/shared/ui/primitives";
import { NeuroCoinAmount, NeuroCoinIcon } from "@/shared/ui/NeuroCoin";
import { WaterBottleAmount, WaterBottleIcon } from "@/shared/ui/WaterBottle";
import { RewardsTopBar } from "@/shared/ui/RewardsTopBar";

function OfferCard({
  offer,
  busy,
  onBuy,
}: {
  offer: ShopOffer;
  busy: boolean;
  onBuy: () => void;
}) {
  const isCoins = offer.kind === "coins";
  return (
    <View
      style={{
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        backgroundColor: "#141820",
        padding: 16,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text
              style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "700" }}
            >
              {offer.title}
            </Text>
            {offer.badge ? (
              <View
                style={{
                  borderRadius: 999,
                  backgroundColor: isCoins ? "#E8B84A33" : "#7CFFB233",
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={{
                    color: isCoins ? "#E8B84A" : "#7CFFB2",
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  {offer.badge}
                </Text>
              </View>
            ) : null}
          </View>
          <Text
            style={{
              color: "#8B95A8",
              fontSize: 13,
              lineHeight: 18,
              marginTop: 6,
            }}
          >
            {offer.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginTop: 10,
            }}
          >
            <WaterBottleIcon size={18} />
            <Text style={{ color: "#5BCfff", fontWeight: "800", fontSize: 15 }}>
              +{offer.rewardBottles}
            </Text>
          </View>
        </View>

        <Pressable
          disabled={busy}
          onPress={onBuy}
          style={{
            minWidth: 88,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 12,
            backgroundColor: isCoins ? "#E8B84A" : "#7CFFB2",
            opacity: busy ? 0.6 : 1,
          }}
        >
          {isCoins ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Text
                style={{ color: "#0B0F14", fontWeight: "800", fontSize: 15 }}
              >
                {offer.priceNeuroCoins}
              </Text>
              <NeuroCoinIcon size={18} />
            </View>
          ) : (
            <Text style={{ color: "#0B0F14", fontWeight: "800", fontSize: 15 }}>
              {offer.priceEuro?.toFixed(2).replace(".", ",")} €
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

export default function ShopScreen() {
  const { data: me } = useMe();
  const { data: offers, isLoading } = useShopCatalog();
  const purchase = useShopPurchase();
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [buyingId, setBuyingId] = useState<string | null>(null);

  const coinOffers = (offers ?? []).filter((o) => o.kind === "coins");
  const moneyOffers = (offers ?? []).filter((o) => o.kind === "money");

  async function onBuy(offer: ShopOffer) {
    setError(null);
    setToast(null);
    setBuyingId(offer.id);
    try {
      const res = await purchase.mutateAsync(offer.id);
      setToast(
        res.demo
          ? `Démo : +${res.rewardBottles} bouteilles (pas de paiement)`
          : `+${res.rewardBottles} bouteilles`,
      );
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Achat impossible";
      setError(message);
    } finally {
      setBuyingId(null);
    }
  }

  return (
    <Screen className="pt-8">
      <RewardsTopBar />

      <Text className="text-xs uppercase tracking-[3px] text-accent">
        Boutique
      </Text>
      <Text className="mt-2 mb-1 text-3xl font-semibold text-white">
        Échange & offres
      </Text>
      <Text className="mb-4 text-sm text-muted">
        Dépenser des NeuroCoins ou tester des packs (prix fictifs).
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
            backgroundColor: "#141820",
            padding: 12,
            alignItems: "center",
          }}
        >
          <NeuroCoinAmount amount={me?.neuroCoinBalance ?? 0} size="md" />
          <Text style={{ color: "#8B95A8", fontSize: 11, marginTop: 4 }}>
            Solde NeuroCoins
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
            backgroundColor: "#141820",
            padding: 12,
            alignItems: "center",
          }}
        >
          <WaterBottleAmount
            amount={me?.waterBottles ?? 20}
            size="md"
            showMax={false}
          />
          <Text style={{ color: "#8B95A8", fontSize: 11, marginTop: 4 }}>
            Bouteilles
          </Text>
        </View>
      </View>

      {error ? (
        <Text style={{ color: "#F87171", marginBottom: 10, fontWeight: "600" }}>
          {error}
        </Text>
      ) : null}
      {toast ? (
        <Text style={{ color: "#7CFFB2", marginBottom: 10, fontWeight: "600" }}>
          {toast}
        </Text>
      ) : null}

      <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
        {isLoading ? (
          <ActivityIndicator color="#7CFFB2" />
        ) : (
          <>
            <Text className="mb-3 text-lg font-semibold text-white">
              Contre des NeuroCoins
            </Text>
            {coinOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                busy={buyingId === offer.id}
                onBuy={() => void onBuy(offer)}
              />
            ))}

            <Text className="mb-3 mt-4 text-lg font-semibold text-white">
              Offres (démo)
            </Text>
            <Text className="mb-3 text-xs text-muted">
              Prix en euros fictifs — aucun paiement réel.
            </Text>
            {moneyOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                busy={buyingId === offer.id}
                onBuy={() => void onBuy(offer)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </Screen>
  );
}
