import { Controller } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ServiceCategory } from './service-category.dto';
import { ServiceCategoryStatus } from '@entities/ServiceCategory';
@ApiTags('ServiceCategory')
@Crud({
  model: {
    type: ServiceCategory,
  },
  params: {
    slug: {
      field: 'slug',
      type: 'string',
      primary: true,
    },
  },
  query: {
    allow: [],
    filter: (): any => ({
      status: {
        $eq: ServiceCategoryStatus.ACTIVE,
      },
    }),
    join: {
      services: {
        eager: true,
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller()
export class ServiceCategoryController
  implements CrudController<ServiceCategory> {
  constructor(public service: ServiceCategoryService) {}
}
