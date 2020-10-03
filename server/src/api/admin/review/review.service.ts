import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Review } from '@entities/Review';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ReviewService extends TypeOrmCrudService<Review> {
  constructor(@InjectRepository(Review) reviewRepository: Repository<Review>) {
    super(reviewRepository);
  }
}


