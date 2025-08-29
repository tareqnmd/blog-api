import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './provider/auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthTypeEnum } from './auth.enum';

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
}
