/* eslint-disable no-console */
import faker from 'faker';
import { Service } from 'server/src/entities/Service';
import { Order } from '../../server/src/entities/Order';
import { OrderItemFactory } from '../factories/OrderItem';

export const orderItemSeed = async (
  orders: Order[],
  services: Service[],
): Promise<any> => {
  const orderItemList = orders.map((o, i) => {
    const service = services[i % services.length];
    const quantity = (i % 3) + 1;
    return {
      order: o,
      service,
      quantity,
    };
  });

  try {
    console.log('Seeding dummy orderItem data...');
    const orderItemListPromises = orderItemList.map(orderItem =>
      OrderItemFactory.create(orderItem),
    );

    const orderItemResults = await Promise.all(orderItemListPromises);
    console.log('Done seeding orderItemList.');

    return orderItemResults;
  } catch (e) {
    console.error('ERROR - OrderItem seed: ', e);
  }
};
