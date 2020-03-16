import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

const UserMenu: React.FunctionComponent = () => {
  return (
    <div>
      <div style={{ height: 50 }}>
        <div style={{ height: '25%' }}></div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ float: 'left', marginLeft: 480 }}>도그메이트</div>
        </Link>
        <div style={{ float: 'left', marginLeft: 580, marginRight: 30 }}>Event</div>
        <div style={{ float: 'left', marginRight: 30 }}>QnA</div>
        <Link to="/user/signin" style={{ textDecoration: 'none' }}>
          <div style={{ float: 'left', marginRight: 30 }}>Signin</div>
        </Link>
        <Link to="/admin/signin" style={{ textDecoration: 'none' }}>
          <div style={{ float: 'left' }}>Admin Mode</div>
        </Link>
      </div>
      <Divider />
    </div>
  );
};

export default UserMenu;
