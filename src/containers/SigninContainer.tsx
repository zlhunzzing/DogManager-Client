import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../views/UserMenu';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as signinActions } from '../modules/signin';
import { bindActionCreators } from 'redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface SigninContainerProps {
  isAdmin: boolean;
  idInput: string;
  pwInput: string;
  SigninActions: typeof signinActions;
}

function SigninContainer({ isAdmin, SigninActions }: SigninContainerProps) {
  // 로그인 버튼 눌렀을 때
  // 서버에 로그인 요청
  // isAdmin으로 구분해서 요청

  let version: string;
  if (isAdmin) {
    version = '관리자';
  } else {
    version = '고객';
  }

  const onClickSignup = () => {};

  const signupButton = (
    <Link to="/user/signup">
      <Button style={{ width: 100, marginRight: 10 }} variant="outlined">
        Sign up
      </Button>
    </Link>
  );

  const signinButton = (isAdmin: boolean) => {
    let url: string;
    if (isAdmin) {
      url = '/admin/event-list';
    } else {
      url = '/';
    }
    return (
      <Link to={url}>
        <Button style={{ width: 100, marginRight: 10 }} variant="outlined">
          Sign in
        </Button>
      </Link>
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
          onChange={event => {
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
          onChange={event => {
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
}

export default connect(
  ({ signin }: StoreState) => ({
    idInput: signin.idInput,
    pwInput: signin.pwInput,
  }),
  dispatch => ({
    SigninActions: bindActionCreators(signinActions, dispatch),
  }),
)(SigninContainer);
