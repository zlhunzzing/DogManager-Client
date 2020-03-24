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
