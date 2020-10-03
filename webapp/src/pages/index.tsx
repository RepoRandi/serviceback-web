import { useEffect } from 'react';
import Head from 'next/head';
import { SEO } from 'components/seo';
import { Modal } from '@redq/reuse-modal';
import { Banner } from 'components/banner/banner-home';
import { MobileBanner } from 'components/banner/mobile-banner-home';
import furnitureImage from 'assets/images/banner/furniture.png';
import { useServiceCategoryList } from 'services/service-category';
import ErrorMessage from 'components/error-message/error-message';
import CategoryGrid from 'components/category-grid/category-grid';
import HowItWorks from 'features/how-it-works/how-it-works';
import { useAppDispatch } from 'contexts/app/app.provider';
import { AppHeaderType } from 'utils/constant';

const IndexPage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: 'SET_HEADER_TYPE',
      payload: {
        type: AppHeaderType.DEFAULT,
        title: '',
      },
    });
  }, [dispatch]);
  const { data, loading, error } = useServiceCategoryList();

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SEO title="ServiceBack" description="Serviceback" />
      <Modal>
        <MobileBanner imageUrl={furnitureImage} />
        <Banner imageUrl={furnitureImage} />
        {data ? <CategoryGrid categories={data.data} /> : null}
        <HowItWorks />
      </Modal>
    </>
  );
};

export default IndexPage;
