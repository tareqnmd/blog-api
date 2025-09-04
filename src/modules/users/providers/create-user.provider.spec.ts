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
    id: 1,
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
          useValue: createMockRepository(),
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
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('createUser', () => {
    describe('when the user does not exist', () => {
      it('should create a new user', async () => {
        userRepository.findOne?.mockResolvedValue(null);
        userRepository.create?.mockReturnValue(user);
        userRepository.save?.mockResolvedValue(user);
        const result = await provider.createUser(user);
        expect(userRepository.findOne).toHaveBeenCalledWith({
          where: { email: user.email },
        });
        expect(userRepository.create).toHaveBeenCalledWith(user);
        expect(userRepository.save).toHaveBeenCalledWith(user);
        expect(result).toEqual(user);
      });
    });
    describe('when the user already exists', () => {
      it('should throw an error', async () => {
        userRepository.findOne?.mockReturnValue(user.email);
        userRepository.create?.mockReturnValue(user);
        userRepository.save?.mockReturnValue(user);
        try {
          const newUser = await provider.createUser(user);
          expect(newUser).toEqual(user);
        } catch (error) {
          expect(error).toBeDefined();
        }
      });
    });
  });
});
