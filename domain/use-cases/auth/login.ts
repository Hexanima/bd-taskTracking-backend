import { UnauthorizedError } from "@app-domain/errors/unauthorized-error.js";
import { CryptoService } from "@app-domain/services/crypto-service.js";
import { UserService } from "@app-domain/services/user-service.js";
import { Email } from "@app-domain/types/email.js";
import { JWT } from "@app-domain/types/jwt.js";
import { UseCase } from "@app-domain/types/use-case.js";
import { isError } from "@app-domain/utils/is-error.js";

export interface LoginPayload {
  email: Email;
  password: string;
}

export class LoginUseCase implements UseCase<JWT, UnauthorizedError> {
  constructor(
    private userService: UserService,
    private cryptoService: CryptoService
  ) {}
  async execute({ email, password }: LoginPayload) {
    const user = await this.userService.findOne({
      filters: { email: email },
    });
    if (isError(user)) return new UnauthorizedError();

    const isValidPassword = await this.cryptoService.compareHashes(
      user.hashedPassword,
      password
    );

    if (isError(isValidPassword) || !isValidPassword)
      return new UnauthorizedError();

    return await this.cryptoService.generateJWT(user);
  }
}
