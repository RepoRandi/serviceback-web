import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

type ScrollbarProps = {
  className?: string;
  children: React.ReactNode;
  options?: any;
  style?: any;
};

export const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  className,
  options,
  style,
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: `${className} os-theme-thin`,
        scrollbars: {
          autoHide: 'leave',
        },
        ...options,
      }}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};
