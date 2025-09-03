import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
    usersController = usersModule.get<UsersController>(UsersController);
  });

  describe('Test Controller', () => {});
  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
