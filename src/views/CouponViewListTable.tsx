/*eslint-disable*/
//! 모듈
import React from 'react';

//! 컴포넌트

import { CouponViewData } from '../modules/coupon';
import CouponViewItem from './CouponViewItem';
//!
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//!

//!

// interface couponViewProps {
//   coupon: FakeCouponData;
// }

interface CouponViewListTableProps {
  couponViewList: CouponViewData[];
}

const CouponViewListTable: React.FunctionComponent<CouponViewListTableProps> = ({
  couponViewList,
}: CouponViewListTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>유저 이름</TableCell>
          <TableCell>유져 이메일</TableCell>
          <TableCell>쿠폰 코드</TableCell>
          <TableCell>쿠폰 발급일</TableCell>
          <TableCell>쿠폰 만료일</TableCell>
          <TableCell>상태</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {couponViewList.map((coupon, index) => {
          return <CouponViewItem key={index} coupon={coupon} />;
        })}
      </TableBody>
    </Table>
  );
};

export default CouponViewListTable;
