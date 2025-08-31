import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from '../interfaces/google-user.interface';
import { User } from '../user.entity';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createGoogleUser(googleUser: GoogleUser) {
    const user = this.userRepository.create(googleUser);
    await this.userRepository.save(user);
    return user;
  }
}
