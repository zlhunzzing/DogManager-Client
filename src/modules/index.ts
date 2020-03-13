import { combineReducers } from 'redux';
import { UserState, userReducer as user } from './user';

// 페이지 별로 작성할 예정

export interface StoreState {
    user: UserState;
}

export default combineReducers<StoreState>({
    user
});