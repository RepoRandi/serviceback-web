import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const CouponBoxWrapper = styled.div`
  &.boxedCoupon {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-right: 5px;
    border-radius: ${themeGet('radii.base', '6px')};
    background-color: ${themeGet('colors.white', '#ffffff')};
    overflow: hidden;
    border: 1px solid ${themeGet('colors.gray.600', '#ededed')};
  }

  input {
    height: 100%;
    flex-grow: 1;
    font-size: calc(${themeGet('fontSizes.base', '15')}px - 1px);
    color: ${themeGet('colors.text.regular', '#77798C')};
    border: none;
    border-radius: 0;
    padding: 0 20px;
    background-color: transparent;
    margin-right: 0;

    &:focus {
      outline: 0;
    }

    &::-webkit-input-placeholder {
      font-size: calc(${themeGet('fontSizes.base', '15')}px - 1px);
      color: ${themeGet('colors.text.label', '#767676')};
    }

    &:-moz-placeholder {
      font-size: calc(${themeGet('fontSizes.base', '15')}px - 1px);
      color: ${themeGet('colors.text.label', '#767676')};
    }

    &::-moz-placeholder {
      font-size: calc(${themeGet('fontSizes.base', '15')}px - 1px);
      color: ${themeGet('colors.text.label', '#767676')};
    }
    &:-ms-input-placeholder {
      font-size: calc(${themeGet('fontSizes.base', '15')}px - 1px);
      color: ${themeGet('colors.text.label', '#767676')};
    }
  }

  &.normalCoupon {
    width: 100%;
    display: flex;
    align-items: center;

    input {
      width: 50%;
      height: 48px;
      margin-right: 20px;
      border: 1px solid ${themeGet('colors.lightDarkColor', '#e6e6e6')} !important;
      background-color: ${themeGet('colors.lightColor', '#f7f7f7')};
      flex-grow: unset;
      border-radius: ${themeGet('radii.base', '6px')};

      @media (max-width: 600px) {
        width: 100%;
      }
    }

    button {
      height: 48px;
    }
  }
`;

type ErrorMsgProps = {
  errorMsgFixed?: boolean;
};

export const Error = styled('span')<ErrorMsgProps>`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.secondary.hover', '#FF282F')};
  padding-top: 10px;
  display: flex;
  justify-content: center;
  position: ${(props) =>
    props.errorMsgFixed === true ? 'absolute' : 'relative'};
  left: ${(props) => (props.errorMsgFixed === true ? '20px' : 'auto')};
  bottom: ${(props) => (props.errorMsgFixed === true ? '-25px' : 'auto')};
`;
