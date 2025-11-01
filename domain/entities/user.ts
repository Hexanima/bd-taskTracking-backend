import { BaseEntity, Email } from "@app-domain/types";

export interface User extends BaseEntity {
  email: Email;
  hashedPassword: string;
  nickName: string;
  fullName: string;
}
