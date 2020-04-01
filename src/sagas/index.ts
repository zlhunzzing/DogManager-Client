import { all } from 'redux-saga/effects';

import { couponSaga } from './coupon';
import { chatSaga } from './chat';
import { eventSaga } from './evnet';
import { userSaga } from './user';
import { commentSaga } from './comment';

export default function* rootSaga(): Generator {
  yield all([chatSaga(), couponSaga(), eventSaga(), userSaga(), commentSaga()]);
}
