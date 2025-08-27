import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { UsersService } from 'src/modules/users/provider/users.service';
import jwtConfig from '../config/jwt.config';
import { SigninDto } from '../dto/signin.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async signIn(signInDto: SigninDto) {
    try {
      const user = await this.usersService.findUserByEmail(signInDto.email);
      const isPasswordValid = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
      };
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: this.jwtConfiguration.accessTokenTtl,
        secret: this.jwtConfiguration.secret,
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: this.jwtConfiguration.refreshTokenTtl,
        secret: this.jwtConfiguration.secret,
      });
      return {
        token: {
          accessToken,
          refreshToken,
        },
        user: {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      throw new RequestTimeoutException(
        error instanceof Error ? error.message : 'Failed to sign in',
      );
    }
  }
}
