import { TaggedError } from "@domain/types";

export function isError(thing: unknown): thing is TaggedError {
  return thing instanceof TaggedError;
}
