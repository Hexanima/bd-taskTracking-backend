import { UnexpectedError } from "@domain/errors/unexpected-error";
import { TaggedError } from "./tagged-error";
import { AsyncResult } from "./result";

export interface UseCase<
  TResponse = any,
  TErrors extends TaggedError = UnexpectedError
> {
  execute: (payload: any) => AsyncResult<TResponse, TErrors>;
}
