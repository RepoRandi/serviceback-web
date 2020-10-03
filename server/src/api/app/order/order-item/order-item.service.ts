import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OrderItem } from '@entities/OrderItem';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class OrderItemService extends TypeOrmCrudService<OrderItem> {
  constructor(@InjectRepository(OrderItem) orderItemRepository: Repository<OrderItem>) {
    super(orderItemRepository);
  }
}


