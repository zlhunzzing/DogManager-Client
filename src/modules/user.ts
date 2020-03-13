export interface UserSigninDataParams {
    idInput: string;
    pwInput: string;
}

// signinData는 로그인 요청하고 나서 바로 초기화
export interface UserState {
    signinData : UserSigninDataParams;
    idInput: string;
    pwInput: string;
    isLogin : boolean;
}

// export const TOGGLE = "todo/TOGGLE";
export const CHANGE_ID_INPUT = "user/CHANGE_ID_INPUT";
export const CHANGE_PW_INPUT = "user/CHANGE_PW_INPUT";

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

export type UserActionTypes =
  | ChangeIdInputAction
  | ChangePwInputAction;


// actions

function changeIdInput(input: string) {
    return {
      type: CHANGE_ID_INPUT,
      meta: {
        input
      }
    };
}

function changePwInput(input: string) {
    return {
      type: CHANGE_PW_INPUT,
      meta: {
        input
      }
    };
}

export const actionCreators = {
    changeIdInput,
    changePwInput
};

// reducers

const initialState: UserState = {
    signinData: {idInput:"", pwInput: ""},
    isLogin: false,
    idInput: "",
    pwInput: ""
};


export function userReducer(
    state = initialState,
    action: UserActionTypes
  ): UserState {
    switch (action.type) {
      case CHANGE_ID_INPUT:
          console.log(action)
        return {
          ...state,
          signinData: Object.assign({}, state.signinData, {idInput: action.meta.input})
        };
        case CHANGE_PW_INPUT:
          console.log(action)
        return {
          ...state,
          signinData: Object.assign({}, state.signinData, {pwInput: action.meta.input})
        };
      default:
        return state;
    }
  }