import { BaseEntity } from "./entity";
import { AsyncResult } from "./result";
import { UUID } from "./uuid";

export interface BaseService<TEntity extends BaseEntity> {
  create: (entity: TEntity) => AsyncResult<void>;
  update: (entity: Partial<TEntity>) => AsyncResult<void>;
  delete: (id: UUID) => AsyncResult<void>;
}
