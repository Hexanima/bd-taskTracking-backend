import { TaggedError } from "./tagged-error";
import { AsyncResult } from "./result";
import { UnexpectedError } from "@app-domain/errors";

export interface UseCase<
  TResponse = any,
  TErrors extends TaggedError = UnexpectedError
> {
  execute: (payload: any) => AsyncResult<TResponse, TErrors | UnexpectedError>;
}
