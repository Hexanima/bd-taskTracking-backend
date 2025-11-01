import { AsyncResult, JWT, UUID } from "@app-domain/types";

export interface CryptoService {
  generateUUID: () => AsyncResult<UUID>;
  generateJWT: (thing: object) => AsyncResult<JWT>;
  hash: (textToHash: string) => AsyncResult<string>;
  compareHashes: (
    hashedText: string,
    textToCompare: string
  ) => AsyncResult<boolean>;
}
