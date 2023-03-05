import { Request } from 'express';
import { Session } from 'express-session';

declare module 'express' {
  interface Request {
    session: Session;
  }
}
