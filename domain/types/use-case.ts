export interface UseCase<TResponse, TErrors> {
  execute: (payload?: unknown) => Promise<TResponse | TErrors>;
}
