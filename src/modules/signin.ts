import { createSlice } from '@reduxjs/toolkit';

export interface SigninState {
  idInput: string;
  pwInput: string;
}

export const initialState: SigninState = {
  idInput: '',
  pwInput: '',
};

export const signinSlice = createSlice({
  name: 'signin',
  initialState: initialState,
  reducers: {
    axiosAdminSigninRequest: (state, action): void => {
      console.log('POST /api/admin/signin 요청');
    },
    axiosUserSigninRequest: (state, action): void => {
      console.log('POST /api/user/signin 요청');
    },

    changeIdInput: (state, action): void => {
      state.idInput = action.payload;
    },
    changePwInput: (state, action): void => {
      state.pwInput = action.payload;
    },
  },
});

//////////////////////////////////////////////////////////////////////////////////////

export const signinReducer = signinSlice.reducer;
export const {
  axiosAdminSigninRequest,
  axiosUserSigninRequest,

  changeIdInput,
  changePwInput,
} = signinSlice.actions;

//////////////////////////////////////////////////////////////////////////////////////
// 리덕스 툴킷 적용 전 코드
/*
export interface SigninState {
  idInput: string;
  pwInput: string;
}

// // export const TOGGLE = "todo/TOGGLE";
export const CHANGE_ID_INPUT = 'signin/CHANGE_ID_INPUT';
export const CHANGE_PW_INPUT = 'signin/CHANGE_PW_INPUT';

interface ChangeIdInputAction {
  type: typeof CHANGE_ID_INPUT;
  meta: {
    input: string;
  };
}

interface ChangePwInputAction {
  type: typeof CHANGE_PW_INPUT;
  meta: {
    input: string;
  };
}

export type SigninActionTypes = ChangeIdInputAction | ChangePwInputAction;

// actions

function changeIdInput(input: string): object {
  return {
    type: CHANGE_ID_INPUT,
    meta: {
      input,
    },
  };
}

function changePwInput(input: string): object {
  return {
    type: CHANGE_PW_INPUT,
    meta: {
      input,
    },
  };
}

export const actionCreators = {
  changeIdInput,
  changePwInput,
};

// reducers

const initialState: SigninState = {
  idInput: '',
  pwInput: '',
};

export function signinReducer(
  state = initialState,
  action: SigninActionTypes,
): SigninState {
  switch (action.type) {
    case CHANGE_ID_INPUT:
      return {
        ...state,
        idInput: action.meta.input,
      };
    case CHANGE_PW_INPUT:
      console.log(action);
      return {
        ...state,
        pwInput: action.meta.input,
      };
    default:
      return state;
  }
}
*/
