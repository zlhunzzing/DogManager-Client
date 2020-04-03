import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from '../modules';
import { CouponData, couponSlice } from '../modules/coupon';

import UserMenu from '../views/UserMenu';
import Coupon from '../views/Coupon';
//////////////////////////////////////////////////////////////////////////////////////

interface CouponListContainerProps {
  userCouponList?: CouponData[];
  CouponActions: any;
}

const CouponListContainer: React.FunctionComponent<CouponListContainerProps> = ({
  userCouponList,
  CouponActions,
}: CouponListContainerProps) => {
  //

  useEffect(() => {
    CouponActions.axiosUserCouponListRequest();
  }, []);

  return (
    <div>
      <UserMenu isLogin={true} />
      <div
        style={{
          textAlign: 'center',
          marginLeft: '15%',
          width: '70%',
          // border: 'solid 1px red',
        }}
      >
        <h1> 나의 쿠폰함 </h1>
        <div style={{ marginLeft: '25%', width: '50%' }}>
          {userCouponList?.map((coupon, index) => {
            return <Coupon key={index} coupon={coupon} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ coupon }: StoreState) => ({
    userCouponList: coupon.userCouponList,
  }),
  dispatch => ({
    CouponActions: bindActionCreators(couponSlice.actions, dispatch),
  }),
)(CouponListContainer);
