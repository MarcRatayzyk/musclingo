export type { LessonMascotHooks, MascotLine, MascotPose } from "./types";
export { MASCOT_NAME } from "./types";
export {
  getInterjectionAfterChunk,
  getLessonHooks,
  useAnatomyMascotEnabled,
} from "./anatomie";
export { MASCOT_POSE_CYCLE, nextMascotPose, mascotKindFromCategorySlug } from "./assets";
export { getAnatomyPathIllustrationAtLesson } from "./anatomy-path-images";
export { getNutritionPathIllustrationAtLesson } from "./nutrition-path-images";
export {
  getLessonLayoutMetrics,
  type LessonLayoutMetrics,
} from "./lessonLayout";
export { GorillaAvatar, quizResultMascotSource } from "./components/GorillaAvatar";
export { MascotSpeechBubble } from "./components/MascotSpeechBubble";
export { MascotAside } from "./components/MascotAside";
