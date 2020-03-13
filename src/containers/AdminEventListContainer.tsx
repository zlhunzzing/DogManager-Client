import React from 'react';

import AdminMenu from '../views/AdminMenu';
import EventItem from '../views/EventItem';

function AdminEventListContainer() {
  return (
    <div>
      <AdminMenu />
      <div>
        <span>필터</span>
        <button>새 이벤트 추가</button>
      </div>
      <EventItem />
    </div>
  );
}

export default AdminEventListContainer;
