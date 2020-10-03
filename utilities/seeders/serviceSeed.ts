/* eslint-disable no-console */
import { ServiceFactory } from '../factories/Service';
import { ServiceCategory } from '../../server/src/entities/ServiceCategory';

export const serviceSeed = async (
  serviceCategories: ServiceCategory[],
): Promise<any> => {
  const serviceList = [
    {
      name: 'Car',
      slug: `car-0001`,
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ].map((s, i) => {
    return {
      serviceCategory: serviceCategories[i % serviceCategories.length],
      ...s,
    };
  });

  try {
    console.log('Seeding dummy service data...');
    const serviceListPromises = serviceList.map(service =>
      ServiceFactory.create(service),
    );

    const serviceResults = await Promise.all(serviceListPromises);
    console.log('Done seeding serviceList.');

    return serviceResults;
  } catch (e) {
    console.error('ERROR - Service seed: ', e);
  }
};
