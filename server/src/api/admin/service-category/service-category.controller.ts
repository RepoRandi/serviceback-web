import { Controller, UseGuards } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import {
  ServiceCategoryCreateDto,
  ServiceCategory,
  ServiceCategoryUpdateDto,
} from './service-category.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@entities/User';

@ApiTags('ServiceCategory')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'), RolesGuard)
@Crud({
  model: {
    type: ServiceCategory,
  },
  dto: {
    create: ServiceCategoryCreateDto,
    update: ServiceCategoryUpdateDto,
  },
  query: {
    allow: [],
    exclude: [],
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
  routes: {
    getManyBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    getOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    createOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    createManyBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    updateOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
    deleteOneBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
  },
})
@Controller()
export class ServiceCategoryController
  implements CrudController<ServiceCategory> {
  constructor(public service: ServiceCategoryService) {}
}
