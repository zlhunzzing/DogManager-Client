import { all } from 'redux-saga/effects';

import { couponSaga } from './coupon';
import { eventSaga } from './evnet';
import { userSaga } from './user';
import { commentSaga } from './comment';

export default function* rootSaga(): Generator {
  yield all([couponSaga(), eventSaga(), userSaga(), commentSaga()]);
}
