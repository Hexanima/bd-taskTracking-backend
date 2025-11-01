import { UUID } from "./uuid";

export interface BaseEntity {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
