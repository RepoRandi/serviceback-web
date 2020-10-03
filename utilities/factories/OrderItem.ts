/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker';
import { getRepository } from 'typeorm';
import { OrderItem } from '../../server/src/entities/OrderItem';

export const OrderItemFactory = {
  build: (attrs: Partial<OrderItem> = {}) => {
    const orderItemAttrs: Partial<OrderItem> = {
      ...attrs,
    };

    return getRepository(OrderItem).create(orderItemAttrs);
  },

  create: async (attrs: Partial<OrderItem> = {}) => {
    const orderItem = OrderItemFactory.build(attrs);
    const createdOrderItem = await getRepository(OrderItem).save(orderItem);

    return createdOrderItem;
  },

  deleteAll: async () =>
    await getRepository(OrderItem).query('TRUNCATE "orderItem" CASCADE'),
};
