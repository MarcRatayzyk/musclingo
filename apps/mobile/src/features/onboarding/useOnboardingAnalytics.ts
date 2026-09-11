import { useEffect, useRef } from "react";
import { analytics } from "@/shared/analytics/posthog";
import { ONBOARDING_SCREEN_IDS, type OnboardingStepId } from "./types";

export function useOnboardingScreenTracking(stepId: OnboardingStepId) {
  const started = useRef(false);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      analytics.capture(analytics.events.ONBOARDING_STARTED);
    }
  }, []);

  useEffect(() => {
    const screenId = ONBOARDING_SCREEN_IDS[stepId];
    analytics.capture(analytics.events.ONBOARDING_SCREEN_VIEWED, {
      screen_id: screenId,
      step_id: stepId,
    });
    if (stepId === "value") {
      analytics.capture(analytics.events.VALUE_MOMENT_REACHED, {
        screen_id: screenId,
      });
    }
    if (stepId === "paywall") {
      analytics.capture(analytics.events.PAYWALL_VIEWED, {
        screen_id: screenId,
      });
    }
  }, [stepId]);
}

export function trackOnboardingQuestionAnswered(
  question: string,
  answer: string,
) {
  analytics.capture(analytics.events.ONBOARDING_QUESTION_ANSWERED, {
    screen_id: "onboarding_personalization_01",
    question,
    answer,
  });
}

export function trackOnboardingCompleted(path: string) {
  analytics.capture(analytics.events.ONBOARDING_COMPLETED, { path });
}

export function trackPaywallCta(cta: "subscribe" | "continue_free") {
  analytics.capture(analytics.events.PAYWALL_CTA_CLICKED, {
    screen_id: "paywall_01",
    cta,
  });
}

export function trackSubscriptionStarted(planId: string) {
  analytics.capture(analytics.events.SUBSCRIPTION_STARTED, {
    planId,
    source: "onboarding_paywall",
  });
  analytics.capture(analytics.events.PREMIUM_SUBSCRIBED, {
    planId,
    source: "onboarding_paywall",
  });
}
