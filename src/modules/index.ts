//? 모듈 불러오기
import { combineReducers } from 'redux';
//? components 불러오기
import { AdminState, adminReducer as admin } from './admin';
import { EventState, eventReducer as event } from './event';
import { SigninState, signinReducer as signin } from './signin';
import { SignupState, signupReducer as signup } from './signup';
import { EventEditState, eventEditReducer as eventEdit } from './eventEdit';
import { UserState, userReducer as user } from './user';
import { CouponEditState, couponEditReducer as couponEdit } from './couponEdit';
import { CommentState, commentReducer as comment } from './comment';
import { CouponState, couponReducer as coupon } from './coupon';

export interface StoreState {
  admin: AdminState;
  user: UserState;
  signup: SignupState;
  signin: SigninState;
  event: EventState;
  eventEdit: EventEditState;
  coupon: CouponState;
  couponEdit: CouponEditState;
  comment: CommentState;
}

export default combineReducers<StoreState>({
  admin,
  user,
  signup,
  signin,
  event,
  eventEdit,
  coupon,
  couponEdit,
  comment,
});
