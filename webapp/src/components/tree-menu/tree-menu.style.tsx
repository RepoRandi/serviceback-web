import styled from 'styled-components';
import css from '@styled-system/css';
import { animated } from 'react-spring';
export const Header = styled.header<any>(
  (props) =>
    css({
      fontSize: props.depth === 'parent' ? ['base'] : ['sm'],
      fontWeight: 'medium',
      display: 'flex',
      alignItems: 'center',
      marginBottom: props.depth === 'parent' ? 12 : 0,
      color:
        props.depth === 'parent'
          ? props.open
            ? 'primary.regular'
            : 'text.bold'
          : props.open
          ? 'primary.regular'
          : 'text.regular',
      cursor: 'pointer',
      transition: '0.15s ease-in-out',
      padding: props.depth === 'parent' ? '5px 0' : '5px 10px',
      marginLeft: props.depth === 'child' ? '-10px' : null,
      borderRadius: props.depth === 'child' ? 'base' : null,
      backgroundColor:
        props.depth === 'child' ? props.open && 'gray.200' : null,

      '.toggleButton': {
        color: props.open ? 'primary.regular' : 'text.bold',
        padding: '0 5px',
        marginLeft: 'auto',
        height: 'auto',
        transition: 'transform 0.3s',
        transform: props.open ? 'rotate(90deg)' : '',
      },

      '&:hover': {
        color: 'primary.regular',

        '.toggleButton': {
          color: 'primary.regular',
        },
      },
    }),
  {
    outline: 0,
  }
);

export const IconWrapper = styled.div<any>(
  (props) =>
    css({
      width: props.depth === 'child' ? 10 : 20,
      height: 'auto',
      marginRight: props.depth === 'child' ? '8px' : 15,

      svg: {
        maxWidth: '100%',
        maxHeight: 20,
        height: props.depth === 'child' ? '2px' : 'auto',
      },
    }),
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  }
);

export const Title = styled.span({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  overflow: 'hidden',
});

export const Content = styled(animated.div)({
  willChange: 'transform, opacity, height',
  borderLeft: 0,
  overflow: 'hidden',
});

export const Frame = styled.div<any>(
  (props) =>
    css({
      marginBottom: props.depth === 'parent' ? 15 : 10,
      paddingLeft: props.depth === 'child' ? 32 : 0,
    }),
  {
    position: 'relative',

    overflowX: 'hidden',
  }
);
