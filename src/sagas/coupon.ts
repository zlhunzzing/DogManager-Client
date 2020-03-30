import { takeLatest, call, put, takeEvery, all, select, take } from 'redux-saga/effects';

import axios from 'axios';
import {
  userCouponListUrl,
  adminCounponListUrl,
  userCouponPostUrl,
  adminCouponPostUrl,
  adminCounponViewListUrl,
} from '../server';

import moment from 'moment';
import { eventCondition } from './evnet';

import {
  axiosAdminCouponListRequest,
  axiosAdminCouponListSuccess,
  axiosAdminCouponListFailure,
  axiosUserCouponListRequest,
  axiosUserCouponListSuccess,
  axiosUserCouponListFailure,
  axiosUserCouponPostRequest,
  axiosAdminCouponDeleteRequest,
  axiosAdminCouponViewListRequest,
  axiosAdminCouponViewListSuccess,
  axiosAdminCouponViewListFailure,
} from '../modules/coupon';
import { EventData } from '../modules/event';

/////////////////////////////////////////////////////////////////////////////////////
// 어드민 쿠폰 뷰 리스트 요청
function* axiosAdminCouponViewList$() {
  try {
    const adminCouponViewList = yield call(async () => {
      const res = await axios.get(adminCounponViewListUrl, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      console.log('res.data: ', res.data);
      return res.data.couponList;
    });
    yield put({
      type: axiosAdminCouponViewListSuccess.type,
      payload: adminCouponViewList,
    });
  } catch (err) {
    yield put({ type: axiosAdminCouponViewListFailure.type, payload: [] });
  }
}
export function* axiosAdminCouponViewListSaga() {
  yield takeEvery(axiosAdminCouponViewListRequest, axiosAdminCouponViewList$);
}
// 어드민 쿠폰 리스트 요청
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

// 어드민 - 쿠폰 삭제 요청 (로그인 필요)
function* axiosAdminCouponDelete$(action: any) {
  try {
    console.log(action.payload);

    const result = yield call(async () => {
      const res = await axios.delete(adminCouponPostUrl + `/${action.payload.id}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      return res;
    });
    if (result.status === 200) {
      alert('삭제완료');
      action.payload.history.go('/admin/coupon');
    }
  } catch (err) {}
}

export function* axiosAdminCouponDeleteSaga() {
  yield takeEvery(axiosAdminCouponDeleteRequest, axiosAdminCouponDelete$);
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

//////////////////////////////////////////////////////////////////////////////////////

// 날짜시간데이터 value "2020-03-18T23:00" -> DB 형식으로
export function makeDateTimeForm(input: string): string {
  if (input === '') {
    return '';
  }
  console.log(input);
  const ss =
    input.slice(0, 4) +
    input.slice(5, 7) +
    input.slice(8, 10) +
    input.slice(11, 13) +
    input.slice(14, 16);
  console.log(ss);
  return ss;
}

// 유저가 쿠폰 등록 (로그인 필요)

function* axiosUserCouponPost$(): Generator {
  try {
    const getCouponCode = (state: any) => state.event.nowEvent.couponCode;
    const getPeriod = (state: any) => state.event.nowEvent.period;
    const couponCode = yield select(getCouponCode);
    const period = yield select(getPeriod);
    const expiredAt = moment()
      .add(Number(period), 'd')
      .format('YYYYMMDDHHmm');

    yield call(async () => {
      const res = await axios.post(
        userCouponPostUrl,
        {
          couponCode: couponCode,
          expiredAt: expiredAt,
        },
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        },
      );
      if (res.data === 'success') {
        alert('쿠폰이 등록되었습니다.');
      }
    });
  } catch (err) {
    if (err.response.data === 'duplicate') {
      alert('이미 등록된 쿠폰입니다.');
    }
  }
}

export function* axiosUserCouponPostSaga(): Generator {
  yield takeEvery(axiosUserCouponPostRequest, axiosUserCouponPost$);
}

/////////////////////////////////////////////////////////////////////////////////////

export function* couponSaga() {
  yield all([
    axiosAdminCouponListSaga(),
    axiosAdminCouponDeleteSaga(),
    axiosUserCouponListSaga(),
    axiosUserCouponPostSaga(),
    axiosAdminCouponViewListSaga(),
  ]);
}
