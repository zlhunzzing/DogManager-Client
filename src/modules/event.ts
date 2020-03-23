import { createSlice } from '@reduxjs/toolkit';

export interface EventData {
  id: number;
  eventTitle?: string;
  startDate?: number | undefined;
  endDate?: number | undefined;
  detailPageUrl?: string;
  buttonImage?: string;
  bannerImage?: string;
  pageImage?: string;
  condition?: string;
}

export interface EventState {
  adminEventList: EventData[];
  userEventList: EventData[];
  editEventId: string;
  nowEvent: EventData | null;
  adminFilter: string;
}

export const initialState: EventState = {
  adminEventList: [],
  userEventList: [],
  editEventId: '',
  nowEvent: null,
  adminFilter: '모두',
};

/////////////////////////////////////////////////////////////////////////////////////

export const eventSlice = createSlice({
  name: 'event',
  initialState: initialState,
  reducers: {
    axiosAdminEventListRequest: (state, action) => {
      console.log('/api/admin/events/list 요청');
    },
    axiosAdminEventListSuccess: (state, action) => {
      state.adminEventList = action.payload;
    },
    axiosAdminEventListFailure: (state, action) => {
      console.log('/api/admin/events/list 요청 실패');
    },

    axiosUserEventListRequest: (state, action) => {
      console.log('/api/user/events/list 요청');
    },
    axiosUserEventListSuccess: (state, action): void => {
      state.userEventList = action.payload;
    },
    axiosUserEventListFailure: (state, action): void => {
      console.log('/api/user/events/list 요청 실패');
    },

    axiosUserEventRequest: (state, action) => {
      console.log('/api/user/events/entry/:url 요청');
    },
    axiosUserEventSuccess: (state, action) => {
      state.nowEvent = action.payload;
    },
    axiosUserEventFailure: (state, action) => {
      console.log('/api/user/events/entry/:url 요청 실패');
    },

    changeEditEventId: (state, action) => {
      console.log('선택한 이벤트 아이디 바꾸기');
      state.editEventId = action.payload;
    },
  },
});

export const eventReducer = eventSlice.reducer;
export const {
  axiosAdminEventListRequest,
  axiosAdminEventListSuccess,
  axiosAdminEventListFailure,

  axiosUserEventListRequest,
  axiosUserEventListSuccess,
  axiosUserEventListFailure,

  axiosUserEventRequest,
  axiosUserEventSuccess,
  axiosUserEventFailure,

  changeEditEventId,
} = eventSlice.actions;

/////////////////////////////////////////////////////////////////////////////////////
// 툴킷 사용 전 코드
/*
export interface EventData {
  id: number;
  eventTitle?: string;
  startDate?: number | undefined;
  endDate?: number | undefined;
  detailPageUrl?: string;
  buttonImage?: string;
  bannerImage?: string;
  pageImage?: string;
  condition?: string;
}

export interface EventState {
  eventList: EventData[];
  selectedEvent: string | null;
  filter: string;
}

// 비동기 함수 처리가 들어가는 부분 액션 정의 (요청, 성공, 실패)
export const AXIOS_EVENT_LIST_REQUEST = 'event/AXIOS_EVENT_LIST_REQUEST';
export const AXIOS_EVENT_LIST_SUCCESS = 'event/AXIOS_EVENT_LIST_SUCCESS';
export const AXIOS_EVENT_LIST_FAILURE = 'event/AXIOS_EVENT_LIST_FAILURE';

// type
export const CHANGE_EVENT_LIST = 'event/CHANGE_EVENT_LIST'; // axios 웅앵 success로 바뀔거임
export const SELECT_EVENT = 'event/SELECT_EVENT';
export const CHANGE_FILTER = 'event/CHANGE_FILTER';

// 비동기 함수 요청 (useEffect에서 호출할 것임)
interface AxiosEventListRequestAction {
  type: typeof AXIOS_EVENT_LIST_REQUEST;
}

// 사가에서 request함수를 잡아서 아래의 액션을 실행하게 됨
interface AxiosEventListSuccessAction {
  type: typeof AXIOS_EVENT_LIST_SUCCESS;
  meta: {
    input: EventData[];
  };
}

interface ChangeEventListAction {
  type: typeof CHANGE_EVENT_LIST;
  meta: {
    input: EventData[];
  };
}

interface SelectEventAction {
  type: typeof SELECT_EVENT;
  meta: {
    input: string;
  };
}

interface ChangeFilterAction {
  type: typeof CHANGE_FILTER;
  meta: {
    input: string;
  };
}

export type EventActionTypes =
  | AxiosEventListRequestAction
  | AxiosEventListSuccessAction
  | ChangeEventListAction
  | SelectEventAction
  | ChangeFilterAction;

// actions

function axiosEventListRequest(): object {
  return {
    type: AXIOS_EVENT_LIST_REQUEST,
    // meta: {
    //   input,
    // },
  };
}

function axiosEventListSuccess(input: EventData[]): object {
  return {
    type: AXIOS_EVENT_LIST_SUCCESS,
    meta: {
      input,
    },
  };
}

function changeEventList(input: EventData[]): object {
  return {
    type: CHANGE_EVENT_LIST,
    meta: {
      input,
    },
  };
}

function selectEvent(input: string): object {
  return {
    type: SELECT_EVENT,
    meta: {
      input,
    },
  };
}

function changeFilter(input: string): object {
  return {
    type: CHANGE_FILTER,
    meta: {
      input,
    },
  };
}

export const actionCreators = {
  axiosEventListRequest,
  axiosEventListSuccess,
  changeEventList,
  selectEvent,
  changeFilter,
};

// reducers

// const fakeData: Array<EventData> = [
//   {
//     id: 11,
//     eventTitle: '이벤트명',
//     startDate: 20200401,
//     endDate: 20200430,
//     detailPageUrl: '주소',
//   },
//   {
//     id: 12,
//     eventTitle: '이벤트명2',
//     startDate: 20200301,
//     endDate: 20200331,
//     detailPageUrl: '주소',
//   },
//   {
//     id: 13,
//     eventTitle: '이벤트명3',
//     startDate: 20200201,
//     endDate: 20200301,
//     detailPageUrl: '주소',
//   },
// ];

const initialState: EventState = {
  eventList: [],
  selectedEvent: null,
  filter: '모두',
};

export function eventReducer(state = initialState, action: EventActionTypes): EventState {
  switch (action.type) {
    // case AXIOS_EVENT_LIST_REQUEST:
    //   return {
    //     ...state,
    //   };
    case AXIOS_EVENT_LIST_SUCCESS:
      return {
        ...state,
        eventList: action.meta.input,
      };
    case CHANGE_EVENT_LIST:
      return {
        ...state,
        eventList: action.meta.input,
      };
    case SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.meta.input,
      };
    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.meta.input,
      };
    default:
      return state;
  }
}
*/
