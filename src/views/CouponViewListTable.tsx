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

interface CouponViewListTableProps {
  couponViewList: CouponViewData[];
  currentPage: number;
  perPage: number;
}

const CouponViewListTable: React.FunctionComponent<CouponViewListTableProps> = ({
  couponViewList,
  currentPage,
  perPage,
}: CouponViewListTableProps) => {
  const eventItems = [];
  for (let i = perPage * (currentPage - 1); i < perPage * currentPage; i++) {
    if (couponViewList && couponViewList[i] !== undefined) {
      eventItems.push(<CouponViewItem key={i} coupon={couponViewList[i]} />);
    }
  }
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
      <TableBody>{eventItems}</TableBody>
    </Table>
  );
};

export default CouponViewListTable;
