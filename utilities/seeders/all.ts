/* eslint-disable no-console */
import initializeDatabase from '../initDB';
import { serviceSeed } from './serviceSeed';
import { serviceCategorySeed } from './serviceCategorySeed';
import { userAddressSeed } from './UserAddressSeed';
import { orderSeed } from './orderSeed';
import { orderItemSeed } from './orderItemSeed';
import { reviewSeed } from './reviewSeed';
import { bankSeed } from './bankSeed';
import { userBankAccountSeed } from './userBankAccountSeed';

const seed = async (): Promise<any> => {
  const categories = await serviceCategorySeed();
  const services = await serviceSeed(categories);
  const addresses = await userAddressSeed();
  const orders = await orderSeed(services, addresses);
  await orderItemSeed(orders, services);
  await reviewSeed(orders);
  const banks = await bankSeed();
  await userBankAccountSeed(banks);
};

const run = async (): Promise<any> => {
  console.log('Connecting to DB');
  const connection = await initializeDatabase({ migrationsRun: false });

  console.log('Seeding DB');
  await seed();

  console.log('Closing DB');
  return await connection.close();
};

run();
