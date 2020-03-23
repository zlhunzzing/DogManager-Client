import { takeLatest, call, put, takeEvery, all } from 'redux-saga/effects';
// import { AXIOS_EVENT_LIST_REQUEST, AXIOS_EVENT_LIST_SUCCESS } from '../modules/event';
import { couponSaga } from './coupon';
import { eventSaga } from './evnet';
// function* axiosEventList$() {
//   try {
//     console.log('여기는 되나?');
//     const eventList = yield call(() => {
//       console.log('서버에 이벤트 리스트 요청하는 함수임');
//       return [
//         {
//           id: 11,
//           eventTitle: '이벤트명',
//           startDate: 20200401,
//           endDate: 20200430,
//           detailPageUrl: '주소',
//         },
//         {
//           id: 12,
//           eventTitle: '이벤트명2',
//           startDate: 20200301,
//           endDate: 20200331,
//           detailPageUrl: '주소',
//         },
//         {
//           id: 13,
//           eventTitle: '이벤트명3',
//           startDate: 20200201,
//           endDate: 20200301,
//           detailPageUrl: '주소',
//         },
//       ];
//     });

//     yield put({ type: AXIOS_EVENT_LIST_SUCCESS, meta: { input: eventList } });
//   } catch (err) {}
// }
// function* saga() {
//   yield takeLatest(AXIOS_EVENT_LIST_REQUEST, axiosEventList$);
// }

export default function* rootSaga() {
  yield all([couponSaga(), eventSaga()]);
}
