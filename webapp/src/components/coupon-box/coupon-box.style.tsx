import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Display = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const CouponCode = styled.span`
  font-size: calc(${themeGet('fontSizes.base', '15')}px - 1px);
  color: ${themeGet('colors.primary.regular', '#009E7F')};
  font-weight: ${themeGet('fontWeights.bold', '700')};
  text-transform: uppercase;
`;

export const DiscountPrice = styled.span`
  font-size: calc(${themeGet('fontSizes.base', '15')}px - 1px);
  color: ${themeGet('colors.primary.regular', '#009E7F')};
  font-weight: ${themeGet('fontWeights.bold', '700')};
  margin-left: auto;
`;

export const CancelBtn = styled.button`
  color: ${themeGet('colors.secondary.regular', '#ff5b60')};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  right: -30px;
  cursor: pointer;
`;
