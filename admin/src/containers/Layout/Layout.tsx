import React from 'react';
import useComponentSize from 'config/useComponentSize';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import DrawerItems from '../DrawerItems/DrawerItems';
import { DrawerProvider } from 'context/DrawerContext';
import {
  LayoutWrapper,
  ContentWrapper,
  ContentInnerWrapper,
} from './Layout.style';
import { styled } from 'baseui';
import { useMedia } from 'config/use-media';

const SidedbarDesktop = styled('div', () => ({
  '@media only screen and (max-width: 1199px)': {
    display: 'none',
  },
}));

const AdminLayout = ({ children }: any) => {
  let [topbarRef, { height }] = useComponentSize();
  let [sidebarRef, { width }] = useComponentSize();
  const desktop = useMedia('(min-width: 992px)');

  return (
    <DrawerProvider>
      <Topbar refs={topbarRef} />
      <LayoutWrapper
        style={{
          height: `calc(100vh - ${height}px)`,
        }}
      >
        {desktop ? (
          <>
            <SidedbarDesktop>
              <Sidebar
                refs={sidebarRef}
                style={{
                  height: `calc(100vh - ${height}px)`,
                }}
              />
            </SidedbarDesktop>
            <ContentWrapper
              style={{
                width: `calc(100% - ${width}px)`,
              }}
            >
              <ContentInnerWrapper>{children}</ContentInnerWrapper>
            </ContentWrapper>
          </>
        ) : (
          <ContentWrapper
            style={{
              width: '100%',
            }}
          >
            <ContentInnerWrapper>{children}</ContentInnerWrapper>
          </ContentWrapper>
        )}
      </LayoutWrapper>
      <DrawerItems />
    </DrawerProvider>
  );
};

export default AdminLayout;
