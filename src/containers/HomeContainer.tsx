import React from 'react';
import { Link } from 'react-router-dom';

import UserMenu from '../views/UserMenu';

import Button from '@material-ui/core/Button';

const HomeContainer: React.FunctionComponent = () => {
  // 로그인 버튼 누를 때

  // 관리자 모드 누를 때
  return (
    <div>
      <UserMenu />
      <img src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"></img>
    </div>
  );
};

export default HomeContainer;
