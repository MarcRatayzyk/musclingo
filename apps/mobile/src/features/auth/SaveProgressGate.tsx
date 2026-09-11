import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { analytics } from "@/shared/analytics/posthog";
import { PrimaryButton, Screen } from "@/shared/ui/primitives";
import { dismissClaimPrompt } from "./claimGate";

type Props = {
  onSkip: () => void;
};

export function SaveProgressGate({ onSkip }: Props) {
  const { t } = useTranslation();
  useEffect(() => {
    analytics.capture(analytics.events.CLAIM_PROMPT_SHOWN);
  }, []);

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <Text className="text-xs uppercase tracking-[3px] text-accent">
          {t("auth:almostDone")}
        </Text>
        <Text className="mt-3 text-3xl font-semibold text-white">
          {t("auth:saveProgressTitle")}
        </Text>
        <Text className="mt-4 text-base leading-6 text-muted">
          {t("auth:saveGateBody")}
        </Text>

        <View className="mt-10 gap-3">
          <PrimaryButton
            label={t("auth:saveProgressCta")}
            onPress={() => router.push("/(auth)/register")}
          />
          <Pressable
            onPress={() => {
              dismissClaimPrompt();
              analytics.capture(analytics.events.CLAIM_SKIPPED);
              onSkip();
            }}
            className="items-center py-3 active:opacity-70"
          >
            <Text className="text-sm text-muted">{t("auth:saveProgressLater")}</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
