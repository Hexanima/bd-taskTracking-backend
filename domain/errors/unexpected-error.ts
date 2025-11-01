import { TaggedError } from "@app-domain/types/tagged-error";

export class UnexpectedError extends TaggedError<"UnexpectedError"> {
  constructor(message?: string) {
    super("UnexpectedError", message);
  }
}
