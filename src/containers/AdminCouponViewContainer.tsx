//! 모듈
import React, { useEffect } from 'react';
import axios from 'axios';
import { StoreState } from '../modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//! 컴포넌트
import AdminMenu from '../views/AdminMenu';
import CouponViewListTable from '../views/CouponViewListTable';
import { couponSlice, CouponViewData } from '../modules/coupon';
import server from '../server';
import PageBar from '../views/PageBar';

//! CSS

interface AdminCouponViewContainerprops {
  adminCouponViewList: CouponViewData[] | null;
  adminCouponFilter: string;
  adminCouponFilter2: string;
  CouponActions: any;
}

const AdminCouponViewContainer: React.FunctionComponent<AdminCouponViewContainerprops> = ({
  adminCouponViewList,
  adminCouponFilter,
  CouponActions,
  adminCouponFilter2,
}: AdminCouponViewContainerprops) => {
  //! 쿠폰필터링
  let filteredCouponList;
  if (adminCouponFilter === '') {
    filteredCouponList = adminCouponViewList;
  } else {
    filteredCouponList = adminCouponViewList?.filter(ele => {
      return ele.userEmail === adminCouponFilter;
    });
  }

  const changeCouponFilter = (filter: string): void => {
    CouponActions.changeCouponFilter(filter);
  };
  const changeCouponFilter2 = (filter: string): void => {
    CouponActions.changeCouponFilter2(filter);
  };
  useEffect(() => {
    CouponActions.axiosAdminCouponViewListRequest();
  }, []);
  // console.log('adminCouponViewList:', adminCouponViewList);

  function changed(e: any): void {
    e.preventDefault();
    changeCouponFilter(adminCouponFilter2);
  }
  //! 페이징 기능
  const [currentPage, setCurrentPage] = React.useState(1);
  const changePage = (page: number): void => {
    setCurrentPage(page);
  };
  //!

  return (
    <div>
      <AdminMenu />
      <div style={{ marginTop: 20 }}> 사용자의 이메일을 입력해주세요</div>

      <form onSubmit={changed}>
        <input
          style={{ margin: 30, width: 400, height: 30, fontSize: 20 }}
          type="email"
          onChange={(event): void => {
            const { value } = event.target;
            changeCouponFilter2(value);
          }}
        ></input>
        <button type="submit" style={{ padding: 12 }}>
          검색
        </button>
      </form>
      <CouponViewListTable
        currentPage={currentPage}
        perPage={2}
        couponViewList={filteredCouponList ? filteredCouponList : []}
      />
      <PageBar
        pages={filteredCouponList ? Math.floor(filteredCouponList.length / 2 + 1) : 0}
        currentPage={currentPage}
        changePage={changePage}
      />
    </div>
  );
};

export default connect(
  ({ coupon }: StoreState) => ({
    adminCouponViewList: coupon.adminCouponViewList,
    adminCouponFilter: coupon.adminCouponFilter,
    adminCouponFilter2: coupon.adminCouponFilter2,
  }),
  dispatch => ({
    CouponActions: bindActionCreators(couponSlice.actions, dispatch),
  }),
)(AdminCouponViewContainer);
