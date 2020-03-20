import React from 'react';
import UserMenu from '../views/UserMenu';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as signupActions } from '../modules/signup';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
// import { Field } from 'redux-form';
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
// npm install redux-form
//!

interface SignupContainerProps {
  nameInput: string;
  emailInput: string;
  pwInput: string;
  rePwInput: string;
  mobileInput: string;
  SignupActions: typeof signupActions;
}

const SignupContainer: React.FunctionComponent<SignupContainerProps> = ({
  SignupActions,
  pwInput,
  rePwInput,
}: SignupContainerProps) => {
  function autoHypenPhone(str: any): void {
    str = str.replace(/[^0-9]/g, '');
    let tmp: any = '';
    const max = 11;
    if (str.length > max) {
      str = str.slice(0, max);
    }

    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    } else {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 4);
      tmp += '-';
      tmp += str.substr(7);
      return tmp;
    }
  }

  //
  function checkpassword() {
    let rednerErorrPwMeg: JSX.Element | null;
    if (rePwInput) {
      if (rePwInput !== pwInput) {
        return (rednerErorrPwMeg = <div>비밀번호가 일치하지 않습니다.</div>);
      } else {
        return (rednerErorrPwMeg = <div></div>);
      }
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <UserMenu />
      <div style={{ marginTop: 70, fontSize: 60, padding: 15 }}>회원가입</div>
      <form
        onSubmit={event => {
          event.preventDefault();
          alert('good');
        }}
      >
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
        <div>이미 가입된 이메일 입니다. </div>
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
            id="outlined-password-input"
            label="confirm"
            type="password"
            variant="outlined"
            onChange={(event): void => {
              const { value } = event.target;
              SignupActions.changeRePwInput(value);
            }}
          />
        </div>
        {checkpassword()}
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
              const inputvalue: any = autoHypenPhone(value);
              SignupActions.changeMobileInput(inputvalue);
            }}
          />
        </div>
        <div style={{ marginTop: 10 }}></div>
        <div></div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default connect(
  ({ signup }: StoreState) => ({
    nameInput: signup.nameInput,
    emailInput: signup.emailInput,
    pwInput: signup.pwInput,
    rePwInput: signup.rePwInput,
    mobileInput: signup.mobileInput,
  }),
  dispatch => ({ SignupActions: bindActionCreators(signupActions, dispatch) }),
)(SignupContainer);
