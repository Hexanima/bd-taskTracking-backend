import { CryptoService } from "@app-domain/services/crypto-service.js";
import { User } from "../user.js";
import { runUnsafe } from "@app-domain/utils/run-unsafe.js";


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
