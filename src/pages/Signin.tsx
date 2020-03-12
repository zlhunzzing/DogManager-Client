import * as React from 'react';

// 회원가입은 고객만

const Signin: React.FC = () => (
    <div>
        여기는 로그인
        <input type="text" placeholder="아이디"></input>
        <input type="text" placeholder="비밀번호"></input>
        <button>로그인</button>
    </div>
)

export default Signin;