import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { StringDtoProperty, DateDtoProperty } from 'src/common/dto.helpers';

@Exclude()
export class Bank {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  name: string;

  @DateDtoProperty()
  createdAt: Date;

  @DateDtoProperty()
  updatedAt: Date;
}

export class BankCreateDto extends OmitType(Bank, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class BankUpdateDto extends OmitType(BankCreateDto, []) {}
