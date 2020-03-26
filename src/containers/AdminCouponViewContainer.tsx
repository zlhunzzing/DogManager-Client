//! 모듈
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//! 컴포넌트
import AdminMenu from '../views/AdminMenu';
import CouponViewListTable from '../views/CouponViewListTable';

//! CSS
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export interface FakeCouponData {
  userName: string;
  userEmail: string;
  couponName: string;
  couponCode: string;
  assignedAt: number;
  expiredAt: number;
  isDeleted: number;
}

const fakeCouponData: FakeCouponData[] = [
  {
    userName: 'john1',
    userEmail: 'john1jungemail.com',
    couponName: '쿠폰1',
    couponCode: '12322312',
    assignedAt: 20200324,
    expiredAt: 20200329,
    isDeleted: 1,
  },
  {
    userName: 'john1',
    userEmail: 'john1jungemail.com',
    couponName: '쿠폰2',
    couponCode: '12322312',
    assignedAt: 20200324,
    expiredAt: 20200329,
    isDeleted: 2,
  },
  {
    userName: 'john3',
    userEmail: 'john3jungemail.com',
    couponName: 'helloworld3',
    couponCode: '12322312',
    assignedAt: 20200324,
    expiredAt: 20200329,
    isDeleted: 2,
  },
  {
    userName: 'john4',
    userEmail: 'john4jungemail.com',
    couponName: 'helloworld4',
    couponCode: '12322312',
    assignedAt: 20200324,
    expiredAt: 20200329,
    isDeleted: 1,
  },
  {
    userName: 'john5',
    userEmail: 'john5jungemail.com',
    couponName: 'helloworld5',
    couponCode: '12322312',
    assignedAt: 20200324,
    expiredAt: 20200329,
    isDeleted: 0,
  },
];

const AdminCouponViewContainer: React.FunctionComponent = () => {
  //   statusCode: 200

  //   isDeleted 상태:
  //   0 : 사용가능
  //   1 : 사용완료
  //   2 : 취소됨(기간만료, 쿠폰삭제 등)
  //   console.log(fakeCouponData);
  return (
    <div>
      <AdminMenu />
      <div style={{ marginTop: 60 }}>something</div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>유저 이름</TableCell>
            <TableCell>유져 이메일</TableCell>
            <TableCell>쿠폰 이름</TableCell>
            <TableCell>쿠폰 코드</TableCell>
            <TableCell>쿠폰 발급일</TableCell>
            <TableCell>쿠폰 만료일</TableCell>
            <TableCell>상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fakeCouponData.map((coupon, index) => {
            return <CouponViewListTable key={index} coupon={coupon} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCouponViewContainer;
