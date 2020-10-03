---
to: server/src/api/<%= app %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.controller.ts
---
import { Controller, UseGuards } from '@nestjs/common';
import { <%= h.changeCase.pascal(name) %>Service } from './<%= h.changeCase.param(name) %>.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { <%= h.changeCase.pascal(name) %>CreateDto, <%= h.changeCase.pascal(name) %>, <%= h.changeCase.pascal(name) %>UpdateDto } from './<%= h.changeCase.param(name) %>.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@entities/User';

@ApiTags('<%= h.changeCase.pascal(name) %>')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'), RolesGuard)
@Crud({
  model: {
    type: <%= h.changeCase.pascal(name) %>,
  },
  dto: {
    create: <%= h.changeCase.pascal(name) %>CreateDto,
    update: <%= h.changeCase.pascal(name) %>UpdateDto,
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
export class <%= h.changeCase.pascal(name) %>Controller implements CrudController<<%= h.changeCase.pascal(name) %>> {
  constructor(public service: <%= h.changeCase.pascal(name) %>Service) {}
}
