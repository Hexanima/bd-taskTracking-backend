import { CryptoService } from "@app-domain/services";
import { User } from "../user";
import { runUnsafe } from "@domain/utils";

export async function mockUser(
  crypto: CryptoService,
  opts: Partial<User>
): Promise<User> {
  return {
    id: await runUnsafe(crypto.generateUUID()),
    email: "email@email.com",
    fullName: "A user's fullName",
    hashedPassword: await runUnsafe(crypto.hash("A password")),
    nickName: "A nickName",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...opts,
  };
}
