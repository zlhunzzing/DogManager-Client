export interface AdminState {
  menuDrawerIsOpen: boolean;
  nowMenu: string;
}

// type
export const CHANGE_MENU_DRAWER = 'admin/CHANGE_MENU_DRAWER';
export const CHANGE_NOW_MENU = 'admin/CHANGE_NOW_MENU';

interface ChangeMenuDrawerAction {
  type: typeof CHANGE_MENU_DRAWER;
  meta: {
    input: boolean;
  };
}

interface ChangeNowMenuAction {
  type: typeof CHANGE_NOW_MENU;
  meta: {
    input: string;
  };
}

export type AdminActionTypes = ChangeMenuDrawerAction | ChangeNowMenuAction;

// actions
function ChangeMenuDrawer(input: boolean): object {
  return {
    type: CHANGE_MENU_DRAWER,
    meta: {
      input,
    },
  };
}

function ChangeNowMenu(input: string): object {
  return {
    type: CHANGE_NOW_MENU,
    meta: {
      input,
    },
  };
}

export const actionCreators = {
  ChangeMenuDrawer,
  ChangeNowMenu,
};

// reducers

const initialState: AdminState = {
  menuDrawerIsOpen: false,
  nowMenu: '이벤트 관리',
};

export function adminReducer(state = initialState, action: AdminActionTypes): AdminState {
  switch (action.type) {
    case CHANGE_MENU_DRAWER:
      return {
        ...state,
        menuDrawerIsOpen: action.meta.input,
      };
    case CHANGE_NOW_MENU:
      return {
        ...state,
        nowMenu: action.meta.input,
      };
    default:
      return state;
  }
}
