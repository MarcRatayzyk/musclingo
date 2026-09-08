const appJson = require("./app.json");

const offline =
  process.env.EXPO_PUBLIC_OFFLINE === "1" ||
  process.env.EXPO_PUBLIC_OFFLINE === "true";
const apiUrl = (process.env.EXPO_PUBLIC_API_URL ?? "").trim();

if (process.env.EAS_BUILD === "true" && !offline) {
  if (
    !apiUrl ||
    /localhost|127\.0\.0\.1|CHANGE_ME|REPLACE/i.test(apiUrl)
  ) {
    throw new Error(
      [
        "",
        "EXPO_PUBLIC_API_URL manquant ou invalide pour un build EAS online.",
        "1. Railway → @muscle-mind/api → Settings → Networking → Generate Domain",
        "2. Colle l'URL https://….up.railway.app dans apps/mobile/eas.json",
        "   (profils preview et production → EXPO_PUBLIC_API_URL)",
        "3. Relance: pnpm --filter @muscle-mind/mobile build:apk",
        "",
      ].join("\n"),
    );
  }
}

module.exports = {
  expo: {
    ...appJson.expo,
    extra: {
      ...(appJson.expo.extra ?? {}),
      apiUrl,
      offline,
    },
  },
};
