import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../views/UserMenu';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as signinActions } from '../modules/signin';
import { actionCreators as userActions } from '../modules/user';
import { bindActionCreators } from 'redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import axios from 'axios';
import server from '../server';

interface SigninContainerProps {
  isAdmin: boolean;
  idInput: string;
  pwInput: string;
  SigninActions: typeof signinActions;
  UserActions: typeof userActions;
}

const SigninContainer: React.FunctionComponent<SigninContainerProps> = ({
  isAdmin,
  idInput,
  pwInput,
  SigninActions,
  UserActions,
}: SigninContainerProps) => {
  // 로그인 버튼 눌렀을 때
  // 서버에 로그인 요청
  // isAdmin으로 구분해서 요청

  let version: string;
  if (isAdmin) {
    version = '관리자';
  } else {
    version = '고객';
  }

  const signupButton = (
    <Link to="/user/signup">
      <Button style={{ width: 100, marginRight: 10 }} variant="outlined">
        Sign up
      </Button>
    </Link>
  );

  function onClickSignin(isAdmin: boolean) {
    // if (isAdmin) {
    //   const serverUrl = server + '/api/user/signin';
    //   const res = axios.post(serverUrl, {
    //     email: idInput,
    //     password: pwInput,
    //   });
    //   if (res.data.statusCode === '200') {
    //     // 응답 헤더의 토큰을 클라이언트 로컬 스토리지에 저장
    //     //
    //   }
    // } else {
    // }
    axios.post('http://localhost:4000/test').then(res => {
      console.log(res.headers);
    });
    // 토큰이 res.headers.Authorization
    localStorage.setItem('accessToken', '서버응답헤더에보내준토큰');
    UserActions.changeIsLogin(isAdmin);
  }

  const signinButton = (isAdmin: boolean): JSX.Element => {
    let url: string;
    if (isAdmin) {
      url = '/admin/event-list';
    } else {
      url = '/';
    }
    return (
      <Button
        style={{ width: 100, marginRight: 10 }}
        variant="outlined"
        onClick={() => {
          console.log('클릭');
          onClickSignin(true);
        }}
      >
        Sign in
      </Button>
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <UserMenu />
      <div style={{ marginTop: 300 }}>{version}로그인</div>
      <div style={{ marginTop: 10 }}></div>
      <div>
        <TextField
          style={{ width: 400 }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(event): void => {
            const { value } = event.target;
            SigninActions.changeIdInput(value);
          }}
        />
      </div>
      <div style={{ marginTop: 10 }}></div>
      <div>
        <TextField
          style={{ width: 400 }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={(event): void => {
            const { value } = event.target;
            SigninActions.changePwInput(value);
          }}
        />
      </div>
      <div style={{ marginTop: 10 }}></div>
      <div>
        {isAdmin ? null : signupButton}
        {signinButton(isAdmin)}
        {/* <Button style={{ width: 100 }} variant="outlined">
          Sign in
        </Button> */}
      </div>
    </div>
  );
};

export default connect(
  ({ signin }: StoreState) => ({
    idInput: signin.idInput,
    pwInput: signin.pwInput,
  }),
  dispatch => ({
    SigninActions: bindActionCreators(signinActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(SigninContainer);
