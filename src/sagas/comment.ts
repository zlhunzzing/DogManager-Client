import {
  takeLatest,
  call,
  put,
  takeEvery,
  all,
  select,
  take,
  actionChannel,
} from 'redux-saga/effects';

import axios from 'axios';
import { userCommentUrl, userCommentThumbUrl, userCommentThumbListUrl } from '../server';

import {
  changeUserThumbList,
  axiosCommentPostRequest,
  axiosCommentPutRequest,
  axiosCommentDeleteRequest,
  axiosCommentThumbListRequest,
  axiosUserCommentThumbUpRequest,
  axiosUserCommentThumbDownRequest,
} from '../modules/comment';

import { changeNowEventCommentList } from '../modules/event';
//------------------------------------------------------------------------------------

// 1. 이벤트 댓글 등록 요청 (로그인 필요)------------------------------------------------

function* axiosUserCommentPost$(action: any): Generator {
  try {
    const getCommentContent = (state: any) => state.comment.commentInput;
    const content = yield select(getCommentContent);
    const newCommentList = yield call(async () => {
      const res = await axios.post(
        userCommentUrl,
        { content: content, eventId: action.payload },
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        },
      );
      console.log(res.data);
      return res.data.commentList;
    });
    console.log(newCommentList);
    yield put({ type: changeNowEventCommentList.type, payload: newCommentList });
  } catch (err) {
    // 등록 실패
  }
}

export function* axiosUserCommentPostSaga(): Generator {
  yield takeEvery(axiosCommentPostRequest, axiosUserCommentPost$);
}

// 2. 이벤트 댓글 수정 요청 (로그인 필요)------------------------------------------------

function* axiosUserCommentPut$(action: any): Generator {
  try {
    console.log('수정', action.payload);
    // const newCommentList = yield call(async () => {
    //   const res = await axios.put(
    //     userCommentUrl + '/commentId',
    //     { content: '', eventId: '' },
    //     {
    //       headers: {
    //         Authorization: localStorage.getItem('accessToken'),
    //       },
    //     },
    //   );
    //   console.log(res.data);
    //   return res.data.commentList;
    // });
    // yield put({ type: changeNowEventCommentList.type, payload: newCommentList });
  } catch (err) {
    // 수정 실패
  }
}

export function* axiosUserCommentPutSaga(): Generator {
  yield takeEvery(axiosCommentPutRequest, axiosUserCommentPut$);
}

// 3. 이벤트 댓글 삭제 요청 (로그인 필요)------------------------------------------------

function* axiosUserCommentDelete$(action: any): Generator {
  try {
    const newCommentList = yield call(async () => {
      const res = await axios.delete(userCommentUrl + `/${action.payload}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      console.log(res.data);
      return res.data.commentList;
    });

    yield put({ type: changeNowEventCommentList.type, payload: newCommentList });
  } catch (err) {
    //삭제 실패?
  }
}

export function* axiosUserCommentDeleteSaga(): Generator {
  yield takeEvery(axiosCommentDeleteRequest, axiosUserCommentDelete$);
}

// 4. 이벤트 댓글 좋아요 플러스 요청 (로그인 필요)---------------------------------------------

function* axiosUserCommentThumbPost$(action: any): Generator {
  try {
    const newCommentLists: any = yield call(async () => {
      const res = await axios.post(
        userCommentThumbUrl + `/${action.payload}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        },
      );
      console.log(res.data);
      return res.data;
    });

    const { commentList, userThumbsList } = newCommentLists;

    yield put({
      type: changeNowEventCommentList.type,
      payload: commentList,
    });
    yield put({
      type: changeUserThumbList.type,
      payload: userThumbsList,
    });
  } catch (err) {
    //삭제 실패?
  }
}

export function* axiosUserCommentThumbPostSaga(): Generator {
  yield takeEvery(axiosUserCommentThumbUpRequest, axiosUserCommentThumbPost$);
}

// 5. 이벤트 댓글 좋아요 마이너스 요청 (로그인 필요)---------------------------------------

function* axiosUserCommentThumbDelete$(action: any): Generator {
  try {
    const newCommentLists: any = yield call(async () => {
      const res = await axios.delete(userCommentThumbUrl + `/${action.payload}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      console.log(res.data);
      return res.data;
    });
    const { commentList, userThumbsList } = newCommentLists;
    yield put({ type: changeNowEventCommentList.type, payload: commentList });
    yield put({
      type: changeUserThumbList.type,
      payload: userThumbsList,
    });
  } catch (err) {
    //삭제 실패?
  }
}

export function* axiosUserCommentThumbDeleteSaga(): Generator {
  yield takeEvery(axiosUserCommentThumbDownRequest, axiosUserCommentThumbDelete$);
}

// 6. 좋아요 댓글 리스트 요청 (로그인 필요)-----------------------------------------------

function* axiosUserCommentThumbList$(action: any): Generator {
  try {
    const userThumbsList = yield call(async () => {
      const res = await axios.get(userCommentThumbListUrl + `/${action.payload}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      console.log(res.data);
      return res.data.userThumbsList;
    });
    yield put({ type: changeUserThumbList.type, payload: userThumbsList });
  } catch (err) {}
}

export function* axiosUserCommentThumbListSaga(): Generator {
  yield takeEvery(axiosCommentThumbListRequest, axiosUserCommentThumbList$);
}

//-------------------------------------------------------------------------------------

export function* commentSaga(): Generator {
  yield all([
    axiosUserCommentPostSaga(),
    axiosUserCommentPutSaga(),
    axiosUserCommentDeleteSaga(),

    axiosUserCommentThumbPostSaga(),
    axiosUserCommentThumbDeleteSaga(),
    axiosUserCommentThumbListSaga(),
  ]);
}
