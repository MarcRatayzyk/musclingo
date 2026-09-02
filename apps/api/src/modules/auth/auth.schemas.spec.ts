import {
  LoginSchema,
  RegisterSchema,
  SubmitQuizSchema,
} from "@muscle-mind/types";

describe("auth schemas", () => {
  it("accepts valid register payload", () => {
    const parsed = RegisterSchema.parse({
      email: "user@example.com",
      password: "password1",
      displayName: "Quentin",
    });
    expect(parsed.displayName).toBe("Quentin");
  });

  it("rejects short password", () => {
    expect(() =>
      RegisterSchema.parse({
        email: "user@example.com",
        password: "short",
        displayName: "Quentin",
      }),
    ).toThrow();
  });

  it("accepts login payload", () => {
    expect(
      LoginSchema.parse({ email: "a@b.co", password: "x" }).email,
    ).toBe("a@b.co");
  });
});

describe("quiz submit schema", () => {
  it("requires session, 10 timed answers and total time", () => {
    const answers = Array.from({ length: 10 }, (_, i) => ({
      questionId: `mini:q${i}`,
      selectedAnswerIds: [`a${i}`],
      timeSpentSec: 30,
    }));
    const parsed = SubmitQuizSchema.parse({
      sessionId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
      answers,
      totalTimeSpentSec: 45,
    });
    expect(parsed.answers).toHaveLength(10);
  });
});
