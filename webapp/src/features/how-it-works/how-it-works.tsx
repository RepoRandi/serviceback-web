import React from 'react';
import {
  HowItWorksWrapper,
  Header,
  Title,
  Description,
} from './how-it-works.style';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import HIW1 from 'assets/images/HIW1.svg';
import HIW2 from 'assets/images/HIW2.svg';
import HIW3 from 'assets/images/HIW3.svg';

const content = [
  {
    imageUrl: HIW1,
    title: '1. Request Services',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere feugiat mauris.',
  },
  {
    imageUrl: HIW2,
    title: '2. Get Connected',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere feugiat mauris.',
  },
  {
    imageUrl: HIW3,
    title: '3. Hire & Pay',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere feugiat mauris.',
  },
];

const HowItWorksCard = (c, idx) => (
  <Col xs={12} sm={4} key={`home-how-${idx}`}>
    <Row>
      <Col xs={4}>
        <img src={c.imageUrl} />
      </Col>
      <Col xs={8}>
        <Title>{c.title}</Title>
        <Description>{c.description}</Description>
      </Col>
    </Row>
  </Col>
);

const HowItWorks: React.FunctionComponent = () => {
  return (
    <HowItWorksWrapper>
      <Grid>
        <Row center="xs">
          <Header>How it Works</Header>
        </Row>
        <Row>{content.map((c, idx) => HowItWorksCard(c, idx))}</Row>
      </Grid>
    </HowItWorksWrapper>
  );
};

export default HowItWorks;
