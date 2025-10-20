import { TaggedError } from "@domain/types/tagged-error";

export class NotFoundError extends TaggedError<"NotFoundError"> {
  constructor() {
    super("NotFoundError");
  }
}
