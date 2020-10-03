/* eslint-disable no-console */
import faker from 'faker';
import { BankFactory } from '../factories/Bank';

export const bankSeed = async (): Promise<any> => {
  const bankList = [
    {
      name: 'DBS',
    },
    {
      name: 'OCBC',
    },
    {
      name: 'UOB',
    },
  ];

  try {
    console.log('Seeding dummy bank data...');
    const bankListPromises = bankList.map(bank => BankFactory.create(bank));

    const bankResults = await Promise.all(bankListPromises);
    console.log('Done seeding bankList.');

    return bankResults;
  } catch (e) {
    console.error('ERROR - Bank seed: ', e);
  }
};
