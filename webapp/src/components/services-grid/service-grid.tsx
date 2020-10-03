import React from 'react';
import {
  GridWrapper,
  ServiceItem,
  ServiceTitle,
  ServiceImage,
  ServiceDescription,
  ServiceDetailsWrapper,
} from './service-grid.style';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import Router from 'next/router';
import { Title } from 'components/category-grid/category-grid.style';

type Props = {
  services: {
    name: string;
    imageUrl: string;
    description: string;
    slug: string;
  }[];
  category: string;
};

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

const ServiceGrid: React.FunctionComponent<Props> = ({
  services,
  category,
}) => {
  return (
    <GridWrapper>
      <Grid
        style={{
          padding: '0 16px',
        }}
      >
        <Row>
          <Col xs={12}>
            <Title>Services</Title>
          </Col>
        </Row>
        <Row>
          {services.map(({ name, imageUrl, slug, description }, idx) => (
            <Col xs={12} sm={6} md={4} key={`home-serviceGrid-${idx}`}>
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
          ))}
        </Row>
      </Grid>
    </GridWrapper>
  );
};

export default ServiceGrid;
