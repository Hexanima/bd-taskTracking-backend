import { TaggedError } from "@app-domain/types/tagged-error.js";


export class AlreadyExistsError extends TaggedError<"AlreadyExistsError"> {
  constructor() {
    super("AlreadyExistsError");
  }
}
