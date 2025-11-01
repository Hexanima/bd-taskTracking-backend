import { TaggedError } from "@app-domain/types/tagged-error";

export class UnauthorizedError extends TaggedError<"UnauthorizedError"> {
  constructor() {
    super("UnauthorizedError");
  }
}
