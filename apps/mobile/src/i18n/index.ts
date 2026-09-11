import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  loadAppLocale,
  saveAppLocale,
  type AppLocale,
} from "./localeStorage";

import commonFr from "./locales/fr/common.json";
import onboardingFr from "./locales/fr/onboarding.json";
import authFr from "./locales/fr/auth.json";
import homeFr from "./locales/fr/home.json";
import quizFr from "./locales/fr/quiz.json";
import shopFr from "./locales/fr/shop.json";
import retentionFr from "./locales/fr/retention.json";
import errorsFr from "./locales/fr/errors.json";

import commonEn from "./locales/en/common.json";
import onboardingEn from "./locales/en/onboarding.json";
import authEn from "./locales/en/auth.json";
import homeEn from "./locales/en/home.json";
import quizEn from "./locales/en/quiz.json";
import shopEn from "./locales/en/shop.json";
import retentionEn from "./locales/en/retention.json";
import errorsEn from "./locales/en/errors.json";

const resources = {
  fr: {
    common: commonFr,
    onboarding: onboardingFr,
    auth: authFr,
    home: homeFr,
    quiz: quizFr,
    shop: shopFr,
    retention: retentionFr,
    errors: errorsFr,
  },
  en: {
    common: commonEn,
    onboarding: onboardingEn,
    auth: authEn,
    home: homeEn,
    quiz: quizEn,
    shop: shopEn,
    retention: retentionEn,
    errors: errorsEn,
  },
} as const;

const initialLocale = loadAppLocale();

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLocale,
  fallbackLng: "fr",
  defaultNS: "common",
  ns: [
    "common",
    "onboarding",
    "auth",
    "home",
    "quiz",
    "shop",
    "retention",
    "errors",
  ],
  interpolation: { escapeValue: false },
  compatibilityJSON: "v4",
});

export async function setAppLocale(locale: AppLocale): Promise<void> {
  saveAppLocale(locale);
  await i18n.changeLanguage(locale);
}

export function getAppLocale(): AppLocale {
  const lng = (i18n.language ?? "").toLowerCase();
  return lng.startsWith("en") ? "en" : "fr";
}

export { i18n };
export default i18n;
