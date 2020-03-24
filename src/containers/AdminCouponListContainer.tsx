import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { bindActionCreators } from 'redux';
import { couponSlice, CouponData } from '../modules/coupon';

import AdminMenu from '../views/AdminMenu';
import CouponListTable from '../views/CouponListTable';

import Button from '@material-ui/core/Button';

//////////////////////////////////////////////////////////////////////////////////////

interface AdminCouponListContainerContainerProps {
  adminCouponList: CouponData[];
  CouponActions: any;
}

const AdminCouponListContainer: React.FunctionComponent<AdminCouponListContainerContainerProps> = ({
  adminCouponList,
  CouponActions,
}: AdminCouponListContainerContainerProps) => {
  //
  useEffect(() => {
    CouponActions.axiosAdminCouponListRequest();
  }, []);

  function handleClickDeleteCoupon(id: number): void {
    CouponActions.axiosAdminCouponDeleteRequest(id);
  }

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
        couponList={adminCouponList}
        handleClickDeleteCoupon={handleClickDeleteCoupon}
      />
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
