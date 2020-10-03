import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
} from './Sidebar.style';
// prettier-ignore
import {
  CATEGORY,
  USERS,
  SERVICE,
  ORDER,
  REVIEW,
  BANK,
} from 'config/constants'; // HYGEN-SIDEBAR_CONSTANTS
import { AuthContext } from 'context/auth';

import { SidebarCategoryIcon } from 'assets/icons/SidebarCategoryIcon';
import { CustomerIcon } from 'assets/icons/CustomerIcon';
import { SettingIcon } from 'assets/icons/SettingIcon';
import { LogoutIcon } from 'assets/icons/LogoutIcon';

const sidebarMenus = [
  // {
  //   name: 'Dashboard',
  //   path: DASHBOARD,
  //   exact: true,
  //   icon: <DashboardIcon />,
  // },
  {
    name: 'Category',
    path: CATEGORY,
    exact: false,
    icon: <SidebarCategoryIcon />,
  },
  {
    name: 'Users',
    path: USERS,
    exact: false,
    icon: <CustomerIcon />,
  },
  {
    name: 'Service',
    path: SERVICE,
    exact: false,
    icon: <SettingIcon />,
  },
  {
    name: 'Order',
    path: ORDER,
    exact: false,
    icon: <SettingIcon />,
  },
  {
    name: 'Review',
    path: REVIEW,
    exact: false,
    icon: <SettingIcon />,
  },
  {
    name: 'Bank',
    path: BANK,
    exact: false,
    icon: <SettingIcon />,
  },
]; // HYGEN-SIDEBAR_MENU

export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
}: any) {
  const { signout } = useContext(AuthContext);
  return (
    <SidebarWrapper ref={refs} style={style}>
      <MenuWrapper>
        {sidebarMenus.map((menu: any, index: number) => (
          <NavLink
            to={menu.path}
            key={index}
            exact={menu.exact}
            activeStyle={{
              color: '#00C58D',
              backgroundColor: '#f7f7f7',
              borderRadius: '50px 0 0 50px',
            }}
            onClick={onMenuItemClick}
          >
            {menu.icon ? <Svg>{menu.icon}</Svg> : ''}
            {menu.name}
          </NavLink>
        ))}
      </MenuWrapper>

      <LogoutBtn
        onClick={() => {
          signout();
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Logout
      </LogoutBtn>
    </SidebarWrapper>
  );
});
