import type { CancelReason, SaveOffer } from "./types";
import { i18n } from "@/i18n";

export type OfferBundle = {
  primary: SaveOffer;
  fallback?: SaveOffer;
};

function buildOffers(): Record<CancelReason, OfferBundle> {
  return {
    too_expensive: {
      primary: {
        kind: "discount",
        title: i18n.t("retention:offers.too_expensive.primary.title"),
        body: i18n.t("retention:offers.too_expensive.primary.body"),
        ctaLabel: i18n.t("retention:offers.too_expensive.primary.cta"),
        discountPercent: 25,
        months: 2,
      },
      fallback: {
        kind: "downgrade",
        title: i18n.t("retention:offers.too_expensive.fallback.title"),
        body: i18n.t("retention:offers.too_expensive.fallback.body"),
        ctaLabel: i18n.t("retention:offers.too_expensive.fallback.cta"),
        targetPlanId: "sub-boost",
      },
    },
    not_using: {
      primary: {
        kind: "pause",
        title: i18n.t("retention:offers.not_using.primary.title"),
        body: i18n.t("retention:offers.not_using.primary.body"),
        ctaLabel: i18n.t("retention:offers.not_using.primary.cta"),
        months: 1,
      },
      fallback: {
        kind: "value_reminder",
        title: i18n.t("retention:offers.not_using.fallback.title"),
        body: i18n.t("retention:offers.not_using.fallback.body"),
        ctaLabel: i18n.t("retention:offers.not_using.fallback.cta"),
      },
    },
    missing_feature: {
      primary: {
        kind: "roadmap",
        title: i18n.t("retention:offers.missing_feature.primary.title"),
        body: i18n.t("retention:offers.missing_feature.primary.body"),
        ctaLabel: i18n.t("retention:offers.missing_feature.primary.cta"),
      },
    },
    competitor: {
      primary: {
        kind: "value_reminder",
        title: i18n.t("retention:offers.competitor.primary.title"),
        body: i18n.t("retention:offers.competitor.primary.body"),
        ctaLabel: i18n.t("retention:offers.competitor.primary.cta"),
      },
      fallback: {
        kind: "discount",
        title: i18n.t("retention:offers.competitor.fallback.title"),
        body: i18n.t("retention:offers.competitor.fallback.body"),
        ctaLabel: i18n.t("retention:offers.competitor.fallback.cta"),
        discountPercent: 20,
        months: 1,
      },
    },
    bugs: {
      primary: {
        kind: "support",
        title: i18n.t("retention:offers.bugs.primary.title"),
        body: i18n.t("retention:offers.bugs.primary.body"),
        ctaLabel: i18n.t("retention:offers.bugs.primary.cta"),
      },
    },
    temporary: {
      primary: {
        kind: "pause",
        title: i18n.t("retention:offers.temporary.primary.title"),
        body: i18n.t("retention:offers.temporary.primary.body"),
        ctaLabel: i18n.t("retention:offers.temporary.primary.cta"),
        months: 2,
      },
    },
    other: {
      primary: {
        kind: "pause",
        title: i18n.t("retention:offers.other.primary.title"),
        body: i18n.t("retention:offers.other.primary.body"),
        ctaLabel: i18n.t("retention:offers.other.primary.cta"),
        months: 1,
      },
    },
  };
}

export function getOffersForReason(reason: CancelReason): OfferBundle {
  return buildOffers()[reason];
}
