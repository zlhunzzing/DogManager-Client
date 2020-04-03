import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { debounce } from 'lodash';

import UserMenu from '../views/UserMenu';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { bindActionCreators } from 'redux';
import { signinSlice } from '../modules/signin';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

///////////////////////////////////////////////////////////////////////////////////////

interface SigninContainerProps {
  isAdmin: boolean;
  isLogin: boolean;
  idInput: string;
  pwInput: string;
  SigninActions: any;
  history: any;
}

const SigninContainer: React.FunctionComponent<SigninContainerProps> = ({
  isAdmin,
  isLogin,
  idInput,
  pwInput,
  SigninActions,
  history,
}: SigninContainerProps) => {
  //

  const handleIdInputChange = (value: string): any => {
    SigninActions.changeIdInput(value);
  };

  const debouncedHandleIdInputChange = debounce(handleIdInputChange, 500);

  const handlePwInputChange = (value: string): any => {
    SigninActions.changePwInput(value);
  };

  const debouncedHandlePwInputChange = debounce(handlePwInputChange, 500);

  const signupButton = (
    <Link to="/user/signup" style={{ color: 'inherit', textDecoration: 'inherit' }}>
      <Button style={{ width: 100, marginRight: 10 }} variant="outlined">
        Sign up
      </Button>
    </Link>
  );

  function onClickSignin(isAdmin: boolean): void {
    if (isAdmin) {
      SigninActions.axiosAdminSigninRequest({
        email: idInput,
        password: pwInput,
        history: history,
      });
    } else {
      SigninActions.axiosUserSigninRequest({
        email: idInput,
        password: pwInput,
        history: history,
      });
    }
  }

  const signinButton = (isAdmin: boolean): JSX.Element => {
    return (
      <Button
        style={{ width: 100, marginRight: 10 }}
        variant="outlined"
        onClick={() => {
          onClickSignin(isAdmin);
        }}
      >
        Sign in
      </Button>
    );
  };

  if (isLogin && isAdmin) {
    alert('접근 권한이 없습니다.');
    return <Redirect to="/user" />;
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <UserMenu isLogin={isLogin} />
        <div style={{ marginTop: 300 }}>{isAdmin ? '관리자' : '고객'} 로그인</div>
        <div style={{ marginTop: 10 }}></div>
        <div>
          <TextField
            style={{ width: 400 }}
            id="outlined-basic"
            label="Login"
            variant="outlined"
            onChange={(event): void => {
              const { value } = event.target;
              debouncedHandleIdInputChange(value);
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
              debouncedHandlePwInputChange(value);
            }}
          />
        </div>
        <div style={{ marginTop: 10 }}></div>
        <div>
          {isAdmin ? null : signupButton}
          {signinButton(isAdmin)}
        </div>
      </div>
    );
  }
};

export default connect(
  ({ signin, user }: StoreState) => ({
    idInput: signin.idInput,
    pwInput: signin.pwInput,
    isLogin: user.isLogin,
  }),
  dispatch => ({
    SigninActions: bindActionCreators(signinSlice.actions, dispatch),
  }),
)(SigninContainer);
