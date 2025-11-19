import { UnexpectedError } from "@app-domain/errors/unexpected-error.js";
import { TaggedError } from "./tagged-error.js";

export type Result<
  TResult extends any = any,
  TErrors extends TaggedError = UnexpectedError
> = TResult | TErrors | UnexpectedError;

export type AsyncResult<
  TResult extends any = any,
  TErrors extends TaggedError = UnexpectedError
> = Promise<Result<TResult, TErrors>>;
