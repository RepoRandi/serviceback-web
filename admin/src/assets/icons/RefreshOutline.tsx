import React from 'react';
export const RefreshOutline = ({
  color = 'currentColor',
  width = '18px',
  height = '14px',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <title>ionicons-v5-b</title>
      <path
        d="M320,146s24.36-12-64-12A160,160,0,1,0,416,294"
        stroke={color}
        strokeWidth="32px"
        strokeLinecap="round"
        fill="none"
        strokeMiterlimit="10"
      />
      <polyline
        points="256 58 336 138 256 218"
        stroke={color}
        strokeWidth="32px"
        strokeLinecap="round"
        fill="none"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
