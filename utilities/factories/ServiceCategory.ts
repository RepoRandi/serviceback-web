/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker';
import { getRepository } from 'typeorm';
import { ServiceCategory } from '../../server/src/entities/ServiceCategory';
import { paramCase } from 'change-case';

export const ServiceCategoryFactory = {
  build: (attrs: Partial<ServiceCategory> = {}) => {
    const name = faker.commerce.product();
    const serviceCategoryAttrs: Partial<ServiceCategory> = {
      name,
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.people(1000, 700),
      slug: paramCase(name),
      ...attrs,
    };

    return getRepository(ServiceCategory).create(serviceCategoryAttrs);
  },

  create: async (attrs: Partial<ServiceCategory> = {}) => {
    const serviceCategory = ServiceCategoryFactory.build(attrs);
    const createdServiceCategory = await getRepository(ServiceCategory).save(
      serviceCategory,
    );

    return createdServiceCategory;
  },

  deleteAll: async () =>
    await getRepository(ServiceCategory).query(
      'TRUNCATE "serviceCategory" CASCADE',
    ),
};
