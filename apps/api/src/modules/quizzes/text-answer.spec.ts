import {
  isTextAnswerCorrect,
  normalizeTextAnswer,
} from "@muscle-mind/types";

describe("text answer normalization", () => {
  it("strips accents and case", () => {
    expect(normalizeTextAnswer("Fémur")).toBe("femur");
    expect(normalizeTextAnswer("  Vertèbres thoraciques ")).toBe(
      "vertebres thoraciques",
    );
  });

  it("accepts aliases for legend answers", () => {
    expect(isTextAnswerCorrect("rotule", "patella", ["rotule"])).toBe(true);
    expect(isTextAnswerCorrect("péroné", "fibula", ["péroné", "perone"])).toBe(
      true,
    );
    expect(isTextAnswerCorrect("tibia", "fémur", [])).toBe(false);
  });
});
