import { takeLatest, call, put, takeEvery, all } from 'redux-saga/effects';

import moment from 'moment';
import axios from 'axios';
import { adminEventListUrl, userEventListUrl, userEventUrl } from '../server';

/*
export const userEventListUrl = server + '/api/user/events/list';
export const userEventUrl = server + '/api/user/events/entry/'; //:url
*/

import {
  axiosAdminEventListRequest,
  axiosAdminEventListSuccess,
  axiosAdminEventListFailure,
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

//////////////////////////////////////////////////////////////////////////////////////

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
      //   if (filter === '모두') {
      //     EventActions.changeEventList(eventList);
      //   } else {
      //     const filterdList = eventList.filter((element: any) => {
      //       return element.condition === filter;
      //     });
      //     EventActions.changeEventList(filterdList);
      //   }
      return eventList;
    });
    yield put({ type: axiosAdminEventListSuccess.type, payload: userEventList });
  } catch (err) {
    // 실패 로직: 나중에 작성할 것임
    console.log(err);
    yield put({ type: axiosAdminEventListFailure.type, payload: [] });
  }
}

export function* axiosAdminEventListSaga() {
  yield takeEvery(axiosAdminEventListRequest, axiosAdminEventList$);
}

// 서버에 수정할 이벤트 상세 정보 요청 -> success 액션 발생

// 서버에 유저 이벤트 리스트 요청 -> success 액션 발생
function* axiosUserEventList$() {
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
function* axiosUserEvent$() {
  try {
    const nowEvent = yield call(async () => {
      const res = await axios.get(userEventUrl + 'url');
      return res.data;
    });
    yield put({ type: axiosUserEventSuccess.type, payload: nowEvent });
  } catch (err) {
    // 실패 로직: 나중에 작성할 것임
  }
}

export function* userEventSaga() {
  yield takeEvery(axiosUserEventRequest, axiosUserEventList$);
}

export function* eventSaga() {
  yield all([axiosAdminEventListSaga(), axiosUserEventListSaga()]);
}
