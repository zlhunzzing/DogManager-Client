import React from 'react';
import { Link } from 'react-router-dom';

import AdminMenu from '../views/AdminMenu';

import Button from '@material-ui/core/Button';

function AdminSupportContainer() {
  return (
    <div>
      <AdminMenu />
      <div>여기가 고객문의 관리</div>
    </div>
  );
}

export default AdminSupportContainer;
