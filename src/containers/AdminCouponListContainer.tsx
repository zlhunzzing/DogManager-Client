import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { bindActionCreators } from 'redux';
import { couponSlice, CouponData } from '../modules/coupon';

import AdminMenu from '../views/AdminMenu';
import CouponListTable from '../views/CouponListTable';

import Button from '@material-ui/core/Button';
import PageBar from '../views/PageBar';

//////////////////////////////////////////////////////////////////////////////////////

interface AdminCouponListContainerContainerProps {
  adminCouponList: CouponData[];
  CouponActions: any;
  history: any;
}

const AdminCouponListContainer: React.FunctionComponent<AdminCouponListContainerContainerProps> = ({
  adminCouponList,
  CouponActions,
  history,
}: AdminCouponListContainerContainerProps) => {
  useEffect(() => {
    CouponActions.axiosAdminCouponListRequest();
  }, []);

  function handleClickDeleteCoupon(id: number, history: any): void {
    CouponActions.axiosAdminCouponDeleteRequest({ id: id, history: history });
  }
  console.log('adminCouponList????:', adminCouponList);
  //! 페이징 기능
  const [currentPage, setCurrentPage] = React.useState(1);
  const changePage = (page: number): void => {
    setCurrentPage(page);
  };
  const perPage = 8;
  const pages = Number.isInteger(adminCouponList.length / perPage)
    ? adminCouponList.length / perPage
    : Math.floor(adminCouponList.length / perPage + 1);

  //!
  return (
    <div>
      <AdminMenu />
      <div style={{ marginTop: 10 }}></div>
      <div>
        <Link to="/admin/coupon-edit">
          <Button variant="outlined" style={{ height: 56, marginRight: 10 }}>
            새 쿠폰 추가
          </Button>
        </Link>
      </div>
      <CouponListTable
        history={history}
        couponList={adminCouponList}
        handleClickDeleteCoupon={handleClickDeleteCoupon}
        currentPage={currentPage}
        perPage={perPage}
      />
      <PageBar pages={pages} currentPage={currentPage} changePage={changePage} />
    </div>
  );
};

export default connect(
  ({ coupon }: StoreState) => ({
    adminCouponList: coupon.adminCouponList,
  }),
  dispatch => ({
    CouponActions: bindActionCreators(couponSlice.actions, dispatch),
  }),
)(AdminCouponListContainer);
