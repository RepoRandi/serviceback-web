import { Controller } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Service } from './service.dto';
import { ServiceStatus } from '@entities/Service';

@ApiTags('Service')
@Crud({
  model: {
    type: Service,
  },
  params: {
    slug: {
      field: 'slug',
      type: 'string',
      primary: true,
    },
  },
  query: {
    limit: 1000,
    allow: [],
    exclude: [],
    filter: (): any => ({
      status: {
        $eq: ServiceStatus.ACTIVE,
      },
    }),
    join: {
      serviceCategory: {
        eager: true,
        allow: ['name', 'slug'],
      },
    },
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
})
@Controller()
export class ServiceController implements CrudController<Service> {
  constructor(public service: ServiceService) {}
}
