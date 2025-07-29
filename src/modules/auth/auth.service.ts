import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  signin(signinDto: SigninDto) {
    return signinDto;
  }

  signup(signupDto: SignupDto) {
    return signupDto;
  }
}
