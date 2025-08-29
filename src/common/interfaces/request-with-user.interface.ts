import { Request } from 'express';
import { REQUEST_USER_KEY } from '../constant';
import { ITokenUser } from './token-user.interface';

export interface RequestWithUser extends Request {
  [REQUEST_USER_KEY]: ITokenUser;
}
