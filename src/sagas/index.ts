import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { AXIOS_EVENT_LIST_REQUEST, AXIOS_EVENT_LIST_SUCCESS } from '../modules/event';

function* axiosEventList$() {
  console.log('왜 안찍혀요?');
  try {
    console.log('여기는 되나?');
    const eventList = yield call(() => {
      console.log('서버에 이벤트 리스트 요청하는 함수임');
      return [
        {
          id: 11,
          eventTitle: '이벤트명',
          startDate: 20200401,
          endDate: 20200430,
          detailPageUrl: '주소',
        },
        {
          id: 12,
          eventTitle: '이벤트명2',
          startDate: 20200301,
          endDate: 20200331,
          detailPageUrl: '주소',
        },
        {
          id: 13,
          eventTitle: '이벤트명3',
          startDate: 20200201,
          endDate: 20200301,
          detailPageUrl: '주소',
        },
      ];
      // 리턴값에 일단 페이크 데이터 넣어주기
    }); // 여기서 서버 API 함수를 call 안에 넣어준다
    /*
    이팩터 중에 call() 함수는 인자로 받은 함수를 실행해 주는 역할을 한다.
    전달 받은 함수가 프라미스를 반환하는 경우 프라미스가 처리될 때까지 제너레이터를 중지 시킨다.
    프라미스가 리졸브(resolve)되면 그 값으로 제네레이터를 다시 시작하고
    리젝트(reject)되면 제네레이터는 에러를 던지는 동작을 한다.*/

    yield put({ type: AXIOS_EVENT_LIST_SUCCESS, meta: { input: eventList } });
  } catch (err) {
    // 실패 로직: 나중에 작성할 것임
  }
}

export default function* rootSaga() {
  yield takeLatest(AXIOS_EVENT_LIST_REQUEST, axiosEventList$);
  /*takeLatest() 함수는 스토어에 들어오는 액션을 보고 있다가
  특정 액션만 잡아서 로직을 수행해주는 기능을 한다. */
}

// function* rootSaga() {
//   yield console.log('hello world');
// }
