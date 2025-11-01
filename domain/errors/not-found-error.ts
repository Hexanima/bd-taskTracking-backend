import { TaggedError } from "@app-domain/types";

export class NotFoundError extends TaggedError<"NotFoundError"> {
  constructor() {
    super("NotFoundError");
  }
}
