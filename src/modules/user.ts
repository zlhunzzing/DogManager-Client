import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  isLogin: boolean;
  userId: number | null;
}

export const initialState: UserState = {
  isLogin: false,
  userId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    changeIsLogin: (state, action): void => {
      state.isLogin = action.payload;
    },
    changeUserId: (state, action): void => {
      state.userId = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { changeIsLogin, changeUserId } = userSlice.actions;

//////////////////////////////////////////////////////////////////////////////////////
// 툴킷 적용 전 코드
/*
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
*/
