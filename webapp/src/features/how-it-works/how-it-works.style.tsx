import styled from 'styled-components';
import css from '@styled-system/css';

export const HowItWorksWrapper = styled.div(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px 0px',
  }),
);

export const Header = styled.h2(
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

export const Title = styled.h2(
  css({
    fontSize: ['sm', 'md'],
    color: 'text.bold',
  }),
  {
    textAlign: 'center',
  },
);

export const Description = styled.p(
  css({
    fontSize: ['sm', 'md'],
    color: 'text.regular',
    marginBottom: [null, null, 60],
    display: ['block'],
    fontWeight: 'regular',
    lineHeight: 'body',
    textAlign: 'center',

    '@media (max-width: 990px)': {
      width: '100%',
      paddingRight: '15px',
    },
  }),
);
