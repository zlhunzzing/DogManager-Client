import { takeLatest, call, put, takeEvery, all, delay } from 'redux-saga/effects';

import axios from 'axios';
import { adminSigninUrl, userSigninUrl } from '../server';

import {
  axiosAdminSigninRequest,
  axiosUserSigninRequest,
  changeIdInput,
  changePwInput,
} from '../modules/signin';

import { changeIsLogin } from '../modules/user';

//////////////////////////////////////////////////////////////////////////////////////

// admin signin 요청
function* axiosAdminSignin$(action: any) {
  try {
    delay(500);
    const res = yield call(async () => {
      return await axios.post(adminSigninUrl, action.payload);
    });
    if (res.status === 200) {
      localStorage.setItem('accessToken', res.data.token);
      yield put({ type: changeIdInput.type, payload: '' });
      yield put({ type: changePwInput.type, payload: '' });
      yield put({ type: changeIsLogin.type, payload: true });
    }
  } catch (err) {
    alert('이메일 또는 비밀번호가 맞지 않습니다.');
  }
}

function* axiosAdminSigninSaga(): Generator {
  yield takeEvery(axiosAdminSigninRequest, axiosAdminSignin$);
}

// user signin 요청
function* axiosUserSignin$(action: any) {
  try {
    delay(500);
    const res = yield call(async () => {
      return await axios.post(userSigninUrl, action.payload);
    });
    if (res.status === 200) {
      localStorage.setItem('accessToken', res.data.token);
      yield put({ type: changeIdInput.type, payload: '' });
      yield put({ type: changePwInput.type, payload: '' });
      yield put({ type: changeIsLogin.type, payload: true });
    }
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
