import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @ApiOperation({ summary: 'Sign up' })
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
