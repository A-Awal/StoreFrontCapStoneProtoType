import { User as UserDocument } from "../../entities/user";

declare global {
  namespace Express {
    interface User extends UserDocument {}
}
}
