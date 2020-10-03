import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ServiceCategory } from '@entities/ServiceCategory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ServiceCategoryService extends TypeOrmCrudService<ServiceCategory> {
  constructor(@InjectRepository(ServiceCategory) serviceCategoryRepository: Repository<ServiceCategory>) {
    super(serviceCategoryRepository);
  }
}


