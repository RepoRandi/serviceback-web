import React from 'react';
import Router, { useRouter } from 'next/router';
import { openModal } from '@redq/reuse-modal';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';
import { RightMenu } from './menu/right-menu/right-menu';
import { LeftMenu } from './menu/left-menu/left-menu';
import HeaderWrapper from './header.style';
import LogoImage from 'assets/images/logo.png';
import UserImage from 'assets/images/favicon.png';
import Search from 'features/search/search';
import { useAppState } from 'contexts/app/app.provider';
import Firebase from 'utils/firebase';
const firebase = new Firebase();
type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const appHeaderType = useAppState('appHeaderType');
  const {
    authState: { isAuthenticated },
    authDispatch,
    signout,
  } = React.useContext<any>(AuthContext);
  const { pathname, query } = useRouter();
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      signout(() => {
        authDispatch({ type: 'SIGN_OUT' });
        Router.push('/');
      });
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
  const category = query.category;
  const showSearch = category !== undefined;
  const user = firebase.getCurrentUser();

  if (user) {
    firebase.getToken().then((idToken) => {
      localStorage.setItem('idToken', idToken);
    });
  }
  return (
    <HeaderWrapper className={className} id="layout-header">
      <LeftMenu logo={LogoImage} />
      {showSearch && <Search minimal={true} className="headerSearch" />}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={(user || {}).photoURL ? user.photoURL : UserImage}
      />
    </HeaderWrapper>
  );
};

export default Header;
