export function unitKeyFromLessonScroll(
  units: Array<{
    checkpointKey: string;
    lessons: Array<{ id: string }>;
  }>,
  lessonLayouts: Record<string, { y: number; height: number }>,
  scrollY: number,
  viewportOffset = 96,
): string | null {
  let active: string | null = units[0]?.checkpointKey ?? null;

  for (const unit of units) {
    for (const lesson of unit.lessons) {
      const layout = lessonLayouts[lesson.id];
      if (layout == null) continue;
      if (layout.y <= scrollY + viewportOffset) {
        active = unit.checkpointKey;
      }
    }
  }

  return active;
}
