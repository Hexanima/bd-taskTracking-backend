import { NotFoundError, UnauthorizedError } from "@app-domain/errors";
import { AsyncResult, Email, UseCase } from "../../types";
import { JWT } from "../../types/jwt";
import { CryptoService, UserService } from "@app-domain/services";
import { isError } from "@app-domain/utils";

export interface LoginPayload {
  email: Email;
  password: string;
}

export class LoginUseCase
  implements UseCase<JWT, NotFoundError | UnauthorizedError>
{
  constructor(
    private userService: UserService,
    private cryptoService: CryptoService
  ) {}
  async execute({ email, password }: LoginPayload) {
    const user = await this.userService.findOne({
      filters: { email: email },
    });
    if (isError(user)) return user;

    const isValidPassword = await this.cryptoService.compareHashes(
      user.hashedPassword,
      password
    );

    if (isError(isValidPassword) || !isValidPassword)
      return new UnauthorizedError();

    return await this.cryptoService.generateJWT(user);
  }
}
