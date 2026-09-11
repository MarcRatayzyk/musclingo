export type PlanId = "sub-genius" | "sub-boost";

export type CancelReason =
  | "too_expensive"
  | "not_using"
  | "missing_feature"
  | "competitor"
  | "bugs"
  | "temporary"
  | "other";

export type SaveOfferKind =
  | "discount"
  | "pause"
  | "downgrade"
  | "roadmap"
  | "support"
  | "value_reminder";

export type SaveOffer = {
  kind: SaveOfferKind;
  title: string;
  body: string;
  ctaLabel: string;
  /** Discount percent when kind === discount */
  discountPercent?: number;
  /** Months for discount or pause */
  months?: number;
  /** Downgrade target plan */
  targetPlanId?: PlanId;
};

export type RetentionState = {
  isPremiumDemo: boolean;
  planId: PlanId | null;
  pausedUntil: string | null;
  discountEndsAt: string | null;
  discountPercent: number | null;
  cancelReason: CancelReason | null;
  cancelledAt: string | null;
  /** ISO dates of lesson completions (kept ~30 days) */
  lessonCompletions: string[];
  lastAppOpenAt: string | null;
  lastHealthScore: number | null;
  lastHealthScoreAt: string | null;
  /** nudgeId → ISO last shown */
  nudgeShownAt: Record<string, string>;
};

export type HealthBand = "healthy" | "attention" | "at_risk" | "critical";

export type HealthResult = {
  score: number;
  band: HealthBand;
  label: string;
};

export const CANCEL_REASON_OPTIONS: Array<{
  id: CancelReason;
  label: string;
}> = [
  { id: "too_expensive", label: "Trop cher" },
  { id: "not_using", label: "Pas assez utilisé" },
  { id: "missing_feature", label: "Il me manque une fonctionnalité" },
  { id: "competitor", label: "Je passe à un autre outil" },
  { id: "bugs", label: "Problèmes techniques / bugs" },
  { id: "temporary", label: "Besoin temporaire / pause" },
  { id: "other", label: "Autre" },
];

export const INITIAL_RETENTION_STATE: RetentionState = {
  isPremiumDemo: false,
  planId: null,
  pausedUntil: null,
  discountEndsAt: null,
  discountPercent: null,
  cancelReason: null,
  cancelledAt: null,
  lessonCompletions: [],
  lastAppOpenAt: null,
  lastHealthScore: null,
  lastHealthScoreAt: null,
  nudgeShownAt: {},
};
