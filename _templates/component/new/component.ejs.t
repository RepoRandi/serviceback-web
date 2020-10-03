---
to: webapp/src/components/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.tsx
---
import React from 'react';
import {
  <%= h.changeCase.pascal(name) %>Wrapper,
  Title,
} from './<%= h.changeCase.param(name) %>.style';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';

type Props = {
    
};


const <%= h.changeCase.pascal(name) %>: React.FunctionComponent<Props> = ({ }) => {
  return (
    <<%= h.changeCase.pascal(name) %>Wrapper>
      <Grid>
        <Row>
          
        </Row>
      </Grid>
    </<%= h.changeCase.pascal(name) %>Wrapper>
  );
};

export default <%= h.changeCase.pascal(name) %>;


