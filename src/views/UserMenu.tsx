import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSlice } from '../modules/user';

interface UserMenuProps {
  isLogin?: boolean;
  UserActions: any;
}

const UserMenu: React.FunctionComponent<UserMenuProps> = ({
  isLogin,
  UserActions,
}: UserMenuProps) => {
  return (
    <div>
      <div style={{ height: 50 }}>
        <div style={{ height: '25%' }}></div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ float: 'left', marginLeft: 480 }}>코드메이트</div>
        </Link>

        <Link to="/user/event-list" style={{ textDecoration: 'none' }}>
          <div style={{ float: 'left', marginLeft: 530, marginRight: 30 }}>Event</div>
        </Link>
        <Link to="/user/coupon" style={{ textDecoration: 'none' }}>
          <div style={{ float: 'left', marginRight: 30 }}> Coupon </div>
        </Link>
        {isLogin ? (
          <div
            style={{ float: 'left', marginRight: 30, cursor: 'pointer' }}
            onClick={() => {
              localStorage.removeItem('accessToken');
              UserActions.changeIsLogin(false);
              UserActions.changeUserId(null);
            }}
          >
            Signout
          </div>
        ) : (
          <Link to="/user/signin" style={{ textDecoration: 'none' }}>
            <div style={{ float: 'left', marginRight: 30 }}>Signin</div>
          </Link>
        )}
        <Link to="/admin/signin" style={{ textDecoration: 'none' }}>
          <div style={{ float: 'left' }}>Admin Mode</div>
        </Link>
      </div>
      <Divider />
    </div>
  );
};

export default connect(
  () => ({}),
  dispatch => ({
    UserActions: bindActionCreators(userSlice.actions, dispatch),
  }),
)(UserMenu);
