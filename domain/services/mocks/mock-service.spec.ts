import { BaseEntity } from "@app-domain/types/entity.js";
import { describe, expect, test } from "vitest";
import { MockedBaseService } from "./mock-service.js";
import { isError } from "@app-domain/utils/is-error.js";
import { AlreadyExistsError } from "@app-domain/errors/already-exists-error.js";
import { NotFoundError } from "@app-domain/errors/not-found-error.js";

interface TestingEntity extends BaseEntity {
  name: string;
  order: number;
}

describe("MockedService Tests", async () => {
  describe("Constructor", async () => {
    test("No list should create empty list", async () => {
      const db = new MockedBaseService<TestingEntity>();
      expect(db.items).toHaveLength(0);
    });
    test("Empty list should create empty list", async () => {
      const db = new MockedBaseService<TestingEntity>([]);
      expect(db.items).toHaveLength(0);
    });
    test("Not empty list should create loaded list", async () => {
      const db = new MockedBaseService<TestingEntity>([
        {
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "Prueba",
          order: 1,
        },
      ]);
      expect(db.items).toHaveLength(1);
    });
  });

  describe("Create Method", async () => {
    test("If it doesn't exists, should create it", async () => {
      const db = new MockedBaseService<TestingEntity>([]);

      const mockedEntity: TestingEntity = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Prueba",
        order: 1,
      };

      const result = await db.create(mockedEntity);

      if (isError(result)) throw result;

      expect(db.items).toHaveLength(1);
      expect(db.items[0]).toEqual({ ...mockedEntity });
    });
    test("If it already exists, should return AlreadyExistsError", async () => {
      const mockedEntity: TestingEntity = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Prueba",
        order: 1,
      };

      const db = new MockedBaseService<TestingEntity>([mockedEntity]);

      const result = await db.create(mockedEntity);

      expect(result).toBeInstanceOf(AlreadyExistsError);

      expect(db.items).toHaveLength(1);
      expect(db.items[0]).toEqual(mockedEntity);
    });
  });

  describe("DeleteById Method", async () => {
    test("If item exists, should delete it", async () => {
      const mockedEntity: TestingEntity = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Prueba",
        order: 1,
      };

      const db = new MockedBaseService<TestingEntity>([mockedEntity]);

      const result = await db.deleteById(mockedEntity.id);

      if (isError(result)) throw result;

      expect(db.items[0].deletedAt).toBeTruthy();
    });
    test("If item doesn't exists, should return NotFoundError", async () => {
      const mockedEntity: TestingEntity = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Prueba",
        order: 1,
      };

      const db = new MockedBaseService<TestingEntity>([mockedEntity]);

      const result = await db.deleteById(crypto.randomUUID());

      expect(result).toBeInstanceOf(NotFoundError);

      expect(db.items).toHaveLength(1);
      expect(db.items[0].deletedAt).toBeFalsy();
    });
  });
});
