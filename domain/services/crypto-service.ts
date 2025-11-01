import { AsyncResult } from "@domain/types";

export interface CryptoService {
    hash: () => AsyncResult
}