import { combineReducers } from 'redux';
import { AdminState, adminReducer as admin } from './admin';
import { EventState, eventReducer as event } from './event';
import { SigninState, signinReducer as signin } from './signin';
import { SignupState, signupReducer as signup } from './signup';

// 페이지가 아니라 뷰 별로 나눠야 할 것 같은데...

export interface StoreState {
  admin: AdminState;
  event: EventState;
  signin: SigninState;
  signup: SignupState;
}

export default combineReducers<StoreState>({
  admin,
  event,
  signin,
  signup,
});
