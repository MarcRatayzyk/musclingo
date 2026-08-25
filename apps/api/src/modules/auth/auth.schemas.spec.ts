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
  it("requires answers array", () => {
    const parsed = SubmitQuizSchema.parse({
      answers: [
        {
          questionId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
          selectedAnswerIds: ["claaaaaaaaaaaaaaaaaaaaaaaa"],
        },
      ],
    });
    expect(parsed.answers).toHaveLength(1);
  });
});
