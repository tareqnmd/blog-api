import { Injectable } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { SigninDto } from '../dto/signin.dto';
import { RefreshTokenProvider } from './refresh-token.provider';
import { SignInProvider } from './sign-in.provider';

/**
 * AuthService is a service that provides methods to sign in and sign up.
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   * @param usersService - The users service.
   */
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  /**
   * Signs in a user.
   * @param signinDto - The user to sign in.
   * @returns A string with the user's name and email.
   */
  signin(signinDto: SigninDto) {
    return this.signInProvider.signIn(signinDto);
  }

  /**
   * Refreshes a token.
   * @param refreshTokenDto - The user to refresh the token.
   * @returns A string with the user's name and email.
   */
  refreshToken(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenProvider.refreshToken(refreshTokenDto);
  }
}
