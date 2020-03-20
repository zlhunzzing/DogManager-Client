//? 모듈 불러오기
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import React from 'react';
import { debounce } from 'lodash';

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
  //! input Hander 함수들....
  const handlNameInputChange = (value: string): any => {
    SignupActions.changeNameInput(value);
  };
  const handlEmailInputChange = (value: string): any => {
    SignupActions.changeEmailInput(value);
  };
  const handlPwInputChange = (value: string): any => {
    SignupActions.changePwInput(value);
  };
  const handlRePwInputChange = (value: string): any => {
    SignupActions.changeRePwInput(value);
  };

  const handlMobileInputChange = (value: string): any => {
    SignupActions.changeMobileInput(value);
  };
  const handlAddressInputChange = (value: string): any => {
    SignupActions.changeAddressInput(value);
  };

  //! 디바운스 함수들 ..

  const debouncedHandlNameInputChange = debounce(handlNameInputChange, 700);
  const debouncedHandlEmailInputChange = debounce(handlEmailInputChange, 700);
  const debouncedHandlPwInputChange = debounce(handlPwInputChange, 700);
  const debouncedHandlRePwInputChange = debounce(handlRePwInputChange, 700);
  //? 디바운스 시간을 0.7초로 하면 하이픈 add 함수랑 연결되어 있기 때문에 UI 에 보여지는 값이 늦어진다.
  //? 그렇기 때문에 초를 작게 가져갸야 한다. //! 아예 없어도 될것같다. 이부분은.
  const debouncedHandlMobileInputChange = debounce(handlMobileInputChange, 100);
  const debouncedHandlAddressInputChange = debounce(handlAddressInputChange, 700);

  // 핸드폰 하이픈 자동으로 추가되는 함수
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

  // API 함수 서버에 회원가입정보 post 요청
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
              debouncedHandlNameInputChange(value);
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
              debouncedHandlEmailInputChange(value);
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
              debouncedHandlPwInputChange(value);
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
              debouncedHandlRePwInputChange(value);
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
              debouncedHandlMobileInputChange(inputvalue);
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
              debouncedHandlAddressInputChange(value);
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
