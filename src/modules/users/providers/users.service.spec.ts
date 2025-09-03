import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRoles } from '../enum/user-role.enum';
import { User } from '../user.entity';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { FindUserByGoogleIdProvider } from './find-user-by-google-id.provider';
import { FindUserByIdProvider } from './find-user-by-id.provider';
import { UsersService } from './users.service';

describe('UsersService', () => {
  const mockCreateUserProvider: Partial<CreateUserProvider> = {
    createUser: (createUserDto: CreateUserDto) =>
      Promise.resolve({
        id: 1,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: UserRoles.VIEWER,
      } as User),
  };

  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: CreateUserProvider,
          useValue: mockCreateUserProvider,
        },
        {
          provide: FindUserByEmailProvider,
          useValue: {},
        },
        {
          provide: FindUserByIdProvider,
          useValue: {},
        },
        {
          provide: FindUserByGoogleIdProvider,
          useValue: {},
        },
        {
          provide: CreateGoogleUserProvider,
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(
        service.createUser({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password',
        }),
      ).toBeDefined();
    });
  });
});
