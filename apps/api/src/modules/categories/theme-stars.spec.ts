import {
  maxStarsForTheme,
  requiredStarsForTheme,
} from "@muscle-mind/types";

describe("requiredStarsForTheme", () => {
  it("requires 8 of 12 for a 4-lesson theme", () => {
    expect(maxStarsForTheme(4)).toBe(12);
    expect(requiredStarsForTheme(4)).toBe(8);
  });

  it("scales with lesson count", () => {
    expect(requiredStarsForTheme(5)).toBe(10);
    expect(requiredStarsForTheme(0)).toBe(0);
  });
});
