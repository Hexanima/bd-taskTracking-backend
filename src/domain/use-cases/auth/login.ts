import { Email, UseCase } from "../../types";

export interface LoginPayload {
  email: Email;
  password: string;
}

export class LoginUseCase implements UseCase<string, never> {
  async execute({ email }: LoginPayload) {
    return email;
  }
}
