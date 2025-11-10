import { UUID } from "./uuid.js";

export interface BaseEntity {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
