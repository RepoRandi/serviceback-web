import { Test, TestingModule } from '@nestjs/testing';
import { UserBankAccountController } from './user-bank-account.controller';

describe('UserBankAccountController', () => {
  let controller: UserBankAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBankAccountController],
    }).compile();

    controller = module.get<UserBankAccountController>(UserBankAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
