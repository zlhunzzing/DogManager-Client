import React from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import CouponListItem from './CouponListItem';
import { CouponData } from '../modules/coupon';

interface CouponListTableProps {
  couponList: CouponData[];
  handleClickDeleteCoupon(id: number, history: any): void;
  history?: any;
  currentPage: number;
  perPage: number;
}

const CouponListTable: React.FunctionComponent<CouponListTableProps> = ({
  couponList,
  handleClickDeleteCoupon,
  history,
  currentPage,
  perPage,
}: CouponListTableProps) => {
  console.log('couponList:', couponList);

  const eventItems = [];
  for (let i = perPage * (currentPage - 1); i < perPage * currentPage; i++) {
    if (couponList && couponList[i] !== undefined) {
      eventItems.push(
        <CouponListItem
          num={i}
          coupon={couponList[i]}
          handleClickDeleteCoupon={handleClickDeleteCoupon}
          history={history}
        />,
      );
    }
  }
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
            <TableCell>삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventItems}
          {/* {couponList
            ? couponList.map((coupon, index) => {
                return (
                  <CouponListItem
                    key={index}
                    num={index}
                    coupon={coupon}
                    handleClickDeleteCoupon={handleClickDeleteCoupon}
                    history={history}
                  />
                );
              })
            : null} */}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponListTable;
