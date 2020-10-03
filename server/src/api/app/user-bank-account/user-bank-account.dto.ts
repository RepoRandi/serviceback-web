import { Bank } from '@entities/Bank';
import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  StringDtoProperty,
  DtoProperty,
  DateDtoProperty,
} from 'src/common/dto.helpers';

@Exclude()
export class UserBankAccount {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  name!: string;

  @StringDtoProperty()
  accountNumber!: string;

  @DtoProperty()
  bank!: Bank;

  @DateDtoProperty()
  createdAt: Date;

  @DateDtoProperty()
  updatedAt: Date;
}

export class UserBankAccountCreateDto extends OmitType(UserBankAccount, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class UserBankAccountUpdateDto extends OmitType(
  UserBankAccountCreateDto,
  [],
) {}
