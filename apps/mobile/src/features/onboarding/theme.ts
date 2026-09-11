/**
 * Muscle Mind — identité onboarding « Briefing salle »
 *
 * Sujet : coach scientifique + mascotte Gorille.
 * Vernaculaire : sol caoutchouc de salle, craie au tableau, cuivre d’haltère,
 * signal « live » mint (pas un dégradé SaaS).
 */

export const onboardingColors = {
  /** Sol graphite — salle la nuit */
  ink: "#0A0F14",
  /** Panneau caoutchouc */
  rubber: "#121A22",
  /** Surface relevée */
  plate: "#1A2430",
  /** Liserés / joints */
  seam: "#2A3848",
  /** Texte principal — craie */
  chalk: "#E9E4DA",
  /** Texte secondaire */
  mist: "#8A96A6",
  /** Signal live / CTA */
  pulse: "#7CFFB2",
  /** Texte sur pulse */
  onPulse: "#0A0F14",
  /** Récompenses / streak */
  copper: "#D4894A",
  /** Erreur actionnable */
  strain: "#E85D6C",
  /** Voile sur pulse sélectionné */
  pulseWash: "rgba(124, 255, 178, 0.12)",
  copperWash: "rgba(212, 137, 74, 0.16)",
  strainWash: "rgba(232, 93, 108, 0.12)",
} as const;

export const onboardingFonts = {
  display: "Syne_700Bold",
  displayExtra: "Syne_800ExtraBold",
  body: "Manrope_400Regular",
  bodyMedium: "Manrope_500Medium",
  bodySemi: "Manrope_600SemiBold",
  bodyBold: "Manrope_700Bold",
} as const;

/** Échelle type — rôles explicites */
export const onboardingType = {
  brand: {
    fontFamily: onboardingFonts.bodyBold,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.4,
    color: onboardingColors.chalk,
  },
  hero: {
    fontFamily: onboardingFonts.bodyBold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.3,
    color: onboardingColors.chalk,
  },
  title: {
    fontFamily: onboardingFonts.bodyBold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
    color: onboardingColors.chalk,
  },
  body: {
    fontFamily: onboardingFonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: onboardingColors.chalk,
  },
  bodyMuted: {
    fontFamily: onboardingFonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: onboardingColors.mist,
  },
  label: {
    fontFamily: onboardingFonts.bodySemi,
    fontSize: 15,
    lineHeight: 20,
    color: onboardingColors.chalk,
  },
  meta: {
    fontFamily: onboardingFonts.bodyMedium,
    fontSize: 13,
    lineHeight: 18,
    color: onboardingColors.mist,
  },
  cta: {
    fontFamily: onboardingFonts.bodyBold,
    fontSize: 16,
    lineHeight: 20,
    color: onboardingColors.onPulse,
  },
  ghost: {
    fontFamily: onboardingFonts.bodySemi,
    fontSize: 15,
    lineHeight: 20,
    color: onboardingColors.mist,
  },
} as const;

/** Spacing 4-base */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  huge: 48,
} as const;

export const radius = {
  control: 14,
  tile: 18,
  panel: 22,
  pill: 999,
} as const;

export const motion = {
  enter: 280,
  press: { damping: 16, stiffness: 300 },
  release: { damping: 14, stiffness: 260 },
  progress: 340,
  reveal: 420,
} as const;
