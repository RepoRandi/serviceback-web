/* eslint-disable no-console */
import faker from 'faker';
import { OrderStatus, PaymentStatus } from '../../server/src/entities/Order';
import { UserAddress } from '../../server/src/entities/UserAddress';
import { Service } from '../../server/src/entities/Service';
import { OrderFactory } from '../factories/Order';

const orderStatuses = [
  OrderStatus.REQUESTED,
  OrderStatus.ASSIGNED,
  OrderStatus.COMPLETED,
];

const paymentStatuses = [
  PaymentStatus.AWAITING_PAYMENT,
  PaymentStatus.PROCESSING,
  PaymentStatus.PAID,
];

export const orderSeed = async (
  services: Service[],
  addresses: UserAddress[],
): Promise<any> => {
  const orderList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map((o, i) => {
    const address = addresses[i % addresses.length];
    const service = services[i % services.length];
    const quantity = (i % 3) + 1;
    return {
      userId: address.userId,
      address1: address.address1,
      address2: address.address2,
      postalCode: address.postalCode,
      totalPrice: service.price * quantity,
      status: orderStatuses[i % orderStatuses.length],
      paymentStatus: paymentStatuses[i % paymentStatuses.length],
      ...o,
    };
  });

  try {
    console.log('Seeding dummy order data...');
    const orderListPromises = orderList.map(order =>
      OrderFactory.create(order),
    );

    const orderResults = await Promise.all(orderListPromises);
    console.log('Done seeding orderList.');

    return orderResults;
  } catch (e) {
    console.error('ERROR - Order seed: ', e);
  }
};
