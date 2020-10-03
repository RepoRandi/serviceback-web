import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Service } from '@entities/Service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ServiceService extends TypeOrmCrudService<Service> {
  constructor(@InjectRepository(Service) serviceRepository: Repository<Service>) {
    super(serviceRepository);
  }
}


