/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker';
import { getRepository } from 'typeorm';
import { UserAddress } from '../../server/src/entities/UserAddress';

export const UserAddressFactory = {
  build: (attrs: Partial<UserAddress> = {}) => {
    const UserAddressAttrs: Partial<UserAddress> = {
      ...attrs,
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      postalCode: faker.address.zipCode(),
    };

    return getRepository(UserAddress).create(UserAddressAttrs);
  },

  create: async (attrs: Partial<UserAddress> = {}) => {
    const userAddress = UserAddressFactory.build(attrs);
    const createdUserAddress = await getRepository(UserAddress).save(
      userAddress,
    );

    return createdUserAddress;
  },

  deleteAll: async () =>
    await getRepository(UserAddress).query('TRUNCATE "UserAddress" CASCADE'),
};
