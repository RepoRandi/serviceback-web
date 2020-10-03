/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker';
import { getRepository } from 'typeorm';
import { Bank } from '../../server/src/entities/Bank';

export const BankFactory = {
  build: (attrs: Partial<Bank> = {}) => {
    const bankAttrs: Partial<Bank> = {
      ...attrs,
    };

    return getRepository(Bank).create(bankAttrs);
  },

  create: async (attrs: Partial<Bank> = {}) => {
    const bank = BankFactory.build(attrs);
    const createdBank = await getRepository(Bank).save(bank);

    return createdBank;
  },

  deleteAll: async () =>
    await getRepository(Bank).query('TRUNCATE "bank" CASCADE'),
};
