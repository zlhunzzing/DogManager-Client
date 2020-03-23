import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { CouponData } from '../modules/coupon';

import UserMenu from '../views/UserMenu';
import { Redirect } from 'react-router-dom';

interface CouponListContainerProps {
  isLogin: boolean;
  userCouponList?: CouponData[];
}

const CouponListContainer: React.FunctionComponent<CouponListContainerProps> = ({
  isLogin,
  userCouponList,
}: CouponListContainerProps) => {
  //
  useEffect(() => {
    if (isLogin) {
      //서버요청
    }
  });
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
  dispatch => ({}),
)(CouponListContainer);
