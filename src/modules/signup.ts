export interface SignupState {
  idInput: string;
  pwInput: string;
}

// export const TOGGLE = "todo/TOGGLE";
export const CHANGE_ID_INPUT = 'signup/CHANGE_ID_INPUT';
export const CHANGE_PW_INPUT = 'signup/CHANGE_PW_INPUT';

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

export type SignupActionTypes = ChangeIdInputAction | ChangePwInputAction;

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

const initialState: SignupState = {
  idInput: '',
  pwInput: '',
};

export function signupReducer(
  state = initialState,
  action: SignupActionTypes,
): SignupState {
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
