import { AsyncResult } from "@domain/types";
import { isError } from "./is-error";

export async function runUnsafe<T>(unsafe: AsyncResult<T>): Promise<T> {
  const result = await unsafe;
  if (isError(result)) throw result;
  return result;
}
