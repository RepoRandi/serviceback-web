/* eslint-disable no-console */
import { ServiceCategoryFactory } from '../factories/ServiceCategory';

export const serviceCategorySeed = async (): Promise<any> => {
  const serviceCategoryList = [
    {
      name: 'Aircon',
      slug: 'aircon',
      iconUrl:
        'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FAircon.svg?alt=media&token=c8687aea-84f1-40fa-9849-ecd0cee255d6',
    },
    {
      name: 'Flooring',
      slug: 'flooring',
      iconUrl:
        'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FFlooring.svg?alt=media&token=4b5ffd56-206b-4562-b741-81a0b86b8f66',
    },
    {
      name: 'Cleaning',
      slug: 'cleaning',
      iconUrl:
        'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FCleaning.svg?alt=media&token=ed8d0939-05e4-44c1-92be-916162969807',
    },
    {
      name: 'Moving',
      slug: 'moving',
      iconUrl:
        'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FMoving.svg?alt=media&token=423c70bd-bb81-41f1-a730-5ee87d9d7b1b',
    },
    {
      name: 'Painting',
      slug: 'painting',
      iconUrl:
        'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FPainting.svg?alt=media&token=daf1d0b8-8102-4ffd-b517-6353270bdc4b',
    },
    {
      name: 'Handyman',
      slug: 'handyman',
      iconUrl:
        'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FHandyman.svg?alt=media&token=3b44106e-6675-49a4-a015-806c713aded9',
    },
    {
      name: 'Electrical',
      slug: 'electrical',
      iconUrl:
        'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FElectrical.svg?alt=media&token=89258f78-f559-487d-9e6d-62f4bdffdee8',
    },
    {
      name: 'Coming...',
      slug: 'coming',
      iconUrl:
        'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FAircon.svg?alt=media&token=c8687aea-84f1-40fa-9849-ecd0cee255d6',
    },
  ];

  try {
    console.log('Seeding dummy serviceCategory data...');
    const serviceCategoryListPromises = serviceCategoryList.map(
      serviceCategory => ServiceCategoryFactory.create(serviceCategory),
    );

    const serviceCategoryResults = await Promise.all(
      serviceCategoryListPromises,
    );
    console.log('Done seeding serviceCategoryList.');

    return serviceCategoryResults;
  } catch (e) {
    console.error('ERROR - ServiceCategory seed: ', e);
  }
};
