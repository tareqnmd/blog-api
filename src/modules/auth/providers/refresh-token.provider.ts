import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenUser } from 'src/common/interfaces/token-user.interface';
import { UsersService } from 'src/modules/users/providers/users.service';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { sub } = await this.jwtService.verifyAsync<ITokenUser>(
      refreshTokenDto.refreshToken,
      this.jwtConfiguration,
    );
    const user = await this.usersService.findUserById(sub);
    const { accessToken, refreshToken } =
      await this.generateTokensProvider.generateTokens({
        sub,
        email: user.email,
      });

    return {
      accessToken,
      refreshToken,
    };
  }
}
