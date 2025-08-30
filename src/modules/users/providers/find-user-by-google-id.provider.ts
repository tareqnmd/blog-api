import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindUserByGoogleIdProvider {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByGoogleId(googleId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { googleId } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch {
      throw new RequestTimeoutException('Failed to find user by google id');
    }
  }
}
