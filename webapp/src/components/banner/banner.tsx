import React from 'react';
import {
  Box,
  Image,
  Content,
  Title,
  Description,
  CoverWrapper,
} from './banner.style';

import { useAppDispatch } from 'contexts/app/app.provider';

interface Props {
  imageUrl: string;
  title: string;
  description: string;
}

export const Banner: React.FC<Props> = ({ imageUrl, title, description }) => {
  return (
    <Box display={['none', 'none', 'flex']}>
      <Image backgroundImage={`url(${imageUrl})`} />
      <Content>
        <CoverWrapper>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </CoverWrapper>
      </Content>
    </Box>
  );
};
