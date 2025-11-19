import { TaggedError } from "@app-domain/types/tagged-error.js";


export class NotFoundError extends TaggedError<"NotFoundError"> {
  constructor() {
    super("NotFoundError");
  }
}
