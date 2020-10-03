import React from 'react';
import Router, { useRouter } from 'next/router';
import MobileDrawer from './mobile-drawer';
import { useAppState } from 'contexts/app/app.provider';
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  HeaderBackButton,
  Title,
} from './header.style';
import LogoImage from 'assets/images/logo.png';
import UserImage from 'assets/images/user.jpg';

import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import Logo from 'layouts/logo/logo';
import useDimensions from 'utils/useComponentSize';
import { RightMenu } from './menu/right-menu/right-menu';
import { AuthContext } from 'contexts/auth/auth.context';
import { AppHeaderType } from 'utils/constant';
import { capitalCase } from 'change-case';
import { openModal } from '@redq/reuse-modal';
import AuthenticationForm from 'features/authentication-form';
import Firebase from 'utils/firebase';
const firebase = new Firebase();

type MobileHeaderProps = {
  className?: string;
  closeSearch?: any;
  title?: string;
};

const MobileHeaderDefault: React.FC<MobileHeaderProps> = ({ className }) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);

  const [mobileHeaderRef, dimensions] = useDimensions();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };

  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };

  const user = firebase.getCurrentUser();

  if (user) {
    firebase.getToken().then((idToken) => {
      localStorage.setItem('idToken', idToken);
    });
  }
  return (
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        <DrawerWrapper>
          <MobileDrawer />
        </DrawerWrapper>

        <LogoWrapper>
          <Logo imageUrl={LogoImage} alt="shop logo" />
        </LogoWrapper>

        <span style={{ marginLeft: '20px' }}>
          <RightMenu
            isAuthenticated={isAuthenticated}
            onJoin={handleJoin}
            onLogout={handleLogout}
            avatar={UserImage}
          />
        </span>
      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
  );
};

const MobileHeaderWithTitle: React.FC<MobileHeaderProps> = ({
  className,
  title,
}) => {
  const { query } = useRouter();
  const [mobileHeaderRef] = useDimensions();

  if (!title) {
    return <></>;
  }

  return (
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        <HeaderBackButton
          onClick={() => {
            Router.back();
          }}
        >
          <LongArrowLeft />
        </HeaderBackButton>
        <Title>{capitalCase(title)}</Title>
      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
  );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {
  const appHeaderType = useAppState('appHeaderType');
  const appHeaderTitle = useAppState('appHeaderTitle');

  switch (appHeaderType) {
    case AppHeaderType.WITH_TITLE:
      return (
        <MobileHeaderWithTitle className={className} title={appHeaderTitle} />
      );
      break;
    case AppHeaderType.DEFAULT:
    default:
      return <MobileHeaderDefault className={className} />;
  }
};

export default MobileHeader;
