import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto) {
    return `User ${createUserDto.firstName} ${createUserDto.lastName} created`;
  }

  getUser(id: string) {
    return `User ${id}`;
  }

  getUsers(name: string) {
    return `Users ${name}`;
  }

  updateUser(id: string) {
    return `User ${id} updated`;
  }

  deleteUser(id: string) {
    return `User ${id} deleted`;
  }
}
