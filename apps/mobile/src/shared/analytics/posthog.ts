import { ANALYTICS_EVENTS, type AnalyticsEvent } from "@muscle-mind/types";

type Properties = Record<string, string | number | boolean | null | undefined>;

let identified = false;
let distinctId = "anon";

export const analytics = {
  events: ANALYTICS_EVENTS,

  capture(event: AnalyticsEvent | string, properties?: Properties) {
    if (__DEV__) {
      console.log(`[posthog] ${event}`, properties ?? {});
    }
    const client = (globalThis as { __posthog?: { capture: Function } })
      .__posthog;
    client?.capture(event, { ...properties, distinct_id: distinctId });
  },

  identify(userId: string, traits?: Properties) {
    identified = true;
    distinctId = userId;
    const client = (globalThis as { __posthog?: { identify: Function } })
      .__posthog;
    client?.identify(userId, traits);
    if (__DEV__) console.log("[posthog] identify", userId, traits);
  },

  reset() {
    identified = false;
    distinctId = "anon";
    const client = (globalThis as { __posthog?: { reset: Function } })
      .__posthog;
    client?.reset();
  },

  isIdentified: () => identified,

  getDistinctId: () => distinctId,
};
