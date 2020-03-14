import React from 'react';

import AdminMenu from '../views/AdminMenu';
import EventListMenu from '../views/EventListMenu';
import EventListTable from '../views/EventListTable';

function AdminEventListContainer() {
  return (
    <div>
      <AdminMenu />
      <div style={{ marginTop: 10 }}></div>
      <EventListMenu />
      <EventListTable />
    </div>
  );
}

export default AdminEventListContainer;
