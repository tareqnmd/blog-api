import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/provider/users.service';
import { SigninDto } from '../dto/signin.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
  ) {}
  async signIn(signInDto: SigninDto) {
    try {
      const user = await this.usersService.findUserByEmail(signInDto.email);
      const isPasswordValid = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
