import { ServiceCategory } from '@entities/ServiceCategory';
import { ServiceStatus } from '@entities/Service';
import { Exclude } from 'class-transformer';
import { StringDtoProperty, DtoProperty } from 'src/common/dto.helpers';

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

  @StringDtoProperty()
  quantityUnit!: string;

  @StringDtoProperty()
  additionalDetails!: string;

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
}
