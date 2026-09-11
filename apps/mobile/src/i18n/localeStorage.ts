import { getLocales } from "expo-localization";
import { mmkv } from "@/shared/storage/mmkv";

export type AppLocale = "fr" | "en";

const KEY = "app_locale";

export function isAppLocale(value: unknown): value is AppLocale {
  return value === "fr" || value === "en";
}

export function detectDeviceLocale(): AppLocale {
  const code = getLocales()[0]?.languageCode?.toLowerCase();
  if (code === "en" || code === "fr") return code;
  return "fr";
}

export function loadAppLocale(): AppLocale {
  const stored = mmkv.getString(KEY);
  if (isAppLocale(stored)) return stored;
  return detectDeviceLocale();
}

export function saveAppLocale(locale: AppLocale): void {
  mmkv.set(KEY, locale);
}
