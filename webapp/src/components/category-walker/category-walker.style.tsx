import styled from 'styled-components';
import css from '@styled-system/css';

export const WalkerWrapper = styled.div(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0px 20px 15px',

    button: {
      padding: 0,
    },
  })
);

export const CategoryWrapper = styled.div(
  css({
    display: 'flex',
    alignItems: 'baseline',
    width: '100%',
  })
);

export const Category = styled.span(
  css({
    fontSize: 'sm',
    color: 'text.bold',
    fontWeight: 'bold',
    padding: '5px 10px',
    backgroundColor: 'gray.500',
    borderRadius: 'base',
  })
);

export const NoCategory = styled.span(
  css({
    fontSize: 'base',
    color: 'text.bold',
    fontWeight: 'bold',
  })
);

export const IconWrapper = styled.span(
  css({
    display: 'flex',
    padding: '0 8px',
    color: 'gray.900',
  })
);
