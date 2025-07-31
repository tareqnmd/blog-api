import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

/**
 * AuthController is a controller that provides methods to sign in and sign up.
 */
@Controller('auth')
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
   * Signs up a user.
   * @param signupDto - The user to sign up.
   * @returns A string with the user's name and email.
   */
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
