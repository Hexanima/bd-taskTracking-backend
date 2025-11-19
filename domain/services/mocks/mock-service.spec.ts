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

function mockTestingEntity(opts?: Partial<TestingEntity>): TestingEntity {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Prueba",
    order: 1,
    ...opts,
  };
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
        id: "b-b-b-b-b",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Prueba",
        order: 1,
      };

      const db = new MockedBaseService<TestingEntity>([mockedEntity]);

      const result = await db.deleteById("a-a-a-a-a");

      expect(result).toBeInstanceOf(NotFoundError);

      expect(db.items).toHaveLength(1);
      expect(db.items[0].id).toBe("b-b-b-b-b");
      expect(db.items[0].deletedAt).toBeFalsy();
    });
  });

  describe("Update Method", async () => {
    test("If item doesn't exist, should return 0", async () => {
      const db = new MockedBaseService<TestingEntity>([]);
      const result = await db.update({ updatedData: { name: "SARACATUNGA" } });

      expect(result).toBe(0);
    });
    test("Without filters, should update everything", async () => {
      const db = new MockedBaseService<TestingEntity>([
        mockTestingEntity({ name: "a" }),
        mockTestingEntity({ name: "b" }),
        mockTestingEntity({ name: "c" }),
      ]);
      for (const item of db.items) {
        expect(item.name).not.toBe("SARACATUNGA");
      }
      const result = await db.update({ updatedData: { name: "SARACATUNGA" } });

      expect(result).toBe(3);

      for (const item of db.items) {
        expect(item.name).toBe("SARACATUNGA");
      }
    });
    test("With a filter, should update ONLY the filtered opt", async () => {
      const db = new MockedBaseService<TestingEntity>([
        mockTestingEntity({ name: "a", id: "a-a-a-a-a" }),
        mockTestingEntity({ name: "b", id: "b-b-b-b-b" }),
        mockTestingEntity({ name: "c", id: "c-c-c-c-c" }),
      ]);
      for (const item of db.items) {
        expect(item.name).not.toBe("SARACATUNGA");
      }
      const result = await db.update({
        updatedData: { name: "SARACATUNGA" },
        filters: { name: "a" },
      });

      expect(result).toBe(1);

      for (const item of db.items) {
        if (item.id === "a-a-a-a-a") expect(item.name).toBe("SARACATUNGA");
        else expect(item.name).not.toBe("SARACATUNGA");
      }
    });
    test("With multiple filters, should update ONLY the filtered opt", async () => {
      const db = new MockedBaseService<TestingEntity>([
        mockTestingEntity({ name: "a", id: "a-a-a-a-a" }),
        mockTestingEntity({ name: "b", id: "b-b-b-b-b" }),
        mockTestingEntity({ name: "c", id: "c-c-c-c-c" }),
      ]);
      for (const item of db.items) {
        expect(item.name).not.toBe("SARACATUNGA");
      }
      const result = await db.update({
        updatedData: { name: "SARACATUNGA" },
        filters: [{ name: "a" }, { name: "b" }],
      });

      expect(result).toBe(2);

      for (const item of db.items) {
        if (item.id === "a-a-a-a-a") expect(item.name).toBe("SARACATUNGA");
        else if (item.id === "b-b-b-b-b") expect(item.name).toBe("SARACATUNGA");
        else expect(item.name).not.toBe("SARACATUNGA");
      }
    });
  });
});
