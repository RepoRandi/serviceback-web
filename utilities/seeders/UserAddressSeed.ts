/* eslint-disable no-console */
import faker from 'faker';
import { UserAddressFactory } from '../factories/UserAddress';

export const userAddressSeed = async (): Promise<any> => {
  const UserAddressList = [
    {
      userId: 'g6uSfKKoxWYfzUXjXuyg4yBNX2h1',
    },
    {
      userId: 'g6uSfKKoxWYfzUXjXuyg4yBNX2h1',
    },
    {
      userId: 'g6uSfKKoxWYfzUXjXuyg4yBNX2h1',
    },
    {
      userId: 'PLKz4YBqtATkUSGPwoeBmaGDMhh1',
    },
    {
      userId: 'PLKz4YBqtATkUSGPwoeBmaGDMhh1',
    },
  ];

  try {
    console.log('Seeding dummy UserAddress data...');
    const UserAddressListPromises = UserAddressList.map(userAddress =>
      UserAddressFactory.create(userAddress),
    );

    const UserAddressResults = await Promise.all(UserAddressListPromises);
    console.log('Done seeding UserAddressList.');

    return UserAddressResults;
  } catch (e) {
    console.error('ERROR - UserAddress seed: ', e);
  }
};
