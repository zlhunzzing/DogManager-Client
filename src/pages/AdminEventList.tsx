import React from 'react';
import { RouteComponentProps } from 'react-router';
import AdminEventListContainer from '../containers/AdminEventListContainer';

function AdminEventList({ history }: RouteComponentProps) {
  return <AdminEventListContainer history={history} />;
}

export default AdminEventList;
