import { Controller, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ReviewCreateDto, Review, ReviewUpdateDto } from './review.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Review')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'))
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
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
    join: {
      order: {
        eager: true,
        allow: ['id', 'userEmail'],
      },
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase'],
  },
})
@Controller()
export class ReviewController implements CrudController<Review> {
  constructor(public service: ReviewService) {}
}
