import { TaggedError } from "@app-domain/types/tagged-error";

export class AlreadyExistsError extends TaggedError<"AlreadyExistsError"> {
  constructor() {
    super("AlreadyExistsError");
  }
}
