export const HOME_PAGE = '/';
export const CHECKOUT_PAGE = '/checkout';
export const CHECKOUT_PAGE_TWO = '/checkout-alternative';
export const PROFILE_PAGE = '/profile';
export const CURRENT_APPOINTMENTS = '/current-appointments';
export const HISTORY = '/history';
export const ORDER_RECEIVED_PAGE = '/order-received';
export const OFFER_PAGE = '/offer';
export const HELP_PAGE = '/help';
export const TERMS_AND_SERVICES_PAGE = '/terms';
export const PRIVACY_POLICY_PAGE = '/privacy';

// Mobile Drawer Menus

export const HOME_MENU_ITEM = {
  id: 'nav.home',
  defaultMessage: 'Home',
  href: HOME_PAGE,
};

export const HELP_MENU_ITEM = {
  id: 'nav.help',
  defaultMessage: 'Help',
  href: HELP_PAGE,
};
export const OFFER_MENU_ITEM = {
  id: 'nav.offer',
  defaultMessage: 'Offer',
  href: OFFER_PAGE,
};
export const CURRENT_APPOINTMENTS_MENU_ITEM = {
  id: 'nav.current_appointments',
  href: CURRENT_APPOINTMENTS,
  defaultMessage: 'Current Appointments',
};
export const HISTORY_MENU_ITEM = {
  id: 'nav.history',
  href: HISTORY,
  defaultMessage: 'History',
};
export const PROFILE_MENU_ITEM = {
  id: 'nav.profile',
  defaultMessage: 'Profile',
  href: PROFILE_PAGE,
};
export const AUTHORIZED_MENU_ITEMS = [
  PROFILE_MENU_ITEM,
  CURRENT_APPOINTMENTS_MENU_ITEM,
  HISTORY_MENU_ITEM,
];
// category menu items for header navigation
export const CATEGORY_MENU_ITEMS = [
  // {
  //   id: 'nav.grocery',
  //   href: GROCERY_PAGE,
  //   defaultMessage: 'Grocery',
  //   icon: 'FruitsVegetable',
  //   dynamic: true,
  // },
];

export const MOBILE_DRAWER_MENU = [
  HOME_MENU_ITEM,
  ...AUTHORIZED_MENU_ITEMS,
  HELP_MENU_ITEM,
  OFFER_MENU_ITEM,
];

export const PROFILE_SIDEBAR_TOP_MENU = [
  CURRENT_APPOINTMENTS_MENU_ITEM,
  HISTORY_MENU_ITEM,
  HELP_MENU_ITEM,
];
export const PROFILE_SIDEBAR_BOTTOM_MENU = [PROFILE_MENU_ITEM];

export const LANGUAGE_MENU = [
  {
    id: 'ar',
    defaultMessage: 'Arabic',
    icon: 'SAFlag',
  },
  {
    id: 'zh',
    defaultMessage: 'Chinese',
    icon: 'CNFlag',
  },
  {
    id: 'en',
    defaultMessage: 'English',
    icon: 'USFlag',
  },
  {
    id: 'de',
    defaultMessage: 'German',
    icon: 'DEFlag',
  },
  {
    id: 'he',
    defaultMessage: 'Hebrew',
    icon: 'ILFlag',
  },
  {
    id: 'es',
    defaultMessage: 'Spanish',
    icon: 'ESFlag',
  },
];
