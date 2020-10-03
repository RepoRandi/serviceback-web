/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker';
import { getRepository } from 'typeorm';
import { Service } from '../../server/src/entities/Service';
import { paramCase } from 'change-case';

export const ServiceFactory = {
  build: (attrs: Partial<Service> = {}) => {
    const name = faker.commerce.product();
    const serviceAttrs: Partial<Service> = {
      name,
      slug: `${paramCase(name)}-${faker.random.number(100000)}`,
      description: faker.lorem.sentence(),
      additionalDetails: faker.lorem.paragraphs(),
      imageUrl: faker.image.people(1000, 700),
      price: faker.random.number({ min: 10, max: 100, precision: 5 }),
      cashbackPercent: faker.random.number({ min: 5, max: 20, precision: 5 }),
      durationMinutes: faker.random.number({ min: 0, max: 120, precision: 2 }),
      quantityUnit: '1 unit',
      ...attrs,
    };

    return getRepository(Service).create(serviceAttrs);
  },

  create: async (attrs: Partial<Service> = {}) => {
    const service = ServiceFactory.build(attrs);
    const createdService = await getRepository(Service).save(service);

    return createdService;
  },

  deleteAll: async () =>
    await getRepository(Service).query('TRUNCATE "service" CASCADE'),
};
