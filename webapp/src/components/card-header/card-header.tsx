import styled from 'styled-components';
import css from '@styled-system/css';
const getIncrementEffect = (props) => {
  if (props.increment) {
    return {
      '&:before': {
        counterIncrement: 'section-counter',
        content: 'counter(section-counter)',
        color: props.theme.colors.white,
        fontSize: props.theme.fontSizes.md,
        width: 35,
        height: 35,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.theme.colors.primary.regular,
        marginRight: 15,

        '@media (max-width: 600px)': {
          width: 30,
          height: 30,
          fontSize: props.theme.fontSizes.base,
        },
      },
    };
  }
};
export const CardHeader = styled.h3<any>(
  (props) =>
    css({
      fontFamily: props.increment ? 'body' : 'heading',
      fontSize: props.increment ? 'lg' : 'base',
      fontWeight: props.increment ? 'regular' : 'semiBold',
      color: 'text.bold',
      lineHeight: 1.2,
      marginBottom: props.increment ? 35 : 25,
      display: 'flex',
      alignItems: 'center',

      '@media (max-width: 767px)': {
        fontSize: props.increment ? 'md' : 'base',
      },
    }),
  (props) => getIncrementEffect(props) as any
);
