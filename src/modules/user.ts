export interface UserState {
  isLogin: boolean;
}

// export const TOGGLE = "todo/TOGGLE";
export const CHANGE_IS_LOGIN = 'user/CHANGE_IS_LOGIN';

interface ChangeIsLoginAction {
  type: typeof CHANGE_IS_LOGIN;
  meta: {
    input: boolean;
  };
}

export type UserActionTypes = ChangeIsLoginAction;

// actions

function changeIsLogin(input: boolean): object {
  return {
    type: CHANGE_IS_LOGIN,
    meta: {
      input,
    },
  };
}

export const actionCreators = {
  changeIsLogin,
};

// reducers
const initialState: UserState = {
  isLogin: false,
};

export function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case CHANGE_IS_LOGIN:
      return {
        ...state,
        isLogin: action.meta.input,
      };
    default:
      return state;
  }
}
