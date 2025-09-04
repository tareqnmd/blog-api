import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HashingProvider } from 'src/modules/auth/providers/hashing.provider';
import { MailService } from 'src/modules/mail/providers/mail.service';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const createMockRepository = <
  T extends ObjectLiteral = any,
>(): MockRepository<T> => {
  return {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };
};

describe('CreateUserProvider', () => {
  let provider: CreateUserProvider;
  let userRepository: MockRepository;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: MailService,
          useValue: {
            welcomeEmail: jest.fn(() => Promise.resolve()),
            sendEmail: jest.fn(() => Promise.resolve()),
          },
        },
        {
          provide: HashingProvider,
          useValue: {
            hashPassword: jest.fn(() => Promise.resolve(user.password)),
          },
        },
      ],
    }).compile();
    provider = module.get<CreateUserProvider>(CreateUserProvider);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
