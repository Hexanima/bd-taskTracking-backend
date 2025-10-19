import { BaseEntity, Email } from "../types";

export interface User extends BaseEntity {
  email: Email;
  hashedPassword: string;
}
