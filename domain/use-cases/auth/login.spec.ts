import { describe, expect, test } from "vitest";
import { LoginUseCase } from "./login";

describe("Login UseCase", async () => {
  test("Given a valid payload and an existing user, should return a valid JWT", async () => {
    const useCase = new LoginUseCase();
    const result = await useCase.execute({
      email: "valid@email.com",
      password: "password",
    });

    if (result instanceof Error) throw result;

    expect(result).toBeTypeOf("string");
    const [first, second, third] = result.split(".");
    expect(first).toBeTypeOf("string");
    expect(second).toBeTypeOf("string");
    expect(third).toBeTypeOf("string");
  });
});
