import { ServiceCategory } from '@entities/ServiceCategory';
import { ServiceStatus } from '@entities/Service';
import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  StringDtoProperty,
  DtoProperty,
  DateDtoProperty,
} from 'src/common/dto.helpers';

@Exclude()
export class Service {
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
  price!: number;

  @DtoProperty()
  cashbackPercent!: number;

  @DtoProperty()
  durationMinutes!: number;

  @DtoProperty()
  serviceCategory!: Partial<ServiceCategory>;

  @DtoProperty()
  status!: ServiceStatus;

  @DateDtoProperty()
  createdAt: Date;

  @DateDtoProperty()
  updatedAt: Date;
}

export class ServiceCreateDto extends OmitType(Service, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class ServiceUpdateDto extends OmitType(ServiceCreateDto, []) {}
