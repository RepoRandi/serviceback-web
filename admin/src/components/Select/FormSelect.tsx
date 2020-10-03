import * as React from 'react';
import Select from './Select';

export const getContainerFontStyle = ({ $theme }) => {
  return $theme.typography.fontBold14;
};

export default ({ ...props }) => {
  return (
    <Select
      labelKey="label"
      valueKey="value"
      searchable={false}
      clearable={false}
      overrides={{
        Placeholder: {
          style: ({ $theme }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $theme.colors.textNormal,
            };
          },
        },
        DropdownListItem: {
          style: ({ $theme }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $theme.colors.textNormal,
            };
          },
        },
        OptionContent: {
          style: ({ $theme, $selected }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $selected
                ? $theme.colors.textDark
                : $theme.colors.textNormal,
            };
          },
        },
        SingleValue: {
          style: ({ $theme }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $theme.colors.textNormal,
            };
          },
        },
        Popover: {
          props: {
            overrides: {
              Body: {
                style: { zIndex: 5 },
              },
            },
          },
        },
      }}
      {...props}
    />
  );
};
