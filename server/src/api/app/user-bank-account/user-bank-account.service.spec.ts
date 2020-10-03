import { Test, TestingModule } from '@nestjs/testing';
import { UserBankAccountService } from './user-bank-account.service';

describe('UserBankAccountService', () => {
  let service: UserBankAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBankAccountService],
    }).compile();

    service = module.get<UserBankAccountService>(UserBankAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

