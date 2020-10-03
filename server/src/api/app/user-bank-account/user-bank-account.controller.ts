import { Controller, UseGuards } from '@nestjs/common';
import { UserBankAccountService } from './user-bank-account.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import {
  UserBankAccountCreateDto,
  UserBankAccount,
  UserBankAccountUpdateDto,
} from './user-bank-account.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('UserBankAccount')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'))
@Crud({
  model: {
    type: UserBankAccount,
  },
  dto: {
    create: UserBankAccountCreateDto,
    update: UserBankAccountUpdateDto,
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
    join: {
      bank: {
        eager: true,
        allow: ['name'],
      },
    },
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
export class UserBankAccountController
  implements CrudController<UserBankAccount> {
  constructor(public service: UserBankAccountService) {}
}
