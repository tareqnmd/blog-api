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
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  getUsers(@Query() userFilterDto: UserFilterDto) {
    return this.usersService.getUsers(userFilterDto);
  }

  @ApiOperation({ summary: 'Get user' })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.updateUser(id);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
