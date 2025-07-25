import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  createUser() {
    return 'User created';
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return `User ${id}`;
  }

  @Get()
  getUsers(@Query('name') name: string) {
    return `Users ${name}`;
  }

  @Put(':id')
  updateUser(@Param('id') id: string) {
    return `User ${id} updated`;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return `User ${id} deleted`;
  }
}
