import { takeLatest, call, put, takeEvery, all } from 'redux-saga/effects';

import axios from 'axios';
import { userCouponListUrl, adminCounponListUrl } from '../server';

import {
  axiosAdminCouponListRequest,
  axiosAdminCouponListSuccess,
  axiosAdminCouponListFailure,
  axiosUserCouponListRequest,
  axiosUserCouponListSuccess,
  axiosUserCouponListFailure,
} from '../modules/coupon';

function* axiosAdminCouponList$() {
  try {
    const adminCouponList = yield call(async () => {
      const res = await axios.get(adminCounponListUrl, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      console.log(res.data);
      return res.data.couponList;
    });
    yield put({ type: axiosAdminCouponListSuccess.type, payload: adminCouponList });
  } catch (err) {
    yield put({ type: axiosAdminCouponListFailure.type, payload: [] });
  }
}
export function* axiosAdminCouponListSaga() {
  yield takeEvery(axiosAdminCouponListRequest, axiosAdminCouponList$);
}

// 서버에 내 쿠폰 리스트 요청 (로그인 필요)

function* axiosUserCouponList$() {
  try {
    const userCouponList = yield call(async () => {
      const res = await axios.get(userCouponListUrl, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      console.log(res.data);
      return res.data.couponList;
    });
    yield put({ type: axiosUserCouponListSuccess.type, payload: userCouponList });
  } catch (err) {
    yield put({ type: axiosUserCouponListFailure.type, payload: [] });
  }
}

export function* axiosUserCouponListSaga() {
  yield takeEvery(axiosUserCouponListRequest, axiosUserCouponList$);
}

/////////////////////////////////////////////////////////////////////////////////////

export function* couponSaga() {
  yield all([axiosAdminCouponListSaga(), axiosUserCouponListSaga()]);
}
