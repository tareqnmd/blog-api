import { Request } from 'express';
import { REQUEST_USER_KEY } from '../constant';
import { JwtPayload } from './jwt-payload.interface';

export interface RequestWithUser extends Request {
  [REQUEST_USER_KEY]: JwtPayload;
}
