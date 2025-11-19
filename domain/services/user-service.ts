import { User } from "@app-domain/entities/user.js";
import { BaseService } from "@app-domain/types/service.js";


export interface UserService extends BaseService<User> {}
