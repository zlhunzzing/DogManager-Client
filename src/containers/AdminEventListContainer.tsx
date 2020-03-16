import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AdminMenu from '../views/AdminMenu';
import EventListMenu from '../views/EventListMenu';
import EventListTable from '../views/EventListTable';

const AdminEventListContainer: React.FunctionComponent = () => {
  return (
    <div>
      <AdminMenu />
      <div style={{ marginTop: 10 }}></div>
      <EventListMenu />
      <EventListTable />
    </div>
  );
};

export default AdminEventListContainer;
