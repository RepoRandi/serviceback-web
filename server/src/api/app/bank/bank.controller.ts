import { Controller } from '@nestjs/common';
import { BankService } from './bank.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Bank } from './bank.dto';

@ApiTags('Bank')
@ApiSecurity('bearer')
@Crud({
  model: {
    type: Bank,
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
    only: ['getManyBase'],
  },
})
@Controller()
export class BankController implements CrudController<Bank> {
  constructor(public service: BankService) {}
}
