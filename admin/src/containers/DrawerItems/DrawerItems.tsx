import React, { useCallback } from 'react';
import { styled } from 'baseui';
import Drawer from 'components/Drawer/Drawer';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { useDrawerState, useDrawerDispatch } from 'context/DrawerContext';

/** Drawer Components */
// HYGEN-DRAWER_COMPONENTS_IMPORT
import BankCreateForm from '../Bank/BankCreateForm';
import BankUpdateForm from '../Bank/BankUpdateForm';
import ReviewUpdateForm from '../Review/ReviewUpdateForm';
import OrderUpdateForm from '../Order/OrderUpdateForm';
import ServiceCreateForm from '../Service/ServiceCreateForm';
import ServiceUpdateForm from '../Service/ServiceUpdateForm';
import CategoryForm from '../ServiceCategory/ServiceCategoryCreateForm';
import ServiceCategoryUpdateForm from 'containers/ServiceCategory/ServiceCategoryUpdateForm';
import UserCreateForm from 'containers/UserForm/UserCreateForm';
import UserUpdateForm from 'containers/UserForm/UserUpdateForm';
import Sidebar from '../Layout/Sidebar/Sidebar';

/** Components Name Constants */
const DRAWER_COMPONENTS = {
  // HYGEN-DRAWER_COMPONENTS_EXPORT
  BANK_CREATE_FORM: BankCreateForm,
  BANK_UPDATE_FORM: BankUpdateForm,
  REVIEW_UPDATE_FORM: ReviewUpdateForm,
  ORDER_UPDATE_FORM: OrderUpdateForm,
  SERVICE_CREATE_FORM: ServiceCreateForm,
  SERVICE_UPDATE_FORM: ServiceUpdateForm,
  CATEGORY_FORM: CategoryForm,
  CATEGORY_UPDATE_FORM: ServiceCategoryUpdateForm,
  USER_CREATE_FORM: UserCreateForm,
  USER_UPDATE_FORM: UserUpdateForm,
  SIDEBAR: Sidebar,
};

const CloseButton = styled('button', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textNormal,
  lineHeight: 1.2,
  outline: '0',
  border: 'none',
  padding: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '10px',
  left: '-30px',
  right: 'auto',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  width: '20px',
  height: '20px',
  borderRadius: '50%',

  '@media only screen and (max-width: 767px)': {
    left: 'auto',
    right: '30px',
    top: '29px',
  },
}));

export default function DrawerItems() {
  const isOpen = useDrawerState('isOpen');
  const drawerComponent = useDrawerState('drawerComponent');
  const data = useDrawerState('data');
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  if (!drawerComponent) {
    return null;
  }
  const SpecificContent = DRAWER_COMPONENTS[drawerComponent];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      overrides={{
        Root: {
          style: {
            zIndex: 2,
          },
        },
        DrawerBody: {
          style: {
            marginTop: '80px',
            marginLeft: '60px',
            marginRight: '60px',
            marginBottom: '30px',
            '@media only screen and (max-width: 767px)': {
              marginTop: '80px',
              marginLeft: '30px',
              marginRight: '30px',
              marginBottom: '30px',
            },
          },
        },
        DrawerContainer: {
          style: {
            width: '70vw',
            backgroundColor: '#f7f7f7',
            '@media only screen and (max-width: 767px)': {
              width: '100%',
            },
          },
        },
        Close: {
          component: () => (
            <CloseButton onClick={closeDrawer}>
              <CloseIcon width="6px" height="6px" />
            </CloseButton>
          ),
        },
      }}
    >
      <SpecificContent onClose={closeDrawer} data={data} />
    </Drawer>
  );
}
