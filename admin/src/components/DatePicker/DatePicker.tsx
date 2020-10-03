import * as React from 'react';
import DatePicker from 'react-datepicker';
export const getContainerFontStyle = ({ $theme }) => {
  return $theme.typography.fontBold14;
};

export default ({ ...props }) => {
  return <DatePicker {...props} />;
};
