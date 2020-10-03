/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker';
import { getRepository } from 'typeorm';
import { Order } from '../../server/src/entities/Order';

export const OrderFactory = {
  build: (attrs: Partial<Order> = {}) => {
    const orderAttrs: Partial<Order> = {
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      postalCode: faker.address.zipCode(),
      userEmail: 'test@serviceback.sg',
      datetime: faker.date.future(),
      ...attrs,
    };

    return getRepository(Order).create(orderAttrs);
  },

  create: async (attrs: Partial<Order> = {}) => {
    const order = OrderFactory.build(attrs);
    const createdOrder = await getRepository(Order).save(order);

    return createdOrder;
  },

  deleteAll: async () =>
    await getRepository(Order).query('TRUNCATE "order" CASCADE'),
};
