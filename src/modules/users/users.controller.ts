import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthTypeEnum } from '../auth/auth.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { UsersService } from './providers/users.service';

/**
 * UsersController is a controller that provides methods to create, get, update, and delete users.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a new user.
   * @param createUserDto - The user to create.
   * @returns A string with the user's name and email.
   */
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    content: {
      'application/json': {},
    },
  })
  @Post()
  @Auth(AuthTypeEnum.NONE)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Gets all users.
   * @param userFilterDto - The filter to get users.
   * @returns A string with the user's name and email.
   */
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Get()
  getUsers(@Query() userFilterDto: UserFilterDto) {
    return this.usersService.getUsers(userFilterDto);
  }

  /**
   * Gets a user by id.
   * @param id - The id of the user to get.
   * @returns A string with the user's name and email.
   */
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  /**
   * Updates a user.
   * @param id - The id of the user to update.
   * @returns A string with the user's name and email.
   */
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchUserDto: PatchUserDto,
  ) {
    return this.usersService.updateUser(id, patchUserDto);
  }

  /**
   * Deletes a user.
   * @param id - The id of the user to delete.
   * @returns A string with the user's name and email.
   */
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
