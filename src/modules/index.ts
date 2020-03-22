//? 모듈 불러오기
import { combineReducers } from 'redux';
//? components 불러오기
import { AdminState, adminReducer as admin } from './admin';
import { EventState, eventReducer as event } from './event';
import { SigninState, signinReducer as signin } from './signin';
import { SignupState, signupReducer as signup } from './signup';
import { EventEditState, eventEditReducer as eventEdit } from './eventEdit';
import { UserEventState, userEventReducer as userEvent } from './userEvent';
import { UserState, userReducer as user } from './user';

export interface StoreState {
  admin: AdminState;
  event: EventState;
  signup: SignupState;
  eventEdit: EventEditState;
  userEvent: UserEventState;
  user: UserState;
  signin: SigninState;
}

export default combineReducers<StoreState>({
  admin,
  event,
  signup,
  eventEdit,
  userEvent,
  user,
  signin,
});
