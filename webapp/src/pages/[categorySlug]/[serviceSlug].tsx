import React, { useEffect } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SEO } from 'components/seo';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from 'assets/styles/product-single.style';
import {
  // fetchServiceList,
  // fetchServiceWithSlug,
  useServiceWithSlug,
} from 'services/service';
import ErrorMessage from 'components/error-message/error-message';
import { useAppDispatch } from 'contexts/app/app.provider';
import { AppHeaderType } from 'utils/constant';

const ServiceDetails = dynamic(
  () =>
    import(
      'components/product-details/product-details-two/product-details-two'
    ),
);

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  [key: string]: any;
};

const ProductPage: NextPage<Props> = ({ data, deviceType }) => {
  // const router = useRouter();

  // if (router.isFallback) return <p>Loading...</p>;
  const { query } = useRouter();
  const dispatch = useAppDispatch();

  const { data: service, error } = useServiceWithSlug(query.serviceSlug);

  useEffect(() => {
    dispatch({
      type: 'SET_HEADER_TYPE',
      payload: {
        type: AppHeaderType.WITH_TITLE,
        title: (service || {}).name || '',
      },
    });
  }, [service]);

  if (!service) {
    return <p>Loading...</p>;
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <SEO
        title={`${service.name} - ServiceBack`}
        description={`${service.name} Details`}
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            <ServiceDetails product={service} deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
// export async function getStaticProps({ params }) {
//   const data = fetchServiceWithSlug(params.serviceSlug);
//   return {
//     props: {
//       data,
//     },
//   };
// }
// export async function getStaticPaths() {
//   const services = await fetchServiceList();

//   return {
//     paths: services.map(
//       ({ slug: serviceSlug, serviceCategory: { slug: categorySlug } }) => ({
//         params: { categorySlug, serviceSlug },
//       }),
//     ),
//     fallback: true,
//   };
// }
export default ProductPage;
