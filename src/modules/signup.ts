export interface SignupState {
  nameInput: string;
  emailInput: string;
  pwInput: string;
  mobileInput: string;
}

// export const TOGGLE = "todo/TOGGLE";
export const CHANGE_NAME_INPUT = 'signup/CHANGE_NAME_INPUT';
export const CHANGE_EMAIL_INPUT = 'signup/CHANGE_EMAIL_INPUT';
export const CHANGE_PW_INPUT = 'signup/CHANGE_PW_INPUT';
export const CHANGE_MOBILE_INPUT = 'signup/CHANGE_MOBILE_INPUT';

interface ChangeNameInputAction {
  type: typeof CHANGE_NAME_INPUT;
  meta: {
    input: string;
  };
}

interface ChangeEmailInputAction {
  type: typeof CHANGE_EMAIL_INPUT;
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

interface ChangeMobileInputAction {
  type: typeof CHANGE_MOBILE_INPUT;
  meta: {
    input: string;
  };
}

export type SignupActionTypes =
  | ChangeNameInputAction
  | ChangeEmailInputAction
  | ChangePwInputAction
  | ChangeMobileInputAction;

// actions

function changeNameInput(input: string): object {
  return {
    type: CHANGE_NAME_INPUT,
    meta: {
      input,
    },
  };
}
function changeEmailInput(input: string): object {
  return {
    type: CHANGE_EMAIL_INPUT,
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
function changeMobileInput(input: string): object {
  return {
    type: CHANGE_MOBILE_INPUT,
    meta: {
      input,
    },
  };
}

export const actionCreators = {
  changeNameInput,
  changeEmailInput,
  changePwInput,
  changeMobileInput,
};

// reducers

const initialState: SignupState = {
  nameInput: '',
  emailInput: '',
  pwInput: '',
  mobileInput: '',
};

export function signupReducer(
  state = initialState,
  action: SignupActionTypes,
): SignupState {
  switch (action.type) {
    case CHANGE_NAME_INPUT:
      return {
        ...state,
        nameInput: action.meta.input,
      };
    case CHANGE_EMAIL_INPUT:
      return {
        ...state,
        emailInput: action.meta.input,
      };
    case CHANGE_PW_INPUT:
      return {
        ...state,
        pwInput: action.meta.input,
      };
    case CHANGE_MOBILE_INPUT:
      console.log('signupReducer-case-CHANGE_MOBILE_INPUT:', action);
      return {
        ...state,
        mobileInput: action.meta.input,
      };
    default:
      return state;
  }
}
