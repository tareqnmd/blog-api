import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { User } from './user.entity';

/**
 * UsersService is a service that provides methods to create, get, update, and delete users.
 */
@Injectable()
export class UsersService {
  /**
   * Constructor for UsersService.
   * @param userRepository - The repository for the User entity.
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user.
   * @param createUserDto - The user to create.
   * @returns A string with the user's name and email.
   */
  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  /**
   * Gets a user by id.
   * @param id - The id of the user to get.
   * @returns A string with the user's name and email.
   */
  getUser(id: string) {
    return `User ${id}`;
  }

  /**
   * Gets all users.
   * @param userFilterDto - The filter to get users.
   * @returns A string with the user's name and email.
   */
  getUsers(userFilterDto: UserFilterDto) {
    return `Users ${userFilterDto.name} ${userFilterDto.email} ${userFilterDto.limit} ${userFilterDto.page}`;
  }

  /**
   * Updates a user.
   * @param id - The id of the user to update.
   * @returns A string with the user's name and email.
   */
  updateUser(id: string) {
    return `User ${id} updated`;
  }

  /**
   * Deletes a user.
   * @param id - The id of the user to delete.
   * @returns A string with the user's name and email.
   */
  deleteUser(id: string) {
    return `User ${id} deleted`;
  }
}
