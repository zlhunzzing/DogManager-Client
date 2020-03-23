import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { CouponData } from '../modules/coupon';

interface CouponItemProps {
  num: number;
  coupon: CouponData;
  history?: any;
}

const CouponItem: React.FunctionComponent<CouponItemProps> = ({
  num,
  coupon,
}: CouponItemProps) => {
  return (
    <TableRow>
      <TableCell>{num}</TableCell>
      <TableCell>{coupon.couponName}</TableCell>
      <TableCell>{coupon.description}</TableCell>
      <TableCell>{coupon.couponCode}</TableCell>
      <TableCell>{coupon.discount}</TableCell>
      <TableCell>
        <button>수정</button>
      </TableCell>
      <TableCell>
        <button>삭제</button>
      </TableCell>
    </TableRow>
  );
};

export default CouponItem;
