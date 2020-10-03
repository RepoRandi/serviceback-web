/* eslint-disable no-console */
import faker from 'faker';
import { Bank } from '../../server/src/entities/Bank';
import { UserBankAccountFactory } from '../factories/UserBankAccount';

export const userBankAccountSeed = async (banks: Bank[]): Promise<any> => {
  let userBankAccountList = [
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
  userBankAccountList = userBankAccountList.map((a, i) => {
    const bank = banks[i % banks.length];
    return {
      ...a,
      bank,
    };
  });

  try {
    console.log('Seeding dummy userBankAccount data...');
    const userBankAccountListPromises = userBankAccountList.map(
      userBankAccount => UserBankAccountFactory.create(userBankAccount),
    );

    const userBankAccountResults = await Promise.all(
      userBankAccountListPromises,
    );
    console.log('Done seeding userBankAccountList.');

    return userBankAccountResults;
  } catch (e) {
    console.error('ERROR - UserBankAccount seed: ', e);
  }
};
