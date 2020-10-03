import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { StringDtoProperty, DtoProperty } from 'src/common/dto.helpers';

@Exclude()
export class UserAddress {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  address1!: string;

  @StringDtoProperty()
  address2!: string;

  @StringDtoProperty()
  postalCode!: string;
}

export class UserAddressCreateDto extends OmitType(UserAddress, ['id']) {}

export class UserAddressUpdateDto extends OmitType(UserAddressCreateDto, []) {}
