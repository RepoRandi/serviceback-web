import { Exclude } from 'class-transformer';
import { StringDtoProperty, DtoProperty } from 'src/common/dto.helpers';

@Exclude()
export class ServiceCategory {
  @StringDtoProperty()
  name!: string;

  @StringDtoProperty()
  description!: string;

  @StringDtoProperty()
  imageUrl!: string;

  @StringDtoProperty()
  iconUrl!: string;

  @StringDtoProperty()
  slug!: string;

  @DtoProperty()
  services!: Service[];
}

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
}
