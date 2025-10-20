export interface UseCase<TResponse, TErrors> {
  execute: (payload: any) => Promise<TResponse | TErrors>;
}
