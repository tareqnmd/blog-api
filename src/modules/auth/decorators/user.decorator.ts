import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from 'src/common/constant';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

export const User = createParamDecorator(
  (field: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request[REQUEST_USER_KEY];
    return field ? user[field] : user;
  },
);
