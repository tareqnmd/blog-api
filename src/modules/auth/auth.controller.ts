import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthTypeEnum } from './auth.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './providers/auth.service';

/**
 * AuthController is a controller that provides methods to sign in and sign up.
 */
@Controller('auth')
@Auth(AuthTypeEnum.NONE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Signs in a user.
   * @param signinDto - The user to sign in.
   * @returns A string with the user's name and email.
   */
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  /**
   * Refreshes a token.
   * @param refreshTokenDto - The user to sign in.
   * @returns A string with the user's name and email.
   */
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
