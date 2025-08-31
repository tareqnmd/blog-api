import { Injectable } from '@nestjs/common';
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
        return null;
      }
      return user;
    } catch {
      return null;
    }
  }
}
