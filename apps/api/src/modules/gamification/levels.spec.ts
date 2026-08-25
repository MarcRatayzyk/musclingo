import { getLevelFromXp, getXpProgress } from "@muscle-mind/types";

describe("XP level curve", () => {
  it("maps thresholds correctly", () => {
    expect(getLevelFromXp(0)).toBe(1);
    expect(getLevelFromXp(149)).toBe(1);
    expect(getLevelFromXp(150)).toBe(2);
    expect(getLevelFromXp(400)).toBe(3);
  });

  it("computes progress between levels", () => {
    const p = getXpProgress(275);
    expect(p.level).toBe(2);
    expect(p.currentLevelXp).toBe(150);
    expect(p.nextLevelXp).toBe(400);
    expect(p.progress).toBeCloseTo(0.5, 2);
  });
});
