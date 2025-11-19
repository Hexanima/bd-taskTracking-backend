import { TaggedError } from "@app-domain/types/tagged-error.js";


export function isError(thing: unknown): thing is TaggedError {
  return thing instanceof TaggedError;
}
