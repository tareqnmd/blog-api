import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';
import { MailService } from 'src/modules/mail/providers/mail.service';
import { HashingProvider } from 'src/modules/auth/providers/hashing.provider';

describe('CreateUserProvider', () => {
  let provider: CreateUserProvider;

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
          useValue: {},
        },
        {
          provide: HashingProvider,
          useValue: {},
        },
      ],
    }).compile();
    provider = module.get<CreateUserProvider>(CreateUserProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
