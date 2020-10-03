/* eslint-disable no-console */
import faker from 'faker';
import { Order } from '../../server/src/entities/Order';
import { ReviewFactory } from '../factories/Review';

export const reviewSeed = async (orders: Order[]): Promise<any> => {
  const reviewList = orders
    .filter(o => {
      return o.paymentStatus === 'PAID';
    })
    .map(o => {
      return {
        order: o,
      };
    });

  try {
    console.log('Seeding dummy review data...');
    const reviewListPromises = reviewList.map(review =>
      ReviewFactory.create(review),
    );

    const reviewResults = await Promise.all(reviewListPromises);
    console.log('Done seeding reviewList.');

    return reviewResults;
  } catch (e) {
    console.error('ERROR - Review seed: ', e);
  }
};
