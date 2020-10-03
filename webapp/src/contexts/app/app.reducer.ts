import { AppHeaderType } from 'utils/constant';

export const initialState = {
  searchTerm: '',
  isSticky: false,
  isSidebarSticky: true,
  isDrawerOpen: false,
  appHeaderType: AppHeaderType.DEFAULT,
  appHeaderTitle: '',
};

type ActionType =
  | {
      type: 'SET_HEADER_TYPE';
      payload: {
        type: AppHeaderType;
        title: string;
      };
    }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_STICKY' }
  | { type: 'REMOVE_STICKY' }
  | { type: 'SET_SIDEBAR_STICKY' }
  | { type: 'REMOVE_SIDEBAR_STICKY' }
  | { type: 'TOGGLE_DRAWER' };

type StateType = typeof initialState;

export function appReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_STICKY':
      return {
        ...state,
        isSticky: true,
      };
    case 'REMOVE_STICKY':
      return {
        ...state,
        isSticky: false,
      };
    case 'SET_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: true,
      };
    case 'REMOVE_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: false,
      };
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    case 'SET_HEADER_TYPE':
      return {
        ...state,
        appHeaderType: action.payload.type,
        appHeaderTitle: action.payload.title,
      };
    default: {
      throw new Error(`Unsupported action type at App Reducer`);
    }
  }
}
