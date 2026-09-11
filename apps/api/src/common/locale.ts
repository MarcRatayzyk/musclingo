import { enOrTranslate } from "./auto-en";

export type AppLocale = "fr" | "en";

export function parseLocale(value: unknown): AppLocale {
  if (typeof value !== "string") return "fr";
  const normalized = value.trim().toLowerCase().slice(0, 2);
  return normalized === "en" ? "en" : "fr";
}

type RequestHeadersLike =
  | Record<string, string | string[] | undefined>
  | undefined
  | null;

function readLocaleHeader(headers: RequestHeadersLike): string | undefined {
  if (!headers) return undefined;
  const direct = headers["x-locale"] ?? headers["X-Locale"];
  if (Array.isArray(direct)) return direct[0];
  return direct;
}

export function resolveRequestLocale(
  headers: RequestHeadersLike,
  userLocale?: string | null,
): AppLocale {
  const fromHeader = readLocaleHeader(headers);
  if (fromHeader) return parseLocale(fromHeader);
  if (userLocale) return parseLocale(userLocale);
  return "fr";
}

/**
 * Prefer stored *En. If missing and locale is EN, auto-translate FR
 * so every lesson / quiz / answer works before (or without) a full reseed.
 */
export function pickLocalized(
  fr: string,
  en: string | null | undefined,
  locale: AppLocale,
): string {
  if (locale !== "en") return fr;
  if (en && en.trim()) return en;
  return enOrTranslate(fr);
}

export function pickLocalizedNullable(
  fr: string | null | undefined,
  en: string | null | undefined,
  locale: AppLocale,
): string | null {
  if (locale === "en") {
    if (en && en.trim()) return en;
    if (fr && fr.trim()) return enOrTranslate(fr);
    return null;
  }
  if (fr && fr.trim()) return fr;
  if (en && en.trim()) return en;
  return null;
}
