import { Controller, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ReviewCreateDto, Review, ReviewUpdateDto } from './review.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@entities/User';

@ApiTags('Review')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'), RolesGuard)
@Crud({
  model: {
    type: Review,
  },
  dto: {
    create: ReviewCreateDto,
    update: ReviewUpdateDto,
  },
  query: {
    allow: [],
    exclude: [],
    join: {
      order: {
        eager: true,
        allow: ['id', 'userEmail'],
      },
    },
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
export class ReviewController implements CrudController<Review> {
  constructor(public service: ReviewService) {}
}
