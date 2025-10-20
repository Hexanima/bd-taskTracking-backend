export abstract class TaggedError<TName extends string = string> extends Error {
  tag: TName;

  constructor(name: TName, message?: string) {
    super(message);
    this.tag = name;
  }

  toString(): TName {
    return this.tag;
  }
}
