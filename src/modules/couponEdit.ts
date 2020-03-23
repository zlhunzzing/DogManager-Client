//? 타입스크립트 type interface 설정하기

export interface CouponEditState {
  couponName: string;
  couponPageCode: string;
  couponDesc: string;
  couponPeriod: string; // number 로 바꾸면? initialState 어떻게?
  couponDiscount: string;
}

//! 1. 리덕스 엑션에 들어갈 type 설정

export const CHANGE_COUPON_NAME = 'couponEdit/CHANGE_COUPON_NAME';
export const CHANGE_COUPON_PAGE_CODE = 'couponEdit/CHANGE_COUPON_PAGE_CODE';
export const CHANGE_COUPON_DESC = 'couponEdit/CHANGE_COUPON_DESC';
export const CHANGE_COUPON_PERIOD = 'couponEdit/CHANGE_COUPON_PERIOD';
export const CHANGE_COUPON_DISCOUNT = 'couponEdit/CHANGE_COUPON_DISCOUNT';
//!--------------------------------------------------------------------------------------

interface ChangeCouponNameAction {
  type: typeof CHANGE_COUPON_NAME;
  meta: { input: string };
}
interface ChangeCouponPageCodeAction {
  type: typeof CHANGE_COUPON_PAGE_CODE;
  meta: { input: string };
}
interface ChangeCouponDescAction {
  type: typeof CHANGE_COUPON_DESC;
  meta: { input: string };
}
interface ChangeCouponPeriodAction {
  type: typeof CHANGE_COUPON_PERIOD;
  meta: { input: string };
}
interface ChangeCouponDiscount {
  type: typeof CHANGE_COUPON_DISCOUNT;
  meta: { input: string };
}
export type CouponEditActionTypes =
  | ChangeCouponNameAction
  | ChangeCouponPageCodeAction
  | ChangeCouponDescAction
  | ChangeCouponPeriodAction
  | ChangeCouponDiscount;

//! 2. 리더스 actions 만들기

function changeCouponName(input: string): object {
  return {
    type: CHANGE_COUPON_NAME,
    meta: { input },
  };
}
function changeCouponPageCode(input: string): object {
  return {
    type: CHANGE_COUPON_PAGE_CODE,
    meta: { input },
  };
}
function changeCouponDesc(input: string): object {
  return {
    type: CHANGE_COUPON_DESC,
    meta: { input },
  };
}
function changeCouponPeriod(input: string): object {
  return {
    type: CHANGE_COUPON_PERIOD,
    meta: { input },
  };
}
function changeCouponDiscount(input: string): object {
  return {
    type: CHANGE_COUPON_DISCOUNT,
    meta: { input },
  };
}

//!--------------------------------------------------------------------------------------

//! 리덕스 엑션들 actionCreators 변수에 담기
export const actionCreators = {
  changeCouponName,
  changeCouponPageCode,
  changeCouponDesc,
  changeCouponPeriod,
  changeCouponDiscount,
};

//!--------------------------------------------------------------------------------------
//! 3. 리덕스 state 만들기
export const initialState: CouponEditState = {
  couponName: '',
  couponPageCode: '',
  couponDesc: '',
  couponPeriod: '',
  couponDiscount: '',
};

//!--------------------------------------------------------------------------------------

//! 4. reducers 만들기

export function couponEditReducer(
  state = initialState,
  action: CouponEditActionTypes,
): CouponEditState {
  switch (action.type) {
    case CHANGE_COUPON_NAME:
      return { ...state, couponName: action.meta.input };
    case CHANGE_COUPON_PAGE_CODE:
      return { ...state, couponPageCode: action.meta.input };
    case CHANGE_COUPON_DESC:
      return { ...state, couponDesc: action.meta.input };
    case CHANGE_COUPON_PERIOD:
      return { ...state, couponPeriod: action.meta.input };
    case CHANGE_COUPON_DISCOUNT:
      return { ...state, couponDiscount: action.meta.input };
    default:
      return state;
  }
  // if (action.type === CHANGE_COUPON_NAME) {
  //   return { ...state, couponName: action.meta.input };
  // } else if (action.type === CHANGE_COUPON_PAGE_CODE) {
  //   return { ...state, couponPageCode: action.meta.input };
  // } else if (action.type === CHANGE_COUPON_DESC) {
  //   return { ...state, couponDesc: action.meta.input };
  // } else if (action.type === CHANGE_COUPON_PERIOD) {
  //   return { ...state, couponPeriod: action.meta.input };
  // } else if (action.type === CHANGE_COUPON_DISCOUNT) {
  //   return { ...state, couponDiscount: action.meta.input };
  // }
  // return state;
}

//!--------------------------------------------------------------------------------------
