import { createSlice, createSelector } from '@reduxjs/toolkit';

export interface CouponData {
  id: number;
  couponName: string;
  couponCode?: string;
  description: string;
  period: number;
  discount?: number;
  expiredAt?: string;
}

export interface CouponViewData {
  userName: string;
  userEmail: string;
  couponName: string;
  couponCode: string;
  assignedAt: string;
  expiredAt: string;
  isDeleted: string;
}

export interface CouponState {
  userCouponList: CouponData[];
  adminCouponList: CouponData[];
  adminCouponViewList: CouponViewData[] | null;
  adminCouponFilter: string;
  adminCouponFilter2: string;
}

export const initialState: CouponState = {
  userCouponList: [],
  adminCouponList: [],
  adminCouponViewList: [],
  adminCouponFilter: '',
  adminCouponFilter2: '',
};

/////////////////////////////////////////////////////////////////////////////////////

export const couponSlice = createSlice({
  name: 'coupon',
  initialState: initialState,
  reducers: {
    axiosAdminCouponListRequest: (state, action): void => {
      console.log('GET /api/admin/coupon/list 요청');
    },
    axiosAdminCouponViewListRequest: (state, action): void => {
      console.log('GET /api/admin/user/coupon/list 요청');
    },
    axiosAdminCouponListSuccess: (state, action): void => {
      state.adminCouponList = action.payload;
    },
    axiosAdminCouponListFailure: (state, action): void => {
      console.log('GET /api/admin/user/coupon/list 요청 실패');
    },
    axiosAdminCouponViewListSuccess: (state, action): void => {
      state.adminCouponViewList = action.payload;
    },
    axiosAdminCouponViewListFailure: (state, action): void => {
      console.log('GET /api/admin/coupon/user/list 요청 실패');
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

    axiosUserCouponPostRequest: (state, action) => {
      console.log('/api/user/coupon 요청');
    },

    axiosAdminCouponDeleteRequest: (state, action) => {
      console.log('DELETE /api/admin/coupon/:id 요청');
    },
    changeCouponFilter: (state, action): void => {
      state.adminCouponFilter = action.payload;
    },
    changeCouponFilter2: (state, action): void => {
      state.adminCouponFilter2 = action.payload;
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
  axiosUserCouponPostRequest,
  axiosAdminCouponDeleteRequest,
  axiosAdminCouponViewListRequest,
  axiosAdminCouponViewListSuccess,
  axiosAdminCouponViewListFailure,
  changeCouponFilter,
  changeCouponFilter2,
} = couponSlice.actions;
