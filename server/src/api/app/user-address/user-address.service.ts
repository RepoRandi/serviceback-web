import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserAddress } from '@entities/UserAddress';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserAddressService extends TypeOrmCrudService<UserAddress> {
  constructor(@InjectRepository(UserAddress) userAddressRepository: Repository<UserAddress>) {
    super(userAddressRepository);
  }
}


