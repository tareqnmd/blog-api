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
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    content: {
      'application/json': {},
    },
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

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

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.updateUser(id);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
