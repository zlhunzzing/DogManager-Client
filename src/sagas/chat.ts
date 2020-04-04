import { takeLatest, call, put, takeEvery, all, select, take } from 'redux-saga/effects';

import axios from 'axios';
import { adminChatRoomGetUrl } from '../server';

import moment from 'moment';

import {
  axiosUserChatListRequest,
  axiosUserChatListSuccess,
  axiosUserChatListFailure,
} from '../modules/chat';

/////////////////////////////////////////////////////////////////////////////////////

function* axiosUserChatList$() {
  try {
    const userChatList = yield call(async () => {
      const res = await axios.get(adminChatRoomGetUrl, {
        headers: {
          Authorization: localStorage.getItem('adminAccessToken'),
        },
      });
      console.log('res.data: ', res.data);
      return res.data.roomList;
    });
    yield put({
      type: axiosUserChatListSuccess.type,
      payload: userChatList,
    });
  } catch (err) {
    yield put({ type: axiosUserChatListFailure.type, payload: [] });
  }
}

export function* axiosUserChatListSaga() {
  yield takeEvery(axiosUserChatListRequest, axiosUserChatList$);
}

/////////////////////////////////////////////////////////////////////////////////////

export function* chatSaga() {
  yield all([axiosUserChatListSaga()]);
}
