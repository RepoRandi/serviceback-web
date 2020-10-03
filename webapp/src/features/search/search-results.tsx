import React from 'react';
import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import Router from 'next/router';
import {
  GridWrapper,
  ServiceItem,
  ServiceTitle,
  ServiceImage,
  ServiceDescription,
  ServiceDetailsWrapper,
} from './search-results.style';
import { useServiceList } from 'services/service';
import { NoResult } from 'components/product-grid/product-list/product-list.style';
import ErrorMessage from 'components/error-message/error-message';

interface Props {}

const Item = ({ service, category }) => (
  <ServiceItem
    onClick={() => {
      Router.push(`/${category}/${service.slug}`);
    }}
  >
    <ServiceImage>
      <img src={service.imageUrl} />
    </ServiceImage>
    <ServiceDetailsWrapper>
      <ServiceTitle>{service.name}</ServiceTitle>
      <ServiceDescription>{service.description}</ServiceDescription>
    </ServiceDetailsWrapper>
  </ServiceItem>
);

const SearchResults: React.FC<Props> = ({ ...props }) => {
  const searchTerm = useAppState('searchTerm');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const intl = useIntl();

  const { data, error } = useServiceList({ name: searchTerm });
  if (!data) {
    return <NoResult />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  const results = data.data;

  return (
    <GridWrapper>
      <Grid
        style={{
          padding: '0 16px',
        }}
      >
        <Row>
          {results.map(
            (
              {
                name,
                imageUrl,
                slug,
                description,
                serviceCategory: { name: category },
              },
              idx,
            ) => (
              <Col xs={12} md={6} key={`home-serviceGrid-${idx}`}>
                <Item
                  service={{
                    name,
                    imageUrl,
                    slug,
                    description,
                  }}
                  category={category}
                />
              </Col>
            ),
          )}
        </Row>
      </Grid>
    </GridWrapper>
  );
};

export default SearchResults;

export const BannerSearchResults: React.FC<Props> = ({ ...props }) => {
  const searchTerm = useAppState('searchTerm');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const intl = useIntl();

  const { data, error } = useServiceList({ name: searchTerm });
  if (!data) {
    return <NoResult />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  const results = data.data;

  return (
    <GridWrapper
      style={{
        position: 'absolute',
        top: '50px',
        maxWidth: '660px',
      }}
    >
      <Grid
        style={{
          padding: '0 16px',
          position: 'relative',
        }}
      >
        <Row>
          {results
            .slice(0, 3)
            .map(
              (
                {
                  name,
                  imageUrl,
                  slug,
                  description,
                  serviceCategory: { name: category },
                },
                idx,
              ) => (
                <Col sm={12} key={`home-serviceGrid-${idx}`}>
                  <Item
                    service={{
                      name,
                      imageUrl,
                      slug,
                      description,
                    }}
                    category={category}
                  />
                </Col>
              ),
            )}
        </Row>
      </Grid>
    </GridWrapper>
  );
};
