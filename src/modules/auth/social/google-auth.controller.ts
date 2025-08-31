import { Body, Controller, Post } from '@nestjs/common';
import { AuthTypeEnum } from '../auth.enum';
import { Auth } from '../decorators/auth.decorator';
import { GoogleTokenDto } from './dto/google-token.dto';
import { GoogleAuthService } from './providers/google-auth.service';

@Auth(AuthTypeEnum.NONE)
@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}
  @Post()
  login(@Body() loginDto: GoogleTokenDto) {
    return this.googleAuthService.googleAuth(loginDto.token);
  }
}
