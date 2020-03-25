import React from 'react';
import { RouteComponentProps } from 'react-router';

import AdminCouponListContainer from '../containers/AdminCouponListContainer';

function AdminCouponList({ history }: RouteComponentProps) {
  return (
    <div>
      <AdminCouponListContainer history={history} />
    </div>
  );
}
export default AdminCouponList;
