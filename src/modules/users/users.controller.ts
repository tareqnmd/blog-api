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
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Get()
  getUsers(@Query() userFilterDto: UserFilterDto) {
    return this.usersService.getUsers(userFilterDto);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.updateUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
