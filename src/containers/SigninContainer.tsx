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
}

const SigninContainer: React.FunctionComponent<SigninContainerProps> = ({
  isAdmin,
  isLogin,
  idInput,
  pwInput,
  SigninActions,
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
    <Link to="/user/signup">
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
      });
    } else {
      SigninActions.axiosUserSigninRequest({
        email: idInput,
        password: pwInput,
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

  if (!isLogin) {
    return (
      <div style={{ textAlign: 'center' }}>
        <UserMenu isLogin={isLogin} />
        <div style={{ marginTop: 300 }}>{isAdmin ? '관리자' : '고객'} 로그인</div>
        <div style={{ marginTop: 10 }}></div>
        <div>
          <TextField
            style={{ width: 400 }}
            id="outlined-basic"
            label="Outlined"
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
  } else {
    if (isAdmin) {
      return <Redirect to="/admin/event-list" />;
    }
    return <Redirect to="/" />;
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
