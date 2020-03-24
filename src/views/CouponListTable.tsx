import React from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import CouponItem from './CouponItem';
import { CouponData } from '../modules/coupon';

interface EventListTableProps {
  couponList: CouponData[];
  handleClickDeleteCoupon(id: number): void;
  history?: any;
}

const CouponListTable: React.FunctionComponent<EventListTableProps> = ({
  couponList,
  handleClickDeleteCoupon,
}: EventListTableProps) => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>쿠폰 이름</TableCell>
            <TableCell>설명</TableCell>
            <TableCell>쿠폰 코드</TableCell>
            <TableCell>할인율</TableCell>
            <TableCell>수정</TableCell>
            <TableCell>삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {couponList.map((coupon, index) => {
            return (
              <CouponItem
                key={index}
                num={index}
                coupon={coupon}
                handleClickDeleteCoupon={handleClickDeleteCoupon}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponListTable;
