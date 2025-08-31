import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/modules/users/providers/users.service';
import jwtConfig from '../../config/jwt.config';
import { GenerateTokensProvider } from '../../providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  async verifyGoogleToken(googleToken: string) {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: googleToken,
    });
    const payload = ticket.getPayload();
    return payload;
  }

  async googleAuth(googleToken: string) {
    const payload = await this.verifyGoogleToken(googleToken);
    if (payload) {
      const user = await this.usersService.findUserByGoogleId(payload.sub);
      if (user) {
        const tokens = await this.generateTokensProvider.generateTokens({
          sub: user.id,
          email: user.email,
        });
        return tokens;
      } else {
        const newUser = await this.usersService.createGoogleUser({
          googleId: payload.sub,
          email: payload.email ?? '',
          firstName: payload.given_name ?? '',
          lastName: payload.family_name ?? '',
        });
        const tokens = await this.generateTokensProvider.generateTokens({
          sub: newUser.id,
          email: newUser.email,
        });
        return tokens;
      }
    } else {
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}
