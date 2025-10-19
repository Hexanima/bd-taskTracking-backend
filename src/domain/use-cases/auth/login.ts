import { Email, UseCase } from "../../types";
import { JWT } from "../../types/jwt";

export interface LoginPayload {
  email: Email;
  password: string;
}

export class LoginUseCase implements UseCase<JWT, Error> {
  async execute({ email, password }: LoginPayload) {
    const result: JWT = `${email}.${email}.${email}`;
    if (password === "") return new Error();
    return result;
  }
}
