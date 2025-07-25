import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto) {
    return `User ${createUserDto.firstName} ${createUserDto.lastName} created`;
  }

  getUser(id: string) {
    return `User ${id}`;
  }

  getUsers(userFilterDto: UserFilterDto) {
    return `Users ${userFilterDto.name} ${userFilterDto.email} ${userFilterDto.limit} ${userFilterDto.page}`;
  }

  updateUser(id: string) {
    return `User ${id} updated`;
  }

  deleteUser(id: string) {
    return `User ${id} deleted`;
  }
}
