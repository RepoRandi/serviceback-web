import { useEffect } from 'react';
import Head from 'next/head';
import { SEO } from 'components/seo';
import { useServiceCategoryWithSlug } from 'services/service-category';
import ErrorMessage from 'components/error-message/error-message';
import { useAppDispatch } from 'contexts/app/app.provider';
import { AppHeaderType } from 'utils/constant';
import { useRouter } from 'next/router';
import { NoResult } from 'components/product-grid/product-list/product-list.style';
import ServiceGrid from 'components/services-grid/service-grid';
import { Banner } from 'components/banner/banner';
import { Modal } from '@redq/reuse-modal';

import styled from 'styled-components';
import {
  background,
  compose,
  space,
  color,
  layout,
  position,
  flexbox,
  border,
} from 'styled-system';
import css from '@styled-system/css';

const Box = styled.div<any>(
  css({
    height: ['auto', 'auto', '100vh'],
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',

    '@media (max-width: 990px)': {
      padding: '80px 0 25px',
    },
  },
  compose(space, color, layout, position, flexbox, border),
);
const Image = styled.div<any>(
  css({
    backgroundSize: ['cover'],
  }),
  {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: 0,
    left: 0,
    '@media (max-width: 990px) and (min-width: 768px)': {
      backgroundPosition: 'inherit',
    },
  },
  background,
);

const Content = styled.div(
  css({
    px: ['20px', '20px', '15px'],
    pt: [0],
  }),
  {
    position: 'relative',
    zIndex: 2,
    width: '100%',
  },
);
const Title = styled.h2(
  css({
    fontSize: [17, '2xl', 45],
    color: 'text.bold',
    fontWeight: 'bold',
  }),
  {
    marginBottom: 15,
    textAlign: 'center',
  },
);
const Description = styled.p(
  css({
    fontSize: ['base', 'md'],
    color: 'text.regular',
    marginBottom: [null, null, 60],
    display: ['block'],
    fontWeight: 'regular',
    lineHeight: 'body',
    textAlign: ['left', 'left', 'center'],

    '@media (max-width: 990px)': {
      width: '100%',
      paddingRight: '15px',
    },
  }),
);

export const ContentRow = styled.div(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,

    button: {
      padding: 0,

      ':before': {
        content: '""',
        width: 5,
        height: 5,
        display: 'block',
        borderRadius: '50%',
        backgroundColor: 'yellow.regular',
        marginRight: '7px',
      },
    },
  }),
);

export const SearchWrapper = styled.div(
  css({
    display: 'flex',
    justifyContent: 'center',
  }),
);

const ServiceCategoryPage: React.FC<{}> = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();

  const { data: category, error } = useServiceCategoryWithSlug(
    query.categorySlug,
  );

  useEffect(() => {
    dispatch({
      type: 'SET_HEADER_TYPE',
      payload: {
        type: AppHeaderType.WITH_TITLE,
        title: (category || {}).name || '',
      },
    });
  }, [category]);

  if (!category) {
    return <NoResult />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Modal>
        <SEO title="Serviceback" description="Serviceback" />
        <Box display={['flex', 'flex', 'none']}>
          <Content>
            <ContentRow>
              <Description>{category.description}</Description>
            </ContentRow>
          </Content>
        </Box>
        <Banner
          imageUrl={category.imageUrl}
          title={category.name}
          description={category.description}
        />
        {category ? (
          <ServiceGrid services={category.services} category={category.slug} />
        ) : null}
      </Modal>
    </>
  );
};

export default ServiceCategoryPage;
