import { mmkv } from "@/shared/storage/mmkv";

const CLAIM_DISMISSED_KEY = "claim_prompt_dismissed_v1";

export function isClaimPromptDismissed(): boolean {
  return mmkv.getString(CLAIM_DISMISSED_KEY) === "1";
}

export function dismissClaimPrompt(): void {
  mmkv.set(CLAIM_DISMISSED_KEY, "1");
}

export function shouldShowClaimGate(isGuest: boolean): boolean {
  if (!isGuest) return false;
  if (isClaimPromptDismissed()) return false;
  return true;
}
