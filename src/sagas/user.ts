import { takeLatest, call, put, takeEvery, all, delay } from 'redux-saga/effects';

import axios from 'axios';
import { adminSigninUrl, userSigninUrl } from '../server';

import {
  axiosAdminSigninRequest,
  axiosUserSigninRequest,
  changeIdInput,
  changePwInput,
} from '../modules/signin';

import { changeIsLogin, changeUserId } from '../modules/user';

//////////////////////////////////////////////////////////////////////////////////////

// admin signin 요청
function* axiosAdminSignin$(action: any) {
  try {
    const res = yield call(async () => {
      return await axios.post(adminSigninUrl, {
        email: action.payload.email,
        password: action.payload.password,
      });
    });

    localStorage.setItem('adminAccessToken', res.data.token);
    yield put({ type: changeIdInput.type, payload: '' });
    yield put({ type: changePwInput.type, payload: '' });
    // yield put({ type: changeIsLogin.type, payload: true });
    action.payload.history.push('/admin/event-list');
  } catch (err) {
    alert('이메일 또는 비밀번호가 맞지 않습니다.');
  }
}

function* axiosAdminSigninSaga(): Generator {
  yield takeEvery(axiosAdminSigninRequest, axiosAdminSignin$);
}

// user signin 요청
function* axiosUserSignin$(action: any) {
  console.log('액션', action);
  try {
    const res = yield call(async () => {
      return await axios.post(userSigninUrl, {
        email: action.payload.email,
        password: action.payload.password,
      });
    });

    localStorage.setItem('accessToken', res.data.token);
    yield put({ type: changeIdInput.type, payload: '' });
    yield put({ type: changePwInput.type, payload: '' });
    yield put({ type: changeIsLogin.type, payload: true });
    yield put({ type: changeUserId.type, payload: res.data.userId });
    action.payload.history.push('/user');
  } catch (err) {
    alert('이메일 또는 비밀번호가 맞지 않습니다.');
  }
}

function* axiosUserSigninSaga(): Generator {
  yield takeEvery(axiosUserSigninRequest, axiosUserSignin$);
}

// signup 요청

//////////////////////////////////////////////////////////////////////////////////////

export function* userSaga(): Generator {
  yield all([axiosAdminSigninSaga(), axiosUserSigninSaga()]);
}
