import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressController } from './user-address.controller';

describe('UserAddressController', () => {
  let controller: UserAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAddressController],
    }).compile();

    controller = module.get<UserAddressController>(UserAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
