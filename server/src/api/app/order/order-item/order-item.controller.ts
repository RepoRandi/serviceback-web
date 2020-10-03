import { Controller, UseGuards } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudController, CrudAuth } from '@nestjsx/crud';
import {
  OrderItemCreateDto,
  OrderItem,
  OrderItemUpdateDto,
} from './order-item.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('OrderItem')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'))
@Crud({
  model: {
    type: OrderItem,
  },
  params: {
    orderId: {
      field: 'orderId',
      type: 'string',
    },
  },
  dto: {
    create: OrderItemCreateDto,
    update: OrderItemUpdateDto,
  },
  query: {
    allow: [],
    exclude: [],
    join: {
      service: {
        eager: true,
        allow: ['id', 'name', 'price', 'durationMinutes'],
      },
      order: {
        eager: true,
        select: false,
      },
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: any) => {
    return {
      'order.userId': user.user_id,
    };
  },
})
@Controller()
export class OrderItemController implements CrudController<OrderItem> {
  constructor(public service: OrderItemService) {}
}
