import { TaggedError } from "@app-domain/types/tagged-error.js";


export class UnexpectedError extends TaggedError<"UnexpectedError"> {
  constructor(message?: string) {
    super("UnexpectedError", message);
  }
}
