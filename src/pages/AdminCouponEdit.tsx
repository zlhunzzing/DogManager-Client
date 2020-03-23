import React from 'react';
import { RouteComponentProps } from 'react-router';
import AdminCouponEditContainer from '../containers/AdminCouponEditContainer';

function AdminCouponEdit({ history }: RouteComponentProps) {
  return (
    <div>
      <AdminCouponEditContainer history={history} />
    </div>
  );
}
export default AdminCouponEdit;
