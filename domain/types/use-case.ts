export interface UseCase<TResponse = any, TErrors = never> {
  execute: (payload: any) => Promise<TResponse | TErrors>;
}
