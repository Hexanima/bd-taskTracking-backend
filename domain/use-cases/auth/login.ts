import { NotFoundError } from "@domain/errors";
import { Email, UseCase } from "../../types";
import { JWT } from "../../types/jwt";

export interface LoginPayload {
  email: Email;
  password: string;
}

export class LoginUseCase implements UseCase<JWT, NotFoundError> {
  constructor(private db: Record<string, string>) {}
  async execute({ email, password }: LoginPayload) {
    const existingPassword = this.db[email];
    if (!existingPassword || existingPassword !== password)
      return new NotFoundError();

    const result: JWT = `${email}.${email}.${email}`;

    return result;
  }
}
