export interface EventData {
  id: number;
  eventTitle?: string;
  startDate?: number | undefined;
  endDate?: number | undefined;
  detailPageUrl?: string;
  buttonImage?: string;
  bannerImage?: string;
  pageImage?: string;
}

export interface EventState {
  eventLists: EventData[];
  selectedEvent: EventData | null;
  filter: string;
}

// type
export const CHANGE_EVENT_LISTS = 'event/CHANGE_EVENT_LISTS';
export const SELECT_EVENT = 'event/SELECT_EVENT';
export const CHANGE_FILTER = 'event/CHANGE_FILTER';

interface ChangeEventListsAction {
  type: typeof CHANGE_EVENT_LISTS;
  meta: {
    input: EventData[];
  };
}

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

export type EventActionTypes =
  | ChangeEventListsAction
  | SelectEventAction
  | ChangeFilterAction;

// actions

function ChangeEventLists(input: EventData[]): object {
  return {
    type: CHANGE_EVENT_LISTS,
    meta: {
      input,
    },
  };
}

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
  ChangeEventLists,
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
    case CHANGE_EVENT_LISTS:
      return {
        ...state,
        eventLists: action.meta.input,
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
