import styled from 'styled-components';
import css from '@styled-system/css';
import { shadow } from 'styled-system';
export const StyledForm = styled.form<any>(
  (props) =>
    css({
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'base',
      overflow: 'hidden',
      width: props.minimal ? '100%' : 700,
      color: 'text.regular',
      backgroundColor: props.minimal ? 'gray.200' : 'white',
      borderWidth: props.minimal ? '1px' : '0',
      borderStyle: 'solid',
      borderColor: props.minimal ? `gray.500` : 'white',

      input: {
        pl: props.minimal ? 0 : 20,
      },
    }),
  shadow
);

export const StyledInput = styled.input(
  css({
    flexGrow: 1,
    fontSize: 'base',
    pr: 20,
    height: 48,
    color: 'text.regular',
    backgroundColor: 'inherit',
    appearance: 'none',
  }),
  {
    border: 0,
    '&:focus': {
      outline: 0,
    },

    '&::-webkit-input-placeholder, &::-moz-placeholder, &::-moz-placeholder, &::-ms-input-placeholder': {
      fontSize: 'base',
      color: 'text.regular',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }
);

export const StyledCategoryName = styled.span(
  css({
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '38px',
    px: 15,
    color: 'primary.regular',
    backgroundColor: 'gray.200',
    borderRadius: 'base',
  }),
  {
    margin: '5px',
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
  }
);

export const StyledSearchButton = styled.button(
  css({
    backgroundColor: 'primary.regular',
    color: 'white',
    fontSize: 'base',
    fontWeight: 'bold',
  }),
  {
    display: 'flex',
    height: 48,
    alignItems: 'center',
    border: 0,
    outline: 0,
    paddingLeft: 30,
    paddingRight: 30,
    cursor: 'pointer',
    flexShrink: 0,
  }
);
