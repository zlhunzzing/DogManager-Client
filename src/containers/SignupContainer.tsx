import React from 'react';
import UserMenu from '../views/UserMenu';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as signupActions } from '../modules/signup';
import { bindActionCreators } from 'redux';

import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface SignupContainerProps {
  idInput: string;
  pwInput: string;
  SignupActions: typeof signupActions;
}

const SignupContainer: React.FunctionComponent<SignupContainerProps> = ({
  SignupActions,
}: SignupContainerProps) => {
  // 로그인 버튼 눌렀을 때
  // 서버에 로그인 요청
  // isAdmin으로 구분해서 요청

  return (
    <div style={{ textAlign: 'center' }}>
      <UserMenu />
      <div style={{ marginTop: 300 }}>회원가입</div>
      <div style={{ marginTop: 10 }}></div>
      <div>
        <TextField
          style={{ width: 400 }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(event): void => {
            const { value } = event.target;
            SignupActions.changeIdInput(value);
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
            SignupActions.changePwInput(value);
          }}
        />
      </div>
      <div style={{ marginTop: 10 }}></div>
    </div>
  );
};

export default connect(
  ({ signup }: StoreState) => ({
    idInput: signup.idInput,
    pwInput: signup.pwInput,
  }),
  dispatch => ({
    SignupActions: bindActionCreators(signupActions, dispatch),
  }),
)(SignupContainer);
