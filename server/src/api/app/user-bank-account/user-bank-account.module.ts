import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBankAccount } from '@entities/UserBankAccount';
import { UserBankAccountController } from './user-bank-account.controller';
import { UserBankAccountService } from './user-bank-account.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBankAccount])],
  controllers: [UserBankAccountController],
  providers: [UserBankAccountService],
  exports: [UserBankAccountService],
})
export class AppUserBankAccountModule {}
