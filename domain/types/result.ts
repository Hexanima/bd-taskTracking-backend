import { UnexpectedError } from "@domain/errors/unexpected-error";
import { TaggedError } from "./tagged-error";

export type Result<
  TResult extends any = any,
  TErrors extends TaggedError = UnexpectedError
> = TResult | TErrors;

export type AsyncResult<
  TResult extends any = any,
  TErrors extends TaggedError = UnexpectedError
> = Promise<Result<TResult, TErrors>>;
