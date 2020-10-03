import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserBankAccount } from '@entities/UserBankAccount';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserBankAccountService extends TypeOrmCrudService<UserBankAccount> {
  constructor(@InjectRepository(UserBankAccount) userBankAccountRepository: Repository<UserBankAccount>) {
    super(userBankAccountRepository);
  }
}


