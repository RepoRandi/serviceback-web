// **************** ROUTE CONSTANT START **************************
// General Page Section
export const DASHBOARD = '/';
export const CATEGORY = '/category';
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const USERS = '/user';
export const SETTINGS = '/settings';
export const SITE_SETTINGS = '/site-settings';
export const SERVICE = '/service';
export const ORDER = '/order';
export const REVIEW = '/review';
export const BANK = '/bank';
// HYGEN-CONSTANT_ROUTES
// **************** ROUTE CONSTANT END **************************

export const CURRENCY = '$';

export const API_URL = process.env.REACT_APP_API_URL;

export const SERVICE_CATEGORY_STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
];

export const USER_ROLE_OPTIONS = [
  { value: 'CUSTOMER', label: 'Customer' },
  { value: 'ADMIN', label: 'Admin' },
];

export const WYSIWYG_TOOLBAR_OPTIONS = {
  options: ['inline', 'blockType', 'fontSize', 'list', 'colorPicker', 'link'],
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough'],
  },
};

export const SERVICE_STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
];

export const ORDER_STATUS_OPTIONS = [
  { value: 'REQUESTED', label: 'Requested' },
  { value: 'ASSIGNED', label: 'Assigned' },
  { value: 'COMPLETED', label: 'Completed' },
];

export const ORDER_PAYMENT_STATUS_OPTIONS = [
  { value: 'AWAITING_PAYMENT', label: 'Awaiting Payment' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'PAID', label: 'Paid' },
];
