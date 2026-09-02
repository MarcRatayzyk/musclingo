export type MascotPose = "present" | "doubt" | "default";

export type MascotLine = {
  text: string;
  pose?: MascotPose;
};

export type LessonMascotHooks = {
  intro?: MascotLine;
  outro?: MascotLine;
  /** Shown after chunk N completes, before chunk N+1 */
  interjections?: Record<number, MascotLine>;
};

export const MASCOT_NAME = "Gorille";
