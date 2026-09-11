import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { AppLocale } from "@/i18n/localeStorage";
import {
  OnboardingButtonStack,
  OnboardingPrimaryButton,
} from "../components/OnboardingPrimaryButton";
import { onboardingColors, onboardingType, space } from "../theme";

type Props = {
  selected: AppLocale | null;
  onSelect: (locale: AppLocale) => void;
  onContinue: () => void;
};

const OPTIONS: Array<{ id: AppLocale; flag: string; labelKey: "french" | "english" }> = [
  { id: "fr", flag: "FR", labelKey: "french" },
  { id: "en", flag: "EN", labelKey: "english" },
];

export function LanguageStep({ selected, onSelect, onContinue }: Props) {
  const { t } = useTranslation(["onboarding", "common"]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ ...onboardingType.hero, marginBottom: space.sm }}>
        {t("onboarding:language.headline")}
      </Text>
      <Text
        style={{
          ...onboardingType.bodyMuted,
          marginBottom: space.xs,
          fontSize: 15,
        }}
      >
        {t("onboarding:language.headlineFr")}
      </Text>
      <Text style={{ ...onboardingType.bodyMuted, marginBottom: space.xl }}>
        {t("onboarding:language.hint")}
      </Text>

      <View style={{ gap: space.md, flex: 1 }}>
        {OPTIONS.map((option) => {
          const active = selected === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => onSelect(option.id)}
              style={{
                borderWidth: 1.5,
                borderColor: active
                  ? onboardingColors.pulse
                  : onboardingColors.seam,
                backgroundColor: active
                  ? "rgba(124,255,178,0.08)"
                  : onboardingColors.rubber,
                borderRadius: 18,
                paddingVertical: 18,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: active
                    ? "rgba(124,255,178,0.18)"
                    : "rgba(255,255,255,0.06)",
                }}
              >
                <Text
                  style={{
                    color: active ? onboardingColors.pulse : "#fff",
                    fontWeight: "700",
                    fontSize: 14,
                  }}
                >
                  {option.flag}
                </Text>
              </View>
              <Text
                style={{
                  ...onboardingType.body,
                  color: "#fff",
                  fontWeight: active ? "700" : "500",
                  flex: 1,
                }}
              >
                {t(`common:${option.labelKey}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <OnboardingButtonStack>
        <OnboardingPrimaryButton
          label={t("onboarding:language.cta")}
          disabled={!selected}
          onPress={onContinue}
        />
      </OnboardingButtonStack>
    </View>
  );
}
