import { Injectable } from '@nestjs/common';
import { SigninDto } from '../dto/signin.dto';
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
  constructor(private readonly signInProvider: SignInProvider) {}

  /**
   * Signs in a user.
   * @param signinDto - The user to sign in.
   * @returns A string with the user's name and email.
   */
  signin(signinDto: SigninDto) {
    return this.signInProvider.signIn(signinDto);
  }
}
