import { mockUser, User } from "@app-domain/entities/index.js";
import { CryptoService } from "@app-domain/services/crypto-service.js";
import { MockedBaseService, MockedCryptoService, UserService } from "@app-domain/services/index.js";
import { runUnsafe } from "@app-domain/utils/run-unsafe.js";
import { describe, expect, test } from "vitest";
import { LoginUseCase } from "./login.js";


describe("Login UseCase", async () => {
  const cryptoService: CryptoService = new MockedCryptoService();
  const testPassword = "";
  const testUser = await mockUser(cryptoService, {
    hashedPassword: await runUnsafe(cryptoService.hash(testPassword)),
  });
  const userService: UserService = new MockedBaseService<User>([
    { ...testUser },
  ]);

  test("Given a valid payload and an existing user, should return a valid JWT", async () => {
    const useCase = new LoginUseCase(userService, cryptoService);
    const result = await useCase.execute({
      email: testUser.email,
      password: testPassword,
    });

    if (result instanceof Error) throw result;

    expect(result).toBeTypeOf("string");
    const [first, second, third] = result.split(".");
    expect(first).toBeTypeOf("string");
    expect(second).toBeTypeOf("string");
    expect(third).toBeTypeOf("string");
  });
});
