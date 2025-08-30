import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { PatchUserDto } from '../dto/patch-user.dto';
import { UserFilterDto } from '../dto/user-filter.dto';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { FindUserByIdProvider } from './find-user-by-id.provider';

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
    private readonly createUserProvider: CreateUserProvider,
    private readonly findUserByEmailProvider: FindUserByEmailProvider,
    private readonly findUserByIdProvider: FindUserByIdProvider,
  ) {}

  /**
   * Creates a new user.
   * @param createUserDto - The user to create.
   * @returns A string with the user's name and email.
   */
  async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Gets a user by id.
   * @param id - The id of the user to get.
   * @returns A string with the user's name and email.
   */
  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Finds a user by email.
   * @param email - The email of the user to find.
   * @returns A string with the user's name and email.
   */
  async findUserByEmail(email: string) {
    return this.findUserByEmailProvider.findUserByEmail(email);
  }

  /**
   * Finds a user by id.
   * @param id - The id of the user to find.
   * @returns A string with the user's name and email.
   */
  async findUserById(id: number) {
    return this.findUserByIdProvider.findUserById(id);
  }

  /**
   * Gets all users.
   * @param userFilterDto - The filter to get users.
   * @returns A string with the user's name and email.
   */
  async getUsers(userFilterDto: UserFilterDto) {
    const query = this.userRepository.createQueryBuilder('user');
    if (userFilterDto.name) {
      query.andWhere('user.name = :name', { name: userFilterDto.name });
    }
    if (userFilterDto.email) {
      query.andWhere('user.email = :email', { email: userFilterDto.email });
    }
    return query.getMany();
  }

  /**
   * Updates a user.
   * @param id - The id of the user to update.
   * @returns A string with the user's name and email.
   */
  async updateUser(id: number, patchUserDto: PatchUserDto) {
    const user = await this.getUser(id);
    const updatedUser = await this.userRepository.save({
      ...user,
      ...patchUserDto,
    });
    return updatedUser;
  }

  /**
   * Deletes a user.
   * @param id - The id of the user to delete.
   * @returns A string with the user's name and email.
   */
  async deleteUser(id: number) {
    const user = await this.getUser(id);
    await this.userRepository.delete(user.id);
    return {
      message: 'User deleted successfully',
    };
  }
}
