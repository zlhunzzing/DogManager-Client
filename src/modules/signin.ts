// import { createAction, createReducer } from '@reduxjs/toolkit';

// export const changeIdInput = createAction('signin/CHANGE_ID_INPUT');
// export const changePwInput = createAction('signin/CHANGE_PW_INPUT');

// export const signinReducer = createReducer([], {
//   ['signin/CHANGE_ID_INPUT']: (state, action) => {
//     console.log(action);
//     return;
//   },
//   ['signin/CHANGE_PW_INPUT']: (state, action) => {
//     console.log(action);
//     return;
//   },
// });

// addTodo("Write more docs"); // 아래의 객체를 리턴한다.
/**
 * {
 *   type: 'todos/add',
 *   payload: {
 *     text: 'Write more docs',
 *     createdAt: '2019-10-03T07:53:36.581Z'
 *   }
 * }
 **/

// 리덕스 툴킷 적용 전 코드

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
