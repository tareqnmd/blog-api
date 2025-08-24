import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { SigninDto } from '../dto/signin.dto';

/**
 * AuthService is a service that provides methods to sign in and sign up.
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   * @param usersService - The users service.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Signs in a user.
   * @param signinDto - The user to sign in.
   * @returns A string with the user's name and email.
   */
  signin(signinDto: SigninDto) {
    return signinDto;
  }
}
