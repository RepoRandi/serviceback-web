import { Controller, UseGuards } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudController, CrudAuth } from '@nestjsx/crud';
import {
  UserAddressCreateDto,
  UserAddress,
  UserAddressUpdateDto,
} from './user-address.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('UserAddress')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'))
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
})
@CrudAuth({
  property: 'user',
  filter: (user: any) => {
    return {
      userId: user.user_id,
    };
  },
  persist: (user: any) => ({
    userId: user.user_id,
  }),
})
@Controller()
export class UserAddressController implements CrudController<UserAddress> {
  constructor(public service: UserAddressService) {}
}
