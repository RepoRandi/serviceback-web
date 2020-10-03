import { Controller, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { OrderCreateDto, Order, OrderUpdateDto } from './order.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Order')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'))
@Crud({
  model: {
    type: Order,
  },
  dto: {
    create: OrderCreateDto,
    update: OrderUpdateDto,
  },
  query: {
    allow: [],
    exclude: [],
    join: {
      orderItems: {
        eager: true,
        allow: ['id', 'quantity', 'datetime'],
      },
      'orderItems.service': {
        eager: true,
        allow: ['id', 'name', 'price', 'durationMinutes'],
      },
      review: {
        eager: true,
        allow: ['id', 'content'],
      },
    },
    sort: [
      {
        field: 'id',
        order: 'ASC',
      },
    ],
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: any) => {
    return {
      userId: user.user_id,
    };
  },
  persist: (user: any) => ({
    userId: user.user_id,
    userEmail: user.email,
  }),
})
@Controller()
export class OrderController implements CrudController<Order> {
  constructor(public service: OrderService) {}
}
