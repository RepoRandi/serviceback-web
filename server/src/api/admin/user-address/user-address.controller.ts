import { Controller, UseGuards } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserAddressCreateDto, UserAddress, UserAddressUpdateDto } from './user-address.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@entities/User';

@ApiTags('UserAddress')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'), RolesGuard)
@Crud({
  model: {
    type: UserAddress,
  },
  dto: {
    create: UserAddressCreateDto,
    update: UserAddressUpdateDto,
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
  }
})
@Controller()
export class UserAddressController implements CrudController<UserAddress> {
  constructor(public service: UserAddressService) {}
}
