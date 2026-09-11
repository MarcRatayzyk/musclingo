import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { analytics } from "@/shared/analytics/posthog";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";

type Props = {
  onGenius: () => void;
  onRecharges: () => void;
  onBack: () => void;
};

export function SoftPaywallGenius({ onGenius, onRecharges, onBack }: Props) {
  const { t } = useTranslation();
  useEffect(() => {
    analytics.capture(analytics.events.SOFT_PAYWALL_SHOWN);
  }, []);

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <Text className="text-xs uppercase tracking-[3px] text-accent">
          {t("shop:softNoBottles")}
        </Text>
        <Text className="mt-3 text-3xl font-semibold text-white">
          {t("shop:softContinueTitle")}
        </Text>
        <Text className="mt-4 text-base leading-6 text-muted">
          {t("shop:softContinueBody")}
        </Text>

        <View className="mt-8 gap-3">
          {[
            t("shop:softFeature1"),
            t("shop:softFeature2"),
            t("shop:softFeature3"),
          ].map((line) => (
            <View key={line} className="flex-row items-start gap-3">
              <View className="mt-2 h-2 w-2 rounded-full bg-accent" />
              <Text className="flex-1 text-base font-medium text-white">
                {line}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-10 gap-3">
          <PrimaryButton
            label={t("shop:geniusCta")}
            onPress={onGenius}
          />
          <Pressable
            onPress={onRecharges}
            className="items-center rounded-2xl border border-border py-4 active:opacity-80"
          >
            <Text className="font-semibold text-white">{t("shop:softSeeRecharges")}</Text>
          </Pressable>
          <Pressable
            onPress={onBack}
            className="items-center py-3 active:opacity-70"
          >
            <Text className="text-sm text-muted">{t("common:back")}</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
