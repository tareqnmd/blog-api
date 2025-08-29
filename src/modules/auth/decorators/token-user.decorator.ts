import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from 'src/common/constant';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { ITokenUser } from 'src/common/interfaces/token-user.interface';

export const TokenUser = createParamDecorator(
  (field: keyof ITokenUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request[REQUEST_USER_KEY];
    return field ? user[field] : user;
  },
);
