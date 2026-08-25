import { ANALYTICS_EVENTS, type AnalyticsEvent } from "@muscle-mind/types";

type Properties = Record<string, string | number | boolean | null | undefined>;

let identified = false;

export const analytics = {
  events: ANALYTICS_EVENTS,

  capture(event: AnalyticsEvent | string, properties?: Properties) {
    if (__DEV__) {
      console.log(`[posthog] ${event}`, properties ?? {});
    }
    // PostHog native client is initialized in providers when key is present.
    const client = (globalThis as { __posthog?: { capture: Function } })
      .__posthog;
    client?.capture(event, properties);
  },

  identify(userId: string, traits?: Properties) {
    identified = true;
    const client = (globalThis as { __posthog?: { identify: Function } })
      .__posthog;
    client?.identify(userId, traits);
    if (__DEV__) console.log("[posthog] identify", userId, traits);
  },

  reset() {
    identified = false;
    const client = (globalThis as { __posthog?: { reset: Function } })
      .__posthog;
    client?.reset();
  },

  isIdentified: () => identified,
};
