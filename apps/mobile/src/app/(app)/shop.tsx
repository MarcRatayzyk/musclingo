import { useState } from "react";
import {
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { useShopCatalog, useShopPurchase, type ShopOffer } from "@/features/shop/api";
import { activateDemoSub } from "@/features/retention/storage";
import type { PlanId } from "@/features/retention/types";
import { ApiError } from "@/shared/api/client";
import { analytics } from "@/shared/analytics/posthog";
import { Screen } from "@/shared/ui/primitives";
import { NeuroCoinIcon } from "@/shared/ui/NeuroCoin";
import { WaterBottleIcon } from "@/shared/ui/WaterBottle";
import { RewardsTopBar } from "@/shared/ui/RewardsTopBar";
import { ShopSkeleton } from "@/shared/ui/Skeleton";

const TAB_BAR_HEIGHT = 70;
const TOP_BAR_BLOCK = 64;

function OfferCard({
  offer,
  busy,
  onBuy,
}: {
  offer: ShopOffer;
  busy: boolean;
  onBuy: () => void;
}) {
  const { t } = useTranslation();
  const isCoins = offer.kind === "coins";
  const euroPrice = offer.priceEuro?.toFixed(2).replace(".", ",");
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
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <View style={{ flex: 1, gap: 6 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "700" }}>
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <WaterBottleIcon size={18} />
            <Text style={{ color: "#5BCfff", fontWeight: "800", fontSize: 15 }}>
              {t("shop:rewardForLessons", { count: offer.rewardBottles })}
            </Text>
          </View>
        </View>

        <Pressable
          disabled={busy}
          onPress={onBuy}
          accessibilityLabel={
            isCoins
              ? t("shop:accessibilityExchange", { price: offer.priceNeuroCoins })
              : t("shop:accessibilityGet", { price: euroPrice })
          }
          style={{
            minWidth: 96,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
            paddingVertical: 10,
            paddingHorizontal: 12,
            backgroundColor: isCoins ? "#E8B84A" : "#7CFFB2",
            opacity: busy ? 0.6 : 1,
            gap: 2,
          }}
        >
          <Text style={{ color: "#0B0F14", fontWeight: "800", fontSize: 12 }}>
            {isCoins ? t("shop:exchange") : t("shop:get")}
          </Text>
          {isCoins ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Text style={{ color: "#0B0F14", fontWeight: "800", fontSize: 15 }}>
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

function GeniusCard({
  busy,
  onBuy,
}: {
  busy: boolean;
  onBuy: () => void;
}) {
  const { t } = useTranslation();
  return (
    <View
      style={{
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#7CFFB2",
        backgroundColor: "#0B1410",
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 16,
        overflow: "hidden",
      }}
    >
      <Svg
        pointerEvents="none"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id="geniusBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#1E3A2E" />
            <Stop offset="0.45" stopColor="#14241C" />
            <Stop offset="1" stopColor="#0B1410" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#geniusBg)" />
      </Svg>
      <View
        style={{
          position: "absolute",
          top: -40,
          right: -30,
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: "rgba(124,255,178,0.12)",
        }}
      />
      <View
        style={{
          alignSelf: "flex-start",
          borderRadius: 999,
          backgroundColor: "#7CFFB233",
          paddingHorizontal: 10,
          paddingVertical: 4,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: "#7CFFB2", fontSize: 11, fontWeight: "800" }}>
          {t("shop:bestValue")}
        </Text>
      </View>

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 32,
          fontWeight: "900",
          letterSpacing: 0.5,
          marginBottom: 6,
        }}
      >
        Genius
      </Text>
      <Text
        style={{
          color: "#7CFFB2",
          fontSize: 14,
          fontWeight: "700",
          marginBottom: 16,
        }}
      >
        {t("shop:geniusSubtitle")}
      </Text>

      <View style={{ gap: 10, marginBottom: 18 }}>
        {[
          t("shop:geniusFeature1"),
          t("shop:geniusFeature2"),
          t("shop:geniusFeature3"),
        ].map((feature) => (
          <View
            key={feature}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#7CFFB2",
              }}
            />
            <Text style={{ color: "#E8EDF5", fontSize: 15, fontWeight: "600" }}>
              {feature}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        disabled={busy}
        onPress={onBuy}
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          paddingVertical: 14,
          backgroundColor: "#7CFFB2",
          opacity: busy ? 0.6 : 1,
        }}
      >
        <Text style={{ color: "#0B0F14", fontWeight: "900", fontSize: 17 }}>
          {t("shop:geniusCta")}
        </Text>
      </Pressable>
    </View>
  );
}

