import { isPoolAnswerCorrect } from "./pool-score";

describe("isPoolAnswerCorrect", () => {
  it("scores SINGLE / TRUE_FALSE by single id", () => {
    expect(isPoolAnswerCorrect("SINGLE", ["a"], "a")).toBe(true);
    expect(isPoolAnswerCorrect("TRUE_FALSE", ["b"], "a")).toBe(false);
    expect(isPoolAnswerCorrect("SINGLE", ["a", "b"], "a")).toBe(false);
  });

  it("scores MULTI by sorted set", () => {
    expect(isPoolAnswerCorrect("MULTI", ["b", "a"], "a|b")).toBe(true);
    expect(isPoolAnswerCorrect("MULTI", ["a"], "a|b")).toBe(false);
    expect(isPoolAnswerCorrect("MULTI", ["a", "b", "c"], "a|b")).toBe(false);
  });

  it("scores ORDER and MATCH by sequence", () => {
    expect(isPoolAnswerCorrect("ORDER", ["a", "b", "c"], "a|b|c")).toBe(true);
    expect(isPoolAnswerCorrect("ORDER", ["c", "b", "a"], "a|b|c")).toBe(false);
    expect(isPoolAnswerCorrect("MATCH", ["r1", "r2"], "r1|r2")).toBe(true);
  });
});
