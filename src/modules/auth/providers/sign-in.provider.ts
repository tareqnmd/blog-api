import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/providers/users.service';
import { SigninDto } from '../dto/signin.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
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
      const { accessToken, refreshToken } =
        await this.generateTokensProvider.generateTokens({
          sub: user.id,
          email: user.email,
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
