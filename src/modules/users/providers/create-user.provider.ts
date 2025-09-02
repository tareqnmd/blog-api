import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/modules/auth/providers/hashing.provider';
import { MailService } from 'src/modules/mail/providers/mail.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class CreateUserProvider {
  constructor(
    private readonly mailService: MailService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      //Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      //Create user
      const user = this.userRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(
          createUserDto.password,
        ),
      });
      //Save user
      await this.userRepository.save(user);

      try {
        await this.mailService.welcomeEmail(
          user.email,
          `${user.firstName} ${user.lastName}`,
        );
      } catch (error) {
        throw new RequestTimeoutException(error);
      }
      return user;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
