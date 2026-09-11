import { Linking, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMe } from "@/features/auth/api";
import { getOffersForReason } from "@/features/retention/offers";
import { computeHealthScore } from "@/features/retention/healthScore";
import {
  acceptSaveOffer,
  confirmCancel,
  isEffectivelyPremium,
  isPaused,
  loadRetentionState,
  planDisplayName,
  reactivateDemoSub,
} from "@/features/retention/storage";
import {
  CANCEL_REASON_OPTIONS,
  type CancelReason,
  type SaveOffer,
} from "@/features/retention/types";
import { getAppLocale } from "@/i18n";
import { analytics } from "@/shared/analytics/posthog";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

type Step = "overview" | "survey" | "offer" | "confirm" | "done";

export default function ManageSubscriptionScreen() {
  const { t } = useTranslation();
  const { data: me } = useMe();
  const [tick, setTick] = useState(0);
  const state = useMemo(() => loadRetentionState(), [tick]);
  const refresh = useCallback(() => setTick((t) => t + 1), []);

  const [step, setStep] = useState<Step>("overview");
  const [reason, setReason] = useState<CancelReason | null>(null);
  const [otherText, setOtherText] = useState("");
  const offerTracked = useRef(false);

  const health = useMemo(
    () => computeHealthScore(me ?? null, state),
    [me, state],
  );

  const premium = isEffectivelyPremium(state);
  const paused = isPaused(state);

  useEffect(() => {
    analytics.capture(analytics.events.SUBSCRIPTION_MANAGE_OPENED, {
      planId: state.planId,
      isPremium: state.isPremiumDemo,
    });
    // once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offers = reason ? getOffersForReason(reason) : null;

  useEffect(() => {
    if (step === "offer" && reason && offers && !offerTracked.current) {
      offerTracked.current = true;
      analytics.capture(analytics.events.CANCEL_OFFER_SHOWN, {
        reason,
        offerKind: offers.primary.kind,
      });
    }
    if (step !== "offer") offerTracked.current = false;
  }, [step, reason, offers]);

  function onSurveyContinue() {
    if (!reason) return;
    analytics.capture(analytics.events.CANCEL_SURVEY_ANSWERED, {
      reason,
      otherText: reason === "other" ? otherText.slice(0, 200) : null,
    });
    setStep("offer");
  }

  function onAcceptOffer(offer: SaveOffer) {
    if (!reason) return;
    analytics.capture(analytics.events.CANCEL_OFFER_ACCEPTED, {
      reason,
      offerKind: offer.kind,
    });

    if (offer.kind === "support") {
      void Linking.openURL(
        "mailto:support@musclemind.app?subject=Bug%20Muscle%20Mind",
      );
      acceptSaveOffer(reason, offer);
      refresh();
      setStep("overview");
      return;
    }

    if (offer.kind === "value_reminder" && reason === "not_using") {
      acceptSaveOffer(reason, offer);
      refresh();
      router.replace("/(app)/home");
      return;
    }

    acceptSaveOffer(reason, offer);
    refresh();
    setStep("overview");
  }

  function onDeclineOffer() {
    if (!reason) return;
    analytics.capture(analytics.events.CANCEL_OFFER_DECLINED, {
      reason,
      offerKind: offers?.primary.kind ?? null,
    });
    setStep("confirm");
  }

  function onConfirmCancel() {
    if (!reason) return;
    confirmCancel(reason);
    analytics.capture(analytics.events.SUBSCRIPTION_CANCELLED, { reason });
    refresh();
    setStep("done");
  }

  function onReactivate() {
    reactivateDemoSub("sub-genius");
    analytics.capture(analytics.events.PREMIUM_SUBSCRIBED, {
      planId: "sub-genius",
      source: "winback",
    });
    refresh();
    setStep("overview");
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} className="mb-8">
        <Pressable onPress={() => router.back()} hitSlop={12} className="mb-4">
          <Text className="text-accent">← {t("common:back")}</Text>
        </Pressable>

        <Text className="text-xs uppercase tracking-[3px] text-accent">
          {t("home:subscription")}
        </Text>
        <Text className="mt-2 text-3xl font-semibold text-white">
          {t("home:manageSub")}
        </Text>

        {step === "overview" && (
          <Overview
            planName={planDisplayName(state.planId)}
            premium={premium}
            paused={paused}
            pausedUntil={state.pausedUntil}
            discountPercent={state.discountPercent}
            discountEndsAt={state.discountEndsAt}
            cancelledAt={state.cancelledAt}
            healthScore={health.score}
            healthLabel={health.label}
            t={t}
            onStartCancel={() => {
              setReason(null);
              setOtherText("");
              setStep("survey");
            }}
            onShop={() => router.push("/(app)/shop")}
            onReactivate={onReactivate}
          />
        )}

        {step === "survey" && (
          <SurveyStep
            reason={reason}
            otherText={otherText}
            onSelect={setReason}
            onOtherText={setOtherText}
            onContinue={onSurveyContinue}
            t={t}
            onKeep={() => setStep("overview")}
          />
        )}

        {step === "offer" && reason && offers && (
          <OfferStep
            primary={offers.primary}
            fallback={offers.fallback}
            t={t}
            onAccept={onAcceptOffer}
            onDecline={onDeclineOffer}
            onKeep={() => setStep("overview")}
          />
        )}

        {step === "confirm" && (
          <ConfirmStep
            planName={planDisplayName(state.planId)}
            t={t}
            onConfirm={onConfirmCancel}
            onKeep={() => setStep("overview")}
          />
        )}

        {step === "done" && (
          <DoneStep
            t={t}
            onReactivate={onReactivate}
            onShop={() => router.push("/(app)/shop")}
          />
        )}
      </ScrollView>
    </Screen>
  );
}

function Overview({
  planName,
  premium,
  paused,
  pausedUntil,
  discountPercent,
  discountEndsAt,
  cancelledAt,
  healthScore,
  healthLabel,
  t,
  onStartCancel,
  onShop,
  onReactivate,
}: {
  planName: string;
  premium: boolean;
  paused: boolean;
  pausedUntil: string | null;
  discountPercent: number | null;
  discountEndsAt: string | null;
  cancelledAt: string | null;
  healthScore: number;
  healthLabel: string;
  t: (key: string, options?: Record<string, unknown>) => string;
  onStartCancel: () => void;
  onShop: () => void;
  onReactivate: () => void;
}) {
  const dateLocale = getAppLocale() === "en" ? "en-US" : "fr-FR";
  return (
    <View className="mt-6">
      <View className="rounded-3xl border border-border bg-surface p-5">
        <Text className="text-sm text-muted">{t("retention:manage.currentPlan")}</Text>
        <Text className="mt-1 text-2xl font-semibold text-white">
          {premium || paused ? planName : t("retention:manage.noSubscription")}
        </Text>
        {paused && pausedUntil ? (
          <Text className="mt-2 text-sm text-accent">
            {t("retention:manage.pausedUntil", {
              date: new Date(pausedUntil).toLocaleDateString(dateLocale),
            })}
          </Text>
        ) : null}
        {discountPercent && discountEndsAt ? (
          <Text className="mt-2 text-sm text-accent">
            {t("retention:manage.discountUntil", {
              percent: discountPercent,
              date: new Date(discountEndsAt).toLocaleDateString(dateLocale),
            })}
          </Text>
        ) : null}
        {cancelledAt ? (
          <Text className="mt-2 text-sm text-muted">
            {t("retention:manage.cancelledOn", {
              date: new Date(cancelledAt).toLocaleDateString(dateLocale),
            })}
          </Text>
        ) : null}

        <Text className="mt-4 text-xs text-muted">
          {t("retention:manage.engagement", { health: healthLabel, score: healthScore })}
        </Text>
      </View>

      {!premium && !paused ? (
        <View className="mt-6 gap-3">
          <PrimaryButton label={t("retention:manage.shopCta")} onPress={onShop} />
          {cancelledAt ? (
            <PrimaryButton label={t("retention:manage.reactivateDemo")} onPress={onReactivate} />
          ) : null}
        </View>
      ) : (
        <View className="mt-6 gap-3">
          <Pressable
            className="rounded-2xl border border-border py-4"
            onPress={onStartCancel}
          >
            <Text className="text-center text-base text-danger">
              {t("retention:manage.cancelSub")}
            </Text>
          </Pressable>
          <Text className="text-center text-xs text-muted">
            {t("retention:manage.demoDisclaimer")}
          </Text>
        </View>
      )}
    </View>
  );
}

function SurveyStep({
  reason,
  otherText,
  onSelect,
  onOtherText,
  onContinue,
  t,
  onKeep,
}: {
  reason: CancelReason | null;
  otherText: string;
  onSelect: (r: CancelReason) => void;
  onOtherText: (t: string) => void;
  onContinue: () => void;
  t: (key: string, options?: Record<string, unknown>) => string;
  onKeep: () => void;
}) {
  return (
    <View className="mt-6">
      <Text className="text-xl font-semibold text-white">
        {t("retention:manage.whyLeaveTitle")}
      </Text>
      <Text className="mt-2 text-sm text-muted">
        {t("retention:manage.whyLeaveBody")}
      </Text>

      <View className="mt-5 gap-2">
        {CANCEL_REASON_OPTIONS.map((opt) => {
          const selected = reason === opt.id;
          return (
            <Pressable
              key={opt.id}
              onPress={() => onSelect(opt.id)}
              className={`rounded-2xl border px-4 py-3 ${
                selected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface"
              }`}
            >
              <Text className={selected ? "text-accent" : "text-white"}>
                {t(`retention:reasons.${opt.id}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {reason === "other" ? (
        <TextInput
          value={otherText}
          onChangeText={onOtherText}
          placeholder={t("retention:manage.otherPlaceholder")}
          placeholderTextColor="#8B95A8"
          className="mt-3 rounded-2xl border border-border bg-surface px-4 py-3 text-white"
          multiline
        />
      ) : null}

      <View className="mt-6 gap-3">
        <PrimaryButton
          label={t("retention:manage.viewOffer")}
          onPress={onContinue}
          disabled={!reason}
        />
        <Pressable onPress={onKeep} className="py-3">
          <Text className="text-center text-accent">
            {t("retention:manage.keepSub")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function OfferStep({
  primary,
  fallback,
  t,
  onAccept,
  onDecline,
  onKeep,
}: {
  primary: SaveOffer;
  fallback?: SaveOffer;
  t: (key: string, options?: Record<string, unknown>) => string;
  onAccept: (offer: SaveOffer) => void;
  onDecline: () => void;
  onKeep: () => void;
}) {
  return (
    <View className="mt-6">
      <Text className="text-xl font-semibold text-white">
        {t("retention:manage.offerTitle")}
      </Text>
      <Text className="mt-2 text-sm text-muted">
        {t("retention:manage.offerBody")}
      </Text>

      <View className="mt-5 rounded-3xl border border-accent/50 bg-surface p-5">
        <Text className="text-lg font-semibold text-white">{primary.title}</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">{primary.body}</Text>
        <View className="mt-4">
          <PrimaryButton
            label={primary.ctaLabel}
            onPress={() => onAccept(primary)}
          />
        </View>
      </View>

      {fallback ? (
        <Pressable
          className="mt-4 rounded-2xl border border-border bg-elevated px-4 py-4"
          onPress={() => onAccept(fallback)}
        >
          <Text className="font-medium text-white">{fallback.title}</Text>
          <Text className="mt-1 text-sm text-muted">{fallback.body}</Text>
          <Text className="mt-2 text-sm text-accent">{fallback.ctaLabel} →</Text>
        </Pressable>
      ) : null}

      <Pressable onPress={onDecline} className="mt-6 py-3">
        <Text className="text-center text-muted">
          {t("retention:manage.continueCancel")}
        </Text>
      </Pressable>
      <Pressable onPress={onKeep} className="py-2">
        <Text className="text-center text-accent">{t("retention:manage.keepSub")}</Text>
      </Pressable>
    </View>
  );
}

function ConfirmStep({
  planName,
  t,
  onConfirm,
  onKeep,
}: {
  planName: string;
  t: (key: string, options?: Record<string, unknown>) => string;
  onConfirm: () => void;
  onKeep: () => void;
}) {
  return (
    <View className="mt-6">
      <Text className="text-xl font-semibold text-white">
        {t("retention:manage.confirmTitle")}
      </Text>
      <Text className="mt-3 text-sm leading-5 text-muted">
        {t("retention:manage.confirmBody", { planName })}
      </Text>
      <View className="mt-6 gap-3">
        <Pressable
          className="rounded-2xl border border-danger/60 py-4"
          onPress={onConfirm}
        >
          <Text className="text-center text-base font-semibold text-danger">
            {t("retention:manage.confirmTitle")}
          </Text>
        </Pressable>
        <Pressable onPress={onKeep} className="py-3">
          <Text className="text-center text-accent">
            {t("retention:manage.keepSub")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function DoneStep({
  t,
  onReactivate,
  onShop,
}: {
  t: (key: string, options?: Record<string, unknown>) => string;
  onReactivate: () => void;
  onShop: () => void;
}) {
  return (
    <View className="mt-6">
      <Text className="text-xl font-semibold text-white">
        {t("retention:manage.doneTitle")}
      </Text>
      <Text className="mt-3 text-sm leading-5 text-muted">
        {t("retention:manage.doneBody")}
      </Text>
      <View className="mt-6 gap-3">
        <PrimaryButton label={t("retention:manage.reactivateDemo")} onPress={onReactivate} />
        <Pressable
          className="rounded-2xl border border-border py-4"
          onPress={onShop}
        >
          <Text className="text-center text-white">{t("retention:manage.shopCta")}</Text>
        </Pressable>
      </View>
    </View>
  );
}