function BoostCard({
  busy,
  onBuy,
}: {
  busy: boolean;
  onBuy: () => void;
}) {
  const { t } = useTranslation();
  return (
    <View
      style={{
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(232,184,74,0.35)",
        backgroundColor: "#141820",
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 17,
            fontWeight: "800",
            marginBottom: 6,
          }}
        >
          Boost
        </Text>
        <Text style={{ color: "#8B95A8", fontSize: 12, lineHeight: 17 }}>
          {t("shop:boostBody")}
        </Text>
      </View>
      <Pressable
        disabled={busy}
        onPress={onBuy}
        style={{
          minWidth: 96,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          paddingVertical: 11,
          paddingHorizontal: 12,
          backgroundColor: "#E8B84A",
          opacity: busy ? 0.6 : 1,
        }}
      >
        <Text style={{ color: "#0B0F14", fontWeight: "800", fontSize: 13 }}>
          {t("shop:boostCta")}
        </Text>
      </Pressable>
    </View>
  );
}

export default function ShopScreen() {
  const { t } = useTranslation();
  const { height: windowH } = useWindowDimensions();
  const { data: offers, isLoading } = useShopCatalog();
  const purchase = useShopPurchase();
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const scrollY = useSharedValue(0);

  const coinOffers = (offers ?? []).filter((o) => o.kind === "coins");
  const moneyOffers = (offers ?? []).filter(
    (o) => o.kind === "money" && o.id.startsWith("money-"),
  );
  const heroHeight = Math.max(440, windowH - TAB_BAR_HEIGHT - TOP_BAR_BLOCK - 48);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const packsStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      scrollY.value,
      [0, heroHeight * 0.22, heroHeight * 0.45],
      [0, 0.55, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: progress,
      transform: [{ translateY: (1 - progress) * 36 }],
    };
  });

  const hintStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 40],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  async function onBuy(offerId: string, label: string) {
    setError(null);
    setToast(null);
    setBuyingId(offerId);
    try {
      const res = await purchase.mutateAsync(offerId);
      if (res.demo && offerId.startsWith("sub-")) {
        const planId = offerId as PlanId;
        activateDemoSub(planId);
        analytics.capture(analytics.events.PREMIUM_SUBSCRIBED, {
          planId,
          source: "shop_demo",
        });
        setToast(res.message ?? t("shop:demoActivated", { label }));
      } else if (res.demo) {
        setToast(res.message ?? t("shop:demoReward", { count: res.rewardBottles }));
      } else {
        setToast(t("shop:rewardOnly", { count: res.rewardBottles }));
      }
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : t("shop:purchaseError");
      setError(message);
    } finally {
      setBuyingId(null);
    }
  }

  return (
    <Screen className="pt-8">
      <RewardsTopBar />

      {error ? (
        <Text style={{ color: "#F87171", marginBottom: 8, fontWeight: "600" }}>
          {error}
        </Text>
      ) : null}
      {toast ? (
        <Text style={{ color: "#7CFFB2", marginBottom: 8, fontWeight: "600" }}>
          {toast}
        </Text>
      ) : null}

      {isLoading ? (
        <ShopSkeleton />
      ) : (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 28 }}
        >
          <View style={{ minHeight: heroHeight, justifyContent: "center" }}>
            <Animated.View entering={FadeInDown.duration(420)} style={{ gap: 12 }}>
              <GeniusCard
                busy={buyingId === "sub-genius"}
                onBuy={() => void onBuy("sub-genius", "Genius")}
              />
              <BoostCard
                busy={buyingId === "sub-boost"}
                onBuy={() => void onBuy("sub-boost", "Boost")}
              />
            </Animated.View>

            <Animated.Text
              style={[
                {
                  color: "#8B95A8",
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 22,
                },
                hintStyle,
              ]}
            >
              {t("shop:scrollHint")}
            </Animated.Text>
          </View>

          <Animated.View style={packsStyle}>
            {coinOffers.length > 0 ? (
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "800",
                  marginBottom: 12,
                  marginTop: 4,
                }}
              >
                {t("shop:exchangeNeuroCoins")}
              </Text>
            ) : null}
            {coinOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                busy={buyingId === offer.id}
                onBuy={() => void onBuy(offer.id, offer.title)}
              />
            ))}

            {moneyOffers.length > 0 ? (
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "800",
                  marginBottom: 12,
                  marginTop: 16,
                }}
              >
                {t("shop:bottlePacks")}
              </Text>
            ) : null}
            {moneyOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                busy={buyingId === offer.id}
                onBuy={() => void onBuy(offer.id, offer.title)}
              />
            ))}
          </Animated.View>
        </Animated.ScrollView>
      )}
    </Screen>
  );
}
