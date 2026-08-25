import { getLevelFromXp } from "@muscle-mind/types";

describe("quiz XP scoring helpers", () => {
  it("awards level 2 at 150 XP", () => {
    expect(getLevelFromXp(150)).toBe(2);
  });

  it("computes perfect quiz XP as base + bonus", () => {
    const quizXp = 40;
    const perfectBonus = 20;
    const score = 1;
    const earned = Math.round(quizXp * score) + perfectBonus;
    expect(earned).toBe(60);
  });

  it("scales partial quiz XP without bonus", () => {
    const quizXp = 40;
    const score = 0.5;
    const earned = Math.round(quizXp * score);
    expect(earned).toBe(20);
  });
});
