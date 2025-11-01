import { BaseEntity, Email } from "@domain/types";

export interface User extends BaseEntity {
  email: Email;
  hashedPassword: string;
  nickName: string;
  fullName: string;
}
