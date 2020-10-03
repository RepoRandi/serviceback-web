import React from 'react';
import {
  GridWrapper,
  Title,
  CategoryItem,
  CategoryTitle,
  CategoryIcon,
} from './category-grid.style';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import Router from 'next/router';

type Props = {
  categories: {
    name: string;
    iconUrl: string;
    slug: string;
  }[];
};

const Item = ({ category }) => (
  <CategoryItem
    onClick={() => {
      Router.push(`/${category.slug}`);
    }}
  >
    <CategoryIcon>
      <img src={category.iconUrl} />
    </CategoryIcon>
    <CategoryTitle>{category.name}</CategoryTitle>
  </CategoryItem>
);

const CategoryGrid: React.FunctionComponent<Props> = ({ categories }) => {
  return (
    <GridWrapper>
      <Grid>
        <Row center="sm">
          <Title>Services</Title>
        </Row>
        <Row>
          {categories.map(({ name, iconUrl, slug }, idx) => (
            <Col xs={3} key={`home-categoryGrid-${idx}`}>
              <Item
                category={{
                  name,
                  iconUrl,
                  slug,
                }}
              />
            </Col>
          ))}
        </Row>
      </Grid>
    </GridWrapper>
  );
};

export default CategoryGrid;
