import { TaggedError } from "@app-domain/types/tagged-error.js";


export class UnauthorizedError extends TaggedError<"UnauthorizedError"> {
  constructor() {
    super("UnauthorizedError");
  }
}
