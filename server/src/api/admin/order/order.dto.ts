import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { OrderStatus, PaymentStatus } from '@entities/Order';
import {
  StringDtoProperty,
  DtoProperty,
  DateDtoProperty,
} from 'src/common/dto.helpers';
import { OrderItem } from '@entities/OrderItem';

@Exclude()
export class Order {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  userId!: string;

  @StringDtoProperty()
  userEmail!: string;

  @StringDtoProperty()
  address1!: string;

  @StringDtoProperty()
  address2!: string;

  @StringDtoProperty()
  postalCode!: string;

  @StringDtoProperty()
  paymentProofImageUrl?: string;

  @DtoProperty({ type: 'float' })
  totalPrice!: number;

  @DateDtoProperty()
  datetime!: Date;

  @DtoProperty()
  orderItems: Partial<OrderItem>[];

  @StringDtoProperty()
  status!: OrderStatus;

  @StringDtoProperty()
  paymentStatus!: PaymentStatus;

  @DateDtoProperty()
  createdAt: Date;

  @DateDtoProperty()
  updatedAt: Date;
}

export class OrderCreateDto extends OmitType(Order, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class OrderUpdateDto extends OmitType(OrderCreateDto, []) {}
