export interface EventEditState {
  eventTitle: string;
  startDate: string;
  endDate: string;
  pageImageFile: File | null;
  pageImageFileName: string;
  bannerImageFile: File | null;
  bannerImageFileName: string;
  buttonImageFile: File | null;
  buttonImageFileName: string;
  detailPageUrl: string;
  isChecked: boolean;
}
//! type
export const CHANGE_EVENT_TITLE = 'eventEdit/CHANGE_EVENT_TITLE';
export const CHANGE_START_DATE = 'eventEdit/CHANGE_START_DATE';
export const CHANGE_END_DATE = 'eventEdit/CHANGE_END_DATE';
export const CHANGE_PAGE_IMAGE = 'eventEdit/CHANGE_PAGE_IMAGE';
export const CHANGE_BANNER_IMAGE = 'eventEdit/CHANGE_BANNER_IMAGE';
export const CHANGE_BUTTON_IMAGE = 'eventEdit/CHANGE_BUTTON_IMAGE';
export const CHANGE_PAGE_URL = 'eventEdit/CHANGE_PAGE_URL';
export const CHANGE_ISCHECKED = 'eventEdit/CHANGE_isChecked';

interface ChangeEventTitleAction {
  type: typeof CHANGE_EVENT_TITLE;
  meta: { input: string };
}

interface ChangeStartDateAction {
  type: typeof CHANGE_START_DATE;
  meta: { input: string };
}

interface ChangeEndDateAction {
  type: typeof CHANGE_END_DATE;
  meta: { input: string };
}

interface ChangePageImageAction {
  type: typeof CHANGE_PAGE_IMAGE;
  meta: { input: File };
}
interface ChangeBannerImageAction {
  type: typeof CHANGE_BANNER_IMAGE;
  meta: { input: File };
}
interface ChangeButtonImageAction {
  type: typeof CHANGE_BUTTON_IMAGE;
  meta: { input: File };
}

interface ChangePageUrlAction {
  type: typeof CHANGE_PAGE_URL;
  meta: { input: string };
}
interface ChangeIsCheckedAction {
  type: typeof CHANGE_ISCHECKED;
  meta: { input: boolean };
}

export type EevntEditActionTypes =
  | ChangeEventTitleAction
  | ChangeStartDateAction
  | ChangeEndDateAction
  | ChangePageImageAction
  | ChangeBannerImageAction
  | ChangeButtonImageAction
  | ChangePageUrlAction
  | ChangeIsCheckedAction;

//! actions
function changeEventTitle(input: string): object {
  return {
    type: CHANGE_EVENT_TITLE,
    meta: { input },
  };
}
function changeStartData(input: string): object {
  return {
    type: CHANGE_START_DATE,
    meta: { input },
  };
}
function changeEndDate(input: string): object {
  return {
    type: CHANGE_END_DATE,
    meta: { input },
  };
}
function changePageImage(input: File): object {
  return {
    type: CHANGE_PAGE_IMAGE,
    meta: { input },
  };
}
function changeBannerImage(input: File): object {
  return {
    type: CHANGE_BANNER_IMAGE,
    meta: { input },
  };
}
function changeButtonImage(input: File): object {
  return {
    type: CHANGE_BUTTON_IMAGE,
    meta: { input },
  };
}

function changePageUrl(input: string): object {
  return {
    type: CHANGE_PAGE_URL,
    meta: { input },
  };
}
function changeIsChecked(input: boolean): object {
  return {
    type: CHANGE_ISCHECKED,
    meta: { input },
  };
}

export const actionCreators = {
  changeEventTitle,
  changeStartData,
  changeEndDate,
  changePageImage,
  changeBannerImage,
  changeButtonImage,
  changePageUrl,
  changeIsChecked,
};

const initialState: EventEditState = {
  eventTitle: '',
  startDate: '',
  endDate: '',
  pageImageFile: null,
  pageImageFileName: '',
  bannerImageFile: null,
  bannerImageFileName: '',
  buttonImageFile: null,
  buttonImageFileName: '',
  detailPageUrl: '',
  isChecked: false,
};
//! reducers
export function eventEditReducer(
  state = initialState,
  action: EevntEditActionTypes,
): EventEditState {
  switch (action.type) {
    case CHANGE_EVENT_TITLE:
      return {
        ...state,
        eventTitle: action.meta.input,
      };
    case CHANGE_START_DATE:
      return {
        ...state,
        startDate: action.meta.input,
      };
    case CHANGE_END_DATE:
      return {
        ...state,
        endDate: action.meta.input,
      };
    case CHANGE_PAGE_IMAGE:
      return {
        ...state,
        pageImageFile: action.meta.input,
        pageImageFileName: action.meta.input.name,
      };
    case CHANGE_BANNER_IMAGE:
      return {
        ...state,
        bannerImageFile: action.meta.input,
        bannerImageFileName: action.meta.input.name,
      };
    case CHANGE_BUTTON_IMAGE:
      return {
        ...state,
        buttonImageFile: action.meta.input,
        buttonImageFileName: action.meta.input.name,
      };
    case CHANGE_PAGE_URL:
      return {
        ...state,
        detailPageUrl: action.meta.input,
      };
    case CHANGE_ISCHECKED:
      return {
        ...state,
        isChecked: action.meta.input,
      };
    default:
      return state;
  }
}
