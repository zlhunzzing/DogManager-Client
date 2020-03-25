import { call, put, takeEvery, all } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
// import { push } from 'react-router-redux';

import moment from 'moment';
import axios from 'axios';
import {
  adminEventListUrl,
  adminEventUrl,
  userEventListUrl,
  userEventUrl,
} from '../server';

import {
  axiosAdminEventListRequest,
  axiosAdminEventListSuccess,
  axiosAdminEventListFailure,
  axiosAdminEventDeleteRequest,
  axiosUserEventListRequest,
  axiosUserEventListSuccess,
  axiosUserEventListFailure,
  axiosUserEventRequest,
  axiosUserEventSuccess,
  axiosUserEventFailure,
} from '../modules/event';

// 이벤트 상태 필터링 함수
export const eventCondition = (start: string, end: string): string => {
  const now = Number(moment(new Date()).format('YYYYMMDDHHmm'));
  const startNum = Number(start);
  const endNum = Number(end);
  let result = '';
  if (endNum === 0 && startNum <= now) {
    result = '진행중';
  } else if (endNum === 0 && startNum > now) {
    result = '준비중';
  } else if (endNum < now) {
    result = '완료';
  } else if (startNum <= now) {
    result = '진행중';
  } else {
    result = '준비중';
  }
  return result;
};

// 이벤트 태그 만드는 함수 (미완성 / 유저 이벤트 리스트에 사용)
function makeTag(startDate: string, endDate: string): string {
  let tag: string;
  const now = Number(moment(new Date()).format('YYYYMMDDHHmm'));
  if (endDate === '' && startDate) {
    tag = '상시';
  }
  return endDate;
}

//////////////////////////////////////////////////////////////////////////////////////
// function forwardTo(location: any) {
//   history.push(location);
// }

// 서버에 어드민 이벤트 리스트 요청 -> success 액션 발생 (로그인 필요)
function* axiosAdminEventList$() {
  try {
    const userEventList = yield call(async () => {
      const res = await axios.get(adminEventListUrl, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      const { eventList } = res.data;
      eventList.forEach((event: any) => {
        const condition = eventCondition(event.startDate, event.endDate);
        event.condition = condition;
      });
      return eventList;
    });
    yield put({ type: axiosAdminEventListSuccess.type, payload: userEventList });
  } catch (err) {
    // 실패 로직: Redirect를 해주고 싶은데 잘 안 됨
    console.log(err);
    // yield put(push('/'));
    // yield call(forwardTo, '/');
    yield put({ type: axiosAdminEventListFailure.type, payload: null });
  }
}

export function* axiosAdminEventListSaga() {
  yield takeEvery(axiosAdminEventListRequest, axiosAdminEventList$);
}

// 서버에 수정할 이벤트 상세 정보 요청 -> success 액션 발생

// 어드민 이벤트 삭제 요청 (로그인 필요)
function* axiosAdminEventDelete$(action: any) {
  try {
    const result = yield call(async () => {
      return await axios.delete(adminEventUrl + `/${action.payload.id}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
    });
    if (result.status === 200) {
      alert('삭제완료');
      action.payload.history.go('/admin/event-list');
    }
  } catch (err) {}
}

export function* axiosAdminEventDeleteSaga() {
  yield takeEvery(axiosAdminEventDeleteRequest, axiosAdminEventDelete$);
}

// 서버에 유저 이벤트 리스트 요청 -> success 액션 발생
function* axiosUserEventList$(): Generator {
  try {
    console.log('saga미들웨어 진입');
    const userEventList = yield call(async () => {
      const res = await axios.get(userEventListUrl);
      return res.data.eventList;
    });
    yield put({ type: axiosUserEventListSuccess.type, payload: userEventList });
  } catch (err) {
    console.log(err.response);
    // alert('이렇게도 가능한가 혹시');
    yield put({ type: axiosUserEventListFailure.type, payload: [] });
  }
}
export function* axiosUserEventListSaga() {
  yield takeEvery(axiosUserEventListRequest, axiosUserEventList$);
}

// 서버에 유저 이벤트 상세 정보 요청 -> success 액션 발생
function* axiosUserEvent$(action: any): Generator {
  try {
    const nowEvent = yield call(async () => {
      const res = await axios.get(userEventUrl + `/${action.payload}`);
      console.log('응답', res);
      return res.data;
    });
    yield put({ type: axiosUserEventSuccess.type, payload: nowEvent });
  } catch (err) {
    // 실패 로직: 나중에 작성할 것임
    yield put({ type: axiosUserEventFailure.type, payload: null });
  }
}

export function* axiosUserEventSaga(): Generator {
  yield takeEvery(axiosUserEventRequest, axiosUserEvent$);
}

//////////////////////////////////////////////////////////////////////////////////////

export function* eventSaga(): Generator {
  yield all([
    axiosAdminEventListSaga(),
    axiosUserEventListSaga(),
    axiosUserEventSaga(),
    axiosAdminEventDeleteSaga(),
  ]);
}
