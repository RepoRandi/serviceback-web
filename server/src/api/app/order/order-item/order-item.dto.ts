import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  StringDtoProperty,
  DtoProperty,
  DateDtoProperty,
} from 'src/common/dto.helpers';
import { Order } from '../order.dto';

class Service {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  name: string;

  @DtoProperty()
  price!: number;

  @DtoProperty()
  durationMinutes!: number;
}

@Exclude()
export class OrderItem {
  @DtoProperty()
  quantity!: number;

  @DtoProperty()
  service!: Service;

  @DtoProperty()
  order!: Order;

  @DateDtoProperty()
  createdAt!: Date;

  @StringDtoProperty()
  orderId: string;
}

export class OrderItemCreateDto extends OmitType(OrderItem, ['createdAt']) {}

export class OrderItemUpdateDto extends OmitType(OrderItemCreateDto, []) {}
