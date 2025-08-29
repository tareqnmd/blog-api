import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from 'src/common/constant';

export const Auth = (...AuthTypeEnum: string[]) =>
  SetMetadata(AUTH_TYPE_KEY, AuthTypeEnum);
