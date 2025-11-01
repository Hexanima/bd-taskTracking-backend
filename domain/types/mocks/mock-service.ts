import { AlreadyExistsError, NotFoundError } from "@app-domain/errors";
import { BaseEntity } from "../entity";
import { AsyncResult } from "../result";
import { BaseService, UpdateFilterOptions } from "../service";
import { UUID } from "../uuid";

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

  async update(entity: UpdateFilterOptions<TEntity>): AsyncResult<void> {
  }
}
