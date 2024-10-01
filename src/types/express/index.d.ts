// src/types/express/index.d.ts
import { IUser } from '../../models/userModel';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;  // `user` özelliği isteğe bağlıdır (optional)
        }
    }
}