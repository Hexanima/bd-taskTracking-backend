import { UnexpectedError } from "@app-domain/errors/unexpected-error.js";
import { TaggedError } from "./tagged-error.js";
import { AsyncResult } from "./result.js";

export interface UseCase<
  TResponse = any,
  TErrors extends TaggedError = UnexpectedError
> {
  execute: (payload: any) => AsyncResult<TResponse, TErrors | UnexpectedError>;
}
