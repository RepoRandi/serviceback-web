import { Order } from '@entities/Order';
import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  StringDtoProperty,
  DtoProperty,
  DateDtoProperty,
} from 'src/common/dto.helpers';

@Exclude()
export class Review {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  content: string;

  @DtoProperty()
  order: Order;

  @DateDtoProperty()
  createdAt: Date;

  @DateDtoProperty()
  updatedAt: Date;
}

export class ReviewCreateDto extends OmitType(Review, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class ReviewUpdateDto extends OmitType(ReviewCreateDto, []) {}
