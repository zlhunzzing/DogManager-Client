import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from '../modules';
import { CouponData, couponSlice } from '../modules/coupon';

import UserMenu from '../views/UserMenu';
import { Redirect } from 'react-router-dom';

interface CouponListContainerProps {
  isLogin: boolean;
  userCouponList?: CouponData[];
  CouponActions: any;
}

const CouponListContainer: React.FunctionComponent<CouponListContainerProps> = ({
  isLogin,
  userCouponList,
  CouponActions,
}: CouponListContainerProps) => {
  //

  useEffect(() => {
    if (isLogin) {
      CouponActions.axiosUserCouponListRequest();
    }
  }, []);
  if (isLogin) {
    return (
      <div>
        <UserMenu />
        <div
          style={{
            textAlign: 'center',
            marginLeft: '15%',
            backgroundColor: 'yellow',
            width: '70%',
          }}
        >
          <h1> 나의 쿠폰함 </h1>
          <div style={{ marginLeft: '25%', width: '50%', border: 'solid 1px' }}>
            {userCouponList?.map(coupon => {
              return (
                <div>
                  {coupon.couponName} : {coupon.description} // {coupon.expiredAt}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    alert('로그인이 필요합니다.');
    return <Redirect to="/user/signin" />;
  }
};

// export default CouponListContainer;

export default connect(
  ({ user, coupon }: StoreState) => ({
    isLogin: user.isLogin,
    userCouponList: coupon.userCouponList,
  }),
  dispatch => ({
    CouponActions: bindActionCreators(couponSlice.actions, dispatch),
  }),
)(CouponListContainer);
