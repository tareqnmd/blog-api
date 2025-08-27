import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/provider/users.service';
import { SigninDto } from '../dto/signin.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
      const payload = {
        sub: user.id,
        email: user.email,
      };
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('jwt.accessTokenTtl'),
        secret: this.configService.get('jwt.secret'),
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('jwt.refreshTokenTtl'),
        secret: this.configService.get('jwt.secret'),
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
