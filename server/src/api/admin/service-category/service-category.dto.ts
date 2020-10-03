import { ServiceCategoryStatus } from '@entities/ServiceCategory';
import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  StringDtoProperty,
  DtoProperty,
  DateDtoProperty,
} from 'src/common/dto.helpers';

@Exclude()
export class ServiceCategory {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  name!: string;

  @StringDtoProperty()
  description!: string;

  @StringDtoProperty()
  imageUrl!: string;

  @StringDtoProperty()
  slug!: string;

  @DtoProperty()
  status!: ServiceCategoryStatus;

  @DateDtoProperty()
  createdAt: Date;

  @DateDtoProperty()
  updatedAt: Date;
}

export class ServiceCategoryCreateDto extends OmitType(ServiceCategory, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class ServiceCategoryUpdateDto extends OmitType(
  ServiceCategoryCreateDto,
  [],
) {}
