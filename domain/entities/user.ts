import { Email } from "@app-domain/types/email.js";
import { BaseEntity } from "@app-domain/types/entity.js";

export interface User extends BaseEntity {
  email: Email;
  hashedPassword: string;
  nickName: string;
  fullName: string;
}
