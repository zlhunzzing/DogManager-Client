import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from '../modules';
import { CouponData, couponSlice } from '../modules/coupon';

import UserMenu from '../views/UserMenu';

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
        }}
      >
        <h1> 나의 쿠폰함 </h1>
        <div style={{ marginLeft: '25%', width: '50%' }}>
          {userCouponList?.map((coupon, index) => {
            return (
              <div
                key={index}
                style={{
                  marginLeft: '15%',
                  marginTop: '20px',
                  width: '70%',
                  height: '100px',
                  border: 'solid 1px',
                  backgroundColor: 'yellow',
                }}
              >
                <h3>{coupon.couponName}</h3>
                <div>{coupon.description}</div>
                <div>
                  {coupon.expiredAt?.slice(0, 4)}년 {coupon.expiredAt?.slice(4, 6)}월{' '}
                  {coupon.expiredAt?.slice(6, 8)}일 {coupon.expiredAt?.slice(8, 10)}시{' '}
                  {coupon.expiredAt?.slice(10, 12)}분까지 사용가능
                </div>
              </div>
            );
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
