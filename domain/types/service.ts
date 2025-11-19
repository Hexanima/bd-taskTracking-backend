import { AlreadyExistsError, NotFoundError } from "@app-domain/errors";
import { BaseEntity } from "./entity";
import { AsyncResult } from "./result";
import { UUID } from "./uuid";

export type EntityFilterOptionsOrdering<T extends BaseEntity> = [
  keyof T,
  "ASC" | "DESC"
];

export interface OneFilterOptions<T extends BaseEntity> {
  filters?: Partial<T> | Partial<T>[];
  includeDeleted?: boolean;
  order?: EntityFilterOptionsOrdering<T>[];
  skip?: number;
}

export interface ManyFilterOptions<T extends BaseEntity>
  extends OneFilterOptions<T> {
  limit?: number;
}
export interface UpdateFilterOptions<T extends BaseEntity>
  extends ManyFilterOptions<T> {
  updatedData: Partial<T>;
}

export interface ManyEntityResult<T extends BaseEntity> {
  /**
   * Used for pagination
   */
  totalCount: number;

  /**
   * Items results
   */
  data: T[];
}

export interface BaseService<TEntity extends BaseEntity> {
  create: (entity: TEntity) => AsyncResult<void, AlreadyExistsError>;

  /**
   * TODO: Plantear tema de opciones (capaz usar el manyFilterOptions)
   */
  update: (entity: UpdateFilterOptions<TEntity>) => AsyncResult<number>;
  deleteById: (id: UUID) => AsyncResult<void, NotFoundError>;
  restoreById: (id: UUID) => AsyncResult<void, NotFoundError>;
  delete: (opts: ManyFilterOptions<TEntity>) => AsyncResult<number>;
  restore: (
    opts: ManyFilterOptions<TEntity>
  ) => AsyncResult<void, NotFoundError>;
  findById: (id: UUID) => AsyncResult<TEntity, NotFoundError>;
  findOne: (
    opts?: OneFilterOptions<TEntity>
  ) => AsyncResult<TEntity, NotFoundError>;
  findMany: (
    opts?: ManyFilterOptions<TEntity>
  ) => AsyncResult<ManyEntityResult<TEntity>>;
}
