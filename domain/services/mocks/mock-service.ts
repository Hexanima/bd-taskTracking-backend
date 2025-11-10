import { AlreadyExistsError } from "@app-domain/errors/already-exists-error.js";
import { NotFoundError } from "@app-domain/errors/not-found-error.js";
import { BaseEntity } from "@app-domain/types/entity.js";
import { AsyncResult } from "@app-domain/types/result.js";
import { BaseService, ManyEntityResult, ManyFilterOptions, OneFilterOptions, UpdateFilterOptions } from "@app-domain/types/service.js";
import { UUID } from "@app-domain/types/uuid.js";


export class MockedBaseService<TEntity extends BaseEntity>
  implements BaseService<TEntity>
{
  public items: TEntity[];

  constructor(baseItems?: TEntity[]) {
    this.items = baseItems ? [...baseItems] : [];
  }

  async create(entity: TEntity): AsyncResult<void, AlreadyExistsError> {
    if (this.items.find((item) => item.id === entity.id))
      return new AlreadyExistsError();
    this.items.push(entity);
  }

  async deleteById(id: UUID): AsyncResult<void, NotFoundError> {
    if (this.items.find((item) => item.id !== id)) return new NotFoundError();
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, deletedAt: new Date() } : item
    );
  }

  async findById(id: UUID): AsyncResult<TEntity, NotFoundError> {
    const result = this.items.find((item) => item.id === id);
    if (!result) return new NotFoundError();
    return result;
  }

  async restoreById(id: UUID): AsyncResult<void, NotFoundError> {
    if (this.items.find((item) => item.id !== id)) return new NotFoundError();
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, deletedAt: null } : item
    );
  }

  // TODO: IMPLEMENT

  async update(opts: UpdateFilterOptions<TEntity>): AsyncResult<void> {}

  async delete(
    opts: ManyFilterOptions<TEntity>
  ): AsyncResult<void, NotFoundError> {}

  async findMany(
    opts?: ManyFilterOptions<TEntity> | undefined
  ): AsyncResult<ManyEntityResult<TEntity>> {}

  async findOne(
    opts?: OneFilterOptions<TEntity> | undefined
  ): AsyncResult<TEntity, NotFoundError> {}

  async restore(
    opts: ManyFilterOptions<TEntity>
  ): AsyncResult<void, NotFoundError> {}
}
