//? 모듈 불러오기
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import React from 'react';

//? components 불러오기
import { StoreState } from '../modules';
import UserMenu from '../views/UserMenu';
import { actionCreators as signupActions } from '../modules/signup';

//? css
import TextField from '@material-ui/core/TextField';

interface SignupContainerProps {
  nameInput: string;
  emailInput: string;
  pwInput: string;
  rePwInput: string;
  mobileInput: string;
  addressInput: string;
  history: any;
  SignupActions: typeof signupActions;
}

const SignupContainer: React.FunctionComponent<SignupContainerProps> = ({
  SignupActions,
  nameInput,
  emailInput,
  pwInput,
  rePwInput,
  mobileInput,
  addressInput,
  history,
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

  //   statusCode: 201

  // 이미 존재하는 이메일이면,
  // statusCode: 409
  // .send("email already exist")

  // function checkEmail(){
  //   letlet rednerErorrEmailMeg: JSX.Element | null;
  //   if()

  // }

  // 비밀번호 중복확인
  function checkpassword() {
    let rednerErorrPwMeg: JSX.Element | null;
    if (rePwInput) {
      if (rePwInput !== pwInput) {
        return (rednerErorrPwMeg = (
          <div style={{ color: 'red', padding: 8 }}>비밀번호가 일치하지 않습니다.</div>
        ));
      } else {
        return (rednerErorrPwMeg = <div></div>);
      }
    }
  }

  // nameInput,
  // emailInput,
  // pwInput,
  // mobileInput,
  // addressInput

  async function handleSubmitSingup(e: any) {
    e.preventDefault();
    if (
      nameInput === '' ||
      emailInput === '' ||
      pwInput === '' ||
      mobileInput === '' ||
      addressInput === ''
    ) {
      alert('데이터를 다 채워주세요~');
      return;
    }

    try {
      const res = await axios.post(
        'http://13.209.22.112:3002/api/user/signup',
        {
          name: nameInput,
          email: emailInput,
          password: pwInput,
          mobile: mobileInput,
          address: addressInput,
        },
        { withCredentials: true },
      );
      console.log(res.status); // 있으면 201 없던지 존재하던지 둘다 409
      history.push('/user/signin');
    } catch (error) {
      if (error.response.data === 'email already exist') {
        alert('이미 이메일이 존재합니다.');
      }
    }
    // const formSingupData = new FormData();
    // formSingupData.append('name', nameInput);
    // formSingupData.append('email', emailInput);
    // formSingupData.append('password', pwInput);
    // formSingupData.append('mobile', mobileInput);
    // formSingupData.append('address', addressInput);
    // const singupConfig = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // const signupUrl = 'http://13.209.22.112:3002/api/user/signup';
    // // const emailErorrMeg ="이미 가입된 이메일 입니다."
    // axios.post(signupUrl, formSingupData, singupConfig).then(res => {
    //   console.log('res: ', res);
    //   if (res.status === 201) {
    //     alert('회원가입이 성공했습니다.');
    //   } else {
    //     alert('이메일이 이미 존재합니다.');
    //   }
    // });
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <UserMenu />
      <div style={{ marginTop: 30, fontSize: 30, padding: 15 }}>회원가입</div>
      <form onSubmit={handleSubmitSingup}>
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
        {/* <div>이미 가입된 이메일 입니다. </div> */}
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
            value={mobileInput}
            onChange={(event): void => {
              const { value } = event.target;
              const inputvalue: any = autoHypenPhone(value);
              SignupActions.changeMobileInput(inputvalue);
            }}
          />
        </div>
        <div style={{ marginTop: 10 }}></div>
        <div style={{ marginTop: 10, padding: 15 }}></div>
        <div>
          <TextField
            style={{ width: 400 }}
            id="outlined-address-input"
            label="address"
            type="text"
            variant="outlined"
            onChange={(event): void => {
              const { value } = event.target;
              SignupActions.changeAddressInput(value);
            }}
          />
        </div>
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
    addressInput: signup.addressInput,
  }),
  dispatch => ({ SignupActions: bindActionCreators(signupActions, dispatch) }),
)(SignupContainer);
