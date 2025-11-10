import { AsyncResult } from "@app-domain/types/result.js";
import { isError } from "./is-error.js";


export async function runUnsafe<T>(unsafe: AsyncResult<T>): Promise<T> {
  const result = await unsafe;
  if (isError(result)) throw result;
  return result;
}
