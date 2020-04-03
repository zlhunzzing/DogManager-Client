import React from 'react';
import AdminSupportContainer from '../containers/AdminSupportContainer';
import { RouteComponentProps } from 'react-router';

function AdminSupport({ history }: RouteComponentProps) {
  return <AdminSupportContainer history={history} />;
}

export default AdminSupport;
