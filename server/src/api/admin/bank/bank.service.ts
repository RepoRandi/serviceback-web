import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Bank } from '@entities/Bank';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class BankService extends TypeOrmCrudService<Bank> {
  constructor(@InjectRepository(Bank) bankRepository: Repository<Bank>) {
    super(bankRepository);
  }
}


