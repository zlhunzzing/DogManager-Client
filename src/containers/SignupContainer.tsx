import React from 'react';
import UserMenu from '../views/UserMenu';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as signupActions } from '../modules/signup';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// 서버요청
// {
//   name:
//   email:
//   password:
//   mobile:
//   address: // 보류~
// }

interface SignupContainerProps {
  nameInput: string;
  emailInput: string;
  pwInput: string;
  mobileInput: string;
  SignupActions: typeof signupActions;
}

const SignupContainer: React.FunctionComponent<SignupContainerProps> = ({
  SignupActions,
}: SignupContainerProps) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <UserMenu />
      <div style={{ marginTop: 70, fontSize: 60, padding: 15 }}>회원가입</div>
      <div style={{ marginTop: 60 }}>
        <TextField
          style={{ width: 400 }}
          id="outlined-name-input"
          label="name"
          type="text"
          variant="outlined"
          onChange={(event): void => {
            const { value } = event.target;
            SignupActions.changeNameInput(value);
          }}
        />
      </div>
      <div style={{ marginTop: 10, padding: 15 }}></div>
      <div>
        <TextField
          style={{ width: 400 }}
          id="outlined-email-input"
          label="email"
          type="email"
          variant="outlined"
          onChange={(event): void => {
            const { value } = event.target;
            SignupActions.changeEmailInput(value);
          }}
        />
      </div>
      <div style={{ marginTop: 10, padding: 15 }}></div>
      <div>
        <TextField
          style={{ width: 400 }}
          id="outlined-password-input"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(event): void => {
            const { value } = event.target;
            SignupActions.changePwInput(value);
          }}
        />
      </div>
      <div style={{ marginTop: 10, padding: 15 }}></div>
      <div>
        <TextField
          style={{ width: 400 }}
          id="outlined-mobile-input"
          label="mobile"
          type="mobile"
          variant="outlined"
          onChange={(event): void => {
            const { value } = event.target;
            SignupActions.changeMobileInput(value);
          }}
        />
      </div>
      <div style={{ marginTop: 10 }}></div>
      <button type="submit">Log In</button>
    </div>
  );
};

export default connect(
  ({ signup }: StoreState) => ({
    nameInput: signup.nameInput,
    emailInput: signup.emailInput,
    pwInput: signup.pwInput,
    mobileInput: signup.mobileInput,
  }),
  dispatch => ({ SignupActions: bindActionCreators(signupActions, dispatch) }),
)(SignupContainer);
