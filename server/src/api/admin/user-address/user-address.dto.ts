import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  StringDtoProperty,
  DtoProperty,
  DateDtoProperty,
} from 'src/common/dto.helpers';

@Exclude()
export class UserAddress {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  userId: string;

  @StringDtoProperty({ type: 'text' })
  address1!: string;

  @StringDtoProperty({ type: 'text' })
  address2!: string;

  @StringDtoProperty({ type: 'text' })
  postalCode!: string;

  @DateDtoProperty()
  createdAt: Date;

  @DateDtoProperty()
  updatedAt: Date;
}

export class UserAddressCreateDto extends OmitType(UserAddress, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class UserAddressUpdateDto extends OmitType(UserAddressCreateDto, []) {}
