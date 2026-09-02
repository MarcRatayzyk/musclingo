import { mmkv } from "@/shared/storage/mmkv";

const ANATOMY_ONBOARDING_KEY = "anatomy_path_onboarding_v1";

export function hasSeenAnatomyOnboarding(): boolean {
  return mmkv.getString(ANATOMY_ONBOARDING_KEY) === "1";
}

export function markAnatomyOnboardingSeen(): void {
  mmkv.set(ANATOMY_ONBOARDING_KEY, "1");
}
