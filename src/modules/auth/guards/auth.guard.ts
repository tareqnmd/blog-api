import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from 'src/common/constant';
import { AuthTypeEnum } from '../auth.enum';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthTypeEnum.BEARER;
  private readonly authTypeGuardMap: Record<
    AuthTypeEnum,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthTypeEnum.BEARER]: this.accessTokenGuard,
      [AuthTypeEnum.NONE]: {
        canActivate: () => true,
      },
    };
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypesFromReflector = this.reflector.getAllAndOverride<
      AuthTypeEnum[]
    >(AUTH_TYPE_KEY, [context.getHandler(), context.getClass()]);

    const authTypes: AuthTypeEnum[] = authTypesFromReflector ?? [
      AuthGuard.defaultAuthType,
    ];

    const guards = authTypes
      .map((type: AuthTypeEnum) => this.authTypeGuardMap[type])
      .flat();

    const error = new UnauthorizedException();

    for (const guard of guards) {
      try {
        const canActivate = await Promise.resolve(guard.canActivate(context));
        if (canActivate) {
          return true;
        }
      } catch {
        continue;
      }
    }
    throw error;
  }
}
