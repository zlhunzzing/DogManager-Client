export interface EventData {
  id: number;
  eventTitle: string;
  startDate: number;
  endDate: number;
  detailPageUrl: string;
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
function SelectEvent(input: EventData): object {
  return {
    type: SELECT_EVENT,
    meta: {
      input,
    },
  };
}

function ChangeFilter(input: string): object {
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
