import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { OrderStatus, PaymentStatus } from '@entities/Order';
import {
  StringDtoProperty,
  DtoProperty,
  DateDtoProperty,
} from 'src/common/dto.helpers';
import { OrderItem } from './order-item/order-item.dto';
import { Review } from '@entities/Review';

@Exclude()
export class Order {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  address1!: string;

  @StringDtoProperty()
  address2!: string;

  @StringDtoProperty()
  postalCode!: string;

  @StringDtoProperty()
  paymentProofImageUrl?: string;

  @DtoProperty()
  totalPrice!: number;

  @StringDtoProperty()
  datetime!: Date;

  @DtoProperty()
  orderItems: OrderItem[];

  @StringDtoProperty()
  status!: OrderStatus;

  @StringDtoProperty()
  paymentStatus!: PaymentStatus;

  @DtoProperty()
  review: Review;

  @DateDtoProperty()
  createdAt!: Date;

  @DateDtoProperty()
  updatedAt!: Date;
}

export class OrderCreateDto extends OmitType(Order, [
  'id',
  'createdAt',
  'updatedAt',
  'orderItems',
  'status',
  'paymentStatus',
  'paymentProofImageUrl',
]) {}

export class OrderUpdateDto extends OmitType(Order, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
