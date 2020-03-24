import { all } from 'redux-saga/effects';

import { couponSaga } from './coupon';
import { eventSaga } from './evnet';
import { userSaga } from './user';

export default function* rootSaga() {
  yield all([couponSaga(), eventSaga(), userSaga()]);
}
