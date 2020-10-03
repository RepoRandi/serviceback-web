import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { StringDtoProperty, DateDtoProperty } from 'src/common/dto.helpers';

@Exclude()
export class Bank {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  name: string;
}
