import { Controller, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { OrderCreateDto, Order, OrderUpdateDto } from './order.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@entities/User';

@ApiTags('Order')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'), RolesGuard)
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
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
  routes: {
    getManyBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    getOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    createOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    createManyBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
  },
})
@Controller()
export class OrderController implements CrudController<Order> {
  constructor(public service: OrderService) {}
}
