import styled from 'styled-components';
import css from '@styled-system/css';

export const GridWrapper = styled.div(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px 0px',
  }),
);

export const Title = styled.h2(
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

export const CategoryItem = styled.div(
  css({
    textAlign: 'center',
  }),
);

export const CategoryIcon = styled.span(
  css({
    display: 'flex',
    padding: '0 8px',
    alignItems: 'center',
    justifyContent: 'center',
    img: {
      maxWidth: '60px',
    },
  }),
);

export const CategoryTitle = styled.div(
  css({
    padding: '0 8px',
  }),
);
