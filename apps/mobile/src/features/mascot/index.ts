export type { LessonMascotHooks, MascotLine, MascotPose } from "./types";
export { MASCOT_NAME } from "./types";
export {
  getInterjectionAfterChunk,
  getLessonHooks,
  ONBOARDING_STEPS,
  useAnatomyMascotEnabled,
} from "./anatomie";
export { hasSeenAnatomyOnboarding, markAnatomyOnboardingSeen } from "./storage";
export { MASCOT_POSE_CYCLE, nextMascotPose } from "./assets";
export { getAnatomyPathIllustrationAtLesson } from "./anatomy-path-images";
export { GorillaAvatar } from "./components/GorillaAvatar";
export { MascotSpeechBubble } from "./components/MascotSpeechBubble";
export { MascotAside } from "./components/MascotAside";
export { AnatomyPathOnboarding } from "./components/AnatomyPathOnboarding";
