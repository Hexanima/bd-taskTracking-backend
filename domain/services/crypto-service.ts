import { JWT } from "@app-domain/types/jwt.js";
import { AsyncResult } from "@app-domain/types/result.js";
import { UUID } from "@app-domain/types/uuid.js";


export interface CryptoService {
  generateUUID: () => AsyncResult<UUID>;
  generateJWT: (thing: object) => AsyncResult<JWT>;
  hash: (textToHash: string) => AsyncResult<string>;
  compareHashes: (
    hashedText: string,
    textToCompare: string
  ) => AsyncResult<boolean>;
}
