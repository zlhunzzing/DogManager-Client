export interface EventData {
  id: number;
  event_title: string;
  start_date: number;
  end_date: number;
  detail_page_url: string;
}

export interface EventState {
  eventLists: EventData[];
  selectedEvent: EventData | null;
  filter: string;
}

// type
export const SELECT_EVENT = 'event/SELECT_EVENT';
export const CHANGE_FILTER = 'event/CHANGE_FILTER';

interface SelectEventAction {
  type: typeof SELECT_EVENT;
  meta: {
    input: EventData;
  };
}

interface ChangeFilterAction {
  type: typeof CHANGE_FILTER;
  meta: {
    input: string;
  };
}

export type EventActionTypes = SelectEventAction | ChangeFilterAction;

// actions
function SelectEvent(input: EventData) {
  return {
    type: SELECT_EVENT,
    meta: {
      input,
    },
  };
}

function ChangeFilter(input: string) {
  return {
    type: CHANGE_FILTER,
    meta: {
      input,
    },
  };
}

export const actionCreators = {
  SelectEvent,
  ChangeFilter,
};

// reducers

const fakeData: Array<EventData> = [
  {
    id: 1,
    event_title: '이벤트명',
    start_date: 20200401,
    end_date: 20200430,
    detail_page_url: '주소',
  },
  {
    id: 2,
    event_title: '이벤트명2',
    start_date: 20200301,
    end_date: 20200331,
    detail_page_url: '주소',
  },
  {
    id: 3,
    event_title: '이벤트명3',
    start_date: 20200201,
    end_date: 20200301,
    detail_page_url: '주소',
  },
];

const initialState: EventState = {
  eventLists: fakeData,
  selectedEvent: null,
  filter: '모두',
};

export function eventReducer(state = initialState, action: EventActionTypes): EventState {
  switch (action.type) {
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
