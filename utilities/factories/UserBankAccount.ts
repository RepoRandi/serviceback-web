/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker';
import { getRepository } from 'typeorm';
import { UserBankAccount } from '../../server/src/entities/UserBankAccount';

export const UserBankAccountFactory = {
  build: (attrs: Partial<UserBankAccount> = {}) => {
    const userBankAccountAttrs: Partial<UserBankAccount> = {
      accountNumber: faker.finance.account(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      ...attrs,
    };

    return getRepository(UserBankAccount).create(userBankAccountAttrs);
  },

  create: async (attrs: Partial<UserBankAccount> = {}) => {
    const userBankAccount = UserBankAccountFactory.build(attrs);
    const createdUserBankAccount = await getRepository(UserBankAccount).save(
      userBankAccount,
    );

    return createdUserBankAccount;
  },

  deleteAll: async () =>
    await getRepository(UserBankAccount).query(
      'TRUNCATE "userBankAccount" CASCADE',
    ),
};
