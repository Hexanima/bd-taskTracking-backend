export interface UseCase<
  TPayload extends unknown = unknown,
  TResponse extends unknown = unknown,
  TErrors extends never = never
> {
  execute: (payload: TPayload) => Promise<TResponse | TErrors>;
}

const testing: UseCase = {
  execute: async () => {
    return void 0;
  },
} as const;
