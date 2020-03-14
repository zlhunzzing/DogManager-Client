import { combineReducers } from 'redux';
import { AdminState, adminReducer as admin } from './admin';
import { EventState, eventReducer as event } from './event';

// 페이지 별로 작성할 예정

export interface StoreState {
  admin: AdminState;
  event: EventState;
}

export default combineReducers<StoreState>({
  admin,
  event,
});
