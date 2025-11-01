import { UnexpectedError } from "@app-domain/errors";
import { TaggedError } from "./tagged-error";

export type Result<
  TResult extends any = any,
  TErrors extends TaggedError = UnexpectedError
> = TResult | TErrors | UnexpectedError;

export type AsyncResult<
  TResult extends any = any,
  TErrors extends TaggedError = UnexpectedError
> = Promise<Result<TResult, TErrors>>;
