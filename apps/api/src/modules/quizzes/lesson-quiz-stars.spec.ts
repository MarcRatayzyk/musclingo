import {
  computeLessonQuizStars,
  getLessonQuizXpMultiplier,
  isLessonQuizPassed,
} from "@muscle-mind/types";

describe("lesson quiz stars", () => {
  it("returns 3 stars when total time is under 45s", () => {
    expect(computeLessonQuizStars(40)).toBe(3);
  });

  it("returns 2 stars when total time is under 52.5s", () => {
    expect(computeLessonQuizStars(50)).toBe(2);
  });

  it("returns 1 star when total time is under 60s", () => {
    expect(computeLessonQuizStars(58)).toBe(1);
  });

  it("returns 0 stars when total time exceeds 60s", () => {
    expect(computeLessonQuizStars(65)).toBe(0);
  });

  it("passes with at least 1 star", () => {
    expect(isLessonQuizPassed(1)).toBe(true);
    expect(isLessonQuizPassed(0)).toBe(false);
  });

  it("scales XP by star count", () => {
    expect(getLessonQuizXpMultiplier(3)).toBe(1);
    expect(getLessonQuizXpMultiplier(2)).toBe(0.8);
    expect(getLessonQuizXpMultiplier(1)).toBe(0.6);
    expect(getLessonQuizXpMultiplier(0)).toBe(0);
  });
});
