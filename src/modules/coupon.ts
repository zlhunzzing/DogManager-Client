import { createSlice } from '@reduxjs/toolkit';

export interface CouponData {
  couponName: string;
  couponCode?: string;
  description: string;
  period: number;
  discount?: number;
  expiredAt?: string;
}

export interface CouponState {
  userCouponList: CouponData[];
  adminCouponList: CouponData[];
}

export const initialState: CouponState = {
  userCouponList: [],
  adminCouponList: [],
};

export const couponSlice = createSlice({
  name: 'coupon',
  initialState: initialState,
  reducers: {
    axiosAdminCouponListRequest: (state, action): void => {
      console.log('GET /api/admin/coupon/list 요청');
    },
    axiosAdminCouponListSuccess: (state, action): void => {
      state.adminCouponList = action.payload;
    },
    axiosAdminCouponListFailure: (state, action): void => {
      console.log('GET /api/admin/coupon/list 요청 실패');
    },
    axiosUserCouponListRequest: (state, action): void => {
      console.log('GET /api/user/coupon/list 요청');
    },
    axiosUserCouponListSuccess: (state, action): void => {
      state.userCouponList = action.payload;
    },
    axiosUserCouponListFailure: (state, action): void => {
      console.log('GET /api/user/coupon/list 요청 실패');
    },
  },
});

export const couponReducer = couponSlice.reducer;
export const {
  axiosAdminCouponListRequest,
  axiosAdminCouponListSuccess,
  axiosAdminCouponListFailure,
  axiosUserCouponListRequest,
  axiosUserCouponListSuccess,
  axiosUserCouponListFailure,
} = couponSlice.actions;
