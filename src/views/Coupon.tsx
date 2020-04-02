import React from 'react';

interface CouponProps {
  coupon: any;
}

const Coupon: React.FunctionComponent<CouponProps> = ({ coupon }: CouponProps) => {
  return (
    <div
      style={{
        marginLeft: '15%',
        marginTop: '20px',
        width: '70%',
        height: '120px',
        border: 'solid 1px',
        borderRadius: 5,
        // backgroundColor: 'yellow',
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
};

export default Coupon;
