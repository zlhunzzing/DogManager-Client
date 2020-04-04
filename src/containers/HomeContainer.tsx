import React from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';

import UserMenu from '../views/UserMenu';

interface HomeContainerProps {
  isLogin: boolean;
}

const HomeContainer: React.FunctionComponent<HomeContainerProps> = ({
  isLogin,
}: HomeContainerProps) => {
  return (
    <div style={{ height: '100%' }}>
      <UserMenu isLogin={isLogin} />
      <div>
        <img
          style={{ width: '100%', height: `${window.innerHeight - 71}px` }}
          src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        ></img>
      </div>
    </div>
  );
};

// src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"

export default connect(
  ({ user }: StoreState) => ({
    isLogin: user.isLogin,
  }),
  dispatch => ({}),
)(HomeContainer);
