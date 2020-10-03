/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker';
import { getRepository } from 'typeorm';
import { Review } from '../../server/src/entities/Review';

export const ReviewFactory = {
  build: (attrs: Partial<Review> = {}) => {
    const reviewAttrs: Partial<Review> = {
      content: faker.lorem.paragraph(),
      ...attrs,
    };

    return getRepository(Review).create(reviewAttrs);
  },

  create: async (attrs: Partial<Review> = {}) => {
    const review = ReviewFactory.build(attrs);
    const createdReview = await getRepository(Review).save(review);

    return createdReview;
  },

  deleteAll: async () =>
    await getRepository(Review).query('TRUNCATE "review" CASCADE'),
};
